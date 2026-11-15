// Imports every battle-system module so their objects and scripts get registered.
import './misc.js?v=20261115164340';
import './text.js?v=20261115164340';
import './setup.js?v=20261115164340';
import './controller.js?v=20261115164340';
import './heroes.js?v=20261115164340';
import './fight.js?v=20261115164340';
import './damage.js?v=20261115164340';
import './spells.js?v=20261115164340';
import './endbattle.js?v=20261115164340';

export { startBattle } from './setup.js?v=20261115164340';
export { MonsterParent } from './misc.js?v=20261115164340';
