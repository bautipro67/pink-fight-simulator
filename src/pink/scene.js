// Pink's encounter (obj_dw_pink_encounter in room_dw_pink_encounter, Chapter 5), around the fight:
// - the first time (con 2): the party checks on Orange, Pink arrives ("PINK!"), makes them all
//   apologise, the 7 flowers don't add up, she loses her temper and the fight starts (scr_battle 224);
// - a retry (con 1.1, global.tempflag[62] > 0): Pink drops in yelling and sends Orange flying;
// - after the win (con 5): her confession, the ghost in the doll, Orange, the SHADOWCRYSTAL and her
//   goodbye, which depends on her bombs (global.flag[1914]: a kiss, a wink, or a string of kisses).
// The scene is machine-translated (src/pink/gen/encounter.js); this file has what it uses: the c_*
// commands as scripts, the room (its picture from tools/render_rooms.py and the CUT_ASSETS markers),
// the actors, obj_pinkspeaker (her big portrait), the floor reflections (simplified: no shader), the
// falling petals, the scene's anonymous functions, and the hand-offs to the battle and back.
import {
  G, global, Instance, defineObject, defineScript, S, instance_create, instance_destroy, instance_exists,
  instancesOf, draw_sprite_ext, draw_sprite, lengthdir_x, lengthdir_y, sprite_get_xoffset, sprite_get_yoffset,
  sprite_get_width, sprite_get_height, sprite_get_number, choose, irandom, random,
} from '../runtime/gm.js?v=20261117033203';
import { snd_volume, snd_stop, audio_sound_set_track_position } from '../runtime/audio.js?v=20261117033203';
import { loadMusic } from '../runtime/assets.js?v=20261117033203';
import {
  c, c_waitcustom_end, scr_cutscene_make, scr_actor_setup, scr_depth, loadRoom, enterRoom,
  scr_jump_to_point_sprite, moveToPoint,
} from '../screens/cutscene.js?v=20261117033203';
import { scr_dark_marker, scr_marker, scr_lerpvar_instance, scr_doom } from './common.js?v=20261117033203';
import { startBattle } from '../battle/setup.js?v=20261117033203';
import { gotoRoom } from '../screens/common.js?v=20261117033203';

export { scr_depth };

const ROOM = 'room_dw_pink_encounter';
const MUSIC = ['pink_theme.ogg', 'pink_theme_mad.ogg', 'noelle_normal.ogg'];

// ---------------------------------------------------------------- the c_* commands as scripts

for (const [name, fn] of Object.entries(c)) defineScript('c_' + name, fn);
defineScript('c_waitcustom_end', c_waitcustom_end);
defineScript('scr_actor_setup', scr_actor_setup);
defineScript('scr_lerp_instance_var', (inst, v, a, b, t) => scr_lerpvar_instance(inst, v, a, b, t));

// ---------------------------------------------------------------- the room

// The CUT_ASSETS layer (hidden at start: turnofflayers("CUT")): where the scene puts everyone.
// findsprite(sprite, layer, color) tells the two flowerpots apart by their blend (GML BGR numbers:
// 255 red, the one that bursts later; 65280 green).
const CUT_ASSETS = [
  { sprite: 'spr_enemy_orange_walk_right', x: -80, y: 166 },
  { sprite: 'spr_debug_krmarker', x: 126, y: 76 },
  { sprite: 'spr_debug_sumarker', x: 96, y: 103 },
  { sprite: 'spr_debug_ramarker', x: 120, y: 150 },
  { sprite: 'spr_pink_walk_up', x: 480, y: 108 },
  { sprite: 'spr_fcastle_pink_flowerpot', x: 80, y: 43, color: 65280 },
  { sprite: 'spr_fcastle_pink_flowerpot', x: 503, y: 43, color: 255 },
];
defineScript('findspriteinfo', (spr) => ({ ...(CUT_ASSETS.find(a => a.sprite === spr) ?? { x: 0, y: 0 }) }));
defineScript('findsprite', (spr, layer, color) => ({ ...(CUT_ASSETS.find(a => a.sprite === spr && (color === undefined || a.color === color)) ?? {}) }));
defineScript('scr_marker_fromasset', (a) => {
  const m = scr_marker(a.x ?? 0, a.y ?? 0, a.sprite);
  Object.assign(m, { image_xscale: 2, image_yscale: 2, image_blend: a.color ?? 0xffffff });
  return m;
});
defineScript('turnofflayers', () => {});
// obj_ch5 flower mini faces for the writer's \m codes (Orange is \m2).
defineScript('scr_miniface_init_flowers', () => {
  global.writerimg = ['spr_miniface_aqua', 'spr_miniface_seth', 'spr_miniface_orange', 'spr_miniface_green',
    'spr_miniface_yellow', 'spr_miniface_blue'];
});

// scr_maincharacters_actors (caller scope): Kris, Susie and Ralsei as actors 0-2.
defineScript('scr_maincharacters_actors', (o) => {
  const spots = G.pinkPartySpots ?? [[126, 76], [96, 103], [120, 150]];
  const add = (n, name, [x, y], spr) => {
    const a = instance_create(x, y, 'obj_actor');
    scr_actor_setup(n, a, name);
    a.sprite_index = spr;
    return a;
  };
  o.actor_count = 2;
  o.kr = 0;
  o.su = 1;
  o.ra = 2;
  o.kr_actor = add(0, 'kris', spots[0], 'spr_krisr_dark');
  o.su_actor = add(1, 'susie', spots[1], 'spr_susie_walk_right_dw');
  o.ra_actor = add(2, 'ralsei', spots[2], 'spr_ralsei_walk_right');
});

// Things outside this room: the save's flags, key items, the console border, the debug menu.
defineScript('scr_flag_set', (n, v) => { global.flag[n] = v; });
defineScript('scr_flag_get', (n) => global.flag[n] ?? 0);
defineScript('scr_setparty', () => {});
defineScript('scr_get_shadow_crystal', () => {});
defineScript('scr_keyitemcheck', () => 1);
defineScript('scr_keyitemget', () => {});
defineScript('show_border', () => {});
defineScript('snd_free', (s) => snd_stop(s));

// ---------------------------------------------------------------- floor reflections

// obj_castlereflect / obj_castlereflect_manager: the actors (and the flowerpots, add_reflection) mirrored
// on the shiny floor, in the two obj_castlereflect zones. As the game draws them: each one upside down at
// the manager's spot (with add_sprite_offset / substitute_sprite: Orange's yells sit lower, Pink's poses
// have their own *_reflect sprites), through shd_castlereflect, which fades it out from 52 to 80 pixels
// below pos_y (a little above the feet) at 0.6 of its alpha, then added to the floor by
// shd_castlereflect_layerblend at 0.75 of that, with bm_add (0.75 again).
const ZONES = [[80, 80, 480, 200], [0, 120, 80, 120]]; // obj_castlereflect at 80,80 (12x5) and 0,120 (2x3), spr_swordarea 40x40
const FALLOFF = 160; // shadow_falloff
class CastleReflect extends Instance {
  create() { this.depth = 999990; this.extra = new Set(); this.offsets = new Map(); this.subs = new Map(); this.cv = null; }
  draw() {
    const main = G.ctx;
    if (!main || typeof document === 'undefined') return;
    if (!this.cv) {
      const make = () => { const c = document.createElement('canvas'); c.width = 640; c.height = 480; return c; };
      this.cv = make();
      this.cx = this.cv.getContext('2d');
      this.one = make();
      this.ox = this.one.getContext('2d');
    }
    const ctx = this.cx, one = this.ox;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, 640, 480);
    // (back to front: the game's render queue takes the deepest first, and nearer ones cover them)
    const list = [...instancesOf('obj_actor'), ...[...this.extra].filter(i => i.alive)]
      .filter(a => a.visible && a.sprite_index && a.image_alpha > 0 && sprite_get_height(a.sprite_index))
      .sort((a, b) => b.depth - a.depth);
    for (const a of list) {
      const xs = a.image_xscale ?? 1, ys = a.image_yscale ?? 1;
      const sh = sprite_get_height(a.sprite_index) * ys, yoff = ys * sprite_get_yoffset(a.sprite_index);
      let yOffset = a.y + sh * 2 - G.camY - yoff - 2, xOffset = 0, refl = a.reflect_jump_y ?? 0;
      const off = this.offsets.get(a.sprite_index);
      if (off) {
        refl += off[0] * ys;
        yOffset += off[1] * ys;
        xOffset += off[2] * xs;
      }
      const posY = yOffset + 8 - sh - 30;
      one.setTransform(1, 0, 0, 1, 0, 0);
      one.globalCompositeOperation = 'source-over';
      one.clearRect(0, 0, 640, 480);
      G.ctx = one;
      try {
        draw_sprite_ext(this.subs.get(a.sprite_index) ?? a.sprite_index, a.image_index, a.x - G.camX + xOffset,
          yOffset + refl - 2 * yoff - 8, -xs, ys, 180 + (a.image_angle ?? 0), a.image_blend ?? 0xffffff, 1);
      } finally {
        G.ctx = main;
      }
      // alpha * (1 - clamp((y - pos_y) / (falloff / 2), 0.65, 1))
      const g = one.createLinearGradient(0, posY + FALLOFF / 2 * 0.65, 0, posY + FALLOFF / 2);
      g.addColorStop(0, 'rgba(0,0,0,0.35)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      one.globalCompositeOperation = 'destination-in';
      one.fillStyle = g;
      one.fillRect(0, 0, 640, 480);
      ctx.drawImage(this.one, 0, 0);
    }
    main.save();
    main.beginPath();
    for (const [x, y, w, h] of ZONES) main.rect(x, y, w, h);
    main.clip();
    main.globalCompositeOperation = 'lighter';
    main.globalAlpha = 0.6 * 0.75 * 0.75;
    main.drawImage(this.cv, G.camX, G.camY);
    main.restore();
  }
}
defineObject('obj_castlereflect_manager', CastleReflect);
const managers = () => instancesOf('obj_castlereflect_manager');
defineScript('add_reflection', (inst) => {
  const o = typeof inst === 'number' ? G.instances.find(i => i.id === inst) : inst;
  for (const m of managers()) if (o) m.extra.add(o);
});
// add_sprite_offset(sprite, reflection y, y, x) / substitute_sprite(sprite, reflection sprite): sprite names
// (tools/postfix.py names the numbers the scene passes).
defineScript('add_sprite_offset', (spr, a, b, x = 0) => { for (const m of managers()) m.offsets.set(spr, [a, b, x ?? 0]); });
defineScript('substitute_sprite', (spr, sub) => { for (const m of managers()) m.subs.set(spr, sub); });

// ---------------------------------------------------------------- falling petals

// obj_leafpetals (room creation code: 25 petals, wind 60 towards -135, pink_mode: half alpha, on the
// LEAVES layer behind the floor tiles).
class LeafPetals extends Instance {
  create() {
    this.depth = 1000500;
    this.image_alpha = 0.5;
    this.timer = 0;
    this.xx = 0;
    this.yy = 0;
    const n = 25;
    this.petals = Array.from({ length: n }, (_, c) => {
      const flip = (c % 2) * -1;
      return [choose('spr_leaf_fall_particle', 'spr_leaf_fall2_particle', 'spr_leaf_fall3_particle'), irandom(2), random(24) * flip, random(17) * flip];
    });
  }
  step() { this.timer += 1; }
  draw() {
    const move = 60 / 30;
    this.xx += lengthdir_x(move, -135);
    this.yy += lengthdir_y(move, -135);
    const frame = Math.floor(this.timer / 5) % 4;
    const sq = Math.sqrt(this.petals.length), xs = 320 / sq, ysep = 240 / sq;
    // The 320x240 sheet, doubled and tiled over the view as it drifts.
    const ox = ((this.xx % 640) + 640) % 640, oy = ((this.yy % 480) + 480) % 480;
    for (let tx = -1; tx <= 1; tx++) {
      for (let ty = -1; ty <= 1; ty++) {
        this.petals.forEach(([spr, f, dx, dy], j) => {
          const px = Math.max(0, Math.min(305, xs * (j % sq) + dx)), py = Math.max(0, Math.min(225, ysep * Math.floor(j / sq) + (j % sq) * 12 + dy));
          const n = sprite_get_number(spr) || 1;
          draw_sprite_ext(spr, (f + frame) % n, G.camX + ox + tx * 640 + px * 2, G.camY + oy + ty * 480 + py * 2, 2, 2, 0, 0xffffff, this.image_alpha);
        });
      }
    }
  }
}
defineObject('obj_leafpetals', LeafPetals);

// ---------------------------------------------------------------- obj_pinkspeaker

// Pink's big portrait at the bottom right while she talks (typer 97): global.fe picks the face
// ([sprite, frame, tail wagging, keeps animating, sprite while the writer waits, crying]).
const FACES = [
  ['spr_pinkspeaker_silhouette', 0, false, false, -1, false], ['spr_pinkspeaker_talk', 0, true, false, -1, false],
  ['spr_pinkspeaker_concerned', 0, true, false, -1, false], ['spr_pinkspeaker_tongue', 0, false, false, -1, false],
  ['spr_pinkspeaker_nya', 1, false, false, -1, false], ['spr_pinkspeaker_nya2', 1, false, false, -1, false],
  ['spr_pinkspeaker_talk_happy', 16, true, false, -1, false], ['spr_pinkspeaker_angry', 0, false, false, -1, false],
  ['spr_pinkspeaker_wink', 0, true, false, -1, false], ['spr_pinkspeaker_cry', 0, false, true, -1, false],
  ['spr_pinkspeaker_sad', 0, false, false, 'spr_pinkspeaker_sad_end', false], ['spr_pinkspeaker_angry', 0, false, false, -1, true],
  ['spr_pinkspeaker_happytearful', 1, false, false, 'spr_pinkspeaker_happytearful_end', false],
  ['spr_pinkspeaker_happycry', 1, false, false, 'spr_pinkspeaker_happycry_end', false],
  ['spr_pinkspeaker_overjoyed', 0, false, true, -1, false], ['spr_pinkspeaker_shocked', 0, false, true, -1, false],
  ['spr_pinkspeaker_exploded', 0, false, false, -1, false], ['spr_pinkspeaker_angryblush', 0, false, false, -1, false],
];
class PinkSpeaker extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_pinkspeaker_silhouette';
  }
  // (created at depth -50, in front of Chapter 5's dialogue box at depth 0; this port's box is at -500)
  step() { this.depth = -600; }
  create() {
    Object.assign(this, {
      anim_spd: 0.2, image_speed: 0.2, image_xscale: 2, image_yscale: 2, visi: false, playing: false, silhouette: true,
      sweat: false, tailwag: false, crying: false, sweat_index: 0, tail_index: 0, cry_index: 0,
    });
  }
  draw() {
    const flag = Math.min(global.fe | 0, FACES.length - 1);
    const face = FACES[flag];
    this.sprite_index = face[0];
    const w = instancesOf('obj_writer')[0];
    if (this.silhouette || (w && global.typer == 97 && global.fe != 0)) {
      if (this.silhouette || this.visi || (w && w.formatted != 0)) {
        this.visi = true;
        if (face[3] == 0 && (this.silhouette || (w && w.halt > 0))) {
          if (face[4] != -1) {
            this.sprite_index = face[4];
            this.playing = true;
            this.image_speed = this.anim_spd;
          } else {
            this.playing = false;
            this.image_index = face[1];
            this.image_speed = 0;
          }
        } else {
          if (!this.playing) this.image_index = face[1];
          this.playing = true;
          this.image_speed = this.anim_spd;
        }
      }
    } else {
      this.playing = false;
      this.visi = false;
    }
    if (this.sweat && this.visi) this.sweat_index = this.playing ? Math.min(this.sweat_index + this.anim_spd, 2) : 2;
    else this.sweat_index = -2;
    this.tailwag = face[2];
    if (this.tailwag) this.tail_index = (this.tail_index + this.anim_spd) % 11;
    this.crying = face[5];
    if (this.crying) this.cry_index = (this.cry_index + this.anim_spd) % 2;
    let wave = 0, xadj = 0;
    this.image_xscale = 2;
    if (this.sprite_index === 'spr_pinkspeaker_cry' || this.sprite_index === 'spr_pinkspeaker_overjoyed') {
      wave = S.scr_wave(0, 10, 0.4, 0);
      this.image_xscale = S.scr_wave(0, 2, 1.5, 0) > 1 ? -2 : 2;
      xadj = this.image_xscale < 0 ? Math.abs(this.sprite_width) : 0;
    }
    if (this.visi && !instance_exists('obj_battlecontroller')) {
      if (this.tailwag) draw_sprite_ext('spr_pinkspeaker_tail', this.tail_index, this.x + 2, this.y, this.image_xscale, this.image_yscale, 0, 0xffffff, this.image_alpha);
      draw_sprite_ext(this.sprite_index, this.image_index, this.x + xadj, this.y + wave, this.image_xscale, this.image_yscale, 0, 0xffffff, this.image_alpha);
      if (this.sweat && this.sweat_index >= 0) draw_sprite_ext('spr_pinkspeaker_sweatdrop', this.sweat_index, this.x, this.y, this.image_xscale, this.image_yscale, 0, 0xffffff, this.image_alpha);
      if (this.crying) draw_sprite_ext('spr_pinkspeaker_tears', this.cry_index, this.x - 2, this.y + 40, this.image_xscale, this.image_yscale, 0, 0xffffff, this.image_alpha);
    }
  }
}
defineObject('obj_pinkspeaker', PinkSpeaker);

// ---------------------------------------------------------------- obj_marker_centerpoint

// scr_marker_centered_frominstance(inst): a copy of the instance that turns around its middle, with
// its own step_func.
class MarkerCenterpoint extends Instance {
  create() { this.step_func = null; this.blend = 0; this.fog = false; }
  step() { if (typeof this.step_func === 'function') this.step_func.call(this); }
  draw() {
    const ox = this.sprite_width / 2 - sprite_get_xoffset(this.sprite_index) * this.image_xscale;
    const oy = this.sprite_height / 2 - sprite_get_yoffset(this.sprite_index) * this.image_yscale;
    const rx = lengthdir_x(ox, this.image_angle) - lengthdir_y(oy, this.image_angle);
    const ry = lengthdir_y(ox, this.image_angle) + lengthdir_x(oy, this.image_angle);
    draw_sprite_ext(this.sprite_index, this.image_index, this.x - rx, this.y - ry, this.image_xscale, this.image_yscale,
      this.image_angle, 0xffffff, this.image_alpha);
  }
}
defineObject('obj_marker_centerpoint', MarkerCenterpoint);
function markerCenteredFrom(a) {
  const m = instance_create(a.x, a.y, 'obj_marker_centerpoint');
  Object.assign(m, { sprite_index: a.sprite_index, image_angle: a.image_angle, image_index: a.image_index,
    image_speed: a.image_speed, image_xscale: a.image_xscale, image_yscale: a.image_yscale, depth: a.depth });
  const ox = m.sprite_width / 2 - sprite_get_xoffset(m.sprite_index) * m.image_xscale;
  const oy = m.sprite_height / 2 - sprite_get_yoffset(m.sprite_index) * m.image_yscale;
  m.x += lengthdir_x(ox, m.image_angle) - lengthdir_y(oy, m.image_angle);
  m.y += lengthdir_y(ox, m.image_angle) + lengthdir_x(oy, m.image_angle);
  return m;
}

// ---------------------------------------------------------------- the scene's anonymous functions

const shove = (o, kx, sx, rx, t) => {
  S.scr_shakescreen(o);
  scr_lerpvar_instance(o.kr_actor, 'x', o.kr_actor.x, o.kr_actor.x - kx, t, 2, 'out');
  scr_lerpvar_instance(o.su_actor, 'x', o.su_actor.x, o.su_actor.x - sx, t, 2, 'out');
  scr_lerpvar_instance(o.ra_actor, 'x', o.ra_actor.x, o.ra_actor.x - rx, t, 2, 'out');
};
// Pink lands and Orange flies off, spinning (Step_0 2768: the retry; 20903: her outburst).
function orangeFlies() {
  shove(this, 18, 10, 14, 20);
  this.ora_actor.visible = false;
  this.ora_actor.sprite_index = 'spr_orange_surprised';
  const m = this.ora_fly_marker = markerCenteredFrom(this.ora_actor);
  Object.assign(m, { image_xscale: -2, gravity: 1, vspeed: -17, hspeed: -25 });
  m.step_func = function () { this.image_angle += 42; };
  this.su_actor.sprite_index = 'spr_susie_shock_r';
  this.ra_actor.sprite_index = 'spr_ralsei_shocked_right';
}
const FN = {
  2768: orangeFlies,
  20903: orangeFlies,
  // the rumble rising as Pink's voice comes closer, and stopping
  8001() { snd_volume(this.rumble_sound, 0.7, 20); },
  8362() { snd_volume(this.rumble_sound, 0, 0); },
  // Orange bursts out of the red flowerpot and jumps next to Pink
  31588() {
    for (const m of instancesOf('obj_marker')) {
      if (m.sprite_index !== 'spr_fcastle_pink_flowerpot_explode') continue;
      const an = instance_create(m.x, m.y, 'obj_animator');
      Object.assign(an, { target: m, initframe: 1, endframe: 4, fake_image_speed: 0.2 });
      Object.assign(this.ora_actor, { x: m.x, y: m.y, auto_depth: 0, depth: m.depth - 10 });
    }
    S.scr_jump_to_point(this.ora_actor, this.pkpos.x - 70, this.orapos.y, 10, 30);
    this.ora_actor.image_speed = 0.2;
  },
  // Pink's stomp
  33100() {
    shove(this, 9, 5, 7, 15);
    scr_lerpvar_instance(this.ora_actor, 'x', this.ora_actor.x, this.ora_actor.x + 10, 15, 2, 'out');
    this.su_actor.sprite_index = 'spr_susie_shock_r';
    this.ra_actor.sprite_index = 'spr_ralsei_shocked_right';
  },
  // Orange hopping (as the actor), and landing
  35171() {
    this.gravity = 1;
    if (this.y >= this.floor_y) { this.vspeed = -7; this.y = this.floor_y; }
    this.reflect_jump_y = (this.floor_y - this.y) * 2;
  },
  35398() {
    if (this.y >= this.floor_y) { this.reflect_jump_y = 0; this.vspeed = 0; this.y = this.floor_y; this.gravity = 0; }
  },
  // her theme picks up from 14.3 s
  37719() { audio_sound_set_track_position(global.currentsong[1], 14.3); },
};
// method(self, fn): the custom functions run as the scene; the actor's step functions as the actor.
const AS_ACTOR = new Set([35171, 35398]);
defineScript('pinkSceneFn', (owner, id) => (AS_ACTOR.has(id) ? function () { FN[id].call(this); } : () => FN[id].call(owner)));
defineScript('scr_jump_to_point', (inst, x, y, speed, time) => {
  const j = instance_create(inst.x, inst.y, 'obj_jump_to_point');
  Object.assign(j, { target: inst, endx: x, endy: y, jumpspeed: speed, jumptime: time });
  return j;
});

// ---------------------------------------------------------------- to the battle and back

// scr_battle(224, 3, marker): the fight, from where everyone stands; Pink's marker shows until the
// battle's Pink takes over. (A frame later, so the scene's step finishes first.)
class BattleStart extends Instance {
  create() { this.visible = false; this.alarm[0] = 1; }
  alarm0() {
    const h = this.handoff;
    G.pinkScene = h;
    startBattle({
      intro: true,
      fromScene: true,
      introStart: h.party,
      onStart() {
        enterRoom(ROOM, 640, 480);
        for (const p of CUT_ASSETS.filter(a => a.sprite === 'spr_fcastle_pink_flowerpot')) {
          // (at their room depth, as the scene's init gives them: behind Pink's black squares)
          const m = scr_marker(p.x, p.y, p.color === 255 ? 'spr_fcastle_pink_flowerpot_explode' : p.sprite);
          Object.assign(m, { image_xscale: 2, image_yscale: 2, image_speed: 0 });
          scr_depth(m);
          if (p.color === 255) m.depth += 260;
        }
        // (scr_battle: the enemy's marker slides to her place in the battle, monstermakex / monstermakey of
        // encounter 224, in 20 frames and is gone after 25, when the battle controller makes Pink there)
        const m = scr_dark_marker(h.pink[0], h.pink[1], h.pinkSprite);
        m.image_index = 1;
        moveToPoint(m, 470, 131, 20);
        scr_doom(m, 25);
      },
    });
  }
}
defineObject('obj_sim_pink_battlestart', BattleStart);
defineScript('scr_battle', (no, kind, marker) => {
  const enc = instancesOf('obj_dw_pink_encounter')[0];
  if (!enc) return;
  const at = a => [a.x, a.y];
  const handoff = {
    party: [at(enc.kr_actor), at(enc.su_actor), at(enc.ra_actor)],
    pink: [marker?.x ?? enc.pk_actor.x, marker?.y ?? enc.pk_actor.y],
    pinkSprite: marker?.sprite_index ?? 'spr_pink_angle',
    orange: at(enc.ora_actor),
    orangeSprite: enc.ora_actor.sprite_index,
    orangeVisible: !!enc.ora_actor.visible,
  };
  for (const a of instancesOf('obj_actor')) a.visible = false;
  if (marker) marker.visible = false;
  Object.assign(instance_create(0, 0, 'obj_sim_pink_battlestart'), { handoff });
});

// obj_persistentfadein: the fade into the next room (Pink's room), which the simulator does not go to.
class PersistentFadeIn extends Instance {
  create() { instance_destroy(this); }
}
defineObject('obj_persistentfadein', PersistentFadeIn);

// room_goto(room_dw_fcastle_pinkroom): the scene is over; the simulator's result screen follows.
defineScript('room_goto', () => {
  G.pinkScene = null;
  S.startEnding('win', { afterScene: true });
});

async function enterEncounter() {
  await Promise.all([loadRoom(ROOM), ...MUSIC.map(m => loadMusic(m).catch(() => {}))]);
  const tempflag = (global.tempflag ?? []).slice();
  const bombs = (G.settings?.bombs | 0) % 3;
  gotoRoom();
  global.tempflag = tempflag.length ? tempflag : new Array(100).fill(0);
  global.flag = new Array(10000).fill(0);
  global.flag[1914] = bombs;
  global.flag[8] = G.settings?.simplify ? 1 : 0;
  global.chapter = 5;
  global.darkzone = 1;
  global.fighting = 0;
  global.interact = 1;
  global.char = [1, 2, 3];
  global.currentsong = [null, null];
  global.msg = new Array(100).fill('%%');
  global.lang = 'en';
  global.typer = 6;
  global.fc = 0;
  global.fe = 0;
  global.hp ??= [0, 280, 340, 250];
  global.maxhp ??= [0, 280, 340, 250];
  enterRoom(ROOM, 640, 480);
  instance_create(0, 0, 'obj_time');
  instance_create(0, 0, 'obj_castlereflect_manager');
  instance_create(-58, 120, 'obj_leafpetals');
}

// BEGIN with SCENES on: the encounter, then the fight. retry: the short version (a CONTINUE).
export async function startPinkScene({ retry = false } = {}) {
  if (G.settings?.scenes === false) return startBattle({ intro: G.settings?.intro !== false });
  G.pinkPartySpots = null;
  G.pinkScene = null;
  if (!retry) global.tempflag = new Array(100).fill(0);
  await enterEncounter();
  global.tempflag[62] = retry ? Math.max(1, global.tempflag[62] | 0) : 0;
  instance_create(40, 0, 'obj_dw_pink_encounter');
}

// After the win: back in the room where the fight started, for con 5 on.
export async function startPinkAfterScene() {
  const h = G.pinkScene;
  if (!h) return S.startEnding('win');
  G.pinkPartySpots = h.party;
  await enterEncounter();
  global.tempflag[62] = Math.max(1, global.tempflag[62] | 0);
  global.flag[1846] = 0;
  const enc = instance_create(40, 0, 'obj_dw_pink_encounter');
  // The scene's own steps up to the fight (con 2's actors), as the fight left them.
  enc.cutscene_master = scr_cutscene_make(enc);
  S.scr_maincharacters_actors(enc);
  enc.ora = enc.actor_count + 1;
  enc.ora_actor = instance_create(h.orange[0], h.orange[1], 'obj_actor');
  scr_actor_setup(enc.ora, enc.ora_actor, 'orange');
  // (Orange and Pink as the scene left them: no auto walking, facing or depth; Kris, Susie and Ralsei are
  // new actors, as scr_maincharacters_actors makes them again after the fight)
  Object.assign(enc.ora_actor, { sprite_index: h.orangeSprite, visible: h.orangeVisible, auto_walk: 0, auto_facing: 0, auto_depth: 0, depth: 97000 });
  enc.pk = enc.actor_count + 2;
  enc.pk_actor = instance_create(h.pink[0], h.pink[1], 'obj_actor');
  scr_actor_setup(enc.pk, enc.pk_actor, 'pink');
  Object.assign(enc.pk_actor, { sprite_index: 'spr_pink_walk_left', image_index: 0, image_speed: 0, auto_walk: 0, auto_facing: 0, auto_depth: 0, depth: 5000 });
  enc.su_actor.mask_index = 'spr_susie_walk_right_dw';
  enc.con = 4;
  enc.customcon = 0;
  enc.alarm[0] = -1;
}
defineScript('startPinkScene', startPinkScene);
defineScript('startPinkAfterScene', startPinkAfterScene);

void draw_sprite;
void sprite_get_width;
void scr_jump_to_point_sprite;
void instance_destroy;
