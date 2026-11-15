"""Hand fixes applied to the machine-translated attack modules after tools/gml2js_obj.py (so the
translation can be regenerated): python -I tools/postfix.py <module.js>"""
import re, sys

p = sys.argv[1]
t = open(p, encoding='utf-8').read()

# Object indices used as instances (GML reads obj.x from the first instance): point at the instance.
t = t.replace('.target = 1436;', ".target = instancesOf('obj_hammer_of_justice_enemy')[0];")
t = t.replace('.target = 1281;', ".target = instancesOf('obj_herosusie')[0];")

# scr_damage_all works on the calling bullet.
t = t.replace('S.scr_damage_all()', 'S.scr_damage_all(this)')


def add_method(cls_obj, cls_name, code):
    global t
    m = re.search(r"defineObject\('%s', %s\);" % (cls_obj, cls_name), t)
    if not m:
        return
    end = t.rfind('}', 0, m.start())
    t = t[:end] + code + t[end:]


# obj_gerson_shell_pinball: check_bounds = method(...) in its Create.
if 'anon_gml_Object_obj_gerson_shell_pinball_Create_0_376' in t:
    t = re.sub(r"    this\.check_bounds = S\.method\([^;]*\);\n", "    // (check_bounds: a method in the GML; see checkBounds below)\n", t)
    t = t.replace('S.check_bounds(', 'this.checkBounds(')
    add_method('obj_gerson_shell_pinball', 'GersonShellPinball', """  // check_bounds(dir): does the line from here towards dir cross the box (within 200 px)?
  checkBounds(dir) {
    const gt = O('obj_growtangle');
    for (let a = 0; a < 100; a++) {
      const cx = this.x + lengthdir_x(a * 2, dir), cy = this.y + lengthdir_y(a * 2, dir);
      if (cx > gt.x - 72 && cx < gt.x + 72 && cy > gt.y - 75 && cy < gt.y + 75) return true;
    }
    return false;
  }
""")

# obj_gerson_box_rumble_controller: box_bonk = method(...) in its Create.
if 'anon_gml_Object_obj_gerson_box_rumble_controller_Create_0_680' in t:
    t = re.sub(r"    this\.box_bonk = S\.method\([^;]*\);\n", "    // (box_bonk: a method in the GML; see boxBonk below)\n", t)
    t = t.replace('S.box_bonk(', 'this.boxBonk(')
    add_method('obj_gerson_box_rumble_controller', 'GersonBoxRumbleController', """  // box_bonk(side[, time]): Gerson knocks the box sideways from `side`.
  boxBonk(side, time = 24) {
    for (const l of instancesOf('obj_lerpvar')) if (l.target === this) instance_destroy(l);
    const gt = O('obj_growtangle');
    this.x = gt.x - 120 * side;
    this.y = this.anchor_y - 30;
    scr_lerpvar(this, 'image_index', 0, 6, 4);
    scr_lerpvar(this, 'y', this.y, this.y + choose(40, -40), 8, 2, 'out');
    if (side == -1) {
      this.image_xscale = Math.abs(this.image_xscale);
      this.x -= 60;
    } else {
      this.image_xscale = -Math.abs(this.image_xscale);
      this.x += 60;
    }
    this.my_flash = S.scr_oflash(this);
    this.my_flash.flashcolor = 0x00ff00;
    this.new_x = this.anchor_x + (100 + irandom(20)) * side;
    this.new_y = this.anchor_y + irandom_range(-40, 40);
    snd_play('snd_queen_punched_lower');
    const self = this;
    for (const b of instancesOf('obj_growtangle')) {
      scr_lerpvar(b, 'x', b.x, self.new_x, time + 8, 2, 'out');
      scr_lerpvar(b, 'y', b.y, self.new_y, time + 8, 2, 'out');
    }
  }
""")

# obj_gerson_growtangle_telegraph_new Draw: GameMaker writes the box's inside into the alpha channel
# (alpha-only colour writes, alpha image_alpha), then draws the telegraph with bm_dest_alpha /
# bm_inv_dest_alpha so it only shows inside the box. A canvas has no alpha-only writes (the masks
# were drawn as coloured rectangles over the whole box), so the box's inside becomes a clip and
# image_alpha the telegraph's alpha.
a = t.find("class GersonGrowtangleTelegraphNew")
b = t.find("defineObject('obj_gerson_growtangle_telegraph_new'")
if a >= 0 and b > a:
    part = t[a:b]
    head = ("    S.gpu_set_blendenable(false);\n    S.gpu_set_colorwriteenable(false, false, false, true);\n"
            "    draw_set_alpha(0);\n    S.ossafe_fill_rectangle(camerax(), cameray(), camerax() + 640, cameray() + 480, false);\n"
            "    draw_set_alpha(this.image_alpha);\n")
    tail = ("    S.gpu_set_blendenable(true);\n    S.gpu_set_colorwriteenable(true, true, true, true);\n"
            "    gpu_set_blendmode_ext(7, 8);\n    S.gpu_set_alphatestenable(true);\n    S.gpu_set_alphatestref(1);\n"
            "    draw_self(this);\n    S.scr_draw_in_box_end();\n")
    assert head in part and tail in part, 'telegraph_new draw changed'
    part = part.replace(head, "    let box;\n")
    part = re.sub(r"S\.ossafe_fill_rectangle\((.*), false\);", r"box = [\1];", part)
    part = part.replace(tail, """    const alpha = Math.min(1, this.image_alpha);
    if (alpha > 0) {
      const ctx = G.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.rect(box[0], box[1], box[2] - box[0] + 1, box[3] - box[1] + 1);
      ctx.clip();
      draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, alpha);
      ctx.restore();
    }
""")
    t = t[:a] + part + t[b:]

# obj_afterimage_screen (Gerson batting back Rude Buster): application_surface is the game's canvas,
# 640x480, holding what has been drawn of this frame so far.
if "defineObject('obj_afterimage_screen'" in t:
    t = t.replace('S.surface_get_width(this.application_surface)', 'applicationSurface().w')
    t = t.replace('S.surface_get_height(this.application_surface)', 'applicationSurface().h')
    t = t.replace('draw_surface(this.application_surface, 0, 0)', 'draw_surface(applicationSurface(), 0, 0)')
    assert 'this.application_surface' not in t, 'obj_afterimage_screen changed'
    t = t.replace('// obj_afterimage_screen (', """// application_surface: the game's canvas, with what has been drawn of this frame so far.
const applicationSurface = () => {
  const canvas = document.getElementById('game');
  return { canvas, w: canvas.width, h: canvas.height, alive: true, isSurface: true };
};

// obj_afterimage_screen (""", 1)

open(p, 'w', encoding='utf-8', newline='').write(t)
