#!/bin/sh
# Regenerates src/pink/gen/*.js from the decompiled Chapter 5 GML (tools/gml2js_obj.py), applies the hand
# fixes (tools/postfix.py) and computes the imports (tools/wrap_module.py).
cd "$(dirname "$0")/.."
D="D:/Steam/steamapps/common/DELTARUNE/chapter5_windows/data.win"
T=$(mktemp -d)
mkdir -p src/pink/gen
gen() {
  name=$1; hdr=$2; shift 2
  python -I tools/gml2js_obj.py research/code "$D" "$@" > "$T/$name.raw.js" || exit 1
  sed '$d' "$T/$name.raw.js" > "$T/$name.body.js"
  python -I tools/postfix.py "$T/$name.body.js"
  python -I tools/wrap_module.py "$T/$name.body.js" "src/pink/gen/$name.js" "$hdr"
  node --check "src/pink/gen/$name.js" && echo "$name ok ($(tail -1 "$T/$name.raw.js" | cut -c1-200))"
}
NOTE="(machine-translated from the Chapter 5 GML by tools/gen_pink.sh; edit tools/postfix.py, not this file)"
gen enemy "PINK: obj_pink_enemy $NOTE" obj_pink_enemy
gen objects "Pink's small objects: the DOKI meter (obj_date_ui), her lipsync, ghosts, dummies, spotlights and ACT effects $NOTE" \
  obj_date_ui obj_pink_lipsync obj_pink_ghost_marker obj_idiot_text obj_gigaheart obj_lovelyboy obj_sharefood_act \
  obj_shutupballoon obj_mewers_live obj_pink_dummy obj_purple_tea obj_ghostburst obj_marker_doomed obj_heartmarker \
  obj_pink_spotlight obj_animation obj_afterimage_fog obj_afterimage_line obj_dokiheal_anim obj_gigaheart_particle \
  obj_sharefood_act_particle
rm -rf "$T"
