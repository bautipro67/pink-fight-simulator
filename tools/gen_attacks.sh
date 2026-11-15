#!/bin/sh
# Regenerates src/gerson/attacks/*.js from the decompiled GML (tools/gml2js_obj.py), applies the hand
# fixes (tools/postfix.py) and computes the imports (tools/wrap_module.py).
cd "$(dirname "$0")/.."
D="D:/Steam/steamapps/common/DELTARUNE/chapter4_windows/data.win"
T=$(mktemp -d)
gen() {
  name=$1; hdr=$2; shift 2
  python -I tools/gml2js_obj.py research/code "$D" "$@" > "$T/$name.raw.js" || exit 1
  sed '$d' "$T/$name.raw.js" > "$T/$name.body.js"
  python -I tools/postfix.py "$T/$name.body.js"
  python -I tools/wrap_module.py "$T/$name.body.js" "src/gerson/attacks/$name.js" "$hdr" > /dev/null
  node --check "src/gerson/attacks/$name.js" && echo "$name ok ($(tail -1 "$T/$name.raw.js" | cut -c1-150))"
}
NOTE="(machine-translated from the Chapter 4 GML by tools/gen_attacks.sh; edit tools/postfix.py, not this file)"
gen basics "Small Hammer of Justice objects $NOTE" obj_gerson_green_switch obj_gerson_green_chevron obj_gerson_progress_star obj_gerson_hair2 obj_susie_heal_projectile obj_gerson_animation obj_gerson_fakeheart obj_gerson_landing_dust obj_gerson_item_throw obj_gerson_item_throw_particle obj_gerson_item_steal_anim obj_afterimage_gerson obj_gerson_darken obj_gerson_growtangle_transform obj_oflash_gerson_buster obj_rudebuster_anim_gerson obj_gerson_speen obj_animation obj_shakeobj_y obj_afterimage_screen
gen teleport "Gerson's teleports and hammer swings $NOTE" obj_gerson_teleport obj_gerson_teleport_generic obj_gerson_swing_down obj_gerson_swing_down_new obj_gerson_squishes_box obj_gerson_hits_box obj_gerson_swing_down_mask
gen boxes "Box and shell attacks $NOTE" obj_box_throw_controller obj_gerson_shell_kick_controller obj_gerson_shell_pinball obj_gerson_box_hit_controller obj_gerson_box_hit obj_box_hit_bullet obj_gerson_box_rumble_controller obj_gerson_hammer_bro_attack_controller obj_gerson_hammer_bro_hammer
gen extra "Bells, Gerson's Rude Buster, the giant hammer and the box effects $NOTE" obj_gerson_bell_attack_controller obj_gerson_bell obj_gerson_bell_hit obj_gerson_bell_bullet obj_gerson_bell_bullet_radial obj_gerson_rudebuster obj_gerson_growtangle obj_gerson_growtangle_telegraph obj_gerson_growtangle_telegraph_new obj_gerson_growtangle_hit_fx obj_giant_hammer obj_gerson_darkness_overlay obj_gerson_darkness_overlay_light obj_gerson_slowdown obj_gerson_shadowoverlay
rm -rf "$T"
