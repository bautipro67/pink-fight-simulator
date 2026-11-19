// Party damage, down state, revive/heal, enemy targeting, game over trigger.
import {
  global, G, defineScript, S, instance_create, instance_exists, withObj, choose, round, ceil,
} from '../runtime/gm.js?v=20261119213904';
import { snd_play, snd_stop, snd_free_all } from '../runtime/audio.js?v=20261119213904';
import { withInst } from './common.js?v=20261119213904';

const g = global;

// scr_damage(canKill = true): bullet scope. Reads caller.target (slot, 3 = all, 4 = anyone) and
// caller.damage (and caller.element). Chapter 5: defense through scr_damage_calculation, armor
// element resistances, SethSpecs' longer invincibility, Pink's HARD mode (flag 1914 = 2).
defineScript('scr_damage_calculation', (dmg, slot) => {
  let d = dmg;
  const def = g.battledf[slot];
  const maxhp = g.maxhp[g.char[slot]];
  for (let i = 0; i < def; i++) {
    if (d > maxhp / 5) d -= 3;
    else if (d > maxhp / 8) d -= 2;
    else d -= 1;
  }
  return Math.max(d, 1);
});

defineScript('scr_party_hpaverage', () => {
  let hp = 0, maxhp = 0;
  for (let i = 0; i < 3; i++) if (g.char[i] > 0) { hp += g.hp[g.char[i]]; maxhp += g.maxhp[g.char[i]]; }
  return hp > 0 ? Math.floor(hp / maxhp) : 0;
});

defineScript('scr_randomtarget_old', (inst) => {
  let able = 1;
  if (g.charcantarget[0] == 0 && g.charcantarget[1] == 0 && g.charcantarget[2] == 0) able = 0;
  inst.mytarget = choose(0, 1, 2);
  if (able == 1) { while (g.charcantarget[inst.mytarget] == 0) inst.mytarget = choose(0, 1, 2); }
  else inst.mytarget = 3;
  g.targeted[inst.mytarget] = 1;
});

// scr_element_damage_reduction(element, char): what is left of the damage after the char's armor
// resistances (element 9 also covers 2 and 8, element 10 everything), at least a quarter.
defineScript('scr_element_damage_reduction', (element, c) => {
  let r = 1;
  if (element != 0) {
    for (let k = 1; k <= 2; k++) {
      const el = g.itemelement?.[c]?.[k] ?? 0, amt = g.itemelementamount?.[c]?.[k] ?? 0;
      if (el == 0) continue;
      if (el == element) r -= amt;
      if (el == 9 && (element == 2 || element == 8)) r -= amt;
      if (el == 10) r -= amt;
    }
  }
  return Math.max(r, 0.25);
});

const pinkHard = () => instance_exists('obj_pink_enemy') && g.flag[1914] == 2;

defineScript('scr_damage', (inst, canKill = true) => {
  const debug_inv = g.chemg_god_mode ?? 0;
  if (!(g.inv < 0 && debug_inv == 0)) return;
  const element = typeof inst.element === 'number' ? inst.element : 0;
  if (inst.target < 3) {
    if (g.hp[g.char[inst.target]] <= 0) {
      S.scr_randomtarget_old(inst);
      inst.target = inst.mytarget;
      withInst(g.charinstance[inst.target], h => { h.image_blend = 0xffffff; h.darkify = 0; });
    }
  }
  let remtarget = -1;
  if (inst.target == 4) {
    remtarget = 4;
    S.scr_randomtarget_old(inst);
    inst.target = inst.mytarget;
    for (let k = 0; k < 2; k++) {
      if (g.hp[g.char[inst.target]] / g.maxhp[g.char[inst.target]] < S.scr_party_hpaverage() / 2) {
        S.scr_randomtarget_old(inst);
        inst.target = inst.mytarget;
      }
    }
    if (inst.target == 0 && g.hp[g.char[0]] / g.maxhp[g.char[0]] < 0.35) {
      S.scr_randomtarget_old(inst);
      inst.target = inst.mytarget;
    }
    withInst(g.charinstance[inst.target], h => { h.image_blend = 0xffffff; h.darkify = 0; });
  }
  inst.chartarget = 3;
  if (pinkHard()) inst.damage = round(inst.damage * 1.21);
  let tdamage = inst.damage;
  // Simulator option: Easy Mode halves the damage the party takes.
  const easy = d => (G.settings?.easy ? Math.max(1, ceil(d / 2)) : d);
  if (inst.target < 3) {
    inst.chartarget = g.char[inst.target];
    if (g.ignoredefense == 1) tdamage = ceil(tdamage);
    else {
      tdamage = S.scr_damage_calculation(tdamage, inst.target);
      if (g.charaction[inst.target] == 10) tdamage = ceil(2 * tdamage / 3);
      tdamage = ceil(tdamage * S.scr_element_damage_reduction(element, g.char[inst.target]));
      if (tdamage < 1) tdamage = 1;
    }
    tdamage = easy(tdamage);
  }
  if (!instance_exists('obj_shake')) instance_create(0, 0, 'obj_shake');
  withInst(g.charinstance[inst.target], h => { h.hurt = 1; h.hurttimer = 0; });
  if (!canKill) tdamage = Math.min(tdamage, g.hp[inst.chartarget] - 1);
  inst.tdamage = tdamage;
  inst.hpdiff = tdamage;
  withObj('obj_dmgwriter', d => { if (d.delaytimer >= 1) d.killactive = 1; });
  let doomtype = -1;
  withObj('obj_heart', h => { h.dmgnoise = 1; });
  if (inst.target < 3) {
    const ct = inst.chartarget;
    if (g.hp[ct] <= 0) {
      doomtype = 4;
      g.hp[ct] -= round(tdamage / 4);
      inst.hpdiff = round(tdamage / 4);
    } else {
      g.hp[ct] -= tdamage;
      if (g.hp[ct] <= 0) {
        inst.hpdiff = Math.abs(g.hp[ct] - g.maxhp[ct] / 2);
        doomtype = 4;
        g.hp[ct] = round(-g.maxhp[ct] / 2);
        S.scr_dead(inst.target);
      }
    }
    const h = g.charinstance[inst.target];
    if (h) {
      const dw = instance_create(h.x, h.y + h.myheight - 24, 'obj_dmgwriter');
      dw.damage = inst.hpdiff;
      dw.type = doomtype;
      inst.dmgwriter = dw;
    }
  }
  if (inst.target == 3) {
    for (let hpi = 0; hpi < 3; hpi++) {
      const ct = g.char[hpi];
      inst.chartarget = ct;
      if (g.hp[ct] >= 0) {
        // As in the GML, tdamage carries over: each hero's defense reduces it further.
        if (g.ignoredefense == 1) tdamage = ceil(tdamage);
        else tdamage = S.scr_damage_calculation(tdamage, hpi);
        tdamage = ceil(tdamage * S.scr_element_damage_reduction(element, ct));
        const td = easy(tdamage);
        if (g.charaction[hpi] == 10) g.hp[ct] -= ceil(3 * td / 4);
        else g.hp[ct] -= td;
        if (g.hp[ct] <= 0) g.hp[ct] = round(-g.maxhp[0] / 2);
      }
    }
    inst.tdamage = tdamage;
  }
  g.inv = g.invc * 40 * (pinkHard() ? 0.5 : 1);
  // SethSpecs anywhere in the party: 20% longer (70% of the normal time on Pink's HARD mode).
  if ([1, 2, 3].some(c => g.chararmor1[c] == 35 || g.chararmor2[c] == 35)) g.inv = g.invc * 40 * (pinkHard() ? 0.7 : 1.2);
  let gameover = 1;
  for (let i = 0; i < 3; i++) if (g.char[i] != 0 && g.hp[g.char[i]] > 0) gameover = 0;
  if (gameover == 1) S.scr_gameover();
  if (remtarget != -1) inst.target = remtarget;
});

// (scr_damage_all is Chapter 4/5's, in src/pink/ch4lib.js.)

defineScript('scr_dead', (slot) => {
  g.charmove[slot] = 0;
  g.charcantarget[slot] = 0;
  g.chardead[slot] = 1;
  g.charaction[slot] = 0;
  g.charspecial[slot] = 0;
});

defineScript('scr_revive', (slot) => {
  g.charmove[slot] = 1;
  g.charcantarget[slot] = 1;
  g.chardead[slot] = 0;
});

// scr_heal(slot, amount): returns the HP actually gained.
defineScript('scr_heal', (slot, amt) => {
  let abovemaxhp = 0, belowzero = 0;
  const t = g.char[slot];
  const curhp = g.hp[t];
  if (g.hp[t] <= 0) belowzero = 1;
  if (g.hp[t] > g.maxhp[t]) abovemaxhp = 1;
  if (abovemaxhp == 0) {
    g.hp[t] += amt;
    if (g.hp[t] > g.maxhp[t]) g.hp[t] = g.maxhp[t];
  }
  if (belowzero == 1 && g.hp[t] >= 0) {
    if (g.hp[t] < ceil(g.maxhp[t] / 6)) g.hp[t] = ceil(g.maxhp[t] / 6);
    S.scr_revive(slot);
  }
  snd_stop('snd_power');
  snd_play('snd_power');
  return g.hp[t] - curhp;
});

defineScript('scr_healall', (amt) => {
  for (let i = 0; i < 3; i++) if (g.char[i] != 0) S.scr_heal(i, amt);
});

// scr_randomtarget(): monster/bullet scope; sets caller.mytarget and marks global.targeted.
defineScript('scr_randomtarget', (inst) => {
  let abletotarget = 1;
  if (g.charcantarget[0] == 0 && g.charcantarget[1] == 0 && g.charcantarget[2] == 0) abletotarget = 0;
  inst.mytarget = choose(0, 1, 2);
  if (abletotarget == 1) {
    while (g.charcantarget[inst.mytarget] == 0) inst.mytarget = choose(0, 1, 2);
  } else inst.mytarget = 3;
  g.targeted[inst.mytarget] = 1;
  // Chapter 2+: every standing hero is marked; the bullet picks its victim on hit (target 4).
  if (inst.mytarget != 3) {
    for (let i = 0; i < 3; i++) if (g.charcantarget[i]) g.targeted[i] = 1;
    inst.mytarget = 4;
  }
});

defineScript('scr_targetall', (inst) => {
  for (let i = 0; i < 3; i++) if (g.charcantarget[i] == 1) g.targeted[i] = 1;
  inst.mytarget = 3;
  inst.target = 3;
});

// scr_gameover(): stop everything and go to the heart-break sequence.
// The room change happens at the start of the next frame (obj_time), like room_goto.
defineScript('scr_gameover', () => {
  if (G.pendingGameover) return;
  snd_free_all();
  snd_play('snd_hurt1');
  let shot = null;
  if (G.ctx) {
    shot = document.createElement('canvas');
    shot.width = G.ctx.canvas.width;
    shot.height = G.ctx.canvas.height;
    shot.getContext('2d').drawImage(G.ctx.canvas, 0, 0);
  }
  // The SOUL appears where it was (or where it would enter the box).
  const heart = G.instances.find(i => i.alive && (i.constructor.objName === 'obj_heart'));
  G.pendingGameover = { x: heart ? heart.x - G.camX : (g.heartx ?? 310), y: heart ? heart.y - G.camY : (g.hearty ?? 160), shot };
});
