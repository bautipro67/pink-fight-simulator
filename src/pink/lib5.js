// Chapter 5 scripts Pink's fight calls (registered on S): the DOKI meter (scr_dokiadd, scr_item_to_doki,
// scr_item_to_dokitext), scr_simultext, scr_battle_sprite_set / _reset, scr_rememberxy /
// scr_move_to_rememberxy, msgsetsubloc, scr_array_shuffle, draw_sprite_ext_flash, d_rectangle,
// scr_debug_print, and the pink damage font (global.damagefontpink, obj_initializer2).
import {
  G, global, defineScript, S, instance_create, instancesOf, irandom, draw_sprite_ext, d3d_set_fog, draw_rectangle,
  font_add_sprite_ext, draw_rectangle_color, draw_line_color, draw_line_width_color, draw_circle, draw_set_font, draw_line,
  draw_ellipse, snd_play, snd_loop, point_distance, sprite_get_width, sprite_get_height, sprite_get_xoffset, sprite_get_yoffset,
  draw_circle_color, draw_get_color, draw_set_color, draw_text_transformed, keyboard_check_pressed, mus_volume,
  draw_set_alpha, Instance, defineObject, instance_destroy, shader_saturation,
} from './rt.js?v=20261116134227';
import { snd_play_x, camerax, cameray, scr_script_delayed } from './common.js?v=20261116134227';

// The date's scripts (obj_date_controller).
defineScript('d_circle_color', (x, y, r, c1, c2, outline) => draw_circle_color(x, y, r, c1, c2, outline));
// draw_text_transformed_outline(x, y, text, xscale, yscale, outline colour): eight offset copies, then the text.
defineScript('draw_text_transformed_outline', (x, y, s, xs, ys, col = 0) => {
  const old = draw_get_color();
  draw_set_color(col);
  for (const [dx, dy] of [[-1, 0], [-1, -1], [-1, 1], [1, 0], [1, 1], [1, -1], [0, 1], [0, -1]]) draw_text_transformed(x + dx * xs, y + dy * ys, s, xs, ys, 0);
  draw_set_color(old);
  draw_text_transformed(x, y, s, xs, ys, 0);
});
// mus_fade(stream, frames): the music down to silence.
defineScript('mus_fade', (s, frames) => mus_volume(s, 0, frames));
// snd_play_delayed(sound, delay, volume = 0.7, pitch = 1), in the caller's scope.
defineScript('snd_play_delayed', (self, snd, delay, vol = 0.7, pitch = 1) => scr_script_delayed(self, () => snd_play_x(snd, vol, pitch), delay));
// scr_fadein(frames): obj_fadein fading the screen in.
defineScript('scr_fadein', t => {
  const f = instance_create(0, 0, 'obj_fadein');
  f.fadespeed = -1 / t;
  f.depth = 3;
  return f;
});
defineScript('stringset', s => s);
defineScript('sunkus_kb_check_pressed', k => (global.kbdBlocked ? false : keyboard_check_pressed(k)));
// Paths (the date makes some for its choice arrows and never draws them).
defineScript('path_add', () => ({ points: [] }));
defineScript('path_set_closed', () => {});
defineScript('path_add_point', (p, x, y, s) => { p?.points?.push([x, y, s]); });

// ---------------------------------------------------------------- GML built-ins the Chapter 5 objects use
// ds_list_*: lists are arrays (a destroyed one is flagged for ds_exists).
export const array_length = a => a?.length ?? 0;
defineScript('ds_list_create', () => []);
defineScript('ds_list_add', (l, ...v) => { l.push(...v); });
defineScript('ds_list_size', l => l?.length ?? 0);
defineScript('ds_list_find_value', (l, i) => l?.[i]);
defineScript('ds_list_find_index', (l, v) => l.indexOf(v));
defineScript('ds_list_delete', (l, i) => { if (i >= 0 && i < l.length) l.splice(i, 1); });
defineScript('ds_list_insert', (l, i, v) => { l.splice(i, 0, v); });
defineScript('ds_list_replace', (l, i, v) => { l[i] = v; });
defineScript('ds_list_set', (l, i, v) => { l[i] = v; });
defineScript('ds_list_clear', l => { if (l) l.length = 0; });
defineScript('ds_list_destroy', l => { if (l) { l.length = 0; l.destroyed = true; } });
defineScript('ds_exists', l => Array.isArray(l) && !l.destroyed);
defineScript('ds_list_shuffle', l => {
  for (let i = l.length - 1; i > 0; i--) { const j = irandom(i); [l[i], l[j]] = [l[j], l[i]]; }
});
defineScript('ds_list_sort', (l, asc) => { l.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)); if (!asc) l.reverse(); });
// The one camera: the view's position.
defineScript('camera_get_view_x', () => camerax());
defineScript('camera_get_view_y', () => cameray());
// audio_play_sound(sound, priority, loop)
defineScript('audio_play_sound', (snd, prio, loop) => (loop ? snd_loop(snd) : snd_play(snd)));
defineScript('d_ellipse', (x1, y1, x2, y2, outline) => draw_ellipse(x1, y1, x2, y2, outline));
// distance_to_object(obj), in the caller's scope: to the nearest instance's bounding box.
defineScript('distance_to_object', (self, obj) => {
  let best = Infinity;
  for (const o of instancesOf(obj)) {
    if (o === self) continue;
    const dx = Math.max(o.bbox_left - self.bbox_right, self.bbox_left - o.bbox_right, 0);
    const dy = Math.max(o.bbox_top - self.bbox_bottom, self.bbox_top - o.bbox_bottom, 0);
    best = Math.min(best, Math.hypot(dx, dy));
  }
  return best === Infinity ? 1000000 : best;
});
// scr_wave(from, to, period, offset): a sine between from and to over `period` seconds.
defineScript('scr_wave', (a, b, period, offset) => {
  const h = (b - a) * 0.5;
  return a + h + Math.sin((G.frame / 30 + period * offset) / period * 6.283185307179586) * h;
});
defineScript('scr_84_get_font', name => 'fnt_' + name);
defineScript('show_debug_message_concat', () => {});
// scr_shakescreen(amount = 4), in the caller's scope.
defineScript('scr_shakescreen', (self, amount = 4) => {
  const s = instance_create(self?.x ?? 0, self?.y ?? 0, 'obj_shake');
  s.shakex = amount;
  s.shakey = amount;
});
// scr_draw_sprite_tiled_area(sprite, subimg, x, y, x1, y1, x2, y2, xscale, yscale, colour, alpha): the
// sprite tiled from (x, y), drawn only inside the rectangle (x1, y1)-(x2, y2).
defineScript('scr_draw_sprite_tiled_area', (spr, img, xx, yy, x1, y1, x2, y2, xs, ys, col = 0xffffff, alpha = 1) => {
  const sw = sprite_get_width(spr) * xs, sh = sprite_get_height(spr) * ys;
  if (!(sw > 0 && sh > 0)) return;
  const ctx = G.ctx;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x1, y1, x2 - x1, y2 - y1);
  ctx.clip();
  const ox = sprite_get_xoffset(spr) * xs, oy = sprite_get_yoffset(spr) * ys;
  const startx = xx - Math.ceil((xx - x1) / sw) * sw, starty = yy - Math.ceil((yy - y1) / sh) * sh;
  for (let i = startx; i <= x2; i += sw) for (let j = starty; j <= y2; j += sh) draw_sprite_ext(spr, img, i + ox, j + oy, xs, ys, 0, col, alpha);
  ctx.restore();
});
void point_distance;
import { moveToPoint } from '../screens/cutscene.js?v=20261116134227';
import { subst } from '../battle/common.js?v=20261116134227';

// (generated from the GML by tools/gen_doki_tables.py)
// scr_item_to_doki (default 1) / scr_item_to_dokitext (default "")
const ITEM_DOKI = { 1: 2, 2: 3, 3: 3, 4: 0, 5: 0, 6: 3, 7: 3, 8: 2, 9: 2, 10: 1, 11: 2, 12: 3, 13: 1, 14: 15, 15: 0, 16: 2, 17: 0, 18: 0, 19: 0, 20: 0, 21: 0, 22: 2, 23: 3, 24: 1, 25: 1, 26: 2, 27: 2, 28: 2, 29: 3, 30: 2, 31: 4, 32: 0, 33: 3, 34: 2, 35: 0, 36: 1, 37: 1, 38: 3, 39: 2, 40: 3, 41: 2, 42: 2, 43: 2, 60: 1, 61: 1, 62: 2, 63: 4, 64: 3, 65: 3, 66: 2, 67: 2, 68: 2, 69: 2, 70: 2 };
const ITEM_DOKITEXT = { 1: "Sweet!", 2: "Fresh!", 3: "Shiny!", 4: "Ugly!", 5: "Sharp!", 6: "Delicious!", 7: "Delicious!", 8: "Chompy!", 9: "Cute!", 10: "Unsatisfying.", 11: "Yummy!", 12: "Jammy and funky!", 13: "Melty!", 14: "Bepis!", 15: "Slimy!", 16: "Poppy!", 17: "Doesn't fit!", 18: "Yuck!", 19: "Yuck!", 20: "Yuck!", 21: "Yuck!", 22: "Chompy!", 23: "Crunchy!", 24: "Yuck!", 25: "Tangly!", 26: "Peppy!", 27: "Crunchy!", 28: "Crunchy!", 29: "Hyper!", 30: "Dusty!", 31: "Shiny!", 32: "Sickening!", 33: "Wanderful!", 34: "Expired?", 35: "It's, it's not mine!", 36: "Yuck!", 37: "Yuck!", 38: "Fancy!" };
export const scr_item_to_doki = item => ITEM_DOKI[item] ?? 1;
export const scr_item_to_dokitext = item => ITEM_DOKITEXT[item] ?? '';
defineScript('scr_item_to_doki', scr_item_to_doki);
defineScript('scr_item_to_dokitext', scr_item_to_dokitext);

// scr_dokiadd(monster, amount): Pink's DOKI (0-100), a pink "+N DOKI" number (obj_dmgwriter type 15)
// and snd_mercyadd, higher-pitched for small amounts.
defineScript('scr_dokiadd', (m, amount) => {
  for (const p of instancesOf('obj_pink_enemy')) p.doki = Math.max(0, Math.min(100, p.doki + amount));
  let play = amount > 0;
  for (const d of instancesOf('obj_dmgwriter')) if (d.type == 15 && d.mercytimer < 8) play = false;
  if (play) {
    let pitch = 0.8;
    if (amount < 99) pitch = 1;
    if (amount <= 50) pitch = 1.2;
    if (amount <= 25) pitch = 1.4;
    snd_play_x('snd_mercyadd', 0.8, pitch);
  } else S.snd_play?.('snd_hurt_muffled_2x');
  const d = instance_create(global.monsterx[m], global.monstery[m] + 20 - global.hittarget[m] * 20, 'obj_dmgwriter');
  d.damage = amount;
  d.type = 15;
  global.hittarget[m]++;
});

// scr_simultext(who): this hero's line of the simultaneous ACT text (simulorder rows, 30 px apart).
defineScript('scr_simultext', (self, who) => {
  const order = { kris: self.simulorderkri, susie: self.simulordersus, ralsei: self.simulorderral, noelle: self.simulordernoe }[who] ?? 0;
  global.typer = 4;
  self.battlewriter = instance_create(self.xx + 30, self.yy + 376 + order * 30, 'obj_writer');
  return self.battlewriter;
});

// scr_battle_sprite_set(who, sprite, speed, frames) / scr_battle_sprite_reset(who): a hero in state 8
// (a set sprite) and back.
const HERO = { kris: 'obj_herokris', susie: 'obj_herosusie', ralsei: 'obj_heroralsei', noelle: 'obj_heronoelle' };
defineScript('scr_battle_sprite_set', (who, sprite, speed, frames) => {
  for (const h of instancesOf(HERO[who] ?? 'obj_herokris')) {
    Object.assign(h, { state: 8, hurt: 0, attacktimer: 0, sprite_index: sprite, image_speed: speed, image_index: 0 });
    if (frames == 0) h.maxframes = h.image_number;
    if (frames == -1) h.maxframes = -1;
    global.faceaction[h.myself] = 0;
  }
});
defineScript('scr_battle_sprite_reset', who => {
  for (const h of instancesOf(HERO[who] ?? 'obj_herokris')) {
    Object.assign(h, { state: 0, hurt: 0, attacktimer: 0, attacked: 0 });
    global.faceaction[h.myself] = 0;
  }
});

// scr_rememberxy / scr_move_to_rememberxy(time)
defineScript('scr_rememberxy', self => {
  self.___myrememberx = self.x;
  self.___myremembery = self.y;
});
defineScript('scr_move_to_rememberxy', (self, time) => moveToPoint(self, self.___myrememberx, self.___myremembery, time));

// msgsetsubloc(n, format, subs..., id): msgset with ~1, ~2 ... replaced.
defineScript('msgsetsubloc', (n, fmt, ...rest) => S.msgset(n, subst(fmt, ...rest.slice(0, -1))));

// scr_array_shuffle(array): a shuffled copy.
defineScript('scr_array_shuffle', a => {
  if (!Array.isArray(a)) return false;
  const src = a.slice(), out = [];
  while (src.length) out.push(src.splice(irandom(src.length - 1), 1)[0]);
  return out;
});

// draw_sprite_ext_flash: the sprite drawn as a solid colour (fog).
defineScript('draw_sprite_ext_flash', (spr, img, x, y, xs, ys, rot, col, alpha) => {
  d3d_set_fog(true, col, 0, 1);
  draw_sprite_ext(spr, img, x, y, xs, ys, rot, col, alpha);
  d3d_set_fog(false, 0, 0, 0);
});
defineScript('d_rectangle', (x1, y1, x2, y2, outline) => draw_rectangle(x1, y1, x2, y2, outline));
defineScript('d_rectangle_color', (x1, y1, x2, y2, c1, c2, c3, c4, outline) => draw_rectangle_color(x1, y1, x2, y2, c1, c2, c3, c4, outline));
defineScript('d_line_color', (x1, y1, x2, y2, c1, c2) => draw_line_color(x1, y1, x2, y2, c1, c2));
defineScript('d_line_width_color', (x1, y1, x2, y2, w, c1, c2) => draw_line_width_color(x1, y1, x2, y2, w, c1, c2));
defineScript('d_circle', (x, y, r, outline) => draw_circle(x, y, r, outline));
defineScript('d_line', (x1, y1, x2, y2) => draw_line(x1, y1, x2, y2));
defineScript('scr_debug_print', () => {});
defineScript('scr_debug_delete_persistent', () => {});

// scr_heroblcon(who): a speech balloon (type 10) beside a hero, pointing left.
const HERO_NUM = { 1: 'kris', kr: 'kris', 2: 'susie', su: 'susie', 3: 'ralsei', ra: 'ralsei', 4: 'noelle', no: 'noelle' };
defineScript('scr_heroblcon', who => {
  const h = instancesOf(HERO[HERO_NUM[who] ?? who])[0];
  if (!h) return false;
  const b = S.scr_enemyblcon(h.x + 100, h.y + 40, 10);
  b.side = -1;
  return b;
});

// scr_move_to_point_over_time(x, y, time), in the caller's scope.
defineScript('scr_move_to_point_over_time', (self, x, y, time) => moveToPoint(self, x, y, time));

// scr_string_format_time(seconds, decimals): "mm:ss".
defineScript('scr_string_format_time', (t, dec = 0) => {
  const pad = (n, w, d) => { const s = Number(n).toFixed(d); return s.padStart(w + (d ? d + 1 : 0), '0'); };
  return pad(Math.floor(t / 60), 2, 0) + ':' + pad(t % 60, 2, dec);
});

// scr_84_get_sprite / scr_84_set_draw_font: the English sprite, the font by name.
defineScript('scr_84_get_sprite', name => name);
defineScript('scr_84_set_draw_font', name => {
  global.chemg_font = name;
  draw_set_font('fnt_' + name);
});

// Shaders: shader_replace_simple_set_hook(57) is sh_saturation (Pink's BODY), drawn by the engine
// (shader_saturation); its one uniform, Position, comes with shader_set_uniform_f. Other shaders are not drawn.
let shaderOn = -1;
defineScript('shader_get_uniform', () => -1);
defineScript('shader_set_uniform_f', (uniform, v) => { if (shaderOn === 57) shader_saturation(v); });
defineScript('shader_replace_simple_set_hook', sh => { shaderOn = sh; if (sh === 57) shader_saturation(0); });
defineScript('shader_replace_simple_reset_hook', () => { shaderOn = -1; shader_saturation(null); });

// obj_initializer2: the pink numbers the DOKI writer uses.
export function initPinkFonts() {
  if (!global.damagefontpink) global.damagefontpink = font_add_sprite_ext('spr_numbersfontbig_pink', '0123456789+-%/P$', 20, 0);
}

// ---------------------------------------------------------------- Chapter 5 spells (ReviveSong, Scythemare)

defineScript('inverselerp', (a, b, v) => (b == a ? 0 : (v - a) / (b - a)));
// scr_armorcheck_equipped(char, armor): how many of the char's two armor slots hold it.
defineScript('scr_armorcheck_equipped', (c, id) => (global.chararmor1[c] == id ? 1 : 0) + (global.chararmor2[c] == id ? 1 : 0));
// draw_self_surfacespace(xoff, yoff): the caller drawn with its position shifted (for a surface).
defineScript('draw_self_surfacespace', (inst, xo, yo) => draw_sprite_ext(inst.sprite_index, inst.image_index, inst.x - xo,
  inst.y - yo, inst.image_xscale, inst.image_yscale, inst.image_angle, inst.image_blend, inst.image_alpha));
// scr_draw_beam(x, y, length, spread, angle, color, alpha, roundEnd): a light cone (a triangle, and a
// circle at its end).
defineScript('scr_draw_beam', (x, y, len, spread, angle, col, alpha, cap) => {
  const at = a => [x + len * Math.cos(a * Math.PI / 180), y - len * Math.sin(a * Math.PI / 180)];
  const e0 = at(angle), e1 = at(angle + spread / 2), e2 = at(angle - spread / 2);
  draw_set_color(col);
  draw_set_alpha(alpha);
  if (cap) draw_circle(e0[0], e0[1], spread / 2, false);
  S.d_triangle(x, y, e1[0], e1[1], e2[0], e2[1], false);
});
// snd_play_echo(sound, delay = 15, decay = 0.25, volume = 1, pitch = 1, pitchShift = 0): the sound
// again every `delay` frames, `decay` quieter each time (obj_snd_echo).
class SndEcho extends Instance {
  create() { this.init = false; this.timer = 0; }
  step() {
    if (!this.init) { this.init = true; this.timer = this.delay; }
    if (this.timer >= this.delay) {
      snd_play_x(this.sound, this.vol, this.pitch);
      this.timer = 0;
      this.vol -= this.decay;
      if (this.pitch_shift) this.pitch += this.pitch_shift;
      if (this.vol <= 0) instance_destroy(this);
    } else this.timer += 1;
  }
}
defineObject('obj_snd_echo', SndEcho);
defineScript('snd_play_echo', (inst, sound, delay = 15, decay = 0.25, vol = 1, pitch = 1, shift = 0) => {
  const e = instance_create(inst?.x ?? 0, inst?.y ?? 0, 'obj_snd_echo');
  Object.assign(e, { sound, delay, decay, vol, pitch, pitch_shift: shift });
  return e;
});
