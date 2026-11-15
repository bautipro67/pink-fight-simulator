// The purple SOUL (obj_purplecontrols: Pink's FELINE WEB in all its modes) and its effects (machine-translated from the Chapter 5 GML by tools/gen_pink.sh; edit tools/postfix.py, not this file)
/* eslint-disable */
import {
  Instance, S, button2_h, choose, clamp, collision_rectangle, defineObject, down_h, down_p, draw_clear, draw_clear_alpha, draw_line_width, draw_primitive_begin, draw_primitive_end, draw_self, draw_set_alpha, draw_set_color, draw_set_font, draw_set_halign, draw_set_valign, draw_sprite_ext, draw_surface, draw_surface_ext, draw_surface_part, draw_text_transformed, draw_vertex_color, global, gpu_set_blendmode, gpu_set_blendmode_ext, gpu_set_colorwriteenable, instance_create, instance_create_depth, instance_destroy, instance_exists, instance_place, irandom, left_h, left_p, lengthdir_x, lengthdir_y, lerp, make_color_rgb, merge_color, point_direction, point_distance, random, right_h, right_p, sign, snd_play, snd_stop, string_width, surface_create, surface_exists, surface_free, surface_reset_target, surface_set_target, up_h, up_p,
} from '../rt.js?v=20261115071747';
import {
  camerax, cameray, i_ex, scr_approach, scr_fire_bullet, scr_get_box, scr_shakescreen,
} from '../common.js?v=20261115071747';
import {
  BREAK, EXIT, LOOP, O, P, T, W,
} from '../gml.js?v=20261115071747';
import {
  array_length,
} from '../lib5.js?v=20261115071747';

// !!! gml_Object_obj_purplecontrols_Step_0.gml has a decompiler WARNING: check the asm
// obj_purplecontrols (default sprite spr_purpleheart, depth 0)
class Purplecontrols extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_purpleheart';
  }
  cleanUp() {
    let i;
    S.ds_list_destroy(this.ds_bullet_list);
    surface_free(this.surface_effect);
    surface_free(this.surface_box);
    switch (this.mode) {
      case 6:
        if (this.made == 1) {
            S.ds_list_destroy(this.maze_destination);
            i = 0;
            for (let _r43 = 0, _n43 = (3); _r43 < _n43; _r43++) {
                S.ds_list_destroy(this.maze_distance[i]);
                S.ds_list_destroy(this.maze_direction[i]);
                i = i + 1;
            }
        }
        break;
      case 7:
        if (this.made == 1) {
            S.ds_list_destroy(this.pattern_list);
        }
        break;
    }
  }
  create() {
    let i;
    this.life_time = 0;
    this.mode = 1;
    this.difficulty = 0;
    this.hits = 0;
    this.made = 0;
    this.press_l = 0;
    this.press_r = 0;
    this.press_u = 0;
    this.press_d = 0;
    this.buffer_l = 0;
    this.buffer_r = 0;
    this.buffer_u = 0;
    this.buffer_d = 0;
    this.long_buffer_l = 0;
    this.long_buffer_r = 0;
    this.long_buffer_u = 0;
    this.long_buffer_d = 0;
    this.buffer_boost = 0;
    this.lane_x = 1;
    this.lane_y = 1;
    this.x_ongrid = 0;
    this.y_ongrid = 0;
    this.x_target = 0;
    this.y_target = 0;
    this.grid_direction = 0;
    this.lane_scroll = 0;
    this.tunnel_lifetime = 0;
    this.tunnel_timer = 0;
    i = 8;
    for (let _r120 = 0, _n120 = (8); _r120 < _n120; _r120++) {
        i = i - 1;
        this.tunnel_radius ??= []; this.tunnel_radius[i] = 0;
    }
    this.tunnel_lane_layer = 0;
    this.tunnel_lane_direction = 270;
    this.tunnel_speed_base = 0;
    this.tunnel_speed = 0;
    this.array_stars_x ??= []; this.array_stars_x[5] = 0;
    this.array_stars_y ??= []; this.array_stars_y[5] = 0;
    this.pattern_phase = 0;
    this.pattern_time = 0;
    this.pattern_direction = 270;
    this.rotate_travel = 0;
    this.rotate_speed = 0;
    this.heart_angle = 0;
    this.heart_travel = 0;
    this.tire_lift_activated = false;
    this.tire_y = 0;
    this.iframes = 0;
    this.box_momentum = 0;
    this.rotate_momentum = 0;
    this.super = 0;
    this.node_id = - 4;
    this.heartshake_x = 0;
    this.heartshake_y = 0;
    this.heartbump_x = 0;
    this.heartbump_y = 0;
    this.bg_pulse = 99;
    this.x_shake = 0;
    this.bg_y = - 27;
    this.squished = 0;
    this.tutorial_time = 0;
    this.arrow_alpha = - 2;
    this.arrow_dir = 0;
    this.can_spin = true;
    this.can_move = true;
    this.ds_bullet_list = S.ds_list_create();
    this.surface_effect = surface_create(32, 32);
    surface_free(this.surface_effect);
    this.surface_box = surface_create(32, 32);
    surface_free(this.surface_box);
    this.growtangle_xscale = 1;
    this.growtangle_yscale = 1;
    if (W('obj_growtangle', function (other) {
        other.growtangle_xstart = this.x;
        other.growtangle_ystart = this.y;
        other.growtangle_xscale = this.image_xscale;
        other.growtangle_yscale = this.image_yscale;
    }, this) === EXIT) return;
    this.boundaryup = 0;
    this.superchargetimer = 0;
    this.chargeshotcount = 0;
    this.disableslow = 0;
    if (button2_h()) {
        this.disableslow = 1;
    }
    this.remove_slow_z_buffer = 40;
  }
  onDestroy() {
    if (this.mode != 2) {
        if (W('obj_growtangle', function (other) {
            this.image_xscale = other.growtangle_xscale;
            this.image_yscale = other.growtangle_yscale;
        }, this) === EXIT) return;
    }
    if (W('obj_heart', function (other) {
        this.visible = 1;
    }, this) === EXIT) return;
    if (W('obj_pinknode', function (other) {
        instance_destroy(this);
    }, this) === EXIT) return;
    if (W('obj_pinknodeact', function (other) {
        instance_destroy(this);
    }, this) === EXIT) return;
  }
  draw() {
    let _cntr, _prpl_light, _prpl_dark, _prpl_darker, _prpl_darkest, _prpl_backdrop, _lane_distance, _arrow_pokethrough, _arrows_height, _yy, _xx, _ly, _lx, _scale, _dir, _growtanglescale, _heart_move_limit, _layer_movelimit, _layer_last, _cx, _cy, i, _dist, _thick, _thickscore, _pixels, _alpha_master, _col, _drawdist, lightpink, _glow_color, _alpha, _bleed;
    _cntr = 0;
    _prpl_light = 11141290;
    _prpl_dark = 5570645;
    _prpl_darker = 3866683;
    _prpl_darkest = 3342387;
    _prpl_backdrop = 2228258;
    if (!T(this.can_move)) {
        _prpl_light = merge_color(_prpl_light, 0x000000, 0.5);
        _prpl_dark = merge_color(_prpl_dark, 0x000000, 0.5);
        _prpl_darker = merge_color(_prpl_darker, 0x000000, 0.5);
        _prpl_darkest = merge_color(_prpl_darkest, 0x000000, 0.5);
    }
    switch (this.mode) {
      case 1:
        _lane_distance = 56;
        _arrow_pokethrough = 9;
        _arrows_height = 27 + _arrow_pokethrough;
        if (!T(surface_exists(this.surface_effect))) {
            this.surface_effect = surface_create(142, _arrows_height);
        }
        surface_set_target(this.surface_effect);
        draw_clear_alpha(0, 0);
        _yy = _arrows_height - this.bg_y;
        do {
            _xx = - 1;
            do {
                draw_sprite_ext('spr_pinkarrows', 1, _xx, _yy, 1, 1, 0, _prpl_darker, 1);
                _xx = _xx + 32;
            } while ((!(_xx >= 142)) && LOOP('Purplecontrols#1'));

            _yy = _yy + 24;
        } while ((!(_yy >= _arrows_height)) && LOOP('Purplecontrols#2'));

        gpu_set_blendmode(3);
        _xx = - 1;
        do {
            draw_sprite_ext('spr_pinkarrows', 0, _xx, 0, 1, 1, 0, _prpl_darker, 1);
            _xx = _xx + 32;
        } while ((!(_xx >= 142)) && LOOP('Purplecontrols#3'));

        gpu_set_blendmode(0);
        surface_reset_target();
        if (!T(surface_exists(this.surface_box))) {
            this.surface_box = surface_create(142, 142);
        }
        surface_set_target(this.surface_box);
        draw_clear_alpha(0, 0);
        _xx = 70;
        _yy = 70;
        draw_surface_ext(this.surface_effect, _xx - 70, _yy - _arrows_height, 1, 1, 0, 0xffffff, 1);
        draw_surface_ext(this.surface_effect, _xx - 70 + 142, _yy - _arrows_height + _arrow_pokethrough * 2, 1, 1, 180, 0xffffff, 1);
        draw_surface_ext(this.surface_effect, _xx - 70 + 142, _yy + _arrows_height + 2, 1, 1, 180, 0xffffff, 1);
        draw_surface_ext(this.surface_effect, _xx - 70, _yy + _arrows_height - _arrow_pokethrough * 2 + 2, 1, 1, 0, 0xffffff, 1);
        _ly = - _lane_distance;
        draw_set_color(_prpl_light);
        for (let _r411 = 0, _n411 = (3); _r411 < _n411; _r411++) {
            S.d_rectangle(_xx - 70 + _cntr, _yy + _ly + _cntr, _xx + 71 + _cntr, _yy + _ly + _cntr + 1, false);
            _ly = _ly + _lane_distance;
        }
        surface_reset_target();
        if (W('obj_growtangle', function (other) {
            draw_surface_ext(other.surface_box, this.x + lengthdir_x(49.497475 * this.image_xscale, 135 + this.image_angle), this.y + lengthdir_y(49.497475 * this.image_yscale, 135 + this.image_angle), this.image_xscale / 2, this.image_yscale / 2, this.image_angle, 0xffffff, 1);
        }, this) === EXIT) return;
        if (W('obj_pinktrail', function (other) {
            draw_self(this);
        }, this) === EXIT) return;
        if (W('obj_pinkdust', function (other) {
            this.draw?.();
        }, this) === EXIT) return;
        break;
      case 2:
        if (!T(surface_exists(this.surface_box))) {
            this.surface_box = surface_create(142, 142);
        }
        surface_set_target(this.surface_box);
        draw_clear(0);
        _xx = 70;
        _yy = 70;
        _lane_distance = 40;
        _lx = - _lane_distance * 1.5;
        _ly = - _lane_distance * 1.5;
        gpu_set_blendmode(3);
        gpu_set_colorwriteenable(0, 0, 0, 1);
        for (let _r613 = 0, _n613 = (4); _r613 < _n613; _r613++) {
            S.d_rectangle(_xx + _lx + _cntr, _yy - _lane_distance * 1.5 + _cntr, _xx + _lx + _cntr + 1, _yy + _lane_distance * 1.5 + _cntr, false);
            _lx = _lx + _lane_distance;
        }
        for (let _r660 = 0, _n660 = (4); _r660 < _n660; _r660++) {
            S.d_rectangle(_xx - _lane_distance * 1.5 + _cntr, _yy + _ly + _cntr, _xx + _lane_distance * 1.5 + _cntr, _yy + _ly + _cntr + 1, false);
            _ly = _ly + _lane_distance;
        }
        gpu_set_colorwriteenable(1, 1, 1, 1);
        gpu_set_blendmode_ext(8, 7);
        draw_set_color(_prpl_darker);
        S.d_rectangle(_xx - 128, _yy - 128, _xx + 128, _yy + 128, false);
        gpu_set_blendmode(0);
        _ly = - _lane_distance * 1.5;
        draw_set_color(_prpl_light);
        for (let _r768 = 0, _n768 = (4); _r768 < _n768; _r768++) {
            _lx = - _lane_distance * 1.5;
            for (let _r780 = 0, _n780 = (4); _r780 < _n780; _r780++) {
                S.d_circle(_xx + _lx, _yy + _ly, 4, false);
                _lx = _lx + _lane_distance;
            }
            _ly = _ly + _lane_distance;
        }
        surface_reset_target();
        if (W('obj_growtangle', function (other) {
            draw_surface_ext(other.surface_box, this.x + lengthdir_x(49.497475 * this.image_xscale, 135 + this.image_angle), this.y + lengthdir_y(49.497475 * this.image_yscale, 135 + this.image_angle), this.image_xscale / 2, this.image_yscale / 2, this.image_angle, 0xffffff, 1);
        }, this) === EXIT) return;
        if (W('obj_pinktrail', function (other) {
            draw_self(this);
        }, this) === EXIT) return;
        if (W('obj_pinkdust', function (other) {
            this.draw?.();
        }, this) === EXIT) return;
        break;
      case 3:
        _scale = 1;
        if (W('obj_growtangle', function (other) {
            draw_sprite_ext(this.sprite_index, 1, this.x + other.x_shake, this.y, this.image_xscale, this.image_yscale, other.image_angle, this.image_blend, this.image_alpha);
            draw_sprite_ext(this.sprite_index, - 1, this.x + other.x_shake, this.y, this.image_xscale, this.image_yscale, other.image_angle, this.image_blend, this.image_alpha);
            _scale = this.image_xscale / 2;
        }, this) === EXIT) return;
        _dir = this.image_angle;
        _lane_distance = 56 * _scale;
        draw_set_color(_prpl_darker);
        _xx = - 0.5 * _scale;
        for (let _r996 = 0, _n996 = (3); _r996 < _n996; _r996++) {
            S.d_line(this.x + _cntr + lengthdir_x(_lane_distance, _dir) + lengthdir_x(_xx, _dir + 90) + this.x_shake, this.y + _cntr + lengthdir_y(_lane_distance, _dir) + lengthdir_y(_xx, _dir + 90), this.x + _cntr + lengthdir_x(_lane_distance, _dir + 180) + lengthdir_x(_xx, _dir + 90) + this.x_shake, this.y + _cntr + lengthdir_y(_lane_distance, _dir + 180) + lengthdir_y(_xx, _dir + 90));
            _xx = _xx + 0.5 * _scale;
        }
        _dir = _dir + 90;
        _xx = - 0.5 * _scale;
        for (let _r1114 = 0, _n1114 = (3); _r1114 < _n1114; _r1114++) {
            S.d_line(this.x + _cntr + lengthdir_x(_lane_distance, _dir) + lengthdir_x(_xx, _dir + 90) + this.x_shake, this.y + _cntr + lengthdir_y(_lane_distance, _dir) + lengthdir_y(_xx, _dir + 90), this.x + _cntr + lengthdir_x(_lane_distance, _dir + 180) + lengthdir_x(_xx, _dir + 90) + this.x_shake, this.y + _cntr + lengthdir_y(_lane_distance, _dir + 180) + lengthdir_y(_xx, _dir + 90));
            _xx = _xx + 0.5 * _scale;
        }
        draw_set_color(_prpl_light);
        for (let _r1224 = 0, _n1224 = (4); _r1224 < _n1224; _r1224++) {
            S.d_circle(this.x + lengthdir_x(_lane_distance, _dir) + this.x_shake, this.y + lengthdir_y(_lane_distance, _dir), 4 * _scale, false);
            _dir = _dir + 90;
        }
        S.d_circle(this.x + this.x_shake, this.y, 4 * _scale, false);
        if (this.arrow_alpha > 0) {
            draw_sprite_ext('spr_pinkspinarrow', 1, this.x + 57, this.y + 18 + Math.abs(lengthdir_y(10, this.arrow_dir)), 1, 1, 270, 0xffffff, this.arrow_alpha);
            draw_sprite_ext('spr_pinkspinarrow', 1, this.x + 57, this.y - 16 - Math.abs(lengthdir_y(10, this.arrow_dir)), - 1, 1, 270, 0xffffff, this.arrow_alpha / 3);
        }
        if (W('obj_pinktrail', function (other) {
            draw_self(this);
        }, this) === EXIT) return;
        if (W('obj_pinkdust', function (other) {
            this.draw?.();
        }, this) === EXIT) return;
        break;
      case 7:
        _growtanglescale = 1;
        if (W('obj_growtangle', function (other) {
            _growtanglescale = this.image_xscale;
        }, this) === EXIT) return;
        if (!T(surface_exists(this.surface_effect))) {
            this.surface_effect = surface_create(300, 300);
        }
        _heart_move_limit = 35 * _growtanglescale;
        _layer_movelimit = 0;
        _layer_last = 0;
        for (let _r1441 = 0, _n1441 = (6); _r1441 < _n1441; _r1441++) {
            if (this.tunnel_radius[_layer_movelimit + 1] < _heart_move_limit && this.tunnel_radius[_layer_movelimit + 1] > 0 || this.tunnel_lane_layer > _layer_movelimit) {
                _layer_movelimit = _layer_movelimit + 1;
                continue;
            }
            break;
        }
        for (let _r1483 = 0, _n1483 = (6); _r1483 < _n1483; _r1483++) {
            if (this.tunnel_radius[_layer_last + 1] > 0) {
                _layer_last = _layer_last + 1;
                continue;
            }
            break;
        }
        _cx = 150;
        _cy = 150;
        surface_set_target(this.surface_effect);
        draw_clear_alpha(0, 0);
        draw_set_color(_prpl_backdrop);
        i = 0;
        for (let _r1544 = 0, _n1544 = (array_length(this.array_stars_x)); _r1544 < _n1544; _r1544++) {
            _dir = point_direction(0, 0, this.array_stars_x[i], this.array_stars_y[i]);
            _dist = point_distance(0, 0, this.array_stars_x[i], this.array_stars_y[i]);
            _scale = 1 + (this.tunnel_speed_base - 1.5) * 0.3 + _dist / 200;
            S.d_triangle(_cx + lengthdir_x(_dist, _dir) + lengthdir_x(1 * _scale, _dir + 90), _cy + lengthdir_y(_dist, _dir) + lengthdir_y(1 * _scale, _dir + 90), _cx + lengthdir_x(_dist, _dir) + lengthdir_x(1 * _scale, _dir - 90), _cy + lengthdir_y(_dist, _dir) + lengthdir_y(1 * _scale, _dir - 90), _cx + lengthdir_x(_dist - _dist * _scale * 0.16666666666666666, _dir), _cy + lengthdir_y(_dist - _dist * _scale * 0.16666666666666666, _dir), 0);
            i = i + 1;
        }
        draw_set_color(_prpl_darker);
        i = 0;
        for (let _r1734 = 0, _n1734 = (6); _r1734 < _n1734; _r1734++) {
            if (this.tunnel_radius[i] > 0) {
                break;
            }
            i = i + 1;
        }
        do {
            _dir = this.tunnel_lane_direction - 270;
            for (let _r1767 = 0, _n1767 = (4); _r1767 < _n1767; _r1767++) {
                S.d_line_width(_cx + lengthdir_x(this.tunnel_radius[i], _dir), _cy + lengthdir_y(this.tunnel_radius[i], _dir), _cx + lengthdir_x(this.tunnel_radius[i + 1], _dir), _cy + lengthdir_y(this.tunnel_radius[i + 1], _dir), (1 + i) * 1.125);
                _dir = _dir + 90;
            }
            i = i + 1;
        } while ((!(i > _layer_movelimit || this.tunnel_radius[i + 1] <= 0 || i >= 7)) && LOOP('Purplecontrols#4'));

        draw_set_color(_prpl_backdrop);
        _dir = this.tunnel_lane_direction - 270;
        for (let _r1880 = 0, _n1880 = (4); _r1880 < _n1880; _r1880++) {
            S.d_line_width(_cx + lengthdir_x(this.tunnel_radius[i], _dir), _cy + lengthdir_y(this.tunnel_radius[i], _dir), _cx + lengthdir_x(300, _dir), _cy + lengthdir_y(300, _dir), (1 + i) * 1.125);
            _dir = _dir + 90;
        }
        i = 0;
        for (let _r1949 = 0, _n1949 = (8); _r1949 < _n1949; _r1949++) {
            if (i == this.tunnel_lane_layer) {
                draw_set_color(_prpl_dark);
            } else {
                draw_set_color(_prpl_dark);
            }
            if (this.tunnel_radius[i] > 0) {
                _thick = 0;
                _thickscore = this.tunnel_radius[i];
                if (i == this.tunnel_lane_layer) {
                    _thickscore = _thickscore + 160;
                }
                do {
                    S.d_circle(_cx, _cy, this.tunnel_radius[i] + _thick, 1);
                    if (_thick >= 0) {
                        _thick = - _thick - 0.5;
                    } else {
                        _thick = - _thick;
                    }
                    _thickscore = _thickscore - 20;
                } while ((!(_thickscore <= 0)) && LOOP('Purplecontrols#5'));

                if (i == this.tunnel_lane_layer) {
                    draw_set_color(0xee5577);
                    _thick = 0;
                    _thickscore = this.tunnel_radius[i] * 0.75;
                    do {
                        S.d_circle(_cx, _cy, this.tunnel_radius[i] + _thick, 1);
                        if (_thick >= 0) {
                            _thick = - _thick - 0.5;
                        } else {
                            _thick = - _thick;
                        }
                        _thickscore = _thickscore - 20;
                    } while ((!(_thickscore <= 0)) && LOOP('Purplecontrols#6'));

                    draw_set_color(_prpl_dark);
                }
                if (i != 0) {
                    draw_set_color(_prpl_light);
                }
                _dir = this.tunnel_lane_direction - 270;
                for (let _r2170 = 0, _n2170 = (4); _r2170 < _n2170; _r2170++) {
                    S.d_circle(_cx + lengthdir_x(this.tunnel_radius[i], _dir), _cy + lengthdir_y(this.tunnel_radius[i], _dir), 2 + (this.tunnel_radius[i] - 12) / 24, false);
                    _dir = _dir + 90;
                }
            }
            i = i + 1;
        }
        surface_reset_target();
        _pixels = _growtanglescale * 71;
        if (i_ex('obj_growtangle')) {
            draw_surface_part(this.surface_effect, Math.max(0, 150 - _pixels / 2) + 2, Math.max(0, 150 - _pixels / 2) + 2, _pixels, _pixels, scr_get_box(4) - 148 + Math.max(0, 150 - _pixels / 2), scr_get_box(5) - 148 + Math.max(0, 150 - _pixels / 2));
        }
        if (W('obj_pinktrail', function (other) {
            draw_self(this);
        }, this) === EXIT) return;
        if (W('obj_pinkdust', function (other) {
            this.draw?.();
        }, this) === EXIT) return;
        break;
      case 8:
        _cx = camerax();
        _cy = cameray();
        if (!T(surface_exists(this.surface_effect))) {
            this.surface_effect = surface_create(640, 480);
        }
        surface_set_target(this.surface_effect);
        draw_clear_alpha(0, 0);
        draw_set_color(_prpl_dark);
        _alpha_master = 1;
        if (W('obj_pinknode', function (other) {
            i = 0;
            for (let _r2415 = 0, _n2415 = (4); _r2415 < _n2415; _r2415++) {
                if (T(this.draw_connection[i])) {
                    if (instance_exists(this.child[i])) {
                        S.d_line(this.x - _cx, this.y - _cy, this.child[i].x - _cx, this.child[i].y - _cy);
                        S.d_line(this.x + 0.5 - _cx, this.y + 0.5 - _cy, this.child[i].x + 0.5 - _cx, this.child[i].y + 0.5 - _cy);
                        S.d_line(this.x + 1 - _cx, this.y + 1 - _cy, this.child[i].x + 1 - _cx, this.child[i].y + 1 - _cy);
                        if (this.pulse >= 0) {
                            _col = merge_color(0xff0000, _prpl_dark, 0.667);
                            _dir = point_direction(this.x, this.y, this.child[i].x, this.child[i].y);
                            _dist = point_distance(this.x, this.y, this.child[i].x, this.child[i].y);
                            draw_primitive_begin(5);
                            _drawdist = clamp(this.pulse - this.pulse_length, 0, _dist);
                            draw_vertex_color(this.x + 1.5 + lengthdir_x(_drawdist, _dir) + lengthdir_x(1, _dir + 90), this.y + 1.5 + lengthdir_y(_drawdist, _dir) + lengthdir_y(1, _dir + 90), _col, 1);
                            draw_vertex_color(this.x + 1.5 + lengthdir_x(_drawdist, _dir) + lengthdir_x(1, _dir + 270), this.y + 1.5 + lengthdir_y(_drawdist, _dir) + lengthdir_y(1, _dir + 270), _col, 1);
                            _drawdist = clamp(this.pulse - this.pulse_length + 48, 0, _dist);
                            draw_vertex_color(this.x + 1.5 + lengthdir_x(_drawdist, _dir) + lengthdir_x(1, _dir + 90), this.y + 1.5 + lengthdir_y(_drawdist, _dir) + lengthdir_y(1, _dir + 90), _col, 1);
                            draw_vertex_color(this.x + 1.5 + lengthdir_x(_drawdist, _dir) + lengthdir_x(1, _dir + 270), this.y + 1.5 + lengthdir_y(_drawdist, _dir) + lengthdir_y(1, _dir + 270), _col, 1);
                            draw_primitive_end();
                            _col = 0xff0000;
                            draw_primitive_begin(5);
                            draw_vertex_color(this.x + 1.5 + lengthdir_x(_drawdist, _dir) + lengthdir_x(1, _dir + 90), this.y + 1.5 + lengthdir_y(_drawdist, _dir) + lengthdir_y(1, _dir + 90), _col, 1);
                            draw_vertex_color(this.x + 1.5 + lengthdir_x(_drawdist, _dir) + lengthdir_x(1, _dir + 270), this.y + 1.5 + lengthdir_y(_drawdist, _dir) + lengthdir_y(1, _dir + 270), _col, 1);
                            _drawdist = clamp(this.pulse - 24, 0, _dist);
                            draw_vertex_color(this.x + 1.5 + lengthdir_x(_drawdist, _dir) + lengthdir_x(1, _dir + 90), this.y + 1.5 + lengthdir_y(_drawdist, _dir) + lengthdir_y(1, _dir + 90), _col, 1);
                            draw_vertex_color(this.x + 1.5 + lengthdir_x(_drawdist, _dir) + lengthdir_x(1, _dir + 270), this.y + 1.5 + lengthdir_y(_drawdist, _dir) + lengthdir_y(1, _dir + 270), _col, 1);
                            draw_primitive_end();
                            _col = merge_color(0xff0000, _prpl_dark, 0.667);
                            draw_primitive_begin(5);
                            draw_vertex_color(this.x + 1.5 + lengthdir_x(_drawdist, _dir) + lengthdir_x(1, _dir + 90), this.y + 1.5 + lengthdir_y(_drawdist, _dir) + lengthdir_y(1, _dir + 90), _col, 1);
                            draw_vertex_color(this.x + 1.5 + lengthdir_x(_drawdist, _dir) + lengthdir_x(1, _dir + 270), this.y + 1.5 + lengthdir_y(_drawdist, _dir) + lengthdir_y(1, _dir + 270), _col, 1);
                            _drawdist = clamp(this.pulse, 0, _dist);
                            draw_vertex_color(this.x + 1.5 + lengthdir_x(_drawdist, _dir) + lengthdir_x(1, _dir + 90), this.y + 1.5 + lengthdir_y(_drawdist, _dir) + lengthdir_y(1, _dir + 90), _col, 1);
                            draw_vertex_color(this.x + 1.5 + lengthdir_x(_drawdist, _dir) + lengthdir_x(1, _dir + 270), this.y + 1.5 + lengthdir_y(_drawdist, _dir) + lengthdir_y(1, _dir + 270), _col, 1);
                            draw_primitive_end();
                        }
                    }
                }
                i = i + 1;
            }
        }, this) === EXIT) return;
        lightpink = make_color_rgb(247, 91, 200);
        if (this.life_time % 60 <= 30) {
            _glow_color = merge_color(lightpink, 0xffffff, 0.75 * (this.life_time % 60) / 30);
        } else {
            _glow_color = merge_color(lightpink, 0xffffff, 0.75 - 0.75 * ((this.life_time - 30) % 60) / 30);
        }
        if (W('obj_pinknode', function (other) {
            if (this.checkpoint < 1) {
                draw_set_color(_prpl_light);
                S.d_circle(Math.floor(0.5 + this.x - _cx), Math.floor(0.5 + this.y - _cy), 4, false);
            } else if (this.checkpoint == 2) {
                draw_set_color(merge_color(_prpl_light, _glow_color, 0.5));
                draw_set_alpha(0.667);
                S.d_circle(Math.floor(0.5 + this.x - _cx), Math.floor(0.5 + this.y - _cy), 5.2 - lengthdir_x(0.5, other.life_time / 60 * 360) + 2, false);
                draw_set_alpha(1);
                S.d_circle(Math.floor(0.5 + this.x - _cx), Math.floor(0.5 + this.y - _cy), 5.2 - lengthdir_x(0.5, other.life_time / 60 * 360), false);
            } else {
                draw_set_color(_glow_color);
                draw_set_alpha(0.667);
                S.d_circle(Math.floor(0.5 + this.x - _cx), Math.floor(0.5 + this.y - _cy), 7.3 - lengthdir_x(1, other.life_time / 60 * 360) + 2, false);
                draw_set_alpha(1);
                S.d_circle(Math.floor(0.5 + this.x - _cx), Math.floor(0.5 + this.y - _cy), 7.3 - lengthdir_x(1, other.life_time / 60 * 360), false);
            }
        }, this) === EXIT) return;
        if (W('obj_dokiheart', function (other) {
            if (this.visible == 0) {
                this.x = this.x - _cx;
                this.y = this.y - _cy;
                this.draw?.();
                this.x = this.x + _cx;
                this.y = this.y + _cy;
            }
        }, this) === EXIT) return;
        if (W('obj_bulletparent', function (other) {
            if (this.sprite_index == 'spr_finisher_explosion') {
                this.x = this.x - _cx;
                this.y = this.y - _cy;
                draw_self(this);
                this.x = this.x + _cx;
                this.y = this.y + _cy;
            }
        }, this) === EXIT) return;
        if (W('obj_pinknodeact', function (other) {
            if (this.life_time > 0) {
                this.x = this.x - _cx;
                this.y = this.y - _cy;
                this.draw?.();
                this.x = this.x + _cx;
                this.y = this.y + _cy;
                if (this.fading_away >= 0) {
                    _alpha_master = this.image_alpha;
                }
            }
        }, this) === EXIT) return;
        surface_reset_target();
        if (this.life_time < 30) {
            _alpha_master = clamp(this.life_time / 20, 0, 1);
        }
        _alpha = 0.25 * _alpha_master;
        _bleed = 4;
        draw_surface_ext(this.surface_effect, camerax(), cameray() - _bleed, 1, 1, 0, 0x000000, _alpha);
        draw_surface_ext(this.surface_effect, camerax(), cameray() + _bleed, 1, 1, 0, 0x000000, _alpha);
        draw_surface_ext(this.surface_effect, camerax() - _bleed, cameray(), 1, 1, 0, 0x000000, _alpha);
        draw_surface_ext(this.surface_effect, camerax() + _bleed, cameray(), 1, 1, 0, 0x000000, _alpha);
        _alpha = 0.5 * _alpha_master;
        _bleed = 2;
        draw_surface_ext(this.surface_effect, camerax() - _bleed, cameray() - _bleed, 1, 1, 0, 0x000000, _alpha);
        draw_surface_ext(this.surface_effect, camerax() - _bleed, cameray() + _bleed, 1, 1, 0, 0x000000, _alpha);
        draw_surface_ext(this.surface_effect, camerax() + _bleed, cameray() - _bleed, 1, 1, 0, 0x000000, _alpha);
        draw_surface_ext(this.surface_effect, camerax() + _bleed, cameray() + _bleed, 1, 1, 0, 0x000000, _alpha);
        if (_alpha_master < 1) {
            draw_surface_ext(this.surface_effect, camerax(), cameray(), 1, 1, 0, 0xffffff, _alpha_master);
        } else {
            draw_surface(this.surface_effect, camerax(), cameray());
        }
        if (W('obj_pinktrail', function (other) {
            draw_self(this);
        }, this) === EXIT) return;
        if (W('obj_pinkdust', function (other) {
            this.draw?.();
        }, this) === EXIT) return;
        break;
    }
    if (i_ex('obj_date_controller')) {
        this.image_alpha = 1;
    }
    if (W('obj_heart', function (other) {
        draw_sprite_ext(this.sprite_index, - 1, this.x + other.x_shake + other.heartshake_x + other.heartbump_x, this.y + other.heartshake_y + other.heartbump_y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
    }, this) === EXIT) return;
  }
  user0() {
    if (this.iframes <= 0) {
        this.iframes = 10;
        if (this.super >= 1) {
            this.super = 2;
        }
        if (this.rotate_travel >= 0) {
            this.rotate_speed = 6 + this.super * 12;
            this.rotate_travel = this.rotate_travel - 90;
        } else {
            this.rotate_speed = Math.max(6, this.rotate_speed + 6) + this.super * 12;
        }
        this.box_momentum = 24;
    }
  }
  user1() {
    return;
  }
  step() {
    let _input_buffer_length, _input_buffered, _pressed_something, _hold_repeat_delay, _hold_strongest, _wspeed, _laneswap_speed, _lane_distance, _ytarget, _dust, _y_old, _trail, _xtarget, _x_old, _heart_dir, _heart_dist, _move_dir, _move_dir_original, _allowed_input_angle, _rotate_travel_old, _x_traveled, _tirecorner_angle, _tire_lift, _box_slowdown_factor, _on_lane, _lane_scroll_speed, _ymovementspace, _number_of_lanes, _box_xscale, _box_yscale, _list_vertical_lines, i, _lane, _xx, _yy, _add_dir, _add_dist, _safety, _bul, _heart_speed_multiplier, _tunnel_speed_multiplier, _scale, _rotation_to_go, _rotation_speed, _heart_move_limit, _circle_grow_limit, _heart_zoomin_speed, _circle_interval, _tunnel_grow_factor, _tunnel_grow_addition, _heart_distance_to_center, _starting_radius, _dokidir, _variant, _dir, _atk, _angle, _dir_add, _multiple, _repeats, _moving, _multiple_angle, _zap, _doki, _offsetfix, _ht_old, _true_radius, _rt_old, _rotated_amount, _hx, _hy, _damagedir, _dist, _origdist, _scaling, _spr_offset, _randir, _randist, _li_nodes, _node_dist, _h_multi, _randnode, _li_size, _frequency, _moved, _old_node, _move_amount, _input_activated;
    if (W('obj_heart', function (other) {
        if (T(this.visible)) {
            this.sprite_index = 'spr_purpleheart';
            this.visible = 0;
        }
        this.canmove = 0;
    }, this) === EXIT) return;
    this.heartshake_x = scr_approach(- this.heartshake_x, 0, 2);
    this.heartshake_y = scr_approach(- this.heartshake_y, 0, 2);
    if (Math.abs(this.heartbump_x) > 2) {
        this.heartbump_x = scr_approach(this.heartbump_x, 0, 2);
    } else {
        this.heartbump_x = scr_approach(this.heartbump_x, 0, 1);
    }
    if (Math.abs(this.heartbump_y) > 2) {
        this.heartbump_y = scr_approach(this.heartbump_y, 0, 2);
    } else {
        this.heartbump_y = scr_approach(this.heartbump_y, 0, 1);
    }
    switch (this.mode) {
      case 3:
        if (this.buffer_boost > 0) {
            _input_buffer_length = 6;
        } else {
            _input_buffer_length = 2;
        }
        break;
      case 7:
        _input_buffer_length = 4;
        break;
      default:
        _input_buffer_length = 2;
    }
    _input_buffered = false;
    this.buffer_boost = scr_approach(this.buffer_boost, 0, 1);
    if (this.life_time < 13 && i_ex('obj_dbulletcontroller') && O('obj_dbulletcontroller').type == 203 || this.life_time < 5) {
    } else {
        if (left_h()) {
            this.press_l = this.press_l + 1;
        } else {
            this.press_l = 0;
        }
        if (right_h()) {
            this.press_r = this.press_r + 1;
        } else {
            this.press_r = 0;
        }
        if (up_h()) {
            this.press_u = this.press_u + 1;
        } else {
            this.press_u = 0;
        }
        if (down_h()) {
            this.press_d = this.press_d + 1;
        } else {
            this.press_d = 0;
        }
        if (this.buffer_l > 0) {
            this.buffer_l = clamp(this.buffer_l - 1, Math.min(this.press_l, 1), _input_buffer_length);
        }
        if (this.buffer_r > 0) {
            this.buffer_r = clamp(this.buffer_r - 1, Math.min(this.press_r, 1), _input_buffer_length);
        }
        if (this.buffer_u > 0) {
            this.buffer_u = clamp(this.buffer_u - 1, Math.min(this.press_u, 1), _input_buffer_length);
        }
        if (this.buffer_d > 0) {
            this.buffer_d = clamp(this.buffer_d - 1, Math.min(this.press_d, 1), _input_buffer_length);
        }
        _pressed_something = 0;
        if (left_p()) {
            this.buffer_l = _input_buffer_length;
            _input_buffered = true;
            _pressed_something = _pressed_something + 2;
        }
        if (right_p()) {
            this.buffer_r = _input_buffer_length;
            _input_buffered = true;
            _pressed_something = _pressed_something + 1;
        }
        if (up_p()) {
            this.buffer_u = _input_buffer_length;
            _input_buffered = true;
            _pressed_something = _pressed_something + 4;
        }
        if (down_p()) {
            this.buffer_d = _input_buffer_length;
            _input_buffered = true;
            _pressed_something = _pressed_something + 8;
        }
        _hold_repeat_delay = 9;
        if (!T(_input_buffered)) {
            _hold_strongest = Math.max(_hold_repeat_delay, this.press_l, this.press_r, this.press_u, this.press_d);
            if (this.press_l >= _hold_strongest) {
                this.buffer_l = Math.max(1, this.buffer_l);
            }
            if (this.press_r >= _hold_strongest) {
                this.buffer_r = Math.max(1, this.buffer_r);
            }
            if (this.press_u >= _hold_strongest) {
                this.buffer_u = Math.max(1, this.buffer_u);
            }
            if (this.press_d >= _hold_strongest) {
                this.buffer_d = Math.max(1, this.buffer_d);
            }
        }
        if (T(_input_buffered)) {
            if (this.buffer_l < _input_buffer_length) {
                this.buffer_l = 0;
            }
            if (this.buffer_r < _input_buffer_length) {
                this.buffer_r = 0;
            }
            if (this.buffer_u < _input_buffer_length) {
                this.buffer_u = 0;
            }
            if (this.buffer_d < _input_buffer_length) {
                this.buffer_d = 0;
            }
        }
    }
    this.input_activated_l = 0;
    this.input_activated_r = 0;
    this.input_activated_u = 0;
    this.input_activated_d = 0;
    this.px = 0;
    this.py = 0;
    this.squished = 0;
    _wspeed = 0;
    if (W('obj_heart', function (other) {
        _wspeed = this.wspeed;
    }, this) === EXIT) return;
    switch (this.mode) {
      case 0:
        if (this.press_r >= 1) {
            this.px = _wspeed;
        }
        if (this.press_l >= 1) {
            this.px = - _wspeed;
        }
        if (this.press_d >= 1) {
            this.py = _wspeed;
        }
        if (this.press_u >= 1) {
            this.py = - _wspeed;
        }
        this.x_ongrid = this.x_ongrid + this.px;
        this.y_ongrid = this.y_ongrid + this.py;
        break;
      case 1:
        _laneswap_speed = 20;
        _lane_distance = 56;
        _ytarget = (this.lane_y - 1) * _lane_distance;
        if (this.y_ongrid == _ytarget) {
            if (this.buffer_u >= 1 && this.lane_y > 0) {
                this.input_activated_u = this.input_activated_u + 1;
                snd_play('snd_wing');
                this.lane_y = this.lane_y - 1;
                _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                _dust.image_angle = 90;
            } else if (this.buffer_d >= 1 && this.lane_y < 2) {
                this.input_activated_d = this.input_activated_d + 1;
                snd_play('snd_wing');
                this.lane_y = this.lane_y + 1;
                _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                _dust.image_angle = 270;
            }
        }
        if (this.y_ongrid != _ytarget) {
            _y_old = this.y_ongrid;
            this.y_ongrid = scr_approach(this.y_ongrid, _ytarget, _laneswap_speed);
            if (W('obj_heart', function (other) {
                _trail = instance_create_depth(this.x, this.y, 0, 'obj_pinktrail');
                _trail.direction = point_direction(0, _y_old, 0, other.y_ongrid);
                _trail.speed = 1;
            }, this) === EXIT) return;
            if (this.y_ongrid == _ytarget) {
                if (this.y_ongrid < _y_old) {
                    this.heartshake_y = - 5;
                } else {
                    this.heartshake_y = 5;
                }
            }
        }
        if (this.press_r >= 1) {
            this.x_ongrid = Math.min(this.x_ongrid + _wspeed, 63);
        }
        if (this.press_l >= 1) {
            this.x_ongrid = Math.max(this.x_ongrid - _wspeed, - 63);
        }
        this.bg_y = this.bg_y + 1.5;
        if (this.bg_y >= 78) {
            this.bg_y = this.bg_y - 24;
        }
        break;
      case 2:
        _laneswap_speed = 22;
        _lane_distance = 40;
        if (W('obj_heart', function (other) {
            if (W(instance_place(this, this.x, this.y, 'obj_fusebomb_big'), function (other) {
                if (this.active == 1) {
                    O('obj_purplecontrols').squished = 1;
                    _laneswap_speed = 10;
                }
            }, this) === EXIT) return EXIT;
        }, this) === EXIT) return;
        _xtarget = (this.lane_x - 1.5) * _lane_distance;
        _ytarget = (this.lane_y - 1.5) * _lane_distance;
        if (this.x_ongrid == _xtarget) {
            if (this.y_ongrid == _ytarget) {
                if (this.buffer_l >= 1 && this.lane_x > 0) {
                    this.input_activated_l = this.input_activated_l + 1;
                    snd_play('snd_wing');
                    this.lane_x = this.lane_x - 1;
                    this.grid_direction = 180;
                    _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                    _dust.image_angle = 180;
                } else if (this.buffer_r >= 1 && this.lane_x < 3) {
                    this.input_activated_r = this.input_activated_r + 1;
                    snd_play('snd_wing');
                    this.lane_x = this.lane_x + 1;
                    this.grid_direction = 0;
                    _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                    _dust.image_angle = 0;
                } else if (this.buffer_u >= 1 && this.lane_y > 0) {
                    this.input_activated_u = this.input_activated_u + 1;
                    snd_play('snd_wing');
                    this.lane_y = this.lane_y - 1;
                    this.grid_direction = 90;
                    _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                    _dust.image_angle = 90;
                } else if (this.buffer_d >= 1 && this.lane_y < 3) {
                    this.input_activated_d = this.input_activated_d + 1;
                    snd_play('snd_wing');
                    this.lane_y = this.lane_y + 1;
                    this.grid_direction = 270;
                    _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                    _dust.image_angle = 270;
                }
            }
        }
        if (this.x_ongrid != _xtarget) {
            _x_old = this.x_ongrid;
            this.x_ongrid = scr_approach(this.x_ongrid, _xtarget, _laneswap_speed);
            if (W('obj_heart', function (other) {
                _trail = instance_create_depth(this.x, this.y, 0, 'obj_pinktrail');
                _trail.direction = point_direction(_x_old, 0, other.x_ongrid, 0);
                _trail.speed = 1;
            }, this) === EXIT) return;
            if (this.x_ongrid == _xtarget) {
                if (this.x_ongrid < _x_old) {
                    this.heartshake_x = - 5;
                } else {
                    this.heartshake_x = 5;
                }
            }
        }
        if (this.y_ongrid != _ytarget) {
            _y_old = this.y_ongrid;
            this.y_ongrid = scr_approach(this.y_ongrid, _ytarget, _laneswap_speed);
            if (W('obj_heart', function (other) {
                _trail = instance_create_depth(this.x, this.y, 0, 'obj_pinktrail');
                _trail.direction = point_direction(0, _y_old, 0, other.y_ongrid);
                _trail.speed = 1;
            }, this) === EXIT) return;
            if (this.y_ongrid == _ytarget) {
                if (this.y_ongrid < _y_old) {
                    this.heartshake_y = - 5;
                } else {
                    this.heartshake_y = 5;
                }
            }
        }
        this.bg_pulse = this.bg_pulse + 1;
        if (this.x_ongrid == _xtarget) {
            if (this.y_ongrid == _ytarget) {
                if (this.bg_pulse >= 25) {
                    instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_fx_purpleripple');
                    this.bg_pulse = 0;
                }
            }
        }
        break;
      case 3:
        if (W('obj_growtangle', function (other) {
            this.visible = false;
        }, this) === EXIT) return;
        if (W('obj_heart', function (other) {
            this.visible = false;
        }, this) === EXIT) return;
        _laneswap_speed = 20;
        if (this.rotate_travel != 0) {
            _laneswap_speed = 10;
        }
        _lane_distance = 56;
        _heart_dir = point_direction(0, 0, this.lane_x, this.lane_y);
        _heart_dist = point_distance(0, 0, this.lane_x, this.lane_y);
        this.bg_pulse = this.bg_pulse + 1;
        if (this.heart_travel == 0) {
            _move_dir = - 1;
            _move_dir_original = - 1;
            if (this.buffer_u >= 1) {
                _move_dir_original = 90;
            } else if (this.buffer_d >= 1) {
                _move_dir_original = 270;
            } else if (this.buffer_l >= 1) {
                _move_dir_original = 180;
            } else if (this.buffer_r >= 1) {
                _move_dir_original = 0;
            }
            if (_move_dir_original >= 0) {
                _allowed_input_angle = 44.9;
                _move_dir = _move_dir_original - this.image_angle - sign(this.rotate_travel) * Math.min(this.rotate_speed * 5, Math.abs(this.rotate_travel));
                if (_move_dir < 0) {
                    _move_dir = _move_dir + 360;
                }
                if (_move_dir >= 360) {
                    _move_dir = _move_dir - 360;
                }
                if ((_move_dir <= 0 + _allowed_input_angle || _move_dir >= 360 - _allowed_input_angle) || _move_dir >= 90 - _allowed_input_angle && _move_dir <= 90 + _allowed_input_angle || _move_dir >= 180 - _allowed_input_angle && _move_dir <= 180 + _allowed_input_angle || _move_dir >= 270 - _allowed_input_angle && _move_dir <= 270 + _allowed_input_angle) {
                    _move_dir = Math.floor(0.5 + _move_dir / 90) * 90;
                } else {
                    _move_dir = - 1;
                }
            }
            if (_move_dir == 90) {
                if (this.lane_x == 0) {
                    if (T(this.can_move)) {
                        if (this.lane_y > - 1) {
                            snd_play('snd_wing');
                            _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                            _dust.image_angle = 90;
                            this.heart_angle = 90;
                            this.heart_travel = _lane_distance;
                        } else if (_pressed_something > 0) {
                            this.heartshake_y = - 3;
                        }
                        this.lane_y = Math.max(- 1, this.lane_y - 1);
                    } else if (_pressed_something > 0) {
                        this.heartshake_y = - 3;
                    }
                }
            } else if (_move_dir == 270) {
                if (this.lane_x == 0) {
                    if (T(this.can_move)) {
                        if (this.lane_y < 1) {
                            snd_play('snd_wing');
                            _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                            _dust.image_angle = 270;
                            this.heart_angle = 270;
                            this.heart_travel = _lane_distance;
                        } else if (_pressed_something > 0) {
                            this.heartshake_y = 3;
                        }
                        this.lane_y = Math.min(1, this.lane_y + 1);
                    } else if (_pressed_something > 0) {
                        this.heartshake_y = 3;
                    }
                }
            } else if (_move_dir == 180) {
                if (this.lane_y == 0) {
                    if (T(this.can_move)) {
                        if (this.lane_x > - 1) {
                            snd_play('snd_wing');
                            _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                            _dust.image_angle = 180;
                            this.heart_angle = 180;
                            this.heart_travel = _lane_distance;
                        } else if (_pressed_something > 0) {
                            this.heartshake_x = - 3;
                        }
                        this.lane_x = Math.max(- 1, this.lane_x - 1);
                    } else if (_pressed_something > 0) {
                        this.heartshake_x = - 3;
                    }
                }
            } else if (_move_dir == 0 || _move_dir == 360) {
                if (this.lane_y == 0) {
                    if (T(this.can_move)) {
                        if (this.lane_x < 1) {
                            snd_play('snd_wing');
                            _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                            _dust.image_angle = 0;
                            this.heart_angle = 0;
                            this.heart_travel = _lane_distance;
                        } else if (_pressed_something > 0) {
                            this.heartshake_x = 3;
                        }
                        this.lane_x = Math.min(1, this.lane_x + 1);
                    } else if (_pressed_something > 0) {
                        this.heartshake_x = 3;
                    }
                }
            }
            if (this.heart_travel != 0) {
                switch (_move_dir_original) {
                  case 0:
                    this.input_activated_r = this.input_activated_r + 1;
                    break;
                  case 90:
                    this.input_activated_u = this.input_activated_u + 1;
                    break;
                  case 180:
                    this.input_activated_l = this.input_activated_l + 1;
                    break;
                  case 270:
                    this.input_activated_d = this.input_activated_d + 1;
                    break;
                }
            }
        }
        if (this.rotate_travel == 0) {
            this.rotate_speed = 0;
            this.rotate_momentum = clamp(this.rotate_momentum * 0.75 - 0.1, 0, 4);
            if (T(this.can_move)) {
                if (this.bg_pulse >= 25) {
                    instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_fx_purpleripple');
                    this.bg_pulse = 0;
                }
            }
        }
        _rotate_travel_old = this.rotate_travel;
        if (this.rotate_travel != 0) {
            if (W('obj_huge_anime_face', function (other) {
                this.player_moved = 1;
            }, this) === EXIT) return;
            this.rotate_speed = clamp(this.rotate_speed + 0.2, 0.2 + this.rotate_momentum, 10);
            this.image_angle = scr_approach(this.image_angle, this.image_angle + this.rotate_travel, this.rotate_speed);
            this.rotate_travel = scr_approach(this.rotate_travel, 0, this.rotate_speed);
            if (this.rotate_travel == 0) {
                if (this.lane_x != 0 || this.lane_y != 0) {
                    switch (Math.floor(0.5 + (point_direction(0, 0, this.lane_x, this.lane_y) + this.image_angle) / 90) * 90) {
                      case 0:
                      case 360:
                        this.lane_x = 1;
                        this.lane_y = 0;
                        break;
                      case 90:
                      case 450:
                        this.lane_x = 0;
                        this.lane_y = - 1;
                        break;
                      case 180:
                      case 540:
                        this.lane_x = - 1;
                        this.lane_y = 0;
                        break;
                      case 270:
                      case - 90:
                        this.lane_x = 0;
                        this.lane_y = 1;
                        break;
                      default:
                        this.lane_x = 0;
                        this.lane_y = 0;
                    }
                }
                this.image_angle = 0;
                this.heart_angle = this.heart_angle + sign(_rotate_travel_old - this.rotate_travel) * 90;
                if (this.heart_angle < 0) {
                    this.heart_angle = this.heart_angle + 360;
                }
                if (this.heart_angle >= 360) {
                    this.heart_angle = this.heart_angle - 360;
                }
                this.rotate_momentum = this.rotate_momentum + 1;
                this.x_shake = 4;
                if (W('obj_dokiheart', function (other) {
                    switch (Math.floor(0.5 + (point_direction(other.x, other.y, this.x, this.y) + other.image_angle) / 90) * 90) {
                      case 0:
                      case 360:
                        this.lane_x = 1;
                        this.lane_y = 0;
                        break;
                      case 90:
                      case 450:
                        this.lane_x = 0;
                        this.lane_y = - 1;
                        break;
                      case 180:
                      case 540:
                        this.lane_x = - 1;
                        this.lane_y = 0;
                        break;
                      case 270:
                      case - 90:
                        this.lane_x = 0;
                        this.lane_y = 1;
                        break;
                      default:
                        this.lane_x = 0;
                        this.lane_y = 0;
                    }
                }, this) === EXIT) return;
            }
            if (this.image_angle < 0) {
                this.image_angle = this.image_angle + 360;
            }
            if (this.image_angle >= 360) {
                this.image_angle = this.image_angle - 360;
            }
            _x_traveled = - (this.rotate_travel - _rotate_travel_old) * 0.8333333333333334 * 1.570795;
            if (W('obj_bulletparent', function (other) {
                if (this.object_index != 'obj_pinklanebullet') {
                    this.x = this.x + _x_traveled;
                }
            }, this) === EXIT) return;
            if (W('obj_slidedust', function (other) {
                this.x = this.x + _x_traveled;
            }, this) === EXIT) return;
            if (W('obj_purplebg', function (other) {
                this.bg_x = this.bg_x + _x_traveled / 4;
            }, this) === EXIT) return;
        }
        _tirecorner_angle = this.image_angle % 90 + 45;
        if (this.super <= 0) {
            _tire_lift = lengthdir_y(96, _tirecorner_angle);
        } else {
            _tire_lift = - 67.88 + (lengthdir_y(96, _tirecorner_angle) + 67.88) * (this.super * 0.6666666666666666);
        }
        if (!T(this.tire_lift_activated)) {
            this.tire_lift_activated = true;
            this.tire_y = this.y - _tire_lift;
        }
        _y_old = this.y;
        this.y = this.tire_y + _tire_lift;
        if (W('obj_growtangle', function (other) {
            this.y = other.y;
        }, this) === EXIT) return;
        if (W('obj_pink_battlemovement', function (other) {
            if (this.mode == 6) {
                this.dest_y = other.tire_y + (_tire_lift + 67.88) * 1.5 - 184;
                if (this.dest_y <= this.y) {
                    if (other.rotate_speed != 0) {
                        this.hspeed = this.hspeed * 0.5 + other.rotate_speed * 0.334 * sign(- other.rotate_travel);
                    }
                }
                if (this.dest_y < this.y) {
                    this.vspeed = Math.min(this.vspeed, (this.dest_y - this.y) * 1.25);
                }
            }
        }, this) === EXIT) return;
        if (W('obj_pinklanebullet', function (other) {
            this.y = this.y + (other.y - _y_old);
        }, this) === EXIT) return;
        if (W('obj_dokiheart', function (other) {
            this.y = this.y + (other.y - _y_old);
        }, this) === EXIT) return;
        if (this.box_momentum != 0) {
            _x_traveled = - this.box_momentum;
            _box_slowdown_factor = 10;
            if (this.rotate_travel == 0) {
                if (random(4) < Math.abs(this.box_momentum)) {
                    _dust = instance_create_depth(this.x - 78 + random(156), this.y + 78, - 24, 'obj_slidedust');
                    _dust.sprite_index = 'spr_dust1';
                }
                _x_traveled = - this.box_momentum;
                this.box_momentum = scr_approach(this.box_momentum, 0, 0.1 + this.box_momentum / _box_slowdown_factor);
            } else {
                if (irandom(3) == 0) {
                    _dust = instance_create_depth(this.x + lengthdir_x(108, _tirecorner_angle + 180), this.y + lengthdir_y(108, _tirecorner_angle + 180), - 24, 'obj_slidedust');
                    _dust.sprite_index = 'spr_dust1';
                }
                _x_traveled = - this.box_momentum / 4;
                this.box_momentum = scr_approach(this.box_momentum, 0, 0.1 + this.box_momentum / (_box_slowdown_factor * 4));
            }
            if (W('obj_bulletparent', function (other) {
                if (this.object_index != 'obj_pinklanebullet') {
                    this.x = this.x + _x_traveled;
                }
            }, this) === EXIT) return;
            if (W('obj_slidedust', function (other) {
                this.x = this.x + _x_traveled;
            }, this) === EXIT) return;
            if (W('obj_purplebg', function (other) {
                this.bg_x = this.bg_x + _x_traveled / 4;
            }, this) === EXIT) return;
        }
        if (this.rotate_travel == 0 && this.super >= 1) {
            this.super = this.super - 1;
            if (this.super == 1) {
                if (W(instance_create_depth(this.x, this.y, this.depth - 2, 'obj_pinkmeteor'), function (other) {
                    this.image_xscale = 3.5;
                    this.image_yscale = 3.5;
                    this.mother = other.id;
                }, this) === EXIT) return;
            }
            if (this.super > 0) {
                this.rotate_speed = this.rotate_speed * 0.9166666666666666 - 0.5;
            } else {
                this.rotate_speed = this.rotate_speed * 0.8333333333333334 - 1;
            }
            snd_play('snd_impact', 0.7 + this.super * 0.1, 0.965 + this.super * 0.035);
            this.rotate_travel = sign(_rotate_travel_old) * 90;
        }
        if (this.heart_travel != 0) {
            if (W('obj_heart', function (other) {
                _trail = instance_create_depth(this.x, this.y, 0, 'obj_pinktrail');
                _trail.direction = other.heart_angle;
                _trail.speed = 1;
            }, this) === EXIT) return;
            this.heart_travel = scr_approach(this.heart_travel, 0, _laneswap_speed);
            if (this.rotate_travel != 0) {
                if (W('obj_heart', function (other) {
                    this.mask_index = 'mask_empty';
                }, this) === EXIT) return;
            }
            if (this.heart_travel == 0) {
                if (W('obj_heart', function (other) {
                    this.mask_index = 'spr_dodgeheartmask';
                }, this) === EXIT) return;
                if (this.heart_angle > 45 && this.heart_angle < 135) {
                    this.heartshake_y = - 5;
                } else if (this.heart_angle >= 135 && this.heart_angle <= 225) {
                    this.heartshake_x = - 5;
                } else if (this.heart_angle > 225 && this.heart_angle < 315) {
                    this.heartshake_y = 5;
                } else {
                    this.heartshake_x = 5;
                }
            }
        }
        _heart_dir = point_direction(0, 0, this.lane_x, this.lane_y);
        _heart_dist = point_distance(0, 0, this.lane_x, this.lane_y);
        this.x_ongrid = lengthdir_x(_heart_dist * _lane_distance, _heart_dir + this.image_angle) - lengthdir_x(this.heart_travel, this.heart_angle + this.image_angle);
        this.y_ongrid = lengthdir_y(_heart_dist * _lane_distance, _heart_dir + this.image_angle) - lengthdir_y(this.heart_travel, this.heart_angle + this.image_angle);
        break;
      case 4:
      case 5:
        _laneswap_speed = 24;
        _lane_distance = 126;
        _xtarget = Math.floor(0.5 + (this.lane_x - 0.5) * _lane_distance);
        _on_lane = false;
        _lane_scroll_speed = 1.25;
        this.lane_scroll = this.lane_scroll + _lane_scroll_speed;
        if (this.lane_scroll >= 16) {
            this.lane_scroll = this.lane_scroll - 16;
        }
        if (this.x_ongrid == _xtarget) {
            _on_lane = true;
            if (this.buffer_l >= 1 && this.lane_x > 0) {
                this.input_activated_l = this.input_activated_l + 1;
                snd_play('snd_wing');
                this.lane_x = this.lane_x - 1;
                _on_lane = false;
                _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                _dust.image_angle = 180;
            } else if (this.buffer_r >= 1 && this.lane_x < 1) {
                this.input_activated_r = this.input_activated_r + 1;
                snd_play('snd_wing');
                this.lane_x = this.lane_x + 1;
                _on_lane = false;
                _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                _dust.image_angle = 0;
            }
        }
        if (this.x_ongrid != _xtarget) {
            _x_old = this.x_ongrid;
            this.x_ongrid = scr_approach(this.x_ongrid, _xtarget, _laneswap_speed);
            if (W('obj_heart', function (other) {
                _trail = instance_create_depth(this.x, this.y, 0, 'obj_pinktrail');
                _trail.direction = point_direction(_x_old, 0, other.x_ongrid, 0);
                _trail.speed = 1;
            }, this) === EXIT) return;
            if (this.x_ongrid == _xtarget) {
                if (this.x_ongrid < _x_old) {
                    this.heartshake_x = - 5;
                } else {
                    this.heartshake_x = 5;
                }
            }
        }
        _ymovementspace = 105;
        if (this.mode == 4 || !T(_on_lane)) {
            if (this.press_d >= 1) {
                this.y_ongrid = Math.min(this.y_ongrid + _wspeed, _ymovementspace - 7);
            }
            if (this.press_u >= 1) {
                this.y_ongrid = Math.max(this.y_ongrid - _wspeed, - _ymovementspace + 7);
            }
        } else {
            if (this.buffer_d >= _input_buffer_length) {
                this.heartbump_y = 4;
            }
            if (this.buffer_u >= _input_buffer_length) {
                this.heartbump_y = - 4;
            }
            if (this.lane_x == 0) {
                this.y_ongrid = Math.min(this.y_ongrid + _lane_scroll_speed, _ymovementspace - 7);
            } else {
                this.y_ongrid = Math.max(this.y_ongrid - _lane_scroll_speed, - _ymovementspace + 7);
            }
        }
        this.bg_y = this.bg_y + 1.75;
        if (this.bg_y >= 94) {
            this.bg_y = this.bg_y - 32;
        }
        break;
      case 6:
        _number_of_lanes = 3;
        _lane_distance = 64;
        _laneswap_speed = 22;
        if (this.made == 0) {
            this.lane_x = 1;
            this.lane_y = 0;
            this.lane_joint_number = - 1;
            _box_xscale = 1.5;
            _box_yscale = 1.3333333333333333;
            if (W('obj_growtangle', function (other) {
                this.image_xscale = this.image_xscale * _box_xscale;
                this.image_yscale = this.image_yscale * _box_yscale;
            }, this) === EXIT) return;
            this.maze_destination = S.ds_list_create();
            S.ds_list_add(this.maze_destination, 0, 1, 2);
            S.ds_list_shuffle(this.maze_destination);
            _list_vertical_lines = S.ds_list_create();
            i = 0;
            for (let _r4214 = 0, _n4214 = (3 * _number_of_lanes); _r4214 < _n4214; _r4214++) {
                switch (i) {
                  case 0:
                    S.ds_list_add(_list_vertical_lines, 12);
                    break;
                  case 1:
                    S.ds_list_add(_list_vertical_lines, 14);
                    break;
                  case 2:
                    S.ds_list_add(_list_vertical_lines, 17);
                    break;
                  case 3:
                    S.ds_list_add(_list_vertical_lines, 21);
                    break;
                  case 4:
                    S.ds_list_add(_list_vertical_lines, 26);
                    break;
                  case 5:
                    S.ds_list_add(_list_vertical_lines, 29);
                    break;
                  case 6:
                    S.ds_list_add(_list_vertical_lines, 32);
                    break;
                  case 7:
                    S.ds_list_add(_list_vertical_lines, 35);
                    break;
                  default:
                    S.ds_list_add(_list_vertical_lines, 38);
                    break;
                }
                i = i + 1;
            }
            S.ds_list_shuffle(_list_vertical_lines);
            _lane = _number_of_lanes;
            for (let _r4348 = 0, _n4348 = (_number_of_lanes); _r4348 < _n4348; _r4348++) {
                _lane = _lane - 1;
                this.maze_distance ??= []; this.maze_distance[_lane] = S.ds_list_create();
                this.maze_direction ??= []; this.maze_direction[_lane] = S.ds_list_create();
                i = 0;
                _xx = - (_lane_distance * ((_number_of_lanes - 1) / 2)) + _lane_distance * _lane;
                _yy = 0;
                for (let _r4406 = 0, _n4406 = (6); _r4406 < _n4406; _r4406++) {
                    if (i % 2 == 0) {
                        _add_dir = 270;
                        _add_dist = S.ds_list_find_value(_list_vertical_lines, 0);
                        S.ds_list_delete(_list_vertical_lines, 0);
                    } else {
                        _add_dir = choose(180, 0);
                        _add_dist = 30 + irandom(11) * 6;
                    }
                    _xx = _xx + lengthdir_x(_add_dist, _add_dir);
                    _yy = _yy + lengthdir_y(_add_dist, _add_dir);
                    if (_xx > 96) {
                        if (_add_dir == 0) {
                            _xx = _xx - lengthdir_x(_add_dist, _add_dir);
                            _add_dir = 180;
                            _xx = _xx + lengthdir_x(_add_dist, _add_dir);
                        }
                    }
                    if (_xx < - 96) {
                        if (_add_dir == 180) {
                            _xx = _xx - lengthdir_x(_add_dist, _add_dir);
                            _add_dir = 0;
                            _xx = _xx + lengthdir_x(_add_dist, _add_dir);
                        }
                    }
                    if (_xx == - _lane_distance + S.ds_list_find_value(this.maze_destination, _lane) * _lane_distance) {
                        if (i >= 3) {
                            _add_dist = _add_dist + 6;
                        }
                        _xx = _xx + lengthdir_x(6, _add_dir);
                    }
                    S.ds_list_add(this.maze_direction[_lane], _add_dir);
                    S.ds_list_add(this.maze_distance[_lane], _add_dist);
                    i = i + 1;
                }
            }
            S.ds_list_destroy(_list_vertical_lines);
            _safety = choose(0, 1, 2);
            i = 0;
            for (let _r4662 = 0, _n4662 = (_number_of_lanes); _r4662 < _n4662; _r4662++) {
                if (i != _safety) {
                    _bul = scr_fire_bullet(this, this.x - _lane_distance + i * _lane_distance, this.y + 200, 'obj_buzzsaw', 90, 7);
                    _bul.friction = 0.2;
                    _bul.visible = 0;
                } else {
                    instance_create_depth(this.x - _lane_distance + i * _lane_distance, this.y + 64, this.depth - 1, 'obj_pinkhealheart');
                }
                _bul = scr_fire_bullet(this, this.x - _lane_distance + i * _lane_distance, this.y - 130, 'obj_buzzsaw', 270, 0.2);
                _bul.visible = 0;
                i = i + 1;
            }
            this.surface_effect = surface_create(213, 189);
        }
        if (this.lane_joint_number < 0) {
            _xtarget = (this.lane_x - (_number_of_lanes - 1) / 2) * _lane_distance;
            _ytarget = (this.lane_y - 0.5) * 128;
        } else {
            _xtarget = this.x_target;
            _ytarget = this.y_target;
        }
        if (this.x_ongrid == _xtarget) {
            if (this.y_ongrid == _ytarget) {
                if (this.buffer_l >= 1 && this.lane_x > 0) {
                    this.input_activated_l = this.input_activated_l + 1;
                    snd_play('snd_wing');
                    this.lane_x = this.lane_x - 1;
                    this.grid_direction = 180;
                    _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                    _dust.image_angle = 180;
                } else if (this.buffer_r >= 1 && this.lane_x < _number_of_lanes - 1) {
                    this.input_activated_r = this.input_activated_r + 1;
                    snd_play('snd_wing');
                    this.lane_x = this.lane_x + 1;
                    this.grid_direction = 0;
                    _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                    _dust.image_angle = 0;
                } else if (this.buffer_d >= 1 && this.lane_y < 1) {
                    this.input_activated_d = this.input_activated_d + 1;
                    snd_play('snd_wing');
                    this.lane_y = this.lane_y + 1;
                    this.grid_direction = 270;
                    this.lane_joint_number = 0;
                    this.x_target = _xtarget + lengthdir_x(S.ds_list_find_value(this.maze_distance[this.lane_x], this.lane_joint_number), S.ds_list_find_value(this.maze_direction[this.lane_x], this.lane_joint_number));
                    this.y_target = _ytarget + lengthdir_y(S.ds_list_find_value(this.maze_distance[this.lane_x], this.lane_joint_number), S.ds_list_find_value(this.maze_direction[this.lane_x], this.lane_joint_number));
                    _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                    _dust.image_angle = 270;
                }
            }
        }
        if (this.lane_joint_number < 0) {
            if (this.x_ongrid != _xtarget) {
                _x_old = this.x_ongrid;
                this.x_ongrid = scr_approach(this.x_ongrid, _xtarget, _laneswap_speed);
                if (W('obj_heart', function (other) {
                    _trail = instance_create_depth(this.x, this.y, 0, 'obj_pinktrail');
                    _trail.direction = point_direction(_x_old, 0, other.x_ongrid, 0);
                    _trail.speed = 1;
                }, this) === EXIT) return;
                if (this.x_ongrid == _xtarget) {
                    if (this.x_ongrid < _x_old) {
                        this.heartshake_x = - 5;
                    } else {
                        this.heartshake_x = 5;
                    }
                }
            }
            if (this.y_ongrid != _ytarget) {
                _y_old = this.y_ongrid;
                this.y_ongrid = scr_approach(this.y_ongrid, _ytarget, _laneswap_speed);
                if (W('obj_heart', function (other) {
                    _trail = instance_create_depth(this.x, this.y, 0, 'obj_pinktrail');
                    _trail.direction = point_direction(0, _y_old, 0, other.y_ongrid);
                    _trail.speed = 1;
                }, this) === EXIT) return;
                if (this.y_ongrid == _ytarget) {
                    if (this.y_ongrid < _y_old) {
                        this.heartshake_y = - 5;
                    } else {
                        this.heartshake_y = 5;
                    }
                }
            }
        } else if (this.x_ongrid != _xtarget || this.y_ongrid != _ytarget) {
            _x_old = this.x_ongrid;
            _y_old = this.y_ongrid;
            this.x_ongrid = scr_approach(this.x_ongrid, _xtarget, _laneswap_speed);
            this.y_ongrid = scr_approach(this.y_ongrid, _ytarget, _laneswap_speed);
            if (W('obj_heart', function (other) {
                _trail = instance_create_depth(this.x, this.y, 0, 'obj_pinktrail');
                _trail.direction = point_direction(_x_old, _y_old, other.x_ongrid, other.y_ongrid);
                _trail.speed = 1;
            }, this) === EXIT) return;
            if (this.x_ongrid == _xtarget && this.y_ongrid == _ytarget) {
                this.lane_joint_number = this.lane_joint_number + 1;
                if (this.lane_joint_number < S.ds_list_size(this.maze_distance[this.lane_x]) - 1) {
                    this.x_target = this.x_target + lengthdir_x(S.ds_list_find_value(this.maze_distance[this.lane_x], this.lane_joint_number), S.ds_list_find_value(this.maze_direction[this.lane_x], this.lane_joint_number));
                    this.y_target = this.y_target + lengthdir_y(S.ds_list_find_value(this.maze_distance[this.lane_x], this.lane_joint_number), S.ds_list_find_value(this.maze_direction[this.lane_x], this.lane_joint_number));
                } else if (this.lane_joint_number < S.ds_list_size(this.maze_distance[this.lane_x])) {
                    this.x_target = (S.ds_list_find_value(this.maze_destination, this.lane_x) - (_number_of_lanes - 1) / 2) * _lane_distance;
                    this.y_target = this.y_target + lengthdir_y(S.ds_list_find_value(this.maze_distance[this.lane_x], this.lane_joint_number), S.ds_list_find_value(this.maze_direction[this.lane_x], this.lane_joint_number));
                } else if (this.lane_joint_number < S.ds_list_size(this.maze_distance[this.lane_x]) + 1) {
                    this.y_target = 64;
                } else {
                    if (this.y_ongrid < _y_old) {
                        this.heartshake_y = - 5;
                    } else {
                        this.heartshake_y = 5;
                    }
                    global.turntimer = Math.min(global.turntimer, 15);
                }
            }
        }
        break;
      case 7:
        _heart_speed_multiplier = 1;
        _tunnel_speed_multiplier = 1;
        if (global.flag[1914] == 2) {
            _heart_speed_multiplier = 1.1;
            _tunnel_speed_multiplier = 1.2;
        }
        _scale = 3.75 - Math.min(this.tunnel_lifetime * 0.0025, (this.tunnel_lifetime + 30) * 0.002, (this.tunnel_lifetime + 135) * 0.0015, (this.tunnel_lifetime + 390) * 0.001);
        _box_xscale = _scale;
        _box_yscale = _scale;
        if (this.made == 0) {
            if (!T(surface_exists(this.surface_effect))) {
                this.surface_effect = surface_create(300, 300);
            }
            this.pattern_list = S.ds_list_create();
            this.rotate_speed = 12 * _heart_speed_multiplier;
            this.pattern_phase = - 2;
            this.heart_angle = 270;
            if (this.difficulty == 0) {
                this.tutorial_time = 300;
            }
        }
        if (W('obj_growtangle', function (other) {
            if (this.sizer >= 1) {
                this.image_xscale = _box_xscale;
                this.image_yscale = _box_yscale;
            }
        }, this) === EXIT) return;
        if (!T(instance_exists('obj_pink3durgenter')) && this.tunnel_lifetime >= 1) {
            instance_create_depth(this.x + 1, this.y + 1, - 5, 'obj_pink3durgenter');
        }
        _rotation_to_go = 270 - this.heart_angle;
        _rotation_speed = 4 + Math.abs(_rotation_to_go) / 6;
        _heart_move_limit = 35 * _box_xscale;
        _circle_grow_limit = 224;
        _heart_zoomin_speed = 1;
        _circle_interval = 188;
        _tunnel_grow_factor = 32000;
        _tunnel_grow_addition = 0.0375;
        if (this.difficulty <= 0) {
            this.tunnel_speed_base = Math.min(this.tunnel_lifetime / 10, 1.5 + this.tunnel_lifetime / 50, 11) * _tunnel_speed_multiplier;
        } else {
            this.tunnel_speed_base = Math.min(1.5 + this.tunnel_lifetime / 15, 6.5 + this.tunnel_lifetime / 60, 8.75 + this.tunnel_lifetime / 180, 11) * _tunnel_speed_multiplier;
        }
        if (this.tunnel_lifetime % 60 == 1) {
            void("tunnel_lifetime: " + String(this.tunnel_speed_base));
        }
        this.tunnel_speed = this.tunnel_speed_base;
        if (_rotation_to_go != 0) {
            this.tunnel_speed = this.tunnel_speed / (1 + _rotation_speed / 20);
        }
        _heart_distance_to_center = point_distance(this.x_ongrid, this.y_ongrid, 0, 0);
        if (this.difficulty <= 0 && this.life_time < 40) {
            this.tunnel_speed = this.tunnel_speed + 240 / Math.max(1, this.life_time * 0.9) * (40 - this.life_time) / 40;
        } else if (this.difficulty > 0 && this.life_time < 20) {
            this.tunnel_speed = this.tunnel_speed + 240 / Math.max(1, this.life_time * 0.9) * (20 - this.life_time) / 20;
        } else {
            i = 0;
            for (let _r6001 = 0, _n6001 = (8); _r6001 < _n6001; _r6001++) {
                if (_heart_distance_to_center < Math.max(34, 59 - this.tunnel_speed_base * 3) - i * i / 2) {
                    if (i == 0) {
                        this.tunnel_speed = Math.max(this.tunnel_speed, 2);
                    } else {
                        this.tunnel_speed = this.tunnel_speed * 1.3333333333333333;
                    }
                    _heart_zoomin_speed = _heart_zoomin_speed * 0.9375;
                } else {
                    break;
                }
                i = i + 1;
            }
        }
        if (this.tunnel_radius[this.tunnel_lane_layer] > _heart_move_limit + 2) {
            this.tunnel_speed = 0.3333333333333333;
            if (this.tunnel_radius[this.tunnel_lane_layer] > _heart_move_limit + 8) {
                this.tunnel_speed = 0.16666666666666666;
                if (this.tunnel_radius[this.tunnel_lane_layer] > _heart_move_limit + 15) {
                    this.tunnel_speed = 0;
                }
            }
        }
        this._tunnel_radius_old ??= []; this._tunnel_radius_old[7] = 0;
        i = 0;
        if (this.tunnel_speed > 0) {
            for (let _r6143 = 0, _n6143 = (8); _r6143 < _n6143; _r6143++) {
                this._tunnel_radius_old ??= []; this._tunnel_radius_old[i] = this.tunnel_radius[i];
                if (this.tunnel_radius[i] > 0) {
                    this.tunnel_radius ??= []; this.tunnel_radius[i] = this.tunnel_radius[i] * (1 + this.tunnel_radius[i] / (_tunnel_grow_factor / this.tunnel_speed)) + _tunnel_grow_addition * this.tunnel_speed;
                    if (this.tunnel_radius[i] > _circle_grow_limit) {
                        this.tunnel_radius ??= []; this.tunnel_radius[i] = 0;
                        if (this.tunnel_lane_layer == i) {
                            this.tunnel_lane_layer = this.tunnel_lane_layer - 1;
                        }
                    }
                }
                i = i + 1;
            }
        }
        _starting_radius = 12;
        this.tunnel_timer = this.tunnel_timer + this.tunnel_speed;
        if (this.tunnel_timer >= _circle_interval) {
            this.tunnel_timer = this.tunnel_timer - _circle_interval;
            i = 8;
            for (let _r6265 = 0, _n6265 = (7); _r6265 < _n6265; _r6265++) {
                i = i - 1;
                this.tunnel_radius ??= []; this.tunnel_radius[i] = this.tunnel_radius[i - 1];
            }
            this.tunnel_radius ??= []; this.tunnel_radius[0] = _starting_radius;
            if (this.tunnel_radius[i] > 0) {
                this.tunnel_lane_layer = this.tunnel_lane_layer + 1;
                if (this.tunnel_lane_layer >= 8) {
                    this.tunnel_lane_layer = this.tunnel_lane_layer - 1;
                }
            }
            if (W('obj_pinkzap', function (other) {
                this.tunnel_lane_layer = this.tunnel_lane_layer + 1;
                if (this.tunnel_lane_layer >= 8) {
                    instance_destroy(this);
                } else if (other.tunnel_radius[this.tunnel_lane_layer] <= 0) {
                    instance_destroy(this);
                }
            }, this) === EXIT) return;
            if (W('obj_pinktimeoutzap', function (other) {
                this.tunnel_lane_layer = this.tunnel_lane_layer + 1;
                if (this.tunnel_lane_layer >= 8) {
                    instance_destroy(this);
                } else if (other.tunnel_radius[this.tunnel_lane_layer] <= 0) {
                    instance_destroy(this);
                }
            }, this) === EXIT) return;
            if (W('obj_dokiheart', function (other) {
                this.tunnel_lane_layer = this.tunnel_lane_layer + 1;
                if (this.tunnel_lane_layer >= 8) {
                    instance_destroy(this);
                } else if (other.tunnel_radius[this.tunnel_lane_layer] <= 0) {
                    instance_destroy(this);
                }
            }, this) === EXIT) return;
            _dokidir = irandom(3) * 90;
            this.pattern_phase = this.pattern_phase + 1;
            if (this.pattern_phase >= 1) {
                _variant = - 1;
                _dir = - 1;
                if (S.ds_list_size(this.pattern_list) <= 0) {
                    _atk = - 1;
                    for (let _r6503 = 0, _n6503 = (3); _r6503 < _n6503; _r6503++) {
                        switch (_atk) {
                          case 0:
                            _atk = choose(1, 3, 4);
                            switch (_atk) {
                              case 0:
                                _angle = _angle + 90 * choose(1, 2, 3);
                                break;
                              case 1:
                                _angle = _angle + (45 + 90 * choose(1, 2));
                                break;
                              case 4:
                                _angle = 45 * choose(1, 3, 5, 7);
                                break;
                              default:
                                _angle = 45 * irandom(7);
                            }
                            break;
                          case 1:
                            _atk = choose(- 1, 3);
                            switch (_atk) {
                              case 0:
                                _angle = _angle + (45 + 90 * choose(1, 2));
                                break;
                              case 1:
                                _angle = _angle + 90 * choose(1, 3);
                                break;
                              case 4:
                                _angle = 45 * choose(1, 3, 5, 7);
                                break;
                              default:
                                _angle = 45 * irandom(7);
                            }
                            break;
                          case 2:
                            _atk = choose(- 1, 0);
                            switch (_atk) {
                              case 0:
                                _angle = _angle + 90 * choose(0, 1, 3);
                                break;
                              default:
                                _angle = 45 * irandom(7);
                            }
                            break;
                          case 4:
                            _atk = choose(- 1, 0, 3, 4);
                            switch (_atk) {
                              case 0:
                                _angle = 90 * irandom(3);
                                break;
                              case 1:
                                _angle = 45 * choose(1, 3, 5, 7);
                                break;
                              case 4:
                                _angle = _angle + 90;
                                break;
                              default:
                                _angle = 45 * irandom(7);
                            }
                            break;
                          case 3:
                            if (S.ds_list_size(this.pattern_list) >= 4) {
                                if (S.ds_list_find_value(this.pattern_list, S.ds_list_size(this.pattern_list) - 4) == 3) {
                                    _atk = - 1;
                                    _angle = 45 * irandom(7);
                                }
                            }
                            if (_atk == 3) {
                                _atk = choose(- 1, 0, 1, 2, 3, 4);
                            }
                            switch (_atk) {
                              case 0:
                              case 2:
                                _angle = 90 * irandom(3);
                                break;
                              case 1:
                              case 4:
                                _angle = 45 * choose(1, 3, 5, 7);
                                break;
                              default:
                                _angle = 45 * irandom(7);
                            }
                            break;
                          default:
                            _atk = choose(0, 1, 2, 3, 4);
                            switch (_atk) {
                              case 0:
                              case 2:
                                _angle = 90 * irandom(3);
                                break;
                              case 1:
                              case 4:
                                _angle = 45 * choose(1, 3, 5, 7);
                                break;
                              default:
                                _angle = 45 * irandom(7);
                            }
                        }
                        _angle = S.scr_wrap(_angle, 0, 360);
                        if (_atk >= 0) {
                            S.ds_list_add(this.pattern_list, _atk);
                            S.ds_list_add(this.pattern_list, _angle);
                            continue;
                        }
                        break;
                    }
                }
                this.pattern_phase = this.pattern_phase - 1;
                _variant = S.ds_list_find_value(this.pattern_list, 0);
                _dir = S.ds_list_find_value(this.pattern_list, 1);
                S.ds_list_delete(this.pattern_list, 0);
                S.ds_list_delete(this.pattern_list, 0);
                if (S.ds_list_size(this.pattern_list) <= 0) {
                    this.pattern_phase = this.pattern_phase - 1;
                }
                _dir_add = choose(- 1, 1) * 10;
                _multiple = 1;
                switch (_variant) {
                  case 0:
                    if (_dir < 0) {
                        _dir = 90 * irandom(3);
                    }
                    _repeats = 6;
                    _moving = 0;
                    break;
                  case 1:
                    if (_dir < 0) {
                        _dir = 45 * choose(1, 3, 5, 7);
                    }
                    _repeats = 15;
                    _moving = 0;
                    break;
                  case 2:
                    if (_dir < 0) {
                        _dir = 90 * irandom(3);
                    }
                    _repeats = 29;
                    _moving = 0;
                    break;
                  case 3:
                    if (_dir < 0) {
                        _dir = 45 * irandom(7);
                    }
                    _repeats = 6 + irandom(2);
                    _moving = choose(- 1, 1) * choose(2.5, 5);
                    if (S.ds_list_size(this.pattern_list) >= 2) {
                        if (S.ds_list_find_value(this.pattern_list, 0) == 4 || S.ds_list_find_value(this.pattern_list, 0) == 2 || S.ds_list_find_value(this.pattern_list, 0) == 1) {
                            _repeats = 6;
                        }
                    }
                    break;
                  default:
                    if (_dir < 0) {
                        _dir = 45 * choose(1, 3, 5, 7);
                    }
                    _repeats = 6;
                    _moving = 0;
                    _multiple = 2;
                    break;
                }
                _dokidir = - 1;
                _dir = S.scr_wrap(_dir - _dir_add / 2 * (_repeats - 1) + this.pattern_direction, 0, 360);
                _multiple_angle = 360 / _multiple;
                i = 0;
                for (let _r7424 = 0, _n7424 = (_repeats * _multiple); _r7424 < _n7424; _r7424++) {
                    _zap = instance_create_depth(scr_get_box(4) + 1, scr_get_box(5) + 1, - 5, 'obj_pinkzap');
                    if (W(_zap, function (other) {
                        this.direction = _dir;
                        this.wave_dir = this.direction * 8;
                        this.pattern_speed = _moving;
                        if (_moving != 0) {
                            if (global.flag[1914] == 2) {
                                this.pattern_speed = this.pattern_speed + sign(_moving) * 2.5;
                            }
                        }
                        if (i % _repeats == 0 || i % _repeats == _repeats - 1) {
                            this.mode = 0;
                            this.mask_index = 'mask_empty';
                        }
                        if (_moving != 0) {
                            this.sprite_index = 'spr_pinkzap_arrow';
                        }
                    }, this) === EXIT) return;
                    _dir = S.scr_wrap(_dir + _dir_add, 0, 360);
                    i = i + 1;
                    if (_multiple > 1) {
                        if (i % _repeats == 0) {
                            _dir = S.scr_wrap(_dir + _multiple_angle - _dir_add * _repeats, 0, 360);
                        }
                    }
                }
            }
            if (this.tunnel_radius[5] > 0 && _dokidir >= 0) {
                _doki = instance_create_depth(scr_get_box(4) + 1, scr_get_box(5) + 1, - 5, 'obj_dokiheart');
                if (W(_doki, function (other) {
                    this.tension_value = 3;
                    this.maxlifetime = 600;
                    this.direction = S.scr_wrap(_dokidir + other.tunnel_lane_direction, 0, 360);
                }, this) === EXIT) return;
            }
            if (this.tunnel_timer > 0) {
                _offsetfix = this.tunnel_timer;
                this.tunnel_radius ??= []; this.tunnel_radius[0] = this.tunnel_radius[0] * (1 + this.tunnel_radius[0] / _tunnel_grow_factor * _offsetfix) + _tunnel_grow_addition * _offsetfix;
            }
        }
        if (this.buffer_u >= 1) {
            if (this.heart_travel == 0 && this.rotate_travel == 0) {
                this.input_activated_u = this.input_activated_u + 1;
                this.heart_travel = - 1;
                this.tutorial_time = 0;
            }
        }
        if (this.buffer_d >= 1) {
            if (this.heart_travel == 0 && this.rotate_travel == 0) {
                this.input_activated_d = this.input_activated_d + 1;
                this.heart_travel = 1;
            }
        }
        if (this.buffer_l >= 1) {
            if (this.heart_travel == 0 && this.rotate_travel == 0) {
                this.input_activated_l = this.input_activated_l + 1;
                this.rotate_travel = this.rotate_travel - 90;
            }
        }
        if (this.buffer_r >= 1) {
            if (this.heart_travel == 0 && this.rotate_travel == 0) {
                this.input_activated_r = this.input_activated_r + 1;
                this.rotate_travel = this.rotate_travel + 90;
            }
        }
        if (this.heart_travel >= 1) {
            if (this.tunnel_lane_layer >= 7) {
                this.heart_travel = 0;
            } else if (this.tunnel_radius[this.tunnel_lane_layer + 1] <= 0) {
                this.heart_travel = 0;
            } else if (this.tunnel_radius[this.tunnel_lane_layer + 1] > _heart_move_limit) {
                this.heart_travel = 0;
            }
        }
        if (this.heart_travel <= - 1) {
            if (this.tunnel_lane_layer > 0) {
                this.tunnel_lane_layer = this.tunnel_lane_layer - 1;
            } else {
                this.heart_travel = 0;
            }
        }
        if (this.heart_travel >= 1) {
            if (this.tunnel_lane_layer < 7) {
                if (this.tunnel_radius[this.tunnel_lane_layer] > 0 && this.tunnel_radius[this.tunnel_lane_layer] <= _heart_move_limit) {
                    this.tunnel_lane_layer = this.tunnel_lane_layer + 1;
                } else {
                    this.heart_travel = 0;
                }
            } else {
                this.heart_travel = 0;
            }
        }
        this.heart_travel = clamp(this.heart_travel, - 1, 1);
        if (this.heart_travel != 0) {
            if (this.heart_travel == 1 || this.heart_travel == - 1) {
                snd_play('snd_wing');
                if (W('obj_heart', function (other) {
                    _dust = instance_create_depth(this.x + this.image_xscale * 9, this.y + this.image_yscale * 9, 0, 'obj_pinkdust');
                    _dust.image_xscale = this.image_xscale;
                    _dust.image_yscale = this.image_yscale;
                    _dust.image_angle = 180 + other.heart_travel * 90;
                }, this) === EXIT) return;
            }
            if (this.tunnel_radius[this.tunnel_lane_layer] <= 0) {
                this.tunnel_lane_layer = Math.max(0, this.tunnel_lane_layer - 1);
            }
            _ht_old = this.heart_travel;
            if (this.heart_travel < 0) {
                this.heart_travel = scr_approach(this.heart_travel, 0, 0.2 * _heart_zoomin_speed * _heart_speed_multiplier);
            } else {
                this.heart_travel = scr_approach(this.heart_travel, 0, 0.2 * _heart_speed_multiplier);
            }
            if (W('obj_heart', function (other) {
                _true_radius = other.tunnel_radius[other.tunnel_lane_layer];
                if (other.heart_travel < 0) {
                    _true_radius = other.tunnel_radius[other.tunnel_lane_layer] * (1 + other.heart_travel) + other.tunnel_radius[other.tunnel_lane_layer + 1] * - other.heart_travel;
                }
                if (other.heart_travel > 0) {
                    _true_radius = other.tunnel_radius[other.tunnel_lane_layer - 1] * other.heart_travel + other.tunnel_radius[other.tunnel_lane_layer] * (1 - other.heart_travel);
                }
                this.image_xscale = _true_radius / 48;
                this.image_yscale = this.image_xscale;
            }, this) === EXIT) return;
            if (this.life_time % 2 == 1) {
                if (W('obj_heart', function (other) {
                    _trail = instance_create_depth(this.x, this.y, 0, 'obj_pinktrail');
                    _trail.direction = other.heart_angle;
                    _trail.speed = 1;
                    _trail.image_xscale = this.image_xscale;
                    _trail.image_yscale = this.image_yscale;
                }, this) === EXIT) return;
            }
            if (this.heart_travel == 0) {
                switch (this.heart_angle) {
                  case 0:
                  case 360:
                    this.heartshake_x = - 3;
                    break;
                  case 90:
                    this.heartshake_y = 3;
                    break;
                  case 180:
                    this.heartshake_x = 3;
                    break;
                  case 270:
                    this.heartshake_y = - 3;
                    break;
                }
                if (_ht_old < 0) {
                    this.heartshake_x = - this.heartshake_x;
                    this.heartshake_y = - this.heartshake_y;
                }
            }
        } else {
            if (W('obj_heart', function (other) {
                _true_radius = other.tunnel_radius[other.tunnel_lane_layer];
                this.image_xscale = _true_radius / 48;
                this.image_yscale = this.image_xscale;
            }, this) === EXIT) return;
        }
        if (this.rotate_travel != 0) {
            if (this.rotate_travel == 90 || this.rotate_travel == - 90) {
                snd_play('snd_wing');
                if (W('obj_heart', function (other) {
                    _dust = instance_create_depth(this.x + this.image_xscale * 9, this.y + this.image_yscale * 9, 0, 'obj_pinkdust');
                    _dust.image_xscale = this.image_xscale;
                    _dust.image_yscale = this.image_yscale;
                    _dust.image_angle = 90 - other.rotate_travel;
                    _dust.image_speed = _dust.image_speed / 2;
                }, this) === EXIT) return;
            }
            _rt_old = this.rotate_travel;
            this.heart_angle = scr_approach(this.heart_angle, this.heart_angle + this.rotate_travel, this.rotate_speed);
            this.rotate_travel = scr_approach(this.rotate_travel, 0, this.rotate_speed);
            if (W('obj_heart', function (other) {
                _trail = instance_create_depth(this.x, this.y, 0, 'obj_pinktrail');
                _trail.direction = other.heart_angle - sign(_rt_old) * 90;
                _trail.speed = 1;
                _trail.image_xscale = this.image_xscale;
                _trail.image_yscale = this.image_yscale;
            }, this) === EXIT) return;
            if (this.rotate_travel == 0) {
                switch (this.heart_angle) {
                  case 0:
                  case 360:
                    this.heartshake_y = - 3;
                    break;
                  case 90:
                    this.heartshake_x = - 3;
                    break;
                  case 180:
                    this.heartshake_y = 3;
                    break;
                  case 270:
                    this.heartshake_x = 3;
                    break;
                }
                if (_rt_old < 0) {
                    this.heartshake_x = - this.heartshake_x;
                    this.heartshake_y = - this.heartshake_y;
                }
            }
        }
        _rotation_to_go = 270 - this.heart_angle;
        _rotation_speed = 4 + Math.abs(_rotation_to_go) / 6;
        _rotated_amount = clamp(_rotation_to_go, - _rotation_speed, _rotation_speed);
        this.heart_angle = this.heart_angle + _rotated_amount;
        if (this.heart_angle >= 360) {
            this.heart_angle = this.heart_angle - 360;
        }
        if (this.heart_angle < 0) {
            this.heart_angle = this.heart_angle + 360;
        }
        this.tunnel_lane_direction = this.tunnel_lane_direction + _rotated_amount;
        if (this.tunnel_lane_direction >= 360) {
            this.tunnel_lane_direction = this.tunnel_lane_direction - 360;
        }
        if (this.tunnel_lane_direction < 0) {
            this.tunnel_lane_direction = this.tunnel_lane_direction + 360;
        }
        this.pattern_direction = this.pattern_direction + _rotated_amount;
        if (this.pattern_direction >= 360) {
            this.pattern_direction = this.pattern_direction - 360;
        }
        if (this.pattern_direction < 0) {
            this.pattern_direction = this.pattern_direction + 360;
        }
        if (this.heart_travel != 0 && this.tunnel_lane_layer - sign(this.heart_travel) >= 0 && this.tunnel_lane_layer - sign(this.heart_travel) < 8) {
            _hx = lengthdir_x(this.tunnel_radius[this.tunnel_lane_layer] * (1 - Math.abs(this.heart_travel)) + this.tunnel_radius[this.tunnel_lane_layer - sign(this.heart_travel)] * Math.abs(this.heart_travel), this.heart_angle);
            _hy = lengthdir_y(this.tunnel_radius[this.tunnel_lane_layer] * (1 - Math.abs(this.heart_travel)) + this.tunnel_radius[this.tunnel_lane_layer - sign(this.heart_travel)] * Math.abs(this.heart_travel), this.heart_angle);
        } else {
            _hx = lengthdir_x(this.tunnel_radius[this.tunnel_lane_layer], this.heart_angle);
            _hy = lengthdir_y(this.tunnel_radius[this.tunnel_lane_layer], this.heart_angle);
        }
        this.x_ongrid = _hx;
        this.y_ongrid = _hy;
        if (W('obj_growtangle', function (other) {
            other.x_ongrid = clamp(other.x_ongrid, this.bbox_left - this.x, this.bbox_right - this.x);
            other.y_ongrid = clamp(other.y_ongrid, this.bbox_top - this.y, this.bbox_bottom - this.y);
        }, this) === EXIT) return;
        if (W('obj_pinkzap', function (other) {
            if (this.tunnel_lane_layer < 7) {
                if (this.tunnel_lane_layer == other.tunnel_lane_layer && this.mode == 1) {
                    this.active = 1;
                    this.mask_index = - 1;
                } else {
                    this.active = 0;
                    this.mask_index = 'mask_empty';
                }
                if (this.tunnel_lane_layer == other.tunnel_lane_layer) {
                    this.highlight = 2;
                } else if (this.tunnel_lane_layer == other.tunnel_lane_layer - 1) {
                    this.highlight = 1;
                } else {
                    this.highlight = 0;
                }
                this.image_xscale = other.tunnel_radius[this.tunnel_lane_layer] / 64;
                this.image_yscale = this.image_xscale;
                _dir = this.direction;
                _dir = _dir + (this.pattern_speed + _rotated_amount);
                if (_dir < 0) {
                    _dir = _dir + 360;
                }
                if (_dir >= 360) {
                    _dir = _dir - 360;
                }
                this.direction = _dir;
                this.x = other.x + 1 + lengthdir_x(other.tunnel_radius[this.tunnel_lane_layer] - this.image_xscale / 2, this.direction - sign(this.pattern_speed) * 90);
                this.y = other.y + 1 + lengthdir_y(other.tunnel_radius[this.tunnel_lane_layer] - this.image_yscale / 2, this.direction - sign(this.pattern_speed) * 90);
                if (this.pattern_speed == 0) {
                    this.image_angle = this.direction + 90;
                } else {
                    this.image_angle = this.direction;
                }
                if (other.tunnel_radius[this.tunnel_lane_layer] > _heart_move_limit + 16) {
                    this.life_time = Math.max(99999, this.life_time);
                }
            } else {
                instance_destroy(this);
            }
        }, this) === EXIT) return;
        if (W('obj_pinktimeoutzap', function (other) {
            if (this.tunnel_lane_layer < 7) {
                this.image_xscale = other.tunnel_radius[this.tunnel_lane_layer] / 64;
                this.image_yscale = this.image_xscale;
                this.radius = other.tunnel_radius[this.tunnel_lane_layer] - this.image_xscale / 2;
                if (other.tunnel_radius[this.tunnel_lane_layer] > _heart_move_limit + 16) {
                    this.life_time = Math.max(99999, this.life_time);
                }
            } else {
                instance_destroy(this);
            }
        }, this) === EXIT) return;
        if (W('obj_dokiheart', function (other) {
            if (this.tunnel_lane_layer < 7) {
                this.image_xscale = other.tunnel_radius[this.tunnel_lane_layer] / 48;
                this.image_yscale = this.image_xscale;
                this.direction = S.scr_wrap(this.direction + _rotated_amount, 0, 360);
                this.x = other.x + 1 + lengthdir_x(other.tunnel_radius[this.tunnel_lane_layer] - this.image_xscale / 2, this.direction);
                this.y = other.y + 1 + lengthdir_y(other.tunnel_radius[this.tunnel_lane_layer] - this.image_yscale / 2, this.direction);
                this.xdraw = this.x;
                this.ydraw = this.y;
                this.visual_scale = 2;
                this.image_xscale = this.image_xscale / this.visual_scale;
                this.image_yscale = this.image_yscale / this.visual_scale;
                if (other.tunnel_radius[this.tunnel_lane_layer] > _heart_move_limit + 16) {
                    this.lifetime = Math.max(99999, this.lifetime);
                }
            } else {
                instance_destroy(this);
            }
        }, this) === EXIT) return;
        if (W('obj_pink3durgenter', function (other) {
            if (instance_exists('obj_growtangle')) {
                this.radius = 37 * O('obj_growtangle').image_xscale;
                if (instance_exists('obj_heart')) {
                    _damagedir = point_direction(scr_get_box(4), scr_get_box(5), O('obj_heart').x + 9, O('obj_heart').y + 9);
                    this.x = scr_get_box(4) + lengthdir_x(this.radius, _damagedir);
                    this.y = scr_get_box(5) + lengthdir_y(this.radius, _damagedir);
                }
            }
            this.image_xscale = this.radius / 64;
            this.image_yscale = this.image_xscale;
        }, this) === EXIT) return;
        if (W('obj_pinkdust', function (other) {
            _dir = point_direction(other.x, other.y, this.x, this.y);
            _dist = point_distance(other.x, other.y, this.x, this.y);
            _origdist = _dist;
            _dir = S.scr_wrap(_dir + _rotated_amount, 0, 360);
            _dist = _dist * (1 + _dist / (_tunnel_grow_factor / other.tunnel_speed)) + _tunnel_grow_addition * other.tunnel_speed;
            _scaling = Math.max(1, _dist / _origdist);
            this.speed = this.speed * _scaling;
            this.image_xscale = this.image_xscale * _scaling;
            this.image_yscale = this.image_yscale * _scaling;
            this.image_angle = this.image_angle + _rotated_amount;
            this.x = other.x + lengthdir_x(_dist, _dir);
            this.y = other.y + lengthdir_y(_dist, _dir);
        }, this) === EXIT) return;
        if (W('obj_pinktrail', function (other) {
            _spr_offset = 9;
            _dir = point_direction(other.x, other.y, this.x + _spr_offset * this.image_xscale, this.y + _spr_offset * this.image_yscale);
            _dist = point_distance(other.x, other.y, this.x + _spr_offset * this.image_xscale, this.y + _spr_offset * this.image_yscale);
            _origdist = _dist;
            _dir = S.scr_wrap(_dir + _rotated_amount, 0, 360);
            _dist = _dist * (1 + _dist / (_tunnel_grow_factor / other.tunnel_speed)) + _tunnel_grow_addition * other.tunnel_speed;
            _scaling = Math.max(1, _dist / _origdist);
            this.speed = this.speed * _scaling;
            this.image_xscale = this.image_xscale * _scaling;
            this.image_yscale = this.image_yscale * _scaling;
            this.x = other.x - _spr_offset * this.image_xscale + lengthdir_x(_dist, _dir);
            this.y = other.y - _spr_offset * this.image_yscale + lengthdir_y(_dist, _dir);
        }, this) === EXIT) return;
        i = 0;
        for (let _r9862 = 0, _n9862 = (6); _r9862 < _n9862; _r9862++) {
            if (_rotated_amount != 0) {
                _dir = point_direction(0, 0, this.array_stars_x[i], this.array_stars_y[i]);
                _dist = point_distance(0, 0, this.array_stars_x[i], this.array_stars_y[i]);
                this.array_stars_x ??= []; this.array_stars_x[i] = lengthdir_x(_dist, _dir + _rotated_amount);
                this.array_stars_y ??= []; this.array_stars_y[i] = lengthdir_y(_dist, _dir + _rotated_amount);
            }
            this.array_stars_x ??= []; this.array_stars_x[i] = this.array_stars_x[i] * (1.1 + (this.tunnel_speed_base - 1.5) / 24);
            this.array_stars_y ??= []; this.array_stars_y[i] = this.array_stars_y[i] * (1.1 + (this.tunnel_speed_base - 1.5) / 24);
            i = i + 1;
        }
        if (this.array_stars_x[5] == 0 && this.tunnel_lifetime % 5 == 0 || point_distance(0, 0, this.array_stars_x[5], this.array_stars_y[5]) > 200) {
            i = 0;
            for (let _r10031 = 0, _n10031 = (5); _r10031 < _n10031; _r10031++) {
                this.array_stars_x ??= []; this.array_stars_x[i + 1] = this.array_stars_x[i];
                this.array_stars_y ??= []; this.array_stars_y[i + 1] = this.array_stars_y[i];
                i = i + 1;
            }
            _randir = random(360);
            _randist = (128 + random(64)) * Math.max(0.2, 1.15 - this.tunnel_speed_base / 10);
            this.array_stars_x ??= []; this.array_stars_x[0] = lengthdir_x(_randist, _randir);
            this.array_stars_y ??= []; this.array_stars_y[0] = lengthdir_y(_randist, _randir);
        }
        this.bg_pulse = this.bg_pulse + 1;
        if (this.heart_travel == 0) {
            if (this.rotate_travel == 0) {
                if (this.bg_pulse >= 25) {
                    instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_fx_purpleripple');
                    this.bg_pulse = 0;
                }
            }
        }
        if (this.tutorial_time > 0) {
            this.tutorial_time = this.tutorial_time - 1;
            global.turntimer = global.turntimer + 1;
        } else {
            this.tunnel_lifetime = this.tunnel_lifetime + 1;
        }
        break;
      case 8:
        _laneswap_speed = 22;
        if (this.made == 0) {
            this.life_time = 0;
            this.pattern_phase = 0;
            this.pattern_time = 0;
            _li_nodes = S.ds_list_create();
            _node_dist = 54;
            _h_multi = 2.125;
            switch (this.difficulty) {
              case 0:
                this.node_id = instance_create_depth(camerax() + 320, cameray() + 360, 0, 'obj_pinknode');
                S.ds_list_add(_li_nodes, this.node_id);
                if (W(S.ds_list_find_value(_li_nodes, 0), function (other) {
                    this.checkpoint = 2;
                    S.ds_list_add(_li_nodes, this.fnc_make_node(0, _node_dist * _h_multi));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(2, _node_dist * _h_multi));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 1), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 3), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 4), function (other) {
                    this._acts ??= []; this._acts[0] = instance_create_depth(this.x, this.y, 2, 'obj_pinknodeact');
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 5), function (other) {
                    this._acts ??= []; this._acts[1] = instance_create_depth(this.x, this.y, 2, 'obj_pinknodeact');
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 7), function (other) {
                    this._acts ??= []; this._acts[2] = instance_create_depth(this.x, this.y, 2, 'obj_pinknodeact');
                }, this) === EXIT) return;
                _randnode = choose(2, 6, 8);
                if (W(S.ds_list_find_value(_li_nodes, _randnode), function (other) {
                    this.doki_delay = 45;
                    this.act_to_change = this._acts[irandom(2)];
                    switch (_randnode) {
                      case 2:
                        this.doki_backup_node = S.ds_list_find_value(_li_nodes, choose(6, 8));
                        break;
                      case 6:
                        this.doki_backup_node = S.ds_list_find_value(_li_nodes, choose(2, 8));
                        break;
                      case 8:
                        this.doki_backup_node = S.ds_list_find_value(_li_nodes, choose(2, 6));
                        break;
                    }
                }, this) === EXIT) return;
                break;
              case 1:
                this.node_id = instance_create_depth(camerax() + 320, cameray() + 360, 0, 'obj_pinknode');
                S.ds_list_add(_li_nodes, this.node_id);
                if (W(S.ds_list_find_value(_li_nodes, 0), function (other) {
                    this.checkpoint = 2;
                    S.ds_list_add(_li_nodes, this.fnc_make_node(0, _node_dist * _h_multi));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(2, _node_dist * _h_multi));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist));
                    this.hp = 2;
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 1), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 3), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 2), function (other) {
                    this.child ??= []; this.child[2] = S.ds_list_find_value(_li_nodes, 7);
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 4), function (other) {
                    this.child ??= []; this.child[0] = S.ds_list_find_value(_li_nodes, 6);
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 1), function (other) {
                    this._acts ??= []; this._acts[0] = instance_create_depth(this.x, this.y, 2, 'obj_pinknodeact');
                    if (W(this._acts[0], function (other) {
                        this.pattern = 1;
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 3), function (other) {
                    this._acts ??= []; this._acts[1] = instance_create_depth(this.x, this.y, 2, 'obj_pinknodeact');
                    if (W(this._acts[1], function (other) {
                        this.pattern = 1;
                        this.pattern_dir = 180;
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 5), function (other) {
                    this.doki_delay = 30;
                    this.act_to_change = S.ds_list_find_value(_li_nodes, 0);
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 8), function (other) {
                    this.doki_delay = 30;
                    this.act_to_change = S.ds_list_find_value(_li_nodes, 0);
                }, this) === EXIT) return;
                break;
              case 2:
                this.node_id = instance_create_depth(camerax() + 320, cameray() + 360, 0, 'obj_pinknode');
                S.ds_list_add(_li_nodes, this.node_id);
                if (W(S.ds_list_find_value(_li_nodes, 0), function (other) {
                    this.checkpoint = 2;
                    S.ds_list_add(_li_nodes, this.fnc_make_node(0, _node_dist * _h_multi));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(2, _node_dist * _h_multi));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist));
                    this.hp = 4;
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 1), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(0, _node_dist * _h_multi));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 5), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 3), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(2, _node_dist * _h_multi));
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 10), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 1), function (other) {
                    this._acts ??= []; this._acts[0] = instance_create_depth(this.x, this.y, 2, 'obj_pinknodeact');
                    if (W(this._acts[0], function (other) {
                        this.pattern = 1;
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 3), function (other) {
                    this._acts ??= []; this._acts[1] = instance_create_depth(this.x, this.y, 2, 'obj_pinknodeact');
                    if (W(this._acts[1], function (other) {
                        this.pattern = 1;
                        this.pattern_dir = 180;
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 5), function (other) {
                    this._acts ??= []; this._acts[2] = instance_create_depth(this.x, this.y, 2, 'obj_pinknodeact');
                    if (W(this._acts[2], function (other) {
                        this.pattern = 2;
                        this.pattern_dir = 210;
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 7), function (other) {
                    this.doki_delay = 60;
                    this.act_to_change = S.ds_list_find_value(_li_nodes, 0);
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 8), function (other) {
                    this.doki_delay = 30;
                    this.act_to_change = S.ds_list_find_value(_li_nodes, 0);
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 9), function (other) {
                    this.doki_delay = 60;
                    this.act_to_change = S.ds_list_find_value(_li_nodes, 0);
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 12), function (other) {
                    this.doki_delay = 30;
                    this.act_to_change = S.ds_list_find_value(_li_nodes, 0);
                }, this) === EXIT) return;
                break;
              case 3:
                this.node_id = instance_create_depth(camerax() + 320, cameray() + 360, 0, 'obj_pinknode');
                S.ds_list_add(_li_nodes, this.node_id);
                if (W(S.ds_list_find_value(_li_nodes, 0), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(0, _node_dist));
                    this.checkpoint = 2;
                }, this) === EXIT) return;
                this.node_start = S.ds_list_find_value(_li_nodes, 0);
                if (W(S.ds_list_find_value(_li_nodes, 1), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 2), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(0, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 3), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 4), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(0, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 5), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 6), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(0, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 7), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 8), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(0, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 9), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 10), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(2, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 11), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist * 1.5));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 12), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(0, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 13), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 14), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(2, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 15), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist * 2.5));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 16), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(2, _node_dist * 1.75));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 17), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 18), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(2, _node_dist * 1.25));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 19), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 20), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(2, _node_dist * 2));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 21), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 22), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(2, _node_dist * 1.25));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 23), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 24), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(2, _node_dist * 2.75));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 25), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist * 1));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 26), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(0, _node_dist * 1));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 27), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist * 1));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 28), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(2, _node_dist));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 29), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist * 1));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 30), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(0, _node_dist * 2));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 31), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist * 2));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 32), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(2, _node_dist * 1.25));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 33), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist * 1));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 34), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(2, _node_dist * 1));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 35), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist * 3));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 36), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(0, _node_dist * 1));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 37), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist * 1));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 38), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(0, _node_dist * 2.375));
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 39), function (other) {
                    this._acts ??= []; this._acts[0] = instance_create_depth(this.x, this.y, 2, 'obj_pinknodeact');
                    if (W(this._acts[0], function (other) {
                        this.mother = other.id;
                        this.mode = 1;
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
                _li_size = S.ds_list_size(_li_nodes);
                if (W(S.ds_list_find_value(_li_nodes, 5), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(1, _node_dist * 1.25));
                    this.draw_connection ??= []; this.draw_connection[1] = false;
                    if (W(S.ds_list_find_value(_li_nodes, _li_size), function (other) {
                        this.child ??= []; this.child[3] = other.id;
                        this.draw_connection ??= []; this.draw_connection[3] = true;
                        this.checkpoint = 1;
                        this.darkify = 1;
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 12), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(2, _node_dist * 1.25));
                    this.draw_connection ??= []; this.draw_connection[2] = false;
                    if (W(S.ds_list_find_value(_li_nodes, _li_size + 1), function (other) {
                        this.child ??= []; this.child[0] = other.id;
                        this.draw_connection ??= []; this.draw_connection[0] = true;
                        this.checkpoint = 1;
                        this.darkify = 1;
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
                if (W(S.ds_list_find_value(_li_nodes, 23), function (other) {
                    S.ds_list_add(_li_nodes, this.fnc_make_node(3, _node_dist));
                    this.draw_connection ??= []; this.draw_connection[3] = false;
                    if (W(S.ds_list_find_value(_li_nodes, _li_size + 2), function (other) {
                        this.child ??= []; this.child[1] = other.id;
                        this.draw_connection ??= []; this.draw_connection[1] = true;
                        this.checkpoint = 1;
                        this.darkify = 1;
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
                if (W('obj_pinknode', function (other) {
                    this.direction = random(360);
                    this.speed = 0.25;
                }, this) === EXIT) return;
                break;
            }
            S.ds_list_destroy(_li_nodes);
            if (W('obj_pinknode', function (other) {
                this.user0?.();
            }, this) === EXIT) return;
        }
        switch (this.difficulty) {
          case 3:
            _frequency = 36 + clamp(this.hits - 1, 0, 4) * 2;
            switch (this.pattern_phase) {
              case 0:
                if (this.pattern_time < 2) {
                    this.pattern_time = this.pattern_time + 1;
                } else if (this.x + this.x_ongrid > camerax() + 320 + 96) {
                    this.pattern_phase = this.pattern_phase + 1;
                }
                this.pattern_time = _frequency;
                break;
              case 1:
                this.pattern_time = this.pattern_time + 1;
                if (this.pattern_time >= _frequency) {
                    void("_frequency: " + String(_frequency));
                    if (W(instance_create_depth(camerax() + 320, cameray() + 140, 2, 'obj_pinknodeact'), function (other) {
                        this.pattern = 3;
                        this.node_id = other.node_start;
                        this.heart_travel = point_distance(this.x, this.y, this.node_id.dest_x, this.node_id.dest_y);
                    }, this) === EXIT) return;
                    this.pattern_time = 0;
                }
                if (this.life_time % 12 == 0) {
                    if (W(this.node_start, function (other) {
                        this.pulse = irandom(8);
                    }, this) === EXIT) return;
                }
                break;
            }
            break;
        }
        if (instance_exists(this.node_id)) {
            if (T(this.can_move) && this.heart_travel <= 0) {
                _moved = false;
                _old_node = this.node_id;
                if (this.buffer_l >= 1 && instance_exists(this.node_id.child[2])) {
                    this.input_activated_l = this.input_activated_l + 1;
                    this.direction = 180;
                    snd_play('snd_wing');
                    _moved = true;
                    this.node_id = this.node_id.child[2];
                    _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                    _dust.image_angle = 180;
                } else if (this.buffer_r >= 1 && instance_exists(this.node_id.child[0])) {
                    this.input_activated_r = this.input_activated_r + 1;
                    this.direction = 0;
                    snd_play('snd_wing');
                    _moved = true;
                    this.node_id = this.node_id.child[0];
                    _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                    _dust.image_angle = 0;
                } else if (this.buffer_u >= 1 && instance_exists(this.node_id.child[1])) {
                    this.input_activated_u = this.input_activated_u + 1;
                    this.direction = 90;
                    snd_play('snd_wing');
                    _moved = true;
                    this.node_id = this.node_id.child[1];
                    _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                    _dust.image_angle = 90;
                } else if (this.buffer_d >= 1 && instance_exists(this.node_id.child[3])) {
                    this.input_activated_d = this.input_activated_d + 1;
                    this.direction = 270;
                    snd_play('snd_wing');
                    _moved = true;
                    this.node_id = this.node_id.child[3];
                    _dust = instance_create_depth(this.x + this.x_ongrid, this.y + this.y_ongrid, 0, 'obj_pinkdust');
                    _dust.image_angle = 270;
                }
                if (T(_moved)) {
                    this.heart_travel = point_distance(_old_node.dest_x, _old_node.dest_y, this.node_id.dest_x, this.node_id.dest_y);
                }
            }
            _move_dir = point_direction(this.x + this.x_ongrid, this.y + this.y_ongrid, this.node_id.x, this.node_id.y);
            if (this.heart_travel > 0) {
                _move_amount = Math.min(_laneswap_speed, Math.max(1, point_distance(this.x + this.x_ongrid, this.y + this.y_ongrid, this.node_id.x, this.node_id.y)));
                if (W('obj_heart', function (other) {
                    _trail = instance_create_depth(this.x, this.y, 0, 'obj_pinktrail');
                    _trail.direction = _move_dir;
                    _trail.speed = 1;
                }, this) === EXIT) return;
                this.heart_travel = this.heart_travel - _move_amount;
                if (this.heart_travel <= 0) {
                    this.heart_travel = 0;
                    if (this.direction < 45 || this.direction >= 315) {
                        this.heartshake_x = 5;
                    }
                    if (this.direction >= 45 && this.direction < 135) {
                        this.heartshake_y = - 5;
                    }
                    if (this.direction >= 135 && this.direction < 225) {
                        this.heartshake_x = - 5;
                    }
                    if (this.direction >= 225 && this.direction < 315) {
                        this.heartshake_y = 5;
                    }
                    if (W(this.node_id, function (other) {
                        if (this.checkpoint == 1) {
                            if (W('obj_pinknode', function (other) {
                                if (this.checkpoint > 1) {
                                    this.checkpoint = 1;
                                }
                            }, this) === EXIT) return EXIT;
                            this.checkpoint = 2;
                        }
                    }, this) === EXIT) return;
                }
            }
            this.x_ongrid = this.node_id.x - lengthdir_x(this.heart_travel, _move_dir) - this.x;
            this.y_ongrid = this.node_id.y - lengthdir_y(this.heart_travel, _move_dir) - this.y;
        }
        break;
    }
    this.x_shake = - scr_approach(this.x_shake, 0, 0.5);
    if (W('obj_growtangle', function (other) {
        other.x = this.x;
        other.y = this.y;
    }, this) === EXIT) return;
    if (W('obj_heart', function (other) {
        this.x = other.x + other.x_ongrid - 9 * this.image_xscale;
        this.y = other.y + other.y_ongrid - 9 * this.image_yscale;
    }, this) === EXIT) return;
    _input_activated = false;
    if (T(this.input_activated_l)) {
        this.buffer_l = 0;
        _input_activated = true;
    }
    if (T(this.input_activated_r)) {
        this.buffer_r = 0;
        _input_activated = true;
    }
    if (T(this.input_activated_u)) {
        this.buffer_u = 0;
        _input_activated = true;
    }
    if (T(this.input_activated_d)) {
        this.buffer_d = 0;
        _input_activated = true;
    }
    if (T(_input_activated)) {
        this.press_l = 1;
        this.press_r = 1;
        this.press_u = 1;
        this.press_d = 1;
    }
    this.made = 1;
    this.life_time = this.life_time + 1;
    if (this.life_time >= 30) {
        if (!T(instance_exists('obj_heart'))) {
            if (W('obj_growtangle', function (other) {
                this.visible = true;
            }, this) === EXIT) return;
            if (W('obj_heart', function (other) {
                this.visible = true;
            }, this) === EXIT) return;
            instance_destroy(this);
        }
    }
  }
  beginStep() {
    this.iframes = Math.max(0, this.iframes - 1);
  }
}
defineObject('obj_purplecontrols', Purplecontrols);

// obj_pinkdust (default sprite spr_pinkdust, depth 0)
class Pinkdust extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_pinkdust';
    this.visible = false;
  }
  create() {
    this.image_speed = 1;
  }
  draw() {
    draw_sprite_ext(this.sprite_index, - 1, this.x + choose(0, 1), this.y + choose(0, 1), this.image_xscale, this.image_yscale, this.image_angle + 270, 0xffffff, this.image_alpha - this.image_index / 10);
    draw_sprite_ext(this.sprite_index, - 1, this.x + choose(0, 1), this.y + choose(0, 1), - this.image_xscale, this.image_yscale, this.image_angle + 270, 0xffffff, this.image_alpha - this.image_index / 10);
  }
  animationEnd() {
    instance_destroy(this);
  }
}
defineObject('obj_pinkdust', Pinkdust);

// obj_pinktrail (default sprite spr_purpleheart, depth 0)
class Pinktrail extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_purpleheart';
    this.visible = false;
  }
  create() {
    this.image_alpha = 0.5;
    this.image_speed = 0;
    this.image_index = 0;
  }
  beginStep() {
    this.image_alpha = this.image_alpha - 0.0625;
    if (this.image_alpha <= 0.001) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_pinktrail', Pinktrail);

// obj_pinknode (default sprite None, depth 0)
class Pinknode extends Instance {
  create() {
    this.child ??= []; this.child[3] = - 4;
    this.child ??= []; this.child[0] = - 4;
    this.child ??= []; this.child[1] = - 4;
    this.child ??= []; this.child[2] = - 4;
    this.draw_connection ??= []; this.draw_connection[3] = true;
    this.draw_connection ??= []; this.draw_connection[0] = true;
    this.draw_connection ??= []; this.draw_connection[1] = true;
    this.draw_connection ??= []; this.draw_connection[2] = true;
    this.darkify = 0;
    this.dest_x = this.x;
    this.dest_y = this.y;
    this.doki_delay = 0;
    this.doki_backup_node = - 4;
    this.act_to_change = - 4;
    this.hp = 0;
    this.pulse = - 1;
    this.pulse_length = 156;
    this.checkpoint = 0;
    this.fnc_make_node = (dir, dist) => { this.child ??= []; this.child[dir] = instance_create_depth(this.x + lengthdir_x(dist, dir * 90), this.y + lengthdir_y(dist, dir * 90), this.depth, 'obj_pinknode'); return this.child[dir]; };
  }
  onDestroy() {
    return;
  }
  draw() {
    return;
  }
  user0() {
    let i;
    if (W('obj_pinknode', function (other) {
        if (this != other.id) {
            i = 0;
            for (let _r23 = 0, _n23 = (4); _r23 < _n23; _r23++) {
                if (!T(instance_exists(other.child[i])) && this.child[(i + 2) % 4] == other.id) {
                    other.draw_connection ??= []; other.draw_connection[i] = false;
                    other.child ??= []; other.child[i] = this;
                    break;
                }
                i = i + 1;
            }
        }
    }, this) === EXIT) return;
  }
  user1() {
    if (this.hp == 0) {
        if (W(instance_create_depth(this.x, this.y, - 2, 'obj_pinknodeact'), function (other) {
            this.mother = other.id;
            this.mode = 1;
        }, this) === EXIT) return;
    }
  }
  step() {
    let i, _dist, _doki_x, _doki_y, _doki_mother, _backup_activated, _steer, _dest_dir;
    if (this.pulse >= 0) {
        this.pulse = this.pulse + 26;
        i = 0;
        for (let _r21 = 0, _n21 = (4); _r21 < _n21; _r21++) {
            if (instance_exists(this.child[i]) && T(this.draw_connection[i])) {
                _dist = point_distance(this.dest_x, this.dest_y, this.child[i].dest_x, this.child[i].dest_y);
                if (this.pulse >= _dist && this.child[i].pulse < 0) {
                    this.child[i].pulse = this.pulse - _dist;
                }
                if (this.pulse >= _dist + this.pulse_length) {
                    this.pulse = - 1;
                }
                break;
            }
            i = i + 1;
        }
        if (i >= 4) {
            this.pulse = - 1;
        }
    }
    if (this.doki_delay > 0) {
        this.doki_delay = this.doki_delay - 1;
        if (this.doki_delay <= 0) {
            _doki_x = this.x;
            _doki_y = this.y;
            _doki_mother = this;
            _backup_activated = false;
            if (instance_exists(this.doki_backup_node)) {
                if (W('obj_purplecontrols', function (other) {
                    if (this.node_id == other.id) {
                        _backup_activated = true;
                    } else {
                        i = 0;
                        for (let _r202 = 0, _n202 = (4); _r202 < _n202; _r202++) {
                            if (other.child[i] == this.node_id) {
                                _backup_activated = true;
                                break;
                            }
                            i = i + 1;
                        }
                    }
                }, this) === EXIT) return;
            }
            if (T(_backup_activated)) {
                _doki_x = this.doki_backup_node.x;
                _doki_y = this.doki_backup_node.y;
                _doki_mother = this.doki_backup_node.id;
            }
            if (W(instance_create_depth(_doki_x, _doki_y, 5, 'obj_dokiheart'), function (other) {
                this.visible = 0;
                this.mother = _doki_mother;
                this.act_to_change = other.act_to_change;
                this.image_alpha = 0;
                this.maxlifetime = - 1;
            }, this) === EXIT) return;
        }
    }
    if (this.speed > 0) {
        _steer = 10;
        if (point_distance(this.x, this.y, this.dest_x, this.dest_y) >= this.speed * 6) {
            _dest_dir = point_direction(this.x, this.y, this.dest_x, this.dest_y);
            if (_dest_dir > this.direction + 180) {
                _dest_dir = _dest_dir - 360;
            } else if (_dest_dir < this.direction - 180) {
                _dest_dir = _dest_dir + 360;
            }
            if (this.direction > _dest_dir) {
                this.direction = this.direction - _steer;
            } else if (this.direction < _dest_dir) {
                this.direction = this.direction + _steer;
            }
        } else {
            this.direction = this.direction + choose(- 1, 1) * _steer;
        }
    }
  }
}
defineObject('obj_pinknode', Pinknode);

// obj_pinknodeact (default sprite None, depth 0)
class Pinknodeact extends Instance {
  constructor() {
    super();
    this.visible = false;
  }
  create() {
    this.active = 1;
    this.mode = 0;
    this.mother = - 4;
    this.pattern = 0;
    this.pattern_dir = 0;
    this.dest_x = this.x;
    this.dest_y = this.y;
    this.node_id = - 4;
    this.heart_travel = 0;
    this.life_time = 0;
    this.image_alpha = 0;
    this.whiteflash = 0;
    this.fading_away = - 1;
    this.difficulty = 0;
    if (W('obj_purplecontrols', function (other) {
        other.difficulty = this.difficulty;
    }, this) === EXIT) return;
    this.timer = - 1;
    this.lightestpurple = make_color_rgb(215, 156, 237);
    this.lightpurple = make_color_rgb(181, 139, 214);
    this.medpurple = make_color_rgb(181, 105, 214);
    this.darkpurple = make_color_rgb(102, 86, 177);
    this.darkestpurple = make_color_rgb(18, 19, 35);
    this.lightpink = make_color_rgb(247, 91, 200);
    this.medpink = make_color_rgb(230, 36, 123);
    this.darkpink = make_color_rgb(200, 34, 141);
    this.limegreen = make_color_rgb(181, 230, 29);
    this.darkgreen = make_color_rgb(34, 177, 76);
    this.darkred = make_color_rgb(136, 0, 21);
    this.dialogueboxcolor = this.darkpurple;
    this.dialogueboxghostcolor = this.lightpurple;
    this.choiceselectioncolor = this.darkestpurple;
    this.dialogueboxcolorstart = this.dialogueboxcolor;
    this.dialogueboxghostcolorstart = this.dialogueboxghostcolor;
    this.choiceselectioncolorstart = this.choiceselectioncolor;
  }
  onDestroy() {
    return;
  }
  draw() {
    let _color_flash_slider, _original_x, _original_y, _boxw, _boxh, _thickness, _pulsate, _col, _txt, _txt_width;
    draw_set_alpha(this.image_alpha);
    _color_flash_slider = 0x000000;
    if (this.mode == 1) {
        _color_flash_slider = clamp(1 - (this.life_time - 2) / 5, 0, 1);
    }
    _original_x = this.x;
    _original_y = this.y;
    this.x = Math.floor(0.5 + this.x);
    this.y = Math.floor(0.5 + this.y);
    _boxw = 96;
    _boxh = 48;
    _thickness = 1;
    _pulsate = this.life_time;
    if (W('obj_pink_enemy', function (other) {
        _pulsate = this.explosiontimer;
    }, this) === EXIT) return;
    if (this.mode == 0) {
        _col = merge_color(0xffff00, 0xff0000, clamp(_pulsate % 40 / 40 * 2, 0, 1));
        if (this.whiteflash > 0) {
            _col = merge_color(_col, 0xffffff, this.whiteflash);
        }
        draw_set_color(_col);
        if (_pulsate % 40 < 2) {
            _thickness = 3;
        } else if (_pulsate % 40 < 4) {
            _thickness = 2;
        }
    } else {
        _col = merge_color(0xffffff, this.dialogueboxcolor, Math.min(1 - _color_flash_slider, 0.25 + 0.75 * clamp(_pulsate % 40 / 40 * 2, 0, 1)));
        if (this.whiteflash > 0) {
            _col = merge_color(_col, 0xffffff, this.whiteflash);
        }
        draw_set_color(_col);
        if (_pulsate % 40 < 1) {
            _thickness = 2;
        } else if (_pulsate % 40 < 2) {
            _thickness = 3;
        } else if (_pulsate % 40 < 5) {
            _thickness = 2;
        }
    }
    S.d_rectangle(this.x - _boxw / 2 - _thickness, this.y - _boxh / 2 - _thickness, this.x + _boxw / 2 + _thickness, this.y + _boxh / 2 + _thickness, 0);
    _col = merge_color(0x000000, 0xffffff, _color_flash_slider);
    if (this.whiteflash > 0) {
        _col = merge_color(_col, 0xffffff, this.whiteflash);
    }
    draw_set_color(_col);
    S.d_rectangle(this.x - _boxw / 2, this.y - _boxh / 2, this.x + _boxw / 2, this.y + _boxh / 2, 0);
    draw_set_font(S.scr_84_get_font("mainbig"));
    draw_set_halign(1);
    draw_set_valign(0);
    switch (this.mode) {
      case 0:
        draw_set_color(0xff0000);
        _txt = S.stringsetloc("DIE!", "obj_pinknodeact_slash_Draw_0_gml_68_0");
        _txt_width = string_width(_txt);
        draw_text_transformed(this.x + 2, this.y - 26, _txt, 1, 1.5, 0);
        break;
      case 1:
        draw_set_color(0xffffff);
        switch (this.difficulty) {
          case 0:
            _txt = S.stringsetloc("Stop!", "obj_pinknodeact_slash_Draw_0_gml_77_0");
            break;
          case 1:
            _txt = S.stringsetloc("Calm down!", "obj_pinknodeact_slash_Draw_0_gml_78_0");
            break;
          case 2:
            _txt = S.stringsetloc("Don't cry!", "obj_pinknodeact_slash_Draw_0_gml_79_0");
            break;
          default:
            _txt = S.stringsetloc("It's OK!", "obj_pinknodeact_slash_Draw_0_gml_80_0");
        }
        _txt_width = string_width(_txt);
        draw_text_transformed(this.x + 2, this.y - 26, _txt, 90 / string_width(_txt), 1.5, 0);
        break;
    }
    draw_set_halign(0);
    this.x = _original_x;
    this.y = _original_y;
    draw_set_alpha(1);
  }
  step() {
    let _node_dist, _hits, _travel_speed, _move_amount, _dir, _overtravel, i, _found_it, _questiondowntime, _nextpatterntime, c_lime2, _checkpoint_node, _checkpoint_is_free, _dist, _trail, _boxw, _boxh, _heart;
    this.dialogueboxcolorcurrent = this.dialogueboxcolorstart;
    this.choiceselectioncolorcurrent = this.choiceselectioncolorstart;
    if (this.whiteflash > 0) {
        this.whiteflash = Math.max(0, this.whiteflash - 0.25);
    }
    switch (this.pattern) {
      case 1:
        _node_dist = 54;
        if (this.timer < 0) {
            this.x = this.dest_x;
            this.y = this.dest_y + lengthdir_y(_node_dist + 8, this.pattern_dir);
        }
        this.pattern_dir = this.pattern_dir + 4;
        if (this.pattern_dir >= 360) {
            this.pattern_dir = this.pattern_dir - 360;
        }
        break;
      case 2:
        if (this.timer < 0) {
            if (this.pattern_dir > 90 && this.pattern_dir < 270) {
                this.x = camerax() + 640 + 64;
            } else {
                this.x = camerax() - 64;
            }
            this.x = this.x + lengthdir_x(288, this.pattern_dir);
            this.y = this.dest_y;
        }
        this.pattern_dir = this.pattern_dir + 1.5;
        if (this.pattern_dir >= 360) {
            this.pattern_dir = this.pattern_dir - 360;
        }
        break;
      case 3:
        if (this.timer < 0 && instance_exists(this.node_id)) {
            _hits = 0;
            if (W('obj_purplecontrols', function (other) {
                _hits = this.hits;
            }, this) === EXIT) return;
            _travel_speed = Math.min(4 + this.life_time / 2, clamp(15 - (_hits - 1) * 0.75, 12, 15));
            _move_amount = Math.min(_travel_speed, Math.max(1, point_distance(this.x, this.y, this.node_id.dest_x, this.node_id.dest_y)));
            _dir = point_direction(this.x, this.y, this.node_id.dest_x, this.node_id.dest_y);
            this.x = this.x + lengthdir_x(_move_amount, _dir);
            this.y = this.y + lengthdir_y(_move_amount, _dir);
            _overtravel = _travel_speed - this.heart_travel;
            this.heart_travel = this.heart_travel - _move_amount;
            if (this.heart_travel <= 0) {
                this.heart_travel = 0;
                i = 0;
                _found_it = false;
                if (W(this.node_id, function (other) {
                    for (let _r331 = 0, _n331 = (4); _r331 < _n331; _r331++) {
                        if (instance_exists(this.child[i]) && this.draw_connection[i] == 1) {
                            _found_it = true;
                            other.node_id = this.child[i];
                            break;
                        }
                        i = i + 1;
                        if (i >= 4) {
                            i = i - 4;
                        }
                    }
                }, this) === EXIT) return;
                if (T(_found_it)) {
                    if (instance_exists(this.node_id)) {
                        this.heart_travel = point_distance(this.x, this.y, this.node_id.dest_x, this.node_id.dest_y);
                        if (_overtravel > 0) {
                            _move_amount = Math.min(_overtravel, Math.max(1, point_distance(this.x, this.y, this.node_id.dest_x, this.node_id.dest_y)));
                            _dir = point_direction(this.x, this.y, this.node_id.dest_x, this.node_id.dest_y);
                            this.x = this.x + lengthdir_x(_move_amount, _dir);
                            this.y = this.y + lengthdir_y(_move_amount, _dir);
                            this.heart_travel = this.heart_travel - _move_amount;
                        }
                    }
                } else {
                    instance_destroy(this);
                }
            }
        }
        break;
    }
    if (this.timer >= 0) {
        this.timer = this.timer + 1;
        _questiondowntime = 10;
        _nextpatterntime = 50;
        if (this.timer >= 3 && this.timer < _nextpatterntime) {
            if (W('obj_heart', function (other) {
                other.x = other.x * 0.5 + (this.x + 9) * 0.5;
                other.y = other.y * 0.5 + (this.y + 9) * 0.5;
            }, this) === EXIT) return;
        }
        if (this.mode == 1) {
            this.timer = this.timer + 1;
            c_lime2 = merge_color(this.darkpink, 0xffffff, 0.5);
            if (this.timer < 4) {
                this.dialogueboxcolor = merge_color(this.dialogueboxcolorcurrent, c_lime2, this.timer / 4);
                this.choiceselectioncolor = merge_color(this.choiceselectioncolorcurrent, this.darkpink, this.timer / 4);
            }
            if (this.timer >= 4 && this.timer < 8) {
                this.dialogueboxcolor = merge_color(c_lime2, this.dialogueboxcolorcurrent, (this.timer - 3) / 4);
                this.choiceselectioncolor = merge_color(this.darkpink, this.choiceselectioncolorcurrent, (this.timer - 3) / 4);
            }
            if (this.timer >= _nextpatterntime) {
                if (W('obj_pinknode', function (other) {
                    instance_destroy(this);
                }, this) === EXIT) return;
                if (W('obj_dokiheart', function (other) {
                    instance_destroy(this);
                }, this) === EXIT) return;
                if (W('obj_dbulletcontroller', function (other) {
                    this.difficulty = this.difficulty + 1;
                }, this) === EXIT) return;
                if (W('obj_purplecontrols', function (other) {
                    this.hits = 0;
                    this.difficulty = this.difficulty + 1;
                    this.can_move = true;
                    this.made = 0;
                }, this) === EXIT) return;
                instance_destroy(this);
            }
        } else if (this.mode == 0) {
            this.timer = this.timer + 1;
            if (this.timer == 1) {
                this.show_circle1 = 2;
                if (O('obj_pink_enemy').datecount > 1) {
                    this.show_circle2 = 2;
                }
                this.hero_state = "choose";
            }
            if (this.timer < 4) {
                this.dialogueboxcolor = merge_color(this.dialogueboxcolorcurrent, 0xff0000, this.timer / 4);
                this.choiceselectioncolor = merge_color(this.choiceselectioncolorcurrent, 0xff0000, this.timer / 4);
            }
            if (this.timer >= 4 && this.timer < 7) {
                this.dialogueboxcolor = merge_color(0xff0000, this.dialogueboxcolorcurrent, (this.timer - 3) / 4);
                this.choiceselectioncolor = merge_color(0xff0000, this.choiceselectioncolorcurrent, (this.timer - 3) / 4);
            }
            if (this.timer == 10 + _questiondowntime) {
                if (instance_exists('obj_date_controller')) {
                    if (W('obj_date_controller', function (other) {
                        this.user0?.();
                    }, this) === EXIT) return;
                } else {
                    scr_shakescreen(this);
                    snd_stop('snd_hurt1');
                    snd_play('snd_hurt1');
                    global.inv = global.invc * 40;
                }
                _checkpoint_node = - 4;
                if (W('obj_pinknode', function (other) {
                    if (this.checkpoint == 2) {
                        _checkpoint_node = this;
                        return BREAK;
                    }
                }, this) === EXIT) return;
                if (_checkpoint_node != - 4) {
                    this.timer = - 1;
                    _checkpoint_is_free = true;
                    if (W('obj_pinknodeact', function (other) {
                        if (_checkpoint_node.darkify == 0) {
                            if (this.pattern == 3) {
                                instance_destroy(this);
                            }
                        }
                        this.active = 1;
                        if (this.mode == 1) {
                            if (this.mother == _checkpoint_node) {
                                _checkpoint_is_free = false;
                            }
                        }
                    }, this) === EXIT) return;
                    if (W('obj_purplecontrols', function (other) {
                        this.hits = this.hits + 1;
                        if (T(_checkpoint_is_free)) {
                            this.node_id = _checkpoint_node;
                        }
                        this.can_move = true;
                    }, this) === EXIT) return;
                    if (T(_checkpoint_is_free)) {
                        if (W('obj_heart', function (other) {
                            _dir = point_direction(this.x + 9, this.y + 9, _checkpoint_node.x, _checkpoint_node.y);
                            _dist = point_distance(this.x + 9, this.y + 9, _checkpoint_node.x, _checkpoint_node.y);
                            do {
                                _trail = instance_create_depth(_checkpoint_node.x - lengthdir_x(_dist, _dir) - 9, _checkpoint_node.y - lengthdir_y(_dist, _dir) - 9, 0, 'obj_pinktrail');
                                _trail.direction = _dir;
                                _trail.speed = 1;
                                _dist = _dist - 22;
                            } while ((!(_dist <= 2)) && LOOP('Pinknodeact#7'));

                            this.x = _checkpoint_node.x - 9;
                            this.y = _checkpoint_node.y - 9;
                        }, this) === EXIT) return;
                    }
                    if (this.pattern == 3) {
                        this.active = 0;
                        instance_destroy(this);
                    }
                } else {
                    if (W('obj_pinknode', function (other) {
                        instance_destroy(this);
                    }, this) === EXIT) return;
                    if (W('obj_pinknodeact', function (other) {
                        instance_destroy(this);
                    }, this) === EXIT) return;
                    if (W('obj_dokiheart', function (other) {
                        instance_destroy(this);
                    }, this) === EXIT) return;
                    if (W('obj_purplecontrols', function (other) {
                        this.hits = this.hits + 1;
                        this.can_move = true;
                        this.made = 0;
                    }, this) === EXIT) return;
                }
            }
        }
    }
    if (this.active == 1) {
        _boxw = 48;
        _boxh = 32;
        _heart = collision_rectangle(this.x - _boxw / 2, this.y - _boxh / 2, this.x + _boxw / 2, this.y + _boxh / 2, 'obj_heart', 1, 1);
        if (_heart != null && (global.inv < 0 || this.mode == 1)) {
            if (W('obj_purplecontrols', function (other) {
                this.can_move = false;
            }, this) === EXIT) return;
            switch (this.mode) {
              case 0:
                snd_stop('snd_coin');
                snd_stop('snd_error');
                snd_play('snd_error');
                this.whiteflash = 1;
                break;
              case 1:
                snd_stop('snd_coin');
                snd_stop('snd_error');
                snd_play('snd_coin');
                this.whiteflash = 1;
                if (W('obj_pinknodeact', function (other) {
                    this.mother = - 4;
                    this.node_id = - 4;
                    this.pattern = 0;
                    this.fading_away = 0;
                }, this) === EXIT) return;
                if (W('obj_date_controller', function (other) {
                    this.changecolorcon = 0x010000;
                }, this) === EXIT) return;
                break;
            }
            if (W('obj_pinknodeact', function (other) {
                this.active = 0;
            }, this) === EXIT) return;
            this.timer = 0;
        }
    }
    this.life_time = this.life_time + 1;
    switch (this.mode) {
      case 1:
        this.image_alpha = Math.min(this.image_alpha + 0.5, 1);
        break;
      default:
        this.image_alpha = Math.min(this.image_alpha + 0.2, 1);
    }
    if (this.fading_away >= 0) {
        this.fading_away = this.fading_away + 1;
        if (this.fading_away < 4) {
            this.image_alpha = 1;
        } else {
            this.image_alpha = clamp(1 / (1 + (this.fading_away - 4) * 0.1) - (this.fading_away - 4) * 0.01, 0, 1);
        }
        if (this.fading_away >= 40 && this.mode != 1) {
            instance_destroy(this);
        }
    }
  }
  endStep() {
    if (instance_exists(this.mother)) {
        this.x = this.mother.x;
        this.y = this.mother.y;
    }
  }
}
defineObject('obj_pinknodeact', Pinknodeact);

// obj_slidedust (default sprite spr_slidedust, depth 0)
class Slidedust extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_slidedust';
  }
  alarm5() {
    instance_destroy(this);
  }
  create() {
    this.image_speed = 0.5;
    this.alarm ??= []; this.alarm[5] = 10;
    this.image_xscale = 2;
    this.image_yscale = 2;
  }
}
defineObject('obj_slidedust', Slidedust);

// obj_fx_purpleripple (default sprite None, depth 0)
class FxPurpleripple extends Instance {
  constructor() {
    super();
    this.visible = false;
  }
  cleanUp() {
    surface_free(this.surface_effect);
  }
  create() {
    this.life_time = 0;
    this.surface_effect = surface_create(256, 256);
  }
  step() {
    this.life_time = this.life_time + 1;
    if (this.life_time >= 40) {
        instance_destroy(this);
    }
  }
  endStep() {
    if (!T(surface_exists(this.surface_effect))) {
        this.surface_effect = surface_create(256, 256);
    }
    surface_set_target(this.surface_effect);
    draw_clear_alpha(0, 0);
    draw_set_color(0xffffff);
    S.d_circle(128, 128, this.life_time * 6, false);
    if (this.life_time > 10) {
        gpu_set_blendmode(3);
        gpu_set_colorwriteenable(0, 0, 0, 1);
        S.d_circle(128, 128, (this.life_time - 10) * 6, false);
        gpu_set_blendmode(0);
        gpu_set_colorwriteenable(1, 1, 1, 1);
    }
    surface_reset_target();
  }
}
defineObject('obj_fx_purpleripple', FxPurpleripple);

// obj_purplebg (default sprite spr_pinkroll_background, depth 0)
class Purplebg extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_pinkroll_background';
  }
  create() {
    this.bg_x = 0;
    this.bg_y = 0;
    this.image_alpha = 0;
  }
  onDestroy() {
    if (W('obj_herokris', function (other) {
        this.image_alpha = 1;
    }, this) === EXIT) return;
    if (W('obj_herosusie', function (other) {
        this.image_alpha = 1;
    }, this) === EXIT) return;
    if (W('obj_heroralsei', function (other) {
        this.image_alpha = 1;
    }, this) === EXIT) return;
  }
  draw() {
    let _i, _xx;
    _i = 0;
    _xx = this.bg_x;
    do {
        draw_sprite_ext('spr_pinkroll_background', 0, S.camera_get_view_x(0) + _xx, S.camera_get_view_y(0) + this.bg_y + 120, 2, 2, 0, 0xffffff, this.image_alpha);
        _xx = _xx + 512;
        _i = _i + 1;
    } while ((!(_xx >= 608)) && LOOP('Purplebg#8'));

  }
  step() {
    if (!T(i_ex('obj_purplecontrols'))) {
        instance_destroy(this);
    }
  }
  endStep() {
    let _herofade;
    if (this.bg_x < 512) {
        this.bg_x = this.bg_x + 512;
    }
    if (this.bg_x > 0) {
        this.bg_x = this.bg_x - 512;
    }
    if (this.visible > 0) {
        this.image_alpha = this.image_alpha + 0.05;
        _herofade = 0.05;
        if (W('obj_herokris', function (other) {
            this.image_alpha = this.image_alpha - _herofade;
        }, this) === EXIT) return;
        if (W('obj_herosusie', function (other) {
            this.image_alpha = this.image_alpha - _herofade;
        }, this) === EXIT) return;
        if (W('obj_heroralsei', function (other) {
            this.image_alpha = this.image_alpha - _herofade;
        }, this) === EXIT) return;
    }
  }
}
defineObject('obj_purplebg', Purplebg);

// obj_pink_curtains (default sprite spr_pink_curtain, depth 0)
class PinkCurtains extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_pink_curtain';
  }
  cleanUp() {
    surface_free(this.surface_effect);
    S.ds_list_destroy(this.l_patterns);
    S.ds_list_destroy(this.l_timings);
    S.ds_list_destroy(this.l_audience_y);
    S.ds_list_destroy(this.l_audience_sway);
    S.ds_list_destroy(this.l_audience_angle);
    S.ds_list_destroy(this.l_audience_showup);
    S.ds_list_destroy(this.l_audience_hater);
    S.ds_list_destroy(this.l_audience_shoottime);
  }
  create() {
    let i;
    this.target = 4;
    this.damage = 100;
    if (i_ex('obj_pink_enemy')) {
        this.damage = O('obj_pink_enemy').damage;
    }
    this.ammo = 5;
    this.pattern_repeat = 0;
    this.difficulty = 0;
    this.closed = 2;
    this.surface_effect = surface_create(640, 480);
    this.l_patterns = S.ds_list_create();
    this.l_timings = S.ds_list_create();
    this.l_audience_y = S.ds_list_create();
    this.l_audience_sway = S.ds_list_create();
    this.l_audience_angle = S.ds_list_create();
    this.l_audience_showup = S.ds_list_create();
    this.l_audience_hater = S.ds_list_create();
    this.l_audience_shoottime = S.ds_list_create();
    this.audience_number = 28;
    this.audience_hitbox ??= []; this.audience_hitbox[this.audience_number] = - 4;
    this.audience_popout = 0;
    this.hater_popout = 0;
    i = 0;
    for (let _r125 = 0, _n125 = (this.audience_number); _r125 < _n125; _r125++) {
        S.ds_list_add(this.l_audience_y, random(60) + choose(0, 180));
        S.ds_list_add(this.l_audience_sway, 3 + random(9));
        S.ds_list_add(this.l_audience_angle, random(360));
        this.audience_hitbox ??= []; this.audience_hitbox[i] = - 4;
        i = i + 1;
    }
    i = 14;
    for (let _r188 = 0, _n188 = (14); _r188 < _n188; _r188++) {
        i = i - 1;
        this.curtain_sway ??= []; this.curtain_sway[i] = 0;
        this.curtain_angle ??= []; this.curtain_angle[i] = 0;
    }
    this.speaker_scale ??= []; this.speaker_scale[1] = 1;
    this.speaker_scale ??= []; this.speaker_scale[0] = 1;
    this.speaker_cycle = 0;
    this.speaker_phase = 0;
    this.phase = 0;
    this.pattern_time = 0;
  }
  draw() {
    let _drawdummies, _cx, _cy, _camfix_x, _camfix_y, _bits_h, _bits_v, i, _xx1b, _xx2b, _xx1, _xx2, _scale_column, j, _scale_closed, _scale, _yy, _dir, _dist;
    if (!T(instance_exists('obj_growtangle'))) {
        return;
    }
    _drawdummies = false;
    if (instance_exists('obj_audience_hitbox')) {
        _drawdummies = true;
    }
    if (T(_drawdummies)) {
        draw_sprite_ext('spr_dw_castle_tv_speaker', 1, camerax() + 172, scr_get_box(1) - 31, 2 * this.speaker_scale[0], 2 * this.speaker_scale[0], 0, 0xffffff, 1);
        draw_sprite_ext('spr_dw_castle_tv_speaker', 1, camerax() + 468, scr_get_box(1) - 31, 2 * this.speaker_scale[1], 2 * this.speaker_scale[1], 0, 0xffffff, 1);
    }
    _cx = 0;
    _cy = 0;
    _camfix_x = - S.camera_get_view_x(0);
    _camfix_y = - S.camera_get_view_y(0);
    if (!T(surface_exists(this.surface_effect))) {
        this.surface_effect = surface_create(640, 480);
    }
    surface_set_target(this.surface_effect);
    if (T(_drawdummies)) {
        _cx = S.camera_get_view_x(0);
        _cy = S.camera_get_view_y(0);
        _camfix_x = 0;
        _camfix_y = 0;
    }
    draw_clear_alpha(0, 0);
    if (!T(_drawdummies)) {
        draw_sprite_ext('spr_dw_castle_tv_speaker', 1, _cx + 172, _cy + (scr_get_box(1) - S.camera_get_view_y(0)) - 31, 2 * this.speaker_scale[0], 2 * this.speaker_scale[0], 0, 0xffffff, 1);
        draw_sprite_ext('spr_dw_castle_tv_speaker', 1, _cx + 468, _cy + (scr_get_box(1) - S.camera_get_view_y(0)) - 31, 2 * this.speaker_scale[1], 2 * this.speaker_scale[1], 0, 0xffffff, 1);
    }
    if (T(_drawdummies)) {
        if (W('obj_audience_hitbox', function (other) {
            this.x = this.x + S.camera_get_view_x(0);
            this.y = this.y + S.camera_get_view_y(0);
            this.draw?.();
            this.x = this.x - S.camera_get_view_x(0);
            this.y = this.y - S.camera_get_view_y(0);
        }, this) === EXIT) return;
        surface_reset_target();
        draw_surface_part(this.surface_effect, S.camera_get_view_x(0) + scr_get_box(2) + O('obj_growtangle').image_xscale * 2.5, S.camera_get_view_y(0) + scr_get_box(1) + O('obj_growtangle').image_yscale * 2.5, scr_get_box(0) - scr_get_box(2) - O('obj_growtangle').image_xscale * 4, scr_get_box(3) - scr_get_box(1) - O('obj_growtangle').image_yscale * 4, scr_get_box(2) + O('obj_growtangle').image_xscale * 2.5, scr_get_box(1) + O('obj_growtangle').image_yscale * 2.5);
    }
    _bits_h = 6;
    _bits_v = 14;
    i = 0;
    for (let _r508 = 0, _n508 = (_bits_h); _r508 < _n508; _r508++) {
        _xx1b = 0;
        _xx2b = 0;
        if (this.closed < 1) {
            _xx1b = lerp(14, 0, this.closed / 1);
        }
        if (this.closed < 1) {
            _xx2b = lerp(8, 0, this.closed / 1);
        }
        _xx1 = _camfix_x + this.x + (- 176 + _xx1b) + i * 32;
        _xx2 = _camfix_x + this.x + (176 - _xx2b) - i * 32;
        _scale_column = Math.min(- i + clamp(this.closed, 0, 1) * _bits_h, 1);
        if (_scale_column < 0) {
            _xx1 = _xx1 + 32 * _scale_column;
            _xx2 = _xx2 - 32 * _scale_column;
        }
        j = _bits_v;
        for (let _r645 = 0, _n645 = (_bits_v); _r645 < _n645; _r645++) {
            j = j - 1;
            if (i == _bits_h - 1) {
                switch (j) {
                  case 0:
                    _scale_closed = 1;
                    break;
                  case 1:
                    _scale_closed = 1;
                    break;
                  case 2:
                    _scale_closed = 0.975;
                    break;
                  case 3:
                    _scale_closed = 0.95;
                    break;
                  case 4:
                    _scale_closed = 0.875;
                    break;
                  case 5:
                    _scale_closed = 0.775;
                    break;
                  case 6:
                    _scale_closed = 0.65;
                    break;
                  case 7:
                    _scale_closed = 0.5;
                    break;
                  case 8:
                    _scale_closed = 0.35;
                    break;
                  default:
                    _scale_closed = 0.2;
                    break;
                }
            } else {
                _scale_closed = 0.2;
            }
            _scale = Math.max(_scale_closed, _scale_column);
            _yy = _camfix_y + this.y + j * 14 - 12 + lengthdir_y(12, 270 + this.curtain_angle[j]);
            draw_sprite_ext(this.sprite_index, - 1, _xx1 - this.sprite_width * 0.5 * (1 - _scale) + lengthdir_x(12, 270 - this.curtain_angle[j]), _yy, _scale, 1, 0, 0xffffff, 1);
            draw_sprite_ext(this.sprite_index, - 1, _xx2 + this.sprite_width * 0.5 * (1 - _scale) + lengthdir_x(12, 270 + this.curtain_angle[j]), _yy, _scale, 1, 0, 0xffffff, 1);
        }
        i = i + 1;
    }
    if (!T(_drawdummies)) {
        surface_reset_target();
        _dir = point_direction(scr_get_box(4), scr_get_box(5), S.camera_get_view_x(0), S.camera_get_view_y(0));
        _dist = point_distance(scr_get_box(4), scr_get_box(5), S.camera_get_view_x(0), S.camera_get_view_y(0));
        _scale = O('obj_growtangle').image_xscale / O('obj_growtangle').maxxscale;
        _xx1 = scr_get_box(4) + lengthdir_x(_dist * _scale, _dir + O('obj_growtangle').image_angle);
        _yy = scr_get_box(5) + lengthdir_y(_dist * _scale, _dir + O('obj_growtangle').image_angle);
        draw_surface_ext(this.surface_effect, _xx1, _yy, _scale, _scale, O('obj_growtangle').image_angle, 0xffffff, 1);
    }
  }
  step() {
    let i, _shootorder_variant, _dice, _haters, _delay, _dummy, _jump, _popout, _curtainpeek;
    if (W('obj_dmgwriter', function (other) {
        this.depth = this.depth - 10;
    }, this) === EXIT) return;
    this.speaker_scale ??= []; this.speaker_scale[0] = 0.2 + this.speaker_scale[0] * 0.8;
    this.speaker_scale ??= []; this.speaker_scale[1] = 0.2 + this.speaker_scale[1] * 0.8;
    this.speaker_cycle = this.speaker_cycle + 36;
    if (this.speaker_cycle >= 360) {
        this.speaker_cycle = this.speaker_cycle - 360;
        this.speaker_scale ??= []; this.speaker_scale[0] = 1.15;
        this.speaker_scale ??= []; this.speaker_scale[1] = 1.15;
        this.speaker_phase = this.speaker_phase + 1;
        if (this.speaker_phase >= 8) {
            this.speaker_phase = 0;
        }
    }
    if (this.closed > 0) {
        this.closed = this.closed - 0.05;
        if (this.closed <= 0) {
            this.closed = 0;
            i = 0;
            for (let _r125 = 0, _n125 = (14); _r125 < _n125; _r125++) {
                this.curtain_sway ??= []; this.curtain_sway[i] = 2 + i * 1;
                this.curtain_angle ??= []; this.curtain_angle[i] = 0;
                i = i + 1;
            }
        }
    }
    i = 0;
    for (let _r161 = 0, _n161 = (14); _r161 < _n161; _r161++) {
        this.curtain_sway ??= []; this.curtain_sway[i] = this.curtain_sway[i] + (0.5 - lengthdir_y(0.5, 270 + this.curtain_angle[i])) * sign(- this.curtain_angle[i]) * 2;
        this.curtain_sway ??= []; this.curtain_sway[i] = scr_approach(this.curtain_sway[i], 0, 0.25);
        this.curtain_angle ??= []; this.curtain_angle[i] = this.curtain_angle[i] + this.curtain_sway[i];
        this.curtain_angle ??= []; this.curtain_angle[i] = scr_approach(this.curtain_angle[i], 0, Math.max(0, 1 - Math.abs(this.curtain_sway[i])));
        i = i + 1;
    }
    switch (this.phase) {
      case 0:
        if (this.ammo > 0) {
            if (this.pattern_time >= 1) {
                this.ammo = this.ammo - 1;
                this.pattern_time = 90;
                if (S.ds_list_size(this.l_patterns) <= 0) {
                    if (this.pattern_repeat == 0 && this.difficulty <= 0) {
                        if (irandom(1) == 0) {
                            S.ds_list_add(this.l_patterns, 4, 1, 5, 2, 0);
                        } else {
                            S.ds_list_add(this.l_patterns, 4, 2, 5, 1, 0);
                        }
                        S.ds_list_add(this.l_timings, 80, 40, 40, 60);
                    } else {
                        switch (irandom(3)) {
                          case 0:
                            S.ds_list_add(this.l_patterns, 3, 1, 5, 2, 0);
                            break;
                          case 1:
                            S.ds_list_add(this.l_patterns, 3, 2, 5, 1, 0);
                            break;
                          case 2:
                            S.ds_list_add(this.l_patterns, 3, 1, 2, 5, 0);
                            break;
                          case 3:
                            S.ds_list_add(this.l_patterns, 3, 2, 1, 5, 0);
                            break;
                        }
                        S.ds_list_add(this.l_timings, 90, 60, 60, 90);
                    }
                }
                _shootorder_variant = irandom(3);
                switch (S.ds_list_find_value(this.l_patterns, 0)) {
                  case 0:
                    i = 4;
                    for (let _r513 = 0, _n513 = (3); _r513 < _n513; _r513++) {
                        S.ds_list_add(this.l_audience_showup, i);
                        this.audience_hitbox ??= []; this.audience_hitbox[i] = instance_create(this.x, this.y, 'obj_audience_hitbox');
                        i = i + 1;
                    }
                    i = 7;
                    for (let _r551 = 0, _n551 = (14); _r551 < _n551; _r551++) {
                        S.ds_list_add(this.l_audience_showup, i);
                        this.audience_hitbox ??= []; this.audience_hitbox[i] = instance_create(this.x, this.y, 'obj_audience_hitbox');
                        i = i + 1;
                    }
                    i = this.audience_number - 3;
                    for (let _r591 = 0, _n591 = (3); _r591 < _n591; _r591++) {
                        S.ds_list_add(this.l_audience_showup, i);
                        this.audience_hitbox ??= []; this.audience_hitbox[i] = instance_create(this.x, this.y, 'obj_audience_hitbox');
                        i = i + 1;
                    }
                    if (this.difficulty <= 0) {
                        _shootorder_variant = 2;
                    }
                    break;
                  case 1:
                    i = 0;
                    for (let _r646 = 0, _n646 = (7); _r646 < _n646; _r646++) {
                        if (i >= 2) {
                            S.ds_list_add(this.l_audience_showup, i);
                            this.audience_hitbox ??= []; this.audience_hitbox[i] = instance_create(this.x, this.y, 'obj_audience_hitbox');
                        }
                        i = i + 1;
                    }
                    i = i + 1;
                    for (let _r694 = 0, _n694 = (4); _r694 < _n694; _r694++) {
                        S.ds_list_add(this.l_audience_showup, i);
                        this.audience_hitbox ??= []; this.audience_hitbox[i] = instance_create(this.x, this.y, 'obj_audience_hitbox');
                        i = i + 2;
                    }
                    _shootorder_variant = 1;
                    break;
                  case 2:
                    i = 21;
                    for (let _r741 = 0, _n741 = (7); _r741 < _n741; _r741++) {
                        if (i >= 23) {
                            S.ds_list_add(this.l_audience_showup, i);
                            this.audience_hitbox ??= []; this.audience_hitbox[i] = instance_create(this.x, this.y, 'obj_audience_hitbox');
                        }
                        i = i + 1;
                    }
                    i = 19;
                    for (let _r787 = 0, _n787 = (4); _r787 < _n787; _r787++) {
                        S.ds_list_add(this.l_audience_showup, i);
                        this.audience_hitbox ??= []; this.audience_hitbox[i] = instance_create(this.x, this.y, 'obj_audience_hitbox');
                        i = i - 2;
                    }
                    _shootorder_variant = 0;
                    break;
                  case 3:
                    _dice = 1 + irandom(this.audience_number - 2 - 1);
                    for (let _r843 = 0, _n843 = (13); _r843 < _n843; _r843++) {
                        _dice = _dice + (1 + irandom(this.audience_number - 2 - 2));
                        if (_dice >= 21) {
                            _dice = _dice + 1;
                        }
                        if (_dice >= this.audience_number) {
                            _dice = _dice - (this.audience_number - 2);
                        }
                        if (S.ds_list_find_index(this.l_audience_showup, _dice) >= 0) {
                            do {
                                _dice = _dice + 1;
                                if (_dice >= 21) {
                                    _dice = _dice + 1;
                                }
                                if (_dice >= this.audience_number) {
                                    _dice = _dice - (this.audience_number - 2);
                                }
                            } while ((!(S.ds_list_find_index(this.l_audience_showup, _dice) < 0)) && LOOP('PinkCurtains#9'));

                        }
                        S.ds_list_add(this.l_audience_showup, _dice);
                        this.audience_hitbox ??= []; this.audience_hitbox[_dice] = instance_create(this.x, this.y, 'obj_audience_hitbox');
                    }
                    if (this.difficulty <= 0) {
                        _shootorder_variant = 3;
                    }
                    break;
                  case 4:
                    i = 9;
                    for (let _r1007 = 0, _n1007 = (4); _r1007 < _n1007; _r1007++) {
                        S.ds_list_add(this.l_audience_showup, i);
                        this.audience_hitbox ??= []; this.audience_hitbox[i] = instance_create(this.x, this.y, 'obj_audience_hitbox');
                        i = i + 1;
                    }
                    i = 15;
                    for (let _r1045 = 0, _n1045 = (4); _r1045 < _n1045; _r1045++) {
                        S.ds_list_add(this.l_audience_showup, i);
                        this.audience_hitbox ??= []; this.audience_hitbox[i] = instance_create(this.x, this.y, 'obj_audience_hitbox');
                        i = i + 1;
                    }
                    if (this.difficulty <= 0) {
                        _shootorder_variant = 3;
                    }
                    break;
                  case 5:
                    i = 10;
                    for (let _r1100 = 0, _n1100 = (8); _r1100 < _n1100; _r1100++) {
                        S.ds_list_add(this.l_audience_showup, i);
                        this.audience_hitbox ??= []; this.audience_hitbox[i] = instance_create(this.x, this.y, 'obj_audience_hitbox');
                        i = i + 1;
                    }
                    if (this.difficulty <= 0) {
                        _shootorder_variant = 3;
                    }
                    break;
                }
                S.ds_list_delete(this.l_patterns, 0);
                S.ds_list_sort(this.l_audience_showup, true);
                i = S.ds_list_size(this.l_audience_showup);
                for (let _r1173 = 0, _n1173 = (S.ds_list_size(this.l_audience_showup)); _r1173 < _n1173; _r1173++) {
                    i = i - 1;
                    if (S.ds_list_find_value(this.l_audience_showup, i) >= 21) {
                        S.ds_list_add(this.l_audience_showup, S.ds_list_find_value(this.l_audience_showup, i));
                        S.ds_list_delete(this.l_audience_showup, i);
                    }
                }
                if (global.flag[1914] != 2) {
                    switch (this.pattern_repeat) {
                      case 0:
                      case 1:
                      case 2:
                      case 3:
                        _haters = 1;
                        break;
                      default:
                        _haters = 4;
                    }
                } else {
                    switch (this.pattern_repeat) {
                      case 0:
                        _haters = 1;
                        break;
                      case 1:
                        _haters = 2;
                        break;
                      case 2:
                        _haters = 2;
                        break;
                      case 3:
                        _haters = 3;
                        break;
                      default:
                        _haters = 7;
                    }
                }
                i = 0;
                for (let _r1318 = 0, _n1318 = (S.ds_list_size(this.l_audience_showup)); _r1318 < _n1318; _r1318++) {
                    if (this.difficulty > 0 && i < _haters) {
                        S.ds_list_add(this.l_audience_hater, 1);
                    } else {
                        S.ds_list_add(this.l_audience_hater, 0);
                    }
                    switch (_shootorder_variant) {
                      case 0:
                        S.ds_list_add(this.l_audience_shoottime, Math.floor(i * 1.5));
                        break;
                      case 1:
                        S.ds_list_add(this.l_audience_shoottime, Math.floor((S.ds_list_size(this.l_audience_showup) - i) * 1.5));
                        break;
                      case 3:
                        S.ds_list_add(this.l_audience_shoottime, Math.floor(i * 1));
                        break;
                    }
                    i = i + 1;
                }
                switch (_shootorder_variant) {
                  case 2:
                    i = 0;
                    _delay = 3;
                    for (let _r1439 = 0, _n1439 = (this.audience_number); _r1439 < _n1439; _r1439++) {
                        if (S.ds_list_find_index(this.l_audience_showup, i) >= 0) {
                            if (i < this.audience_number / 2) {
                                S.ds_list_add(this.l_audience_shoottime, Math.floor((this.audience_number / 2 - i) * _delay));
                            } else if (i < 21) {
                                S.ds_list_add(this.l_audience_shoottime, Math.floor((i - this.audience_number / 2) * _delay));
                            } else {
                                S.ds_list_add(this.l_audience_shoottime, Math.floor((i - this.audience_number / 2 - 3) * _delay));
                            }
                        }
                        i = i + 1;
                    }
                    break;
                  case 3:
                    S.ds_list_shuffle(this.l_audience_shoottime);
                    break;
                }
                S.ds_list_shuffle(this.l_audience_hater);
                this.audience_popout = 0;
                this.hater_popout = 0;
                i = 0;
                for (let _r1572 = 0, _n1572 = (this.audience_number); _r1572 < _n1572; _r1572++) {
                    _dummy = S.ds_list_find_index(this.l_audience_showup, i);
                    if (_dummy >= 0) {
                        if (instance_exists(this.audience_hitbox[i])) {
                            this.audience_hitbox[i].visible = 0;
                            this.audience_hitbox[i].audience_y = S.ds_list_find_value(this.l_audience_y, i);
                            this.audience_hitbox[i].audience_angle = S.ds_list_find_value(this.l_audience_angle, i);
                            this.audience_hitbox[i].audience_sway = S.ds_list_find_value(this.l_audience_sway, i);
                            this.audience_hitbox[i].audience_shoottime = S.ds_list_find_value(this.l_audience_shoottime, _dummy);
                            this.audience_hitbox[i].audience_hater = S.ds_list_find_value(this.l_audience_hater, _dummy);
                            if (S.ds_list_find_value(this.l_audience_hater, _dummy) == 0) {
                                _jump = 10;
                                _popout = 0;
                                _curtainpeek = 0;
                            } else {
                                _jump = 5;
                                _popout = 0;
                                _curtainpeek = 6;
                            }
                            if (i < 3) {
                                this.audience_hitbox[i].x = this.x + 10 - 160 + _popout + _curtainpeek;
                                this.audience_hitbox[i].y = this.y + 12 + i * 24;
                                this.audience_hitbox[i].image_angle = 270;
                            } else if (i < 7) {
                                this.audience_hitbox[i].x = this.x - 160 + _popout;
                                this.audience_hitbox[i].y = this.y + 12 + i * 24;
                                this.audience_hitbox[i].image_angle = 270;
                            } else if (i < 21) {
                                this.audience_hitbox[i].x = this.x + (i - 6.5 - 7) * 24;
                                this.audience_hitbox[i].y = this.y + 170 - _popout;
                            } else if (i < 24) {
                                this.audience_hitbox[i].x = this.x - 10 + 164 - _popout - _curtainpeek;
                                this.audience_hitbox[i].y = this.y + 12 + (i - 21) * 24;
                                this.audience_hitbox[i].image_angle = 90;
                            } else {
                                this.audience_hitbox[i].x = this.x + 164 - _popout;
                                this.audience_hitbox[i].y = this.y + 12 + (i - 21) * 24;
                                this.audience_hitbox[i].image_angle = 90;
                            }
                            this.audience_hitbox[i].start_x = this.audience_hitbox[i].x;
                            this.audience_hitbox[i].start_y = this.audience_hitbox[i].y;
                            if (W(this.audience_hitbox[i], function (other) {
                                if (this.audience_hater == 0) {
                                    _jump = 10;
                                    _popout = this.audience_popout;
                                    _curtainpeek = 0;
                                } else {
                                    _jump = 5;
                                    _popout = this.hater_popout;
                                    _curtainpeek = 6;
                                }
                                if (this.image_angle == 270) {
                                    this.x = this.start_x + Math.abs(lengthdir_y(_jump, this.audience_y)) + _popout;
                                    this.y = this.start_y;
                                } else if (this.image_angle == 0) {
                                    this.x = this.start_x;
                                    this.y = this.start_y - Math.abs(lengthdir_y(_jump, this.audience_y)) - _popout;
                                } else if (this.image_angle == 90) {
                                    this.x = this.start_x - Math.abs(lengthdir_y(_jump, this.audience_y)) - _popout;
                                    this.y = this.start_y;
                                }
                            }, this) === EXIT) return;
                        }
                    }
                    i = i + 1;
                }
                if (S.ds_list_size(this.l_timings) > 0) {
                    this.pattern_time = S.ds_list_find_value(this.l_timings, 0);
                    S.ds_list_delete(this.l_timings, 0);
                }
                this.phase = this.phase + 1;
            }
        }
        break;
      case 1:
        this.audience_popout = - 0.1;
        this.phase = this.phase + 1;
        break;
      case 2:
        this.pattern_time = this.pattern_time - 1;
        if (this.pattern_time <= 0) {
            S.ds_list_clear(this.l_audience_showup);
            S.ds_list_clear(this.l_audience_hater);
            S.ds_list_clear(this.l_audience_shoottime);
            this.pattern_time = 1;
            this.phase = 0;
            this.pattern_repeat = this.pattern_repeat + 1;
        }
        break;
    }
  }
  endStep() {
    if (instance_exists('obj_growtangle') && global.turntimer > 0) {
        this.x = O('obj_growtangle').x;
        this.y = O('obj_growtangle').y - 88;
    } else {
        instance_destroy(this);
    }
  }
}
defineObject('obj_pink_curtains', PinkCurtains);

// obj_pink_tension_glow (default sprite spr_tensionbar, depth 0)
class PinkTensionGlow extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_tensionbar';
  }
  cleanUp() {
    if (surface_exists(this.healthbar_surf)) {
        surface_free(this.healthbar_surf);
    }
  }
  create() {
    this.apparent = 0;
    this.alphamod = 1;
    this.apparent = global.tension;
    this.current = global.tension;
    this.tsiner = 0;
    this.healthbar_surf = - 1;
    this.change = 0;
    this.changetimer = 15;
    this.flashsiner = 0;
    this.maxed = 0;
    this.tamt = 0;
    if (W('obj_tensionbar', function (other) {
        other.x = this.x;
        other.y = this.y;
    }, this) === EXIT) return;
    this.draw_w_offset = () => {};
  }
  draw() {
    if (Math.abs(this.apparent - global.tension) < 20) {
        this.apparent = global.tension;
    }
    if (this.apparent < global.tension) {
        this.apparent = this.apparent + 20;
    }
    if (this.apparent > global.tension) {
        this.apparent = this.apparent - 20;
    }
    this.alphamod = scr_approach(this.alphamod, 0, 0.15);
    if (this.alphamod == 0) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_pink_tension_glow', PinkTensionGlow);

// obj_fx_pinkchargestar (default sprite spr_pinkchargestar, depth 0)
class FxPinkchargestar extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_pinkchargestar';
  }
  create() {
    this.life_time = 0;
  }
  draw() {
    let _frame;
    switch (this.life_time) {
      case 1:
        _frame = 1;
        break;
      default:
        _frame = 0;
    }
    draw_sprite_ext(this.sprite_index, _frame, this.x, this.y, 2, 2, 0, 0xffffff, 1);
  }
  beginStep() {
    this.life_time = this.life_time + 1;
    if (this.life_time >= 3) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_fx_pinkchargestar', FxPinkchargestar);

// obj_fx_pinksparkle (default sprite spr_bellsparkle, depth 0)
class FxPinksparkle extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_bellsparkle';
  }
  alarm0() {
    instance_destroy(this);
  }
  create() {
    this.image_index = irandom(2);
    this.alarm ??= []; this.alarm[0] = 7 + irandom(14);
  }
  step() {
    this.speed = this.speed * 0.75;
  }
}
defineObject('obj_fx_pinksparkle', FxPinksparkle);

// obj_audience_hitbox (default sprite spr_pixel_2x, depth 0, parent obj_regularbullet)
class AudienceHitbox extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_pixel_2x';
    this.mask_index = 'spr_pixel_2x';
  }
  create() {
    super.create?.();
    this.target = 4;
    this.damage = 100;
    if (i_ex('obj_pink_enemy')) {
        this.damage = O('obj_pink_enemy').damage;
    }
    this.element = 6;
    this.active = 1;
    this.life_time = 0;
    this.destroyonhit = 0;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.start_x = 0;
    this.start_y = 0;
    this.audience_y = 0;
    this.audience_sway = 0;
    this.audience_angle = 0;
    this.audience_hater = 0;
    this.audience_shoottime = 0;
    this.audience_popout = - 40;
    this.hater_popout = - 40;
    this.image_angle = 0;
    this.phase = 1;
    this.pattern_time = 0;
  }
  draw() {
    let _xx1, _color, _jump, _popout, _dir;
    draw_self(this);
    if (this.image_angle == 270) {
        _xx1 = 0;
        if (this.audience_hater == 0) {
            _color = 0xcccccc;
            _jump = 10;
            _popout = this.audience_popout;
        } else {
            _color = 0xdd1111;
            _jump = 5;
            _popout = this.hater_popout;
            if (_xx1 > 0) {
                _xx1 = _xx1 + 6;
            }
        }
        draw_sprite_ext('spr_dummyaudience', this.audience_hater, this.x, this.y, 1, 1, lengthdir_y(30, this.audience_angle) - 90, _color, 1);
        _dir = lengthdir_y(30, this.audience_y) + 45 - 90;
        draw_set_color(0xff6688);
        draw_line_width(this.x - 5, this.y + 4, this.x - 5 + lengthdir_y(10, _dir), this.y + 4 + lengthdir_x(10, _dir), 3);
    }
    if (this.image_angle == 0) {
        if (this.audience_hater == 0) {
            _color = 0xcccccc;
            _jump = 10;
            _popout = this.audience_popout;
        } else {
            _color = 0xdd1111;
            _jump = 5;
            _popout = this.hater_popout;
        }
        draw_sprite_ext('spr_dummyaudience', this.audience_hater, this.x, this.y, 1, 1, lengthdir_y(30, this.audience_angle), _color, 1);
        _dir = lengthdir_y(30, this.audience_y) + 45;
        draw_set_color(0xff6688);
        draw_line_width(this.x + 5, this.y + 4, this.x + 5 + lengthdir_x(10, _dir), this.y + 4 + lengthdir_y(10, _dir), 3);
    }
    if (this.image_angle == 90) {
        _xx1 = 0;
        if (this.audience_hater == 0) {
            _color = 0xcccccc;
            _jump = 10;
            _popout = this.audience_popout;
        } else {
            _color = 0xdd1111;
            _jump = 5;
            _popout = this.hater_popout;
            if (_xx1 > 0) {
                _xx1 = _xx1 + 6;
            }
        }
        draw_sprite_ext('spr_dummyaudience', this.audience_hater, this.x, this.y, 1, 1, lengthdir_y(30, this.audience_angle) + 90, _color, 1);
        _dir = lengthdir_y(30, this.audience_y) + 45 + 90;
        draw_set_color(0xff6688);
        draw_line_width(this.x + 5, this.y - 4, this.x + 5 + lengthdir_y(10, _dir), this.y - 4 + lengthdir_x(10, _dir), 3);
    }
  }
  step() {
    let _shot, _jump, _popout, _curtainpeek;
    super.step?.();
    switch (this.phase) {
      case 1:
        this.pattern_time = this.pattern_time + 1;
        this.audience_popout = this.audience_popout * 0.9;
        if (this.audience_popout > - 0.1 && this.audience_popout < 0.1) {
            this.audience_popout = 0;
        }
        this.hater_popout = this.hater_popout * 0.9;
        if (this.hater_popout > - 0.1 && this.hater_popout < 0.1) {
            this.hater_popout = 0;
        }
        if (this.pattern_time >= 20) {
            if (this.audience_hater == 0) {
                if (this.audience_shoottime > 0) {
                    this.audience_shoottime = this.audience_shoottime - 1;
                } else if (this.audience_shoottime == 0) {
                    _shot = instance_create_depth(this.x, this.y, this.depth - 2, 'obj_audienceheart');
                    _shot.speed = 1;
                    _shot.pattern_time = - irandom(4);
                    _shot.direction = this.image_angle + 90;
                    this.audience_shoottime = - 1;
                }
            }
        }
        if (this.pattern_time == 55) {
            if (this.audience_hater == 1) {
                _shot = instance_create_depth(this.x, this.y, this.depth - 6, 'obj_audiencehater');
                _shot.image_angle = lengthdir_y(30, this.audience_angle);
                _shot.image_angle = _shot.image_angle + this.image_angle;
                instance_destroy(this);
            }
        }
        if (this.pattern_time >= 60) {
            this.audience_popout = - 0.1;
            this.pattern_time = 0;
            this.phase = this.phase + 1;
        }
        break;
      case 2:
        this.pattern_time = this.pattern_time + 1;
        this.audience_popout = clamp(this.audience_popout * 1.25, - 40, 40);
        if (this.pattern_time >= 30) {
            this.audience_popout = 0;
            this.hater_popout = 0;
            instance_destroy(this);
        }
        break;
    }
    this.audience_y = this.audience_y + 18;
    if (this.audience_y >= 360) {
        this.audience_y = this.audience_y - 360;
    }
    this.audience_angle = this.audience_angle + this.audience_sway;
    if (this.audience_angle >= 360) {
        this.audience_angle = this.audience_angle - 360;
    }
    if (this.audience_hater == 0) {
        _jump = 10;
        _popout = this.audience_popout;
        _curtainpeek = 0;
    } else {
        _jump = 5;
        _popout = this.hater_popout;
        _curtainpeek = 6;
    }
    if (this.image_angle == 270) {
        this.x = this.start_x + Math.abs(lengthdir_y(_jump, this.audience_y)) + _popout;
        this.y = this.start_y;
    } else if (this.image_angle == 0) {
        this.x = this.start_x;
        this.y = this.start_y - Math.abs(lengthdir_y(_jump, this.audience_y)) - _popout;
    } else if (this.image_angle == 90) {
        this.x = this.start_x - Math.abs(lengthdir_y(_jump, this.audience_y)) - _popout;
        this.y = this.start_y;
    }
  }
}
defineObject('obj_audience_hitbox', AudienceHitbox);

