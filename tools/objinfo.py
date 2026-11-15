"""Default sprite, visible, depth, parent and mask of objects in a data.win.
Usage: python -I tools/objinfo.py <data.win> <regex>"""
import os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from datawin import DataWin
d = DataWin(sys.argv[1])
spr = [d.str(d.u32(p)) for p in d.chunk_list("SPRT")]
ob = d.chunk_list("OBJT")
names = [d.str(d.u32(p)) for p in ob]
pat = re.compile(sys.argv[2])
for i, p in enumerate(ob):
    n = names[i]
    if not pat.search(n):
        continue
    si, vis, managed, solid, depth, pers, parent, mask = (d.i32(p + 4 * k) for k in range(1, 9))
    print('%-44s spr=%-36s vis=%d depth=%-6d parent=%-28s mask=%s' % (
        n, spr[si] if si >= 0 else '-', vis, depth, names[parent] if parent >= 0 else '-', spr[mask] if mask >= 0 else '-'))
