// Pink moving around the box during her attacks (obj_pink_battlemovement) (machine-translated from the Chapter 5 GML by tools/gen_pink.sh; edit tools/postfix.py, not this file)
/* eslint-disable */
import {
  Instance, S, choose, clamp, collision_circle, collision_point, defineObject, draw_set_color, draw_sprite_ext, draw_sprite_part_ext, global, gpu_set_fog, instance_create_depth, instance_destroy, instance_exists, irandom, lengthdir_x, lengthdir_y, lerp, point_direction, random, sign, snd_play, snd_stop,
} from '../rt.js?v=20261116000937';
import {
  i_ex, scr_approach, scr_get_box,
} from '../common.js?v=20261116000937';
import {
  EXIT, LOOP, O, T, W,
} from '../gml.js?v=20261116000937';

// obj_pink_battlemovement (default sprite spr_pink_ball, depth 0)
class PinkBattlemovement extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_pink_ball';
  }
  cleanUp() {
    S.ds_list_destroy(this.list_bomb);
    S.ds_list_destroy(this.list_bomb_xy);
    S.ds_list_destroy(this.list_burnt);
  }
  create() {
    if (W('obj_pink_enemy', function (other) {
        this.visible = false;
    }, this) === EXIT) return;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.image_speed = 0.334;
    this.mode = 0;
    this.phase = 0;
    this.pattern_time = 0;
    this.animation_time = 0;
    this.grid_x = irandom(3);
    this.grid_y = irandom(3);
    this.pattern_variant = irandom(3);
    this.ammo = 0;
    this.ammo_b = 0;
    this.ammo_max = 0;
    this.shots = 0;
    this.shots_total = 0;
    this.pattern_repeat = 0;
    this.list_bomb = S.ds_list_create();
    this.list_bomb_xy = S.ds_list_create();
    this.bigbomb_id = - 4;
    this.ammo_doki = 3;
    this.list_burnt = S.ds_list_create();
    this.start_x = this.x;
    this.start_y = this.y;
    this.dest_x = this.x;
    this.dest_y = this.y;
    this.wave_angle = 90;
    this.wave_speed = 0;
    this.shake_x = 0;
    this.shake_y = 0;
    this.flash_amount = 0;
    this.on_the_box = false;
    this.box_y_original = 0;
    if (W('obj_growtangle', function (other) {
        other.box_y_original = this.y;
    }, this) === EXIT) return;
    this.box_pushdown_dest = 0;
    this.box_pushdown_real = 0;
    this.air_time = 1;
    this.air_height = 90;
  }
  onDestroy() {
    if (W('obj_growtangle', function (other) {
        this.y = other.box_y_original;
    }, this) === EXIT) return;
    if (i_ex('obj_pink_enemy') && O('obj_pink_enemy').visible == 0) {
        O('obj_pink_enemy').visible = true;
    }
  }
  draw() {
    let _xx, _yy, _gy, _gx, _scale, _pushup;
    if (this.air_time > 0) {
        _xx = lerp(this.dest_x, this.x, this.air_time);
        _yy = lerp(this.dest_y, this.y, this.air_time) + lengthdir_y(this.air_height, (1 - this.air_time) * 180);
    } else {
        _xx = this.x;
        _yy = this.y;
    }
    switch (this.sprite_index) {
      case 'spr_pink_idle':
        _xx = _xx - 24 * this.image_xscale;
        _yy = _yy - 19 * this.image_yscale;
        break;
    }
    if (this.sprite_index != 'spr_pink_front_surprised') {
        draw_sprite_ext(this.sprite_index, this.image_index, _xx + this.shake_x, _yy + this.shake_y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
    } else {
        draw_sprite_ext(this.sprite_index, this.image_index, _xx + this.shake_x, _yy + this.shake_y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
        draw_set_color(0xffffff);
        _gy = 0;
        for (let _r158 = 0, _n158 = (6); _r158 < _n158; _r158++) {
            _gx = 0;
            for (let _r167 = 0, _n167 = (4); _r167 < _n167; _r167++) {
                if (S.ds_list_find_value(this.list_burnt, _gy * 4 + _gx) == 1) {
                    draw_sprite_part_ext('spr_pink_front_burnt', 0, 2 + _gx * 8, - 2 + _gy * 8, 16, 16, this.x + (- 2 + _gx) * 16, this.y + 4 + (- 3 + _gy) * 16, this.image_xscale, this.image_yscale, this.image_blend, this.image_alpha);
                }
                _gx = _gx + 1;
            }
            _gy = _gy + 1;
        }
    }
    if (this.flash_amount > 0) {
        gpu_set_fog(true, 65280, 0, 0);
        draw_sprite_ext(this.sprite_index, this.image_index, _xx + this.shake_x, _yy + this.shake_y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.flash_amount);
        gpu_set_fog(false, 16777215, 0, 0);
    }
    if (this.sprite_index == 'spr_pink_throw_bomb') {
        if (this.ammo_b == 1) {
            if (this.phase < 3) {
                if (this.image_index >= 4 && this.image_index < 6) {
                    if (S.ds_list_find_value(this.list_bomb, 0) == 3 && global.flag[1914] == 2) {
                        _scale = clamp((this.image_index - 4) * 1.125, 0, 1) * 2 * 1.75;
                        _pushup = - 26 * _scale;
                    } else {
                        _scale = clamp((this.image_index - 4) * 1.125, 0, 1) * 2;
                        _pushup = - 24 * _scale;
                    }
                    draw_sprite_ext('spr_fusebomb_big', 0, this.x - 4 + (- 4 + random(8)), this.y - 88 + (- 4 + random(8)) + _pushup, _scale, _scale, 0, 0xffffff, 1);
                }
            }
        }
    }
  }
  step() {
    let _bulk, _bom, _end_the_thing, i, _list_random, _thrown, _fastthrow, _box_x, _box_y, _lane_distance, _xx, _yy, _bomb, _skipspd, _sweat, _endspeed, _bomb_scale, _pattime, _dx, _dy, _ratio, _spd, _boost, _frame_old, _gy, _gx, _burn, _sounded, _getheart, _dokidir, _heart, _box_movement;
    this.shake_x = scr_approach(this.shake_x, 0, 2);
    this.shake_y = scr_approach(this.shake_y, 0, 2);
    this.flash_amount = scr_approach(this.flash_amount, 0, 0.1);
    switch (this.mode) {
      case 0:
        if (this.sprite_index == 'spr_pink_front_ohoho') {
            this.animation_time = this.animation_time + 1;
            if (this.animation_time == 1) {
                this.image_index = 0;
                this.image_speed = 0.5;
            }
            if (this.animation_time == 5) {
                this.image_speed = 0.334;
            }
            if (this.animation_time == 17) {
                this.image_speed = 0.25;
            }
        }
        break;
      case 1:
        if (global.turntimer <= 0) {
            if (W('obj_growtangle', function (other) {
                this.image_xscale = this.image_xscale * 0.75 + this.maxxscale * 0.25;
                if (this.image_xscale > this.maxxscale - 1 && this.image_xscale < this.maxxscale + 1) {
                    this.image_xscale = this.maxxscale;
                }
                this.image_yscale = this.image_yscale * 0.75 + this.maxyscale * 0.25;
                if (this.image_yscale > this.maxyscale - 1 && this.image_yscale < this.maxyscale + 1) {
                    this.image_yscale = this.maxyscale;
                }
            }, this) === EXIT) return;
        }
        if (this.air_time > 0) {
            this.air_time = Math.max(0, this.air_time - 5.12 / this.air_height);
            if (this.air_time <= 0) {
                this.x = this.dest_x;
                this.y = this.dest_y;
                this.mode = 0;
                if (!T(instance_exists('obj_pink_curtains'))) {
                    this.sprite_index = 'spr_pink_idle';
                    this.image_speed = 0.334;
                } else {
                    this.depth = this.depth + 5;
                    this.sprite_index = 'spr_pink_sing';
                    this.image_xscale = - this.image_xscale;
                    this.image_index = 0;
                    this.image_speed = 0;
                    this.image_xscale = - this.image_xscale;
                    this.pattern_time = - 20;
                    this.mode = 7;
                }
                if (global.turntimer > 0) {
                    this.on_the_box = true;
                    this.box_pushdown_dest = 56;
                    if (W('obj_purplecontrols', function (other) {
                        this.can_spin = true;
                    }, this) === EXIT) return;
                } else {
                    instance_destroy(this);
                }
            }
        }
        break;
      case 2:
      case 3:
      case 4:
        switch (this.phase) {
          case 0:
            this.sprite_index = 'spr_pink_front_throw_bomb';
            this.image_index = 0;
            this.image_speed = 0;
            this.pattern_time = 0;
            if (this.mode == 2) {
                this.ammo = 4;
            }
            if (this.mode == 3) {
                this.ammo = 2;
            }
            if (this.mode == 4) {
                this.ammo = 7;
            }
            S.ds_list_clear(this.list_bomb);
            switch (this.mode) {
              case 3:
                switch (irandom(8)) {
                  case 0:
                    S.ds_list_add(this.list_bomb, 0, 1.5);
                    break;
                  case 1:
                    S.ds_list_add(this.list_bomb, 0, 2);
                    break;
                  case 2:
                    S.ds_list_add(this.list_bomb, 0, 2.5);
                    break;
                  case 3:
                    S.ds_list_add(this.list_bomb, 0.5, 2);
                    break;
                  case 4:
                    S.ds_list_add(this.list_bomb, 0.5, 2.5);
                    break;
                  case 5:
                    S.ds_list_add(this.list_bomb, 0.5, 3);
                    break;
                  case 6:
                    S.ds_list_add(this.list_bomb, 1, 2.5);
                    break;
                  case 7:
                    S.ds_list_add(this.list_bomb, 1, 3);
                    break;
                  default:
                    S.ds_list_add(this.list_bomb, 1.5, 3);
                    break;
                }
                S.ds_list_shuffle(this.list_bomb);
                break;
              case 4:
                switch (irandom(8)) {
                  case 0:
                    S.ds_list_add(this.list_bomb, 0, 1.5);
                    break;
                  case 1:
                    S.ds_list_add(this.list_bomb, 0, 2);
                    break;
                  case 2:
                    S.ds_list_add(this.list_bomb, 0, 2.5);
                    break;
                  case 3:
                    S.ds_list_add(this.list_bomb, 0.5, 2);
                    break;
                  case 4:
                    S.ds_list_add(this.list_bomb, 0.5, 2.5);
                    break;
                  case 5:
                    S.ds_list_add(this.list_bomb, 0.5, 3);
                    break;
                  case 6:
                    S.ds_list_add(this.list_bomb, 1, 2.5);
                    break;
                  case 7:
                    S.ds_list_add(this.list_bomb, 1, 3);
                    break;
                  default:
                    S.ds_list_add(this.list_bomb, 1.5, 3);
                    break;
                }
                S.ds_list_shuffle(this.list_bomb);
                S.ds_list_insert(this.list_bomb, 0, 0);
                S.ds_list_add(this.list_bomb, 0);
                break;
              default:
                S.ds_list_add(this.list_bomb, 0, 1, 2, 3);
                S.ds_list_shuffle(this.list_bomb);
            }
            this.shots = 0;
            this.phase = this.phase + 1;
          case 1:
            switch (Math.floor(this.image_index)) {
              case 0:
                this.image_index = this.image_index + 0.125;
                break;
              case 1:
                this.image_index = this.image_index + 0.334;
                break;
              case 2:
                this.image_index = this.image_index + 0.334;
                break;
              case 3:
                this.image_index = this.image_index + 0.5;
                break;
              case 4:
                this.image_index = this.image_index + 0.5;
                break;
              case 5:
                this.image_index = this.image_index + 0.25;
                break;
              case 6:
                this.image_index = this.image_index + 0.5;
                break;
              case 7:
                this.image_index = this.image_index + 1;
                break;
              case 8:
                this.image_index = this.image_index + 1;
                break;
              case 9:
                this.image_index = this.image_index + 1;
                break;
              case 10:
                this.image_index = this.image_index + 1;
                if (this.mode == 4) {
                    if (this.image_index >= 11) {
                        if (this.ammo_b > 0) {
                            this.image_index = 7;
                            if (!T(instance_exists(this.bigbomb_id))) {
                                this.bigbomb_id = instance_create_depth(this.x + 4, this.y - 88, this.depth - 1, 'obj_fusebomb');
                                if (W(this.bigbomb_id, function (other) {
                                    this.fuse_time = 60;
                                    this.air_time = 0;
                                    this.air_height = 0;
                                    this.mode = 1;
                                    this.inside_the_grid = false;
                                    this.x = this.dest_x;
                                    this.y = this.dest_y;
                                    this.grid_x = 1.5;
                                }, this) === EXIT) return;
                            } else {
                                if (W(this.bigbomb_id, function (other) {
                                    this.grow = this.grow + Math.min(other.ammo_b, 0.3);
                                    other.ammo_b = Math.max(0, other.ammo_b - 0.3);
                                }, this) === EXIT) return;
                            }
                        }
                    }
                }
                break;
              case 11:
                this.image_index = this.image_index + 1;
                break;
              case 12:
                if (instance_exists(this.bigbomb_id)) {
                    this.pattern_time = this.pattern_time + 1;
                    if (this.pattern_time == 20) {
                        snd_play('snd_pink_huh');
                    }
                    if (this.pattern_time >= 20) {
                        if (this.pattern_time % 4 == 0) {
                            this.shake_x = - 2;
                        }
                        if (this.pattern_time % 4 == 2) {
                            this.shake_x = 2;
                        }
                    }
                } else if (this.mode != 4 || this.ammo >= 7 || this.ammo <= 1) {
                    this.image_index = this.image_index + 0.167;
                } else {
                    this.image_index = this.image_index + 0.5;
                }
                break;
              default:
                this.image_index = this.image_index + 0.334;
                if (! (this.image_index < 14)) {
                    this.y = this.y - 24;
                    this.phase = this.phase + 1;
                }
            }
            break;
          case 2:
            switch (Math.floor(this.image_index)) {
              case 14:
                this.image_index = this.image_index + 1;
                if (this.image_index >= 15) {
                    _bulk = 1;
                    for (let _r1181 = 0, _n1181 = (_bulk); _r1181 < _n1181; _r1181++) {
                        this.ammo = this.ammo - 1;
                        this.shots = this.shots + 1;
                        this.shots_total = this.shots_total + 1;
                        if (!T(instance_exists(this.bigbomb_id))) {
                            snd_play(choose('snd_pink_throw', 'snd_pink_throw2'));
                            snd_play('snd_whip_throw_only');
                            snd_play('snd_bump');
                            _bom = instance_create_depth(this.x - 60 + S.ds_list_find_value(this.list_bomb, this.ammo % 4) * 40, this.y + 58, this.depth - 1, 'obj_fusebomb');
                            if (W(_bom, function (other) {
                                this.fuse_time = 40;
                                this.air_height = 110;
                                this.mode = 1;
                                this.inside_the_grid = false;
                                this.x = other.x;
                                this.y = this.dest_y + 16;
                                this.grid_x = S.ds_list_find_value(other.list_bomb, other.ammo % 4);
                            }, this) === EXIT) return;
                            continue;
                        }
                        if (W(this.bigbomb_id, function (other) {
                            this.fuse_time = 45;
                            this.air_time = 1;
                            this.air_height = 20;
                            this.mode = 1;
                            this.x = other.x;
                            this.dest_y = this.dest_y + 106;
                        }, this) === EXIT) return;
                    }
                }
                break;
              case 15:
                if (this.mode != 4 && this.ammo > 0 || this.ammo > 0 && this.ammo != 1 && this.ammo != 5) {
                    this.image_index = this.image_index + 1;
                } else {
                    this.image_index = this.image_index + 0.5;
                }
                break;
              case 16:
              case 17:
                if (this.mode != 4 && this.ammo > 0 || this.ammo > 0 && this.ammo != 1 && this.ammo != 5) {
                    this.image_index = this.image_index + 2;
                    if (this.image_index >= 17) {
                        this.image_index = 3;
                        this.y = this.y + 24;
                    }
                } else {
                    this.image_index = this.image_index + 0.08;
                    if (this.image_index >= 17) {
                        this.image_index = 2.999;
                        this.y = this.y + 24;
                        if (this.mode == 4 && this.ammo > 0) {
                            S.ds_list_clear(this.list_bomb);
                            S.ds_list_add(this.list_bomb, 0, 1, 2, 3);
                            S.ds_list_shuffle(this.list_bomb);
                            if (this.ammo <= 1) {
                                this.ammo_b = 1.5;
                            }
                            this.image_index = 3;
                            this.phase = this.phase - 1;
                        } else {
                            this.phase = this.phase + 1;
                            this.pattern_time = 0;
                        }
                    }
                }
                break;
              case 3:
                this.image_index = this.image_index + 2;
                break;
              case 4:
                this.image_index = this.image_index + 1;
                break;
              case 5:
                this.image_index = this.image_index + 3;
                break;
              case 6:
                this.image_index = this.image_index + 2;
                break;
              case 7:
                this.image_index = this.image_index + 1;
                break;
              case 8:
                this.image_index = this.image_index + 2;
                break;
              case 9:
                this.image_index = this.image_index + 1;
                break;
              case 10:
                this.image_index = this.image_index + 3;
                break;
              case 11:
                this.image_index = this.image_index + 2;
                break;
              case 12:
                this.image_index = this.image_index + 1;
                break;
              case 13:
                this.image_index = this.image_index + 1;
                if (this.image_index >= 14) {
                    this.y = this.y - 24;
                }
                break;
            }
            break;
          case 3:
            if (this.sprite_index == 'spr_pink_front_throw_bomb') {
                switch (Math.floor(this.image_index)) {
                  case 1:
                    this.image_index = this.image_index - 0.25;
                    break;
                  case 2:
                    this.image_index = this.image_index - 0.334;
                    break;
                }
            }
            this.pattern_time = this.pattern_time + 1;
            if (this.mode == 2) {
                if (this.pattern_time == 25) {
                    snd_play('snd_pink_laugh_long');
                    this.sprite_index = 'spr_pink_front_ohoho';
                    this.image_index = 0;
                    this.image_speed = 0.5;
                }
                if (this.pattern_time == 29) {
                    this.image_speed = 0.334;
                }
                if (this.pattern_time == 41) {
                    this.image_speed = 0.25;
                }
            }
            break;
        }
        break;
      case 5:
        _end_the_thing = false;
        switch (this.phase) {
          case 0:
            if (S.ds_list_size(this.list_bomb) > 0) {
                this.sprite_index = 'spr_pink_throw_bomb';
                this.image_index = 0;
                this.image_speed = 0;
                this.pattern_time = 0;
                this.ammo_max = S.ds_list_size(this.list_bomb);
                if (this.grid_x < 0) {
                    this.grid_x = irandom(3);
                }
                if (this.grid_y < 0) {
                    this.grid_y = irandom(3);
                }
                if (this.ammo_max <= 3) {
                    this.pattern_variant = irandom(3);
                }
                i = 0;
                for (let _r1905 = 0, _n1905 = (S.ds_list_size(this.list_bomb)); _r1905 < _n1905; _r1905++) {
                    if (S.ds_list_find_value(this.list_bomb, i) == 0) {
                        this.ammo_b = 0;
                    } else {
                        this.ammo_b = 1;
                    }
                    this.ammo = this.ammo + 1;
                    i = i + 1;
                }
                if (this.ammo_b == 0) {
                    if (this.ammo_max >= 4) {
                        switch (this.grid_x) {
                          case 1:
                            this.grid_x = 2;
                            break;
                          case 2:
                            this.grid_x = 1;
                            break;
                          default:
                            this.grid_x = 1 + irandom(1);
                        }
                        switch (this.grid_y) {
                          case 1:
                            this.grid_y = 2;
                            break;
                          case 2:
                            this.grid_y = 1;
                            break;
                          default:
                            this.grid_y = 1 + irandom(1);
                        }
                        _list_random = S.ds_list_create();
                        S.ds_list_add(_list_random, 0, 1, 2, 3);
                        S.ds_list_shuffle(_list_random);
                        i = 0;
                        for (let _r2059 = 0, _n2059 = (4); _r2059 < _n2059; _r2059++) {
                            switch (S.ds_list_find_value(_list_random, i)) {
                              case 0:
                                S.ds_list_insert(this.list_bomb_xy, i * 2, this.grid_x);
                                S.ds_list_insert(this.list_bomb_xy, i * 2 + 1, 0);
                                break;
                              case 1:
                                S.ds_list_insert(this.list_bomb_xy, i * 2, this.grid_x);
                                S.ds_list_insert(this.list_bomb_xy, i * 2 + 1, 3);
                                break;
                              case 2:
                                S.ds_list_insert(this.list_bomb_xy, i * 2, 0);
                                S.ds_list_insert(this.list_bomb_xy, i * 2 + 1, this.grid_y);
                                break;
                              default:
                                S.ds_list_insert(this.list_bomb_xy, i * 2, 3);
                                S.ds_list_insert(this.list_bomb_xy, i * 2 + 1, this.grid_y);
                            }
                            i = i + 1;
                        }
                        S.ds_list_destroy(_list_random);
                    } else {
                        i = 0;
                        for (let _r2210 = 0, _n2210 = (S.ds_list_size(this.list_bomb)); _r2210 < _n2210; _r2210++) {
                            if (this.ammo_max <= 3) {
                                S.ds_list_insert(this.list_bomb_xy, i * 2, this.grid_x);
                                S.ds_list_insert(this.list_bomb_xy, i * 2 + 1, this.grid_y);
                                switch (irandom(1)) {
                                  case 1:
                                    if (this.pattern_variant < 2) {
                                        this.grid_x = this.grid_x + 2;
                                    } else {
                                        this.grid_x = this.grid_x - 2;
                                    }
                                    if (this.pattern_variant % 2 == 0) {
                                        this.grid_y = this.grid_y + 1;
                                    } else {
                                        this.grid_y = this.grid_y - 1;
                                    }
                                    break;
                                  default:
                                    if (this.pattern_variant < 2) {
                                        this.grid_x = this.grid_x + 1;
                                    } else {
                                        this.grid_x = this.grid_x - 1;
                                    }
                                    if (this.pattern_variant % 2 == 0) {
                                        this.grid_y = this.grid_y + 2;
                                        break;
                                    }
                                    this.grid_y = this.grid_y - 2;
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
                            i = i + 1;
                        }
                    }
                }
                if (S.ds_list_size(this.list_bomb) == 1) {
                    this.ammo_doki = 2;
                }
                this.shots = 0;
                this.phase = this.phase + 1;
            } else if (global.turntimer <= 0) {
                _end_the_thing = true;
                break;
            }
          case 1:
            _thrown = false;
            _fastthrow = false;
            if (this.ammo_max >= 4 || this.ammo_max >= 3 && this.ammo + 1 < this.ammo_max) {
                _fastthrow = true;
            }
            if (this.sprite_index == 'spr_pink_throw_bomb') {
                switch (Math.floor(this.image_index)) {
                  case 0:
                    this.image_index = this.image_index + 1;
                    break;
                  case 1:
                    this.image_index = this.image_index + 0.5;
                    break;
                  case 2:
                    this.image_index = this.image_index + 1;
                    break;
                  case 3:
                    this.image_index = this.image_index + 0.5;
                    break;
                  case 4:
                    if (this.shots <= 0) {
                        if (S.ds_list_find_value(this.list_bomb, 0) == 3) {
                            if (global.flag[1914] == 2) {
                                if (this.image_index < 4.03) {
                                    snd_play('snd_spellcast', 0.25, 0.5);
                                    snd_play('snd_spellcast', 0.25, 0.3333333333333333);
                                }
                                if (this.image_index < 4.33) {
                                    for (let _r2630 = 0, _n2630 = (3); _r2630 < _n2630; _r2630++) {
                                        instance_create_depth(this.x, this.y - 100, this.depth - 1, 'obj_pinkchargeball');
                                    }
                                }
                            }
                            this.image_index = this.image_index + 0.03;
                        } else if (this.ammo_b >= 1) {
                            if (global.flag[1914] == 2) {
                                this.image_index = this.image_index + 0.06;
                            } else {
                                this.image_index = this.image_index + 0.04;
                            }
                        } else if (this.pattern_repeat <= 0) {
                            this.image_index = this.image_index + 0.167;
                        } else if (this.pattern_repeat <= 3) {
                            this.image_index = this.image_index + 0.2;
                        } else {
                            this.image_index = this.image_index + 0.25;
                        }
                    } else {
                        this.image_index = this.image_index + 1;
                    }
                    if (this.image_index >= 5) {
                        this.image_index = 5;
                        _thrown = true;
                    }
                    break;
                }
            }
            if (this.sprite_index == 'spr_pink_throw_bomb2') {
                switch (Math.floor(this.image_index)) {
                  case 0:
                    this.image_index = this.image_index + 2;
                    break;
                  case 1:
                    this.image_index = this.image_index + 0.5;
                    break;
                  case 2:
                    this.image_index = this.image_index + 1;
                    break;
                  case 3:
                    this.image_index = this.image_index + 0.5;
                    break;
                  case 4:
                    this.image_index = this.image_index + 1;
                    break;
                  case 5:
                    this.image_index = this.image_index + 1;
                    break;
                  case 6:
                    this.image_index = this.image_index + 1;
                    break;
                  case 7:
                    this.image_index = this.image_index + 1;
                    break;
                  case 8:
                    this.image_index = this.image_index + 1;
                    break;
                  case 9:
                    this.image_index = this.image_index + 1;
                    break;
                  case 10:
                    if (this.shots <= 0) {
                        if (S.ds_list_find_value(this.list_bomb, 0) == 3) {
                            this.image_index = this.image_index + 0.03;
                        } else if (this.ammo_b >= 1) {
                            this.image_index = this.image_index + 0.04;
                        } else if (this.pattern_repeat <= 0) {
                            this.image_index = this.image_index + 0.167;
                        } else if (this.pattern_repeat <= 3) {
                            this.image_index = this.image_index + 0.2;
                        } else {
                            this.image_index = this.image_index + 0.25;
                        }
                    } else {
                        this.image_index = this.image_index + 1;
                    }
                    if (this.image_index >= 11) {
                        this.image_index = 11;
                        _thrown = true;
                    }
                    break;
                }
            }
            if (T(_thrown)) {
                this.ammo = this.ammo - 1;
                this.shots = this.shots + 1;
                this.shots_total = this.shots_total + 1;
                _box_x = S.camera_get_view_x(0) + 320;
                _box_y = S.camera_get_view_y(0) + 240;
                if (instance_exists('obj_growtangle')) {
                    _box_x = scr_get_box(4);
                    _box_y = scr_get_box(5);
                }
                _lane_distance = 40;
                if (S.ds_list_find_value(this.list_bomb, 0) == 0) {
                    this.ammo_doki = this.ammo_doki - 1;
                    _xx = S.ds_list_find_value(this.list_bomb_xy, 0);
                    _yy = S.ds_list_find_value(this.list_bomb_xy, 1);
                    S.ds_list_delete(this.list_bomb_xy, 0);
                    S.ds_list_delete(this.list_bomb_xy, 0);
                    snd_play(choose('snd_pink_throw', 'snd_pink_throw2'));
                    snd_play('snd_whip_throw_only');
                    this.ammo_b = 0;
                    _bomb = instance_create_depth(_box_x - _lane_distance * 1.5 + _xx * _lane_distance, _box_y - _lane_distance * 1.5 + _yy * _lane_distance, this.depth - 1, 'obj_fusebomb');
                    if (W(_bomb, function (other) {
                        if (other.ammo_doki <= 0) {
                            other.ammo_doki = 2;
                            this.has_heart = true;
                        }
                        this.fuse_time = 55 + other.ammo * 2 - other.pattern_repeat * 2;
                        this.grid_x = _xx;
                        this.grid_y = _yy;
                        this.air_height = 110;
                        this.mode = 1;
                        this.x = other.x - 4;
                        this.y = other.y - 88;
                    }, this) === EXIT) return;
                }
                if (S.ds_list_find_value(this.list_bomb, 0) == 1) {
                    snd_play(choose('snd_pink_throw', 'snd_pink_throw2'));
                    snd_play('snd_whip_throw_only');
                    this.ammo_b = 1;
                    _xx = choose(1, 2);
                    _yy = 1;
                    _bomb = instance_create_depth(_box_x - _lane_distance * 1.5 + _xx * _lane_distance, _box_y - _lane_distance * 1.5 + _yy * _lane_distance, this.depth - 1, 'obj_fusebomb_big');
                    if (W(_bomb, function (other) {
                        this.fuse_time = 60;
                        this.grid_x = _xx;
                        this.grid_y = _yy;
                        this.air_height = 110;
                        this.mode = 0;
                        this.active = 1;
                        this.friendlyfire = true;
                        this.x = other.x - 4;
                        this.y = other.y - 88;
                    }, this) === EXIT) return;
                }
                if (S.ds_list_find_value(this.list_bomb, 0) == 2 || S.ds_list_find_value(this.list_bomb, 0) == 4) {
                    snd_play(choose('snd_pink_throw', 'snd_pink_throw2'));
                    snd_play('snd_whip_throw_only');
                    this.ammo_b = 1;
                    _xx = S.ds_list_find_value(this.list_bomb_xy, 0);
                    _yy = S.ds_list_find_value(this.list_bomb_xy, 1);
                    S.ds_list_delete(this.list_bomb_xy, 0);
                    S.ds_list_delete(this.list_bomb_xy, 0);
                    _bomb = instance_create_depth(_box_x - _lane_distance * 1.5 + _xx * _lane_distance, _box_y - _lane_distance * 1.5 + _yy * _lane_distance, this.depth - 1, 'obj_fusebomb_big');
                    if (W(_bomb, function (other) {
                        this.fuse_time = 52 + other.ammo * 3;
                        this.warn_time = 28;
                        this.grid_x = _xx;
                        this.grid_y = _yy;
                        this.air_height = 110;
                        this.mode = 0;
                        this.active = 1;
                        if (S.ds_list_find_value(other.list_bomb, 0) == 4) {
                            this.has_heart = true;
                        }
                        this.x = other.x - 4;
                        this.y = other.y - 88;
                    }, this) === EXIT) return;
                    this.y = this.y - 2;
                }
                if (S.ds_list_find_value(this.list_bomb, 0) == 3) {
                    this.ammo_b = 1;
                    _bomb = instance_create_depth(_box_x, _box_y, this.depth - 1, 'obj_fusebomb_big');
                    if (W(_bomb, function (other) {
                        this.fuse_time = 120;
                        this.air_height = 110;
                        this.air_time = 0;
                        this.mode = 1;
                        this.active = 1;
                        this.friendlyfire = true;
                        if (global.flag[1914] == 2) {
                            snd_play('snd_weaponpull');
                            this.flashbang = 1;
                            this.bling = 18;
                            this.bling_dir = random(1);
                            this.scale_multiplier = 1.85;
                            this.image_xscale = this.image_xscale * this.scale_multiplier;
                            this.image_yscale = this.image_yscale * this.scale_multiplier;
                        }
                        this.x = other.x - 4;
                        this.y = other.y - 4 - 132 * ((1 + this.scale_multiplier) / 2);
                    }, this) === EXIT) return;
                    this.image_index = 4.999;
                    this.pattern_time = 0;
                    this.phase = 3;
                    this.wave_speed = choose(3.85, 4.725, 5.15, 5.95);
                }
                S.ds_list_delete(this.list_bomb, 0);
            } else if (this.ammo > 0) {
                if (this.sprite_index == 'spr_pink_throw_bomb') {
                    switch (Math.floor(this.image_index)) {
                      case 5:
                        this.image_index = this.image_index + 1;
                        break;
                      case 6:
                        this.image_index = this.image_index + 1;
                        break;
                      case 7:
                        this.image_index = this.image_index + 1;
                        break;
                      case 8:
                      case 9:
                        this.image_index = this.image_index + 1;
                        if (this.image_index >= 9) {
                            if (T(_fastthrow)) {
                                this.image_index = 4;
                            } else {
                                this.image_index = 3;
                            }
                        }
                        break;
                    }
                }
                if (this.sprite_index == 'spr_pink_throw_bomb2') {
                    switch (Math.floor(this.image_index)) {
                      case 11:
                        this.image_index = this.image_index + 1;
                        break;
                      case 12:
                        this.image_index = this.image_index + 1;
                        break;
                      case 13:
                        this.image_index = this.image_index + 1;
                        break;
                      case 14:
                      case 15:
                        this.image_index = this.image_index + 1;
                        if (this.image_index >= 15) {
                            if (T(_fastthrow)) {
                                this.image_index = 4;
                            } else {
                                this.image_index = 3;
                            }
                        }
                        break;
                    }
                }
            } else {
                _skipspd = 0;
                if (S.ds_list_size(this.list_bomb) > 0) {
                    _skipspd = 1;
                }
                if (this.sprite_index == 'spr_pink_throw_bomb') {
                    switch (Math.floor(this.image_index)) {
                      case 5:
                        this.image_index = this.image_index + 1;
                        break;
                      case 6:
                        this.image_index = this.image_index + 1;
                        break;
                      case 7:
                        this.image_index = this.image_index + Math.max(_skipspd, 0.5);
                        break;
                      case 8:
                      case 9:
                        this.image_index = this.image_index + 0.2;
                        if (this.image_index >= 9 || _skipspd >= 1) {
                            this.image_index = 2.999;
                            this.phase = this.phase + 1;
                        }
                        break;
                    }
                }
                if (this.sprite_index == 'spr_pink_throw_bomb2') {
                    switch (Math.floor(this.image_index)) {
                      case 11:
                        this.image_index = this.image_index + 1;
                        break;
                      case 12:
                        this.image_index = this.image_index + 1;
                        break;
                      case 13:
                        this.image_index = this.image_index + Math.max(_skipspd, 0.5);
                        break;
                      case 14:
                      case 15:
                        this.image_index = this.image_index + 0.2;
                        if (this.image_index >= 15 || _skipspd >= 1) {
                            this.image_index = 2.999;
                            this.phase = this.phase + 1;
                        }
                        break;
                    }
                }
            }
            break;
          case 2:
            if (S.ds_list_size(this.list_bomb) > 0) {
                this.sprite_index = 'spr_pink_idle';
                this.image_index = 0;
                this.image_speed = 0.334;
                this.pattern_repeat = this.pattern_repeat + 1;
                this.phase = 0;
            } else {
                switch (Math.floor(this.image_index)) {
                  case 2:
                    this.image_index = this.image_index - 0.5;
                    break;
                  default:
                    this.image_index = this.image_index - 0.334;
                    if (this.image_index < 1) {
                        this.sprite_index = 'spr_pink_idle';
                        this.image_index = 0;
                        this.image_speed = 0.334;
                        this.pattern_repeat = this.pattern_repeat + 1;
                        this.phase = 0;
                    }
                    break;
                }
            }
            break;
          case 3:
            if (this.sprite_index == 'spr_pink_throw_bomb') {
                this.pattern_time = this.pattern_time + 1;
                switch (this.pattern_time) {
                  case 20:
                    snd_play('snd_pink_trip', 1, 0.99);
                    break;
                  case 46:
                    snd_play('snd_pink_trip', 1, 1.02);
                    break;
                  case 68:
                    snd_play('snd_pink_trip', 1, 1.05);
                    break;
                  case 86:
                    snd_play('snd_pink_trip', 1, 1.1);
                    break;
                  case 100:
                    snd_play('snd_pink_trip', 1, 1.2);
                    break;
                  case 112:
                    snd_play('snd_pink_trip', 1, 1.3);
                    break;
                }
                if (this.pattern_time >= 10) {
                    _sweat = instance_create_depth(this.x + 4 + irandom(2) * 2, this.y - 52 + irandom(2) * 2, this.depth - 1, 'obj_sweatdrop');
                    if (W(_sweat, function (other) {
                        this.direction = 360 + random(60);
                        this.speed = 2 + random(5);
                    }, this) === EXIT) return;
                }
                if (this.pattern_time >= 20) {
                    _endspeed = 1;
                    _bomb_scale = 1;
                    if (W('obj_fusebomb_big', function (other) {
                        if (this.mode == 1) {
                            _bomb_scale = this.scale_multiplier;
                            if (this.fuse_time <= 25) {
                                _endspeed = clamp(this.fuse_time / 25 * 2 - 1, 0, 1);
                            }
                        }
                    }, this) === EXIT) return;
                    _pattime = this.pattern_time - 20;
                    if (_pattime >= 30) {
                        this.shake_x = choose(- 2, 0, 2);
                    }
                    this.wave_angle = this.wave_angle + (1 + Math.min(_pattime, 20) / 10 * this.wave_speed * _endspeed);
                    if (this.wave_angle >= 360) {
                        this.wave_angle = this.wave_angle - 360;
                    }
                    if (instance_exists('obj_growtangle')) {
                        _dx = scr_get_box(4) + 198 + lengthdir_x(6, this.wave_angle * 8 % 360);
                        _dy = scr_get_box(5) + 34 + lengthdir_y(96, this.wave_angle) + _pattime + 136 * ((_bomb_scale - 1) / 2);
                        _ratio = clamp(_pattime / 30, 0, 1) * 0.5;
                        this.x = this.x * (1 - _ratio) + _dx * _ratio;
                        this.y = this.y * (1 - _ratio) + _dy * _ratio;
                    }
                }
                switch (Math.floor(this.image_index)) {
                  case 2:
                  case 3:
                    if (this.pattern_time >= 30) {
                        this.image_index = this.image_index + 0.25;
                    } else if (this.pattern_time >= 5) {
                        this.image_index = this.image_index + 1;
                    }
                    if (this.image_index >= 4) {
                        this.image_index = 4.999;
                    }
                    break;
                  case 4:
                  case 5:
                    if (this.pattern_time >= 30) {
                        this.image_index = this.image_index - 0.25;
                    } else if (this.pattern_time >= 5) {
                        this.image_index = this.image_index - 0.5;
                    }
                    if (this.image_index < 4) {
                        this.image_index = 3;
                    }
                    break;
                }
            }
            break;
          default:
            if (! (global.turntimer > 0)) {
                _end_the_thing = true;
            }
        }
        if (T(_end_the_thing)) {
            if (this.sprite_index == 'spr_pink_front_burnt' || this.sprite_index == 'spr_pink_front_surprised') {
                this.on_the_box = false;
                this.box_pushdown_dest = 0;
                this.mode = 1;
                this.air_height = 40;
                this.air_time = 1;
                this.sprite_index = 'spr_pink_ball';
                this.image_speed = 1;
                this.image_xscale = - Math.abs(this.image_xscale);
                this.dest_x = this.start_x;
                this.dest_y = this.start_y;
            } else {
                instance_destroy(this);
            }
        }
        break;
      case 6:
        this.on_the_box = false;
        if (this.x < this.dest_x && this.x - this.hspeed >= this.dest_x || this.x > this.dest_x && this.x - this.hspeed <= this.dest_x) {
            this.hspeed = this.hspeed / 2;
        }
        if (this.y >= this.dest_y) {
            this.y = this.dest_y;
            this.vspeed = 0;
            this.hspeed = scr_approach(this.hspeed, this.dest_x - this.x, 1.25);
        } else {
            this.vspeed = this.vspeed + 1.5;
            this.hspeed = scr_approach(this.hspeed, this.dest_x - this.x, 0.75);
        }
        this.x = clamp(this.x, this.dest_x - 56, this.dest_x + 56);
        if (global.turntimer <= 0) {
            this.on_the_box = false;
            this.box_pushdown_dest = 0;
            this.mode = 1;
            this.air_time = 1;
            this.sprite_index = 'spr_pink_ball';
            this.image_speed = 1;
            this.image_xscale = - Math.abs(this.image_xscale);
            this.dest_x = this.start_x;
            this.dest_y = this.start_y;
        }
        if (Math.abs(this.hspeed) < 0.01 && this.vspeed >= 0) {
            this.sprite_index = 'spr_pink_front_surprised';
            this.image_index = 0;
            this.image_speed = 0;
            this.shake_x = - 2 + irandom(4);
        } else {
            this.sprite_index = 'spr_pink_run';
            this.image_speed = 1;
        }
        break;
      case 7:
        if (this.phase == 0) {
            if (this.hspeed == 0) {
                this.hspeed = choose(- 1, 1) * (1 + random(1));
            }
            if (this.sprite_index == 'spr_pink_sing' || this.sprite_index == 'spr_pink_sing_idle') {
                if (sign(this.image_xscale) != - sign(this.hspeed)) {
                    this.sprite_index = 'spr_pink_sing_turn';
                    this.image_index = 0;
                    this.image_speed = 0;
                }
            }
            if (this.sprite_index == 'spr_pink_sing_turn') {
                this.x = this.x - this.hspeed;
                _spd = 0.334;
                if (this.image_index < 2 - _spd) {
                    this.image_index = this.image_index + _spd;
                } else {
                    this.image_xscale = - this.image_xscale;
                    this.sprite_index = 'spr_pink_sing';
                    this.image_index = 0;
                    this.image_speed = 0;
                }
            } else if (this.sprite_index == 'spr_pink_sing' || this.sprite_index == 'spr_pink_sing_idle') {
                if (instance_exists('obj_growtangle')) {
                    _boost = this.x - scr_get_box(4);
                    this.x = this.x - _boost / 64;
                    if (this.hspeed < 0 && this.x < scr_get_box(4) - 80 || this.hspeed > 0 && this.x > scr_get_box(4) + 80) {
                        this.x = this.x - _boost / 64;
                    }
                }
                this.image_index = this.image_index + 0.334;
                if (this.image_index >= this.image_number) {
                    this.image_index = this.image_index - this.image_number;
                }
            }
            this.pattern_time = this.pattern_time + 1;
            if (this.pattern_time == 1) {
                if (W('obj_pink_curtains', function (other) {
                    if (this.phase == 0 && this.pattern_time <= 0) {
                        this.pattern_time = 1;
                    }
                }, this) === EXIT) return;
            }
            if (this.pattern_time >= 35) {
                this.hspeed = 0;
                this.phase = 1;
                this.pattern_time = 0;
            }
        } else if (this.phase == 1) {
            this.pattern_time = this.pattern_time + 1;
            if (this.sprite_index == 'spr_pink_sing' || this.sprite_index == 'spr_pink_sing_idle') {
                _frame_old = this.image_index;
                this.image_index = this.image_index + 0.25;
                if (this.image_index >= this.image_number) {
                    this.image_index = this.image_index - this.image_number;
                }
            } else if (this.sprite_index == 'spr_pink_sing_turn') {
                _spd = 0.25;
                if (this.image_index < 2 - _spd) {
                    this.image_index = this.image_index + _spd;
                } else {
                    this.image_xscale = - this.image_xscale;
                    this.sprite_index = 'spr_pink_sing';
                    this.image_index = 0;
                    this.image_speed = 0;
                }
            }
            if (this.pattern_time >= 60) {
                this.hspeed = choose(- 1, 1) * (1 + random(3));
                if (this.hspeed < 0 && this.x < scr_get_box(4) - 20 || this.hspeed > 0 && this.x > scr_get_box(4) + 20) {
                    this.hspeed = - this.hspeed;
                }
                this.phase = 0;
                this.pattern_time = 0;
            }
        }
        break;
    }
    if (instance_exists('obj_pinkbombexplosion')) {
        _gy = 0;
        for (let _r5543 = 0, _n5543 = (6); _r5543 < _n5543; _r5543++) {
            _gx = 0;
            for (let _r5552 = 0, _n5552 = (4); _r5552 < _n5552; _r5552++) {
                _burn = collision_point(this.x + (- 2 + _gx) * 16 + 8, this.y + 4 + (- 3 + _gy) * 16 + 8, 'obj_pinkbombexplosion', 1, 1);
                if (_burn != null) {
                    if (_burn.friendlyfire == 1) {
                        if (_burn.image_xscale >= 4) {
                            S.ds_list_set(this.list_burnt, _gy * 4 + _gx, 1);
                            if (this.sprite_index == 'spr_pink_throw_bomb' || this.sprite_index == 'spr_pink_throw_bomb2') {
                                if (this.image_index >= 3) {
                                    this.y = this.y - 24;
                                }
                            }
                            snd_stop('snd_pink_laugh_long');
                            snd_stop('snd_pink_trip');
                            this.sprite_index = 'spr_pink_front_surprised';
                            this.phase = 99;
                        }
                    }
                }
                _gx = _gx + 1;
            }
            _gy = _gy + 1;
        }
    }
    _sounded = false;
    do {
        _getheart = collision_circle(this.x, this.y, 40, 'obj_audienceheart', 1, 1);
        if (_getheart != null) {
            if (!T(_sounded)) {
                _sounded = true;
                snd_play('snd_coin', 0.5, 1);
            }
            this.flash_amount = 1;
            if (W(_getheart, function (other) {
                _dokidir = point_direction(other.x, other.y, this.x - this.hspeed, this.y - this.vspeed);
                if (_dokidir < 90) {
                    _dokidir = _dokidir + 360;
                }
                _dokidir = clamp(_dokidir, 225, 315);
                _heart = instance_create_depth(this.x, this.y, this.depth, 'obj_dokiheart');
                if (W(_heart, function (other) {
                    this.tension_value = 1;
                    this.mode = 1;
                    this.image_xscale = 1;
                    this.image_yscale = 1;
                    this.direction = _dokidir;
                    this.speed = 13.4;
                    this.friction = 1;
                }, this) === EXIT) return EXIT;
                instance_destroy(this);
            }, this) === EXIT) return;
        }
    } while ((!(_getheart == null)) && LOOP('PinkBattlemovement#1'));

    if (this.sprite_index == 'spr_pink_laugh') {
        this.animation_time = this.animation_time + 1;
        if (this.animation_time == 0) {
            this.image_index = 0;
            this.image_speed = 0.5;
        }
        if (this.animation_time == 4) {
            this.image_speed = 0.334;
        }
        if (this.animation_time == 16) {
            this.image_speed = 0.25;
        }
    }
    if (T(this.on_the_box)) {
        if (global.turntimer <= 0) {
            this.on_the_box = false;
            this.box_pushdown_dest = 0;
            this.mode = 1;
            this.air_time = 1;
            this.sprite_index = 'spr_pink_ball';
            this.image_speed = 1;
            this.image_xscale = - Math.abs(this.image_xscale);
            this.dest_x = this.start_x;
            this.dest_y = this.start_y;
        }
    }
    _box_movement = this.box_pushdown_real;
    this.box_pushdown_real = scr_approach(this.box_pushdown_real, this.box_pushdown_dest, Math.abs(this.box_pushdown_dest - this.box_pushdown_real) / 6 + 0.2);
    _box_movement = this.box_pushdown_real - _box_movement;
    if (T(this.on_the_box)) {
        this.y = this.y + _box_movement;
    }
    this.dest_y = this.dest_y + _box_movement;
    if (W('obj_growtangle', function (other) {
        this.y = other.box_y_original + other.box_pushdown_real;
    }, this) === EXIT) return;
    if (W('obj_purplecontrols', function (other) {
        this.y = this.y + _box_movement;
        this.tire_y = this.tire_y + _box_movement;
    }, this) === EXIT) return;
    if (W('obj_heart', function (other) {
        this.y = this.y + _box_movement;
    }, this) === EXIT) return;
    if (W('obj_bulletparent', function (other) {
        this.y = this.y + _box_movement;
    }, this) === EXIT) return;
    if (W('obj_dokiheart', function (other) {
        this.y = this.y + _box_movement;
    }, this) === EXIT) return;
  }
}
defineObject('obj_pink_battlemovement', PinkBattlemovement);

