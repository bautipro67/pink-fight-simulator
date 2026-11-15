"""Wraps translated object code (tools/gml2js_obj.py output) into an ES module: works out which
runtime names it uses and imports each from the module that exports it.

  python -I tools/wrap_module.py <translated.js> <out.js> "<header comment>"
Prints the names no module exports (they must be added before the module can load).
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
import json
V = '?v=' + json.load(open(os.path.join(ROOT, 'version.json')))['v']
SOURCES = [  # (import path from src/pink/gen, file)
    ('../rt.js', ['src/runtime/gm.js', 'src/runtime/audio.js']),
    ('../common.js', ['src/pink/common.js']),
    ('../gml.js', ['src/pink/gml.js']),
    ('../lib5.js', ['src/pink/lib5.js']),
]


def exports(path):
    t = open(os.path.join(ROOT, path), encoding='utf-8').read()
    names = set(re.findall(r'export (?:async )?(?:function|const|let|class) ([A-Za-z0-9_$]+)', t))
    for grp in re.findall(r'export const ([^;]+);', t):
        names |= set(re.findall(r'(?:^|,)\s*([A-Za-z0-9_$]+)\s*=', grp))
    for grp in re.findall(r'export \{([^}]*)\}', t):
        names |= set(x.strip().split(' as ')[-1] for x in grp.split(',') if x.strip())
    return names


def main():
    src, out, header = sys.argv[1], sys.argv[2], sys.argv[3]
    code = open(src, encoding='utf-8').read()
    code_nostr = re.sub(r"'(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\"|//[^\n]*", "''", code)
    used = set(re.findall(r'(?<![.\w$])([A-Za-z_$][A-Za-z0-9_$]*)', code_nostr))
    local_classes = set(re.findall(r'class ([A-Za-z0-9_]+)', code)) | set(re.findall(r'(?m)^  ([A-Za-z0-9_]+)\([^)]*\) \{$', code))
    js_words = set('''class extends constructor super this let const var function return if else while for do switch case
default break continue new typeof instanceof void true false null undefined Math String Number Object Array Symbol
in of try finally catch throw other argument0 argument1 argument2 argument3 Infinity NaN'''.split())
    lets = set()
    for decl in re.findall(r'\blet ([^;=]+)[;=]', code):
        lets |= set(x.strip() for x in decl.split(',') if re.match(r'^\s*[A-Za-z_$][\w$]*\s*$', x))
    lets |= set(re.findall(r'\blet ([A-Za-z_$][\w$]*)', code))
    need = sorted(n for n in used if n not in js_words and n not in local_classes and n not in lets and not n.startswith('_r') and not n.startswith('_n'))
    lines = []
    missing = []
    taken = set()
    for path, files in SOURCES:
        ex = set()
        for f in files:
            ex |= exports(f)
        names = [n for n in need if n in ex and n not in taken]
        taken |= set(names)
        if names:
            lines.append('import {\n  %s,\n} from \'%s%s\';' % (', '.join(names), path, V))
    for n in need:
        if n not in taken:
            missing.append(n)
    body = '// ' + header.replace('\n', '\n// ') + '\n/* eslint-disable */\n' + '\n'.join(lines) + '\n\n' + code
    open(out, 'w', encoding='utf-8', newline='').write(body)
    print('missing:', ' '.join(missing) if missing else '(none)')


if __name__ == '__main__':
    main()
