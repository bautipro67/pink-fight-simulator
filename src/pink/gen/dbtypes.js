// obj_dbulletcontroller's attack types 200-210 (Pink) (machine-translated from the Chapter 5 GML by tools/gen_pink.sh; edit tools/postfix.py, not this file)
/* eslint-disable */
import {
  S, choose, frac, global, instance_create, instance_create_depth, instance_destroy, instance_exists, irandom, lengthdir_x, lengthdir_y, objectClass, round, snd_play,
} from '../rt.js?v=20261119213904';
import {
  i_ex, scr_fire_bullet, scr_get_box,
} from '../common.js?v=20261119213904';
import {
  AF, EXIT, LOOP, O, T, W,
} from '../gml.js?v=20261119213904';

// !!! gml_Object_obj_dbulletcontroller_Alarm_4.gml has a decompiler WARNING: check the asm
// obj_dbulletcontroller (default sprite spr_grazemask, depth 0, parent obj_bulletgenparent)
class PinkTypes {
  type200() {
    let dir, xx, yy, num, d, slasher, i, attacktimer, quizReady, _maru, _batsu, xmod, shadowman_tommygun_manager, triangle_count, tempnum, _flip, _angle, _dist, choosey, choosex, shuriken, _lifetime, delay, _ratio, _dir, _x, _y, test, _side, angle, dist, a, _max, sinfact, sinebase, _spread, iii, __dir, _spd, _sameattacki, _smashcut, spring, scarecrow1, scarecrow2, scarecrow3, o, offset_last, bx, by, off, last_blue, bullet_offset, blue, shooter, ___x, ___y, _bullet_speed_modifier, _bullet_interval_modifier, _heart_tension_value, _d_mild, _s_mild, _d_medium, _s_medium, _d_spicy, _s_spicy, _d_beat, _d_conga, _s_conga, _d_conga_last, _hflip, _vflip, _binterval, _bspeed, _d_medmild, _s_medmild, _rside, _box_x, _box_y, _bul, _lane_distance, _bomb, _fill_bulletlist, _d_tuning, _s_tuning, _speed_multiplier, _speed_v, _speed_h, _speed_h1_final, _speed_h2_final, _speed_v_final, _speed_strays, _speed_bursts, _d_bursts, _delay, _speed_12, _speed_3, _diradd, _shot, _doki_queue, _doki_dist, _nextdelay, _speed_final, _shot_prev, _dir_prev, _spd_prev, _heartshot, _bdir, _blane, _bullet_scale, _shootdist, _lanebuldist, _the_value, _timeadd, _startdelay, _list_xy, _randompattern, _list_order, _xsign, _xoffset, _ysign, _yoffset, _xrotate, _yrotate, _box_xscale, _box_yscale, _pattern_speed_modifier, _node_dist_test, t70a, t70b, t70_bullet, t70rand, _purple_omega, _green_omega, _aqua_chainknife, _aqua_fanofknives, _aqua_knife_leafling, _aqua_knife_everything, _duck, _sethsupport, _step, fi, _rate, spread, tracktime, loc, do_dir, _words1, _words2, _newtimer;
    if (this.type == 200) {
        _bullet_speed_modifier = 1.3333333333333333;
        _bullet_interval_modifier = 1.25;
        _heart_tension_value = 1;
        if (this.made == 0) {
            this.made = 1;
            if (W('obj_heart', function (other) {
                this.sprite_index = 'spr_purpleheart';
                this.canmove = 0;
            }, this) === EXIT) return;
            if (W('obj_grazebox', function (other) {
                this.grazetimefactor = 0;
            }, this) === EXIT) return;
            if (W('obj_growtangle', function (other) {
                if (!T(i_ex('obj_purplecontrols'))) {
                    instance_create_depth(this.x, this.y, 4, 'obj_purplecontrols');
                }
                O('obj_purplecontrols').mode = 1;
                if (W(instance_create_depth(this.x + 200, this.y, this.depth - 5, 'obj_pink_battlemovement'), function (other) {
                    this.mode = 1;
                    this.air_time = 1;
                    this.sprite_index = 'spr_pink_ball';
                    this.image_speed = 1;
                    this.dest_x = other.x;
                    this.dest_y = other.y - 118;
                }, this) === EXIT) return EXIT;
            }, this) === EXIT) return;
            this.btimer_start = this.btimer;
            this.tension_value = 1;
            if (i_ex('obj_pink_enemy')) {
                this.difficulty = O('obj_pink_enemy').difficulty;
            }
            switch (this.difficulty) {
              case 0:
                this.tension_value = 1;
                _d_mild = 1.1;
                _s_mild = 0.75;
                _d_medium = 1;
                _s_medium = 0.9;
                _d_spicy = 0.95;
                _s_spicy = 1.3333333333333333;
                S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, 0, 1, _d_mild, _s_mild, 2, 1, _d_mild, _s_mild, 1, 1, _d_mild, _s_mild, 0, 1, _d_mild, _s_mild, 2, 1, 3.75, _s_mild, 7, - 1, _d_mild * 0.75, _s_mild * 0.9, 6, - 1, _d_mild * 0.75, _s_mild * 0.9, 7, - 1, _d_mild * 0.75, _s_mild * 0.9, 8, - 1, _d_mild * 0.75, _s_mild * 0.9, 7, - 1, _d_mild * 0.75, _s_mild * 0.9, 8, - 1, _d_mild * 0.75, _s_mild * 0.9, 7, - 1, 4.5, _s_mild * 0.9, 2.1, 1, _d_medium, _s_medium, 1.1, 1, _d_medium, _s_medium, 0.1, 1, _d_medium, _s_medium, 1.1, 1, _d_medium, _s_medium, 2.1, 1, _d_medium, _s_medium, 0.1, 1, _d_medium, _s_medium, 1.1, 1, _d_medium, _s_medium, 2.1, 1, _d_medium, _s_medium, 1.1, 1, 4, _s_medium, 7, - 1, 0, _s_spicy, 0, - 1, 0, _s_spicy, 2, - 1, _d_spicy, _s_spicy, 8, - 1, 0, _s_spicy, 1, - 1, 0, _s_spicy, 0, - 1, _d_spicy, _s_spicy, 7, - 1, 0, _s_spicy, 2, - 1, 0, _s_spicy, 0, - 1, _d_spicy, _s_spicy, 6, - 1, 0, _s_spicy, 1, - 1, 0, _s_spicy, 2, - 1, _d_spicy, _s_spicy, 7, - 1, 0, _s_spicy, 0, - 1, 0, _s_spicy, 2, - 1, _d_spicy, _s_spicy, 6, - 1, 0, _s_spicy, 2, - 1, 0, _s_spicy, 1, - 1, _d_spicy, _s_spicy, 7, - 1, 0, _s_spicy, 0, - 1, 0, _s_spicy, 2, - 1, _d_spicy, _s_spicy, 8, - 1, 0, _s_spicy, 1, - 1, 0, _s_spicy, 0, - 1, _d_spicy, _s_spicy, 7, - 1, 0, _s_spicy, 2, - 1, 0, _s_spicy, 0, - 1, _d_spicy, _s_spicy, 8, - 1, 0, _s_spicy, 0, - 1, 0, _s_spicy, 1, - 1, _d_spicy, _s_spicy, 7, - 1, 0, _s_spicy, 0, - 1, 0, _s_spicy, 2, - 1, _d_spicy, _s_spicy, 6, - 1, 0, _s_spicy, 2, - 1, 0, _s_spicy, 1, - 1, 0.01, _s_spicy);
                break;
              case 1:
                this.tension_value = 1;
                _d_beat = 0.95;
                S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, 7, 1, 0, 0.9, 0, 1, 0, 0.9, 2, 1, _d_beat, 0.9, 8, - 1, 0, 0.9, 0, - 1, 0, 0.9, 1, - 1, _d_beat, 0.9, 7, 1, 0, 0.9, 0, 1, 0, 0.9, 2, 1, _d_beat, 0.9, 6, - 1, 0, 0.9, 1, - 1, 0, 0.9, 2, - 1, _d_beat, 0.9, 7, 1, 0, 0.9, 0, 1, 0, 0.9, 2, 1, _d_beat, 0.9, 8, - 1, 0, 0.9, 0, - 1, 0, 0.9, 1, - 1, _d_beat, 0.9, 7, 1, 0, 0.9, 0, 1, 0, 0.9, 2, 1, _d_beat, 0.9, 6, - 1, 0, 0.9, 1, - 1, 0, 0.9, 2, - 1, 3, 0.9, 2, 1, 0, 0.9, 0.1, - 1, 0.5, 0.9, 2, 1, 0, 0.9, 0, - 1, 1, 0.9, 0, 1, 0, 0.9, 1.1, - 1, 0.5, 0.9, 0, 1, 0, 0.9, 1, - 1, 1, 0.9, 2.1, 1, 0, 0.9, 0, - 1, 0.5, 0.9, 2, 1, 0, 0.9, 0, - 1, 1, 0.9, 1.1, 1, 0, 0.9, 2, - 1, 0.5, 0.9, 1, 1, 0, 0.9, 2, - 1, 1, 0.9, 0.1, 1, 0, 0.9, 0, - 1, 0.5, 0.9, 0, 1, 0, 0.9, 0, - 1, 1, 0.9, 2, 1, 0, 0.9, 1.1, - 1, 0.5, 0.9, 2, 1, 0, 0.9, 1, - 1, 1, 0.9, 1, 1, 0, 0.9, 2.1, - 1, 0.5, 0.9, 1, 1, 0, 0.9, 2, - 1, 1, 0.9, 2, 1, 0, 0.9, 0.1, - 1, 0.5, 0.9, 2, 1, 0, 0.9, 0, - 1, 1, 0.9, 1, 1, 0, 0.9, 1.1, - 1, 0.5, 0.9, 1, 1, 0, 0.9, 1, - 1, 3, 0.9, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 3, 1, 0, 1, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 0.05, 1.5, 0, 1, 0.05, 1.5, 2, - 1, 5, 1.5);
                break;
              case 2:
                this.tension_value = 1;
                _d_conga = 0.667;
                _s_conga = 1.1;
                i = 0;
                for (let _r1826 = 0, _n1826 = Math.trunc(3); _r1826 < _n1826; _r1826++) {
                    if (i < 2) {
                        _d_conga_last = _d_conga * 1.3333333333333333;
                    } else {
                        _d_conga_last = 0.01;
                    }
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, 1, 1, _d_conga * 0.6666666666666666, _s_conga, 7, 1, _d_conga * 0.6666666666666666, _s_conga, 7, 1, _d_conga * 0.6666666666666666, _s_conga, 1, 1, _d_conga * 1.3333333333333333, _s_conga, 4, 1, 0, 1, 0, - 1, _d_conga * 0.6666666666666666, _s_conga, 6, - 1, _d_conga * 0.6666666666666666, _s_conga, 6, - 1, _d_conga * 0.6666666666666666, _s_conga, 0, - 1, _d_conga * 1.3333333333333333, _s_conga, 1, 1, _d_conga * 0.6666666666666666, _s_conga, 7, 1, _d_conga * 0.6666666666666666, _s_conga, 7, 1, _d_conga * 0.6666666666666666, _s_conga, 1, 1, _d_conga * 1.3333333333333333, _s_conga, 2, - 1, _d_conga * 0.6666666666666666, _s_conga, 8, - 1, _d_conga * 0.6666666666666666, _s_conga, 8, - 1, _d_conga * 0.6666666666666666, _s_conga, 2, - 1, _d_conga_last, _s_conga);
                    _d_conga = _d_conga * 0.875;
                    _s_conga = _s_conga + 0.16;
                    i = i + 1;
                }
                break;
              case 3:
                this.tension_value = 1;
                _hflip = choose(1, - 1);
                _vflip = choose(0, 2);
                _binterval = 0.75;
                _bspeed = 1;
                S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, Math.abs(_vflip - 2) + 0.1, 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 0), - 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 1), 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 2) + 0.1, - 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 0), 1 * _hflip, _binterval * 0.5, _bspeed, 4, 1, _binterval * 0.5, 1, Math.abs(_vflip - 2), - 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 1) + 0.1, 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 0), - 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 2), 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 1) + 0.1, - 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 2), 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 0), - 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 1) + 0.1, 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 0), - 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 1), 1 * _hflip, _binterval * 0.5, _bspeed, 4, 1, _binterval * 0.5, 1, Math.abs(_vflip - 2) + 0.1, - 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 0), 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 2), - 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 1) + 0.1, 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 0), - 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 2), 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 0) + 0.1, - 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 1) + 0.1, 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 2), - 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 0), 1 * _hflip, _binterval * 0.5, _bspeed, 5, 1, _binterval * 0.5, 1, Math.abs(_vflip - 2) + 0.1, - 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 1), 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 0), - 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 2) + 0.1, 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 1), - 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 2), 1 * _hflip, _binterval, _bspeed, Math.abs(_vflip - 0) + 0.1, - 1 * _hflip, 11.5, _bspeed);
                break;
              default:
                this.tension_value = 1;
                _d_mild = 1.1;
                _s_mild = 0.75;
                _d_medmild = 1.025;
                _s_medmild = 0.85;
                _d_medium = 0.98;
                _s_medium = 1;
                _d_spicy = 0.95;
                _s_spicy = 1.3333333333333333;
                this._rand ??= []; AF(this._rand, 0); this._rand[0] = choose(0, 2);
                this._rand ??= []; AF(this._rand, 1); this._rand[1] = choose(0, 2);
                this._rand ??= []; AF(this._rand, 2); this._rand[2] = choose(0, 2);
                this._rand ??= []; AF(this._rand, 3); this._rand[3] = choose(0, 2);
                this._rand ??= []; AF(this._rand, 4); this._rand[4] = choose(0, 2);
                _rside = choose(- 1, 1);
                S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, Math.abs(0 - this._rand[0]) + 0.1, - 1 * _rside, _d_mild, _s_mild, Math.abs(1 - this._rand[0]) + 0.1, - 1 * _rside, _d_mild, _s_mild, Math.abs(2 - this._rand[0]) + 0.1, - 1 * _rside, _d_mild, _s_mild, Math.abs(1 - this._rand[0]) + 0.1, - 1 * _rside, _d_mild, _s_mild, Math.abs(choose(0, 2) - this._rand[0]) + 0.1, - 1 * _rside, 3.75, _s_mild);
                if (irandom(1) == 0) {
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, Math.abs(1 - this._rand[1]) + 0.1, 1 * _rside, _d_medmild, _s_medmild, Math.abs(0 - this._rand[1]) + 0.1, 1 * _rside, _d_medmild, _s_medmild, Math.abs(1 - this._rand[1]) + 0.1, 1 * _rside, _d_medmild, _s_medmild, Math.abs(2 - this._rand[1]) + 0.1, 1 * _rside, _d_medmild, _s_medmild, Math.abs(1 - this._rand[1]) + 0.1, 1 * _rside, _d_medmild, _s_medmild, Math.abs(2 - this._rand[1]) + 0.1, 1 * _rside, _d_medmild, _s_medmild, Math.abs(1 - this._rand[1]) + 0.1, 1 * _rside, 4.5, _s_medmild);
                } else {
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, Math.abs(1 - this._rand[1]) + 0.1, 1 * _rside, _d_medmild, _s_medmild, Math.abs(0 - this._rand[1]) + 0.1, 1 * _rside, _d_medmild, _s_medmild, Math.abs(1 - this._rand[1]) + 0.1, 1 * _rside, _d_medmild, _s_medmild, Math.abs(0 - this._rand[1]) + 0.1, 1 * _rside, _d_medmild, _s_medmild, Math.abs(1 - this._rand[1]) + 0.1, 1 * _rside, _d_medmild, _s_medmild, Math.abs(2 - this._rand[1]) + 0.1, 1 * _rside, _d_medmild, _s_medmild, Math.abs(1 - this._rand[1]) + 0.1, 1 * _rside, 4.5, _s_medmild);
                }
                if (irandom(1) == 0) {
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, Math.abs(1 - this._rand[2]) + 0.1, - 1 * _rside, _d_medium, _s_medium, Math.abs(0 - this._rand[2]) + 0.1, - 1 * _rside, _d_medium, _s_medium, Math.abs(2 - this._rand[2]) + 0.1, - 1 * _rside, _d_medium, _s_medium, Math.abs(1 - this._rand[2]) + 0.1, - 1 * _rside, _d_medium, _s_medium, Math.abs(0 - this._rand[2]) + 0.1, - 1 * _rside, _d_medium, _s_medium, Math.abs(1 - this._rand[2]) + 0.1, - 1 * _rside, _d_medium, _s_medium, Math.abs(2 - this._rand[2]) + 0.1, - 1 * _rside, 4, _s_medium);
                } else {
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, Math.abs(1 - this._rand[2]) + 0.1, - 1 * _rside, _d_medium, _s_medium, Math.abs(0 - this._rand[2]) + 0.1, - 1 * _rside, _d_medium, _s_medium, Math.abs(1 - this._rand[2]) + 0.1, - 1 * _rside, _d_medium, _s_medium, Math.abs(2 - this._rand[2]) + 0.1, - 1 * _rside, _d_medium, _s_medium, Math.abs(0 - this._rand[2]) + 0.1, - 1 * _rside, _d_medium, _s_medium, Math.abs(1 - this._rand[2]) + 0.1, - 1 * _rside, _d_medium, _s_medium, Math.abs(2 - this._rand[2]) + 0.1, - 1 * _rside, 4, _s_medium);
                }
                S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, Math.abs(1 - this._rand[3]) + 6, 1 * _rside, 0, _s_spicy, Math.abs(0 - this._rand[3]), 1 * _rside, 0, _s_spicy, Math.abs(2 - this._rand[3]), 1 * _rside, _d_spicy, _s_spicy, Math.abs(2 - this._rand[3]) + 6, 1 * _rside, 0, _s_spicy, Math.abs(1 - this._rand[3]), 1 * _rside, 0, _s_spicy, Math.abs(0 - this._rand[3]), 1 * _rside, _d_spicy, _s_spicy, Math.abs(1 - this._rand[3]) + 6, 1 * _rside, 0, _s_spicy, Math.abs(2 - this._rand[3]), 1 * _rside, 0, _s_spicy, Math.abs(0 - this._rand[3]), 1 * _rside, _d_spicy, _s_spicy, Math.abs(0 - this._rand[3]) + 6, 1 * _rside, 0, _s_spicy, Math.abs(1 - this._rand[3]), 1 * _rside, 0, _s_spicy, Math.abs(2 - this._rand[3]), 1 * _rside, _d_spicy, _s_spicy, Math.abs(1 - this._rand[3]) + 6, 1 * _rside, 0, _s_spicy, Math.abs(0 - this._rand[3]), 1 * _rside, 0, _s_spicy, Math.abs(2 - this._rand[3]), 1 * _rside, _d_spicy, _s_spicy, Math.abs(this._rand[4] - this._rand[3]) + 6, 1 * _rside, 0, _s_spicy, Math.abs((this._rand[4] + 1) % 3 - this._rand[3]), 1 * _rside, 0, _s_spicy, Math.abs((this._rand[4] + 2) % 3 - this._rand[3]), 1 * _rside, _d_spicy, _s_spicy, Math.abs(1 - this._rand[3]) + 6, 1 * _rside, 0, _s_spicy, Math.abs(2 - this._rand[3]), 1 * _rside, 0, _s_spicy, Math.abs(0 - this._rand[3]), 1 * _rside, _d_spicy, _s_spicy, Math.abs(2 - this._rand[3]) + 6, 1 * _rside, 0, _s_spicy, Math.abs(0 - this._rand[3]), 1 * _rside, 0, _s_spicy, Math.abs(1 - this._rand[3]), 1 * _rside, _d_spicy, _s_spicy, Math.abs(1 - this._rand[3]) + 6, 1 * _rside, 0, _s_spicy, Math.abs(0 - this._rand[3]), 1 * _rside, 0, _s_spicy, Math.abs(2 - this._rand[3]), 1 * _rside, _d_spicy, _s_spicy);
                break;
            }
            global.turntimer = 70;
            i = 0;
            for (let _r4063 = 0, _n4063 = Math.trunc(Math.floor(S.ds_list_size(O('obj_purplecontrols').ds_bullet_list) / 4)); _r4063 < _n4063; _r4063++) {
                global.turntimer = global.turntimer + round(0.5 + 13 * S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 2 + i) / _bullet_interval_modifier);
                i = i + 4;
            }
        }
        _box_x = S.camera_get_view_x(0) + 320;
        _box_y = S.camera_get_view_y(0) + 240;
        if (instance_exists('obj_growtangle')) {
            _box_x = scr_get_box(4);
            _box_y = scr_get_box(5);
        }
        if (instance_exists('obj_purplecontrols')) {
            if (T(S.ds_exists(O('obj_purplecontrols').ds_bullet_list, 2))) {
                do {
                    if (this.btimer >= this.btimer_start + 15) {
                        if (S.ds_list_size(O('obj_purplecontrols').ds_bullet_list) > 0) {
                            this.btimer = this.btimer - round(0.5 + 13 * S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 2) / _bullet_interval_modifier);
                            if (S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0) < 3) {
                                _side = S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 1);
                                _bul = scr_fire_bullet(this, _box_x + _side * 416, _box_y + Math.floor(S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0) - 1) * 56, 'obj_pinkcatbullet', 90 + _side * 90, 8 * S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 3) * _bullet_speed_modifier);
                                if (S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 3) >= 1.5) {
                                    _bul.spin_radius = 1.5;
                                }
                                i = 0;
                                for (let _r4331 = 0, _n4331 = Math.trunc(frac(S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0)) * 10); _r4331 < _n4331; _r4331++) {
                                    i = i + 1;
                                    _bul = scr_fire_bullet(this, _box_x + _side * (416 - i * 72 * S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 3)), _box_y + Math.floor(S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0) - 1) * 56, 'obj_dokiheart', 90 + _side * 90, 8 * S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 3) * _bullet_speed_modifier);
                                    _bul.tension_value = this.tension_value;
                                    _bul.image_xscale = 1.5;
                                    _bul.image_yscale = 1.5;
                                    _bul.visual_scale = 0.6666666666666666;
                                }
                            } else if (S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0) >= 6 && S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0) <= 8) {
                                _side = S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 1);
                                _bul = scr_fire_bullet(this, _box_x + _side * 416, _box_y + (S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0) - 7) * 56, 'obj_dokiheart', 90 + _side * 90, 8 * S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 3) * _bullet_speed_modifier);
                                _bul.tension_value = this.tension_value;
                                _bul.image_xscale = 2.5;
                                _bul.image_yscale = 2.5;
                                _bul.visual_scale = 0.4;
                            } else {
                                switch (S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0)) {
                                  case 3:
                                    if (W('obj_pink_battlemovement', function (other) {
                                        this.mode = 2;
                                        this.phase = 0;
                                    }, this) === EXIT) return;
                                    break;
                                  case 4:
                                    if (W('obj_pink_battlemovement', function (other) {
                                        this.mode = 3;
                                        this.phase = 0;
                                    }, this) === EXIT) return;
                                    break;
                                  case 5:
                                    if (W('obj_pink_battlemovement', function (other) {
                                        this.mode = 4;
                                        this.phase = 0;
                                    }, this) === EXIT) return;
                                    break;
                                }
                            }
                            S.ds_list_delete(O('obj_purplecontrols').ds_bullet_list, 0);
                            S.ds_list_delete(O('obj_purplecontrols').ds_bullet_list, 0);
                            S.ds_list_delete(O('obj_purplecontrols').ds_bullet_list, 0);
                            S.ds_list_delete(O('obj_purplecontrols').ds_bullet_list, 0);
                        }
                    }
                    if (S.ds_list_size(O('obj_purplecontrols').ds_bullet_list) < 4) {
                        S.ds_list_clear(O('obj_purplecontrols').ds_bullet_list);
                        return;
                    }
                } while ((!(this.btimer < this.btimer_start + 15)) && LOOP('Dbulletcontroller#1'));

            }
        }
    }
  }
  type201() {
    let dir, xx, yy, num, d, slasher, i, attacktimer, quizReady, _maru, _batsu, xmod, shadowman_tommygun_manager, triangle_count, tempnum, _flip, _angle, _dist, choosey, choosex, shuriken, _lifetime, delay, _ratio, _dir, _x, _y, test, _side, angle, dist, a, _max, sinfact, sinebase, _spread, iii, __dir, _spd, _sameattacki, _smashcut, spring, scarecrow1, scarecrow2, scarecrow3, o, offset_last, bx, by, off, last_blue, bullet_offset, blue, shooter, ___x, ___y, _bullet_speed_modifier, _bullet_interval_modifier, _heart_tension_value, _d_mild, _s_mild, _d_medium, _s_medium, _d_spicy, _s_spicy, _d_beat, _d_conga, _s_conga, _d_conga_last, _hflip, _vflip, _binterval, _bspeed, _d_medmild, _s_medmild, _rside, _box_x, _box_y, _bul, _lane_distance, _bomb, _fill_bulletlist, _d_tuning, _s_tuning, _speed_multiplier, _speed_v, _speed_h, _speed_h1_final, _speed_h2_final, _speed_v_final, _speed_strays, _speed_bursts, _d_bursts, _delay, _speed_12, _speed_3, _diradd, _shot, _doki_queue, _doki_dist, _nextdelay, _speed_final, _shot_prev, _dir_prev, _spd_prev, _heartshot, _bdir, _blane, _bullet_scale, _shootdist, _lanebuldist, _the_value, _timeadd, _startdelay, _list_xy, _randompattern, _list_order, _xsign, _xoffset, _ysign, _yoffset, _xrotate, _yrotate, _box_xscale, _box_yscale, _pattern_speed_modifier, _node_dist_test, t70a, t70b, t70_bullet, t70rand, _purple_omega, _green_omega, _aqua_chainknife, _aqua_fanofknives, _aqua_knife_leafling, _aqua_knife_everything, _duck, _sethsupport, _step, fi, _rate, spread, tracktime, loc, do_dir, _words1, _words2, _newtimer;
    if (this.type == 201) {
        if (this.made == 0) {
            this.made = 1;
            this.ammo = 4;
            this.grid_x = irandom(3);
            this.grid_y = irandom(3);
            this.pattern_variant = irandom(3);
            if (W('obj_heart', function (other) {
                this.sprite_index = 'spr_purpleheart';
                this.canmove = 0;
            }, this) === EXIT) return;
            if (W('obj_growtangle', function (other) {
                if (!T(i_ex('obj_purplecontrols'))) {
                    instance_create_depth(this.x, this.y, 4, 'obj_purplecontrols');
                }
                O('obj_purplecontrols').mode = 2;
            }, this) === EXIT) return;
            global.turntimer = 155;
        }
        _box_x = S.camera_get_view_x(0) + 320;
        _box_y = S.camera_get_view_y(0) + 240;
        if (instance_exists('obj_growtangle')) {
            _box_x = scr_get_box(4);
            _box_y = scr_get_box(5);
        }
        if (this.ammo > 0) {
            if (this.btimer >= 6) {
                _lane_distance = 40;
                this.ammo = this.ammo - 1;
                this.btimer = 0;
                snd_play('snd_whip_throw_only');
                _bomb = instance_create(_box_x - _lane_distance * 1.5 + this.grid_x * _lane_distance, _box_y - _lane_distance * 1.5 + this.grid_y * _lane_distance, 'obj_fusebomb');
                _bomb.fuse_time = 120 + this.ammo * 2;
                _bomb.grid_x = this.grid_x;
                _bomb.grid_y = this.grid_y;
                switch (irandom(1)) {
                  case 1:
                    if (this.pattern_variant < 2) {
                        this.grid_x = this.grid_x + 1;
                        this.grid_y = this.grid_y + 1;
                    } else {
                        this.grid_x = this.grid_x - 1;
                        this.grid_y = this.grid_y + 1;
                    }
                    break;
                  default:
                    switch (this.pattern_variant) {
                      case 0:
                        this.grid_x = this.grid_x + 1;
                        break;
                      case 1:
                        this.grid_y = this.grid_y + 1;
                        break;
                      case 2:
                        this.grid_x = this.grid_x - 1;
                        break;
                      default:
                        this.grid_y = this.grid_y + 1;
                    }
                }
                if (this.grid_x >= 4) {
                    this.grid_x = this.grid_x - 4;
                } else if (this.grid_x < 0) {
                    this.grid_x = this.grid_x + 4;
                }
                if (this.grid_y >= 4) {
                    this.grid_y = this.grid_y - 4;
                } else if (this.grid_y < 0) {
                    this.grid_y = this.grid_y + 4;
                }
            }
        }
    }
  }
  type210() {
    let dir, xx, yy, num, d, slasher, i, attacktimer, quizReady, _maru, _batsu, xmod, shadowman_tommygun_manager, triangle_count, tempnum, _flip, _angle, _dist, choosey, choosex, shuriken, _lifetime, delay, _ratio, _dir, _x, _y, test, _side, angle, dist, a, _max, sinfact, sinebase, _spread, iii, __dir, _spd, _sameattacki, _smashcut, spring, scarecrow1, scarecrow2, scarecrow3, o, offset_last, bx, by, off, last_blue, bullet_offset, blue, shooter, ___x, ___y, _bullet_speed_modifier, _bullet_interval_modifier, _heart_tension_value, _d_mild, _s_mild, _d_medium, _s_medium, _d_spicy, _s_spicy, _d_beat, _d_conga, _s_conga, _d_conga_last, _hflip, _vflip, _binterval, _bspeed, _d_medmild, _s_medmild, _rside, _box_x, _box_y, _bul, _lane_distance, _bomb, _fill_bulletlist, _d_tuning, _s_tuning, _speed_multiplier, _speed_v, _speed_h, _speed_h1_final, _speed_h2_final, _speed_v_final, _speed_strays, _speed_bursts, _d_bursts, _delay, _speed_12, _speed_3, _diradd, _shot, _doki_queue, _doki_dist, _nextdelay, _speed_final, _shot_prev, _dir_prev, _spd_prev, _heartshot, _bdir, _blane, _bullet_scale, _shootdist, _lanebuldist, _the_value, _timeadd, _startdelay, _list_xy, _randompattern, _list_order, _xsign, _xoffset, _ysign, _yoffset, _xrotate, _yrotate, _box_xscale, _box_yscale, _pattern_speed_modifier, _node_dist_test, t70a, t70b, t70_bullet, t70rand, _purple_omega, _green_omega, _aqua_chainknife, _aqua_fanofknives, _aqua_knife_leafling, _aqua_knife_everything, _duck, _sethsupport, _step, fi, _rate, spread, tracktime, loc, do_dir, _words1, _words2, _newtimer;
    if (this.type == 210) {
        if (this.made == 0) {
            this.made = 1;
            _node_dist_test = 54;
            if (W('obj_heart', function (other) {
                this.sprite_index = 'spr_purpleheart';
                this.canmove = 0;
            }, this) === EXIT) return;
            if (W('obj_growtangle', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            if (!T(i_ex('obj_purplecontrols'))) {
                instance_create_depth(this.x, this.y, 4, 'obj_purplecontrols');
            }
            O('obj_purplecontrols').mode = 8;
            O('obj_purplecontrols').difficulty = this.difficulty;
            global.turntimer = 1000;
        }
    }
  }
  type202() {
    let dir, xx, yy, num, d, slasher, i, attacktimer, quizReady, _maru, _batsu, xmod, shadowman_tommygun_manager, triangle_count, tempnum, _flip, _angle, _dist, choosey, choosex, shuriken, _lifetime, delay, _ratio, _dir, _x, _y, test, _side, angle, dist, a, _max, sinfact, sinebase, _spread, iii, __dir, _spd, _sameattacki, _smashcut, spring, scarecrow1, scarecrow2, scarecrow3, o, offset_last, bx, by, off, last_blue, bullet_offset, blue, shooter, ___x, ___y, _bullet_speed_modifier, _bullet_interval_modifier, _heart_tension_value, _d_mild, _s_mild, _d_medium, _s_medium, _d_spicy, _s_spicy, _d_beat, _d_conga, _s_conga, _d_conga_last, _hflip, _vflip, _binterval, _bspeed, _d_medmild, _s_medmild, _rside, _box_x, _box_y, _bul, _lane_distance, _bomb, _fill_bulletlist, _d_tuning, _s_tuning, _speed_multiplier, _speed_v, _speed_h, _speed_h1_final, _speed_h2_final, _speed_v_final, _speed_strays, _speed_bursts, _d_bursts, _delay, _speed_12, _speed_3, _diradd, _shot, _doki_queue, _doki_dist, _nextdelay, _speed_final, _shot_prev, _dir_prev, _spd_prev, _heartshot, _bdir, _blane, _bullet_scale, _shootdist, _lanebuldist, _the_value, _timeadd, _startdelay, _list_xy, _randompattern, _list_order, _xsign, _xoffset, _ysign, _yoffset, _xrotate, _yrotate, _box_xscale, _box_yscale, _pattern_speed_modifier, _node_dist_test, t70a, t70b, t70_bullet, t70rand, _purple_omega, _green_omega, _aqua_chainknife, _aqua_fanofknives, _aqua_knife_leafling, _aqua_knife_everything, _duck, _sethsupport, _step, fi, _rate, spread, tracktime, loc, do_dir, _words1, _words2, _newtimer;
    if (this.type == 202) {
        if (!T(i_ex('obj_growtangle'))) {
            return;
        }
        _fill_bulletlist = false;
        if (this.made == 0) {
            this.made = 1;
            this.phase = 0;
            this.life_time = 0;
            this.pattern_phase = 0;
            if (W('obj_heart', function (other) {
                this.sprite_index = 'spr_purpleheart';
                this.canmove = 0;
            }, this) === EXIT) return;
            if (W('obj_grazebox', function (other) {
                this.grazetimefactor = 0;
            }, this) === EXIT) return;
            if (W('obj_growtangle', function (other) {
                instance_create_depth(this.x, this.y, 4, 'obj_purplecontrols');
                O('obj_purplecontrols').mode = 3;
                O('obj_purplecontrols').lane_x = 0;
                O('obj_purplecontrols').lane_y = 0;
                if (other.difficulty == 1) {
                    if (W('obj_pink_battlemovement', function (other) {
                        instance_destroy(this);
                    }, this) === EXIT) return EXIT;
                    if (W(instance_create_depth(this.x + 200, this.y, this.depth - 5, 'obj_pink_battlemovement'), function (other) {
                        this.mode = 1;
                        this.air_time = 1;
                        this.sprite_index = 'spr_pink_ball';
                        this.image_speed = 1;
                        this.dest_x = other.x;
                        this.dest_y = other.y - 118;
                    }, this) === EXIT) return EXIT;
                }
            }, this) === EXIT) return;
            instance_create_depth(this.x, this.y, 200, 'obj_purplebg');
            this.btimer2 = - 210;
            this.pattern_dir = irandom(3) * 90;
            this.box_v_stable = S.camera_get_view_y(0) + 240;
            if (instance_exists('obj_growtangle')) {
                this.box_v_stable = scr_get_box(5);
            }
            if (i_ex('obj_pink_enemy')) {
                this.difficulty = O('obj_pink_enemy').difficulty;
            }
            _fill_bulletlist = true;
            if (this.difficulty == 1 || this.difficulty == 0) {
                switch (this.difficulty) {
                  case 0:
                  case 2:
                    if (W('obj_purplecontrols', function (other) {
                        this.can_spin = false;
                    }, this) === EXIT) return;
                    if (W('obj_purplebg', function (other) {
                        this.visible = false;
                    }, this) === EXIT) return;
                    break;
                  case 1:
                    if (W('obj_purplecontrols', function (other) {
                        this.can_spin = false;
                    }, this) === EXIT) return;
                    global.turntimer = 700;
                    this.btimer = - 180;
                    this.ammo = 6;
                    break;
                }
            }
        }
        if (this.btimer == - 173) {
            if (W(instance_create_depth(S.camera_get_view_x(0) + 32, scr_get_box(5) + 96, 10, 'obj_huge_anime_face'), function (other) {
                this.difficulty = other.difficulty;
            }, this) === EXIT) return;
        }
        if (W('obj_purplecontrols', function (other) {
            if (this.rotate_speed == 0) {
                other.box_v_stable = scr_get_box(5);
            }
            if (other.difficulty == 1 && S.ds_list_size(this.ds_bullet_list) < 4 && other.ammo > 0) {
                other.ammo = other.ammo - 1;
                _fill_bulletlist = true;
            }
        }, this) === EXIT) return;
        if (T(_fill_bulletlist)) {
            switch (this.difficulty) {
              case 0:
                _d_tuning = 0.95;
                _s_tuning = 1.1;
                _speed_multiplier = 1;
                if (global.flag[1914] == 2) {
                    _speed_multiplier = 1.225;
                    _d_tuning = _d_tuning / _speed_multiplier;
                    _s_tuning = _s_tuning * _speed_multiplier;
                }
                _speed_v = _s_tuning * 1;
                _speed_h = _speed_v * 1.15;
                _speed_h1_final = 1.5;
                _speed_h2_final = 2;
                _speed_v_final = 2.5;
                S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, 2, 270, _d_tuning * 0.525, _speed_v * 1.2, 1, 270, _d_tuning * 0.525, _speed_v * 1.2, 0, 270, _d_tuning * 0.8, _speed_v * 1.2, 1, 180, _d_tuning * 0.45, _speed_h * 1.25, 7, 180, 0, _speed_h * 1.25, 4, 180, _d_tuning * 0.9, _speed_h * 1.25, 6, 90, 0, _speed_v * 1.4, 2, 90, _d_tuning * 0.45, _speed_v * 1.4, 1, 90, _d_tuning * 0.45, _speed_v * 1.4, 8, 90, 0, _speed_v * 1.4, 0, 90, _d_tuning * 0.8, _speed_v * 1.4, 1, 0, _d_tuning * 0.15, _speed_h * 1.4, 7, 0, _d_tuning * 0.25, _speed_h * 1.4, 4, 0, _d_tuning * 0.5, _speed_h * 1.4, 1, 90, _d_tuning * 0.9, _speed_v * 1.3, 6, 180, 0, _speed_v * 0.6666666666666666, 1, 180, _d_tuning * 0.9, _speed_v * 0.6666666666666666, 6, 270, 0, _speed_v * 0.6666666666666666, 1, 270, _d_tuning * 0.9, _speed_v * 0.6666666666666666, 6, 0, 0, _speed_v * 0.6666666666666666, 1, 0, _d_tuning * 1.7, _speed_v * 0.6666666666666666, 4, 0, _d_tuning * 0.15, _speed_h * _speed_h1_final, 4, 0, _d_tuning * 0.15, _speed_h * (_speed_h1_final * 0.8571428571428571 + _speed_h2_final * 0.14285714285714285), 4, 0, _d_tuning * 0.15, _speed_h * (_speed_h1_final * 0.7142857142857143 + _speed_h2_final * 0.2857142857142857), 4, 0, _d_tuning * 0.05, _speed_h * (_speed_h1_final * 0.5714285714285714 + _speed_h2_final * 0.42857142857142855), 0, 90, 0, _speed_v * _speed_v_final, 0, 270, 0, _speed_v * _speed_v_final, 4, 0, _d_tuning * 0.05, _speed_h * (_speed_h1_final * 0.42857142857142855 + _speed_h2_final * 0.5714285714285714), 0, 90, 0, _speed_v * _speed_v_final, 0, 270, 0, _speed_v * _speed_v_final, 4, 0, _d_tuning * 0.05, _speed_h * (_speed_h1_final * 0.2857142857142857 + _speed_h2_final * 0.7142857142857143), 0, 90, 0, _speed_v * _speed_v_final, 0, 270, 0, _speed_v * _speed_v_final, 4, 0, _d_tuning * 0.05, _speed_h * (_speed_h1_final * 0.14285714285714285 + _speed_h2_final * 0.8571428571428571), 0, 90, 0, _speed_v * _speed_v_final, 0, 270, 0, _speed_v * _speed_v_final, 4, 0, _d_tuning * 0.05, _speed_h * _speed_h2_final, 0, 90, 0, _speed_v * _speed_v_final, 0, 270, 99, _speed_v * _speed_v_final);
                global.turntimer = Math.floor(0.5 + 385 / _speed_multiplier);
                this.btimer = 32;
                break;
              case 2:
                if (W('obj_purplecontrols', function (other) {
                    this.can_spin = false;
                }, this) === EXIT) return;
                if (W('obj_purplebg', function (other) {
                    this.visible = false;
                }, this) === EXIT) return;
                _d_tuning = 0.95;
                _s_tuning = 1.1;
                _speed_multiplier = 1;
                if (global.flag[1914] == 2) {
                    _speed_multiplier = 1.1666666666666667;
                    _d_tuning = _d_tuning / _speed_multiplier;
                    _s_tuning = _s_tuning * _speed_multiplier;
                }
                _speed_v = _s_tuning * 1;
                _speed_h = _speed_v * 1.2;
                _speed_strays = 1.4;
                _speed_bursts = 1.65;
                _d_bursts = 0.12;
                S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, 0, 270, _d_tuning * 0.5, _speed_v * _speed_strays, 1, 270, _d_tuning * 0.25, _speed_v * _speed_strays, 2, 0, 0, _speed_h * _speed_strays, 8, 270, _d_tuning * 0.25, _speed_v * _speed_strays, 2, 270, _d_tuning * 0.25, _speed_v * _speed_strays, 1, 0, _d_tuning * 0.25, _speed_h * _speed_strays, 7, 0, 0, _speed_h * _speed_strays, 0, 90, _d_tuning * 0.25, _speed_v * _speed_strays, 0, 0, _d_tuning * 0.25, _speed_h * _speed_strays, 1, 90, _d_tuning * 0.25, _speed_v * _speed_strays, 7, 90, 0, _speed_v * _speed_strays, 2, 180, _d_tuning * 0.25, _speed_h * _speed_strays, 2, 90, _d_tuning * 0.25, _speed_v * _speed_strays, 1, 180, _d_tuning * 0.25, _speed_h * _speed_strays, 6, 180, _d_tuning * 0.25, _speed_h * _speed_strays, 0, 180, _d_tuning * 0.5, _speed_h * _speed_strays, 1, 0, 0, _speed_h * _speed_bursts, 1, 180, _d_tuning * _d_bursts, _speed_h * _speed_bursts, 1, 0, 0, _speed_h * _speed_bursts, 1, 180, _d_tuning * _d_bursts, _speed_h * _speed_bursts, 1, 0, 0, _speed_h * _speed_bursts, 1, 180, _d_tuning * 0.5, _speed_h * _speed_bursts, choose(6, 8), choose(90, 270), 0, _speed_v * _speed_bursts, 1, 90, 0, _speed_v * _speed_bursts, 1, 270, _d_tuning * _d_bursts, _speed_v * _speed_bursts, 1, 90, 0, _speed_v * _speed_bursts, 1, 270, _d_tuning * _d_bursts, _speed_v * _speed_bursts, 1, 90, 0, _speed_v * _speed_bursts, 1, 270, 99, _speed_v * _speed_bursts);
                global.turntimer = Math.floor(0.5 + 200 / _speed_multiplier);
                this.btimer = 32;
                break;
              case 1:
                _delay = 0.3;
                _speed_v = 0.9;
                _speed_h = 1;
                _speed_12 = 1.5;
                _speed_3 = 1.25;
                _dir = irandom(3) * 90;
                _diradd = choose(- 90, 90);
                _shot = choose(0, 1, 2);
                _doki_queue = 0;
                _doki_dist = 1;
                _nextdelay = 1.2;
                if (_dir == 90 || _dir == 270) {
                    _speed_final = _speed_v * _speed_12;
                } else {
                    _speed_final = _speed_h * _speed_12;
                }
                S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, _shot, _dir, _delay, _speed_final);
                _shot_prev = _shot;
                _dir_prev = _dir;
                _spd_prev = _speed_final;
                switch (_shot) {
                  case 0:
                    _shot = choose(0, 1);
                    break;
                  case 1:
                    _shot = choose(0, 2);
                    break;
                  case 2:
                    _shot = choose(1, 2);
                    break;
                }
                _dir = S.scr_wrap(_dir + _diradd * choose(1, 2));
                if (_dir == 90 || _dir == 270) {
                    _speed_final = _speed_v * _speed_12;
                } else {
                    _speed_final = _speed_h * _speed_12;
                }
                _shot_prev = _shot;
                _dir_prev = _dir;
                switch (_shot) {
                  case 0:
                    _shot = choose(0, 1);
                    break;
                  case 1:
                    _shot = choose(0, 1);
                    break;
                  case 2:
                    _shot = choose(0, 1);
                    break;
                }
                _dir = S.scr_wrap(_dir + _diradd * choose(1, 2));
                if (_dir == 90 || _dir == 270) {
                    _speed_final = _speed_v * _speed_3;
                } else {
                    _speed_final = _speed_h * _speed_3;
                }
                if (_shot_prev == 1 && _shot == 5 && (_dir == _dir_prev + 90 || _dir == _dir_prev - 270)) {
                    _shot = 4;
                }
                switch (_shot) {
                  case 0:
                  case 1:
                  case 2:
                    _heartshot = _shot + 6;
                    break;
                  case 3:
                    _heartshot = 7;
                    break;
                  case 4:
                    _heartshot = 6 + choose(0, 2);
                    break;
                  case 5:
                    _heartshot = 7;
                    break;
                }
                if (_shot_prev == 1 && ((_heartshot == 6 && (_dir == _dir_prev + 90 || _dir == _dir_prev - 270)) || (_heartshot == 8 && (_dir == _dir_prev - 90 || _dir == _dir_prev + 270)))) {
                    _doki_queue = 1;
                }
                if ((_dir == _dir_prev + 180 || _dir == _dir_prev - 180) && ((_shot_prev == 0 && _heartshot == 8) || (_shot_prev == 1 && _heartshot == 7) || (_shot_prev == 2 && _heartshot == 6))) {
                    _doki_queue = 1;
                }
                if (_doki_queue == 0) {
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, _shot_prev, _dir_prev, _delay * (1 - _doki_dist), _spd_prev);
                } else {
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, _shot_prev, _dir_prev, _delay, _spd_prev);
                }
                if (_doki_queue == 0) {
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, _heartshot, _dir, _delay * _doki_dist, _speed_final);
                }
                if (_doki_queue != 1) {
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, _shot, _dir, _nextdelay, _speed_final);
                } else {
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, _shot, _dir, _delay * _doki_dist, _speed_final);
                    switch (_shot) {
                      case 0:
                      case 1:
                      case 2:
                        _heartshot = _shot + 6;
                        break;
                      case 3:
                        _heartshot = 7;
                        break;
                      case 4:
                        _heartshot = 6 + choose(0, 2);
                        break;
                      case 5:
                        _heartshot = 7;
                        break;
                    }
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, _heartshot, _dir, _nextdelay - _delay * (1 - _doki_dist), _speed_final);
                }
                break;
            }
        }
        if (instance_exists('obj_growtangle')) {
            if (this.btimer >= 40) {
                do {
                    _bdir = this.pattern_dir;
                    _blane = - 1;
                    choose(2, 4);
                    _binterval = 0.8;
                    _bspeed = 10;
                    _bullet_scale = 2;
                    _shootdist = 352;
                    if (instance_exists('obj_purplecontrols')) {
                        if (T(S.ds_exists(O('obj_purplecontrols').ds_bullet_list, 2))) {
                            if (S.ds_list_size(O('obj_purplecontrols').ds_bullet_list) >= 3) {
                                _bdir = S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 1);
                                _blane = S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0);
                                _binterval = S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 2) * 0.8;
                                _bspeed = S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 3) * 8;
                                S.ds_list_delete(O('obj_purplecontrols').ds_bullet_list, 0);
                                S.ds_list_delete(O('obj_purplecontrols').ds_bullet_list, 0);
                                S.ds_list_delete(O('obj_purplecontrols').ds_bullet_list, 0);
                                S.ds_list_delete(O('obj_purplecontrols').ds_bullet_list, 0);
                            }
                            if (S.ds_list_size(O('obj_purplecontrols').ds_bullet_list) < 4) {
                                S.ds_list_clear(O('obj_purplecontrols').ds_bullet_list);
                                if (this.difficulty != 1) {
                                    this.btimer = - 999;
                                }
                            }
                        }
                    }
                    this.btimer = 40 - Math.floor(0.5 + 40 * _binterval);
                    if (_blane <= 5 && _blane >= 0) {
                        _bul = scr_fire_bullet(this, scr_get_box(4) + lengthdir_x(_shootdist, _bdir + 180), scr_get_box(5) + lengthdir_y(_shootdist, _bdir + 180), 'obj_pinklanebullet', _bdir, _bspeed);
                        _bul.image_xscale = _bul.image_xscale * _bullet_scale;
                        _bul.image_yscale = _bul.image_yscale * _bullet_scale;
                        _bul.depth = this.depth - 10;
                        _lanebuldist = 52;
                        switch (_blane) {
                          case 0:
                          case 3:
                          case 4:
                            _bul.x = _bul.x + lengthdir_x(_lanebuldist, _bdir + 270);
                            _bul.y = _bul.y + lengthdir_y(_lanebuldist, _bdir + 270);
                            _bul.sprite_index = 'spr_pinklanebullet_lane';
                            _bul.image_angle = _bul.image_angle + 180;
                            break;
                          case 2:
                            _bul.x = _bul.x + lengthdir_x(_lanebuldist, _bdir + 90);
                            _bul.y = _bul.y + lengthdir_y(_lanebuldist, _bdir + 90);
                            _bul.sprite_index = 'spr_pinklanebullet_lane';
                            break;
                        }
                        _bul.image_angle = _bul.image_angle + _bdir;
                        if (_blane >= 3 && _blane < 6) {
                            _bul = scr_fire_bullet(this, scr_get_box(4) + lengthdir_x(_shootdist, _bdir + 180), scr_get_box(5) + lengthdir_y(_shootdist, _bdir + 180), 'obj_pinklanebullet', _bdir, _bspeed);
                            _bul.image_xscale = _bul.image_xscale * _bullet_scale;
                            _bul.image_yscale = _bul.image_yscale * _bullet_scale;
                            _bul.depth = this.depth - 10;
                            switch (_blane) {
                              case 4:
                              case 5:
                                _bul.x = _bul.x + lengthdir_x(_lanebuldist, _bdir + 90);
                                _bul.y = _bul.y + lengthdir_y(_lanebuldist, _bdir + 90);
                                _bul.sprite_index = 'spr_pinklanebullet_lane';
                                break;
                            }
                            _bul.image_angle = _bul.image_angle + _bdir;
                        }
                    }
                    if (_blane >= 6) {
                        _lanebuldist = 66;
                        _bul = instance_create_depth(scr_get_box(4) + lengthdir_x(_shootdist, _bdir + 180), scr_get_box(5) + lengthdir_y(_shootdist, _bdir + 180), this.depth - 11, 'obj_dokiheart');
                        _bul.tension_value = 3;
                        _bul.image_xscale = 3;
                        _bul.image_yscale = 3;
                        _bul.visual_scale = 0.6666666666666666;
                        _bul.direction = _bdir;
                        _bul.speed = _bspeed;
                        switch (_blane) {
                          case 6:
                          case 9:
                          case 10:
                            _bul.x = _bul.x + lengthdir_x(_lanebuldist, _bdir + 270);
                            _bul.y = _bul.y + lengthdir_y(_lanebuldist, _bdir + 270);
                            break;
                          case 8:
                            _bul.x = _bul.x + lengthdir_x(_lanebuldist, _bdir + 90);
                            _bul.y = _bul.y + lengthdir_y(_lanebuldist, _bdir + 90);
                            break;
                        }
                    }
                    this.pattern_dir = this.pattern_dir + choose(90, 270);
                    if (this.pattern_dir >= 360) {
                        this.pattern_dir = this.pattern_dir - 360;
                    }
                } while ((!(this.btimer < 40)) && LOOP('Dbulletcontroller#2'));

            }
        }
        if (this.difficulty != 1) {
            this.life_time = this.life_time + 1;
            if (this.life_time <= 8) {
                if (W('obj_purplecontrols', function (other) {
                    this.y = this.y + 8;
                    this.tire_y = this.tire_y + 8;
                }, this) === EXIT) return;
                if (W('obj_growtangle', function (other) {
                    this.y = this.y + 8;
                }, this) === EXIT) return;
                if (W('obj_heart', function (other) {
                    this.y = this.y + 8;
                }, this) === EXIT) return;
                if (W('obj_collidebullet', function (other) {
                    this.y = this.y + 8;
                }, this) === EXIT) return;
                if (W('obj_dokiheart', function (other) {
                    this.y = this.y + 8;
                }, this) === EXIT) return;
            }
        }
        if (this.difficulty == 1) {
            this.life_time = this.life_time + 1;
            switch (this.phase) {
              case 0:
                if (W('obj_purplecontrols', function (other) {
                    if (this.rotate_speed != 0) {
                        other.life_time = 255;
                    }
                }, this) === EXIT) return;
                if (this.life_time >= 28) {
                    if (W('obj_pink_battlemovement', function (other) {
                        snd_play('snd_pink_laugh_long');
                        this.sprite_index = 'spr_pink_front_ohoho';
                    }, this) === EXIT) return;
                    this.life_time = - 5;
                    this.phase = this.phase + 1;
                }
                break;
              case 1:
                if (W('obj_purplecontrols', function (other) {
                    if (this.rotate_speed != 0) {
                        other.life_time = 255;
                    }
                }, this) === EXIT) return;
                if (this.life_time >= 60) {
                    if (W('obj_pink_battlemovement', function (other) {
                        this.image_speed = 0;
                    }, this) === EXIT) return;
                }
                if (this.life_time >= 90) {
                    if (W('obj_pink_battlemovement', function (other) {
                        this.sprite_index = 'spr_pink_front_surprised';
                    }, this) === EXIT) return;
                    this.life_time = 0;
                    this.phase = this.phase + 1;
                }
                break;
              case 2:
                if (W('obj_purplecontrols', function (other) {
                    if (this.rotate_speed != 0) {
                        other.life_time = 255;
                    }
                }, this) === EXIT) return;
                if (this.life_time >= 50) {
                    if (W('obj_pink_battlemovement', function (other) {
                        if (instance_exists('obj_growtangle')) {
                            this.dest_x = scr_get_box(4);
                        }
                        this.dest_y = this.y;
                        this.mode = 6;
                    }, this) === EXIT) return;
                    this.life_time = 0;
                    this.btimer = 0;
                    this.phase = this.phase + 1;
                }
                break;
            }
        }
    }
  }
  type203() {
    let dir, xx, yy, num, d, slasher, i, attacktimer, quizReady, _maru, _batsu, xmod, shadowman_tommygun_manager, triangle_count, tempnum, _flip, _angle, _dist, choosey, choosex, shuriken, _lifetime, delay, _ratio, _dir, _x, _y, test, _side, angle, dist, a, _max, sinfact, sinebase, _spread, iii, __dir, _spd, _sameattacki, _smashcut, spring, scarecrow1, scarecrow2, scarecrow3, o, offset_last, bx, by, off, last_blue, bullet_offset, blue, shooter, ___x, ___y, _bullet_speed_modifier, _bullet_interval_modifier, _heart_tension_value, _d_mild, _s_mild, _d_medium, _s_medium, _d_spicy, _s_spicy, _d_beat, _d_conga, _s_conga, _d_conga_last, _hflip, _vflip, _binterval, _bspeed, _d_medmild, _s_medmild, _rside, _box_x, _box_y, _bul, _lane_distance, _bomb, _fill_bulletlist, _d_tuning, _s_tuning, _speed_multiplier, _speed_v, _speed_h, _speed_h1_final, _speed_h2_final, _speed_v_final, _speed_strays, _speed_bursts, _d_bursts, _delay, _speed_12, _speed_3, _diradd, _shot, _doki_queue, _doki_dist, _nextdelay, _speed_final, _shot_prev, _dir_prev, _spd_prev, _heartshot, _bdir, _blane, _bullet_scale, _shootdist, _lanebuldist, _the_value, _timeadd, _startdelay, _list_xy, _randompattern, _list_order, _xsign, _xoffset, _ysign, _yoffset, _xrotate, _yrotate, _box_xscale, _box_yscale, _pattern_speed_modifier, _node_dist_test, t70a, t70b, t70_bullet, t70rand, _purple_omega, _green_omega, _aqua_chainknife, _aqua_fanofknives, _aqua_knife_leafling, _aqua_knife_everything, _duck, _sethsupport, _step, fi, _rate, spread, tracktime, loc, do_dir, _words1, _words2, _newtimer;
    if (this.type == 203) {
        _bullet_interval_modifier = 1;
        if (this.made == 0) {
            if (i_ex('obj_pink_enemy')) {
                this.difficulty = O('obj_pink_enemy').difficulty;
            }
            if (W('obj_pink_battlemovement', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            this.made = 1;
            this.grid_x = irandom(3);
            this.grid_y = irandom(3);
            this.pattern_variant = irandom(3);
            this.pattern_repeat = 0;
            if (W('obj_heart', function (other) {
                this.sprite_index = 'spr_purpleheart';
                this.canmove = 0;
            }, this) === EXIT) return;
            if (W('obj_grazebox', function (other) {
                this.grazetimefactor = 0;
            }, this) === EXIT) return;
            if (W('obj_growtangle', function (other) {
                if (!T(instance_exists('obj_purplecontrols'))) {
                    instance_create_depth(this.x, this.y, 4, 'obj_purplecontrols');
                    O('obj_purplecontrols').mode = 2;
                }
                this.y = this.y + 32;
                if (W(instance_create_depth(this.x + 200, this.y - 32, this.depth - 5, 'obj_pink_battlemovement'), function (other) {
                    this.mode = 5;
                    this.sprite_index = 'spr_pink_idle';
                    this.image_speed = 0.334;
                    this.grid_x = - 1;
                    this.grid_y = - 1;
                }, this) === EXIT) return EXIT;
            }, this) === EXIT) return;
            this.btimer_start = this.btimer;
            switch (this.difficulty) {
              case 0:
                if (global.flag[1914] != 2) {
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, 0, 1.05, 0, 0, 0, 1.05, 0, 0, 0, 0.98, 0, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 0, 0.98, 0, 0, 0, 0, 0, 0.97, 0, 0, 0, 0, 0, 0, 0, 1.25, 1, 0);
                } else {
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, 0, 1.05, 0, 0, 0, 0, 0, 0, 0, 1.05, 0, 0, 0, 0.98, 0, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 0, 0.98, 0, 0, 0, 0, 0, 0.97, 0, 0, 0, 0, 0, 0, 0, 1.25, 1, 0);
                }
                break;
              case 1:
                S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, 0, 0.85, 0, 0.7, 0, 0.6, 0, 0.6, 0, 0, 0, 0.8, 0, 0, 0, 0.65, 0, 0, 0, 0, 0, 1.25, 1, 0);
                break;
              case 2:
                S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, 3, 1.25, 3, 1.25, 3, 1.25, 3, 1.5, 4, 3);
                break;
              case 3:
                if (global.flag[1914] != 2) {
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, 0, 0, 0, 1.05, 0, 0, 10, 0, 0, 1.05, 0, 0, 0, 0, 0, 1.05, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 10, 0, 0, 0.975, 0, 0, 0, 0, 0, 0, 0, 0.875, 2, 1.5, 1, 0);
                } else {
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, 0, 0, 0, 1.05, 0, 0, 0, 0, 0, 1.05, 0, 0, 0, 0, 0, 1.05, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0.975, 0, 0, 0, 0, 0, 0, 0, 0.5, 2, 1.5, 1, 0);
                }
                break;
              case 4:
                if (global.flag[1914] != 2) {
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, 0, 0.85, 0, 0.7, 0, 0.6, 0, 0.6, 0, 0, 0, 0.8, 0, 0, 0, 0.65, 0, 0, 0, 0, 0, 0.9, 2, 1.5, 1, 0);
                } else {
                    S.ds_list_add(O('obj_purplecontrols').ds_bullet_list, 0, 0.85, 0, 0.7, 0, 0.6, 0, 0, 0, 0.75, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0.9, 0, 0, 0, 0, 0, 0.9, 2, 1.5, 1, 0);
                }
                break;
            }
            global.turntimer = 50;
            i = 0;
            for (let _r859 = 0, _n859 = Math.trunc(Math.floor(S.ds_list_size(O('obj_purplecontrols').ds_bullet_list) / 2)); _r859 < _n859; _r859++) {
                _the_value = S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, i);
                if (_the_value >= 10) {
                    if (global.flag[1914] == 1) {
                        S.ds_list_delete(O('obj_purplecontrols').ds_bullet_list, i);
                        S.ds_list_delete(O('obj_purplecontrols').ds_bullet_list, i);
                        i = i - 2;
                    } else {
                        S.ds_list_replace(O('obj_purplecontrols').ds_bullet_list, i, _the_value - 10);
                    }
                }
                i = i + 2;
            }
            i = 0;
            for (let _r957 = 0, _n957 = Math.trunc(Math.floor(S.ds_list_size(O('obj_purplecontrols').ds_bullet_list) / 2)); _r957 < _n957; _r957++) {
                _timeadd = round(0.5 + 45 * S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 1 + i) / _bullet_interval_modifier);
                global.turntimer = global.turntimer + _timeadd;
                if (S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0 + i) == 0) {
                    if (global.flag[1914] == 1 && _timeadd > 1) {
                        global.turntimer = global.turntimer + 4;
                    } else if (global.flag[1914] == 2 && _timeadd > 1) {
                        global.turntimer = global.turntimer - 2;
                    }
                }
                if (S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0 + i) == 2 || S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0 + i) == 3) {
                    if (global.flag[1914] == 1 && _timeadd > 1) {
                        global.turntimer = global.turntimer + 4;
                    }
                }
                i = i + 2;
            }
        }
        _startdelay = 0;
        if (instance_exists('obj_purplecontrols')) {
            if (T(S.ds_exists(O('obj_purplecontrols').ds_bullet_list, 2))) {
                if (S.ds_list_size(O('obj_purplecontrols').ds_bullet_list) > 0) {
                    do {
                        if (this.btimer >= this.btimer_start + _startdelay) {
                            if (S.ds_list_size(O('obj_purplecontrols').ds_bullet_list) > 0) {
                                _timeadd = round(0.5 + 45 * S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 1) / _bullet_interval_modifier);
                                this.btimer = this.btimer - _timeadd;
                                void("_timeadd: " + String(_timeadd) + ", btimer: " + String(this.btimer));
                                if (S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0) == 0) {
                                    if (global.flag[1914] == 1 && _timeadd > 1) {
                                        this.btimer = this.btimer - 4;
                                        void("btimer DECREASED: " + String(this.btimer));
                                    } else if (global.flag[1914] == 2 && _timeadd > 1) {
                                        this.btimer = this.btimer + 2;
                                        void("btimer INCREASED: " + String(this.btimer));
                                    }
                                }
                                if (S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0) == 2 || S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0) == 3) {
                                    if (global.flag[1914] == 1 && _timeadd > 1) {
                                        this.btimer = this.btimer - 4;
                                        void("btimer DECREASED: " + String(this.btimer));
                                    }
                                }
                                switch (S.ds_list_find_value(O('obj_purplecontrols').ds_bullet_list, 0)) {
                                  case 0:
                                    if (W('obj_pink_battlemovement', function (other) {
                                        if (S.ds_list_size(this.list_bomb) <= 0) {
                                            this.ammo_doki = 0;
                                        }
                                        S.ds_list_add(this.list_bomb, 0);
                                        this.ammo_doki = this.ammo_doki + 1;
                                    }, this) === EXIT) return;
                                    break;
                                  case 1:
                                    if (W('obj_pink_battlemovement', function (other) {
                                        snd_play('snd_pink_laugh_long');
                                        this.sprite_index = 'spr_pink_laugh';
                                        this.image_index = 0;
                                        this.image_speed = 0.5;
                                    }, this) === EXIT) return;
                                    break;
                                  case 2:
                                    if (W('obj_pink_battlemovement', function (other) {
                                        S.ds_list_add(this.list_bomb, 1);
                                    }, this) === EXIT) return;
                                    break;
                                  case 3:
                                    if (W('obj_pink_battlemovement', function (other) {
                                        _list_xy = S.ds_list_create();
                                        _randompattern = choose(0, 0, 1, 1, 2);
                                        switch (_randompattern) {
                                          case 0:
                                            this._rn ??= []; AF(this._rn, 1); this._rn[1] = 3 + irandom(1);
                                            this._rn ??= []; AF(this._rn, 0); this._rn[0] = Math.max(- 1, this._rn[1] - 4 - irandom(1));
                                            S.ds_list_add(_list_xy, - 2, this._rn[0], - 2, this._rn[1], 1 + irandom(2), - 2, 5, this._rn[1]);
                                            break;
                                          case 1:
                                            this._rn ??= []; AF(this._rn, 2); this._rn[2] = 1 + irandom(1);
                                            this._rn ??= []; AF(this._rn, 1); this._rn[1] = 3 + irandom(1);
                                            this._rn ??= []; AF(this._rn, 0); this._rn[0] = Math.max(- 1, this._rn[1] - 4 - irandom(1));
                                            S.ds_list_add(_list_xy, - 2, this._rn[0], 5, this._rn[1], this._rn[2], - 2, this._rn[2], 4);
                                            break;
                                          case 2:
                                            this._rn ??= []; AF(this._rn, 2); this._rn[2] = 1 + irandom(1);
                                            this._rn ??= []; AF(this._rn, 1); this._rn[1] = 3 + irandom(1);
                                            this._rn ??= []; AF(this._rn, 0); this._rn[0] = Math.max(- 1, this._rn[1] - 4 - irandom(1));
                                            S.ds_list_add(_list_xy, - 2, - 1, 4, - 2, 5, 4 - choose(0, 1, 1), - 1 + choose(0, 1, 1), 5);
                                            break;
                                        }
                                        _list_order = S.ds_list_create();
                                        S.ds_list_add(_list_order, 0, 1, 2, 3);
                                        S.ds_list_shuffle(_list_order);
                                        _xsign = 1;
                                        _xoffset = 0;
                                        if (irandom(1) == 1) {
                                            _xsign = - 1;
                                            _xoffset = 3;
                                        }
                                        _ysign = 1;
                                        _yoffset = 0;
                                        if (irandom(1) == 1) {
                                            _ysign = - 1;
                                            _yoffset = 3;
                                        }
                                        _xrotate = 0;
                                        _yrotate = 1;
                                        if (irandom(1) == 1) {
                                            _xrotate = 1;
                                            _yrotate = 0;
                                        }
                                        S.ds_list_add(this.list_bomb_xy, _xoffset + _xsign * S.ds_list_find_value(_list_xy, S.ds_list_find_value(_list_order, 0) * 2 + _xrotate), _yoffset + _ysign * S.ds_list_find_value(_list_xy, S.ds_list_find_value(_list_order, 0) * 2 + _yrotate), _xoffset + _xsign * S.ds_list_find_value(_list_xy, S.ds_list_find_value(_list_order, 1) * 2 + _xrotate), _yoffset + _ysign * S.ds_list_find_value(_list_xy, S.ds_list_find_value(_list_order, 1) * 2 + _yrotate), _xoffset + _xsign * S.ds_list_find_value(_list_xy, S.ds_list_find_value(_list_order, 2) * 2 + _xrotate), _yoffset + _ysign * S.ds_list_find_value(_list_xy, S.ds_list_find_value(_list_order, 2) * 2 + _yrotate), _xoffset + _xsign * S.ds_list_find_value(_list_xy, S.ds_list_find_value(_list_order, 3) * 2 + _xrotate), _yoffset + _ysign * S.ds_list_find_value(_list_xy, S.ds_list_find_value(_list_order, 3) * 2 + _yrotate));
                                        S.ds_list_destroy(_list_order);
                                        S.ds_list_destroy(_list_xy);
                                        switch (irandom(3)) {
                                          case 0:
                                            S.ds_list_add(this.list_bomb, 4, 2, 2, 2);
                                            break;
                                          case 1:
                                            S.ds_list_add(this.list_bomb, 2, 4, 2, 2);
                                            break;
                                          case 2:
                                            S.ds_list_add(this.list_bomb, 2, 2, 4, 2);
                                            break;
                                          default:
                                            S.ds_list_add(this.list_bomb, 2, 2, 2, 4);
                                        }
                                    }, this) === EXIT) return;
                                    break;
                                  case 4:
                                    if (W('obj_pink_battlemovement', function (other) {
                                        S.ds_list_add(this.list_bomb, 3);
                                    }, this) === EXIT) return;
                                    break;
                                }
                                S.ds_list_delete(O('obj_purplecontrols').ds_bullet_list, 0);
                                S.ds_list_delete(O('obj_purplecontrols').ds_bullet_list, 0);
                            }
                        }
                        if (S.ds_list_size(O('obj_purplecontrols').ds_bullet_list) < 2) {
                            S.ds_list_clear(O('obj_purplecontrols').ds_bullet_list);
                            return;
                        }
                    } while ((!(this.btimer < this.btimer_start + _startdelay)) && LOOP('Dbulletcontroller#3'));

                }
            }
        }
    }
  }
  type204() {
    let dir, xx, yy, num, d, slasher, i, attacktimer, quizReady, _maru, _batsu, xmod, shadowman_tommygun_manager, triangle_count, tempnum, _flip, _angle, _dist, choosey, choosex, shuriken, _lifetime, delay, _ratio, _dir, _x, _y, test, _side, angle, dist, a, _max, sinfact, sinebase, _spread, iii, __dir, _spd, _sameattacki, _smashcut, spring, scarecrow1, scarecrow2, scarecrow3, o, offset_last, bx, by, off, last_blue, bullet_offset, blue, shooter, ___x, ___y, _bullet_speed_modifier, _bullet_interval_modifier, _heart_tension_value, _d_mild, _s_mild, _d_medium, _s_medium, _d_spicy, _s_spicy, _d_beat, _d_conga, _s_conga, _d_conga_last, _hflip, _vflip, _binterval, _bspeed, _d_medmild, _s_medmild, _rside, _box_x, _box_y, _bul, _lane_distance, _bomb, _fill_bulletlist, _d_tuning, _s_tuning, _speed_multiplier, _speed_v, _speed_h, _speed_h1_final, _speed_h2_final, _speed_v_final, _speed_strays, _speed_bursts, _d_bursts, _delay, _speed_12, _speed_3, _diradd, _shot, _doki_queue, _doki_dist, _nextdelay, _speed_final, _shot_prev, _dir_prev, _spd_prev, _heartshot, _bdir, _blane, _bullet_scale, _shootdist, _lanebuldist, _the_value, _timeadd, _startdelay, _list_xy, _randompattern, _list_order, _xsign, _xoffset, _ysign, _yoffset, _xrotate, _yrotate, _box_xscale, _box_yscale, _pattern_speed_modifier, _node_dist_test, t70a, t70b, t70_bullet, t70rand, _purple_omega, _green_omega, _aqua_chainknife, _aqua_fanofknives, _aqua_knife_leafling, _aqua_knife_everything, _duck, _sethsupport, _step, fi, _rate, spread, tracktime, loc, do_dir, _words1, _words2, _newtimer;
    if (this.type == 204) {
        if (this.made == 0) {
            this.made = 1;
            if (i_ex('obj_pink_enemy')) {
                this.difficulty = O('obj_pink_enemy').difficulty;
            }
            if (W('obj_heart', function (other) {
                this.sprite_index = 'spr_purpleheart';
                this.canmove = 0;
            }, this) === EXIT) return;
            _box_xscale = 1.125;
            _box_yscale = 1.5;
            if (W('obj_growtangle', function (other) {
                if (!T(i_ex('obj_purplecontrols'))) {
                    instance_create_depth(this.x, this.y, 4, 'obj_purplecontrols');
                }
                O('obj_purplecontrols').mode = 4;
                O('obj_purplecontrols').lane_x = 0;
                this.image_xscale = this.image_xscale * _box_xscale;
                this.image_yscale = this.image_yscale * _box_yscale;
            }, this) === EXIT) return;
            global.turntimer = 390;
            this.bullet_lane = choose(0, 1);
            this.btimer_start = this.btimer;
            this.b_interval ??= []; AF(this.b_interval, 0); this.b_interval[0] = 7;
            this.b_number ??= []; AF(this.b_number, 0); this.b_number[0] = 3;
            this.b_break ??= []; AF(this.b_break, 0); this.b_break[0] = - 30;
            this.b_speed ??= []; AF(this.b_speed, 0); this.b_speed[0] = 3.2;
            this.b_interval ??= []; AF(this.b_interval, 1); this.b_interval[1] = 10;
            this.b_number ??= []; AF(this.b_number, 1); this.b_number[1] = 2;
            this.b_break ??= []; AF(this.b_break, 1); this.b_break[1] = - 36;
            this.b_speed ??= []; AF(this.b_speed, 1); this.b_speed[1] = 2;
            this.b_interval ??= []; AF(this.b_interval, 2); this.b_interval[2] = 36;
            this.b_number ??= []; AF(this.b_number, 2); this.b_number[2] = 1;
            this.b_break ??= []; AF(this.b_break, 2); this.b_break[2] = - 24;
            this.b_speed ??= []; AF(this.b_speed, 2); this.b_speed[2] = 1.25;
            this.btimer_array ??= []; AF(this.btimer_array, 2); this.btimer_array[2] = this.b_interval[2] - 2;
            this.btimer_array ??= []; AF(this.btimer_array, 1); this.btimer_array[1] = this.b_interval[1] - 2;
            this.btimer_array ??= []; AF(this.btimer_array, 0); this.btimer_array[0] = this.b_interval[0] - 2;
            this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 2); this.btimer_array_decimal[2] = 0;
            this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 1); this.btimer_array_decimal[1] = 0;
            this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 0); this.btimer_array_decimal[0] = 0;
            if (instance_exists('obj_growtangle')) {
                instance_create_depth(scr_get_box(4) - 63, scr_get_box(1) - 8, - 1, 'obj_roundbellbullet');
            }
        }
        _pattern_speed_modifier = 1;
        switch (this.difficulty) {
          case 0:
            _pattern_speed_modifier = 1;
            break;
          case 1:
            _pattern_speed_modifier = 1.2;
            break;
          default:
            _pattern_speed_modifier = 1.5;
        }
        if (instance_exists('obj_growtangle')) {
            this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 0); this.btimer_array_decimal[0] = this.btimer_array_decimal[0] + _pattern_speed_modifier;
            do {
                if (this.btimer_array_decimal[0] >= 1) {
                    this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 0); this.btimer_array_decimal[0] = this.btimer_array_decimal[0] - 1;
                    this.btimer_array[0] ++;
                    if (this.btimer_array[0] > 0) {
                        if (this.btimer_array[0] % this.b_interval[0] == this.b_interval[0] - 1) {
                            if (this.btimer_array[0] >= this.b_interval[0] * (this.b_number[0] - 1)) {
                                this.btimer_array ??= []; AF(this.btimer_array, 0); this.btimer_array[0] = this.b_break[0];
                            }
                            _bul = scr_fire_bullet(this, scr_get_box(4) - 28, scr_get_box(5) + - 1 * (24 + (scr_get_box(3) - scr_get_box(1)) / 2), 'obj_pinkcatbullet', 270, this.b_speed[0] * _pattern_speed_modifier);
                            _bul.mode = 2;
                            _bul.image_speed = choose(0, 0, 0, 0.02, 0.04, 0, 0.334, 0.5, 1, 0, 0, 0);
                            _bul.image_xscale = 2;
                            _bul.image_yscale = 2;
                        }
                    }
                }
            } while ((!(this.btimer_array_decimal[0] < 1)) && LOOP('Dbulletcontroller#4'));

            this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 1); this.btimer_array_decimal[1] = this.btimer_array_decimal[1] + _pattern_speed_modifier;
            do {
                if (this.btimer_array_decimal[1] >= 1) {
                    this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 1); this.btimer_array_decimal[1] = this.btimer_array_decimal[1] - 1;
                    this.btimer_array[1] ++;
                    if (this.btimer_array[1] > 0) {
                        if (this.btimer_array[1] % this.b_interval[1] == this.b_interval[1] - 1) {
                            if (this.btimer_array[1] > this.b_interval[1] * (this.b_number[1] - 1)) {
                                this.btimer_array ??= []; AF(this.btimer_array, 1); this.btimer_array[1] = this.b_break[1];
                            }
                            _bul = scr_fire_bullet(this, scr_get_box(4), scr_get_box(5) + 1 * (24 + (scr_get_box(3) - scr_get_box(1)) / 2), 'obj_pinkcatbullet', 90, this.b_speed[1] * _pattern_speed_modifier);
                            _bul.mode = 2;
                            _bul.image_speed = choose(0, 0, 0, 0.02, 0.04, 0, 0.334, 0.5, 1, 0, 0, 0);
                            _bul.image_xscale = 2;
                            _bul.image_yscale = 2;
                        }
                    }
                }
            } while ((!(this.btimer_array_decimal[1] < 1)) && LOOP('Dbulletcontroller#5'));

            this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 2); this.btimer_array_decimal[2] = this.btimer_array_decimal[2] + _pattern_speed_modifier;
            do {
                if (this.btimer_array_decimal[2] >= 1) {
                    this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 2); this.btimer_array_decimal[2] = this.btimer_array_decimal[2] - 1;
                    this.btimer_array[2] ++;
                    if (this.btimer_array[2] > 0) {
                        if (this.btimer_array[2] % this.b_interval[2] == this.b_interval[2] - 1) {
                            if (this.btimer_array[2] > this.b_interval[2] * (this.b_number[2] - 1)) {
                                this.btimer_array ??= []; AF(this.btimer_array, 2); this.btimer_array[2] = this.b_break[2];
                            }
                            _bul = scr_fire_bullet(this, scr_get_box(4) + 28, scr_get_box(5) + - 1 * (24 + (scr_get_box(3) - scr_get_box(1)) / 2), 'obj_pinkcatbullet', 270, this.b_speed[2] * _pattern_speed_modifier);
                            _bul.mode = 2;
                            _bul.image_speed = choose(0, 0, 0, 0.02, 0.04, 0, 0.334, 0.5, 1, 0, 0, 0);
                            _bul.image_xscale = 2;
                            _bul.image_yscale = 2;
                        }
                    }
                }
            } while ((!(this.btimer_array_decimal[2] < 1)) && LOOP('Dbulletcontroller#6'));

            if (W('obj_pinkcatbullet', function (other) {
                if (this.life_time >= 30) {
                    if (this.y < scr_get_box(1) || this.y > scr_get_box(3)) {
                        this.image_alpha = this.image_alpha - 0.05 * this.speed;
                        if (this.image_alpha <= 0) {
                            instance_destroy(this);
                        }
                    }
                }
            }, this) === EXIT) return;
        }
    }
  }
  type205() {
    let dir, xx, yy, num, d, slasher, i, attacktimer, quizReady, _maru, _batsu, xmod, shadowman_tommygun_manager, triangle_count, tempnum, _flip, _angle, _dist, choosey, choosex, shuriken, _lifetime, delay, _ratio, _dir, _x, _y, test, _side, angle, dist, a, _max, sinfact, sinebase, _spread, iii, __dir, _spd, _sameattacki, _smashcut, spring, scarecrow1, scarecrow2, scarecrow3, o, offset_last, bx, by, off, last_blue, bullet_offset, blue, shooter, ___x, ___y, _bullet_speed_modifier, _bullet_interval_modifier, _heart_tension_value, _d_mild, _s_mild, _d_medium, _s_medium, _d_spicy, _s_spicy, _d_beat, _d_conga, _s_conga, _d_conga_last, _hflip, _vflip, _binterval, _bspeed, _d_medmild, _s_medmild, _rside, _box_x, _box_y, _bul, _lane_distance, _bomb, _fill_bulletlist, _d_tuning, _s_tuning, _speed_multiplier, _speed_v, _speed_h, _speed_h1_final, _speed_h2_final, _speed_v_final, _speed_strays, _speed_bursts, _d_bursts, _delay, _speed_12, _speed_3, _diradd, _shot, _doki_queue, _doki_dist, _nextdelay, _speed_final, _shot_prev, _dir_prev, _spd_prev, _heartshot, _bdir, _blane, _bullet_scale, _shootdist, _lanebuldist, _the_value, _timeadd, _startdelay, _list_xy, _randompattern, _list_order, _xsign, _xoffset, _ysign, _yoffset, _xrotate, _yrotate, _box_xscale, _box_yscale, _pattern_speed_modifier, _node_dist_test, t70a, t70b, t70_bullet, t70rand, _purple_omega, _green_omega, _aqua_chainknife, _aqua_fanofknives, _aqua_knife_leafling, _aqua_knife_everything, _duck, _sethsupport, _step, fi, _rate, spread, tracktime, loc, do_dir, _words1, _words2, _newtimer;
    if (this.type == 205) {
        if (this.made == 0) {
            this.made = 1;
            if (W('obj_heart', function (other) {
                this.sprite_index = 'spr_purpleheart';
                this.canmove = 0;
            }, this) === EXIT) return;
            _box_xscale = 1.125;
            _box_yscale = 1.5;
            if (W('obj_growtangle', function (other) {
                if (!T(i_ex('obj_purplecontrols'))) {
                    instance_create_depth(this.x, this.y, 4, 'obj_purplecontrols');
                }
                O('obj_purplecontrols').mode = 5;
                O('obj_purplecontrols').lane_x = 0;
                O('obj_purplecontrols').y_ongrid = O('obj_purplecontrols').y_ongrid - 80;
                this.image_xscale = this.image_xscale * _box_xscale;
                this.image_yscale = this.image_yscale * _box_yscale;
            }, this) === EXIT) return;
            global.turntimer = 300;
            this.btimer2 = 0;
            this.bullet_lane = choose(0, 1);
            this.bullet_lane2 = 0;
            this.btimer_start = this.btimer;
            if (instance_exists('obj_growtangle')) {
                _bul = scr_fire_bullet(this, scr_get_box(4) - 63, scr_get_box(1) + 6, 'obj_pinkcatbullet', 0, 0);
                _bul.image_speed = choose(0, 0, 0, 0, 0, 0.02, 0.04, 0, 0.5, 1, 0, 0, 0);
                _bul.image_xscale = 2;
                _bul.image_yscale = 2;
                _bul.destroyonhit = 0;
                _bul = scr_fire_bullet(this, scr_get_box(4) + 63, scr_get_box(1) + 6, 'obj_pinkcatbullet', 0, 0);
                _bul.image_speed = choose(0, 0, 0, 0, 0, 0.02, 0.04, 0, 0.5, 1, 0, 0, 0);
                _bul.image_xscale = 2;
                _bul.image_yscale = 2;
                _bul.destroyonhit = 0;
                _bul = scr_fire_bullet(this, scr_get_box(4) - 63, scr_get_box(3) - 6, 'obj_pinkcatbullet', 0, 0);
                _bul.image_speed = choose(0, 0, 0, 0, 0, 0.02, 0.04, 0, 0.5, 1, 0, 0, 0);
                _bul.image_xscale = 2;
                _bul.image_yscale = 2;
                _bul.destroyonhit = 0;
                _bul = scr_fire_bullet(this, scr_get_box(4) + 63, scr_get_box(3) - 6, 'obj_pinkcatbullet', 0, 0);
                _bul.image_speed = choose(0, 0, 0, 0, 0, 0.02, 0.04, 0, 0.5, 1, 0, 0, 0);
                _bul.image_xscale = 2;
                _bul.image_yscale = 2;
                _bul.destroyonhit = 0;
            }
            if (i_ex('obj_pink_enemy')) {
                this.difficulty = O('obj_pink_enemy').difficulty;
            }
            this.b_interval ??= []; AF(this.b_interval, 0); this.b_interval[0] = 4;
            this.b_number ??= []; AF(this.b_number, 0); this.b_number[0] = 2;
            this.b_break ??= []; AF(this.b_break, 0); this.b_break[0] = - 20;
            this.b_speed ??= []; AF(this.b_speed, 0); this.b_speed[0] = 5.4;
            this.b_interval ??= []; AF(this.b_interval, 1); this.b_interval[1] = 5;
            this.b_number ??= []; AF(this.b_number, 1); this.b_number[1] = 2;
            this.b_break ??= []; AF(this.b_break, 1); this.b_break[1] = - 24;
            this.b_speed ??= []; AF(this.b_speed, 1); this.b_speed[1] = 4.4;
            this.b_interval ??= []; AF(this.b_interval, 2); this.b_interval[2] = 18;
            this.b_number ??= []; AF(this.b_number, 2); this.b_number[2] = 1;
            this.b_break ??= []; AF(this.b_break, 2); this.b_break[2] = - 12;
            this.b_speed ??= []; AF(this.b_speed, 2); this.b_speed[2] = 3.4;
            this.btimer_array ??= []; AF(this.btimer_array, 2); this.btimer_array[2] = this.b_interval[2] - 2;
            this.btimer_array ??= []; AF(this.btimer_array, 1); this.btimer_array[1] = this.b_interval[1] - 2;
            this.btimer_array ??= []; AF(this.btimer_array, 0); this.btimer_array[0] = this.b_interval[0] - 2;
            this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 2); this.btimer_array_decimal[2] = 0;
            this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 1); this.btimer_array_decimal[1] = 0;
            this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 0); this.btimer_array_decimal[0] = 0;
        }
        _pattern_speed_modifier = 1;
        if (instance_exists('obj_growtangle')) {
            this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 0); this.btimer_array_decimal[0] = this.btimer_array_decimal[0] + _pattern_speed_modifier;
            do {
                if (this.btimer_array_decimal[0] >= 1) {
                    this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 0); this.btimer_array_decimal[0] = this.btimer_array_decimal[0] - 1;
                    this.btimer_array[0] ++;
                    if (this.btimer_array[0] > 0) {
                        if (this.btimer_array[0] % this.b_interval[0] == this.b_interval[0] - 1) {
                            if (this.btimer_array[0] >= this.b_interval[0] * (this.b_number[0] - 1)) {
                                this.btimer_array ??= []; AF(this.btimer_array, 0); this.btimer_array[0] = this.b_break[0];
                            }
                            _bul = scr_fire_bullet(this, scr_get_box(4) - 28, scr_get_box(5) + - 1 * (24 + (scr_get_box(3) - scr_get_box(1)) / 2), 'obj_pinkcatbullet', 270, this.b_speed[0] * _pattern_speed_modifier);
                            _bul.mode = 2;
                            _bul.image_speed = choose(0, 0, 0, 0.02, 0.04, 0, 0.334, 0.5, 1, 0, 0, 0);
                            _bul.image_xscale = 2;
                            _bul.image_yscale = 2;
                        }
                    }
                }
            } while ((!(this.btimer_array_decimal[0] < 1)) && LOOP('Dbulletcontroller#7'));

            this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 1); this.btimer_array_decimal[1] = this.btimer_array_decimal[1] + _pattern_speed_modifier;
            do {
                if (this.btimer_array_decimal[1] >= 1) {
                    this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 1); this.btimer_array_decimal[1] = this.btimer_array_decimal[1] - 1;
                    this.btimer_array[1] ++;
                    if (this.btimer_array[1] > 0) {
                        if (this.btimer_array[1] % this.b_interval[1] == this.b_interval[1] - 1) {
                            if (this.btimer_array[1] > this.b_interval[1] * (this.b_number[1] - 1)) {
                                this.btimer_array ??= []; AF(this.btimer_array, 1); this.btimer_array[1] = this.b_break[1];
                            }
                            _bul = scr_fire_bullet(this, scr_get_box(4), scr_get_box(5) + 1 * (24 + (scr_get_box(3) - scr_get_box(1)) / 2), 'obj_pinkcatbullet', 90, this.b_speed[1] * _pattern_speed_modifier);
                            _bul.mode = 2;
                            _bul.image_speed = choose(0, 0, 0, 0.02, 0.04, 0, 0.334, 0.5, 1, 0, 0, 0);
                            _bul.image_xscale = 2;
                            _bul.image_yscale = 2;
                        }
                    }
                }
            } while ((!(this.btimer_array_decimal[1] < 1)) && LOOP('Dbulletcontroller#8'));

            this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 2); this.btimer_array_decimal[2] = this.btimer_array_decimal[2] + _pattern_speed_modifier;
            do {
                if (this.btimer_array_decimal[2] >= 1) {
                    this.btimer_array_decimal ??= []; AF(this.btimer_array_decimal, 2); this.btimer_array_decimal[2] = this.btimer_array_decimal[2] - 1;
                    this.btimer_array[2] ++;
                    if (this.btimer_array[2] > 0) {
                        if (this.btimer_array[2] % this.b_interval[2] == this.b_interval[2] - 1) {
                            if (this.btimer_array[2] > this.b_interval[2] * (this.b_number[2] - 1)) {
                                this.btimer_array ??= []; AF(this.btimer_array, 2); this.btimer_array[2] = this.b_break[2];
                            }
                            _bul = scr_fire_bullet(this, scr_get_box(4) + 28, scr_get_box(5) + - 1 * (24 + (scr_get_box(3) - scr_get_box(1)) / 2), 'obj_pinkcatbullet', 270, this.b_speed[2] * _pattern_speed_modifier);
                            _bul.mode = 2;
                            _bul.image_speed = choose(0, 0, 0, 0.02, 0.04, 0, 0.334, 0.5, 1, 0, 0, 0);
                            _bul.image_xscale = 2;
                            _bul.image_yscale = 2;
                        }
                    }
                }
            } while ((!(this.btimer_array_decimal[2] < 1)) && LOOP('Dbulletcontroller#9'));

        }
        if (W('obj_pinkcatbullet', function (other) {
            if (this.life_time >= 30) {
                if (this.y < scr_get_box(1) || this.y > scr_get_box(3)) {
                    this.image_alpha = this.image_alpha - 0.05 * this.speed;
                    if (this.image_alpha <= 0) {
                        instance_destroy(this);
                    }
                }
            }
        }, this) === EXIT) return;
    }
  }
  type206() {
    let dir, xx, yy, num, d, slasher, i, attacktimer, quizReady, _maru, _batsu, xmod, shadowman_tommygun_manager, triangle_count, tempnum, _flip, _angle, _dist, choosey, choosex, shuriken, _lifetime, delay, _ratio, _dir, _x, _y, test, _side, angle, dist, a, _max, sinfact, sinebase, _spread, iii, __dir, _spd, _sameattacki, _smashcut, spring, scarecrow1, scarecrow2, scarecrow3, o, offset_last, bx, by, off, last_blue, bullet_offset, blue, shooter, ___x, ___y, _bullet_speed_modifier, _bullet_interval_modifier, _heart_tension_value, _d_mild, _s_mild, _d_medium, _s_medium, _d_spicy, _s_spicy, _d_beat, _d_conga, _s_conga, _d_conga_last, _hflip, _vflip, _binterval, _bspeed, _d_medmild, _s_medmild, _rside, _box_x, _box_y, _bul, _lane_distance, _bomb, _fill_bulletlist, _d_tuning, _s_tuning, _speed_multiplier, _speed_v, _speed_h, _speed_h1_final, _speed_h2_final, _speed_v_final, _speed_strays, _speed_bursts, _d_bursts, _delay, _speed_12, _speed_3, _diradd, _shot, _doki_queue, _doki_dist, _nextdelay, _speed_final, _shot_prev, _dir_prev, _spd_prev, _heartshot, _bdir, _blane, _bullet_scale, _shootdist, _lanebuldist, _the_value, _timeadd, _startdelay, _list_xy, _randompattern, _list_order, _xsign, _xoffset, _ysign, _yoffset, _xrotate, _yrotate, _box_xscale, _box_yscale, _pattern_speed_modifier, _node_dist_test, t70a, t70b, t70_bullet, t70rand, _purple_omega, _green_omega, _aqua_chainknife, _aqua_fanofknives, _aqua_knife_leafling, _aqua_knife_everything, _duck, _sethsupport, _step, fi, _rate, spread, tracktime, loc, do_dir, _words1, _words2, _newtimer;
    if (this.type == 206) {
        if (this.made == 0) {
            this.made = 1;
            this.phase = 0;
            this.btimer = 0;
            this.grid_x = 3;
            this.grid_y = 0;
            if (W('obj_heart', function (other) {
                this.sprite_index = 'spr_purpleheart';
                this.canmove = 0;
            }, this) === EXIT) return;
            if (W('obj_growtangle', function (other) {
                if (!T(i_ex('obj_purplecontrols'))) {
                    instance_create_depth(this.x, this.y, 4, 'obj_purplecontrols');
                }
                O('obj_purplecontrols').mode = 2;
                O('obj_purplecontrols').lane_x = 0;
                O('obj_purplecontrols').lane_y = 3;
            }, this) === EXIT) return;
            global.turntimer = 240;
        }
        _box_x = S.camera_get_view_x(0) + 320;
        _box_y = S.camera_get_view_y(0) + 240;
        if (instance_exists('obj_growtangle')) {
            _box_x = scr_get_box(4);
            _box_y = scr_get_box(5);
        }
        if (this.btimer >= 6) {
            _lane_distance = 40;
            snd_play('snd_whip_throw_only');
            _bomb = instance_create(_box_x - _lane_distance * 1.5 + this.grid_x * _lane_distance, _box_y - _lane_distance * 1.5 + this.grid_y * _lane_distance, 'obj_fusebomb');
            _bomb.fuse_time = 60;
            _bomb.grid_x = this.grid_x;
            _bomb.grid_y = this.grid_y;
            _bomb.mode = 2;
            _bomb.active = 1;
            if (choose(0, 1) == 0) {
                this.grid_x = this.grid_x + (- 2 + irandom(4));
                this.grid_y = this.grid_y + choose(- 2, - 1, 1, 2);
            } else {
                this.grid_x = this.grid_x + choose(- 2, - 1, 1, 2);
                this.grid_y = this.grid_y + (- 2 + irandom(4));
            }
            if (this.grid_x >= 4) {
                this.grid_x = this.grid_x - 4;
            } else if (this.grid_x < 0) {
                this.grid_x = this.grid_x + 4;
            }
            if (this.grid_y >= 4) {
                this.grid_y = this.grid_y - 4;
            } else if (this.grid_y < 0) {
                this.grid_y = this.grid_y + 4;
            }
            this.phase = this.phase + 1;
            if (this.phase < 2) {
                this.btimer = this.btimer - 35;
            } else if (this.phase < 4) {
                this.btimer = this.btimer - 25;
            } else if (this.phase < 6) {
                this.btimer = this.btimer - 18;
            } else if (this.phase < 8) {
                this.btimer = this.btimer - 11;
            } else if (this.phase < 9) {
                this.btimer = this.btimer - 8;
            } else if (this.phase < 12) {
                this.btimer = this.btimer - 6;
            } else {
                this.btimer = this.btimer - 99;
            }
        }
    }
  }
  type207() {
    let dir, xx, yy, num, d, slasher, i, attacktimer, quizReady, _maru, _batsu, xmod, shadowman_tommygun_manager, triangle_count, tempnum, _flip, _angle, _dist, choosey, choosex, shuriken, _lifetime, delay, _ratio, _dir, _x, _y, test, _side, angle, dist, a, _max, sinfact, sinebase, _spread, iii, __dir, _spd, _sameattacki, _smashcut, spring, scarecrow1, scarecrow2, scarecrow3, o, offset_last, bx, by, off, last_blue, bullet_offset, blue, shooter, ___x, ___y, _bullet_speed_modifier, _bullet_interval_modifier, _heart_tension_value, _d_mild, _s_mild, _d_medium, _s_medium, _d_spicy, _s_spicy, _d_beat, _d_conga, _s_conga, _d_conga_last, _hflip, _vflip, _binterval, _bspeed, _d_medmild, _s_medmild, _rside, _box_x, _box_y, _bul, _lane_distance, _bomb, _fill_bulletlist, _d_tuning, _s_tuning, _speed_multiplier, _speed_v, _speed_h, _speed_h1_final, _speed_h2_final, _speed_v_final, _speed_strays, _speed_bursts, _d_bursts, _delay, _speed_12, _speed_3, _diradd, _shot, _doki_queue, _doki_dist, _nextdelay, _speed_final, _shot_prev, _dir_prev, _spd_prev, _heartshot, _bdir, _blane, _bullet_scale, _shootdist, _lanebuldist, _the_value, _timeadd, _startdelay, _list_xy, _randompattern, _list_order, _xsign, _xoffset, _ysign, _yoffset, _xrotate, _yrotate, _box_xscale, _box_yscale, _pattern_speed_modifier, _node_dist_test, t70a, t70b, t70_bullet, t70rand, _purple_omega, _green_omega, _aqua_chainknife, _aqua_fanofknives, _aqua_knife_leafling, _aqua_knife_everything, _duck, _sethsupport, _step, fi, _rate, spread, tracktime, loc, do_dir, _words1, _words2, _newtimer;
    if (this.type == 207) {
        if (this.made == 0) {
            this.made = 1;
            this.btimer = 0;
            if (W('obj_heart', function (other) {
                this.sprite_index = 'spr_purpleheart';
                this.canmove = 0;
            }, this) === EXIT) return;
            if (W('obj_growtangle', function (other) {
                if (!T(i_ex('obj_purplecontrols'))) {
                    instance_create_depth(this.x, this.y, 4, 'obj_purplecontrols');
                }
                O('obj_purplecontrols').mode = 6;
            }, this) === EXIT) return;
            global.turntimer = 290;
        }
    }
  }
  type208() {
    let dir, xx, yy, num, d, slasher, i, attacktimer, quizReady, _maru, _batsu, xmod, shadowman_tommygun_manager, triangle_count, tempnum, _flip, _angle, _dist, choosey, choosex, shuriken, _lifetime, delay, _ratio, _dir, _x, _y, test, _side, angle, dist, a, _max, sinfact, sinebase, _spread, iii, __dir, _spd, _sameattacki, _smashcut, spring, scarecrow1, scarecrow2, scarecrow3, o, offset_last, bx, by, off, last_blue, bullet_offset, blue, shooter, ___x, ___y, _bullet_speed_modifier, _bullet_interval_modifier, _heart_tension_value, _d_mild, _s_mild, _d_medium, _s_medium, _d_spicy, _s_spicy, _d_beat, _d_conga, _s_conga, _d_conga_last, _hflip, _vflip, _binterval, _bspeed, _d_medmild, _s_medmild, _rside, _box_x, _box_y, _bul, _lane_distance, _bomb, _fill_bulletlist, _d_tuning, _s_tuning, _speed_multiplier, _speed_v, _speed_h, _speed_h1_final, _speed_h2_final, _speed_v_final, _speed_strays, _speed_bursts, _d_bursts, _delay, _speed_12, _speed_3, _diradd, _shot, _doki_queue, _doki_dist, _nextdelay, _speed_final, _shot_prev, _dir_prev, _spd_prev, _heartshot, _bdir, _blane, _bullet_scale, _shootdist, _lanebuldist, _the_value, _timeadd, _startdelay, _list_xy, _randompattern, _list_order, _xsign, _xoffset, _ysign, _yoffset, _xrotate, _yrotate, _box_xscale, _box_yscale, _pattern_speed_modifier, _node_dist_test, t70a, t70b, t70_bullet, t70rand, _purple_omega, _green_omega, _aqua_chainknife, _aqua_fanofknives, _aqua_knife_leafling, _aqua_knife_everything, _duck, _sethsupport, _step, fi, _rate, spread, tracktime, loc, do_dir, _words1, _words2, _newtimer;
    if (this.type == 208) {
        if (this.made == 0) {
            this.made = 1;
            this.btimer = 0;
            if (W('obj_heart', function (other) {
                this.sprite_index = 'spr_purpleheart';
                this.canmove = 0;
            }, this) === EXIT) return;
            if (W('obj_growtangle', function (other) {
                if (!T(i_ex('obj_purplecontrols'))) {
                    instance_create_depth(this.x, this.y, 4, 'obj_purplecontrols');
                    O('obj_purplecontrols').mode = 7;
                    O('obj_purplecontrols').difficulty = other.difficulty;
                }
            }, this) === EXIT) return;
            snd_play('snd_jump');
            global.turntimer = 630;
        }
    }
  }
  type209() {
    let dir, xx, yy, num, d, slasher, i, attacktimer, quizReady, _maru, _batsu, xmod, shadowman_tommygun_manager, triangle_count, tempnum, _flip, _angle, _dist, choosey, choosex, shuriken, _lifetime, delay, _ratio, _dir, _x, _y, test, _side, angle, dist, a, _max, sinfact, sinebase, _spread, iii, __dir, _spd, _sameattacki, _smashcut, spring, scarecrow1, scarecrow2, scarecrow3, o, offset_last, bx, by, off, last_blue, bullet_offset, blue, shooter, ___x, ___y, _bullet_speed_modifier, _bullet_interval_modifier, _heart_tension_value, _d_mild, _s_mild, _d_medium, _s_medium, _d_spicy, _s_spicy, _d_beat, _d_conga, _s_conga, _d_conga_last, _hflip, _vflip, _binterval, _bspeed, _d_medmild, _s_medmild, _rside, _box_x, _box_y, _bul, _lane_distance, _bomb, _fill_bulletlist, _d_tuning, _s_tuning, _speed_multiplier, _speed_v, _speed_h, _speed_h1_final, _speed_h2_final, _speed_v_final, _speed_strays, _speed_bursts, _d_bursts, _delay, _speed_12, _speed_3, _diradd, _shot, _doki_queue, _doki_dist, _nextdelay, _speed_final, _shot_prev, _dir_prev, _spd_prev, _heartshot, _bdir, _blane, _bullet_scale, _shootdist, _lanebuldist, _the_value, _timeadd, _startdelay, _list_xy, _randompattern, _list_order, _xsign, _xoffset, _ysign, _yoffset, _xrotate, _yrotate, _box_xscale, _box_yscale, _pattern_speed_modifier, _node_dist_test, t70a, t70b, t70_bullet, t70rand, _purple_omega, _green_omega, _aqua_chainknife, _aqua_fanofknives, _aqua_knife_leafling, _aqua_knife_everything, _duck, _sethsupport, _step, fi, _rate, spread, tracktime, loc, do_dir, _words1, _words2, _newtimer;
    if (this.type == 209) {
        if (this.made == 0) {
            this.made = 1;
            if (W('obj_pink_battlemovement', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            _box_xscale = 2.4;
            _box_yscale = 1.249;
            if (instance_exists('obj_growtangle')) {
                if (O('obj_growtangle').image_xscale == O('obj_growtangle').maxxscale) {
                    if (W('obj_growtangle', function (other) {
                        instance_create_depth(this.x, this.y, this.depth, 'obj_growtangle');
                        instance_destroy(this);
                    }, this) === EXIT) return;
                }
            }
            if (W('obj_grazebox', function (other) {
                this.grazetimefactor = 0;
            }, this) === EXIT) return;
            if (W('obj_growtangle', function (other) {
                this.maxxscale = 2 * _box_xscale;
                this.maxyscale = 2 * _box_yscale;
                if (W(instance_create_depth(this.x + 200, this.y, this.depth - 11, 'obj_pink_battlemovement'), function (other) {
                    this.mode = 1;
                    this.air_time = 1;
                    this.sprite_index = 'spr_pink_ball';
                    this.image_speed = 1;
                    this.dest_x = other.x;
                    this.dest_y = other.y - 136;
                }, this) === EXIT) return EXIT;
                if (!T(instance_exists('obj_pink_curtains'))) {
                    instance_create_depth(this.x, this.y - 88, this.depth - 10, 'obj_pink_curtains');
                }
            }, this) === EXIT) return;
            if (W('obj_pink_curtains', function (other) {
                this.difficulty = other.difficulty;
            }, this) === EXIT) return;
            global.turntimer = 425;
            if (this.difficulty > 0) {
                global.turntimer = global.turntimer + 80;
            }
        }
        if (this.difficulty == 0) {
            if (global.turntimer == 408) {
                if (!T(instance_exists('obj_moveheart'))) {
                    S.scr_moveheart();
                }
            }
        }
        if (this.difficulty > 0) {
            if (global.turntimer == 488) {
                if (!T(instance_exists('obj_moveheart'))) {
                    S.scr_moveheart();
                }
            }
        }
        if (W('obj_heart', function (other) {
            this.wspeed = global.sp * 1.5;
        }, this) === EXIT) return;
    }
  }
}
// Chapter 5's attack types for Pink, on the port's controller (its step calls this['type' + type]).
const DB = objectClass('obj_dbulletcontroller');
for (const k of Object.getOwnPropertyNames(PinkTypes.prototype)) if (k.startsWith('type')) DB.prototype[k] = PinkTypes.prototype[k];

