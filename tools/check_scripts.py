"""Lists the S.<name>(...) calls in src/pink/gen/*.js that no module registers with defineScript, and the
object names they create or reference that no module defines: python -I tools/check_scripts.py"""
import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
defined, objects = set(), set()
for root, _, files in os.walk(os.path.join(ROOT, 'src')):
    for fn in files:
        if fn.endswith('.js'):
            t = open(os.path.join(root, fn), encoding='utf-8').read()
            defined |= set(re.findall(r"defineScript\('(\w+)'", t))
            objects |= set(re.findall(r"(?:defineObject|shared|defineShared|register)\('(obj_\w+)'", t))
gen = os.path.join(ROOT, 'src', 'pink', 'gen')
for fn in sorted(os.listdir(gen)):
    t = open(os.path.join(gen, fn), encoding='utf-8').read()
    calls = sorted(set(re.findall(r'\bS\.(\w+)\(', t)) - defined)
    objs = sorted(set(re.findall(r"'(obj_\w+)'", t)) - objects)
    print('%s\n  scripts: %s\n  objects: %s' % (fn, ' '.join(calls) or '-', ' '.join(objs) or '-'))
