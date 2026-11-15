// Imports every battle-system module so their objects and scripts get registered.
import './misc.js?v=20261115071747';
import './text.js?v=20261115071747';
import './setup.js?v=20261115071747';
import './controller.js?v=20261115071747';
import './heroes.js?v=20261115071747';
import './fight.js?v=20261115071747';
import './damage.js?v=20261115071747';
import './spells.js?v=20261115071747';
import './endbattle.js?v=20261115071747';

export { startBattle } from './setup.js?v=20261115071747';
export { MonsterParent } from './misc.js?v=20261115071747';
