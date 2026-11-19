// Chapter 4 helper scripts the Hammer of Justice's objects call (registered on S): ossafe_fill_rectangle(_color),
// d_triangle, d_line_width, draw_rectangle_pos, __view_get, scr_wrap, scr_orbitx / scr_orbity, scr_sonic_boom,
// position_meeting, scr_draw_in_box_end, stringsetloc / stringsetsub, draw_set_colour, and the gpu_* switches the
// canvas has no equivalent for (alpha test, colour write: the shapes they mask are drawn as they are).
import {
  G, global, defineScript, draw_rectangle, draw_rectangle_color, draw_triangle, draw_line_width, draw_set_color, draw_set_alpha,
  draw_get_color, draw_get_alpha, point_direction, point_distance, lengthdir_x, lengthdir_y, instance_create_depth,
  instance_destroy, instancesOf, gpu_set_blendmode, S, Instance, defineObject, instance_create, controls,
} from './rt.js?v=20261119162300';
import { scr_lerpvar, scr_script_delayed } from './common.js?v=20261119162300';

defineScript('ossafe_fill_rectangle', (x1, y1, x2, y2, outline = false) => {
  draw_rectangle(Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2), outline);
});
defineScript('ossafe_fill_rectangle_color', (x1, y1, x2, y2, c1, c2, c3, c4, outline = false) => {
  draw_rectangle_color(Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2), c1, c2, c3, c4, outline);
});
defineScript('d_triangle', (x1, y1, x2, y2, x3, y3, outline) => draw_triangle(x1, y1, x2, y2, x3, y3, outline));
defineScript('d_line_width', (x1, y1, x2, y2, w) => draw_line_width(x1, y1, x2, y2, w));
// draw_rectangle_pos(4 corners[, colour, alpha]): two triangles.
defineScript('draw_rectangle_pos', (x1, y1, x2, y2, x3, y3, x4, y4, col, alpha) => {
  const c = draw_get_color(), a = draw_get_alpha();
  if (col !== undefined && col != -1) draw_set_color(col);
  if (alpha !== undefined) draw_set_alpha(alpha);
  draw_triangle(x1, y1, x2, y2, x3, y3, false);
  draw_triangle(x1, y1, x3, y3, x4, y4, false);
  draw_set_color(c);
  draw_set_alpha(a);
});
defineScript('draw_set_colour', c => draw_set_color(c));
defineScript('__view_get', (what) => (what == 0 ? G.camX : what == 1 ? G.camY : what == 2 ? 640 : 480));
defineScript('scr_debug', () => false);
defineScript('stringsetloc', s => s);
defineScript('stringsetsub', (s, ...subs) => subs.reduce((t, v, k) => t.split('~' + (k + 1)).join(String(v)), String(s)));

// scr_wrap(value, min, max): wraps into [min, max] (integers step past the ends by one).
defineScript('scr_wrap', (val, min, max) => {
  if (val % 1 == 0) {
    while (val > max || val < min) {
      if (val > max) val = min + val - max - 1;
      else if (val < min) val = max + val - min + 1;
    }
    return val;
  }
  let old = val + 1;
  while (val != old) {
    old = val;
    if (val < min) val = max - (min - val);
    else if (val > max) val = min + (val - max);
  }
  return val;
});
// scr_orbitx / scr_orbity(cx, cy, x, y, angle): (x, y) turned `angle` degrees around (cx, cy).
defineScript('scr_orbitx', (cx, cy, x, y, a) => {
  if (a == 0) return x;
  return cx + lengthdir_x(point_distance(cx, cy, x, y), point_direction(cx, cy, x, y) + a);
});
defineScript('scr_orbity', (cx, cy, x, y, a) => {
  if (a == 0) return y;
  return cy + lengthdir_y(point_distance(cx, cy, x, y), point_direction(cx, cy, x, y) + a);
});

// scr_sonic_boom([angle, scale]): a grey burst that grows and is gone in 10 frames.
defineScript('scr_sonic_boom', (self, angle = 0, scale = 1) => {
  const s = instance_create_depth(self.x, self.y, self.depth + 1, 'obj_bulletparent');
  Object.assign(s, { image_angle: angle, image_xscale: 0.25 * scale, image_yscale: 0.5 * scale, sprite_index: 'spr_finisher_explosion',
    image_index: 2, image_speed: 0.5, image_blend: 0x808080 });
  scr_lerpvar(s, 'image_xscale', 0.25 * scale, 0.5 * scale, 10);
  scr_lerpvar(s, 'image_yscale', 0.5 * scale, scale, 10);
  scr_script_delayed(s, t => instance_destroy(t), 10);
  return s;
});

// position_meeting(x, y, obj): is (x, y) inside an instance of obj (its bounding box)?
defineScript('position_meeting', (self, x, y, obj) => instancesOf(obj).some(i => x >= i.bbox_left && x <= i.bbox_right && y >= i.bbox_top && y <= i.bbox_bottom));

// scr_damage_all(bullet[, proportion]): hits every standing party member; with proportion < 1 the damage
// scales with how much HP each has left.
defineScript('scr_damage_all', (self, prop = 1) => {
  if (!(global.inv < 0)) return;
  const rem = self.damage, keep = self.target;
  for (let ti = 0; ti < 3; ti++) {
    global.inv = -1;
    const c = global.char[ti];
    const scale = global.hp[c] / global.maxhp[c];
    self.damage = rem * (scale * (1 - prop) + prop);
    self.target = ti;
    if (global.hp[c] > 0 && c != 0) S.scr_damage(self);
  }
  global.inv = global.invc * 40;
  self.target = keep;
});
defineScript('scr_draw_in_box_end', () => gpu_set_blendmode(0));
for (const n of ['gpu_set_alphatestenable', 'gpu_set_alphatestref', 'gpu_set_colorwriteenable', 'gpu_set_blendenable']) defineScript(n, () => {});

void S;

// obj_jump_arc / scr_jump_arc(target, x, y, goalx, goaly, height, time): moves the target in a straight
// line over `time` frames while its `z` rises and falls by `height` (a sine arch).
class JumpArc extends Instance {
  create() {
    Object.assign(this, { master: null, origx: 0, origy: 0, goalx: 0, goaly: 0, zheight: 0, time: 1, timer: 1 });
  }
  jump_start() {
    this._hspeed = (this.goalx - this.origx) / this.time;
    this._vspeed = (this.goaly - this.origy) / this.time;
  }
  step() {
    const m = this.master;
    if (!m || !m.alive) instance_destroy(this);
    if (m && m.alive) {
      m.x += this._hspeed;
      m.y += this._vspeed;
      m.z = Math.sin(Math.PI / this.time * this.timer) * this.zheight;
    }
    this.timer += 1;
    if (this.timer > this.time) instance_destroy(this);
  }
}
defineObject('obj_jump_arc', JumpArc);
defineScript('scr_jump_arc', (target, x, y, goalx, goaly, zheight, time) => {
  const j = instance_create(0, 0, 'obj_jump_arc');
  Object.assign(j, { master: target, origx: x ?? target.x, origy: y ?? target.y, goalx, goaly, zheight, time });
  j.jump_start();
  return j;
});

// scr_get_input_name(n): the key bound to a control (4 = confirm, 5 = cancel, 6 = menu), for the
// "PRESS Z" prompt. scr_getbuttonsprite is for consoles and gamepads; the simulator writes the key
// name instead (global.is_console stays unset).
const INPUTS = { 0: 'down', 1: 'right', 2: 'up', 3: 'left', 4: 'confirm', 5: 'cancel', 6: 'menu' };
const KEYS = { 13: 'ENTER', 16: 'SHIFT', 17: 'CTRL', 32: 'SPACE', 37: 'LEFT', 38: 'UP', 39: 'RIGHT', 40: 'DOWN' };
defineScript('scr_get_input_name', n => {
  const k = controls[INPUTS[n]]?.keys?.[0];
  if (k == null) return '';
  return KEYS[k] ?? ((k >= 48 && k <= 90) ? String.fromCharCode(k) : '#' + k);
});
defineScript('scr_getbuttonsprite', () => null);
