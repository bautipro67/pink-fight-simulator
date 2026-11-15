"""Copies the decompiled GML of some objects into a temporary code dir, rewriting the gotos the
decompiler left into structured code tools/gml2js_obj.py can translate:

  python -I tools/gmlfix.py <code dir> <out dir> obj_a [obj_b ...]

Patterns (all seen in Chapter 5's Pink objects):
  1. leaving a with early:   with (X) { ... goto LA; ... }  goto LB;  LA: // popenv ...  LB:
     -> the goto becomes `break;` and the jump lines go.
  2. skipping the rest of a block:  if (C) goto LN;  rest...  }  (only closing braces)  LN:
     -> if (!(C)) { rest... }
  3. a switch with only a default (the value is pushed, then `goto LA; goto LB; LA: stmt; LB:`)
     -> stmt.
Any goto left is reported (and its file is still copied)."""
import os, re, shutil, sys

code, out, objs = sys.argv[1], sys.argv[2], sys.argv[3:]
os.makedirs(out, exist_ok=True)
indent = lambda l: len(l) - len(l.lstrip(' '))


def fix(lines):
    changed = True
    while changed:
        changed = False
        for i, l in enumerate(lines):
            # 4. a case label the decompiler left inside the block before it (`case 1:` then `}`): the
            # label goes after the closing brace (the case before falls through into it).
            if re.fullmatch(r'\s*case [^:]+:', l) and i + 1 < len(lines) and lines[i + 1].strip() == '}' \
                    and indent(lines[i + 1]) < indent(l):
                lines[i], lines[i + 1] = lines[i + 1], l
                changed = True
                break
            # 3. goto LA; goto LB; LA: <stmts> LB:
            m = re.fullmatch(r'\s*goto (L\d+);', l)
            if m and i + 2 < len(lines):
                m2 = re.fullmatch(r'\s*goto (L\d+);', lines[i + 1])
                if m2 and lines[i + 2].strip() == m.group(1) + ':':
                    lb = m2.group(1) + ':'
                    j = next((k for k in range(i + 3, len(lines)) if lines[k].strip() == lb), None)
                    if j is not None:
                        lines[:] = lines[:i] + lines[i + 3:j] + lines[j + 1:]
                        changed = True
                        break
            # 1. goto LB; LA: // popenv ... (closing braces) LB:  -> with-break
            if m and i + 2 < len(lines) and re.fullmatch(r'\s*L\d+:', lines[i + 1]) and 'popenv' in lines[i + 2]:
                la, lb = lines[i + 1].strip()[:-1], m.group(1)
                j = next((k for k in range(i + 3, len(lines)) if lines[k].strip() == lb + ':'), None)
                if j is not None and all(x.strip() in ('}', '') for x in lines[i + 3:j]):
                    for k in range(i):
                        if lines[k].strip() == 'goto %s;' % la:
                            lines[k] = lines[k].replace('goto %s;' % la, 'break;')
                    lines[:] = lines[:i] + lines[i + 3:j] + lines[j + 1:]
                    changed = True
                    break
            # 2. if (C) goto LN; rest of the block; LN: right after its closing braces
            m = re.fullmatch(r'(\s*)if \((.*)\) goto (L\d+);', l)
            if m:
                ind = indent(l)
                end = next((k for k in range(i + 1, len(lines)) if lines[k].strip() and indent(lines[k]) < ind), None)
                if end is None:
                    continue
                k = end
                while k < len(lines) and lines[k].strip() in ('}', ''):
                    k += 1
                if k < len(lines) and lines[k].strip() == m.group(3) + ':':
                    pad = m.group(1)
                    body = ['    ' + x if x.strip() else x for x in lines[i + 1:end]]
                    lines[:] = lines[:i] + [pad + 'if (!(%s))' % m.group(2), pad + '{'] + body + [pad + '}'] + lines[end:k] + lines[k + 1:]
                    changed = True
                    break
    return lines


for o in objs:
    for fn in os.listdir(code):
        if not re.fullmatch(r'gml_Object_%s_[A-Za-z]+_\d+\.gml' % re.escape(o), fn) and not fn.startswith('gml_Object_%s_Collision' % o):
            continue
        src = open(os.path.join(code, fn), encoding='utf-8').read()
        # Local arrays the decompiler left out of "// locals:" (the bytecode writes them through scope -7,
        # `pushi.e -7` then `[array]undefined.NAME`): added, so they translate as locals, not this.NAME.
        asm = os.path.join(code, 'asm', fn[:-4] + '.asm')
        if os.path.exists(asm):
            alines = open(asm, encoding='utf-8').read().split('\n')
            extra = set()
            for k, a in enumerate(alines):
                mm = re.search(r'\[array\]undefined\.(\w+)', a)
                if mm and any('pushi.e -7' in alines[j] for j in range(max(0, k - 3), k)):
                    extra.add(mm.group(1))
            hm = re.search(r'(?m)^// locals: (.*)$', src)
            have = set(x.strip() for x in hm.group(1).split(',')) if hm else set()
            extra -= have
            if extra:
                if hm:
                    src = src[:hm.end()] + ', ' + ', '.join(sorted(extra)) + src[hm.end():]
                else:
                    src = re.sub(r'(?m)^(// object .*)$', r'\1\n// locals: ' + ', '.join(sorted(extra)), src, count=1)
        if 'goto L' not in src and not re.search(r'(?m)^\s*case [^:]+:\n\s*\}$', src):
            open(os.path.join(out, fn), 'w', encoding='utf-8', newline='\n').write(src)
            continue
        lines = fix(src.split('\n'))
        left = [x.strip() for x in lines if 'goto L' in x]
        if left:
            print('%s: gotos left: %s' % (fn, ' | '.join(left)))
        open(os.path.join(out, fn), 'w', encoding='utf-8', newline='\n').write('\n'.join(lines))
