"""Mechanical GML -> JS translation of one decompiled event, for regular code such as attack-pattern
tables (if / else / while / repeat, assignments, calls). The output is a JS function body that runs
with `this` = the instance:
  - the event's locals (from the "// locals:" header) become `let` declarations;
  - bare identifiers become `this.name`; global.x stays; built-ins listed in FUNCS map to runtime calls;
  - scripts in SELF_SCRIPTS get `this` as their first argument (scr_spearpattern(this, ...));
  - `repeat (n)` becomes a counted for loop, `exit` becomes `return`.
Anything it does not understand is a hard error, so the output is either faithful or absent.

Usage: python -I tools/gml2js.py <file.gml> [--self scr_a,scr_b] [--funcs a,b] > out.js
"""
import re, sys

KEYWORDS = {'if', 'else', 'while', 'repeat', 'for', 'do', 'until', 'return', 'exit', 'break', 'continue', 'var', 'true',
            'false', 'switch', 'case', 'default', 'and', 'or', 'not', 'div', 'mod', 'global', 'undefined', 'self', 'other'}
TOKEN = re.compile(r'\s+|//[^\n]*|"(?:[^"\\]|\\.)*"|\d+\.\d+|\d+|[A-Za-z_][A-Za-z0-9_]*|&&|\|\||==|!=|<=|>=|\+=|-=|\*=|/=|[-+*/%<>=!(){}\[\];,.?:&|^~]')


def translate(src, self_scripts, funcs):
    m = re.search(r'^// locals: (.*)$', src, re.M)
    locals_ = [x.strip() for x in m.group(1).split(',')] if m else []
    body = re.sub(r'^//.*$', '', src, flags=re.M)
    toks = [t for t in TOKEN.findall(body)]
    joined = ''.join(toks)
    if joined.replace(' ', '').replace('\n', '').replace('\t', '') != re.sub(r'\s+', '', body):
        raise SystemExit('tokenizer lost characters')
    out = []
    i = 0
    rep = 0
    sig = [k for k, t in enumerate(toks) if t.strip() and not t.startswith('//')]

    def nxt(k):
        """index of the next significant token after k"""
        for j in sig:
            if j > k:
                return j
        return None

    def prv(k):
        best = None
        for j in sig:
            if j >= k:
                break
            best = j
        return best

    while i < len(toks):
        t = toks[i]
        if not t.strip() or t.startswith('//'):
            out.append(t)
            i += 1
            continue
        if re.match(r'[A-Za-z_]', t):
            n = nxt(i)
            p = prv(i)
            after = toks[n] if n is not None else ''
            before = toks[p] if p is not None else ''
            if before == '.':
                out.append(t)
            elif t == 'repeat':
                # repeat (expr) -> for (let _rN = 0, _nN = (expr); _rN < _nN; _rN++)
                if after != '(':
                    raise SystemExit('repeat without (')
                depth, j = 0, n
                while True:
                    if toks[j] == '(':
                        depth += 1
                    elif toks[j] == ')':
                        depth -= 1
                        if depth == 0:
                            break
                    j += 1
                inner = translate_expr(toks[n + 1:j], locals_, self_scripts, funcs)
                rep += 1
                out.append('for (let _r%d = 0, _n%d = (%s); _r%d < _n%d; _r%d++)' % (rep, rep, inner, rep, rep, rep))
                i = j + 1
                continue
            elif t == 'exit':
                out.append('return')
            elif t in ('if', 'else', 'while', 'break', 'continue', 'return', 'true', 'false'):
                out.append(t)
            elif t in KEYWORDS:
                raise SystemExit('unsupported keyword: ' + t)
            else:
                out.append(translate_ident(t, after, locals_, self_scripts, funcs))
            i += 1
            continue
        out.append(t)
        i += 1
    code = ''.join(out)
    decl = ('let ' + ', '.join(locals_) + ';\n') if locals_ else ''
    return decl + code


def translate_ident(t, after, locals_, self_scripts, funcs):
    if after == '(':
        if t in self_scripts:
            return t + '(this, '  # the opening paren is the next token; fixed below
        if t in funcs:
            return funcs[t]
        raise SystemExit('unknown function: ' + t)
    if t in locals_:
        return t
    if t == 'global':
        return 'global'
    return 'this.' + t


def translate_expr(toks, locals_, self_scripts, funcs):
    return translate(' '.join(toks), self_scripts, funcs).replace('\n', ' ')


def main():
    path = sys.argv[1]
    self_scripts, funcs = set(), {}
    for k, a in enumerate(sys.argv):
        if a == '--self':
            self_scripts = set(sys.argv[k + 1].split(','))
        if a == '--funcs':
            for f in sys.argv[k + 1].split(','):
                name, _, js = f.partition('=')
                funcs[name] = js or name
    src = open(path, encoding='utf-8').read()
    js = translate(src, self_scripts, funcs)
    # "scr_x(this, (" -> "scr_x(this, "; an empty call "scr_x(this, ()" never happens here.
    js = re.sub(r'\b(%s)\(this, \(' % '|'.join(map(re.escape, self_scripts)) if self_scripts else r'(?!)', r'\1(this, ', js)
    sys.stdout.write(js)


if __name__ == '__main__':
    main()
