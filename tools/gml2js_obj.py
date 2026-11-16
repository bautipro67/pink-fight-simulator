"""Mechanical GML -> JS translation of whole objects (every event becomes a method) for the
simulator's runtime. The output is meant to be READ AND REVIEWED, not trusted blindly:
everything it cannot map is written as S.<name>(...) and listed in a trailing comment.

  python -I tools/gml2js_obj.py <code dir> <data.win> obj_a [obj_b ...] > out.js

Mapping:
  Create_0 create(), Step_0 step(), Step_1 beginStep(), Step_2 endStep(), Draw_0 draw(),
  Draw_64 drawGui(), Draw_73 drawEnd(), Alarm_N alarmN(), Other_1N userN(), Other_4 outsideRoom(),
  Destroy_0 onDestroy(), CleanUp_0 cleanUp(), Collision_obj_x collision_obj_x(other).
  bare names -> this.name; locals ("// locals:") -> let; global.x stays.
  N/*obj_x*/, N/*spr_x*/, N/*snd_x*/ -> 'obj_x' ... (assets are names in the runtime).
  obj_x.v (read) -> O('obj_x').v ; obj_x.v = e (write) -> O('obj_x').v = e  (O: Proxy, first / all)
  with (X) { ... } -> if (W(X, function (other) { ... }, this) === EXIT) return;
      inside: exit -> return EXIT, break (of the with) -> return BREAK, continue -> return.
  bare `other` outside with -> G.other.
  Colour literals in colour positions (image_blend =, *colo(u)r* =, draw colour arguments,
  merge_color, d3d_set_fog) -> bgr(n) (the runtime uses 0xRRGGBB, GML 0xBBGGRR).
"""
import os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

TOKEN = re.compile(r'\s+|//[^\n]*|"(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\'|0x[0-9A-Fa-f]+|\d+\.\d+|\.\d+|\d+'
                   r'|[A-Za-z_][A-Za-z0-9_]*|/\*[^*]*\*/|&&|\|\||\^\^|==|!=|<=|>=|\+=|-=|\*=|/=|\+\+|--|<<|>>'
                   r'|[-+*/%<>=!(){}\[\];,.?:&|^~@]')

# GML built-ins that keep their name in the runtime (imported from rt.js / common.js).
SAME = set('''instance_create instance_create_depth instance_destroy instance_exists instance_number instance_find
draw_sprite_ext draw_sprite draw_self draw_set_alpha draw_set_color draw_line draw_line_width draw_circle draw_rectangle
draw_triangle draw_text draw_text_transformed draw_set_halign draw_set_valign draw_set_font draw_sprite_part_ext
draw_sprite_part draw_sprite_stretched draw_sprite_stretched_ext draw_surface draw_surface_ext draw_surface_part
draw_surface_part_ext draw_clear_alpha draw_clear draw_set_blend_mode draw_get_alpha draw_get_color draw_sprite_tiled_ext
d3d_set_fog gpu_set_blendmode gpu_get_blendmode surface_create surface_exists surface_free surface_set_target
surface_reset_target sprite_get_number sprite_get_width sprite_get_height sprite_set_offset sprite_get_xoffset
sprite_get_yoffset merge_color make_color_rgb make_color_hsv color_get_red color_get_green color_get_blue
choose random irandom random_range irandom_range lerp clamp point_direction point_distance lengthdir_x lengthdir_y
angle_difference sign degtorad radtodeg dsin dcos snd_play snd_stop snd_loop snd_volume snd_pitch snd_is_playing
place_meeting collision_rectangle collision_line collision_circle collision_point keyboard_check_pressed
button1_p button2_p button3_p button1_h button2_h up_p down_p left_p right_p up_h down_h left_h right_h
string_length string_char_at string_copy array_length mus_volume i_ex camerax cameray camerawidth cameraheight
scr_approach scr_ease_in scr_ease_out lerp_ease_in lerp_ease_out lerp_ease_inout snd_play_x snd_play_pitch scr_even
scr_inverselerp scr_remapvalue clamp01 instance_nearest point_in_rectangle sqr frac is_string scr_get_box gt_maxx gt_maxy
gt_minx gt_miny keyboard_check draw_text_color draw_line_width gpu_set_blendmode_ext variable_instance_exists
sprite_create_from_surface sprite_exists sprite_delete draw_rectangle_color draw_triangle_color'''.split())
MATH = {'sin': 'Math.sin', 'cos': 'Math.cos', 'abs': 'Math.abs', 'floor': 'Math.floor', 'ceil': 'Math.ceil',
        'round': 'round', 'sqrt': 'Math.sqrt', 'power': 'Math.pow', 'min': 'Math.min', 'max': 'Math.max',
        'arctan2': 'Math.atan2', 'exp': 'Math.exp', 'ln': 'Math.log', 'sqr': 'sqr', 'frac': 'frac',
        'string': 'String', 'real': 'Number', 'is_string': 'is_string', 'audio_is_playing': 'snd_is_playing',
        'audio_stop_sound': 'snd_stop', 'debug_message': 'void', 'show_debug_message': 'void'}
# Functions whose instance arguments mean "this instance" when called without one.
SELF_CALL = {'instance_destroy': 'instance_destroy(this', 'draw_self': 'draw_self(this', 'event_user': None,
             'scr_afterimage': 'scr_afterimage(this', 'scr_shakeobj': 'scr_shakeobj(this', 'scr_bullet_init': 'scr_bullet_init(this',
             'scr_depth': 'scr_depth(this', 'scr_lerpvar': 'scr_lerpvar(this', 'scr_doom': 'scr_doom(',
             'scr_afterimagefast': 'scr_afterimagefast(this', 'scr_afterimage_grow': 'scr_afterimage_grow(this',
             'place_meeting': 'place_meeting(this', 'scr_delay_var': 'scr_var_delayed(this', 'scr_var_delay': 'scr_var_delayed(this',
             'move_towards_point': 'move_towards_point(this', 'scr_darksize': 'scr_darksize(this?', 'scr_bulletspawner': 'S.scr_bulletspawner(this',
             'scr_oflash': 'S.scr_oflash(this', 'scr_script_delayed': 'scr_script_delayed(this', 'scr_marker': 'scr_marker(this',
             'scr_dark_marker': 'scr_dark_marker(this', 'scr_heroblcon': 'S.scr_heroblcon(', 'scr_enemyblcon': 'S.scr_enemyblcon(this',
             'scr_custom_afterimage': 'scr_custom_afterimage(this', 'scr_lerp_var_instance': 'scr_lerp_var_instance(',
             'scr_lerpvar_instance': 'scr_lerpvar_instance(', 'scr_move_to_point_over_time': 'S.scr_move_to_point_over_time(this',
             'scr_jump_to_point': 'S.scr_jump_to_point(this?', 'scr_jump_arc': 'S.scr_jump_arc(this?', 'scr_tensionheal': 'S.scr_tensionheal(',
             'scr_damage': 'S.scr_damage(this', 'scr_fadeout': 'S.scr_fadeout(', 'scr_shakescreen': 'scr_shakescreen(this',
             'scr_fire_bullet': 'scr_fire_bullet(this', 'scr_at_player': 'scr_at_player(this',
             'scr_custom_afterimage_ext': 'scr_custom_afterimage_ext(this', 'draw_sprite_ext_centerscale': 'draw_sprite_ext_centerscale(this',
             'scr_sonic_boom': 'S.scr_sonic_boom(this', 'position_meeting': 'S.position_meeting(this'}
# scripts the runtime exports directly (used as values)
FUNC_REF = {'scr_var': 'scr_var', 'scr_var_delayed': 'scr_var_delayed', 'scr_lerpvar': 'scr_lerpvar'}
EVENTS = [(r'^Create_0$', 'create', ''), (r'^Step_0$', 'step', ''), (r'^Step_1$', 'beginStep', ''), (r'^Step_2$', 'endStep', ''),
          (r'^Draw_0$', 'draw', ''), (r'^Draw_64$', 'drawGui', ''), (r'^Draw_73$', 'drawEnd', ''), (r'^Draw_72$', 'drawBegin', ''),
          (r'^Destroy_0$', 'onDestroy', ''), (r'^CleanUp_0$', 'cleanUp', ''), (r'^Other_4$', 'outsideRoom', ''),
          (r'^Other_7$', 'animationEnd', '')]
COLOR_FN = {'draw_sprite_ext': [7], 'draw_sprite': [], 'draw_set_color': [0], 'merge_color': [0, 1], 'd3d_set_fog': [1],
            'draw_sprite_part_ext': [10], 'draw_surface_ext': [6], 'draw_sprite_stretched_ext': [6],
            'draw_sprite_tiled_ext': [6], 'draw_text_color': [3, 4, 5, 6], 'draw_rectangle_color': [4, 5, 6, 7],
            'draw_triangle_color': [6, 7, 8], 'scr_draw_outline_ext': [],
            # (also gpu_set_fog, the other *_color draws and Chapter 5's d_* wrappers of them)
            'gpu_set_fog': [1], 'draw_line_color': [4, 5], 'draw_line_width_color': [5, 6], 'draw_circle_color': [3, 4],
            'draw_ellipse_color': [4, 5], 'draw_point_color': [2], 'draw_vertex_color': [2],
            'draw_text_transformed_color': [6, 7, 8, 9], 'draw_text_ext_color': [5, 6, 7, 8],
            'draw_text_ext_transformed_color': [8, 9, 10, 11], 'draw_sprite_general': [11, 12, 13, 14],
            'draw_surface_part_ext': [9], 'draw_surface_stretched_ext': [5], 'draw_clear': [0], 'draw_clear_alpha': [0],
            'd_rectangle_color': [4, 5, 6, 7], 'd_line_color': [4, 5], 'd_line_width_color': [5, 6],
            'd_circle_color': [3, 4], 'd_ellipse_color': [4, 5], 'd_triangle_color': [6, 7, 8]}
KEYWORDS = {'if', 'else', 'while', 'for', 'do', 'until', 'repeat', 'with', 'switch', 'case', 'default', 'break',
            'continue', 'return', 'exit', 'var', 'true', 'false', 'self', 'other', 'global', 'div', 'mod', 'not', 'and', 'or',
            'undefined', 'noone', 'all', 'pi'}
BUILTIN_VARS = {'room': 'G.roomName', 'current_time': 'G.current_time()', 'fps': '30', 'room_speed': '30',
                'view_wport': 'VIEW_WPORT', 'view_hport': 'VIEW_HPORT', 'id': 'this', 'pi': 'Math.PI', 'noone': 'null',
                'undefined': 'undefined', 'self': 'this', 'all': "'all'", 'c_white': '0xffffff', 'c_black': '0',
                'room_width': 'room_width', 'room_height': 'room_height'}


CHAIN = r"(?:this\.|global\.|other\.|S\.|O\('[^']+'\)\.)?[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\[[^\[\]]*\])*(?:\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))?"


def truthy_not(s):
    # !<chain> -> !T(<chain>), !(<expr>) -> !T(<expr>)
    s = re.sub(r'!\s*(' + CHAIN + r')', lambda m: '!T(' + m.group(1) + ')' if not m.group(1).startswith(('true', 'false')) else '!' + m.group(1), s)
    out, i = [], 0
    while i < len(s):
        if s[i] == '!' and i + 1 < len(s) and s[i + 1] == '(' and (i == 0 or s[i - 1] not in '!='):
            depth, j = 0, i + 1
            while j < len(s):
                if s[j] == '(':
                    depth += 1
                elif s[j] == ')':
                    depth -= 1
                    if depth == 0:
                        break
                j += 1
            out.append('!T' + s[i + 1:j + 1])
            i = j + 1
            continue
        out.append(s[i])
        i += 1
    return ''.join(out)


def truthy_cond(c):
    # a condition made only of chains joined by && / || : each chain -> T(chain)
    parts = re.split(r'(\s*(?:&&|\|\|)\s*)', c)
    res = []
    for p in parts:
        if re.fullmatch(r'\s*(?:&&|\|\|)\s*', p):
            res.append(p)
        elif re.fullmatch(CHAIN, p.strip()) and not p.strip() in ('true', 'false') and not p.strip().startswith(('i_ex(', 'instance_exists(', 'place_meeting(', 'button', 'up_', 'down_', 'left_', 'right_', 'keyboard_', 'S.position_meeting(', 'variable_instance_exists(', 'snd_is_playing(', 'surface_exists(', 'collision_', 'sprite_exists(', 'is_string(')):
            res.append('T(%s)' % p.strip())
        else:
            res.append(p)
    return ''.join(res)


def array_init(e):
    # GML creates arrays on assignment: a[i] = v / a[i][j] = v / obj.a[i] = v
    # (an index may hold one level of brackets itself: a[b[0]] = v)
    IDX = r'\[(?:[^\[\]]|\[[^\[\]]*\])*\]'
    m = re.match(r"^((?:this\.|global\.|other\.|O\('[^']+'\)\.)?[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*)((?:" + IDX + r")+)\s*(?:[-+*/]?=)(?!=)", e)
    if not m:
        return ''
    base, idx = m.group(1), re.findall(IDX, m.group(2))
    out, cur = [], base
    out.append('%s ??= [];' % cur)
    for k in idx[:-1]:
        cur += k
        out.append('%s ??= [];' % cur)
    return ' '.join(out) + ' '


class Unknown(Exception):
    pass


def bgr(n):
    return ((n & 0xff) << 16) | (n & 0xff00) | ((n >> 16) & 0xff)


class Translator:
    def __init__(self, locals_, unknown):
        self.inject = ''
        self.locals = set(locals_)
        self.unknown = unknown
        self.with_depth = 0
        self.loop_in_with = []   # per with level: how many loops/switches are open inside it

    def run(self, src):
        toks = [t for t in TOKEN.findall(src)]
        joined = re.sub(r'\s+', '', ''.join(toks))
        if joined != re.sub(r'\s+', '', src):
            raise SystemExit('tokenizer lost characters near: ' + src[:200])
        self.t = [t for t in toks if t.strip() and not t.startswith('//')]
        self.i = 0
        out = []
        while self.i < len(self.t):
            out.append(self.statement(1))
        return '\n'.join(out)

    # ---- helpers
    def peek(self, k=0):
        j = self.i + k
        return self.t[j] if j < len(self.t) else ''

    def take(self, expect=None):
        tok = self.t[self.i]
        if expect is not None and tok != expect:
            raise SystemExit('expected %r got %r at %s' % (expect, tok, ' '.join(self.t[self.i - 8:self.i + 8])))
        self.i += 1
        return tok

    def block_or_statement(self, ind):
        if self.peek() == '{':
            return self.block(ind)
        return '{\n' + self.statement(ind + 1) + '\n' + '  ' * (ind - 1) + '}'

    def block(self, ind):
        self.take('{')
        parts = []
        while self.peek() != '}':
            parts.append(self.statement(ind + 1))
        self.take('}')
        return '{\n' + '\n'.join(parts) + ('\n' if parts else '') + '  ' * (ind - 1) + '}'

    def paren_expr(self):
        self.take('(')
        e = self.expr_until(')')
        self.take(')')
        return e

    def expr_until(self, *stops):
        """Translate tokens up to (not including) a stop token at depth 0."""
        depth = 0
        toks = []
        while True:
            tok = self.peek()
            if tok == '':
                break
            if depth == 0 and tok in stops:
                break
            if tok in '([{':
                depth += 1
            elif tok in ')]}':
                if depth == 0:
                    break
                depth -= 1
            toks.append(self.take())
        return self.expr(toks)

    # ---- statements
    def statement(self, ind):
        pad = '  ' * ind
        tok = self.peek()
        if tok == '{':
            return pad + self.block(ind + 1)
        if tok == ';':
            self.take()
            return ''
        if tok == 'if':
            self.take()
            cond = truthy_cond(self.paren_expr())
            body = self.block_or_statement(ind + 1)
            s = pad + 'if (%s) %s' % (cond, body)
            if self.peek() == 'else':
                self.take()
                if self.peek() == 'if':
                    s += ' else ' + self.statement(ind).lstrip()
                else:
                    s += ' else ' + self.block_or_statement(ind + 1)
            return s
        if tok in ('while',):
            self.take()
            cond = truthy_cond(self.paren_expr())
            return pad + 'while (%s) %s' % (cond, self.loop_body(ind))
        if tok == 'repeat':
            self.take()
            n = self.paren_expr()
            k = self.i
            # (GameMaker takes the count as an integer, dropping the fraction: repeat (frac(1.1) * 10), which is
            # 1.0000000000000009, runs once, where `_r < _n` would run twice)
            return pad + 'for (let _r%d = 0, _n%d = Math.trunc(%s); _r%d < _n%d; _r%d++) %s' % (k, k, n, k, k, k, self.loop_body(ind))
        if tok == 'for':
            self.take()
            self.take('(')
            a = self.expr_until(';')
            self.take(';')
            b = self.expr_until(';')
            self.take(';')
            c = self.expr_until(')')
            self.take(')')
            return pad + 'for (%s; %s; %s) %s' % (a, b, c, self.loop_body(ind))
        if tok == 'do':
            self.take()
            body = self.loop_body(ind)
            self.take('until')
            cond = self.paren_expr()
            return pad + 'do %s while (!(%s));' % (body, cond)
        if tok == 'switch':
            self.take()
            e = self.paren_expr()
            self.take('{')
            if self.loop_in_with:
                self.loop_in_with[-1] += 1
            parts = []
            while self.peek() != '}':
                if self.peek() == 'case':
                    self.take()
                    v = self.expr_until(':')
                    self.take(':')
                    parts.append(pad + '  case %s:' % v)
                elif self.peek() == 'default':
                    self.take()
                    self.take(':')
                    parts.append(pad + '  default:')
                else:
                    parts.append(self.statement(ind + 2))
            self.take('}')
            if self.loop_in_with:
                self.loop_in_with[-1] -= 1
            return pad + 'switch (%s) {\n%s\n%s}' % (e, '\n'.join(parts), pad)
        if tok == 'with':
            self.take()
            target = self.paren_expr()
            self.with_depth += 1
            self.loop_in_with.append(0)
            body = self.block_or_statement(ind + 1)
            self.loop_in_with.pop()
            self.with_depth -= 1
            exitcheck = 'if (W(%s, function (other) %s, this) === EXIT) return%s;' % (target, body, ' EXIT' if self.with_depth else '')
            return pad + exitcheck
        if tok == 'exit':
            self.take()
            if self.peek() == ';':
                self.take()
            return pad + ('return EXIT;' if self.with_depth else 'return;')
        if tok == 'return':
            self.take()
            e = self.expr_until(';')
            if self.peek() == ';':
                self.take()
            if self.with_depth:
                raise SystemExit('return inside with')
            return pad + 'return %s;' % e
        if tok == 'break':
            self.take()
            if self.peek() == ';':
                self.take()
            if self.with_depth and self.loop_in_with[-1] == 0:
                return pad + 'return BREAK;'
            return pad + 'break;'
        if tok == 'continue':
            self.take()
            if self.peek() == ';':
                self.take()
            if self.with_depth and self.loop_in_with[-1] == 0:
                return pad + 'return;'
            return pad + 'continue;'
        if tok == 'var':
            self.take()
            e = self.expr_until(';')
            if self.peek() == ';':
                self.take()
            return pad + e + ';'
        e = self.expr_until(';', '}')
        if self.peek() == ';':
            self.take()
        return pad + array_init(e) + e + ';'

    def loop_body(self, ind):
        if self.loop_in_with:
            self.loop_in_with[-1] += 1
        b = self.block_or_statement(ind + 1)
        if self.loop_in_with:
            self.loop_in_with[-1] -= 1
        return b

    # ---- expressions
    def expr(self, toks):
        out = []
        i = 0
        n = len(toks)
        call_stack = []  # (function name, arg index, depth) for colour arguments
        depth = 0
        # an assignment target followed by '=' at depth 0 (statement level) is a write
        while i < n:
            t = toks[i]
            nxt = toks[i + 1] if i + 1 < n else ''
            prv = toks[i - 1] if i > 0 else ''
            if t == '(':
                depth += 1
                if call_stack and call_stack[-1][2] == depth - 1 and call_stack[-1][3] is None:
                    call_stack[-1][3] = depth
                out.append('(' + self.inject)
                self.inject = ''
            elif t == ')':
                if call_stack and call_stack[-1][3] == depth:
                    call_stack.pop()
                depth -= 1
                out.append(t)
            elif t == ',':
                if call_stack and call_stack[-1][3] == depth:
                    call_stack[-1][1] += 1
                out.append(t)
            elif re.match(r'^\d+$', t) and nxt.startswith('/*') and nxt.endswith('*/'):
                name = nxt[2:-2]
                m = re.match(r'^(?:[a-z]+:)?((?:obj|spr|snd|bg|font|fnt|room|scr|shd|path|tl)_[A-Za-z0-9_]*|[A-Za-z_][A-Za-z0-9_]*)(?:\|.*)?$', name)
                if not m:
                    raise SystemExit('odd annotation ' + name)
                nm = m.group(1)
                if re.match(r'^[A-Z_]+$', nm):  # an enum/constant comment such as IMAGE_LOGO: keep the number
                    out.append(t)
                else:
                    out.append("'%s'" % nm)
                i += 2
                continue
            elif t.startswith('/*'):
                pass
            elif re.match(r'^(\d|0x)', t):
                # colour literal?
                if self.colour_context(toks, i, call_stack):
                    v = int(t, 16) if t.startswith('0x') else int(float(t))
                    out.append('0x%06x' % bgr(v))
                else:
                    out.append(t)
            elif re.match(r'^[A-Za-z_]', t):
                if prv == '.':
                    out.append(t)
                elif nxt == '(':
                    if t == 'event_user':
                        n_ = toks[i + 2]
                        if toks[i + 3] != ')':
                            raise SystemExit('event_user with an expression')
                        out.append('this.user%s?.()' % n_)
                        i += 4
                        continue
                    name, self.inject = self.call_name(t, toks, i)
                    out.append(name)
                    call_stack.append([t, 0, depth, None])
                elif t in ('div', 'mod', 'and', 'or', 'not'):
                    out.append({'div': '/', 'mod': '%', 'and': '&&', 'or': '||', 'not': '!'}[t] if t != 'div' else '|DIV|')
                elif t == 'other':
                    out.append('other' if self.with_depth else 'G.other')
                elif t == 'global':
                    out.append('global')
                elif t in ('true', 'false'):
                    out.append(t)
                elif t in BUILTIN_VARS:
                    out.append(BUILTIN_VARS[t])
                elif t.startswith('obj_') and nxt == '.':
                    out.append("O('%s')" % t)
                elif t.startswith('obj_') or t.startswith('spr_') or t.startswith('snd_'):
                    out.append("'%s'" % t)
                elif t in self.locals:
                    out.append(t)
                elif t in SAME or t in SELF_CALL or t.startswith('scr_'):
                    # a function passed as a value (scr_script_delayed(instance_destroy, 7))
                    if t in SELF_CALL:
                        out.append(SELF_CALL[t].split('(')[0])
                    elif t in SAME:
                        out.append(t)
                    else:
                        out.append(FUNC_REF.get(t, 'S.' + t))
                elif re.match(r'^(argument\d*|_argument\d)$', t):
                    out.append(t)
                else:
                    out.append('this.' + t)
            else:
                out.append(t)
            i += 1
        # String literals are kept out of the rewrites below (". alright" or "! This" in a line of
        # dialogue are not member access or negation).
        strs = []

        def keep(tok):
            strs.append(tok)
            return '\x00%d\x00' % (len(strs) - 1)
        out = [keep(x) if len(x) >= 2 and x[0] in '"\'' and x[-1] == x[0] else x for x in out]
        s = ' '.join(out)
        s = re.sub(r' ?\. ?', '.', s)
        s = re.sub(r'(\w) \(', r'\1(', s)
        s = re.sub(r'([\w\)\]]) \[', r'\1[', s)
        s = s.replace('( ', '(').replace(' )', ')').replace('[ ', '[').replace(' ]', ']').replace(' ,', ',')
        s = s.replace('! =', '!=').replace('= =', '==')
        s = re.sub(r'(\S+) \|DIV\| (\S+)', r'Math.floor(\1 / \2)', s)
        s = re.sub(r'(\d) \. (\d)', r'\1.\2', s)
        s = re.sub(r'\+ \+', '++', s)
        s = re.sub(r'- -(?=\w)', '--', s)
        s = s.replace('this, )', 'this)')
        s = truthy_not(s)
        s = re.sub('\x00(\\d+)\x00', lambda m: strs[int(m.group(1))], s)
        return s

    def colour_context(self, toks, i, call_stack):
        # assignment: <name> = <literal> where name is a colour variable
        j = i - 1
        if j >= 1 and toks[j] == '=' and re.search(r'(blend|colou?r|col\b|_col$|^col)', toks[j - 1], re.I) and toks[j - 1] not in ('collision',):
            return True
        if j >= 1 and toks[j] == '=' and re.search(r'(blend|colou?r)', toks[j - 1], re.I):
            return True
        # negative literal or expression part: only bare literals as a whole argument
        if call_stack:
            fn, arg, _, _ = call_stack[-1]
            if fn in COLOR_FN and arg in COLOR_FN[fn]:
                prev = toks[i - 1] if i else ''
                nxt = toks[i + 1] if i + 1 < len(toks) else ''
                if prev in ('(', ',') and nxt in (')', ','):
                    return True
        return False

    def call_name(self, t, toks, i):
        """(js name, text to put right after its opening parenthesis)"""
        if t in MATH:
            return MATH[t], ''
        if t in SELF_CALL:
            base = SELF_CALL[t]
            empty = i + 2 < len(toks) and toks[i + 2] == ')'
            if base.endswith('(this?'):  # `this` only when the call names no instance
                return base[:-len('(this?')], ('this' if empty else '')
            if base.endswith('(this'):
                return base[:-len('(this')], ('this' if empty else 'this, ')
            return base[:-1], ''
        if t in SAME:
            return t, ''
        self.unknown.add(t)
        return 'S.' + t, ''


def event_method(ev):
    for pat, name, _ in EVENTS:
        if re.match(pat, ev):
            return name, ''
    m = re.match(r'^Alarm_(\d+)$', ev)
    if m:
        return 'alarm' + m.group(1), ''
    m = re.match(r'^Other_1(\d)$', ev)
    if m:
        return 'user' + m.group(1), ''
    m = re.match(r'^Other_2(\d)$', ev)
    if m:
        return 'user1' + m.group(1), ''
    m = re.match(r'^Collision_(.+)$', ev)
    if m:
        return 'collision_' + m.group(1), 'other'
    return None, ''


def object_info(datawin, names):
    from datawin import DataWin
    d = DataWin(datawin)
    spr = [d.str(d.u32(p)) for p in d.chunk_list("SPRT")]
    ob = d.chunk_list("OBJT")
    allnames = [d.str(d.u32(p)) for p in ob]
    info = {}
    for i, p in enumerate(ob):
        n = allnames[i]
        if n in names:
            si, vis, managed, solid, depth, pers, parent, mask = (d.i32(p + 4 * k) for k in range(1, 9))
            info[n] = {'sprite': spr[si] if si >= 0 else None, 'visible': vis, 'depth': depth,
                       'parent': allnames[parent] if parent >= 0 else None, 'mask': spr[mask] if mask >= 0 else None}
    return info


def classname(obj):
    return ''.join(p.capitalize() for p in obj[4:].split('_'))


def main():
    code, datawin = sys.argv[1], sys.argv[2]
    objs = sys.argv[3:]
    info = object_info(datawin, set(objs))
    unknown = set()
    out = []
    for obj in objs:
        files = sorted(f for f in os.listdir(code) if f.startswith('gml_Object_' + obj + '_') and f.endswith('.gml'))
        events = []
        for f in files:
            ev = f[len('gml_Object_' + obj + '_'):-4]
            name, arg = event_method(ev)
            if not name:
                continue
            src = open(os.path.join(code, f), encoding='utf-8').read()
            if 'WARNING' in src:
                out.append('// !!! %s has a decompiler WARNING: check the asm' % f)
            m = re.search(r'^// locals: (.*)$', src, re.M)
            locs = [x.strip() for x in m.group(1).split(',')] if m else []
            body = re.sub(r'^//.*$', '', src, flags=re.M)
            tr = Translator(locs + ([arg] if arg else []), unknown)
            js = tr.run(body)
            decl = ('    let ' + ', '.join(locs) + ';\n') if locs else ''
            events.append((name, arg, decl + '\n'.join('  ' + l if l.strip() else l for l in js.split('\n'))))
        i = info.get(obj, {})
        parent = i.get('parent')
        base = "P('%s')" % parent if parent else 'Instance'
        out.append('// %s (default sprite %s, depth %s%s)' % (obj, i.get('sprite'), i.get('depth'), ', parent ' + parent if parent else ''))
        out.append('class %s extends %s {' % (classname(obj), base))
        ctor = []
        if i.get('sprite'):
            ctor.append("    this.sprite_index = '%s';" % i['sprite'])
        if i.get('mask'):
            ctor.append("    this.mask_index = '%s';" % i['mask'])
        if i.get('visible') == 0:
            ctor.append('    this.visible = false;')
        if ctor:
            out.append('  constructor() {\n    super();\n%s\n  }' % '\n'.join(ctor))
        for name, arg, js in events:
            if name == 'create' and parent:
                js = '    super.create?.();\n' + js if 'event_inherited' not in js else js
            js = js.replace('S.event_inherited()', 'super.%s?.()' % name)
            out.append('  %s(%s) {\n%s\n  }' % (name, arg, js))
        out.append('}')
        out.append("defineObject('%s', %s);" % (obj, classname(obj)))
        out.append('')
    out.append('// calls left to S (review): ' + ' '.join(sorted(unknown)))
    sys.stdout.write('\n'.join(out) + '\n')


if __name__ == '__main__':
    main()
