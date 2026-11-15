// Imports every battle-system module so their objects and scripts get registered.
import './misc.js?v=20261115165051';
import './text.js?v=20261115165051';
import './setup.js?v=20261115165051';
import './controller.js?v=20261115165051';
import './heroes.js?v=20261115165051';
import './fight.js?v=20261115165051';
import './damage.js?v=20261115165051';
import './spells.js?v=20261115165051';
import './endbattle.js?v=20261115165051';

export { startBattle } from './setup.js?v=20261115165051';
export { MonsterParent } from './misc.js?v=20261115165051';
