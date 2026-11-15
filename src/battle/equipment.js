// Chapter 5 equipment and items (from scr_weaponinfo / scr_armorinfo / scr_iteminfo) and the
// player's chosen loadout, remembered in the browser. The EQUIPMENT screen edits it and
// init_battle_globals applies it to every fight and practice run.

// id -> [name, at, df, mag, who can use it (char ids: 1 Kris, 2 Susie, 3 Ralsei), ability]
// Only what Kris, Susie or Ralsei can hold (not Noelle's rings, the debug EverybodyWeapon or the
// gear nobody can equip). Graze effects stack per armor worn across the party (obj_grazebox Create).
export const WEAPONS = {
  1: ['Wood Blade', 0, 0, 0, [1], ''],
  3: ['Red Scarf', 0, 0, 0, [3], ''],
  5: ['Spookysword', 2, 0, 0, [1], 'Spookiness UP'],
  6: ['Brave Ax', 2, 0, 0, [2], 'Guts Up'],
  7: ['Devilsknife', 5, 0, 4, [2], 'Rude Buster costs 100 TP'],
  8: ['Trefoil', 4, 0, 0, [1], 'Money Earned UP'],
  9: ['Ragger', 2, 0, 0, [3], ''],
  10: ['DaintyScarf', 0, 0, 2, [3], 'Fluffiness UP'],
  11: ['TwistedSwd', 16, 0, 0, [1], 'Trance'],
  14: ['BounceBlade', 2, 1, 0, [1], 'Defense'],
  15: ['CheerScarf', 1, 0, 2, [3], 'Smiley'],
  16: ['MechaSaber', 4, 0, 0, [1], 'Annoying'],
  17: ['AutoAxe', 4, 0, 0, [2], 'BadIdea'],
  18: ['FiberScarf', 2, 0, 2, [3], ''],
  19: ['Ragger2', 5, 0, -1, [3], 'Prickly'],
  21: ['PuppetScarf', 10, 0, -6, [3], ''],
  23: ['Saber10', 6, 0, 0, [1], ''],
  24: ['ToxicAxe', 6, 0, 0, [2], ''],
  25: ['FlexScarf', 4, 0, 1, [3], ''],
  26: ['BlackShard', 16, 0, 0, [1], 'SlayDark'],
  30: ['WoodBlade2', 10, 0, 0, [1], 'Coolness'],
  31: ['Thatchet', 10, 0, 0, [2], 'Wicked'],
  // (scr_spellinfo: Pacify and Heal cost no TP)
  32: ['BlueShoes', 2, 4, 6, [3], 'Pacify costs 0 TP'],
  // (scr_boltcheck_onebutton: a perfect FIGHT press scores 150 more)
  33: ['AquaKnife', 10, 2, 0, [1], 'Critical: perfect presses hit harder'],
  // (obj_battlecontroller Create: +12 AT, +3 DF, +3 MAG in battle)
  35: ['BrokenScarf', 0, 0, 0, [3], 'In battle: AT +12, DF +3, MAG +3'],
  37: ['MistleWP', 6, 0, 2, [3], ''],
  50: ['JingleBlade', 7, 1, 0, [1], 'Festive'],
  51: ['ScarfMark', 4, 1, 1, [3], ''],
  52: ['JusticeAxe', 12, 0, 0, [2], '???'],
  53: ['Winglade', 8, 0, 0, [1], '$ +5%'],
  // (obj_heroparent: Susie heals 10% of her max HP when her FIGHT hits)
  54: ['AbsorbAx', 8, 0, 0, [2], 'Vampire: heals Susie on a hit'],
};
// Unlocked with the code TOO HARD (the Codes box on the page). Anyone can use it, but only one
// party member can hold it at a time.
export const CODE_WEAPON = 99;
WEAPONS[CODE_WEAPON] = ['TooHardSword', 40, 10, 20, [1, 2, 3], 'Too hard! One holder at a time'];
const ALL = [1, 2, 3], KR = [1, 3];
export const ARMORS = {
  0: ['(none)', 0, 0, 0, ALL, ''],
  1: ['Amber Card', 0, 1, 0, ALL, ''],
  2: ['Dice Brace', 0, 2, 0, ALL, ''],
  3: ['Pink Ribbon', 0, 1, 0, KR, 'Graze area +20%, graze TP and time -20%'],
  4: ['White Ribbon', 0, 2, 0, KR, 'Cuteness'],
  5: ['IronShackle', 1, 2, 0, ALL, ''],
  6: ['MouseToken', 0, 0, 2, ALL, ''],
  7: ['Jevilstail', 2, 2, 2, ALL, ''],
  8: ['Silver Card', 0, 2, 0, ALL, '$ +5%'],
  9: ['TwinRibbon', 0, 3, 0, KR, 'Graze area +25%, graze TP and time -25%'],
  10: ['GlowWrist', 0, 2, 0, ALL, ''],
  11: ['ChainMail', 0, 3, 0, ALL, ''],
  12: ['B.ShotBowtie', 0, 2, 1, ALL, ''],
  13: ['SpikeBand', 2, 1, 0, ALL, ''],
  14: ['Silver Watch', 0, 2, 0, ALL, 'Grazing shortens turns 10% more'],
  15: ['TensionBow', 0, 2, 0, ALL, 'Graze TP +10%'],
  16: ['Mannequin', 0, 0, 0, [1], '???'],
  17: ['DarkGoldBand', 0, 0, 0, [1], ''],
  18: ['SkyMantle', 0, 1, 0, ALL, 'Elec/Holy'],
  19: ['SpikeShackle', 3, 1, 0, ALL, 'Attack'],
  20: ['FrayedBowtie', 1, 1, 1, KR, ''],
  21: ['Dealmaker', 0, 5, 5, ALL, '$ +30%'],
  22: ['RoyalPin', 0, 3, 1, ALL, ''],
  // (its defense is the chapter number)
  23: ['ShadowMantle', 0, 5, 0, ALL, 'Dark/Star'],
  24: ['LodeStone', 0, 2, 0, ALL, 'Graze TP +5%'],
  25: ['GingerGuard', 0, 3, 0, ALL, ''],
  26: ['BlueRibbon', 0, 1, 1, KR, 'Heals +1/8 (when this one heals)'],
  27: ['TennaTie', 0, 5, -2, ALL, ''],
  30: ['MonarchRBN', 0, 6, 2, KR, 'Heals +1/8 (when this one heals)'],
  31: ['TrueTie', 1, 5, 0, ALL, 'CatDefend'],
  32: ['DogWidow', 0, 6, 0, ALL, '$ -90%'],
  33: ['RedRibbon', 0, 4, 1, ALL, ''],
  34: ['NetskieHat', 0, 6, 0, ALL, ''],
  // (scr_damage: 20% longer invincibility after a hit)
  35: ['SethSpecs', 0, 4, 6, ALL, 'Invincibility +20%'],
  // (scr_spell: Susie's and Ralsei's spells 20% stronger)
  36: ['YellowHat', 4, 4, 4, ALL, 'Spells +20% (Susie, Ralsei)'],
  // (scr_spellinfo: Scythemare costs 50 TP)
  37: ['O.Glove', 4, 8, 0, [2], 'Scythemare costs 50 TP'],
  // (scr_endturn: DEFEND heals 16% of max HP)
  38: ['GreenApron', 0, 7, 0, ALL, 'DEFEND heals 16% HP'],
  50: ['Waferguard', 0, 4, 0, ALL, ''],
  51: ['MysticBand', 0, 0, 4, ALL, ''],
  52: ['PowerBand', 4, 0, 0, ALL, ''],
  53: ['PrincessRBN', 2, 4, 0, KR, 'Elegance'],
  54: ['GoldWidow', 1, 5, 1, ALL, '$ -10%'],
};
// Element resistances (scr_armorinfo armorelement / armorelementamount, read by
// scr_element_damage_reduction): armor id -> [element, share of the damage taken away].
// Pink's bullets are element 6, so the armors against it show it in their ability.
export const ARMOR_ELEMENTS = { 6: [7, 0.5], 16: [6, 0.2], 18: [1, 0.5], 20: [6, 0.15], 21: [6, 0.2], 23: [5, 0.66], 31: [6, 0.2] };
for (const [id, [el, amount]] of Object.entries(ARMOR_ELEMENTS)) {
  if (el !== 6) continue;
  const a = ARMORS[id];
  a[5] = (a[5] && a[5] !== '???' ? a[5] + ', ' : '') + `cat damage -${Math.round(amount * 100)}%`;
}
// Items usable in battle (src/battle/spells.js, controller.js): id -> [name, effect]
export const ITEMS = {
  0: ['(empty)', ''],
  1: ['Darker Candy', 'Heals 120 HP'],
  2: ['ReviveMint', 'Heals a downed ally'],
  5: ['BrokenCake', 'Heals 20 HP'],
  6: ['Top Cake', 'Heals team 160 HP'],
  7: ['Spincake', 'Heals team 180 HP'],
  8: ['Darkburger', 'Heals 70 HP'],
  9: ['LancerCookie', 'Heals 50 HP'],
  10: ['GigaSalad', 'Heals 4 HP'],
  11: ['ClubsSandwich', 'Heals team 70 HP'],
  12: ['HeartsDonut', 'Healing varies'],
  13: ['ChocDiamond', 'Healing varies'],
  14: ['Favwich', 'Heals ALL HP'],
  15: ['RouxlsRoux', 'Heals 50 HP'],
  16: ['CD Bagel', 'Heals 80 HP'],
  22: ['DD-Burger', 'Heals 60 HP 2x'],
  23: ['LightCandy', 'Heals 120 HP'],
  24: ['ButJuice', 'Heals 100 HP'],
  25: ['SpagettiCode', 'Heals team 30 HP'],
  26: ['JavaCookie', 'Healing varies'],
  27: ['TensionBit', 'Raises TP 32%'],
  28: ['TensionGem', 'Raises TP 50%'],
  29: ['TensionMax', 'Raises TP to max'],
  30: ['ReviveDust', 'Revives team 25%'],
  31: ['ReviveBrite', 'Revives team 100%'],
  34: ['TVDinner', 'Heals 100 HP'],
  36: ['FlatSoda', 'Heals 20 HP'],
  37: ['TVSlop', 'Heals 80 HP'],
  38: ['ExecBuffet', 'Heals team 100 HP'],
  39: ['DeluxeDinner', 'Heals 140 HP'],
  40: ['PunchBowl', 'Heals team 200 HP'],
  41: ['Flavigne', 'Heals 130 HP'],
  42: ['GreenTea', 'Heals 180 HP'],
  43: ['OrangeJuice', 'Heals 80 HP'],
  60: ['AncientSweet', 'Kris only +400'],
  61: ['Rhapsotea', 'Heals 115 HP'],
  62: ['Scarlixir', 'Heals 160 HP'],
  63: ['BitterTear', 'Heals ALL HP'],
  64: ['Schadenbrot', 'Heals team 200 HP'],
  65: ['TreeCake', 'Heals team 160 HP'],
  67: ['Raw Moon', 'Raises TP 16% +100 HP'],
  68: ['Phanta', 'Raises TP 16% +100 HP'],
  69: ['FlowerySoda', 'Raises TP 16% +50 HP'],
  70: ['Shikacola', 'Heals team 80 HP'],
};
export const ITEM_SLOTS = 12;
// The party owns one of each of these, so only one slot may hold it; stacking the ribbons would
// also take the graze TP down to nothing.
export const UNIQUE_ARMORS = [3, 9];
export const CHAR_NAMES = { 1: 'KRIS', 2: 'SUSIE', 3: 'RALSEI' };
// Stats when they meet Pink: Chapter 5 starts them at 240 / 290 / 210 HP and 17 / 22 / 15 attack,
// Susie 3 and Ralsei 14 magic (scr_gamestart_chapter_override); every battle won adds 2 HP up to
// 280 / 340 / 250, and every tenth one +1 attack and magic, twice (scr_levelup). As in the other
// simulators, the party has won every battle before the boss: [hp, at, df, mag]
export const BASE_STATS = { 1: [280, 19, 2, 0], 2: [340, 24, 2, 5], 3: [250, 17, 2, 16] };

// What the party carries into the fight (the simulator's pick of Chapter 5 gear): Winglade /
// JusticeAxe / ScarfMark, each with a Waferguard, plus the TrueTie (Kris), a PowerBand (Susie) and
// a MysticBand (Ralsei); and Chapter 5's food, a ReviveMint and a TensionGem.
export const DEFAULT_LOADOUT = {
  gear: { 1: [53, 50, 31], 2: [52, 50, 52], 3: [51, 50, 51] },
  items: [1, 1, 61, 62, 41, 42, 65, 64, 2, 28, 0, 0],
};

const KEY = 'pink-sim-loadout';
const clone = l => ({ gear: { 1: [...l.gear[1]], 2: [...l.gear[2]], 3: [...l.gear[3]] }, items: [...l.items] });
let loadout = null;

const usable = (table, id, c) => table[id] && table[id][4].includes(c);

const CODES_KEY = 'pink-sim-codes';
let codes = null;
function unlockedCodes() {
  if (!codes) {
    try { codes = JSON.parse(localStorage.getItem(CODES_KEY) || '[]'); } catch (e) { codes = []; }
    if (!Array.isArray(codes)) codes = [];
  }
  return codes;
}
export const weaponUnlocked = id => id !== CODE_WEAPON || unlockedCodes().includes('TOOHARD');

// A code typed in the page's Codes box: { ok, msg } for the message under it.
export function redeemCode(text) {
  const code = String(text || '').toUpperCase().replace(/\s+/g, '');
  if (code !== 'TOOHARD') return { ok: false, msg: 'That code does nothing.' };
  if (!unlockedCodes().includes(code)) {
    codes.push(code);
    try { localStorage.setItem(CODES_KEY, JSON.stringify(codes)); } catch (e) { /* not saved */ }
  }
  return { ok: true, msg: 'TooHardSword unlocked! Equip it in EQUIPMENT on the title screen (one character at a time).' };
}

export function getLoadout() {
  if (!loadout) {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { /* storage unavailable */ }
    loadout = clone(DEFAULT_LOADOUT);
    if (saved?.gear) {
      for (const c of [1, 2, 3]) {
        const [w, a1, a2] = saved.gear[c] || [];
        if (usable(WEAPONS, w, c) && weaponUnlocked(w)) loadout.gear[c][0] = w;
        if (usable(ARMORS, a1, c)) loadout.gear[c][1] = a1;
        if (usable(ARMORS, a2, c)) loadout.gear[c][2] = a2;
      }
    }
    // Older saves could repeat a one-of-a-kind armor: keep the first, empty the others.
    const worn = new Set();
    for (const c of [1, 2, 3]) {
      for (const slot of [1, 2]) {
        const id = loadout.gear[c][slot];
        if (!UNIQUE_ARMORS.includes(id)) continue;
        if (worn.has(id)) loadout.gear[c][slot] = 0;
        worn.add(id);
      }
    }
    let holder = false;
    for (const c of [1, 2, 3]) {
      if (loadout.gear[c][0] !== CODE_WEAPON) continue;
      if (holder) loadout.gear[c][0] = DEFAULT_LOADOUT.gear[c][0];
      holder = true;
    }
    if (Array.isArray(saved?.items)) {
      loadout.items = Array.from({ length: ITEM_SLOTS }, (_, i) => (ITEMS[saved.items[i]] ? saved.items[i] : 0));
    }
  }
  return loadout;
}

export function saveLoadout() {
  try { localStorage.setItem(KEY, JSON.stringify(loadout)); } catch (e) { /* not saved */ }
}

export function resetLoadout() {
  loadout = clone(DEFAULT_LOADOUT);
  saveLoadout();
}

// Options for a slot: the weapons or armors that character can use, or the items.
export const weaponChoices = c => Object.keys(WEAPONS).map(Number).filter(id => usable(WEAPONS, id, c) && weaponUnlocked(id)
  && !(id === CODE_WEAPON && [1, 2, 3].some(o => o !== c && getLoadout().gear[o][0] === id)));
export function armorChoices(c, slot) {
  const lo = getLoadout();
  const elsewhere = id => [1, 2, 3].some(o => [1, 2].some(s => (o !== c || s !== slot) && lo.gear[o][s] === id));
  return Object.keys(ARMORS).map(Number).filter(id => usable(ARMORS, id, c) && !(UNIQUE_ARMORS.includes(id) && elsewhere(id)));
}
export const itemChoices = () => Object.keys(ITEMS).map(Number);

// Total stats of a character with the current loadout: [hp, at, df, mag]
export function charStats(c) {
  const [hp, at, df, mag] = BASE_STATS[c];
  const [w, a1, a2] = getLoadout().gear[c];
  const parts = [WEAPONS[w], ARMORS[a1], ARMORS[a2]];
  return [hp, at + parts.reduce((s, p) => s + p[1], 0), df + parts.reduce((s, p) => s + p[2], 0), mag + parts.reduce((s, p) => s + p[3], 0)];
}
