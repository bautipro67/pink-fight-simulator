#!/bin/sh
# Regenerates src/pink/gen/*.js from the decompiled Chapter 5 GML (tools/gml2js_obj.py), applies the hand
# fixes (tools/postfix.py) and computes the imports (tools/wrap_module.py).
cd "$(dirname "$0")/.."
D="D:/Steam/steamapps/common/DELTARUNE/chapter5_windows/data.win"
T=$(mktemp -d)
mkdir -p src/pink/gen
gen() {
  name=$1; hdr=$2; shift 2
  # (the objects' GML with the decompiler's gotos rewritten, tools/gmlfix.py)
  python -I tools/gmlfix.py "${CODE:-research/code}" "$T/code_$name" "$@"
  python -I tools/gml2js_obj.py "$T/code_$name" "$D" "$@" > "$T/$name.raw.js" || exit 1
  sed '$d' "$T/$name.raw.js" > "$T/$name.body.js"
  python -I tools/postfix.py "$T/$name.body.js"
  [ -n "$GRAFT" ] && python -I tools/graft_types.py "$T/$name.body.js"
  python -I tools/wrap_module.py "$T/$name.body.js" "src/pink/gen/$name.js" "$hdr"
  # (as a module: `node --check file.js` reads it as a script and misses module-only errors)
  node --check --input-type=module < "src/pink/gen/$name.js" && echo "$name ok ($(tail -1 "$T/$name.raw.js" | cut -c1-200))"
}
NOTE="(machine-translated from the Chapter 5 GML by tools/gen_pink.sh; edit tools/postfix.py, not this file)"
gen enemy "PINK: obj_pink_enemy $NOTE" obj_pink_enemy
gen objects "Pink's small objects: the DOKI meter (obj_date_ui), her lipsync, ghosts, dummies, spotlights and ACT effects $NOTE" \
  obj_date_ui obj_pink_lipsync obj_pink_ghost_marker obj_idiot_text obj_gigaheart obj_lovelyboy obj_sharefood_act \
  obj_shutupballoon obj_mewers_live obj_pink_dummy obj_purple_tea obj_ghostburst obj_marker_doomed obj_heartmarker \
  obj_pink_spotlight obj_animation obj_afterimage_fog obj_afterimage_line obj_dokiheal_anim obj_gigaheart_particle \
  obj_sharefood_act_particle
gen purple "The purple SOUL (obj_purplecontrols: Pink's FELINE WEB in all its modes) and its effects $NOTE" \
  obj_purplecontrols obj_pinkdust obj_pinktrail obj_pinknode obj_pinknodeact obj_slidedust obj_fx_purpleripple \
  obj_purplebg obj_pink_curtains obj_pink_tension_glow obj_fx_pinkchargestar obj_fx_pinksparkle obj_audience_hitbox
gen attacks "Pink's attack objects (cats, zaps, lanes, the 3D tunnel, meteors, bombs, the anime face, hearts) $NOTE" \
  obj_bullet_healing obj_dokiheart obj_pinkhealheart obj_pinkcatbullet obj_pinkcatrunaway obj_pinkzap obj_pinktimeoutzap \
  obj_pinklanebullet obj_pink3durgenter obj_buzzsaw obj_pinkmeteor obj_pinkmeteorfire obj_huge_anime_face obj_fusebomb \
  obj_fusebomb_big obj_pinkbombexplosion obj_pinkchargeball obj_pinkcirclestar obj_pinkwave obj_pinkspeaker obj_roundbellbullet \
  obj_explosion_flamingbit obj_audienceheart obj_audiencehater obj_sweatdrop
gen movement "Pink moving around the box during her attacks (obj_pink_battlemovement) $NOTE" obj_pink_battlemovement
gen date "The DATE at DOKI MAX (obj_date_controller) and its hearts and smoke $NOTE" \
  obj_date_controller obj_date_heart obj_shinobeetle_smokecloud obj_fadein obj_afterimage_screen
# obj_dbulletcontroller's types 200-209 (Pink's attacks), as typeNNN methods of the port's controller.
python -I tools/gen_dbullet_types.py "$T/dbt" > /dev/null
CODE="$T/dbt" GRAFT=1 gen dbtypes "obj_dbulletcontroller's attack types 200-209 (Pink) $NOTE" obj_dbulletcontroller
rm -rf "$T"
