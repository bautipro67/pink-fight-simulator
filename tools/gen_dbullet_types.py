"""Writes a temporary code dir where each Pink attack type of Chapter 5's obj_dbulletcontroller Step
(the top-level `if (type == N) { ... }` blocks, N = 200-209) is an alarm event of obj_dbulletcontroller
(Alarm_0 = type 200 ...), so tools/gml2js_obj.py can translate them; tools/gen_pink.sh then turns the
alarms into typeN methods of the port's controller.

  python -I tools/gen_dbullet_types.py <out dir>"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TYPES = list(range(200, 210))
src = open(os.path.join(ROOT, 'research', 'code', 'gml_Object_obj_dbulletcontroller_Step_0.gml'), encoding='utf-8').read()
header = src.split('\n')[:4]
locals_line = next((l for l in header if l.startswith('// locals:')), '// locals:')


def block(n):
    m = re.search(r'(?m)^if \(type == %d\)\n\{\n' % n, src)
    if not m:
        return None
    i, depth = m.end() - 2, 0
    while i < len(src):
        c = src[i]
        if c == '"':
            j = src.index('"', i + 1)
            while src[j - 1] == '\\':
                j = src.index('"', j + 1)
            i = j
        elif c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                b = src[m.start():i + 1]
                # a label right after the block: its gotos leave the type, `exit` in the method
                after = re.match(r'\s*(L\d+):', src[i + 1:])
                if after:
                    b = b.replace('goto %s;' % after.group(1), 'exit;')
                return b
        i += 1
    raise SystemExit('unbalanced block for type %d' % n)


out = sys.argv[1]
os.makedirs(out, exist_ok=True)
for k, n in enumerate(TYPES):
    b = block(n)
    if b is None:
        print('type %d: none' % n)
        continue
    with open(os.path.join(out, 'gml_Object_obj_dbulletcontroller_Alarm_%d.gml' % k), 'w', encoding='utf-8') as f:
        f.write('// type %d of gml_Object_obj_dbulletcontroller_Step_0\n// (alarm %d)\n// object obj_dbulletcontroller\n%s\n\n%s\n' % (n, k, locals_line, b))
    print('type %d: %d lines -> Alarm_%d' % (n, b.count('\n') + 1, k))
