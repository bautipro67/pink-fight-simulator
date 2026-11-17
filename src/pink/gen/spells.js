// Ralsei's ReviveSong and Susie's Scythemare, Chapter 5's new spells (machine-translated from the Chapter 5 GML by tools/gen_pink.sh; edit tools/postfix.py, not this file)
/* eslint-disable */
import {
  Instance, S, choose, clamp, d3d_set_fog, defineObject, draw_clear_alpha, draw_self, draw_set_alpha, draw_set_blend_mode, draw_set_color, draw_sprite_ext, draw_surface, draw_surface_ext, global, gpu_set_alphatestenable, instance_create, instance_create_depth, instance_destroy, irandom_range, lengthdir_x, lerp, random, random_range, snd_pitch, snd_play, snd_stop, surface_create, surface_exists, surface_free, surface_reset_target, surface_set_target,
} from '../rt.js?v=20261117033203';
import {
  cameray, clamp01, i_ex, scr_dark_marker, scr_ease_in, scr_ease_inout, scr_ease_out, snd_play_x,
} from '../common.js?v=20261117033203';
import {
  EXIT, O, T, W,
} from '../gml.js?v=20261117033203';

// obj_spell_revivesong (default sprite spr_ralsei_cherub, depth 0)
class SpellRevivesong extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_ralsei_cherub';
  }
  cleanUp() {
    if (surface_exists(this.light_surf)) {
        surface_free(this.light_surf);
    }
    if (surface_exists(this.silhouette_surf)) {
        surface_free(this.silhouette_surf);
    }
    S.scr_battle_sprite_reset("ralsei");
  }
  create() {
    this.timer = 0;
    this.xspawn = this.x;
    this.yspawn = cameray() - 5;
    this.offset = 2.141592653589793;
    this.healer = false;
    this.heal_state = 0;
    this.target_char = 1434;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.image_speed = 0.5;
    this.xoff = 0;
    this.yoff = 0;
    this.xoff_b = 0;
    this.target = 0;
    this.image_alpha = 1;
    this.light_surf = surface_create(128, 400);
    this.silhouette_surf = surface_create(128, 400);
    this.init = false;
    this.healnum = 10;
    this.do_heal = false;
    this.spamton = 0;
    this.starthp = 0;
    this.size = 360;
    this.spread = 60;
    this.spotlight_height = this.ystart - 300 + 360;
    this.xstart_true = this.xstart;
    this.ystart_true = this.ystart;
    this.sing_sprite = 'spr_ralsei_sing';
    if (global.flag[1311] == 1) {
        this.sing_sprite = 'spr_ralseib_sing';
    }
    this.fn = - 4;
  }
  draw() {
    let _descent, _spread, _length, _width, _spotlight_height, _y, _sparkle, _feather, d, d2, _ylerp;
    _descent = 10;
    _spread = scr_ease_inout(clamp01(this.timer / 20), 4) * 20;
    _length = 360 + Math.sin(_spread / 180 * 3.141592653589793) * 20;
    _width = lengthdir_x(_length, 270 + _spread / 2);
    _spotlight_height = this.ystart - 300 + 360;
    _y = 0;
    if (i_ex('obj_flowery_enemy')) {
        if (i_ex('obj_herokris') && this.target_char.object_index == 'obj_herokris') {
            if (W(O('obj_flowery_enemy').krisflower, function (other) {
                this.con = 1;
            }, this) === EXIT) return;
        }
        if (i_ex('obj_herosusie') && this.target_char.object_index == 'obj_herosusie') {
            if (W(O('obj_flowery_enemy').susieflower, function (other) {
                this.con = 1;
            }, this) === EXIT) return;
        }
        if (i_ex('obj_heroralsei') && this.target_char.object_index == 'obj_heroralsei') {
            if (W(O('obj_flowery_enemy').ralseiflower, function (other) {
                this.con = 1;
            }, this) === EXIT) return;
        }
    }
    draw_set_color(0xffcf6d);
    draw_set_alpha(this.image_alpha / 2);
    S.d_ellipse(this.xstart - _width, _spotlight_height - _width / 4, this.xstart + _width, _spotlight_height + _width / 4, false);
    if (this.timer == _descent) {
        _sparkle = snd_play('snd_sparkle_glock');
        snd_pitch(_sparkle, 1.1);
        _feather = instance_create_depth(this.xstart - 10, this.ystart - 50, this.depth + 10, 'obj_cherub_feathers');
        _feather.direction = 270 + irandom_range(- 30, - 50);
        _feather = instance_create_depth(this.xstart, this.ystart - 50, this.depth + 10, 'obj_cherub_feathers');
        _feather.direction = 270 + irandom_range(- 10, 10);
        _feather = instance_create_depth(this.xstart + 10, this.ystart - 50, this.depth + 10, 'obj_cherub_feathers');
        _feather.direction = 270 + irandom_range(30, 50);
    }
    d3d_set_fog(true, 0xffb56c, 0, 1);
    draw_sprite_ext(this.target_char.sprite_index, this.target_char.image_index, this.target_char.x, this.target_char.y - 2, 2, 2, 0, 0xffb56c, _spread * this.image_alpha);
    d3d_set_fog(false, 0x000000, 0, 1);
    draw_sprite_ext(this.target_char.sprite_index, this.target_char.image_index, this.target_char.x, this.target_char.y, 2, 2, 0, 0x807976, _spread * this.image_alpha);
    if (W('obj_cherub_feathers', function (other) {
        draw_self(this);
    }, this) === EXIT) return;
    surface_set_target(this.silhouette_surf);
    draw_clear_alpha(0x000000, 0);
    draw_sprite_ext(this.target_char.sprite_index, this.target_char.image_index, this.target_char.x - (this.xstart - 64), this.target_char.y - (this.ystart - 300) - 2, 2, 2, 0, 0x807976, 1);
    draw_sprite_ext(this.target_char.sprite_index, this.target_char.image_index, this.target_char.x - (this.xstart - 64), this.target_char.y - (this.ystart - 300), 2, 2, 0, 0x807976, 1);
    gpu_set_alphatestenable(true);
    draw_set_blend_mode(3);
    if (W('obj_cherub_feathers', function (other) {
        S.draw_self_surfacespace(this, other.xstart - 64, other.ystart - 300);
    }, this) === EXIT) return;
    gpu_set_alphatestenable(false);
    surface_reset_target();
    surface_set_target(this.light_surf);
    draw_clear_alpha(0x000000, 0);
    draw_set_blend_mode(0);
    S.scr_draw_beam(64, 0, _length, _spread, 270, 16777215, 1, false);
    draw_set_alpha(1);
    d3d_set_fog(true, 0xffffff, 0, 1);
    S.d_ellipse(64 - _width, 360 - _width / 4, 64 + _width, 360 + _width / 4, false);
    draw_set_alpha(1);
    draw_set_blend_mode(3);
    gpu_set_alphatestenable(true);
    draw_surface(this.silhouette_surf, 0, 0);
    gpu_set_alphatestenable(false);
    draw_set_blend_mode(0);
    d3d_set_fog(false, 0x000000, 0, 1);
    surface_reset_target();
    draw_surface_ext(this.light_surf, this.xstart - 64, this.ystart - 300, 1, 1, 0, 0xffb56c, this.image_alpha * 0.5);
    if (this.timer == _descent + 24) {
    }
    if (this.timer >= _descent + 24) {
        this.x = this.xstart;
        this.y = this.ystart;
        if (this.timer == _descent + 24) {
            d = instance_create(this.xstart + 30 + this.xoff, this.ystart + this.yoff, 'obj_animation');
            d.sprite_index = this.spamton == 1 ? 'spr_spamton_cherub' : this.sprite_index;
            d.image_yscale = 2;
            d.image_xscale = 2;
            d2 = instance_create(this.xstart + 30 + this.xoff - this.spread, this.ystart + this.yoff, 'obj_animation');
            d2.sprite_index = this.spamton == 2 ? 'spr_spamton_cherub' : this.sprite_index;
            d2.image_yscale = 2;
            d2.image_xscale = - 2;
        } else if (this.timer == _descent + 48) {
        } else if (this.timer >= _descent + 48) {
            if (this.image_alpha == 1) {
                this.do_heal = true;
            }
            this.image_alpha = this.image_alpha - 0.1;
            if (this.image_alpha <= 0) {
                surface_free(this.silhouette_surf);
                surface_free(this.light_surf);
                if (W('obj_heroralsei', function (other) {
                    this.visible = 1;
                }, this) === EXIT) return;
                if (W(this.fn, function (other) {
                    instance_destroy(this);
                }, this) === EXIT) return;
                instance_destroy(this);
            }
        }
    } else if (this.timer >= _descent && this.timer <= _descent + 24) {
        this.x = this.xstart;
        _ylerp = this.timer - _descent;
        this.y = lerp(this.yspawn, this.ystart + this.yoff, clamp(_ylerp / 25, 0, 1));
        if (this.timer % 2 == 0) {
            d = instance_create(this.x + Math.cos(this.timer / 3 + this.offset) * 30, this.y + Math.sin(this.timer / 3 + this.offset) * 10, 'obj_animation');
            d.sprite_index = 'spr_sparestar_anim';
            d.image_speed = 0.5;
            d.image_blend = choose(0xffe04d, 0xffb56c);
            d.image_xscale = 2;
            d.image_yscale = 2;
            d = instance_create(this.x - Math.sin(this.timer / 3 + this.offset) * 30, this.y - Math.cos(this.timer / 3 + this.offset) * 10, 'obj_animation');
            d.sprite_index = 'spr_sparestar_anim';
            d.image_speed = 0.5;
            d.image_blend = choose(0xffe04d, 0xffb56c);
            d.image_xscale = 2;
            d.image_yscale = 2;
        }
    }
    this.timer = this.timer + 1;
  }
  step() {
    let _char, _spamchance, _starthp, _healnum, _flash;
    if (!T(this.init)) {
        _char = global.char[this.target];
        this.target_char = global.charinstance[this.target];
        this.alive_gml = global.hp[_char] > 0;
        this.starthp = global.hp[_char];
        if (_char == 1) {
            this.xstart = this.xstart + 20;
            this.ystart = this.ystart + 10;
            if (T(this.alive_gml)) {
                this.xoff = this.xoff - 6;
                this.yoff = this.yoff - 20;
            }
        } else if (_char == 2) {
            this.xstart = this.xstart + 30;
            this.ystart = this.ystart + 20;
            if (T(this.alive_gml)) {
                this.yoff = - 30;
            } else {
                this.yoff = - 12;
                this.xoff = 8;
            }
        } else {
            this.xstart = this.xstart + 34;
            this.ystart = this.ystart + 26;
            this.yoff = - 22;
            this.xoff = 2;
            this.spotlight_height = this.ystart - 300 + 360;
        }
        S.scr_battle_sprite_set("ralsei", this.sing_sprite, 0.25, true);
        if (!T(i_ex('obj_flowery_enemy'))) {
            if (W('obj_heroralsei', function (other) {
                this.visible = 0;
            }, this) === EXIT) return;
            this.fn = scr_dark_marker(O('obj_heroralsei').x, O('obj_heroralsei').y, this.sing_sprite);
            this.fn.depth = O('obj_heroralsei').depth - 1;
            this.fn.image_speed = 0.25;
            this.fn.image_index = 0;
        }
        this.depth = this.target_char.depth - 20;
        if (_char == 3) {
        }
        _spamchance = 0;
        if (global.chapter == 5 && global.flag[309] >= 9) {
            if (T(S.scr_armorcheck_equipped(3, 21))) {
                _spamchance = 10;
            } else {
                _spamchance = 2;
            }
        }
        if (_spamchance > 0) {
            if (random(100) <= _spamchance) {
                this.spamton = choose(1, 2);
                this.sprite_index = 'spr_ralsei_cherub_peeved';
            }
        }
        this.init = true;
    }
    if (T(this.do_heal)) {
        this.do_heal = false;
        S.scr_debug_print("do heal");
        this.star = this.target;
        this.ha = instance_create(this.x, this.y, 'obj_healanim');
        this.ha.target = this.target_char;
        _starthp = global.hp[global.char[this.target]];
        _healnum = this.healnum;
        S.scr_heal(this.star, this.healnum);
        if (W(this.target_char, function (other) {
            this.dmgwr = S.scr_dmgwriter_selfchar(this);
            if (W(this.dmgwr, function (other) {
                this.delay = 1;
                this.type = 3;
            }, this) === EXIT) return EXIT;
            if (global.hp[global.char[this.myself]] >= global.maxhp[global.char[this.myself]]) {
                if (W(this.dmgwr, function (other) {
                    this.specialmessage = 3;
                }, this) === EXIT) return EXIT;
            }
            this.dmgwr.damage = this.healnum;
        }, this) === EXIT) return;
        if (W(this.target_char, function (other) {
            _flash = S.scr_oflash(this);
        }, this) === EXIT) return;
        _flash.depth = this.depth - 1;
    }
  }
}
defineObject('obj_spell_revivesong', SpellRevivesong);

// obj_spell_scythemare (default sprite spr_scythemare, depth 0)
class SpellScythemare extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_scythemare';
  }
  create() {
    this.siner = 0;
    this.amp = 0;
    this.image_xscale = 3;
    this.image_yscale = 2;
    this.stimer = 0;
    this.initdelay = 0;
    this.myself = - 1;
    this.target = - 1;
    this.success = 0;
    this.init = 0;
    this.joker = global.charweapon[2] == 7;
    if (T(this.joker)) {
        this.sprite_index = 'spr_scythemare_jevil';
    }
    this.first = false;
    this.num = 0;
    this.laugh = false;
    this.last_spin = 0;
    this.last_altspin = 0;
    this.pacify_sound = 'snd_pacify';
  }
  draw() {
    let _timer, _sizer, _spinease, _swap, _sprite, _warp, _crossfadeA, _crossfadeB, _spin, _altspin, _lerp, _tween, _alpha, _shake;
    if (this.init == 0) {
        if (this.myself >= 0) {
            if (global.monster[this.myself] == 1) {
                if (global.monsterstatus[this.myself] == 1) {
                    this.success = 1;
                }
            }
        }
        this.depth = this.depth - this.num;
    }
    if (this.initdelay == 0) {
    }
    this.initdelay = this.initdelay - 1;
    if (this.initdelay <= 0) {
        this.siner = this.siner + 1;
        if (this.siner < 6) {
            _timer = this.siner;
            _sizer = lerp(4, 2, clamp01(_timer / 4));
            draw_sprite_ext(this.sprite_index, 0, this.x, this.y, _sizer, _sizer, 0, 0xffffff, clamp01(_timer / 3));
            if (this.siner == 4) {
                snd_play('snd_impact');
            }
        } else if (this.siner < 34) {
            _timer = this.siner - 6;
            if (_timer == 7 && this.num == 0) {
                this.pacify_sound = snd_play_x('snd_pacify', 1, 1);
            }
            _spinease = lerp(- 1.5707963267948966, 0, clamp01(scr_ease_out(_timer / 10, 3)));
            _swap = _spinease > - 1.5707963267948966;
            _sprite = _swap ? 'spr_spell_zzz' : this.sprite_index;
            if (!T(_swap)) {
                _spinease = _spinease * - 1;
            }
            _warp = lerp(4, 2, clamp01(_timer / 2));
            _crossfadeA = clamp01(S.inverselerp(8, 30, _timer));
            _crossfadeB = clamp01(S.inverselerp(8, 20, _timer));
            _spin = lerp(360, - 90, scr_ease_inout(_timer / 20, 3));
            _altspin = lerp(360, - 10, scr_ease_inout(_timer / 20, 3));
            if (_timer >= 20) {
                _spin = lerp(- 20, 0, scr_ease_in((_timer - 20) / 8, 3));
                _altspin = lerp(- 10, 0, scr_ease_in((_timer - 20) / 8, 3));
            }
            draw_sprite_ext('spr_spare_z', 0, this.x, this.y, 3, 3, this.last_altspin, 0xffffff, _crossfadeB / 2);
            draw_sprite_ext('spr_spare_z', 0, this.x, this.y, 3, 3, _altspin, 0xffffff, _crossfadeB);
            this.last_altspin = _altspin;
            if (_timer >= 20) {
                _spin = lerp(- 90, 10, scr_ease_in((_timer - 20) / 8, 3));
            }
            draw_sprite_ext(this.sprite_index, 0, this.x, this.y, 2, 2, this.last_spin, 0xffffff, (1 - _crossfadeA) / 2);
            draw_sprite_ext(this.sprite_index, 0, this.x, this.y, 2, 2, _spin, 0xffffff, 1 - _crossfadeA);
            this.last_spin = _spin;
        } else {
            _timer = this.siner - 34;
            if (_timer == 0) {
                if (T(this.success)) {
                    S.snd_play_echo(this, 'snd_swing', 3, 0.34, 1, 1.5 + this.num * 0.25);
                } else {
                    snd_play_x('snd_bump', 2, 1 + random_range(- 0.5, 0.5));
                }
                if (this.num == 0) {
                    snd_stop(this.pacify_sound);
                }
                if (T(this.joker)) {
                    if (T(this.laugh)) {
                        snd_play('snd_joker_laugh0');
                    }
                }
            }
            _lerp = clamp01(S.inverselerp(6, 24, _timer));
            _tween = scr_ease_out(_lerp, 2) * 20;
            if (T(this.success)) {
                _alpha = clamp01(lerp(1, 0, _timer / 20));
                draw_sprite_ext('spr_spare_z_split', 0, this.x + _tween, this.y, 3, 3, 0, 0xffffff, _alpha);
                draw_sprite_ext('spr_spare_z_split', 1, this.x - _tween, this.y, 3, 3, 0, 0xffffff, _alpha);
                draw_sprite_ext('spr_spare_z_split', 0, this.x + _tween * 2, this.y, 3, 3, 0, 0xffffff, _alpha);
                draw_sprite_ext('spr_spare_z_split', 1, this.x - _tween * 2, this.y, 3, 3, 0, 0xffffff, _alpha);
            } else {
                _shake = 0;
                if (_timer < 8) {
                    _shake = (8 - _timer) * (_timer % 2 * 2 - 1);
                    _lerp = 0;
                    _tween = 0;
                } else {
                    _lerp = clamp01(S.inverselerp(8, 22, _timer));
                    _tween = scr_ease_in(_lerp, 2) * 6;
                }
                draw_sprite_ext('spr_spare_z', 0, this.x + _tween + _shake, this.y + _tween * 10, 3, 3, - _tween * 5, 0xffffff, 1 - _lerp);
            }
            if (_timer < 9) {
                draw_sprite_ext('spr_thrash_slash', _timer / 3, this.x, this.y, 1, 2, 90, 0xffffff, 1);
            }
        }
        this.stimer = this.stimer + 1;
        if (this.siner == 55) {
        }
        if (this.siner == 56) {
            if (this.success == 1) {
                if (W(this.target, function (other) {
                    global.flag ??= []; global.flag[51 + this.myself] = 3;
                    this.user10?.();
                    S.scr_monsterdefeat(this);
                }, this) === EXIT) return;
            }
        }
        if (this.siner >= 64) {
            instance_destroy(this);
        }
    }
  }
}
defineObject('obj_spell_scythemare', SpellScythemare);

