// Player options and control bindings, remembered in this browser when storage is available.
import { G, controls, setControls } from './runtime/gm.js?v=20261115230517';
import { setMasterVolume } from './runtime/audio.js?v=20261115230517';

const SETTINGS_KEY = 'pink-sim-settings';
const CONTROLS_KEY = 'pink-sim-controls';

function read(key) {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; }
}
function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* not saved */ }
}

export function loadSettings() {
  const defaults = { simplify: false, intro: true, scenes: true, easy: false, volume: 1, hat: 'NONE', bombs: 0 };
  G.settings = { ...defaults, ...(read(SETTINGS_KEY) || {}) };
  setControls(read(CONTROLS_KEY));
}

export function saveSettings() {
  write(SETTINGS_KEY, G.settings);
}

export function saveControls() {
  write(CONTROLS_KEY, controls);
}

// Pink's own difficulty (global.flag[1914]), set in the game with one of her bombs before the fight:
// kept on the intended setting, made "NICE" (easier) or "MEAN" (harder).
export const BOMB_MODES = ['INTENDED', 'NICE', 'MEAN'];
export const bombMode = () => (G.settings?.bombs | 0) % 3;

// Best practice scores of full runs (from attack 1), by starting HP and Pink's difficulty
// (the intended setting keeps the plain HP key).
const BEST_KEY = 'pink-sim-best';
const bestKey = hp => (bombMode() ? `${hp}-${BOMB_MODES[bombMode()].toLowerCase()}` : hp);
export const getBest = hp => (read(BEST_KEY) || {})[bestKey(hp)] || 0;
export function saveBest(hp, score) {
  const all = read(BEST_KEY) || {};
  const k = bestKey(hp);
  if (score <= (all[k] || 0)) return false;
  all[k] = score;
  write(BEST_KEY, all);
  return true;
}

export function applyVolume() {
  setMasterVolume(G.settings.volume);
}
