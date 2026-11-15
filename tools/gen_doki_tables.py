"""Prints the item -> DOKI tables of scr_item_to_doki / scr_item_to_dokitext (Chapter 5) as JS, for
src/pink/lib5.js: python -I tools/gen_doki_tables.py"""
import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def table(fn):
    t = open(os.path.join(ROOT, 'research', 'code', fn), encoding='utf-8').read()
    default = re.search(r'doki_given = ([^;]+);', t).group(1)
    return default, re.findall(r'case ([0-9.]+):\s*\n\s*doki_given = ([^;]+);', t)


def text(v):
    m = re.match(r'stringsetloc\("((?:[^"\\]|\\.)*)"', v)
    return m.group(1) if m else v.strip('"')


d0, doki = table('gml_Script_scr_item_to_doki.gml')
t0, txt = table('gml_Script_scr_item_to_dokitext.gml')
print('// scr_item_to_doki (default %s) / scr_item_to_dokitext (default "")' % d0)
print('const ITEM_DOKI = { %s };' % ', '.join('%s: %s' % kv for kv in doki))
print('const ITEM_DOKITEXT = { %s };' % ', '.join('%s: %s' % (k, json.dumps(text(v))) for k, v in txt))
