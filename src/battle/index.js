// Imports every battle-system module so their objects and scripts get registered.
import './misc.js?v=20261117033203';
import './text.js?v=20261117033203';
import './setup.js?v=20261117033203';
import './controller.js?v=20261117033203';
import './heroes.js?v=20261117033203';
import './fight.js?v=20261117033203';
import './damage.js?v=20261117033203';
import './spells.js?v=20261117033203';
import './endbattle.js?v=20261117033203';

export { startBattle } from './setup.js?v=20261117033203';
export { MonsterParent } from './misc.js?v=20261117033203';
