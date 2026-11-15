// Pink's attack objects (cats, zaps, lanes, the 3D tunnel, meteors, bombs, the anime face, hearts) (machine-translated from the Chapter 5 GML by tools/gen_pink.sh; edit tools/postfix.py, not this file)
/* eslint-disable */
import {
  Instance, S, choose, clamp, collision_point, collision_rectangle, defineObject, draw_primitive_begin, draw_primitive_end, draw_rectangle, draw_self, draw_set_alpha, draw_set_color, draw_sprite, draw_sprite_ext, draw_vertex, frac, global, gpu_set_fog, instance_create, instance_create_depth, instance_destroy, instance_exists, instance_find, instance_number, instance_place, irandom, lengthdir_x, lengthdir_y, lerp, merge_color, place_meeting, point_direction, point_distance, random, sign, snd_is_playing, snd_play, snd_stop, sprite_get_height, surface_create, surface_free,
} from '../rt.js?v=20261115213228';
import {
  camerax, cameray, i_ex, scr_afterimage, scr_approach, scr_doom, scr_draw_outline, scr_draw_outline_ext, scr_get_box, scr_lerpvar, scr_script_delayed, scr_shakescreen, snd_play_x,
} from '../common.js?v=20261115213228';
import {
  BREAK, EXIT, LOOP, O, P, T, W,
} from '../gml.js?v=20261115213228';
import {
  array_length,
} from '../lib5.js?v=20261115213228';

// obj_bullet_healing (default sprite None, depth 0)
class BulletHealing extends Instance {
  create() {
    this.spin = 0;
    this.spinspeed = 0;
    this.wall_destroy = 1;
    this.bottomfade = 0;
    this.lifetime = 0;
    this.maxlifetime = 90;
    this.updateimageangle = 0;
    this.timer = 0;
    this.con = 0;
    this.telegraph_alpha = 0;
    this.donut_speed = 4 + irandom(2);
    this.donut_gravity = 1.5;
    this.image_alpha = 1;
    this.image_xscale = 2;
    this.image_yscale = 2;
    if (!T(instance_exists('obj_heart'))) {
        instance_destroy(this);
    }
  }
  draw() {
    let _x1, _x2;
    if (this.sprite_index == 'spr_swatchling_platter_candy') {
    }
    draw_self(this);
    if (this.sprite_index == 'spr_swatchling_platter_candy') {
        if (i_ex('obj_heart')) {
            this.depth = O('obj_heart').depth + 1;
        }
        draw_set_alpha(this.telegraph_alpha);
        _x1 = this.x - 7;
        if (_x1 < O('obj_growtangle').x + 5 - O('obj_growtangle').sprite_width * 0.5) {
            _x1 = O('obj_growtangle').x - O('obj_growtangle').sprite_width * 0.5 + 5;
        }
        _x2 = this.x + 9;
        if (_x2 + 2 > O('obj_growtangle').x + O('obj_growtangle').sprite_width * 0.5) {
            _x2 = O('obj_growtangle').x + O('obj_growtangle').sprite_width * 0.5;
        }
        S.d_rectangle_color(_x1, O('obj_growtangle').y - O('obj_growtangle').sprite_height * 0.5 + 5, _x2, O('obj_growtangle').y + O('obj_growtangle').sprite_height * 0.5 - 4, 65280, 65280, 65280, 65280, false);
        gpu_set_fog(1, 16777215, 0, 0);
        draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.telegraph_alpha);
        gpu_set_fog(0, 16777215, 0, 0);
        draw_set_alpha(1);
    }
  }
  step() {
    let _direction, _repeat, _afterimage_timer, _hp_1, _hp_2, _hp_3, _alreadyexists, i, _inst;
    if (this.wall_destroy == 1) {
        if (this.x < camerax() - 80 || this.x > camerax() + 640 + 80 || this.y < cameray() - 80 || this.y > cameray() + 480 + 80) {
            instance_destroy(this);
        }
    }
    if (this.updateimageangle == 1) {
        this.image_angle = this.direction;
    }
    if (this.spin == 1) {
        this.image_angle = this.image_angle + this.spinspeed;
    }
    if (this.bottomfade != 0) {
        if (this.y > cameray() + this.bottomfade) {
            this.image_alpha = this.image_alpha * 0.8;
        }
    }
    this.lifetime = this.lifetime + 1;
    if (this.lifetime >= this.maxlifetime || !T(i_ex('obj_heart'))) {
        instance_destroy(this);
    }
    if (i_ex('obj_orange_green_controller') && i_ex('obj_heart') && T(O('obj_orange_green_controller').treasurehunter) && S.distance_to_object(this, 'obj_heart') < 30) {
        _direction = point_direction(this.x, this.y, O('obj_heart').x + 10, O('obj_heart').y + 10);
        this.x = this.x + lengthdir_x(6, _direction);
        this.y = this.y + lengthdir_y(6, _direction);
    }
    if (this.sprite_index == 'spr_donut_bullet') {
        if (this.con == 0) {
            this.x = this.x - this.donut_speed;
        }
        if (this.con == 1) {
            this.x = this.x + this.donut_speed;
        }
        if (this.x < O('obj_growtangle').x - O('obj_growtangle').sprite_width * 0.25 && this.vspeed > 0) {
            this.x = O('obj_growtangle').x - O('obj_growtangle').sprite_width * 0.25;
            this.con = 1;
            snd_stop('snd_petaldrain');
            snd_play('snd_petaldrain');
        }
        if (this.x > O('obj_growtangle').x + O('obj_growtangle').sprite_width * 0.45 && this.y > O('obj_growtangle').y - O('obj_growtangle').sprite_height * 0.5 && this.vspeed > 0) {
            this.x = O('obj_growtangle').x + O('obj_growtangle').sprite_width * 0.45 + 4;
            this.con = 0;
            snd_stop('snd_petaldrain');
            snd_play('snd_petaldrain');
        }
        this.vspeed = this.vspeed + this.donut_gravity;
        if (this.vspeed > 8) {
            this.speed = 8;
        }
    }
    _repeat = 1;
    _afterimage_timer = 0;
    if (this.sprite_index == 'spr_swatchling_platter_candy') {
        _repeat = 40;
        this.timer = this.timer + 1;
        if (this.timer == 1) {
            this.speed = 0;
        }
        if (this.timer >= 5) {
            this.image_angle = lerp(this.image_angle, 90, 0.4);
        }
        if (this.timer == 10) {
            snd_play('snd_bell_bounce_short');
        }
        if (this.timer >= 10 && this.timer <= 15) {
            this.telegraph_alpha = this.telegraph_alpha + 0.2;
        }
        if (this.timer >= 15 && this.timer <= 20) {
            this.telegraph_alpha = this.telegraph_alpha - 0.2;
        }
        if (this.timer == 25) {
            snd_play('snd_bomb', 1, 1.3);
        }
        if (this.timer == 80) {
            instance_destroy(this);
        }
    }
    if (this.timer >= 25 || this.sprite_index != 'spr_swatchling_platter_candy') {
        for (let _r519 = 0, _n519 = (_repeat); _r519 < _n519; _r519++) {
            if (this.sprite_index == 'spr_swatchling_platter_candy') {
                this.y = this.y + 1;
            }
            if (_afterimage_timer == 10 || _afterimage_timer == 20 || _afterimage_timer == 30) {
                scr_afterimage(this);
            }
            if (place_meeting(this, this.x, this.y, 'obj_heart') && this.image_alpha > 0) {
                if (this.sprite_index == 'spr_swatchling_platter_candy') {
                    this.y = this.y - 40;
                    S.scr_tensionheal(7);
                }
                if (this.sprite_index == 'spr_donut_bullet') {
                    this.y = this.y - 40;
                    S.scr_tensionheal(4);
                }
                snd_play('snd_power');
                _hp_1 = 0;
                _hp_2 = 0;
                _hp_3 = 0;
                if (global.hp[1] <= 0) {
                    global.hp ??= []; global.hp[1] = 0;
                    _hp_1 = 1;
                }
                if (global.hp[2] <= 0) {
                    global.hp ??= []; global.hp[2] = 0;
                    _hp_2 = 1;
                }
                if (global.hp[3] <= 0) {
                    global.hp ??= []; global.hp[3] = 0;
                    _hp_3 = 1;
                }
                S.scr_healall(1);
                if (_hp_1 == 1) {
                    global.hp ??= []; global.hp[1] = 1;
                }
                if (_hp_2 == 1) {
                    global.hp ??= []; global.hp[2] = 1;
                }
                if (_hp_3 == 1) {
                    global.hp ??= []; global.hp[3] = 1;
                }
                if (W('obj_heroparent', function (other) {
                    S.scr_tensionheal(4);
                    this.ha = instance_create(this.x, this.y, 'obj_healanim');
                    this.ha.target = this;
                    _alreadyexists = false;
                    i = 0;
                    while ((i < instance_number('obj_dmgwriter')) && LOOP('BulletHealing#1')) {
                        this.dmgwriter ??= []; this.dmgwriter[i] = instance_find('obj_dmgwriter', i);
                        if (this.dmgwriter[i].creatorid == this) {
                            this.dmgwriter[i].damage = this.dmgwriter[i].damage + 1;
                            this.dmgwriter[i].init = 0;
                            this.dmgwriter[i].killtimer = - 40;
                            if (global.hp[global.char[this.myself]] >= global.maxhp[global.char[this.myself]]) {
                                this.dmgwriter[i].specialmessage = 3;
                            }
                            _alreadyexists = true;
                        }
                        i = i + 1;
                    }
                    if (_alreadyexists == 0) {
                        this.dmgwr = instance_create(this.x, this.y - 40 + this.myheight - 24, 'obj_dmgwriter');
                        this.healstackwriter = this.dmgwr;
                        if (W(this.dmgwr, function (other) {
                            this.delay = 8;
                            this.type = 3;
                            this.damage = 1;
                            this.typeb = 1;
                            this.creatorid = other.id;
                        }, this) === EXIT) return EXIT;
                        if (global.hp[global.char[this.myself]] >= global.maxhp[global.char[this.myself]]) {
                            this.dmgwr.specialmessage = 3;
                        }
                        this.tu = this.tu + 1;
                    }
                }, this) === EXIT) return;
                if (this.sprite_index == 'spr_swatchling_platter_candy') {
                    this.inst = instance_create(this.x, this.y + 40, 'obj_marker');
                    this.inst.sprite_index = 'spr_swatchling_platter_candy';
                    this.inst.image_angle = this.image_angle;
                    this.inst.image_xscale = this.image_xscale;
                    this.inst.image_yscale = this.image_yscale;
                    if (W(this.inst, function (other) {
                        scr_doom(this, 1);
                    }, this) === EXIT) return;
                }
                instance_destroy(this);
                break;
            }
        }
    }
    if (place_meeting(this, this.x, this.y, 'obj_regularbullet') && i_ex('obj_attack_green_cookingtime') && this.sprite_index == 'spr_bullet_green_egg') {
        _inst = instance_place(this, this.x, this.y, 'obj_regularbullet');
        if (this.con == 0) {
            this.x = this.x + 6;
        }
        if (this.con == 1) {
            if (_inst.x < this.x) {
                this.x = this.x + 6;
            }
            if (_inst.x > this.x) {
                this.x = this.x - 6;
            }
        }
        if (this.con == 2) {
            this.x = this.x - 6;
        }
    }
  }
}
defineObject('obj_bullet_healing', BulletHealing);

// obj_dokiheart (default sprite spr_dokiheart, depth 0, parent obj_bullet_healing)
class Dokiheart extends P('obj_bullet_healing') {
  constructor() {
    super();
    this.sprite_index = 'spr_dokiheart';
  }
  create() {
    super.create?.();
    this.maxlifetime = 90;
    this.image_xscale = 1;
    this.image_yscale = 1;
    this.mode = 0;
    this.mother = - 4;
    this.act_to_change = - 4;
    this.xdraw = this.x;
    this.ydraw = this.y;
    this.visual_scale = 1;
    this.pulse = 0;
    this.tunnel_lane_layer = 0;
    this.lane_x = 0;
    this.lane_y = 0;
    this.heart_angle = 0;
    this.tension_value = 1;
  }
  draw() {
    let _scale;
    _scale = 1;
    switch (this.pulse) {
      case 0:
        _scale = 1.5;
        break;
      case 1:
        _scale = 1.25;
        break;
      case 2:
        _scale = 1.2;
        break;
      case 3:
        _scale = 1.15;
        break;
      case 4:
        _scale = 1.1;
        break;
      case 5:
        _scale = 1.05;
        break;
    }
    _scale = _scale * this.visual_scale;
    switch (this.mode) {
      case 1:
        if (instance_exists('obj_huge_anime_face')) {
            scr_draw_outline_ext(this.sprite_index, 0, this.xdraw, this.ydraw, this.image_xscale * _scale, this.image_yscale * _scale, this.image_angle + lengthdir_x(15, this.lifetime * 15), 0, this.image_alpha * 0.5, 8);
        }
        draw_sprite_ext(this.sprite_index, 0, this.xdraw, this.ydraw, this.image_xscale * _scale, this.image_yscale * _scale, this.image_angle + lengthdir_x(15, this.lifetime * 15), 0xff88aa, this.image_alpha);
        break;
      default:
        if (instance_exists('obj_huge_anime_face')) {
            scr_draw_outline_ext(this.sprite_index, 0, this.xdraw, this.ydraw + lengthdir_y(2, this.lifetime * 10), this.image_xscale * _scale, this.image_yscale * _scale, this.image_angle + lengthdir_x(15, this.lifetime * 15), 0, this.image_alpha * 0.5, 8);
        }
        draw_sprite_ext(this.sprite_index, 0, this.xdraw, this.ydraw + lengthdir_y(2, this.lifetime * 10), this.image_xscale * _scale, this.image_yscale * _scale, this.image_angle + lengthdir_x(15, this.lifetime * 15), 0xff88aa, this.image_alpha);
    }
  }
  step() {
    let _speedlimit, _dist, _dir, _spd, _pickdist;
    if (this.mode == 1) {
        if (this.friction > 0) {
            _speedlimit = 0.8;
            if (this.speed > _speedlimit) {
                this.friction = Math.min(this.speed * 0.25, this.friction);
            } else {
                this.speed = _speedlimit;
                this.gravity_direction = 90;
                this.gravity = 0.06;
                this.friction = 0.03;
            }
        }
        if (W('obj_dokiheart', function (other) {
            if (this != other.id) {
                _dist = point_distance(other.x, other.y, this.x, this.y);
                if (_dist < 22) {
                    _dir = point_direction(other.x, other.y, this.x, this.y);
                    _spd = 1.3333333333333333;
                    this.x = this.x + lengthdir_x(_spd, _dir);
                    this.y = this.y + lengthdir_y(_spd, _dir);
                    other.x = other.x - lengthdir_x(_spd, _dir);
                    other.y = other.y - lengthdir_y(_spd, _dir);
                    _spd = _dist / 22 * Math.max(0, 1 - this.speed / 3) * 0.5;
                    other.hspeed = other.hspeed + lengthdir_x(_spd, _dir + 180);
                    this.hspeed = this.hspeed + lengthdir_x(_spd, _dir);
                    return BREAK;
                }
            }
        }, this) === EXIT) return;
        _pickdist = 42;
        if (instance_exists('obj_heart')) {
            _dist = point_distance(this.x, this.y, O('obj_heart').x, O('obj_heart').y);
            if (_dist < _pickdist) {
                _dir = point_direction(this.x, this.y, O('obj_heart').x, O('obj_heart').y);
                _dist = 1 + (_pickdist - _dist) / _pickdist * 11;
                this.x = this.x + lengthdir_x(_dist, _dir);
                this.y = this.y + lengthdir_y(_dist, _dir);
            }
        }
    }
    if (instance_exists('obj_heart')) {
        if (collision_rectangle(O('obj_heart').x + 2 * O('obj_heart').image_xscale, O('obj_heart').y + 2 * O('obj_heart').image_yscale, O('obj_heart').x + 18 * O('obj_heart').image_xscale, O('obj_heart').y + 18 * O('obj_heart').image_yscale, this, false, false)) {
            snd_play('snd_power');
            S.scr_healall(1);
            if (instance_exists(this.act_to_change)) {
                if (this.act_to_change.object_index == 'obj_pinknodeact') {
                    this.act_to_change.mode = 1;
                    this.act_to_change.life_time = 0;
                } else {
                    if (W(this.act_to_change, function (other) {
                        this.hp = this.hp - 1;
                        this.user1?.();
                    }, this) === EXIT) return;
                }
            }
            if (W('obj_tensionbar', function (other) {
                if (this.maxtensionlimitpercent < 100) {
                    this.maxtensionlimitpercent = Math.min(100, this.maxtensionlimitpercent + other.tension_value);
                }
                this.maxtensionlimit = this.maxtensionlimit + other.tension_value * 2.5;
                if (this.maxtensionlimit > 250) {
                    this.maxtensionlimit = 250;
                }
            }, this) === EXIT) return;
            if (i_ex('obj_dbulletcontroller') && O('obj_dbulletcontroller').type == 208) {
                S.scr_tensionheal(this.tension_value * 2.5);
            } else {
                S.scr_tensionheal(this.tension_value * 2.5);
            }
            snd_stop('snd_swallow');
            snd_play('snd_swallow');
            if (W(instance_create_depth(this.x + this.hspeed, this.y + this.vspeed, this.depth + 1, 'obj_bulletparent'), function (other) {
                this.image_angle = 0;
                this.image_xscale = 0.1 * this.image_xscale;
                this.image_yscale = 0.1 * this.image_yscale * choose(- 1, 1);
                scr_lerpvar(this, "image_xscale", this.image_xscale, this.image_xscale * 3, 4);
                scr_lerpvar(this, "image_yscale", this.image_yscale, this.image_yscale * 3, 4);
                this.sprite_index = 'spr_finisher_explosion';
                this.image_index = 2;
                this.image_speed = 1;
                if (i_ex('obj_pink_enemy')) {
                    this.image_blend = O('obj_pink_enemy').c_pink;
                }
                scr_script_delayed(this, instance_destroy, 3);
            }, this) === EXIT) return;
            if (i_ex('obj_pink_tension_glow')) {
                if (W('obj_pink_tension_glow', function (other) {
                    this.alphamod = 1;
                }, this) === EXIT) return;
            } else {
                instance_create_depth(0, 0, 0, 'obj_pink_tension_glow');
            }
            instance_destroy(this);
        }
    }
    this.lifetime = this.lifetime + 1;
    if (!T(i_ex('obj_heart'))) {
        instance_destroy(this);
    } else if (this.lifetime >= this.maxlifetime && this.maxlifetime > 0) {
        this.image_alpha = Math.min(this.image_alpha, 1);
        this.image_alpha = this.image_alpha - 0.1;
        if (this.image_alpha <= 0.001) {
            instance_destroy(this);
        }
    } else {
        this.image_alpha = Math.min(this.image_alpha + 0.1, 1);
    }
    this.pulse = this.pulse + 1;
    if (this.pulse >= 15) {
        this.pulse = 0;
    }
  }
  endStep() {
    let _spd, _dir;
    _spd = point_distance(this.xdraw, this.ydraw, this.x, this.y);
    if (_spd <= this.speed + 1) {
        this.xdraw = this.x;
        this.ydraw = this.y;
    } else {
        _dir = point_direction(this.xdraw, this.ydraw, this.x, this.y);
        this.xdraw = this.xdraw + lengthdir_x(_spd * 0.2 + this.speed, _dir);
        this.ydraw = this.ydraw + lengthdir_y(_spd * 0.2 + this.speed, _dir);
    }
    if (instance_exists(this.mother)) {
        this.x = this.mother.x;
        this.y = this.mother.y;
    }
  }
}
defineObject('obj_dokiheart', Dokiheart);

// obj_pinkhealheart (default sprite spr_heartbullet, depth 0, parent obj_bullet_healing)
class Pinkhealheart extends P('obj_bullet_healing') {
  constructor() {
    super();
    this.sprite_index = 'spr_heartbullet';
  }
  create() {
    super.create?.();
    this.maxlifetime = 300;
    this.pulse = 0;
  }
  draw() {
    let _scale;
    _scale = 1;
    switch (this.pulse) {
      case 0:
        _scale = 1.5;
        break;
      case 1:
        _scale = 1.25;
        break;
      case 2:
        _scale = 1.2;
        break;
      case 3:
        _scale = 1.15;
        break;
      case 4:
        _scale = 1.1;
        break;
      case 5:
        _scale = 1.05;
        break;
    }
    draw_sprite_ext('spr_heartbullet', 0, this.x, this.y, this.image_xscale * _scale, this.image_yscale * _scale, 0, 0x00ff00, 1);
  }
  step() {
    super.step?.();
    this.pulse = this.pulse + 1;
    if (this.pulse >= 15) {
        this.pulse = 0;
    }
  }
}
defineObject('obj_pinkhealheart', Pinkhealheart);

// obj_pinkcatbullet (default sprite spr_bullet_catface, depth 0, parent obj_regularbullet)
class Pinkcatbullet extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_bullet_catface';
  }
  create() {
    super.create?.();
    this.target = 4;
    this.damage = 100;
    if (i_ex('obj_pink_enemy')) {
        this.damage = O('obj_pink_enemy').damage;
    }
    this.life_time = 0;
    this.element = 6;
    this.grazepoints = 2;
    this.image_alpha = 1;
    this.mode = 0;
    this.float_dir = 0;
    this.spin_dir = random(90);
    this.spin_radius = 0;
    this.image_speed = 0.334;
    this.image_xscale = 2;
    this.image_yscale = 2;
  }
  draw() {
    draw_self(this);
  }
  step() {
    if (this.wall_destroy == 1) {
        if (this.x < S.__view_get(0, 0) - 80 && this.hspeed <= 0) {
            instance_destroy(this);
        }
        if (this.x > S.__view_get(0, 0) + 760 && this.hspeed >= 0) {
            instance_destroy(this);
        }
        if (this.y < S.__view_get(1, 0) - 80) {
            instance_destroy(this);
        }
        if (this.y > S.__view_get(1, 0) + 580) {
            instance_destroy(this);
        }
    }
    this.life_time = this.life_time + 1;
    if (this.spin_radius > 0) {
        this.spin_dir = this.spin_dir - 45;
        if (this.spin_dir < 0) {
            this.spin_dir = this.spin_dir + 360;
        }
        this.x = this.x + lengthdir_x(this.spin_radius, this.spin_dir);
        this.y = this.y + lengthdir_y(this.spin_radius, this.spin_dir);
    }
    switch (this.mode) {
      case 1:
        this.float_dir = this.float_dir + 5;
        if (this.float_dir >= 360) {
            this.float_dir = this.float_dir - 360;
        }
        this.x = this.x + lengthdir_x(0.75, this.float_dir);
        if (this.x > scr_get_box(2) && this.x < scr_get_box(0)) {
            if (this.x < scr_get_box(4)) {
                this.x = this.x - 1;
            } else {
                this.x = this.x + 1;
            }
        }
        break;
      case 2:
        this.float_dir = this.float_dir + 10;
        if (this.float_dir >= 360) {
            this.float_dir = this.float_dir - 360;
        }
        this.x = this.x + lengthdir_x(0.25, this.float_dir);
        break;
    }
  }
}
defineObject('obj_pinkcatbullet', Pinkcatbullet);

// obj_pinkcatrunaway (default sprite spr_bullet_catrun, depth 0, parent obj_regularbullet)
class Pinkcatrunaway extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_bullet_catrun';
  }
  create() {
    super.create?.();
    this.target = 4;
    this.damage = 100;
    if (i_ex('obj_pink_enemy')) {
        this.damage = O('obj_pink_enemy').damage;
    }
    this.element = 6;
    this.grazepoints = 2;
    this.active = 0;
    this.life_time = 0;
    this.phase = 0;
    this.jump_cycle = 0;
    this.image_speed = choose(0, 0, 0, 0.02, 0.04, 0, 0.334, 0.5, 1, 0, 0, 0);
  }
  draw() {
    let _shake;
    if (this.image_speed > 0) {
        if (this.image_index >= 2) {
            this.image_index = this.image_index - 2;
        }
    }
    _shake = 0;
    if (this.phase == 3) {
        switch (this.life_time) {
          case 1:
            _shake = _shake + 2;
            break;
          case 2:
            _shake = _shake - 2;
            break;
          case 3:
            _shake = _shake + 1;
            break;
          case 4:
            _shake = _shake - 1;
            break;
        }
    }
    draw_sprite_ext(this.sprite_index, Math.floor(this.image_index), this.x + Math.abs(lengthdir_y(4, this.jump_cycle)), this.y + _shake + Math.abs(lengthdir_y(4, this.jump_cycle)), this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
  }
  step() {
    super.step?.();
    if (this.phase == 0) {
        if (collision_rectangle(this.x - 96, this.y - 128, this.x, this.y, 'obj_growtangle', 1, 1)) {
            this.phase = this.phase + 1;
            this.image_index = 2;
            this.image_speed = 0;
        }
    }
    if (this.phase == 1) {
        this.life_time = this.life_time + 1;
        if (this.life_time >= 5 + random(15)) {
            this.life_time = 0;
            this.phase = this.phase + 1;
            this.image_index = choose(3, 4);
            this.hspeed = 2 + random(3);
        }
    }
    if (this.phase == 2) {
        this.hspeed = this.hspeed + 0.002 + random(0.008);
        this.jump_cycle = this.jump_cycle + 31;
        if (this.jump_cycle >= 360) {
            this.jump_cycle = this.jump_cycle - 360;
        }
    }
    if (this.phase < 3) {
        if (T(instance_place(this, this.x, this.y, 'obj_growtangle'))) {
            this.phase = 3;
            this.speed = 0;
            this.image_speed = 0;
            this.image_index = 5;
            this.life_time = 0;
        }
    }
    if (this.phase == 3) {
        this.life_time = this.life_time + 1;
    }
  }
}
defineObject('obj_pinkcatrunaway', Pinkcatrunaway);

// obj_pinkzap (default sprite spr_pinkzap, depth 0, parent obj_regularbullet)
class Pinkzap extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_pinkzap';
  }
  alarm0() {
    this.image_index = 0;
    if (this.speed < 0.5 && irandom(9) != 0 || this.speed >= 0.5 && irandom(4) != 0) {
        this.alarm ??= []; this.alarm[0] = 2;
    }
  }
  create() {
    super.create?.();
    this.target = 4;
    this.damage = 100;
    if (i_ex('obj_pink_enemy')) {
        this.damage = O('obj_pink_enemy').damage;
    }
    this.element = 6;
    this.grazepoints = 2;
    this.active = 0;
    this.destroyonhit = 0;
    this.sprite_index = 'spr_pinkzap_thick';
    this.wave_dir = random(360);
    this.mode = 1;
    this.highlight = 0;
    this.image_speed = 1;
    this.image_index = 0;
    this.alarm ??= []; this.alarm[0] = 2;
    this.life_time = 0;
    this.image_alpha = 0;
    this.tunnel_lane_layer = 0;
    this.direction = random(360);
    this.pattern_speed = choose(- 1, 1) * (2 + random(4));
    this.speed = Math.abs(this.pattern_speed);
  }
  draw() {
    let _color, _spr, _xx, _yy, _thickness;
    if (this.highlight == 2) {
        _color = 0xffffff;
        _spr = this.sprite_index;
    } else if (this.highlight == 1) {
        _color = 0xdddddd;
        _spr = this.sprite_index;
    } else {
        _color = 0xbbbbbb;
        _spr = this.sprite_index;
    }
    _xx = this.x;
    _yy = this.y;
    if (this.sprite_index == 'spr_pinkzap_arrow') {
        _xx = _xx + lengthdir_x(this.image_xscale * lengthdir_y(3, this.wave_dir), this.image_angle + 90);
        _yy = _yy + lengthdir_y(this.image_yscale * lengthdir_y(3, this.wave_dir), this.image_angle + 90);
    }
    if (this.mode == 1) {
        draw_sprite_ext(_spr, this.image_index, _xx, _yy, this.image_xscale, this.image_yscale, this.image_angle, _color, this.image_alpha);
        if (this.highlight == 2) {
            _thickness = 2.5;
        } else if (this.highlight == 1) {
            _thickness = 2.5;
        } else {
            _thickness = 1.5;
        }
        if (this.highlight >= 2) {
            draw_sprite_ext(_spr, this.image_index, _xx + lengthdir_x(this.image_xscale * _thickness, this.image_angle + 90), _yy + lengthdir_y(this.image_yscale * _thickness, this.image_angle + 90), this.image_xscale, this.image_yscale, this.image_angle, _color, clamp(0.5 * this.image_alpha, 0, 1));
            draw_sprite_ext(_spr, this.image_index, _xx + lengthdir_x(this.image_xscale * _thickness, this.image_angle + 270), _yy + lengthdir_y(this.image_yscale * _thickness, this.image_angle + 270), this.image_xscale, this.image_yscale, this.image_angle, _color, clamp(0.5 * this.image_alpha, 0, 1));
        }
    } else {
        if (this.highlight >= 2) {
            draw_sprite_ext('spr_pinkzap_thick', this.image_index, _xx, _yy, this.image_xscale, this.image_yscale, this.image_angle, _color, this.image_alpha);
        } else {
            draw_sprite_ext(_spr, this.image_index, _xx, _yy, this.image_xscale, this.image_yscale, this.image_angle, _color, this.image_alpha);
        }
        if (this.highlight == 2) {
            _thickness = 2;
        } else if (this.highlight == 1) {
            _thickness = 2;
        } else {
            _thickness = 1.25;
        }
        if (this.highlight >= 2) {
            draw_sprite_ext(_spr, this.image_index, _xx + lengthdir_x(this.image_xscale * _thickness, this.image_angle + 90), _yy + lengthdir_y(this.image_yscale * _thickness, this.image_angle + 90), this.image_xscale, this.image_yscale, this.image_angle, _color, clamp(0.45 * this.image_alpha, 0, 1));
            draw_sprite_ext(_spr, this.image_index, _xx + lengthdir_x(this.image_xscale * _thickness, this.image_angle + 270), _yy + lengthdir_y(this.image_yscale * _thickness, this.image_angle + 270), this.image_xscale, this.image_yscale, this.image_angle, _color, clamp(0.45 * this.image_alpha, 0, 1));
        }
    }
  }
  animationEnd() {
    this.alarm0?.();
  }
  step() {
    super.step?.();
    this.speed = Math.max(0.1, Math.abs(this.pattern_speed));
    this.life_time = this.life_time + 1;
    this.wave_dir = this.wave_dir + sign(this.pattern_speed) * 48;
    if (this.wave_dir >= 360) {
        this.wave_dir = this.wave_dir - 360;
    }
    if (this.wave_dir < 0) {
        this.wave_dir = this.wave_dir + 360;
    }
    if (this.life_time < 30) {
        if (this.image_alpha < 1) {
            this.image_alpha = clamp(this.image_alpha + 0.2, 0, 1);
        }
    }
    if (this.image_alpha > 1) {
        this.image_alpha = Math.max(this.image_alpha - 0.3, 1);
    } else if (this.life_time >= 99999) {
        this.image_alpha = Math.min(this.image_alpha, 1);
        this.image_alpha = this.image_alpha - 0.075;
        if (this.image_alpha <= 0.001) {
            instance_destroy(this);
        }
    }
  }
}
defineObject('obj_pinkzap', Pinkzap);

// obj_pinktimeoutzap (default sprite spr_pinkzap, depth 0, parent obj_regularbullet)
class Pinktimeoutzap extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_pinkzap';
  }
  alarm0() {
    return;
  }
  alarm1() {
    instance_destroy(this);
  }
  create() {
    let i;
    super.create?.();
    this.target = 4;
    this.damage = 100;
    if (i_ex('obj_pink_enemy')) {
        this.damage = O('obj_pink_enemy').damage;
    }
    this.element = 6;
    this.grazepoints = 2;
    this.active = 0;
    this.destroyonhit = 0;
    this.life_time = 0;
    this.tunnel_lane_layer = 0;
    this.radius = 128;
    this.dir_add = 12;
    i = Math.ceil(360 / this.dir_add);
    for (let _r78 = 0, _n78 = (Math.ceil(360 / this.dir_add)); _r78 < _n78; _r78++) {
        i = i - 1;
        this.array_frame ??= []; this.array_frame[i] = irandom(1);
    }
    this.pattern_time = 1;
  }
  draw() {
    let _dirfill, _dir, i, _dir_rand;
    _dirfill = (1 - this.pattern_time) * 360;
    _dir = 0;
    i = 0;
    do {
        _dir_rand = - 1 + irandom(2);
        draw_sprite_ext(this.sprite_index, Math.floor(this.array_frame[i]), this.x + lengthdir_x(this.radius - this.image_xscale + irandom(2) * this.image_xscale, 90 - _dir + _dir_rand), this.y + lengthdir_y(this.radius - this.image_yscale + irandom(2) * this.image_yscale, 90 - _dir + _dir_rand), this.image_xscale, this.image_yscale, - _dir + _dir_rand, this.image_blend, clamp(0.2 + 0.4 * (1 - this.pattern_time), 0, 1));
        _dir = _dir + this.dir_add;
        i = i + 1;
    } while ((!(_dir >= _dirfill || _dir >= 360)) && LOOP('Pinktimeoutzap#2'));

    draw_sprite_ext(this.sprite_index, this.image_index, this.x + lengthdir_x(this.radius, 90 - _dirfill), this.y + lengthdir_y(this.radius, 90 - _dirfill), this.image_xscale, this.image_yscale, - _dirfill, this.image_blend, clamp(0.2 + 0.4 * (1 - this.pattern_time), 0, 1));
  }
  animationEnd() {
    this.image_index = 1;
  }
  step() {
    let i, _dir, _moving, _dir_add, _zap;
    super.step?.();
    this.life_time = this.life_time + 1;
    this.pattern_time = this.pattern_time - 0.016666666666666666;
    if (this.pattern_time > 0) {
        i = 0;
        do {
            this.array_frame ??= []; this.array_frame[i] = this.array_frame[i] + 1;
            if (this.array_frame[i] >= 2 && this.array_frame[i] < 3) {
                if (irandom(19) != 0) {
                    this.array_frame ??= []; this.array_frame[i] = this.array_frame[i] - 2;
                }
            }
            if (this.array_frame[i] >= this.image_number) {
                this.array_frame ??= []; this.array_frame[i] = this.array_frame[i] - this.image_number;
            }
            i = i + 1;
        } while ((!(i * this.dir_add >= (1 - this.pattern_time) * 360 || i >= this.dir_add)) && LOOP('Pinktimeoutzap#3'));

    } else if (this.alarm[1] <= 0) {
        _dir = 90;
        _moving = - 1;
        _dir_add = - 10;
        for (let _r161 = 0, _n161 = (36); _r161 < _n161; _r161++) {
            _zap = instance_create_depth(scr_get_box(4) + lengthdir_x(this.radius, _dir), scr_get_box(5) + lengthdir_y(this.radius, _dir), - 5, 'obj_pinkzap');
            if (W(_zap, function (other) {
                this.direction = S.scr_wrap(_dir - 90, 0, 360);
                this.pattern_speed = _moving;
                this.tunnel_lane_layer = other.tunnel_lane_layer;
                this.image_alpha = 3;
                this.life_time = 99969;
            }, this) === EXIT) return;
            _dir = S.scr_wrap(_dir + _dir_add, 0, 360);
        }
        this.alarm ??= []; this.alarm[1] = 30;
    }
    if (this.life_time >= 99999) {
        this.image_alpha = Math.min(this.image_alpha, 1);
        this.image_alpha = this.image_alpha - 0.075;
        if (this.image_alpha <= 0.001) {
            instance_destroy(this);
        }
    }
  }
}
defineObject('obj_pinktimeoutzap', Pinktimeoutzap);

// obj_pinklanebullet (default sprite spr_pinklanebullet_animation, depth 0, parent obj_regularbullet)
class Pinklanebullet extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_pinklanebullet_animation';
  }
  create() {
    super.create?.();
    this.grazepoints = 2;
    this.make_sounds = 0;
    this.target = 4;
    this.damage = 100;
    if (i_ex('obj_pink_enemy')) {
        this.damage = O('obj_pink_enemy').damage;
    }
    this.element = 6;
    this.wall_destroy = 0;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.image_speed = 1;
    this.image_index = 0;
    this.life_time = 0;
    this.image_alpha = 0.25;
  }
  draw() {
    let _dist, _alpha_a, _alpha_b;
    _dist = 2;
    _alpha_a = 0.08333333333333333 + 0.16666666666666666 * clamp(this.speed / 10, 0, 1);
    _alpha_b = 0.041666666666666664 + 0.08333333333333333 * clamp(this.speed / 10, 0, 1);
    if (this.mask_index != - 1) {
        draw_sprite_ext(this.mask_index, this.image_index, this.x - lengthdir_x(this.speed * _dist * 2, this.direction), this.y - lengthdir_y(this.speed * _dist * 2, this.direction), this.image_xscale, this.image_yscale, this.image_angle, 0xffffff, Math.min(this.image_alpha, _alpha_b));
        draw_sprite_ext(this.mask_index, this.image_index, this.x - lengthdir_x(this.speed * _dist * 1, this.direction), this.y - lengthdir_y(this.speed * _dist * 1, this.direction), this.image_xscale, this.image_yscale, this.image_angle, 0xffffff, Math.min(this.image_alpha, _alpha_a));
        draw_sprite_ext(this.mask_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, 0xffffff, this.image_alpha);
    } else {
        draw_sprite_ext(this.sprite_index, this.image_index, this.x - lengthdir_x(this.speed * _dist * 2, this.direction), this.y - lengthdir_y(this.speed * _dist * 2, this.direction), this.image_xscale, this.image_yscale, this.image_angle, 0xffffff, Math.min(this.image_alpha, _alpha_b));
        draw_sprite_ext(this.sprite_index, this.image_index, this.x - lengthdir_x(this.speed * _dist * 1, this.direction), this.y - lengthdir_y(this.speed * _dist * 1, this.direction), this.image_xscale, this.image_yscale, this.image_angle, 0xffffff, Math.min(this.image_alpha, _alpha_a));
        draw_self(this);
    }
  }
  step() {
    let _minspeed, _limit, _highest_id, _amount;
    super.step?.();
    if (this.friction > 0) {
        _minspeed = 0.6666666666666666;
        this.friction = clamp((this.speed - _minspeed) / 4, 0, this.friction);
        if (this.friction <= 0) {
            this.speed = _minspeed;
        }
    }
    if (this.gravity > 0) {
        if (this.speed >= 12) {
            this.gravity = Math.min(this.gravity, 1);
        }
    }
    this.life_time = this.life_time + 1;
    _limit = Math.max(80, 720 / Math.max(this.speed, 0.1));
    if (this.life_time == 1) {
        _highest_id = - 1;
        _amount = 0;
        if (W('obj_pinklanebullet', function (other) {
            if (this.life_time == 1 || this.life_time == 0) {
                _amount = _amount + 1;
                if (this > _highest_id) {
                    _highest_id = this;
                }
            }
        }, this) === EXIT) return;
        if (this == _highest_id) {
            if (_amount < 2) {
                snd_play('snd_heartshot_dr', 1, 0.65);
            } else {
                snd_play('snd_heartshot_dr', 1, 0.4);
                snd_play('snd_heartshot_dr', 1, 0.9);
            }
        }
    }
    if (this.life_time < _limit) {
        this.image_alpha = clamp(this.image_alpha + 0.25, 0, 1);
    } else if (this.life_time >= _limit) {
        this.image_alpha = this.image_alpha - 0.1;
        if (this.image_alpha <= 0.001) {
            instance_destroy(this);
        }
    }
  }
}
defineObject('obj_pinklanebullet', Pinklanebullet);

// obj_pink3durgenter (default sprite spr_pinkzap, depth 0, parent obj_regularbullet)
class Pink3durgenter extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_pinkzap';
  }
  alarm1() {
    instance_destroy(this);
  }
  create() {
    let i;
    super.create?.();
    this.grazepoints = 2;
    this.target = 4;
    this.damage = 100;
    if (i_ex('obj_pink_enemy')) {
        this.damage = O('obj_pink_enemy').damage;
    }
    this.element = 6;
    this.active = 0;
    this.destroyonhit = 0;
    this.life_time = 0;
    this.tunnel_lane_layer = 0;
    this.radius = 128;
    this.dir_add = 12;
    i = Math.ceil(360 / this.dir_add);
    for (let _r78 = 0, _n78 = (Math.ceil(360 / this.dir_add)); _r78 < _n78; _r78++) {
        i = i - 1;
        this.array_frame ??= []; this.array_frame[i] = irandom(1);
    }
    this.pattern_time = 1;
    this.backwards_momentum = 0;
  }
  draw() {
    let _dirfill, _dir, _thickness, _squaredir, _side_width, _side_position, _side, i, i_looped, _xx, _yy;
    if (!T(instance_exists('obj_growtangle'))) {
        return;
    }
    _dirfill = (1 - this.pattern_time) * 360;
    _dir = 0;
    _thickness = 1.5;
    _squaredir = 90;
    _side_width = this.radius * 2;
    _side_position = 0.55;
    _side = 0;
    i = 0;
    if (this.life_time >= 20) {
        do {
            i_looped = i % array_length(this.array_frame);
            if (_squaredir == 0 || _squaredir == 180) {
                _xx = scr_get_box(4) + 2 + lengthdir_x(_side_width / 2 - this.image_xscale + irandom(1) * this.image_xscale, _squaredir);
            } else if (_squaredir == 90) {
                _xx = scr_get_box(4) + 2 + _side_width * (- 0.5 + _side_position);
            } else {
                _xx = scr_get_box(4) + 2 + _side_width * (0.5 - _side_position);
            }
            if (_squaredir == 90 || _squaredir == 270) {
                _yy = scr_get_box(5) + lengthdir_y(_side_width / 2 - this.image_yscale + irandom(1) * this.image_yscale, _squaredir);
            } else if (_squaredir == 0) {
                _yy = scr_get_box(5) + _side_width * (- 0.5 + _side_position);
            } else {
                _yy = scr_get_box(5) + _side_width * (0.5 - _side_position);
            }
            draw_sprite_ext(this.sprite_index, Math.floor(this.array_frame[i_looped]), _xx, _yy, this.image_xscale, this.image_yscale, _squaredir + 270, 0xffffff, this.image_alpha);
            draw_sprite_ext(this.sprite_index, Math.floor(this.array_frame[i_looped]), _xx, _yy, this.image_xscale + lengthdir_x(this.image_xscale * _thickness, this.image_angle + 90), this.image_yscale + lengthdir_y(this.image_yscale * _thickness, this.image_angle + 90), _squaredir + 270, 0xffffff, clamp(0.3333333333333333 * this.image_alpha, 0, 1));
            draw_sprite_ext(this.sprite_index, Math.floor(this.array_frame[i_looped]), _xx, _yy, this.image_xscale + lengthdir_x(this.image_xscale * _thickness, this.image_angle + 270), this.image_yscale + lengthdir_y(this.image_yscale * _thickness, this.image_angle + 270), _squaredir + 270, 0xffffff, clamp(0.3333333333333333 * this.image_alpha, 0, 1));
            _side_position = _side_position + 0.1;
            if (_side >= 4 && _side_position > 0.5) {
                _side = _side + 1;
            } else if (_side_position > 1) {
                _side_position = 0.05;
                _side = _side + 1;
                switch (_side) {
                  case 0:
                    _squaredir = 90;
                    break;
                  case 1:
                    _squaredir = 0;
                    break;
                  case 2:
                    _squaredir = 270;
                    break;
                  case 3:
                    _squaredir = 180;
                    break;
                  case 4:
                    _squaredir = 90;
                    break;
                }
            }
            i = i + 1;
        } while ((!(i > (this.life_time - 20) * 2 || _side > 4)) && LOOP('Pink3durgenter#4'));

    }
  }
  animationEnd() {
    this.image_index = 1;
  }
  step() {
    let i;
    super.step?.();
    this.life_time = this.life_time + 1;
    if (this.life_time == 20) {
        snd_play('snd_electroshock');
    }
    if (this.life_time == 30) {
        this.active = 1;
    }
    if (this.pattern_time > 0) {
        this.pattern_time = this.pattern_time - 0.06666666666666667;
    }
    i = 0;
    do {
        this.array_frame ??= []; this.array_frame[i] = this.array_frame[i] + 1;
        if (this.array_frame[i] >= 2 && this.array_frame[i] < 3) {
            if (irandom(59) != 0) {
                this.array_frame ??= []; this.array_frame[i] = this.array_frame[i] - 2;
            }
        }
        if (this.array_frame[i] >= this.image_number) {
            this.array_frame ??= []; this.array_frame[i] = this.array_frame[i] - this.image_number;
        }
        i = i + 1;
    } while ((!(i * this.dir_add >= 360)) && LOOP('Pink3durgenter#5'));

  }
}
defineObject('obj_pink3durgenter', Pink3durgenter);

// obj_buzzsaw (default sprite spr_buzzsaw, depth 0, parent obj_regularbullet)
class Buzzsaw extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_buzzsaw';
  }
  create() {
    super.create?.();
    this.target = 4;
    this.damage = 100;
    if (i_ex('obj_pink_enemy')) {
        this.damage = O('obj_pink_enemy').damage;
    }
    this.destroyonhit = 0;
    this.grazepoints = 2;
    this.frame_dir = 0;
    this.image_xscale = 2;
    this.image_yscale = 2;
  }
  draw() {
    draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.frame_dir, this.image_blend, this.image_alpha);
  }
  step() {
    super.step?.();
    this.frame_dir = this.frame_dir - 22;
    if (this.frame_dir < 0) {
        this.frame_dir = this.frame_dir + 360;
    }
  }
}
defineObject('obj_buzzsaw', Buzzsaw);

// obj_pinkmeteor (default sprite None, depth 0)
class Pinkmeteor extends Instance {
  cleanUp() {
    surface_free(this.surface_effect);
  }
  create() {
    let _dir, i;
    this.image_xscale = 2.3333333333333335;
    this.image_yscale = 2.3333333333333335;
    this.phase = 0;
    this.life_time = 0;
    this.smoke_time = 0;
    this.pattern_dir = random(360);
    this.surface_effect = surface_create(256, 256);
    this.radius = 129;
    this.heat_alpha = 0.01;
    this.mother = - 4;
    _dir = random(360);
    i = 5;
    for (let _r64 = 0, _n64 = (5); _r64 < _n64; _r64++) {
        i = i - 1;
        this.lightray_dir ??= []; this.lightray_dir[i] = _dir;
        this.lightray_dist ??= []; this.lightray_dist[i] = 0;
        _dir = _dir + 72;
    }
  }
  draw() {
    let _freeze, _ell_radius, _rx, _ry, _flash_alpha, _yy, i, _dir, _dist, _radius, _alpha;
    _freeze = false;
    if (this.phase == 1) {
        if (this.life_time < 4) {
            draw_set_color(0xffffff);
            draw_set_alpha(0.5);
            _ell_radius = (4 - this.life_time) * 24;
            S.d_ellipse(this.x - _ell_radius, this.y - 16 - _ell_radius / 6, this.x + _ell_radius, this.y - 16 + _ell_radius / 6, false);
            draw_set_alpha(1);
        }
        _rx = this.x + Math.max(0, this.life_time - 2) * (1 - this.life_time % 2 * 2);
        _ry = this.y;
        switch (this.life_time) {
          case 0:
          case 1:
            _ry = _ry - 8;
            break;
          case 2:
          case 3:
            _ry = _ry + 6;
            break;
        }
        _flash_alpha = clamp(this.life_time / 15, 0, 1);
        switch (this.life_time) {
          case 0:
          case 5:
          case 6:
            _flash_alpha = 1;
            break;
        }
        draw_set_color(0xffffff);
        draw_set_alpha(0.6666666666666666);
        _yy = this.y - 30 * this.image_yscale;
        i = 0;
        for (let _r194 = 0, _n194 = (5); _r194 < _n194; _r194++) {
            _dir = this.lightray_dir[i];
            _dist = this.lightray_dist[i];
            draw_primitive_begin(5);
            draw_vertex(this.x, _yy);
            draw_vertex(this.x + lengthdir_x(_dist * 0.98, _dir - 2.5), _yy + lengthdir_y(_dist * 0.9 * 0.98, _dir - 2.5) * 0.9);
            draw_vertex(this.x + lengthdir_x(_dist * 0.98, _dir + 2.5), _yy + lengthdir_y(_dist * 0.9 * 0.98, _dir + 2.5) * 0.9);
            draw_vertex(this.x + lengthdir_x(_dist * 0.98, _dir), _yy + lengthdir_y(_dist * 0.98, _dir));
            draw_primitive_end();
            i = i + 1;
        }
        draw_set_alpha(0.3333333333333333);
        i = 0;
        for (let _r336 = 0, _n336 = (5); _r336 < _n336; _r336++) {
            _dir = this.lightray_dir[i];
            _dist = this.lightray_dist[i];
            draw_primitive_begin(5);
            draw_vertex(this.x, _yy);
            draw_vertex(this.x + lengthdir_x(_dist, _dir - 5), _yy + lengthdir_y(_dist * 0.9, _dir - 5));
            draw_vertex(this.x + lengthdir_x(_dist, _dir + 5), _yy + lengthdir_y(_dist * 0.9, _dir + 5));
            draw_vertex(this.x + lengthdir_x(_dist, _dir), _yy + lengthdir_y(_dist, _dir));
            draw_primitive_end();
            i = i + 1;
        }
    }
    if (this.phase == 2) {
        _radius = (this.life_time - 5) * 96;
        _alpha = clamp(1 - (this.life_time - 5) / 7, 0, 1) * 0.8;
        if (_alpha > 0) {
            draw_set_alpha(_alpha);
            S.d_circle(this.x, this.y - 80, _radius, false);
            if (_radius > 16) {
                draw_set_color(0x000000);
                S.d_circle(this.x, this.y - 80, _radius - 16, false);
            }
            draw_set_alpha(1);
        }
        _radius = 640 / Math.max(0.5, this.life_time * 1.25) - this.life_time;
        if (_radius > 0) {
            draw_set_color(0xffffff);
            S.d_circle(this.x, this.y - 80, _radius, false);
        }
    }
    draw_set_alpha(this.heat_alpha);
    S.d_rectangle_color(S.camera_get_view_x(0), S.camera_get_view_y(0), S.camera_get_view_x(0) + 640, S.camera_get_view_y(0) + 480, 65535, 65535, 255, 255, false);
    draw_set_alpha(1);
  }
  step() {
    let _freeze, _pre_boom_frames, _speedoflight, i, _dir, _spd, _boombit, _boom;
    super.step?.();
    _freeze = false;
    if (!T(_freeze)) {
        this.life_time = this.life_time + 1;
        switch (this.phase) {
          case 0:
            this.phase = this.phase + 1;
            this.life_time = 0;
            break;
          case 1:
            _pre_boom_frames = 15;
            _speedoflight = (_pre_boom_frames + 2 - this.life_time) / (_pre_boom_frames + 2) * 2.5;
            i = 0;
            for (let _r73 = 0, _n73 = (5); _r73 < _n73; _r73++) {
                this.lightray_dir ??= []; this.lightray_dir[i] = this.lightray_dir[i] + (3 + i) * (1 - 2 * (i % 2)) * _speedoflight * 2;
                this.lightray_dist ??= []; this.lightray_dist[i] = this.lightray_dist[i] + (7 + i) * _speedoflight * 2;
                i = i + 1;
            }
            if (this.life_time > _pre_boom_frames) {
                this.phase = this.phase + 1;
                this.life_time = 0;
                snd_play('snd_explosion');
                scr_shakescreen(this);
                if (W('obj_shake', function (other) {
                    this.shakex = 30;
                    this.shakey = 30;
                    this.shakesign = 0.5;
                }, this) === EXIT) return;
                this.heat_alpha = this.heat_alpha + 0.1;
                _dir = 55;
                _spd = 7 + random(15);
                for (let _r202 = 0, _n202 = (16); _r202 < _n202; _r202++) {
                    _boombit = instance_create_depth(this.x, this.y - 48, this.depth + 3, 'obj_explosion_flamingbit');
                    _boombit.direction = _dir - 1 + random(2);
                    _boombit.speed = _spd;
                    _dir = _dir + 4.666666666666667;
                    _spd = _spd + (5 + random(5));
                    if (_spd > 22) {
                        _spd = _spd - 15;
                    }
                }
                this.mother = - 4;
                global.turntimer = Math.min(global.turntimer, 1);
            }
            break;
          case 2:
            this.x = Math.max(S.camera_get_view_x(0) + 16, this.x);
            if (this.life_time <= 10) {
                _boom = instance_create_depth(this.x + lengthdir_x(this.life_time * 12, this.pattern_dir), this.y - 80 + lengthdir_y(this.life_time * 9, this.pattern_dir), this.depth + 2, 'obj_slidedust');
                this.pattern_dir = S.scr_wrap(this.pattern_dir + 60 + random(90), 0, 360);
                _boom.image_xscale = 2;
                _boom.image_yscale = _boom.image_xscale;
                _boom.x = _boom.x - 25 * _boom.image_xscale;
                _boom.y = _boom.y - 33 * _boom.image_yscale;
                _boom.sprite_index = 'spr_explosion_round';
                _boom.image_speed = 0.5;
                _boom.alarm ??= []; _boom.alarm[5] = _boom.image_number * (1 / _boom.image_speed);
            }
            if (this.life_time == 11) {
                if (W('obj_slidedust', function (other) {
                    if (this.sprite_index == 'spr_explosion_round') {
                        this.image_speed = 0.334;
                        this.alarm ??= []; this.alarm[5] = Math.floor(this.alarm[5] * 1.5);
                    }
                }, this) === EXIT) return;
            }
            this.heat_alpha = this.heat_alpha - 0.005;
            if (this.heat_alpha <= 0) {
                instance_destroy(this);
            }
            break;
        }
    } else {
        this.x = this.x - this.hspeed;
        this.y = this.y - this.vspeed;
        if (this.radius > 128) {
            this.radius = 128;
        } else {
            this.radius = Math.max(48, 48 + (this.radius - 48) / 2 - 1);
        }
    }
  }
  endStep() {
    if (instance_exists(this.mother)) {
        this.x = this.mother.x;
        this.y = this.mother.y + 30 * this.image_yscale;
    }
  }
}
defineObject('obj_pinkmeteor', Pinkmeteor);

// obj_pinkmeteorfire (default sprite spr_bhero_flame, depth 0)
class Pinkmeteorfire extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_bhero_flame';
  }
  create() {
    this.image_xscale = 4;
    this.image_yscale = this.image_xscale;
    this.image_angle = random(360);
    this.spin_dir = choose(- 1, 1);
  }
  step() {
    let _freeze;
    _freeze = false;
    if (!T(_freeze)) {
        this.image_angle = this.image_angle + this.spin_dir * 30;
        this.image_xscale = this.image_xscale - 0.3;
        this.image_yscale = this.image_xscale;
        if (this.image_xscale <= 0.001) {
            instance_destroy(this);
        }
    } else {
        this.x = this.x - this.hspeed;
        this.y = this.y - this.vspeed;
    }
  }
}
defineObject('obj_pinkmeteorfire', Pinkmeteorfire);

// obj_huge_anime_face (default sprite spr_pinkghost_nya_1, depth 0, parent obj_regularbullet)
class HugeAnimeFace extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_pinkghost_nya_1';
  }
  cleanUp() {
    snd_stop('snd_rumble');
  }
  create() {
    super.create?.();
    this.active = 0;
    this.destroyonhit = 0;
    this.wall_destroy = 0;
    this.image_xscale = - 2;
    this.image_yscale = 2;
    this.hspeed = 20;
    this.friction = 1.25;
    this.image_index = 0;
    this.image_speed = 0;
    this.life_time = 0;
    this.phase = - 1;
    this.pattern = 0;
    this.pattern_time = 0;
    this.player_moved = 0;
    this.mode = 0;
    this.jump_cycle = 0;
    this.bumps = 0;
    this.attacked = 0;
    this.bump_timer = 0;
    this.super = 0;
  }
  draw() {
    let _col;
    _col = 0xffffff;
    switch (this.mode) {
      case 0:
        switch (this.phase) {
          case 0:
            draw_sprite_ext(this.sprite_index, this.image_index, this.x - 2 + irandom(4), this.y, this.image_xscale, this.image_yscale, this.image_angle, _col, this.image_alpha);
            break;
          case 1:
            draw_self(this);
            break;
        }
        break;
      case 1:
        draw_sprite_ext(this.sprite_index, this.image_index, this.x + choose(- 1, 0, 1) + Math.abs(lengthdir_y(3, this.jump_cycle)), this.y + choose(- 1, 0, 1) - Math.abs(lengthdir_y(10, this.jump_cycle)), this.image_xscale, this.image_yscale, this.image_angle, _col, this.image_alpha);
        break;
    }
  }
  step() {
    let _y_goal, _risespeed, _camerashift_x, _camerashift_y, _hastening, i, _dust, _cameragoal_x, _aggroboost, _aggrothreshold, _keep_bump_momentum, _speedmulti, _x_edge, _y_edge, _jc_old, _we_bumped;
    super.step?.();
    this.life_time = this.life_time + 1;
    switch (this.mode) {
      case 0:
        switch (this.phase) {
          case - 1:
            if (this.player_moved > 0 || this.life_time >= 50) {
                S.audio_play_sound('snd_rumble', 1, 1);
                this.life_time = 0;
                this.phase = this.phase + 1;
            }
            break;
          case 0:
            _y_goal = scr_get_box(5) - 132 + 10;
            _risespeed = 1.25;
            _camerashift_x = 0;
            _camerashift_y = 0;
            _hastening = 1;
            if (this.player_moved > 0) {
                if (this.y > _y_goal + 96) {
                    _hastening = 8;
                } else if (this.y > _y_goal + 80) {
                    _hastening = 7;
                } else if (this.y > _y_goal + 64) {
                    _hastening = 6;
                } else if (this.y > _y_goal + 48) {
                    _hastening = 5;
                } else if (this.y > _y_goal + 32) {
                    _hastening = 4;
                } else if (this.y > _y_goal + 16) {
                    _hastening = 3;
                } else {
                    _hastening = 2;
                }
            }
            i = 0;
            for (let _r203 = 0, _n203 = (_hastening); _r203 < _n203; _r203++) {
                if (i >= 1) {
                    this.life_time = this.life_time + 1;
                }
                if (this.life_time < 20) {
                    _risespeed = 0.5;
                } else if (this.life_time < 30) {
                    _risespeed = 2;
                } else if (this.life_time < 72) {
                    _risespeed = 4;
                } else if (this.life_time < 77) {
                    _risespeed = 2;
                } else {
                    _risespeed = 1;
                }
                this.y = this.y - _risespeed;
                _camerashift_x = 0.1 * _risespeed;
                _camerashift_y = 0.08 * _risespeed;
                i = i + 1;
            }
            _dust = instance_create_depth(this.x - random(156) - 16, S.camera_get_view_y(0) + 316 + irandom(2) * 2, - 24, 'obj_slidedust');
            _dust.sprite_index = 'spr_dust1';
            _dust.vspeed = choose(0, 0, 0, - 0.625);
            this.x = this.x + _camerashift_x;
            if (W('obj_purplecontrols', function (other) {
                this.x = this.x + _camerashift_x;
                this.y = this.y + _camerashift_y;
                this.tire_y = this.tire_y + _camerashift_y;
            }, this) === EXIT) return;
            if (W('obj_purplebg', function (other) {
                this.bg_x = this.bg_x + _camerashift_x / 4;
                this.bg_y = this.bg_y + _camerashift_y / 4;
            }, this) === EXIT) return;
            if (W('obj_growtangle', function (other) {
                this.x = this.x + _camerashift_x;
                this.y = this.y + _camerashift_y;
            }, this) === EXIT) return;
            if (W('obj_heart', function (other) {
                this.x = this.x + _camerashift_x;
                this.y = this.y + _camerashift_y;
            }, this) === EXIT) return;
            if (W('obj_pink_battlemovement', function (other) {
                this.x = this.x + _camerashift_x;
                this.y = this.y + _camerashift_y;
                this.dest_x = this.dest_x + _camerashift_x;
            }, this) === EXIT) return;
            if (this.y <= _y_goal) {
                snd_stop('snd_rumble');
                this.y = _y_goal;
                if (W('obj_purplecontrols', function (other) {
                    this.x = Math.floor(0.5 + this.x);
                    this.y = Math.floor(0.5 + this.y);
                    this.tire_y = Math.floor(0.5 + this.tire_y);
                    this.can_move = true;
                }, this) === EXIT) return;
                if (W('obj_growtangle', function (other) {
                    this.x = Math.floor(0.5 + this.x);
                    this.y = Math.floor(0.5 + this.y);
                }, this) === EXIT) return;
                if (W('obj_heart', function (other) {
                    this.x = Math.floor(0.5 + this.x);
                    this.y = Math.floor(0.5 + this.y);
                }, this) === EXIT) return;
                if (W('obj_pink_battlemovement', function (other) {
                    this.x = Math.floor(0.5 + this.x);
                    this.y = Math.floor(0.5 + this.y);
                }, this) === EXIT) return;
                this.friction = 0;
                this.life_time = 0;
                this.phase = this.phase + 1;
            }
            break;
          case 1:
            if (this.player_moved > 0 || this.life_time >= 30) {
                this.friction = 0;
                this.sprite_index = 'spr_pinkghost_angry';
                this.image_index = 0;
                this.life_time = 0;
                this.phase = 0;
                this.mode = 1;
            }
            break;
        }
        break;
      case 1:
        this.pattern_time = this.pattern_time + 1;
        _camerashift_x = 0;
        _cameragoal_x = S.camera_get_view_x(0) + 320;
        if (instance_exists('obj_growtangle')) {
            _cameragoal_x = this.bbox_right * 0.25 + (scr_get_box(4) + 16) * 0.75;
        }
        _camerashift_x = clamp(S.camera_get_view_x(0) + 320 - _cameragoal_x, - 4, 4);
        if (W('obj_bulletparent', function (other) {
            this.x = this.x + _camerashift_x;
        }, this) === EXIT) return;
        if (W('obj_dokiheart', function (other) {
            this.x = this.x + _camerashift_x;
            this.xdraw = this.xdraw + _camerashift_x;
        }, this) === EXIT) return;
        if (W('obj_purplecontrols', function (other) {
            this.x = this.x + _camerashift_x;
        }, this) === EXIT) return;
        if (W('obj_purplebg', function (other) {
            this.bg_x = this.bg_x + _camerashift_x / 4;
        }, this) === EXIT) return;
        if (W('obj_growtangle', function (other) {
            this.x = this.x + _camerashift_x;
        }, this) === EXIT) return;
        if (W('obj_heart', function (other) {
            this.x = this.x + _camerashift_x;
        }, this) === EXIT) return;
        if (W('obj_pink_battlemovement', function (other) {
            this.x = this.x + _camerashift_x;
            this.dest_x = this.dest_x + _camerashift_x;
        }, this) === EXIT) return;
        this.x = clamp(this.x + 1.5, S.camera_get_view_x(0) - 160, S.camera_get_view_x(0) + 640);
        _aggroboost = 0;
        _aggrothreshold = 25;
        _keep_bump_momentum = false;
        if (this.bumps <= 0) {
            _speedmulti = 32;
        } else if (this.bumps < 2) {
            _speedmulti = 1.5;
            _keep_bump_momentum = true;
        } else if (this.bumps < 3) {
            _speedmulti = 4;
            _keep_bump_momentum = true;
        } else if (this.bumps < 4) {
            _speedmulti = 9;
            _keep_bump_momentum = true;
        } else {
            _speedmulti = 11;
        }
        if (this.bumps >= 5) {
            _keep_bump_momentum = false;
            if (this.bumps < 6) {
                _aggroboost = 0.12;
            } else if (this.bumps < 7) {
                _aggroboost = 0.12;
            } else {
                _aggroboost = 0.667;
                _aggrothreshold = 29;
                _speedmulti = - 0.06;
                this.super = 1;
            }
        }
        if (_speedmulti <= 0) {
            this.hspeed = this.hspeed + _speedmulti;
        } else if (this.hspeed < 2.5) {
            this.hspeed = this.hspeed + 0.02 * _speedmulti;
        } else if (this.hspeed < 4) {
            this.hspeed = this.hspeed + 0.01 * _speedmulti;
        } else {
            this.hspeed = this.hspeed + 0.002 * _speedmulti;
        }
        if (_aggroboost > 0) {
            if (this.bump_timer >= _aggrothreshold - 10 && this.bumps >= 7) {
                _x_edge = this.bbox_right;
                _y_edge = this.bbox_bottom;
                this.sprite_index = 'spr_pinkghost_yell_full';
                this.x = this.x + (_x_edge - this.bbox_right);
                this.y = this.y + (_y_edge - this.bbox_bottom);
            }
            if (this.bump_timer >= _aggrothreshold) {
                this.hspeed = this.hspeed + _aggroboost;
            }
        }
        _jc_old = this.jump_cycle;
        this.jump_cycle = this.jump_cycle + 10 * this.speed;
        if (_jc_old < 180 && this.jump_cycle >= 180 || _jc_old < 360 && this.jump_cycle >= 360) {
            snd_play('snd_impact_bc', 0.5, 0.5);
        }
        if (this.jump_cycle >= 360) {
            this.jump_cycle = this.jump_cycle - 360;
        }
        this.bump_timer = this.bump_timer + 1;
        _we_bumped = false;
        if (place_meeting(this, this.x - 32, this.y, 'obj_growtangle')) {
            if (W('obj_purplecontrols', function (other) {
                if (this.iframes <= 0) {
                    _we_bumped = true;
                    this.user0?.();
                }
            }, this) === EXIT) return;
        }
        if (T(_we_bumped)) {
            this.bumps = this.bumps + 1;
            this.bump_timer = 0;
            void("bumps: " + String(this.bumps));
            snd_play('snd_pink_trip');
            snd_play('snd_impact');
            scr_shakescreen(this);
            if (!T(_keep_bump_momentum)) {
                this.speed = this.speed / 2;
            }
            this.speed = Math.max(1, this.speed - 1);
            if (W('obj_pinklanebullet', function (other) {
                if (this.friction > 0 || this.speed <= 1) {
                    this.friction = 0;
                    this.gravity_direction = this.direction;
                    this.speed = 3;
                    this.gravity = 2;
                }
            }, this) === EXIT) return;
            if (this.bumps < 7) {
                _x_edge = this.bbox_right;
                this.image_xscale = - this.image_xscale;
                this.x = this.x + (_x_edge - this.bbox_right);
            } else if (this.bumps == 7) {
                _x_edge = this.bbox_right;
                _y_edge = this.bbox_bottom;
                this.image_xscale = - Math.abs(this.image_xscale);
                this.sprite_index = 'spr_pinkghost_shock_full';
                this.x = this.x + (_x_edge - this.bbox_right);
                this.y = this.y + (_y_edge - this.bbox_bottom);
            }
            if (this.super >= 1) {
                if (W('obj_shake', function (other) {
                    this.shakex = 8;
                    this.shakey = 8;
                }, this) === EXIT) return;
            }
            this.attacked = 0;
            this.pattern_time = 0;
        }
        break;
    }
  }
}
defineObject('obj_huge_anime_face', HugeAnimeFace);

// !!! gml_Object_obj_fusebomb_Draw_0.gml has a decompiler WARNING: check the asm
// obj_fusebomb (default sprite spr_fusebomb, depth 0, parent obj_regularbullet)
class Fusebomb extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_fusebomb';
    this.mask_index = 'spr_fusebomb_shadow';
  }
  alarm0() {
    this.mask_index = 'spr_fusebomb_shadow';
  }
  create() {
    super.create?.();
    this.target = 4;
    this.damage = 100;
    if (i_ex('obj_pink_enemy')) {
        this.damage = O('obj_pink_enemy').damage;
    }
    this.grazepoints = 2;
    this.active = 0;
    this.destroyonhit = 0;
    this.made = 0;
    this.mode = 0;
    this.has_heart = false;
    this.fuse_time = 60;
    this.quickburn_time = - 1;
    this.warn_time = 28;
    this.air_time = 1;
    this.air_height = 120;
    this.frames_since_airtime = 0;
    this.grid_x = 0;
    this.grid_y = 0;
    this.dest_x = this.x;
    this.dest_y = this.y;
    this.bounce_dir = - 1;
    this.x = S.camera_get_view_x(0) + 480;
    this.y = S.camera_get_view_y(0) + 160;
    this.grow = 1;
    this.fuse_frame = 0;
    this.pulse_time = 0;
    this.inside_the_grid = true;
    this.heart_direction = 270;
  }
  draw() {
    let _warn, _thick, _fusecolor, _color, _bx, _by, _sx, _sy, _radius, _fuselength_scale, _burnsprite, _fuselength;
    if (global.flag[1914] == 1) {
        if (this.fuse_time < this.warn_time) {
            if (this.fuse_time >= this.warn_time - 7 && this.fuse_time < this.warn_time - 5) {
                draw_set_color(0xffff00);
            } else {
                draw_set_color(0xff0000);
            }
            draw_set_alpha(0.3 + (1 - this.fuse_time / this.warn_time) * 0.125);
            if (this.fuse_time >= this.warn_time - 4) {
                _warn = (this.warn_time - this.fuse_time) * 128;
                _thick = 14 - this.fuse_time % 2 * 2;
                S.d_ellipse(this.x - _warn, this.y - _thick, this.x + _warn, this.y + _thick, 0);
                S.d_ellipse(this.x - _thick, this.y - _warn, this.x + _thick, this.y + _warn, 0);
            } else {
                _thick = 10 - this.fuse_time % 2 * 2;
                S.d_rectangle(S.camera_get_view_x(0), this.y - _thick, S.camera_get_view_x(0) + 640, this.y + _thick, 0);
                S.d_rectangle(this.x - _thick, S.camera_get_view_y(0), this.x + _thick, S.camera_get_view_y(0) + 480, 0);
            }
            draw_set_alpha(1);
        }
    }
    if (this.mode == 0) {
        _fusecolor = merge_color(0xff0000, 0xffffff, clamp((this.fuse_time - 15) / 45, 0, 1));
    } else {
        _fusecolor = merge_color(0xff0000, 0xffffff, clamp((this.fuse_time - 2) / 30, 0, 1));
    }
    if (this.grow <= 1) {
    } else {
    }
    if (! 0) {
        if (this.grow > 1) {
        } else {
        }
    } else {
    }
    if (1) {
        if (this.fuse_time < 8) {
            _color = 0xff6600;
        } else {
            _color = 0xffbb00;
        }
    } else {
        switch (this.mode) {
          case 0:
            _color = 0x888888;
            break;
          default:
            _color = 0xffffff;
        }
    }
    if (T(this.has_heart)) {
        if (_color == 26367) {
            _color = 0x880000;
        } else if (_color == 48127) {
            _color = 0xcc2233;
        } else {
            _color = 0xff6699;
        }
    }
    if (this.air_time > 0) {
        _bx = lerp(this.dest_x, this.x, this.air_time);
        _by = lerp(this.dest_y, this.y, this.air_time) + lengthdir_y(this.air_height, (1 - this.air_time) * 180);
        _sx = this.dest_x;
        _sy = this.dest_y;
        if (instance_exists('obj_growtangle')) {
            if (_sx < scr_get_box(2)) {
                _sx = _sx + 200;
            } else if (_sx > scr_get_box(0)) {
                _sx = _sx - 200;
            }
            if (_sy < scr_get_box(1)) {
                _sy = _sy + 200;
            } else if (_sy > scr_get_box(3)) {
                _sy = _sy - 200;
            }
        }
        if (T(this.inside_the_grid)) {
            if (global.turntimer % 5 < 2) {
                draw_set_color(0xffbb00);
            } else {
                draw_set_color(0x880000);
            }
            _radius = (1 - this.air_time * this.air_time * this.air_time * this.air_time) * 14;
            S.d_circle(_sx, _sy, _radius, true);
            S.d_circle(_sx, _sy, _radius - 0.5, true);
            S.d_circle(_sx, _sy, _radius - 1, true);
            _radius = ((1 - this.air_time) / 2 + (1 - this.air_time) * (1 - this.air_time) / 2) * 16;
            S.d_circle(_sx, _sy, _radius, false);
        }
    } else {
        _bx = this.x;
        _by = this.y;
        switch (this.frames_since_airtime) {
          case 1:
            _by = _by - 4;
            break;
          case 2:
            _by = _by - 5;
            break;
          case 3:
            _by = _by - 5;
            break;
          case 4:
            _by = _by - 4;
            break;
          case 5:
            _by = _by - 0;
            break;
        }
    }
    draw_sprite_ext(this.sprite_index, this.image_index, _bx, _by, this.image_xscale * this.grow, this.image_yscale * this.grow, this.image_angle, _color, this.image_alpha);
    _fuselength_scale = 1;
    if (this.mode == 1) {
        _fuselength_scale = 2;
    }
    if (this.fuse_time > 4) {
        if (global.flag[1914] == 2) {
            _burnsprite = 'spr_fusebomb_burning_fast';
        } else {
            _burnsprite = 'spr_fusebomb_burning';
        }
        _fuselength = this.fuse_time + Math.max(0, this.quickburn_time);
        draw_sprite_ext(_burnsprite, Math.floor(this.fuse_frame), _bx + (- 3 - _fuselength * _fuselength_scale / 9) * this.image_xscale * this.grow, _by + (- 3 - _fuselength * _fuselength_scale / 9) * this.image_yscale * this.grow, this.image_xscale * this.grow, this.image_yscale * this.grow, this.image_angle, _fusecolor, this.image_alpha);
    }
  }
  user5() {
    if (this.active == 1) {
        if (W('obj_pink_enemy', function (other) {
            this.teamdamage = 84;
        }, this) === EXIT) return;
        if (W('obj_pink_enemy', function (other) {
            this.user2?.();
        }, this) === EXIT) return;
        if (!T(instance_exists('obj_pink_enemy'))) {
            super.user5?.();
        }
    }
  }
  step() {
    let _bounced, _bounced_forcedir, _lane_distance, _overlap, _box_x, _box_y, _way, _xx, _yy, _fuselength_scale, _boom, _dir;
    _bounced = false;
    _bounced_forcedir = - 1;
    _lane_distance = 40;
    if (this.made == 0) {
        if (global.flag[1914] == 1) {
            this.fuse_time = this.fuse_time + 4;
        }
        _overlap = false;
        if (collision_point(this.dest_x, this.dest_y, 'obj_dokiheart', 1, 1)) {
            _overlap = true;
        } else {
            if (W('obj_fusebomb', function (other) {
                if (this != other.id && this.grid_x == other.grid_x && this.grid_y == other.grid_y && T(this.has_heart)) {
                    _overlap = true;
                    return BREAK;
                }
            }, this) === EXIT) return;
        }
        if (T(_overlap)) {
            _box_x = S.camera_get_view_x(0) + 320;
            _box_y = S.camera_get_view_y(0) + 240;
            if (instance_exists('obj_growtangle')) {
                _box_x = scr_get_box(4);
                _box_y = scr_get_box(5);
            }
            _way = choose(0, 1);
            for (let _r171 = 0, _n171 = (2); _r171 < _n171; _r171++) {
                _xx = this.grid_x;
                _yy = this.grid_y;
                switch (_way) {
                  case 0:
                    switch (_xx) {
                      case 0:
                      case 2:
                        _xx = _xx + 1;
                        break;
                      case 1:
                      case 3:
                        _xx = _xx - 1;
                        break;
                    }
                    break;
                  case 1:
                    switch (_yy) {
                      case 0:
                      case 2:
                        _yy = _yy + 1;
                        break;
                      case 1:
                      case 3:
                        _yy = _yy - 1;
                        break;
                    }
                    break;
                }
                if (!T(collision_point(_box_x - _lane_distance * 1.5 + _xx * _lane_distance, _box_y - _lane_distance * 1.5 + _yy * _lane_distance, 'obj_dokiheart', 1, 1))) {
                    _overlap = false;
                    if (W('obj_fusebomb', function (other) {
                        if (this != other.id && this.grid_x == _xx && this.grid_y == _yy && (this.has_heart || this.fuse_time >= 20)) {
                            _overlap = true;
                        }
                    }, this) === EXIT) return;
                    if (!T(_overlap)) {
                        break;
                    }
                }
                _way = 1 - _way;
            }
            if (T(_overlap)) {
                _way = choose(0, 1);
                for (let _r374 = 0, _n374 = (2); _r374 < _n374; _r374++) {
                    _xx = this.grid_x;
                    _yy = this.grid_y;
                    switch (_way) {
                      case 0:
                        switch (_xx) {
                          case 0:
                          case 2:
                            _xx = _xx - 1;
                            break;
                          case 1:
                          case 3:
                            _xx = _xx + 1;
                            break;
                        }
                        break;
                      case 1:
                        switch (_yy) {
                          case 0:
                          case 2:
                            _yy = _yy - 1;
                            break;
                          case 1:
                          case 3:
                            _yy = _yy + 1;
                            break;
                        }
                        break;
                    }
                    if (_xx < 0) {
                        _xx = _xx + 4;
                    }
                    if (_xx > 3) {
                        _xx = _xx - 4;
                    }
                    if (_yy < 0) {
                        _yy = _yy + 4;
                    }
                    if (_yy > 3) {
                        _yy = _yy - 4;
                    }
                    if (!T(collision_point(_box_x - _lane_distance * 1.5 + _xx * _lane_distance, _box_y - _lane_distance * 1.5 + _yy * _lane_distance, 'obj_dokiheart', 1, 1))) {
                        _overlap = false;
                        if (W('obj_fusebomb', function (other) {
                            if (this != other.id && this.grid_x == _xx && this.grid_y == _yy && (this.has_heart || this.fuse_time >= 20)) {
                                _overlap = true;
                            }
                        }, this) === EXIT) return;
                        if (!T(_overlap)) {
                            break;
                        }
                    }
                    _way = 1 - _way;
                }
            }
            if (!T(_overlap)) {
                this.grid_x = _xx;
                this.grid_y = _yy;
                this.dest_x = _box_x - _lane_distance * 1.5 + this.grid_x * _lane_distance;
                this.dest_y = _box_y - _lane_distance * 1.5 + this.grid_y * _lane_distance;
            }
        }
        this.made = 1;
    }
    if (this.air_time <= 0) {
        this.frames_since_airtime = this.frames_since_airtime + 1;
    } else {
        this.frames_since_airtime = 0;
        this.air_time = Math.max(0, this.air_time - 5.12 / this.air_height);
        if (this.air_time <= 0) {
            switch (this.mode) {
              case 2:
                snd_play('snd_bump');
                this.fuse_time = 10;
                this.x = this.dest_x;
                this.y = this.dest_y;
                break;
              default:
                this.mask_index = - 1;
                this.x = this.dest_x;
                this.y = this.dest_y;
                if (W('obj_fusebomb', function (other) {
                    if (this != other.id) {
                        if (this.air_time <= 0) {
                            if (this.grid_x == other.grid_x) {
                                if (this.grid_y == other.grid_y) {
                                    _bounced = true;
                                    return BREAK;
                                }
                            }
                        }
                    }
                }, this) === EXIT) return;
                if (this.grid_x < 0) {
                    this.grid_x = this.grid_x + 5;
                    this.x = this.x + _lane_distance * 5;
                    this.dest_x = this.dest_x + _lane_distance * 5;
                    _bounced = true;
                } else if (this.grid_x > 3) {
                    this.grid_x = this.grid_x - 5;
                    this.x = this.x - _lane_distance * 5;
                    this.dest_x = this.dest_x - _lane_distance * 5;
                    _bounced = true;
                }
                if (this.grid_y < 0) {
                    this.grid_y = this.grid_y + 5;
                    this.y = this.y + _lane_distance * 5;
                    this.dest_y = this.dest_y + _lane_distance * 5;
                    _bounced = true;
                } else if (this.grid_y > 3) {
                    this.grid_y = this.grid_y - 5;
                    this.y = this.y - _lane_distance * 5;
                    this.dest_y = this.dest_y - _lane_distance * 5;
                    _bounced = true;
                }
                if (T(_bounced)) {
                    snd_play('snd_bump', 0.8, 1.02);
                } else {
                    snd_play('snd_bump');
                }
                break;
            }
        }
    }
    if (this.frames_since_airtime == 5) {
        snd_play('snd_bump', 0.8, 0.98);
        this.active = 1;
        if (global.flag[1914] == 2) {
            this.quickburn_time = 2;
        }
    }
    this.fuse_frame = this.fuse_frame + 1;
    if (this.fuse_frame >= 4) {
        this.fuse_frame = this.fuse_frame - 4;
    }
    this.pulse_time = this.pulse_time + 1;
    switch (this.fuse_time) {
      case 8:
        this.image_yscale = 2.25;
        this.image_xscale = this.image_yscale * 0.9;
        break;
      case 7:
        this.image_yscale = 3;
        this.image_xscale = this.image_yscale * 0.8;
        break;
      case 6:
        this.image_yscale = 3.25;
        this.image_xscale = this.image_yscale * 0.9;
        break;
      case 5:
        this.image_yscale = 3.5;
        this.image_xscale = this.image_yscale;
        break;
      case 4:
        this.image_yscale = 3.75;
        this.image_xscale = this.image_yscale;
        break;
      case 3:
        this.image_yscale = 3.9;
        this.image_xscale = this.image_yscale * 1.05;
        break;
      case 2:
      case 1:
      case 0:
        this.image_yscale = 4;
        this.image_xscale = this.image_yscale * 1.1;
        break;
      default:
        if (this.grow <= 1) {
            if (this.pulse_time >= 15 || this.pulse_time >= 6 && this.fuse_time <= 36) {
                this.pulse_time = 0;
                this.image_xscale = 2.75;
                this.image_yscale = 2.75;
            }
            this.image_xscale = Math.max(2, 2 + (this.image_xscale - 2) * 0.8 - 0.01);
            this.image_yscale = Math.max(2, 2 + (this.image_yscale - 2) * 0.8 - 0.01);
            break;
        }
        if (this.pulse_time >= 15) {
            this.pulse_time = 0;
        }
        this.image_xscale = Math.max(2, 2 + (this.image_xscale - 2) * 0.8 - 0.01);
        this.image_yscale = Math.max(2, 2 + (this.image_yscale - 2) * 0.8 - 0.01);
    }
    this.fuse_time = this.fuse_time - 1;
    if (this.air_time <= 0) {
        if (this.quickburn_time > 0.01) {
            this.quickburn_time = this.quickburn_time - 0.3333333333333333;
            if (frac(this.quickburn_time) < 0.01 || frac(this.quickburn_time) > 0.99) {
                this.fuse_time = this.fuse_time - 1;
            }
        } else {
            this.quickburn_time = - 1;
        }
        if (place_meeting(this, this.x, this.y, 'obj_heart')) {
            if (this.mode == 1) {
                if (this.frames_since_airtime >= 5) {
                    this.fuse_time = Math.min(this.fuse_time, 1);
                }
            } else {
                snd_play('snd_pombark');
                _bounced = true;
                if (this.frames_since_airtime > 1) {
                    if (W('obj_purplecontrols', function (other) {
                        _bounced_forcedir = this.grid_direction;
                    }, this) === EXIT) return;
                }
            }
        } else if (this.frames_since_airtime >= 10 && place_meeting(this, this.x, this.y, 'obj_pinkbombexplosion')) {
            if (T(this.inside_the_grid)) {
                this.fuse_time = Math.min(this.fuse_time, 3);
            }
        }
    } else {
        this.fuse_time = Math.max(this.fuse_time, 1);
        if (this.warn_time >= this.fuse_time) {
            this.warn_time = this.fuse_time;
        }
    }
    _fuselength_scale = 1;
    if (this.mode == 1) {
        _fuselength_scale = 2;
    }
    this.image_index = clamp(this.fuse_time * _fuselength_scale / 20, 0, 4);
    this.image_speed = 0;
    if (T(_bounced)) {
        if (_bounced_forcedir != - 1) {
            this.bounce_dir = _bounced_forcedir;
        } else if (this.bounce_dir == - 1) {
            this.bounce_dir = 180;
        }
        this.grid_x = this.grid_x + Math.floor(0.5 + lengthdir_x(1, this.bounce_dir));
        this.grid_y = this.grid_y + Math.floor(0.5 + lengthdir_y(1, this.bounce_dir));
        this.dest_x = this.dest_x + lengthdir_x(_lane_distance, this.bounce_dir);
        this.dest_y = this.dest_y + lengthdir_y(_lane_distance, this.bounce_dir);
        this.air_height = 24;
        this.air_time = 1;
        this.alarm ??= []; this.alarm[0] = 1;
    }
    if (this.fuse_time <= 0) {
        snd_play('snd_explosion_mmx');
        scr_shakescreen(this);
        if (this.grow > 1) {
            if (W('obj_shake', function (other) {
                this.shakex = 13;
                this.shakey = 13;
            }, this) === EXIT) return;
        }
        _boom = instance_create_depth(this.x, this.y, - 10, 'obj_pinkbombexplosion');
        _boom.image_xscale = _boom.image_xscale * this.grow;
        _boom.image_yscale = _boom.image_yscale * this.grow;
        _dir = 0;
        for (let _r1678 = 0, _n1678 = (4); _r1678 < _n1678; _r1678++) {
            _xx = this.x;
            _yy = this.y;
            do {
                _xx = _xx + lengthdir_x(24, _dir);
                _yy = _yy + lengthdir_y(24, _dir);
                if (W(instance_place(this, _xx, _yy, 'obj_dokiheart'), function (other) {
                    if (this.speed == 0) {
                        if (this.lifetime >= 24) {
                            instance_destroy(this);
                        }
                    }
                }, this) === EXIT) return;
                _boom = instance_create_depth(_xx, _yy, - 10, 'obj_pinkbombexplosion');
                _boom.sprite_index = 'spr_fusebomb_explosion_2';
                if (!T(this.inside_the_grid) && (_dir == 0 || _dir == 180)) {
                    _boom.mask_index = 'spr_fusebomb_explosion_2_oldmask';
                }
                _boom.image_angle = _dir + 270;
                _boom.image_xscale = _boom.image_xscale * this.grow;
                _boom.image_yscale = _boom.image_yscale * this.grow;
            } while ((!(_xx < S.camera_get_view_x(0) || _xx > S.camera_get_view_x(0) + 640 || _yy < S.camera_get_view_y(0) || _yy > S.camera_get_view_y(0) + 480)) && LOOP('Fusebomb#6'));

            _dir = _dir + 90;
        }
        if (this.grow > 1) {
            if (W('obj_pink_battlemovement', function (other) {
                this.phase = 99;
                this.sprite_index = 'spr_pink_front_burnt';
                this.image_index = 0;
                this.image_speed = 0;
                this.y = this.y - 24;
            }, this) === EXIT) return;
        }
        if (W(instance_place(this, this.x, this.y, 'obj_dokiheart'), function (other) {
            instance_destroy(this);
        }, this) === EXIT) return;
        if (T(this.has_heart) && this.x > scr_get_box(2) && this.x < scr_get_box(0) && this.y > scr_get_box(1) && this.y < scr_get_box(3)) {
            _boom = instance_create_depth(this.x, this.y, this.depth + 1, 'obj_dokiheart');
            _boom.tension_value = 3;
            _boom.maxlifetime = 150;
        }
        instance_destroy(this);
    }
  }
}
defineObject('obj_fusebomb', Fusebomb);

// !!! gml_Object_obj_fusebomb_big_Step_0.gml has a decompiler WARNING: check the asm
// obj_fusebomb_big (default sprite spr_fusebomb_big, depth 0, parent obj_regularbullet)
class FusebombBig extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_fusebomb_big';
    this.mask_index = 'spr_fusebomb_shadow';
  }
  alarm0() {
    this.mask_index = 'spr_fusebomb_shadow';
  }
  create() {
    super.create?.();
    this.target = 4;
    this.damage = 100;
    if (i_ex('obj_pink_enemy')) {
        this.damage = O('obj_pink_enemy').damage;
    }
    this.grazepoints = 2;
    this.active = 0;
    this.destroyonhit = 0;
    this.scale_multiplier = 1;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.made = 0;
    this.mode = 0;
    this.has_heart = false;
    this.friendlyfire = false;
    this.fuse_time = 60;
    this.warn_time = 30;
    this.air_time = 1;
    this.air_height = 120;
    this.frames_since_airtime = 0;
    this.grid_x = 0;
    this.grid_y = 0;
    this.dest_x = this.x;
    this.dest_y = this.y;
    this.bounce_dir = - 1;
    this.x = S.camera_get_view_x(0) + 480;
    this.y = S.camera_get_view_y(0) + 160;
    this.grow = 1;
    this.fuse_frame = 0;
    this.pulse_time = 0;
    this.inside_the_grid = true;
    this.flashbang = 0;
    this.bling = 0;
    this.bling_dir = 0;
    this.bling_dist = 96;
    this.bling_frame = 0;
  }
  draw() {
    let _warn, _thick, _fusecolor, _flash_time, _color, _bx, _by, _sx, _sy, _radius, _fuselength_scale, _burnsprite, _fscale, _fsbase, _osprite;
    if (this.fuse_time < this.warn_time) {
        if (this.fuse_time >= this.warn_time - 7 && this.fuse_time < this.warn_time - 5) {
            draw_set_color(0xffff00);
        } else {
            draw_set_color(0xff0000);
        }
        draw_set_alpha(0.3 + (1 - this.fuse_time / this.warn_time) * 0.125);
        if (this.fuse_time >= this.warn_time - 5) {
            _warn = (this.warn_time - this.fuse_time) * 128;
            _thick = 54 * this.scale_multiplier + 2 - this.fuse_time % 2 * 4;
            S.d_ellipse(this.x - _warn, this.y - _thick, this.x + _warn, this.y + _thick, 0);
            S.d_ellipse(this.x - _thick, this.y - _warn, this.x + _thick, this.y + _warn, 0);
        } else {
            _thick = 54 * this.scale_multiplier - this.fuse_time % 2 * 4;
            S.d_rectangle(S.camera_get_view_x(0), this.y - _thick, S.camera_get_view_x(0) + 640, this.y + _thick, 0);
            S.d_rectangle(this.x - _thick, S.camera_get_view_y(0), this.x + _thick, S.camera_get_view_y(0) + 480, 0);
        }
        draw_set_alpha(1);
    }
    _fusecolor = merge_color(0xff0000, 0xffffff, clamp((this.fuse_time - 2) / 30, 0, 1));
    _flash_time = 5;
    if (this.fuse_time >= _flash_time + 22 && this.fuse_time < _flash_time + 22 + 2 || this.fuse_time >= _flash_time + 4 && this.fuse_time < _flash_time + 20 && (this.fuse_time - 4 - _flash_time) % 4 < 2 || this.fuse_time >= _flash_time && this.fuse_time < _flash_time + 4 && (this.fuse_time - _flash_time) % 2 < 1) {
        _color = 0xff4488;
    } else if (this.fuse_time < _flash_time) {
        _color = 0xffffff;
    } else {
        _color = 0xffffff;
    }
    if (T(this.has_heart)) {
        if (_color == 255) {
            _color = 0x880000;
        } else {
            _color = 0xff6699;
        }
    }
    if (this.air_time > 0) {
        _bx = lerp(this.dest_x, this.x, this.air_time);
        _by = lerp(this.dest_y, this.y, this.air_time) + lengthdir_y(this.air_height, (1 - this.air_time) * 180);
        _sx = this.dest_x;
        _sy = this.dest_y;
        if (T(this.inside_the_grid)) {
            if (global.turntimer % 5 < 2) {
                draw_set_color(0xffbb00);
            } else {
                draw_set_color(0x880000);
            }
            _radius = (1 - this.air_time * this.air_time * this.air_time * this.air_time) * 48;
            S.d_circle(_sx, _sy, _radius, true);
            S.d_circle(_sx, _sy, _radius - 0.5, true);
            S.d_circle(_sx, _sy, _radius - 1, true);
            S.d_circle(_sx, _sy, _radius - 1.5, true);
            S.d_circle(_sx, _sy, _radius - 2, true);
            _radius = ((1 - this.air_time) / 2 + (1 - this.air_time) * (1 - this.air_time) / 2) * 48;
            S.d_circle(_sx, _sy, _radius, false);
        }
    } else {
        _bx = this.x;
        _by = this.y;
        if (this.mode != 1) {
            switch (this.frames_since_airtime) {
              case 1:
                _by = _by - 3;
                break;
              case 2:
                _by = _by - 5;
                break;
              case 3:
                _by = _by - 6;
                break;
              case 4:
                _by = _by - 7;
                break;
              case 5:
                _by = _by - 7;
                break;
              case 6:
                _by = _by - 7;
                break;
              case 7:
                _by = _by - 6;
                break;
              case 8:
                _by = _by - 5;
                break;
              case 9:
                _by = _by - 3;
                break;
            }
        }
    }
    _fuselength_scale = 0.5;
    if (global.flag[1914] == 2) {
        _burnsprite = 'spr_fusebomb_burning_fast';
    } else {
        _burnsprite = 'spr_fusebomb_burning';
    }
    draw_sprite_ext(_burnsprite, Math.floor(this.fuse_frame), _bx - 37 * this.scale_multiplier + (- 3 - this.fuse_time * _fuselength_scale / 9) * this.image_xscale * this.grow, _by - 49 * this.scale_multiplier + (- 3 - this.fuse_time * _fuselength_scale / 9) * this.image_yscale * this.grow, this.image_xscale * this.grow, this.image_yscale * this.grow, this.image_angle, _fusecolor, this.image_alpha);
    draw_sprite_ext(this.sprite_index, this.image_index, _bx, _by, this.image_xscale * this.grow, this.image_yscale * this.grow, this.image_angle, _color, this.image_alpha);
    if (this.flashbang > 0) {
        _fscale = (1 - this.flashbang) * 2.5;
        _fsbase = 0.16666666666666666;
        draw_sprite_ext(this.sprite_index, this.image_index, _bx, _by, this.image_xscale * this.grow * (_fsbase + _fscale * 2.6666666666666665), this.image_yscale * this.grow * (_fsbase + _fscale * 2.6666666666666665), this.image_angle, 0x000000, this.flashbang);
        draw_sprite_ext(this.sprite_index, this.image_index, _bx, _by, this.image_xscale * this.grow * (_fsbase + _fscale), this.image_yscale * this.grow * (_fsbase + _fscale), this.image_angle, 0xffffff, this.flashbang);
        draw_sprite_ext(this.sprite_index, this.image_index, _bx, _by, this.image_xscale * this.grow * (_fsbase + _fscale * 2), this.image_yscale * this.grow * (_fsbase + _fscale * 2), this.image_angle, 0xffffff, this.flashbang);
    } else if (this.scale_multiplier > 1) {
        _fscale = - this.flashbang * 0.125;
        _fsbase = 1;
        draw_sprite_ext(this.sprite_index, this.image_index, _bx, _by, this.image_xscale * this.grow * (_fsbase + _fscale), this.image_yscale * this.grow * (_fsbase + _fscale), this.image_angle, 0xffffff, 1 + this.flashbang);
    }
    if (this.active == 1) {
        if (W('obj_purplecontrols', function (other) {
            if (T(this.squished)) {
                if (W('obj_heart', function (other) {
                    _osprite = this.sprite_index;
                    this.x = this.x + (9 + other.heartshake_x);
                    this.y = this.y + (9 + other.heartshake_y);
                    this.sprite_index = 'spr_heartoutline';
                    scr_draw_outline(this, 1, 0, 1);
                    this.sprite_index = _osprite;
                    this.x = this.x - (9 + other.heartshake_x);
                    this.y = this.y - (9 + other.heartshake_y);
                }, this) === EXIT) return EXIT;
            }
        }, this) === EXIT) return;
    }
  }
  user5() {
    if (this.active == 1) {
    }
  }
  step() {
    let _bounced, _bounced_forcedir, _lane_distance, _slipdir, _scaling, _boom, _dir, _xx, _yy, _randomlist, _randomcycle, i;
    _bounced = false;
    _bounced_forcedir = - 1;
    _lane_distance = 40;
    if (this.made == 0) {
        if (this.mode == 0) {
            if (global.flag[1914] == 1) {
                this.fuse_time = this.fuse_time + 4;
                this.warn_time = this.warn_time + 4;
            }
        }
        this.made = 1;
    }
    if (this.air_time <= 0) {
        this.frames_since_airtime = this.frames_since_airtime + 1;
        if (this.mode == 1) {
            if (W('obj_pink_battlemovement', function (other) {
                other.x = this.x - 4;
                other.y = this.y - 4 - 132 * ((1 + other.scale_multiplier) / 2);
            }, this) === EXIT) return;
        }
    } else {
        this.frames_since_airtime = 0;
        this.air_time = Math.max(0, this.air_time - 4.48 / this.air_height);
        if (this.air_time <= 0) {
            this.mask_index = - 1;
            this.x = this.dest_x;
            this.y = this.dest_y;
            if (T(_bounced)) {
                snd_play('snd_bump', 0.8, 1.02);
                scr_shakescreen(this);
            } else {
                snd_play('snd_bump');
                scr_shakescreen(this);
            }
            if (W('obj_dokiheart', function (other) {
                if (this.x > other.x - 48 && this.x < other.x + 48 && this.y > other.y - 48 && this.y < other.y + 48 && point_distance(other.x, other.y, this.x, this.y) > 10) {
                    _slipdir = point_direction(other.x, other.y, this.x, this.y);
                    _slipdir = Math.floor(0.5 + _slipdir / 45) * 45;
                    if (instance_exists('obj_growtangle')) {
                        if (_slipdir == 45) {
                            if (this.x + _lane_distance > scr_get_box(0)) {
                                _slipdir = 90;
                            }
                            if (this.y - _lane_distance < scr_get_box(1)) {
                                _slipdir = 0;
                            }
                        }
                        if (_slipdir == 135) {
                            if (this.x - _lane_distance < scr_get_box(2)) {
                                _slipdir = 90;
                            }
                            if (this.y - _lane_distance < scr_get_box(1)) {
                                _slipdir = 180;
                            }
                        }
                        if (_slipdir == 225) {
                            if (this.x - _lane_distance < scr_get_box(2)) {
                                _slipdir = 270;
                            }
                            if (this.y + _lane_distance > scr_get_box(3)) {
                                _slipdir = 180;
                            }
                        }
                        if (_slipdir == 315) {
                            if (this.x + _lane_distance > scr_get_box(0)) {
                                _slipdir = 270;
                            }
                            if (this.y + _lane_distance > scr_get_box(3)) {
                                _slipdir = 0;
                            }
                        }
                    }
                    if (_slipdir == 0 || _slipdir == 90 || _slipdir == 180 || _slipdir == 270) {
                        this.direction = _slipdir;
                        this.speed = 4.1;
                        this.friction = 0.2;
                    } else {
                        this.direction = _slipdir;
                        this.speed = 6;
                        this.friction = 0.3;
                    }
                    if (this.x + lengthdir_x(this.speed * 10, this.direction) < scr_get_box(2) || this.x + lengthdir_x(this.speed * 10, this.direction) > scr_get_box(0) || this.y + lengthdir_y(this.speed * 10, this.direction) < scr_get_box(1) || this.y + lengthdir_y(this.speed * 10, this.direction) > scr_get_box(3)) {
                        this.speed = 0;
                    }
                }
            }, this) === EXIT) return;
        }
    }
    if (this.mode != 1) {
        if (this.frames_since_airtime == 10) {
            snd_play('snd_bump', 0.8, 0.98);
            scr_shakescreen(this, 2);
        }
    }
    this.fuse_frame = this.fuse_frame + 1;
    if (this.fuse_frame >= 4) {
        this.fuse_frame = this.fuse_frame - 4;
    }
    if (this.flashbang > 0) {
        this.flashbang = Math.max(0, this.flashbang - 0.125);
    } else if (this.scale_multiplier > 1) {
        this.flashbang = this.flashbang - 0.25;
        if (this.flashbang <= - 1) {
            this.flashbang = 0;
        }
    }
    if (this.bling > 0) {
        this.bling_frame = this.bling_frame + 1;
        if (this.bling >= 6 && this.bling_frame >= 1 || this.bling_frame >= 6) {
            this.bling_frame = 0;
            this.bling_dir = this.bling_dir + (0.25 + random(0.75));
            if (this.bling_dir >= 1) {
                this.bling_dir = this.bling_dir - 1;
            }
            this.bling_dist = this.bling_dist + 4;
            instance_create_depth(this.x + lengthdir_x(this.bling_dist, 150 + 240 * this.bling_dir), this.y + lengthdir_y(this.bling_dist, 150 + 240 * this.bling_dir), this.depth - 1, 'obj_fx_pinkchargestar');
            this.bling = this.bling - 1;
        }
    }
    this.image_xscale = (2 + 0.5 / Math.max(1, this.fuse_time * 0.3333333333333333)) * this.scale_multiplier;
    this.image_yscale = this.image_xscale;
    this.fuse_time = this.fuse_time - 1;
    if (this.air_time <= 0) {
        if (this.frames_since_airtime >= 15 && place_meeting(this, this.x, this.y, 'obj_pinkbombexplosion')) {
            if (T(this.inside_the_grid)) {
                this.fuse_time = Math.min(this.fuse_time, 3);
            }
        }
    } else {
        this.fuse_time = Math.max(this.fuse_time, 1);
    }
    if (T(_bounced)) {
        if (_bounced_forcedir != - 1) {
            this.bounce_dir = _bounced_forcedir;
        } else if (this.bounce_dir == - 1) {
            this.bounce_dir = 180;
        }
        this.grid_x = this.grid_x + Math.floor(0.5 + lengthdir_x(1, this.bounce_dir));
        this.grid_y = this.grid_y + Math.floor(0.5 + lengthdir_y(1, this.bounce_dir));
        this.dest_x = this.dest_x + lengthdir_x(_lane_distance, this.bounce_dir);
        this.dest_y = this.dest_y + lengthdir_y(_lane_distance, this.bounce_dir);
        this.air_height = 24;
        this.air_time = 1;
        this.alarm ??= []; this.alarm[0] = 1;
    }
    if (this.fuse_time <= 0) {
        _scaling = 8 * this.scale_multiplier;
        snd_play('snd_explosion_mmx', 0.975, 1);
        snd_play('snd_explosion_mmx', 0.9, 0.3333333333333333);
        scr_shakescreen(this, 13);
        _boom = instance_create_depth(this.x, this.y, - 10, 'obj_pinkbombexplosion');
        _boom.image_xscale = _boom.image_xscale * _scaling;
        _boom.image_yscale = _boom.image_yscale * _scaling;
        _boom.friendlyfire = this.friendlyfire;
        _dir = 0;
        for (let _r1058 = 0, _n1058 = (4); _r1058 < _n1058; _r1058++) {
            _xx = this.x;
            _yy = this.y;
            do {
                _xx = _xx + lengthdir_x(48, _dir);
                _yy = _yy + lengthdir_y(48, _dir);
                if (W('obj_dokiheart', function (other) {
                    if (this.x > _xx - 48 && this.x < _xx + 48 && this.y > _yy - 48 && this.y < _yy + 48 && this.speed == 0 && this.lifetime >= 24) {
                        instance_destroy(this);
                    }
                }, this) === EXIT) return;
                _boom = instance_create_depth(_xx, _yy, - 10, 'obj_pinkbombexplosion');
                _boom.sprite_index = 'spr_fusebomb_explosion_2';
                _boom.mask_index = 'spr_fusebomb_explosion_2_oldmask';
                _boom.image_angle = _dir + 270;
                _boom.image_xscale = _boom.image_xscale * _scaling;
                _boom.image_yscale = _boom.image_yscale * _scaling;
                _boom.friendlyfire = this.friendlyfire;
            } while ((!(_xx < S.camera_get_view_x(0) || _xx > S.camera_get_view_x(0) + 640 || _yy < S.camera_get_view_y(0) || _yy > S.camera_get_view_y(0) + 480)) && LOOP('FusebombBig#7'));

            _dir = _dir + 90;
        }
        if (W(collision_point(this.x, this.y, 'obj_dokiheart', 1, 1), function (other) {
            if (this.lifetime >= 30) {
                instance_destroy(this);
            }
        }, this) === EXIT) return;
        if (instance_exists('obj_growtangle')) {
            if (T(this.has_heart)) {
                _randomlist = S.ds_list_create();
                _randomcycle = irandom(3);
                for (let _r1317 = 0, _n1317 = (2); _r1317 < _n1317; _r1317++) {
                    switch (_randomcycle) {
                      case 0:
                        S.ds_list_add(_randomlist, 2);
                        break;
                      case 1:
                        S.ds_list_add(_randomlist, 1);
                        break;
                      case 2:
                        S.ds_list_add(_randomlist, 0);
                        break;
                      default:
                        S.ds_list_add(_randomlist, 1);
                        break;
                    }
                    _randomcycle = _randomcycle + 1;
                    if (_randomcycle > 3) {
                        _randomcycle = 0;
                    }
                }
                _randomcycle = irandom(S.ds_list_size(_randomlist) - 1);
                if (this.x <= scr_get_box(2) || this.x >= scr_get_box(0) || this.y <= scr_get_box(1) || this.y >= scr_get_box(3)) {
                    _dir = point_direction(scr_get_box(4), scr_get_box(5), this.x, this.y);
                    if (_dir > 45 && _dir < 135 || _dir > 225 && _dir < 315) {
                        if (this.grid_x < 1 || this.grid_x > 2) {
                            this.grid_x = clamp(this.grid_x, 0, 3);
                            _randomcycle = irandom(1);
                        }
                    } else if (this.grid_y < 1 || this.grid_y > 2) {
                        this.grid_y = clamp(this.grid_y, 0, 3);
                        _randomcycle = irandom(1);
                    }
                }
                _dir = 0;
                for (let _r1542 = 0, _n1542 = (4); _r1542 < _n1542; _r1542++) {
                    _xx = scr_get_box(4) - _lane_distance * 1.5 + this.grid_x * _lane_distance;
                    _yy = scr_get_box(5) - _lane_distance * 1.5 + this.grid_y * _lane_distance;
                    i = 0;
                    do {
                        if (_xx > scr_get_box(2) && _xx < scr_get_box(0) && _yy > scr_get_box(1) && _yy < scr_get_box(3)) {
                            _boom = instance_create_depth(_xx, _yy, this.depth + 1, 'obj_dokiheart');
                            _boom.tension_value = 3;
                            _boom.pulse = i;
                            _boom.maxlifetime = 150;
                            _boom.xdraw = scr_get_box(4) - _lane_distance * 1.5 + this.grid_x * _lane_distance;
                            _boom.ydraw = scr_get_box(5) - _lane_distance * 1.5 + this.grid_y * _lane_distance;
                            if (! ((_dir == 0 || _dir == 180) && this.grid_y >= 1 && this.grid_y <= 2)) {
                            } else {
                            }
                            if (1) {
                                switch (S.ds_list_find_value(_randomlist, _randomcycle)) {
                                  case 0:
                                    _boom.direction = _dir + 90;
                                    _boom.speed = 1;
                                    break;
                                  case 1:
                                    _boom.speed = 0;
                                    break;
                                  default:
                                    _boom.direction = _dir + 270;
                                    _boom.speed = 1;
                                }
                                _boom.speed = _boom.speed * 2.9;
                                _boom.friction = 0.1;
                                _randomcycle = _randomcycle + 1;
                                if (_randomcycle >= S.ds_list_size(_randomlist)) {
                                    _randomcycle = _randomcycle - S.ds_list_size(_randomlist);
                                }
                            } else {
                                if (_dir == 0 && this.grid_y == 0) {
                                    _boom.direction = _dir + 270;
                                }
                                if (_dir == 0 && this.grid_y == 3) {
                                    _boom.direction = _dir + 90;
                                }
                                if (_dir == 180 && this.grid_y == 0) {
                                    _boom.direction = _dir + 90;
                                }
                                if (_dir == 180 && this.grid_y == 3) {
                                    _boom.direction = _dir + 270;
                                }
                                if (_dir == 90 && this.grid_x == 0) {
                                    _boom.direction = _dir + 270;
                                }
                                if (_dir == 90 && this.grid_x == 3) {
                                    _boom.direction = _dir + 90;
                                }
                                if (_dir == 270 && this.grid_x == 0) {
                                    _boom.direction = _dir + 90;
                                }
                                if (_dir == 270 && this.grid_x == 3) {
                                    _boom.direction = _dir + 270;
                                }
                                _boom.speed = _randomcycle * 2.9;
                                _boom.friction = 0.1;
                                _randomcycle = 1 - _randomcycle;
                            }
                            _xx = _xx + lengthdir_x(_lane_distance * 2, _dir);
                            _yy = _yy + lengthdir_y(_lane_distance * 2, _dir);
                        } else {
                            _xx = _xx + lengthdir_x(_lane_distance, _dir);
                            _yy = _yy + lengthdir_y(_lane_distance, _dir);
                        }
                        i = i + 1;
                    } while ((!(_dir == 180 && _xx < scr_get_box(2) || _dir == 0 && _xx > scr_get_box(0) || _dir == 90 && _yy < scr_get_box(1) || _dir == 270 && _yy > scr_get_box(3))) && LOOP('FusebombBig#8'));

                    _dir = _dir + 90;
                }
                S.ds_list_destroy(_randomlist);
            }
        }
        instance_destroy(this);
    }
  }
}
defineObject('obj_fusebomb_big', FusebombBig);

// obj_pinkbombexplosion (default sprite spr_fusebomb_explosion_1, depth 0, parent obj_regularbullet)
class Pinkbombexplosion extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_fusebomb_explosion_1';
  }
  alarm0() {
    let _smoke;
    if (this.image_xscale > 1) {
        _smoke = instance_create_depth(this.x - 24 + random(48), this.y - 24 + random(48), this.depth + 1, 'obj_pinkmeteorfire');
        this.image_xscale = this.image_xscale * (0.5 + random(0.25));
        this.image_yscale = this.image_xscale;
        _smoke.direction = this.image_angle + 90;
        _smoke.speed = 2 + random(4);
    }
  }
  alarm1() {
    this.active = 0;
  }
  alarm2() {
    this.active = 1;
  }
  create() {
    super.create?.();
    this.active = 0;
    this.grazepoints = 2;
    this.target = 4;
    this.damage = 100;
    if (i_ex('obj_pink_enemy')) {
        this.damage = O('obj_pink_enemy').damage;
    }
    this.destroyonhit = 0;
    this.friendlyfire = false;
    this.image_index = this.image_number / 2;
    this.has_drawn = 0;
    this.alarm ??= []; this.alarm[0] = 1 + irandom(Math.floor(this.image_number / 2) - 1);
    this.alarm ??= []; this.alarm[2] = 1;
    this.alarm ??= []; this.alarm[1] = 6;
  }
  draw() {
    if (this.has_drawn == 0) {
        if (W('obj_pinkbombexplosion', function (other) {
            draw_sprite_ext(this.sprite_index, Math.floor(this.image_index) - this.image_number / 2, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
        }, this) === EXIT) return;
        if (W('obj_pinkbombexplosion', function (other) {
            draw_sprite_ext(this.sprite_index, Math.floor(this.image_index), this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
            this.has_drawn = 1;
        }, this) === EXIT) return;
    }
  }
  user5() {
    if (this.active == 1) {
        if (W('obj_pink_enemy', function (other) {
            this.teamdamage = 84;
        }, this) === EXIT) return;
        if (this.image_xscale > 6) {
            if (W('obj_pink_enemy', function (other) {
                this.teamdamage = 120;
            }, this) === EXIT) return;
        }
        if (W('obj_pink_enemy', function (other) {
            this.user2?.();
        }, this) === EXIT) return;
        if (!T(instance_exists('obj_pink_enemy'))) {
            super.user5?.();
        }
    }
  }
  animationEnd() {
    instance_destroy(this);
  }
  beginStep() {
    super.beginStep?.();
    this.has_drawn = 0;
  }
}
defineObject('obj_pinkbombexplosion', Pinkbombexplosion);

// obj_pinkchargeball (default sprite spr_pinkchargestar, depth 0)
class Pinkchargeball extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_pinkchargestar';
  }
  create() {
    this.direction = random(360);
    this.life_time = 0;
    this.life_time_max = 24;
    this.distance = 320;
    this.spin = 1;
  }
  draw() {
    let _life, _dist;
    _life = this.life_time / Math.max(1, this.life_time_max);
    _dist = lengthdir_x(this.distance, 330 + 120 * _life);
    draw_sprite_ext(this.sprite_index, this.image_index, this.x + lengthdir_x(_dist, this.direction), this.y + lengthdir_y(_dist, this.direction), 2, 2, 0, 0xffffff, _life);
  }
  step() {
    this.direction = this.direction + this.spin * 3 * (3.14 * (this.life_time / Math.max(1, this.life_time_max)));
    this.life_time = this.life_time + 1;
    if (this.life_time >= this.life_time_max) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_pinkchargeball', Pinkchargeball);

// obj_pinkcirclestar (default sprite spr_pinkstar, depth 0, parent obj_regularbullet)
class Pinkcirclestar extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_pinkstar';
  }
  create() {
    let i;
    super.create?.();
    this.target = 4;
    this.damage = 100;
    this.element = 6;
    this.grazepoints = 2;
    this.image_speed = 0;
    this.image_index = 0;
    this.angle ??= []; this.angle[1] = 0;
    this.angle ??= []; this.angle[0] = 0;
    this.angle_speed ??= []; this.angle_speed[1] = 4;
    this.angle_speed ??= []; this.angle_speed[0] = 6;
    i = 3;
    for (let _r64 = 0, _n64 = (3); _r64 < _n64; _r64++) {
        i = i - 1;
        this.trail_x ??= []; this.trail_x[i] = this.x;
        this.trail_y ??= []; this.trail_y[i] = this.y;
    }
    this.life_time = 0;
    this.image_alpha = 0;
    this.tunnel_lane_layer = 0;
    this.direction = random(360);
    this.pattern_speed = choose(- 1, 1) * (2 + random(4));
    this.speed = 2;
  }
  draw() {
    let i;
    i = 0;
    for (let _r8 = 0, _n8 = (3); _r8 < _n8; _r8++) {
        draw_sprite_ext(this.sprite_index, 0, this.trail_x[i], this.trail_y[i], this.image_xscale * (1 - i * 0.15), this.image_yscale * (1 - i * 0.15), this.angle[0], this.image_blend, this.image_alpha * (0.5 - i * 0.1));
        i = i + 1;
    }
    draw_sprite_ext(this.sprite_index, 2, this.x, this.y, this.image_xscale, this.image_yscale, this.angle[1], this.image_blend, this.image_alpha * 0.3333333333333333);
    draw_sprite_ext(this.sprite_index, 1, this.x, this.y, this.image_xscale, this.image_yscale, this.angle[0], this.image_blend, this.image_alpha * 0.6666666666666666);
    draw_sprite_ext(this.sprite_index, 0, this.x, this.y, this.image_xscale, this.image_yscale, this.angle[0], this.image_blend, this.image_alpha);
  }
  step() {
    let i;
    super.step?.();
    this.life_time = this.life_time + 1;
    i = 0;
    for (let _r18 = 0, _n18 = (2); _r18 < _n18; _r18++) {
        this.angle ??= []; this.angle[i] = S.scr_wrap(this.angle[i] + this.angle_speed[i], 0, 360);
        i = i + 1;
    }
    if (this.life_time < 30) {
        this.image_alpha = clamp(this.image_alpha + 0.2, 0, 1);
    } else if (this.life_time >= 300) {
        this.image_alpha = this.image_alpha - 0.075;
        if (this.image_alpha <= 0.001) {
            instance_destroy(this);
        }
    }
  }
}
defineObject('obj_pinkcirclestar', Pinkcirclestar);

// obj_pinkwave (default sprite spr_pinkwave, depth 0, parent obj_regularbullet)
class Pinkwave extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_pinkwave';
  }
  create() {
    super.create?.();
    this.target = 4;
    this.damage = 100;
    if (i_ex('obj_pink_enemy')) {
        this.damage = O('obj_pink_enemy').damage;
    }
    this.element = 6;
    this.grazepoints = 2;
    this.active = 1;
    this.life_time = 0;
    this.image_xscale = 1;
    this.image_yscale = 1;
  }
  draw() {
    draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
  }
  step() {
    super.step?.();
    this.speed = scr_approach(this.speed, 2, 0.5);
    this.image_xscale = scr_approach(this.image_xscale, 3, 0.018);
    this.image_yscale = this.image_xscale;
    this.life_time = this.life_time + 1;
    if (this.life_time >= 150 || scr_get_box(3) < this.y) {
        this.image_alpha = this.image_alpha - 0.1;
        if (this.image_alpha <= 0) {
            instance_destroy(this);
        }
    }
  }
  endStep() {
    this.image_angle = this.direction + 90;
  }
}
defineObject('obj_pinkwave', Pinkwave);

// obj_pinkspeaker (default sprite spr_pinkspeaker_silhouette, depth 0)
class Pinkspeaker extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_pinkspeaker_silhouette';
  }
  create() {
    this.anim_spd = 0.2;
    this.image_speed = this.anim_spd;
    this.image_xscale = 2;
    this.image_yscale = this.image_xscale;
    this.visi = false;
    this.playing = false;
    this.silhouette = true;
    this.sweat = false;
    this.tailwag = false;
    this.crying = false;
    this.sweat_index = 0;
    this.tail_index = 0;
    this.cry_index = 0;
    this.swas = - 1;
    this.sprites = [[2479, 0, false, false, - 1, false], [5231, 0, true, false, - 1, false], [6564, 0, true, false, - 1, false], [2038, 0, false, false, - 1, false], [6755, 1, false, false, - 1, false], [677, 1, false, false, - 1, false], [200, 16, true, false, - 1, false], [5441, 0, false, false, - 1, false], [7368, 0, true, false, - 1, false], [5199, 0, false, true, - 1, false], [7017, 0, false, false, 494, false], [5441, 0, false, false, - 1, true], [789, 1, false, false, 2570, false], [7450, 1, false, false, 5256, false], [8343, 0, false, true, - 1, false], [3661, 0, false, true, - 1, false], [5549, 0, false, false, - 1, false], [1019, 0, false, false, - 1, false]];
  }
  draw() {
    let _flag, _wave, _xadj;
    _flag = global.fe;
    _flag = Math.min(_flag, array_length(this.sprites) - 1);
    this.sprite_index = this.sprites[_flag][0];
    if (this.sprite_index != this.swas) {
        S.show_debug_message_concat("sprite changed!");
    }
    this.swas = this.sprite_index;
    if (T(this.silhouette) || instance_exists('obj_writer') && global.typer == 97 && global.fe != 0) {
        if (T(this.silhouette) || T(this.visi) || O('obj_writer').formatted != 0) {
            if (!T(this.visi)) {
                S.show_debug_message_concat("became visible!");
            }
            this.visi = true;
            if (this.sprites[_flag][3] == 0 && (this.silhouette || O('obj_writer').halt > 0)) {
                if (this.sprites[_flag][4] != - 1) {
                    this.sprite_index = this.sprites[_flag][4];
                    this.playing = true;
                    this.image_speed = this.anim_spd;
                } else {
                    this.playing = false;
                    this.image_index = this.sprites[_flag][1];
                    this.image_speed = 0;
                }
            } else {
                if (this.playing == 0) {
                    this.image_index = this.sprites[_flag][1];
                }
                this.playing = true;
                this.image_speed = this.anim_spd;
            }
        }
    } else {
        this.playing = false;
        this.visi = false;
    }
    if (T(this.sweat) && T(this.visi)) {
        if (T(this.playing)) {
            this.sweat_index = Math.min(this.sweat_index + this.anim_spd, 2);
        } else {
            this.sweat_index = 2;
        }
    } else {
        this.sweat_index = - 2;
    }
    this.tailwag = this.sprites[_flag][2];
    if (T(this.tailwag)) {
        this.tail_index = S.scr_wrap(this.tail_index + this.anim_spd, 0, 11);
    }
    this.crying = this.sprites[_flag][5];
    if (T(this.crying)) {
        this.cry_index = S.scr_wrap(this.cry_index + this.anim_spd, 0, 2);
    }
    _wave = 0;
    _xadj = 0;
    this.image_xscale = 2;
    if (this.sprite_index == 'spr_pinkspeaker_cry' || this.sprite_index == 'spr_pinkspeaker_overjoyed') {
        _wave = S.scr_wave(0, 10, 0.4, 0);
        this.image_xscale = S.scr_wave(0, 2, 1.5, 0) > 1 ? - 2 : 2;
        _xadj = this.image_xscale < 0 ? Math.abs(this.sprite_width) : 0;
    }
    if (T(this.visi) && !T(i_ex('obj_battlecontroller'))) {
        if (T(this.tailwag)) {
            draw_sprite_ext('spr_pinkspeaker_tail', this.tail_index, this.x + 2, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
        }
        draw_sprite_ext(this.sprite_index, this.image_index, this.x + _xadj, this.y + _wave, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
        if (T(this.sweat) && this.sweat_index >= 0) {
            draw_sprite_ext('spr_pinkspeaker_sweatdrop', this.sweat_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
        }
        if (T(this.crying)) {
            draw_sprite_ext('spr_pinkspeaker_tears', this.cry_index, this.x - 2, this.y + 40, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
        }
    }
  }
  drawEnd() {
    return;
  }
  step() {
    return;
  }
  endStep() {
    return;
  }
}
defineObject('obj_pinkspeaker', Pinkspeaker);

// obj_roundbellbullet (default sprite spr_bullet_roundbell, depth 0, parent obj_regularbullet)
class Roundbellbullet extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_bullet_roundbell';
  }
  create() {
    super.create?.();
    this.target = 4;
    this.damage = 100;
    if (i_ex('obj_pink_enemy')) {
        this.damage = O('obj_pink_enemy').damage;
    }
    this.element = 6;
    this.grazepoints = 2;
    this.life_time = - 15;
    this.image_alpha = 0;
    this.phase = 0;
    this.shake_dir = 0;
    this.destroyonhit = 0;
  }
  draw() {
    if (this.phase == 2) {
        draw_sprite_ext(this.sprite_index, this.image_index, this.x - this.hspeed * 3, this.y - this.hspeed * 3, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, 0.25);
        draw_sprite_ext(this.sprite_index, this.image_index, this.x - this.hspeed * 1.5, this.y - this.vspeed * 1.5, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, 0.5);
    }
    if (this.phase == 1) {
        draw_sprite_ext(this.sprite_index, this.image_index, this.x + lengthdir_x(3, this.shake_dir), this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
    } else {
        draw_self(this);
    }
  }
  step() {
    let _shakelimit, _dir, _s;
    super.step?.();
    this.life_time = this.life_time + 1;
    if (this.life_time < 30) {
        this.image_alpha = Math.min(this.image_alpha + 0.05 * Math.max(1, this.speed), 1);
    }
    if (place_meeting(this, this.x, this.y, 'obj_heart')) {
        this.phase = 2;
        this.life_time = 999;
    }
    switch (this.phase) {
      case 0:
        if (this.life_time >= 35) {
            this.life_time = 0;
            this.phase = this.phase + 1;
        }
        break;
      case 1:
        this.shake_dir = this.shake_dir + 90;
        if (this.shake_dir >= 360) {
            this.shake_dir = this.shake_dir - 360;
        }
        _shakelimit = 18;
        if (W('obj_dbulletcontroller', function (other) {
            switch (this.difficulty) {
              case 0:
                break;
              case 1:
                _shakelimit = 16;
                break;
              default:
                _shakelimit = 14;
                break;
            }
        }, this) === EXIT) return;
        if (this.life_time >= _shakelimit) {
            this.life_time = 0;
            this.phase = this.phase + 1;
            if (this.y < scr_get_box(5)) {
                this.gravity_direction = 270;
            } else {
                this.gravity_direction = 90;
            }
            this.gravity = 0.6;
            if (W('obj_dbulletcontroller', function (other) {
                switch (this.difficulty) {
                  case 0:
                    break;
                  case 1:
                    other.gravity = 0.8;
                    break;
                  default:
                    other.gravity = 0.9;
                    break;
                }
            }, this) === EXIT) return;
        }
        break;
      case 2:
        if (this.life_time >= 15 && (this.y < scr_get_box(1) || this.y > scr_get_box(3)) || this.life_time >= 999) {
            this.speed = 0;
            this.gravity = 0;
            _dir = 0;
            for (let _r279 = 0, _n279 = (12); _r279 < _n279; _r279++) {
                _s = instance_create_depth(this.x, this.y, 1, 'obj_fx_pinksparkle');
                _s.direction = _dir;
                _s.speed = 8;
                _dir = _dir + 30;
            }
            if (this.life_time < 999) {
                this.x = this.x + (scr_get_box(4) - this.x) * 2;
                this.life_time = 0;
            } else {
                this.life_time = - 5;
            }
            if (this.y < scr_get_box(5)) {
                this.y = scr_get_box(1) - 8;
                this.image_angle = 0;
            } else {
                this.y = scr_get_box(3) + 8;
                this.image_angle = 180;
            }
            this.phase = 0;
            if (W('obj_dbulletcontroller', function (other) {
                switch (this.difficulty) {
                  case 0:
                    break;
                  case 1:
                    other.life_time = other.life_time + 10;
                    break;
                  default:
                    other.life_time = other.life_time + 20;
                    break;
                }
            }, this) === EXIT) return;
        }
        break;
    }
  }
}
defineObject('obj_roundbellbullet', Roundbellbullet);

// obj_explosion_flamingbit (default sprite spr_dust1, depth 0)
class ExplosionFlamingbit extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_dust1';
    this.visible = false;
  }
  alarm0() {
    let _fire;
    _fire = instance_create_depth(this.x - 2 + irandom(4), this.y - 2 + irandom(4), this.depth, 'obj_slidedust');
    _fire.image_xscale = choose(3, 2);
    _fire.image_yscale = _fire.image_xscale;
    _fire.sprite_index = 'spr_dust1';
    _fire.image_blend = 0xff8800;
    _fire.image_speed = choose(1, 0.5);
    _fire.alarm ??= []; _fire.alarm[5] = _fire.image_number * (1 / _fire.image_speed);
    _fire.vspeed = - 1;
    this.alarm ??= []; this.alarm[0] = 2;
  }
  alarm1() {
    let _fire;
    _fire = instance_create_depth(this.x - 4 + irandom(8), this.y - 4 + irandom(8), this.depth, 'obj_slidedust');
    _fire.image_xscale = choose(4, 3);
    _fire.image_yscale = _fire.image_xscale;
    _fire.sprite_index = 'spr_dust1';
    _fire.image_blend = 0xff8800;
    _fire.image_speed = choose(0.5, 0.334, 0.25, 0.2, 0.167);
    _fire.alarm ??= []; _fire.alarm[5] = _fire.image_number * (1 / _fire.image_speed);
    _fire.vspeed = - 2;
    this.alarm ??= []; this.alarm[1] = 10 + irandom(10);
  }
  create() {
    this.floor_y = this.y + 16 + random(32);
    this.gravity_direction = 270;
    this.gravity = 0.75;
    this.life_time = 30 + irandom(75);
    this.alarm ??= []; this.alarm[0] = 1 + irandom(1);
    this.alarm ??= []; this.alarm[1] = 1 + irandom(9);
  }
  draw() {
    return;
  }
  step() {
    if (this.y >= this.floor_y) {
        this.floor_y = this.floor_y + random(this.vspeed * 3);
        this.vspeed = - this.vspeed * 0.75;
        this.hspeed = this.hspeed * 0.9;
    }
    this.life_time = this.life_time - 1;
    if (this.life_time <= 0) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_explosion_flamingbit', ExplosionFlamingbit);

// obj_audienceheart (default sprite spr_heartbullet, depth 0, parent obj_regularbullet)
class Audienceheart extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_heartbullet';
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
    this.float_dir = 0;
    this.life_time = 0;
    this.grazepoints = 2;
    this.image_xscale = 0.025;
    this.image_yscale = 0.025;
    this.phase = 0;
    this.pattern_time = 0;
    snd_stop('snd_ghostappear');
    snd_play_x('snd_ghostappear', 1, 1.5);
  }
  draw() {
    draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
  }
  step() {
    let _mainscale, _timebeforeturn, _timetolaunch, _dir, _dest, _trail;
    super.step?.();
    _mainscale = 1.5;
    switch (this.phase) {
      case 0:
        this.pattern_time = this.pattern_time + 1;
        _timebeforeturn = 11;
        _timetolaunch = 32;
        if (this.pattern_time < _timebeforeturn + 11) {
            this.image_xscale = _mainscale - lengthdir_x(Math.max(0, _mainscale / 2 - this.life_time * _mainscale / 24), this.life_time * 66 % 360);
            this.image_yscale = this.image_xscale;
        } else if (this.pattern_time >= _timetolaunch - 7) {
            switch (this.pattern_time - (_timetolaunch - 7)) {
              case 0:
                this.image_xscale = _mainscale * 1.2;
                break;
              case 1:
                this.image_xscale = _mainscale * 1.3;
                break;
              case 2:
                this.image_xscale = _mainscale * 1.38;
                break;
              case 3:
                this.image_xscale = _mainscale * 1.42;
                break;
              default:
                this.image_xscale = _mainscale * 1.45;
            }
            this.image_yscale = _mainscale + (_mainscale - this.image_xscale);
        }
        if (this.pattern_time >= _timebeforeturn) {
            this.speed = Math.min(this.speed, 0.25);
            if (instance_exists('obj_heart')) {
                _dir = this.image_angle - 90;
                _dest = point_direction(this.x, this.y, O('obj_heart').x, O('obj_heart').y);
                if (_dir < _dest - 180) {
                    _dir = _dir + 360;
                }
                if (_dir > _dest + 180) {
                    _dir = _dir - 360;
                }
                if (_dir < _dest) {
                    _dir = Math.min(_dir + 2, _dest);
                } else if (_dir > _dest) {
                    _dir = Math.max(_dest, _dir - 2);
                }
                _dir = _dir * 0.8 + _dest * 0.2;
                this.image_angle = _dir + 90;
            }
        }
        if (this.pattern_time == _timetolaunch - 1) {
            _trail = instance_create_depth(this.x, this.y, 0, 'obj_pinktrail');
            _trail.visible = 1;
            _trail.sprite_index = this.sprite_index;
            _trail.image_angle = this.image_angle;
            _trail.image_xscale = _mainscale * 0.875;
            _trail.image_yscale = _mainscale * 1.125;
            _trail.direction = this.image_angle - 90;
            _trail.speed = 5;
        }
        if (this.pattern_time >= _timetolaunch) {
            this.direction = this.image_angle - 90;
            this.pattern_time = 0;
            this.phase = this.phase + 1;
        }
        break;
      case 1:
        this.pattern_time = this.pattern_time + 1;
        if (this.pattern_time == 10) {
            snd_stop('snd_heartshot_dr_b');
            snd_play_x('snd_heartshot_dr_b', 0.5, 0.5);
        }
        this.speed = this.speed + (0.25 + this.pattern_time / 32);
        switch (this.pattern_time) {
          case 1:
            this.image_xscale = _mainscale * 1.42;
            break;
          case 2:
            this.image_xscale = _mainscale * 1.24;
            break;
          case 3:
            this.image_xscale = _mainscale * 1.16;
            break;
          case 4:
            this.image_xscale = _mainscale * 1.08;
            break;
          case 5:
            this.image_xscale = _mainscale * 1.04;
            break;
          case 6:
            this.image_xscale = _mainscale * 1.01;
            break;
          default:
            this.image_xscale = this.image_xscale * 0.98;
        }
        this.image_yscale = _mainscale + (_mainscale - this.image_xscale);
        if (this.pattern_time % 2 == 0) {
            _trail = instance_create_depth(this.x, this.y, 0, 'obj_pinktrail');
            _trail.visible = 1;
            _trail.sprite_index = this.sprite_index;
            _trail.image_angle = this.image_angle;
            _trail.image_xscale = this.image_xscale;
            _trail.image_yscale = this.image_yscale;
        }
        break;
    }
    this.life_time = this.life_time + 1;
  }
}
defineObject('obj_audienceheart', Audienceheart);

// obj_audiencehater (default sprite spr_dummyaudience, depth 0, parent obj_regularbullet)
class Audiencehater extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_dummyaudience';
  }
  create() {
    super.create?.();
    this.target = 4;
    this.damage = 100;
    if (i_ex('obj_pink_enemy')) {
        this.damage = O('obj_pink_enemy').damage;
    }
    this.grazepoints = 2;
    this.active = 1;
    this.destroyonhit = 0;
    this.life_time = 0;
    this.image_xscale = 1;
    this.image_yscale = 1;
    this.phase = 0;
    this.pattern_time = 0;
    this.launch_time = 0;
    this.boom_frame = - 1;
    this.boom_x = this.x;
    this.boom_y = this.y;
    this.bar_x = this.x;
    this.bar_y = this.y;
    this.bar_hspeed = 0;
    this.bar_vspeed = 0;
    this.bar_spin = 0;
    this.bar_angle = 0;
  }
  draw() {
    let _col, _xx, _scalepush, _dir;
    switch (this.phase) {
      case 0:
        _col = 0xdd1111;
        _xx = (this.pattern_time % 2 * 2 - 1) * Math.max(0, (this.pattern_time + 31 - this.launch_time) / 15);
        _scalepush = (1 - this.image_yscale) * sprite_get_height(this.sprite_index) * 0.75;
        if (this.pattern_time >= this.launch_time - 9 && this.pattern_time < this.launch_time - 7) {
            _col = 0xffff88;
        }
        break;
      default:
        _col = 0xffffff;
        _xx = 0;
        _scalepush = 0;
    }
    draw_sprite_ext(this.sprite_index, 1, this.x + lengthdir_x(_scalepush, this.image_angle + 270) + _xx, this.y + lengthdir_y(_scalepush, this.image_angle + 270), this.image_xscale, this.image_yscale, this.image_angle, _col, this.image_alpha);
    if (this.phase == 0) {
        _dir = this.image_angle + 35;
        draw_set_color(0xff6688);
        S.d_line_width(this.x + lengthdir_x(7, 315 + this.image_angle) + lengthdir_x(_scalepush, this.image_angle + 270), this.y + lengthdir_y(7, 315 + this.image_angle) + lengthdir_y(_scalepush, this.image_angle + 270), this.x + lengthdir_x(7, 315 + this.image_angle) + lengthdir_x(_scalepush, this.image_angle + 270) + lengthdir_x(10, _dir), this.y + lengthdir_y(7, 315 + this.image_angle) + lengthdir_y(_scalepush, this.image_angle + 270) + lengthdir_y(10, _dir), 3);
    }
    if (this.phase == 1) {
        if (this.boom_frame >= 0) {
            if (this.boom_frame < 8) {
                draw_sprite('spr_explosion_round', Math.floor(this.boom_frame), this.boom_x - 25, this.boom_y - 35);
            }
        }
        draw_set_color(0xff6688);
        S.d_line_width(this.bar_x - lengthdir_x(3, this.bar_angle), this.bar_y - lengthdir_y(3, this.bar_angle), this.bar_x + lengthdir_x(7, this.bar_angle), this.bar_y + lengthdir_y(7, this.bar_angle), 3);
    }
  }
  step() {
    let _amount, _distance, _overshoot, _dir, _dest, _scalepush, i, _trail;
    super.step?.();
    switch (this.phase) {
      case 0:
        this.pattern_time = this.pattern_time + 1;
        if (this.launch_time <= 0) {
            _amount = 0;
            if (W('obj_audiencehater', function (other) {
                if (this.phase == 0 && this.pattern_time < 10) {
                    _amount = _amount + 1;
                }
            }, this) === EXIT) return;
            if (W('obj_audiencehater', function (other) {
                if (this.phase == 0 && this.pattern_time < 10) {
                    this.launch_time = 46 + (_amount - 1) * 2;
                }
            }, this) === EXIT) return;
        }
        if (this.pattern_time >= this.launch_time - 25) {
            this.image_yscale = this.image_yscale * 0.8 + 0.13340000000000002;
        }
        this.image_xscale = 1 + (1 - this.image_yscale);
        _distance = 0;
        _overshoot = 0;
        if (instance_exists('obj_heart')) {
            _dir = this.image_angle + 90;
            _distance = point_distance(this.x, this.y, O('obj_heart').x, O('obj_heart').y);
            _overshoot = _distance * _distance / 860;
            _dest = point_direction(this.x, this.y, O('obj_heart').x, O('obj_heart').y - _overshoot);
            if (_dir < _dest - 180) {
                _dir = _dir + 360;
            }
            if (_dir > _dest + 180) {
                _dir = _dir - 360;
            }
            _dir = _dir * 0.8 + _dest * 0.2;
            this.image_angle = _dir - 90;
        }
        if (this.pattern_time == this.launch_time - 9) {
            _scalepush = (1 - this.image_yscale) * sprite_get_height(this.sprite_index) * 0.75;
            i = 0;
            for (let _r262 = 0, _n262 = (4); _r262 < _n262; _r262++) {
                _trail = instance_create_depth(this.x + lengthdir_x(_scalepush, this.image_angle + 270), this.y + lengthdir_y(_scalepush, this.image_angle + 270), 0, 'obj_pinktrail');
                _trail.visible = 1;
                _trail.sprite_index = this.sprite_index;
                _trail.image_index = 1;
                _trail.image_angle = this.image_angle;
                _trail.image_xscale = this.image_xscale;
                _trail.image_yscale = this.image_yscale;
                _trail.image_blend = 0xffff88;
                _trail.direction = i * 90;
                _trail.speed = 3;
                i = i + 1;
            }
        }
        if (this.pattern_time >= this.launch_time) {
            if (!T(snd_is_playing('snd_explosion_mmx3'))) {
                snd_play('snd_explosion_mmx3');
            }
            this.direction = point_direction(this.x, this.y, O('obj_heart').x, O('obj_heart').y - _overshoot);
            this.speed = 15;
            this.gravity_direction = 270;
            this.gravity = 0.5;
            this.image_xscale = 1;
            this.image_yscale = 1;
            this.boom_frame = 0;
            this.boom_x = this.x;
            this.boom_y = this.y;
            this.bar_x = this.x + lengthdir_x(7, 315 + this.image_angle);
            this.bar_y = this.y + lengthdir_y(7, 315 + this.image_angle);
            this.bar_hspeed = - sign(this.hspeed) * random(Math.abs(this.hspeed / 2));
            this.bar_vspeed = - 3 - random(7);
            this.bar_spin = choose(- 1, 1) * (5 + random(85));
            this.bar_angle = random(360);
            this.pattern_time = 0;
            this.phase = this.phase + 1;
        }
        break;
      case 1:
        this.bar_x = this.bar_x + this.bar_hspeed;
        this.bar_y = this.bar_y + this.bar_vspeed;
        this.bar_vspeed = this.bar_vspeed + 0.4;
        this.bar_angle = this.bar_angle + this.bar_spin;
        if (this.bar_angle >= 360) {
            this.bar_angle = this.bar_angle - 360;
        }
        if (this.bar_angle < 0) {
            this.bar_angle = this.bar_angle + 360;
        }
        switch (Math.floor(this.boom_frame)) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
            this.boom_frame = this.boom_frame + 1;
            break;
          case 5:
            this.boom_frame = this.boom_frame + 0.5;
            break;
          case 6:
            this.boom_frame = this.boom_frame + 0.334;
            break;
          case 7:
            this.boom_frame = this.boom_frame + 0.334;
            break;
        }
        this.hspeed = this.hspeed * 0.999;
        if (this.pattern_time % 2 == 0) {
            _trail = instance_create_depth(this.x, this.y, 0, 'obj_pinktrail');
            _trail.visible = 1;
            _trail.sprite_index = this.sprite_index;
            _trail.image_angle = this.image_angle;
            _trail.image_xscale = this.image_xscale;
            _trail.image_yscale = this.image_yscale;
        }
        break;
    }
    this.life_time = this.life_time + 1;
  }
  endStep() {
    if (this.gravity > 0) {
        this.image_angle = this.direction - 90;
    }
  }
}
defineObject('obj_audiencehater', Audiencehater);

// obj_sweatdrop (default sprite None, depth 0)
class Sweatdrop extends Instance {
  alarm0() {
    instance_destroy(this);
  }
  create() {
    this.gravity_direction = 270;
    this.gravity = 1;
    this.alarm ??= []; this.alarm[0] = 5 + irandom(2);
  }
  draw() {
    draw_set_color(0xffffff);
    draw_rectangle(this.x, this.y, this.x + 1, this.y + 1, false);
  }
}
defineObject('obj_sweatdrop', Sweatdrop);

