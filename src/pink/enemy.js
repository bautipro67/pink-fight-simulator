// PINK (Chapter 5): obj_pink_enemy, for now the shell the rest gets ported into (research/PORT_NOTES.md):
// Create's music, black backdrop and idle sprite, Other_22 (scr_monstersetup 118), Check, the hurt
// state and a turn without bullets. The DOKI meter, the dates, the GHOST / BODY split, the dialogue
// and the attacks (dbullet types 200-209) come next.
import {
  global, defineObject, instance_create, instance_create_depth, instance_destroy, instance_exists, instancesOf, draw_sprite_ext,
  snd_stop, S,
} from './rt.js?v=20261115054137';
import { camerax, cameray } from './common.js?v=20261115054137';
import { snd_init, mus_loop_ext } from '../runtime/audio.js?v=20261115054137';
// obj_monsterparent (Create = scr_enemy_object_init: state, siner, the 2x scale...).
import { MonsterParent } from '../battle/misc.js?v=20261115054137';

function msgset(n, s) {
  global.msg ??= [];
  global.msg[n] = s;
  global.msgno = n;
  for (let i = n + 1; i < global.msg.length; i++) global.msg[i] = '%%';
}
// A full-screen black marker (obj_marker with spr_whitepixel), as Create makes two.
function blackSquare(x, y, depth, w, h) {
  const m = instance_create_depth(x, y, depth, 'obj_marker');
  m.sprite_index = 'spr_whitepixel';
  m.image_xscale = w;
  m.image_yscale = h;
  m.image_blend = 0;
  return m;
}

export class PinkEnemy extends MonsterParent {
  create() {
    super.create?.();
    // Create_0: her theme, no battle background, two black squares behind.
    if (global.batmusic?.[1]) snd_stop(global.batmusic[1]);
    global.batmusic ??= [];
    global.batmusic[0] = snd_init('pink.ogg');
    global.batmusic[1] = mus_loop_ext(global.batmusic[0], 1, 1);
    for (const b of instancesOf('obj_battleback')) instance_destroy(b);
    this.black_square_bg = blackSquare(camerax() - 10, cameray() + 40, this.depth + 999, 640 + 20, 320);
    this.black_square_bg2 = blackSquare(camerax() - 10, cameray() - 10, this.depth + 9999, 640 + 20, 480 + 20);
    this.talkmax = 90;
    this.idlesprite = 'spr_pink_idle';
    this.hurtsprite = 'spr_pink_front_surprised_nohead';
    this.sparedsprite = 'spr_pink_wistful';
    this.sprite_index = this.idlesprite;
    this.image_speed = 1 / 6;
    this.turns = 1;
    this.phaseturns = 0;
    this.difficulty = 0;
    this.datecount = 0;
    this.doki = 0;
    this.dokimax = 15;
    this.damage = 132;
    this.myattackchoice = -1;
  }
  // Other_22
  user12() {
    global.monsterx[this.myself] = this.x + this.sprite_width / 2;
    global.monstery[this.myself] = this.y + this.sprite_height / 2;
    S.scr_monstersetup(this);
  }
  step() {
    if (global.monster[this.myself] == 1) {
      if (S.scr_isphase('enemytalk') && this.talked == 0) {
        S.scr_randomtarget(this);
        if (!instance_exists('obj_darkener')) instance_create(0, 0, 'obj_darkener');
        this.talked = 1;
        global.mnfight = 1.5;
      }
      // (no attacks yet: a short empty bullet phase)
      if (global.mnfight == 1.5) {
        global.mnfight = 2;
        S.scr_turntimer(60);
        this.turns += 1;
      }
    }
    if (global.myfight == 3) this.stepActs();
    if (this.state == 3) S.scr_enemy_hurt(this);
  }
  stepActs() {
    if (this.acting == 1 && this.actcon == 0) {
      this.actcon = 1;
      msgset(0, [
        '* PINK - A Lightner ghost in a magical girl\'s body^1. Doki her heart with flirts^1, and...!?/%',
        '* PINK - A Lightner ghost in a Darkner girl\'s body^1. Fill the DOKI METER to DATE!/%',
        '* PINK - A Lightner ghost^1, or a Darkner body!^1? Fill the DOKI METER to DATE them both!/%',
        '* PINK - Without a spirit to control it^1, the body will break down..^1./%',
      ][Math.min(this.datecount, 3)]);
      S.scr_battletext_default(this);
    }
    // (the flirts and the dates are not ported yet: the game's "no effect" lines)
    if (this.acting >= 2 && this.actcon == 0) {
      this.actcon = 1;
      msgset(0, '* You flirted...&* But it had no effect!/%');
      S.scr_battletext_default(this);
    }
    if ((this.actingsus && this.actconsus == 1) || (this.actingral && this.actconral == 1)) {
      const sus = this.actingsus;
      this.actconsus = this.actconral = 0;
      this.actcon = 1;
      msgset(0, sus ? '* Susie flirted...&* But it had no effect!/%' : '* Ralsei flirted...&* But it had no effect!/%');
      S.scr_battletext_default(this);
    }
    if (this.actcon == 1 && !instance_exists('obj_writer')) S.scr_nextact();
  }
  draw() {
    if (this.state == 3) draw_sprite_ext(this.hurtsprite, 0, this.x + (this.shakex ?? 0), this.y, 2, 2, 0, 0xffffff, 1);
    S.scr_enemy_drawidle_generic(this, 1 / 6);
    if (this.becomeflash == 0) this.flash = 0;
    this.becomeflash = 0;
  }
  // CleanUp_0
  cleanUp() {
    instance_destroy(this.black_square_bg);
    instance_destroy(this.black_square_bg2);
  }
}
defineObject('obj_pink_enemy', PinkEnemy);
