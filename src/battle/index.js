// Imports every battle-system module so their objects and scripts get registered.
import './misc.js?v=20261116031545';
import './text.js?v=20261116031545';
import './setup.js?v=20261116031545';
import './controller.js?v=20261116031545';
import './heroes.js?v=20261116031545';
import './fight.js?v=20261116031545';
import './damage.js?v=20261116031545';
import './spells.js?v=20261116031545';
import './endbattle.js?v=20261116031545';

export { startBattle } from './setup.js?v=20261116031545';
export { MonsterParent } from './misc.js?v=20261116031545';
