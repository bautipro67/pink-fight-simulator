// Checks that every named import in src/ is exported by the module it comes from (following
// `export * from`), so a missing export shows up before the page fails to load:
//   node tools/check_imports.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const root = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..');
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.js')) files.push(p);
  }
})(join(root, 'src'));

const strip = s => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"])\/\/[^\n]*/g, '$1');
const cache = new Map();
function exportsOf(file, seen = new Set()) {
  if (cache.has(file)) return cache.get(file);
  if (seen.has(file)) return new Set();
  seen.add(file);
  const names = new Set();
  let src;
  try { src = strip(readFileSync(file, 'utf8')); } catch { return names; }
  for (const m of src.matchAll(/export\s+(?:async\s+)?(?:function\*?|class|const|let|var)\s+([\w$]+)/g)) names.add(m[1]);
  for (const m of src.matchAll(/export\s+const\s+([^;]+);/g)) for (const n of m[1].matchAll(/(?:^|,)\s*([\w$]+)\s*=/g)) names.add(n[1]);
  for (const m of src.matchAll(/export\s*\{([^}]*)\}(?:\s*from\s*['"]([^'"]+)['"])?/g)) {
    for (const part of m[1].split(',')) { const p = part.trim().split(/\s+as\s+/); if (p[0]) names.add((p[1] || p[0]).trim()); }
  }
  for (const m of src.matchAll(/export\s*\*\s*from\s*['"]([^'"]+)['"]/g)) {
    for (const n of exportsOf(resolve(dirname(file), m[1].split('?')[0]), seen)) names.add(n);
  }
  cache.set(file, names);
  return names;
}

let bad = 0;
for (const f of files) {
  const src = strip(readFileSync(f, 'utf8'));
  for (const m of src.matchAll(/import\s*\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g)) {
    const target = resolve(dirname(f), m[2].split('?')[0]);
    const ex = exportsOf(target);
    for (const part of m[1].split(',')) {
      const name = part.trim().split(/\s+as\s+/)[0].trim();
      if (name && !ex.has(name)) { bad++; console.log(`${f.slice(root.length + 1)}: '${name}' is not exported by ${m[2].split('?')[0]}`); }
    }
  }
}
console.log(bad ? `${bad} missing exports` : 'all imports resolve');
process.exit(bad ? 1 : 0);
