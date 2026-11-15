// Small shims the mechanically translated objects (tools/gml2js_obj.py) rely on:
// W(target, fn, self) is GML's with(): fn runs with `this` = each instance and `other` = self;
// returning EXIT ends the calling event, BREAK leaves the with loop.
// O(name) reads the first instance of an object and writes every instance, like obj_x.var in GML.
import { G, instancesOf, objectClass } from './rt.js?v=20261115060109';
import { tagParent } from './common.js?v=20261115060109';

export const EXIT = Symbol('exit');
export const BREAK = Symbol('break');
export const VIEW_WPORT = [640];
export const VIEW_HPORT = [480];

export function W(target, fn, self) {
  const list = target === 'all' ? G.instances.filter(i => i.alive) : instancesOf(target);
  for (const inst of list.slice()) {
    if (!inst.alive) continue;
    const prev = G.other;
    G.other = self;
    let r;
    try {
      r = fn.call(inst, self);
    } finally {
      G.other = prev;
    }
    if (r === EXIT) return EXIT;
    if (r === BREAK) break;
  }
  return undefined;
}

const proxies = new Map();
export function O(name) {
  let p = proxies.get(name);
  if (!p) {
    p = new Proxy({}, {
      get(_, k) {
        const i = instancesOf(name)[0];
        return i ? i[k] : undefined;
      },
      set(_, k, v) {
        for (const i of instancesOf(name)) i[k] = v;
        return true;
      },
    });
    proxies.set(name, p);
  }
  return p;
}

// P(name): the parent class a translated child extends: the ported parent if there is one (so the
// child inherits its events), else a name tag.
export const P = name => objectClass(name) ?? tagParent(name);

// T(v): GML truthiness (a number is true only above 0.5; -1 and 0.5 are false).
export const T = v => (typeof v === 'number' ? v > 0.5 : !!v);
