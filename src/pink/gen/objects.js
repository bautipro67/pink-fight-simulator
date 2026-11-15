// Pink's small objects: the DOKI meter (obj_date_ui), her lipsync, ghosts, dummies, spotlights and ACT effects (machine-translated from the Chapter 5 GML by tools/gen_pink.sh; edit tools/postfix.py, not this file)
/* eslint-disable */
import {
  Instance, S, audio_sound_get_track_position, d3d_set_fog, defineObject, draw_clear_alpha, draw_rectangle, draw_self, draw_set_alpha, draw_set_color, draw_set_halign, draw_set_valign, draw_sprite, draw_sprite_ext, draw_sprite_part_ext, draw_surface, draw_text, draw_text_color, draw_text_ext, draw_text_ext_transformed, draw_text_transformed, global, gpu_set_blendmode, gpu_set_fog, instance_create, instance_create_depth, instance_destroy, irandom, lengthdir_x, lengthdir_y, lerp, make_color_rgb, merge_color, random, snd_loop, snd_play, snd_stop, snd_volume, surface_create, surface_exists, surface_free, surface_reset_target, surface_set_target,
} from '../rt.js?v=20261115074155';
import {
  camerawidth, camerax, cameray, i_ex, scr_shakeobj, scr_shakescreen, snd_play_x,
} from '../common.js?v=20261115074155';
import {
  EXIT, LOOP, O, T, W,
} from '../gml.js?v=20261115074155';

// obj_date_ui (default sprite spr_dokibar_blush, depth 0)
class DateUi extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_dokibar_blush';
  }
  cleanUp() {
    if (surface_exists(this.healthbar_surf)) {
        surface_free(this.healthbar_surf);
    }
  }
  create() {
    let _rep;
    this.timer = 0;
    this.con = 0;
    this.lightpink = make_color_rgb(247, 91, 200);
    this.medpink = make_color_rgb(230, 36, 123);
    this.darkpink = make_color_rgb(200, 34, 141);
    this.tsiner = 0;
    this.current = 0;
    if (i_ex('obj_pink_enemy')) {
        this.current = O('obj_pink_enemy').doki;
    }
    this.flashsiner = 0;
    this.healthbar_surf = surface_create(96, 250);
    this.electricity_timer = 0;
    this.electricity_con = 0;
    this.dokimax = 30;
    if (i_ex('obj_pink_enemy')) {
        this.dokimax = O('obj_pink_enemy').dokimax;
    }
    this.show_doki_bar = false;
    this.doki_x = 80;
    this.weatherangle = 0;
    this.weatherangletimer = 0;
    this.reeltimer = 0;
    this.reelsize = 100;
    this.population_scale = 2;
    this.dogtimer = 0;
    this.dogalpha = 0;
    this.dogx = - 100;
    this.dogy = - 100;
    this.radarlen = 20;
    this.radarangle = 0;
    this.doglen = 20;
    this.dogangle = 0;
    this.xx = 300;
    this.dokishaketimer = 0;
    this.init = false;
    this.blushcon = 0;
    this.blushtimer = 0;
    _rep = 0;
    for (let _r196 = 0, _n196 = (7); _r196 < _n196; _r196++) {
        this.populationx ??= []; this.populationx[_rep] = 0 + _rep * 6;
        this.populationx2 ??= []; this.populationx2[_rep] = 6 + _rep * 6;
        if (_rep == 0) {
            this.populationy ??= []; this.populationy[_rep] = 24 + irandom(26);
        } else {
            this.populationy ??= []; this.populationy[_rep] = this.populationy[_rep - 1];
        }
        this.populationy2 ??= []; this.populationy2[_rep] = 24 + irandom(26);
        _rep = _rep + 1;
    }
    this.weatherkick_con = 0;
    this.weatherkick_timer = 0;
    this.populationkick_con = 0;
    this.populationkick_timer = 0;
  }
  draw() {
    let _x, _y, _weather_angle, _weather_x, _weather_y, _sundstring, _reelitinstring, _populationstring, _crimestring, _pop_angle, _pop_x, _pop_y, _popu_rep, _angle, doki, _shakex, _shakey;
    if (!T(i_ex('obj_pink_enemy'))) {
        return;
    }
    S.scr_84_set_draw_font("main");
    draw_set_alpha(1);
    draw_set_color(0xffffff);
    _x = camerax();
    _y = cameray();
    if (this.con == 1) {
        this.timer = this.timer + 1;
        _x = camerax() + this.xx;
        this.xx = lerp(300, 0, this.timer / 30);
        if (this.timer >= 30) {
            this.con = 2;
            this.timer = 0;
        }
    }
    if (this.con > 0) {
        _x = camerax() + this.xx;
        _weather_angle = 0;
        _weather_x = 0;
        _weather_y = 0;
        _sundstring = S.stringsetloc("SUND", "obj_date_ui_slash_Draw_0_gml_35_0");
        _reelitinstring = S.stringsetloc("REEL IT IN!", "obj_date_ui_slash_Draw_0_gml_36_0");
        _populationstring = S.stringsetloc("POPULATION", "obj_date_ui_slash_Draw_0_gml_37_0");
        _crimestring = S.stringsetloc("CRIME", "obj_date_ui_slash_Draw_0_gml_38_0");
        if (this.weatherkick_con == 1) {
            this.weatherkick_timer = this.weatherkick_timer + 1;
            if (this.weatherkick_timer > 0) {
                _weather_x = lerp(0, - 800, this.weatherkick_timer / 40);
            }
            if (this.weatherkick_timer > 0) {
                _weather_y = lerp(0, - 800, this.weatherkick_timer / 40);
            }
            if (this.weatherkick_timer > 0) {
                _weather_angle = lerp(0, - 100, this.weatherkick_timer / 40);
            }
            if (this.weatherkick_timer == 40) {
                this.weatherkick_con = 2;
            }
        }
        if (this.weatherkick_con != 2) {
            draw_text_ext_transformed(_x + 500 + _weather_x, _y + 232 + _weather_y, _sundstring, 9999, 9999, 1, 1, _weather_angle);
            draw_sprite_ext('spr_date_sun', 0, _x + 480 + _weather_x, _y + 240 + _weather_y, 1, 1, this.weatherangle + _weather_angle, 0xffffff, 1);
            this.weatherangletimer = this.weatherangletimer + 1;
            this.weatherangle = Math.sin(this.weatherangletimer * 0.02) * 100;
        }
        draw_set_halign(1);
        draw_text_ext_transformed(_x + 493, _y + 20, _reelitinstring, 9999, 9999, 1, 1, 0);
        S.d_rectangle(_x + 468, _y + 40, _x + 512, _y + 50, true);
        this.reeltimer = this.reeltimer + 1;
        this.reelsize = 65 + Math.sin(this.reeltimer * 0.1) * 40;
        draw_sprite_part_ext('spr_date_reel', 0, 0, 0, this.reelsize, 30, _x + 469, _y + 40, 0.4, 0.36, 0xffffff, 1);
        draw_set_halign(0);
        _pop_angle = 0;
        _pop_x = 0;
        _pop_y = 0;
        if (this.populationkick_con == 1) {
            this.populationkick_timer = this.populationkick_timer + 1;
            if (this.populationkick_timer > 0) {
                _pop_x = lerp(0, - 800, this.populationkick_timer / 40);
            }
            if (this.populationkick_timer > 0) {
                _pop_y = lerp(0, - 800, this.populationkick_timer / 40);
            }
            if (this.populationkick_timer > 0) {
                _pop_angle = lerp(0, - 100, this.populationkick_timer / 40);
            }
            if (this.populationkick_timer == 40) {
                this.populationkick_con = 2;
            }
        }
        if (this.populationkick_con != 2) {
            draw_text_ext_transformed(_x + 440 + _pop_x, _y + 61 + _pop_y, _populationstring, 9999, 9999, 1, 1, _pop_angle);
            S.d_rectangle(_x + _pop_x + 450, _y + _pop_y + 80, _x + _pop_x + 484, _y + _pop_y + 114, true);
            _popu_rep = 0;
            for (let _r610 = 0, _n610 = (5); _r610 < _n610; _r610++) {
                S.d_line_width_color(_x + _pop_x + 440 + this.populationx[_popu_rep], _y + 61 + _pop_y + this.populationy[_popu_rep], _x + 440 + _pop_x + this.populationx2[_popu_rep], _y + 61 + _pop_y + this.populationy2[_popu_rep], 1, 4235519, 4235519);
                this.populationx ??= []; this.populationx[_popu_rep] = this.populationx[_popu_rep] - 1;
                this.populationx2 ??= []; this.populationx2[_popu_rep] = this.populationx2[_popu_rep] - 1;
                if (this.populationx[_popu_rep] < 10) {
                    this.populationx ??= []; this.populationx[_popu_rep] = this.populationx[_popu_rep] + 29;
                    this.populationx2 ??= []; this.populationx2[_popu_rep] = this.populationx2[_popu_rep] + 29;
                    if (_popu_rep == 0) {
                        this.populationy ??= []; this.populationy[_popu_rep] = this.populationy2[4];
                    } else {
                        this.populationy ??= []; this.populationy[_popu_rep] = this.populationy2[_popu_rep - 1];
                    }
                    this.populationy2 ??= []; this.populationy2[_popu_rep] = 24 + irandom(26);
                }
                _popu_rep = _popu_rep + 1;
            }
        }
        draw_set_halign(2);
        S.d_rectangle(_x + 480, _y + 270, _x + 520, _y + 310, true);
        if (global.lang == "ja") {
            draw_text_ext(_x + 476, _y + 281, _crimestring, 16, 30);
        } else {
            draw_text_ext_transformed(_x + 475, _y + 296, _crimestring, 9999, 9999, 1, 1, 0);
        }
        draw_sprite_ext('spr_date_population', 0, _x + 500, _y + 290, this.population_scale, this.population_scale, 0, 0xffffff, 1);
        if (this.con != 3) {
            this.timer = this.timer + random(3);
        }
        this.population_scale = 1.8 + Math.sin(this.timer * 1) * 0.1;
        draw_set_halign(0);
        this.dogtimer = this.dogtimer + 1;
        if (this.dogtimer == 1) {
            _angle = irandom(360);
            this.dogalpha = 1;
            this.dogx = this.x + lengthdir_x(40, _angle);
            this.dogy = this.y + lengthdir_y(40, _angle);
            this.dogtimer = - 30;
            this.doglen = 5 + random(4);
            this.dogangle = irandom(360);
        }
        if (this.dogalpha > 0) {
            this.dogalpha = this.dogalpha - 0.1;
        }
        draw_sprite_ext('spr_radar_dog', 0, _x + 600 + lengthdir_x(this.doglen, this.dogangle), _y + 280 + lengthdir_y(this.doglen, this.dogangle), 0.5, 0.5, 0, 0xffffff, this.dogalpha);
        this.radarangle = this.radarangle + 6;
        S.d_circle(_x + 600, _y + 280, 16, true);
        S.d_line_color(_x + 600, _y + 280, _x + 600 + lengthdir_x(16, this.radarangle), _y + 280 + lengthdir_y(16, this.radarangle), 65280, 65280);
        if (this.con == 2 && !T(i_ex('obj_date_controller'))) {
            this.inst = instance_create_depth(_x + 600, _y + 280, this.depth + 1, 'obj_afterimage_line');
            this.inst.x2 = _x + 600 + lengthdir_x(16, this.radarangle);
            this.inst.y2 = _y + 280 + lengthdir_y(16, this.radarangle);
        }
    }
    if (this.con == 3) {
        this.timer = this.timer + 1;
        if (W('obj_afterimage_line', function (other) {
            this.image_alpha = this.image_alpha - 0.2;
        }, this) === EXIT) return;
        _x = camerax() + this.xx;
        this.xx = lerp(0, 300, this.timer / 30);
        if (this.timer >= 30) {
            this.con = 0;
            this.timer = 0;
        }
    }
    if (O('obj_pink_enemy').doki > this.current) {
        this.current = this.current + 1;
        this.flashsiner = 1;
    }
    if (O('obj_pink_enemy').doki < this.current) {
        this.current = this.current - 1;
    }
    if (this.show_doki_bar == 1) {
        this.doki_x = lerp(this.doki_x, 0, 0.3);
    }
    if (i_ex('obj_date_controller')) {
        this.depth = O('obj_date_controller').depth + 1;
    } else {
        this.depth = 86;
    }
    doki = this.current;
    _shakex = 0;
    if (doki == this.dokimax) {
        _shakex = - 2 + random(4);
    }
    _shakey = 0;
    if (doki == this.dokimax) {
        _shakey = - 2 + random(4);
    }
    if (i_ex('obj_pink_enemy') && O('obj_pink_enemy').datecount == 0 || i_ex('obj_date_ui')) {
        _shakex = 0;
        _shakey = 0;
    }
    if (i_ex('obj_pink_enemy') && O('obj_pink_enemy').idlesprite == 'spr_mew_pushing') {
        _shakex = Math.sin(O('obj_pink_enemy').siner * 1) * 5;
    }
    if (this.dokishaketimer > 0) {
        this.dokishaketimer = this.dokishaketimer - 1;
        _shakex = - 2 + random(4);
    }
    S.scr_84_set_draw_font("main");
    draw_set_halign(0);
    if (T(S.scr_debug())) {
        draw_text_color(camerax() + 10, 2, "[PRESS F1 FOR MAX DOKI]", 0xffffff, 0xffffff, 0xffffff, 0xffffff, 1);
        draw_text_color(camerax() + 10, 15, "[PRESS F7 FOR MAX TP]", 0xffffff, 0xffffff, 0xffffff, 0xffffff, 1);
        draw_text(camerax() + 10, cameray() + 28, "[PRESS I TO SKIP PHASE]");
        if (i_ex('obj_pink_enemy')) {
            draw_text(camerax() + 10, cameray() + 41, "PHASE: " + String(O('obj_pink_enemy').datecount + 1));
        }
    }
    draw_set_halign(1);
    draw_text_color(608 + this.doki_x + _shakex, 30, S.stringsetloc("DOKI", "obj_date_ui_slash_Draw_0_gml_195_0"), 0xffffff, 0xffffff, 0xffffff, 0xffffff, 1);
    if (i_ex('obj_pink_enemy')) {
        draw_text_color(608 + this.doki_x + _shakex, 47, String(O('obj_pink_enemy').doki) + "/" + String(this.dokimax), 0xffffff, 0xffffff, 0xffffff, 0xffffff, 1);
    }
    if (!T(surface_exists(this.healthbar_surf))) {
        this.healthbar_surf = surface_create(96, 250);
    }
    surface_set_target(this.healthbar_surf);
    draw_clear_alpha(16777215, 0);
    draw_sprite('spr_dokibar', 1, 0, 0);
    draw_set_color(this.medpink);
    S.d_rectangle(3, this.sprite_height - 1, this.sprite_width - 1, this.sprite_height - doki / this.dokimax * this.sprite_height, false);
    draw_set_color(0xffffff);
    if (this.flashsiner > 0) {
        draw_set_alpha(this.flashsiner);
        if (O('obj_pink_enemy').datecount == 3 && O('obj_pink_enemy').explosioncon == 0) {
        } else {
            S.d_rectangle_color(3, this.sprite_height - 1, this.sprite_width - 1, this.sprite_height - doki / this.dokimax * this.sprite_height, 16777215, 16777215, 16777215, 16777215, false);
        }
        this.flashsiner = this.flashsiner - 1;
        draw_set_alpha(1);
    }
    if (doki == this.dokimax) {
        this.tsiner = this.tsiner + 1;
        draw_set_alpha(0.5 + Math.sin(this.tsiner * 0.2) * 0.5);
        S.d_rectangle_color(3, this.sprite_height - 1, this.sprite_width - 1, this.sprite_height - doki / this.dokimax * this.sprite_height, 16777215, 16777215, 16777215, 16777215, false);
        draw_set_alpha(1);
    }
    if (O('obj_pink_enemy').doki > 0) {
        draw_sprite('spr_tensionmarker', 0, 3, this.sprite_height - doki / this.dokimax * this.sprite_height);
    }
    draw_sprite('spr_dokibar', 0, 0, 0);
    gpu_set_blendmode(3);
    draw_sprite_ext('spr_tensionbar_cutout', 0, 0, 0, 1, 1, 0, 0xffffff, 1);
    gpu_set_blendmode(0);
    surface_reset_target();
    draw_surface(this.healthbar_surf, this.x + 125 + _shakex + this.doki_x, this.y + _shakey - 68);
    if (this.electricity_con == 1 && !T(i_ex('obj_date_controller'))) {
        draw_sprite_ext('spr_pink_electricity', this.electricity_timer, this.x + 110 + _shakex + this.doki_x, this.y + _shakey - 72, 1, 1.8, 0, 0xffffff, 1);
        draw_sprite_ext('spr_pink_electricity', this.electricity_timer + 2, this.x + 110 + _shakex + this.doki_x, this.y + _shakey + 20, 1, 1.8, 0, 0xffffff, 1);
        this.electricity_timer = this.electricity_timer + 1;
        if (this.electricity_timer == 1) {
            snd_loop('snd_electroshock_loop');
            snd_volume('snd_electroshock_loop', 0.1, 0);
        }
        if (this.electricity_timer == 30) {
            snd_stop('snd_electroshock_loop');
            this.electricity_timer = 0;
            this.electricity_con = 0;
        }
    } else {
        snd_stop('snd_electroshock_loop');
    }
    draw_set_color(0xffffff);
    draw_set_halign(0);
    draw_set_alpha(1);
  }
}
defineObject('obj_date_ui', DateUi);

// obj_pink_lipsync (default sprite spr_pink_sing, depth 0)
class PinkLipsync extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_pink_sing';
    this.visible = false;
  }
  create() {
    this.trackpos = 0;
    this.last_trackpos = 0;
    this.safety_timer = 0;
    this.song_length = 184.666;
    this.length_string = S.scr_string_format_time(this.song_length, 2);
    this.notetime = [42, 42.33, 42.67, 43, 43.33, 43.67, 43.83, 44, 44.17, 44.33, 44.5, 44.83, 45, 45.17, 45.33, 45.42, 45.5, 45.58, 45.67, 45.83, 46, 46.17, 46.25, 46.33, 46.5, 46.67, 47, 47.17, 47.5, 47.67, 47.83, 48, 48.33, 48.5, 48.67, 48.83, 49.17, 49.33, 49.67, 49.83, 50, 50.17, 50.5, 50.67, 50.83, 51, 51.17, 51.67, 51.83, 52, 52.17, 52.33, 52.5, 53, 53.17, 53.34, 53.67, 54, 54.34, 54.5, 54.67, 54.84, 55, 55.17, 55.67, 55.83, 56, 56.09, 56.17, 56.25, 56.34, 56.5, 56.67, 56.84, 56.92, 57.17, 57.34, 57.67, 57.84, 58.17, 58.34, 58.5, 58.67, 59, 59.17, 59.34, 59.5, 59.84, 60, 60.34, 60.5, 60.67, 60.84, 61.17, 61.17, 61.33, 61.5, 61.67, 61.83, 62.33, 62.5, 62.67, 62.83, 63, 63.17, 63.5, 63.75, 64, 64.17, 64.33, 64.5, 65, 65.17, 65.33, 65.5, 65.67, 65.83, 66.17, 66.33, 66.67, 66.83, 67, 67.17, 67.67, 67.83, 68, 68.17, 68.33, 68.5, 69, 69.17, 69.33, 69.67, 70, 70.17, 70.33, 70.67, 71, 71.33, 71.67, 72, 109.17, 110.33, 110.67, 111, 111.33, 111.67, 112, 112.5, 112.67, 113.17, 113.33, 113.5, 113.67, 114.33, 114.5, 114.67, 115.5, 116, 116.33, 116.67, 117, 117.33, 117.83, 118, 118.5, 118.67, 118.83, 119, 119.67, 119.83, 120, 120.83, 121.33, 121.66, 122, 122.33, 122.67, 123.17, 123.33, 123.83, 124, 124.33, 124.67, 125, 125.33, 127.33, 127.67, 128, 130, 130.33, 130.67, 132.67, 133.33, 134.67, 136.5, 136.92, 137.33, 137.66, 137.99, 138.33, 138.49, 138.66, 138.83, 138.99, 139.16, 139.5, 139.66, 139.83, 139.99, 140.08, 140.16, 140.24, 140.33, 140.49, 140.66, 140.83, 140.91, 141.16, 141.33, 141.66, 141.83, 142.16, 142.33, 142.49, 142.66, 142.99, 143.16, 143.33, 143.49, 143.83, 144, 144.33, 144.5, 144.67, 144.83, 145.17, 145.33, 145.5, 145.67, 145.83, 146.33, 146.5, 146.66, 146.83, 147, 147.16, 147.66, 147.83, 148, 148.33, 148.66, 149, 149.16, 149.33, 149.5, 149.66, 149.83, 150.16, 150.33, 150.5, 150.66, 150.75, 150.83, 150.91, 151, 151.16, 151.33, 151.5, 151.58, 151.83, 152, 152.33, 152.5, 152.83, 153, 153.16, 153.33, 153.66, 153.83, 154, 154.16, 154.5, 154.66, 154.99, 155.16, 155.33, 155.49, 155.83, 155.99, 156.16, 156.33, 156.49, 156.99, 157.16, 157.33, 157.49, 157.66, 157.83, 158.16, 158.41, 158.66, 158.83, 159, 159.16, 159.66, 159.83, 160, 160.16, 160.33, 160.5, 160.83, 161.08, 161.33, 161.5, 161.67, 161.83, 162.33, 162.5, 162.67, 162.83, 163, 163.17, 163.5, 163.75, 163.99, 164.33, 164.66, 164.83, 164.99, 165.33, 165.66, 165.99, 166.33, 166.66, 168.66, 169.5, 170, 170.83, 171.33, 172.16, 172.66, 173.33, 174, 174.83, 175.33, 176.16, 176.66, 178, 178.66, 179.33];
    this.noteend = [42.17, 42.5, 43, 43.33, 43.67, 43.83, 44, 44.17, 44.33, 44.5, 44.67, 44.92, 45.08, 45.25, 45.42, 45.5, 45.58, 45.67, 45.75, 45.92, 46.08, 46.25, 46.33, 46.42, 46.58, 46.75, 47.08, 47.42, 0, 0, 47.92, 48.17, 48.42, 48.58, 48.75, 48.92, 49.25, 49.5, 49.75, 49.92, 50.08, 50.25, 50.67, 50.83, 51, 51.17, 51.5, 51.83, 52, 52.17, 52.33, 52.5, 52.83, 53.08, 53.25, 53.67, 54, 54.34, 54.5, 54.67, 54.84, 55, 55.17, 55.34, 55.75, 55.92, 56.09, 56.17, 56.25, 56.34, 56.42, 56.59, 56.75, 56.92, 57, 57.25, 57.42, 57.75, 58.09, 0, 0, 58.59, 58.84, 59.09, 59.25, 59.42, 59.59, 59.92, 60.17, 60.42, 60.59, 60.75, 60.92, 61.34, 61.33, 61.5, 61.67, 61.83, 62.17, 62.5, 62.67, 62.83, 63, 63.17, 63.5, 63.75, 64, 64.17, 64.33, 64.5, 64.83, 65.17, 65.33, 65.5, 65.67, 65.83, 66.17, 66.33, 66.67, 66.83, 67, 67.17, 67.5, 67.83, 68, 68.17, 68.33, 68.5, 68.83, 69.08, 69.25, 69.58, 69.92, 70.08, 70.25, 70.42, 70.92, 71.25, 71.58, 71.92, 72.67, 110.25, 110.5, 110.92, 111.25, 111.58, 111.92, 112.33, 112.67, 113, 113.33, 113.5, 113.67, 114, 114.42, 114.58, 115.17, 115.83, 116.25, 116.58, 116.92, 117.25, 117.67, 118, 118.33, 118.67, 118.83, 119, 119.33, 119.75, 119.92, 120.5, 121.16, 121.58, 121.91, 122.25, 122.58, 123, 123.33, 123.67, 124, 124.25, 124.58, 124.92, 125.25, 126.58, 127.58, 127.92, 129.25, 130.25, 130.58, 131.92, 133.25, 134.58, 134.92, 136.75, 137.16, 137.66, 137.99, 138.33, 138.49, 138.66, 138.83, 138.99, 139.16, 139.33, 139.58, 139.74, 139.91, 140.08, 140.16, 140.24, 140.33, 140.41, 140.58, 140.74, 140.91, 140.99, 141.24, 141.41, 141.74, 142.08, 0, 0, 142.58, 142.83, 143.08, 143.24, 143.41, 143.58, 143.91, 144.17, 144.42, 144.58, 144.75, 144.92, 145.25, 145.5, 145.58, 145.75, 146.16, 146.41, 146.58, 146.75, 146.91, 147.08, 147.5, 147.75, 147.91, 148.33, 148.66, 149, 149.16, 149.33, 149.5, 149.66, 149.83, 150, 150.25, 150.41, 150.58, 150.75, 150.83, 150.91, 151, 151.08, 151.25, 151.41, 151.58, 151.66, 151.91, 152.08, 152.41, 152.75, 0, 0, 153.25, 153.5, 153.75, 153.91, 154.08, 154.25, 154.58, 154.83, 155.08, 155.24, 155.41, 155.58, 155.91, 156.16, 156.33, 156.49, 156.83, 157.16, 157.33, 157.49, 157.66, 157.83, 158.16, 158.41, 158.66, 158.83, 159, 159.16, 159.5, 159.83, 160, 160.16, 160.33, 160.5, 160.83, 161.08, 161.33, 161.5, 161.67, 161.83, 162.17, 162.5, 162.67, 162.83, 163, 163.17, 163.5, 163.75, 164, 164.24, 164.58, 164.74, 164.91, 165.08, 165.58, 165.91, 166.24, 166.58, 167.33, 168.75, 169.75, 170.08, 171.08, 171.41, 172.25, 172.91, 173.58, 174.16, 175, 175.41, 176.41, 176.75, 178.25, 178.91, 179.41];
    this.noteanim = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.maxnote = 343;
    this.noteindex = 0;
    this.bpm = 180;
    this.lipsync = false;
    this.ftime = [40, 74.67, 106.67, 184];
    this.laststate = false;
    this.singing = false;
    this.note_buffer = 0.03333333333333333;
    this.looped = false;
    this.init = false;
    this.debug = false;
    this.depth = O('obj_pink_enemy').depth + 1000;
    this.update_sprite = false;
  }
  step() {
    let _truetrackpos;
    this.last_trackpos = this.trackpos;
    _truetrackpos = audio_sound_get_track_position(global.batmusic[1]);
    if (_truetrackpos > 0) {
        this.trackpos = _truetrackpos;
        this.safety_timer = 0;
    } else if (this.safety_timer < 30) {
        this.safety_timer = this.safety_timer + 1;
    }
    if (this.safety_timer >= 30) {
        this.trackpos = this.trackpos + this.delta_time / 1000000;
        if (this.trackpos >= this.song_length) {
            this.trackpos = this.trackpos - this.song_length;
            this.noteindex = 0;
        }
    } else if (this.trackpos < this.last_trackpos && this.safety_timer == 0) {
        this.noteindex = 0;
    }
    while ((this.noteindex < this.maxnote && !T(this.singing) && this.trackpos > this.noteend[this.noteindex]) && LOOP('PinkLipsync#1')) {
        this.noteindex = this.noteindex + 1;
    }
    if (this.trackpos < this.ftime[0] || this.trackpos > this.ftime[1] && this.trackpos < this.ftime[2] || this.trackpos > this.ftime[3]) {
        this.lipsync = false;
        this.singing = true;
    } else if (!T(this.lipsync)) {
        this.lipsync = true;
        this.singing = false;
    }
    if (T(this.lipsync) && this.noteindex < this.maxnote) {
        if (!T(this.singing) && this.trackpos >= this.notetime[this.noteindex] + this.note_buffer && this.trackpos < this.noteend[this.noteindex]) {
            this.singing = true;
            this.note_buffer = 0;
        } else if (T(this.singing) && this.trackpos > this.noteend[this.noteindex]) {
            this.noteindex = this.noteindex + 1;
            this.singing = false;
            if (this.noteindex < this.maxnote && this.noteend[this.noteindex - 1] == this.notetime[this.noteindex] && this.noteanim[this.noteindex] == 0) {
                this.note_buffer = 0.03;
            } else {
                this.note_buffer = 0;
            }
        }
    }
    if (!T(i_ex('obj_pink_enemy'))) {
        if (T(this.debug)) {
            S.scr_debug_delete_persistent("pink_lipsync");
            S.scr_debug_print("removing pink lipsync object");
        }
        instance_destroy(this);
    }
  }
  endStep() {
    let _singing;
    if (!T(i_ex('obj_pink_battlemovement'))) {
        return;
    }
    _singing = this.singing;
    if (W('obj_pink_battlemovement', function (other) {
        if (this.sprite_index == 'spr_pink_sing_idle' && T(_singing)) {
            this.sprite_index = 'spr_pink_sing';
        } else if (this.sprite_index == 'spr_pink_sing' && !T(_singing)) {
            this.sprite_index = 'spr_pink_sing_idle';
        }
    }, this) === EXIT) return;
  }
}
defineObject('obj_pink_lipsync', PinkLipsync);

// obj_pink_ghost_marker (default sprite None, depth 0)
class PinkGhostMarker extends Instance {
  create() {
    this.timer = 0;
    this.con = 0;
    this.wave_siner = 0;
    this.distortsiner = 0;
    this.thickness = 2;
  }
  draw() {
    let __offsetx, __offsety;
    if (i_ex('obj_pink_enemy') && O('obj_pink_enemy').datecount == 3) {
        this.con = 1;
    }
    if (this.con == 1) {
        this.wave_siner = this.wave_siner + 1;
        this.distortsiner = this.distortsiner + 1;
        __offsetx = - 40;
        __offsety = - 40;
        this.i = 0;
        while ((this.i < this.sprite_height) && LOOP('PinkGhostMarker#2')) {
            draw_sprite_part_ext('spr_pink_ghost_2xscale', this.image_index, 0, this.i * this.thickness, this.sprite_width, this.thickness + 2, this.x + __offsetx + Math.sin((this.wave_siner + this.i * 8) / 30) * 3, this.y + this.i * this.thickness + __offsety, 1, 1, 0xffffff, this.image_alpha);
            this.i = this.i + this.thickness;
        }
    } else {
        draw_self(this);
    }
  }
}
defineObject('obj_pink_ghost_marker', PinkGhostMarker);

// obj_idiot_text (default sprite None, depth 0)
class IdiotText extends Instance {
  constructor() {
    super();
    this.visible = false;
  }
  create() {
    this.timer = 0;
    this.con = 0;
    this.depth = - 999999;
  }
  draw() {
    let _idiot_text, _w;
    S.scr_84_set_draw_font("main");
    draw_set_halign(1);
    draw_set_valign(1);
    _idiot_text = S.stringsetloc("IDIOT!!!!!", "obj_idiot_text_slash_Draw_0_gml_5_0");
    if (i_ex('obj_date_controller') && i_ex('obj_pink_enemy') && O('obj_date_controller').questioncount == 2 && O('obj_pink_enemy').datecount == 1) {
        _idiot_text = S.stringsetloc("WRONG!!!!!", "obj_idiot_text_slash_Draw_0_gml_8_0");
    }
    _w = 2;
    if (this.con == 1) {
        draw_set_color(0xffffff);
        if (i_ex('obj_date_controller') && O('obj_date_controller').pinkportraitalpha2 != 0) {
            draw_set_color(merge_color(0x000000, 0x808080, 0.1));
        }
        draw_text_transformed(this.x - _w, this.y, _idiot_text, 2, 2, 0);
        draw_text_transformed(this.x - _w, this.y - _w, _idiot_text, 2, 2, 0);
        draw_text_transformed(this.x - _w, this.y + _w, _idiot_text, 2, 2, 0);
        draw_text_transformed(this.x + _w, this.y, _idiot_text, 2, 2, 0);
        draw_text_transformed(this.x + _w, this.y + _w, _idiot_text, 2, 2, 0);
        draw_text_transformed(this.x + _w, this.y - _w, _idiot_text, 2, 2, 0);
        draw_text_transformed(this.x, this.y + _w, _idiot_text, 2, 2, 0);
        draw_text_transformed(this.x, this.y - _w, _idiot_text, 2, 2, 0);
        draw_set_color(merge_color(0x000000, 0x808080, 0.1));
        if (i_ex('obj_date_controller') && O('obj_date_controller').pinkportraitalpha2 != 0) {
            draw_set_color(make_color_rgb(255, 138, 144));
        }
        draw_text_transformed(this.x, this.y, _idiot_text, 2, 2, 0);
    }
    if (this.con == 0) {
        draw_set_color(merge_color(0x000000, 0x808080, 0.1));
        draw_text_transformed(this.x - _w, this.y, _idiot_text, 2, 2, 0);
        draw_text_transformed(this.x - _w, this.y - _w, _idiot_text, 2, 2, 0);
        draw_text_transformed(this.x - _w, this.y + _w, _idiot_text, 2, 2, 0);
        draw_text_transformed(this.x + _w, this.y, _idiot_text, 2, 2, 0);
        draw_text_transformed(this.x + _w, this.y + _w, _idiot_text, 2, 2, 0);
        draw_text_transformed(this.x + _w, this.y - _w, _idiot_text, 2, 2, 0);
        draw_text_transformed(this.x, this.y + _w, _idiot_text, 2, 2, 0);
        draw_text_transformed(this.x, this.y - _w, _idiot_text, 2, 2, 0);
        draw_set_color(make_color_rgb(199, 185, 215));
        draw_text_transformed(this.x, this.y, _idiot_text, 2, 2, 0);
    }
    draw_set_halign(0);
    draw_set_valign(0);
  }
}
defineObject('obj_idiot_text', IdiotText);

// obj_gigaheart (default sprite spr_gigaheart, depth 0)
class Gigaheart extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gigaheart';
  }
  create() {
    this.timer = 0;
    this.timer2 = 15;
    this.timer3 = 0;
    this.con = 0;
    this.con2 = 0;
    this.con3 = 0;
    this.image_alpha = 0;
    this.whitealpha = 0;
    this.speed = 6.2;
    this.friction = 0.14;
    this.image_speed = 0.2;
    this.image_xscale = 2;
    this.image_yscale = 2;
    snd_play_x('snd_magicsprinkle', 0.4, 0.5);
    snd_play_x('snd_magicsprinkle', 0.4, 0.375);
    snd_play_x('snd_magicsprinkle', 0.4, 0.25);
    snd_play_x('snd_magicsprinkle', 0.4, 0.1888);
  }
  draw() {
    if (this.con == 0) {
        this.timer = this.timer + 1;
        if (this.timer < 21) {
            this.whitealpha = this.whitealpha + 0.05;
        }
        if (this.timer > 20 && this.timer < 36) {
            this.image_alpha = this.image_alpha + 0.1;
        }
        if (this.timer % 4 == 0) {
            this.afterimage = instance_create(this.x, this.y, 'obj_afterimage_fog');
            this.afterimage.sprite_index = this.sprite_index;
            this.afterimage.image_index = this.image_index;
            this.afterimage.image_blend = this.image_blend;
            this.afterimage.image_speed = 0;
            this.afterimage.depth = this.depth;
            this.afterimage.image_xscale = this.image_xscale;
            this.afterimage.image_yscale = this.image_yscale;
            this.afterimage.image_angle = this.image_angle;
            this.afterimage.image_alpha = this.whitealpha / 2;
            this.afterimage.type = 1;
        }
        this.timer2 = this.timer2 + 1;
        if (this.timer2 >= 8 && this.timer < 50) {
            instance_create(this.x - 130 + irandom(40), this.y - 100 + irandom(60), 'obj_gigaheart_particle');
            instance_create(this.x - 90 - irandom(40), this.y - 50 + irandom(100), 'obj_gigaheart_particle');
            instance_create(this.x - 30 - irandom(20), this.y + 120 - irandom(60), 'obj_gigaheart_particle');
            this.timer2 = 0;
        }
        if (this.timer > 60) {
            this.whitealpha = this.whitealpha - 0.4;
            if (this.whitealpha <= 0.2) {
                this.timer = 0;
                this.con = 1;
                this.image_xscale = 2.5;
                this.image_yscale = 2.5;
                snd_play_x('snd_explosion_mmx3', 0.6, 0.5);
                snd_play_x('snd_explosion_mmx3', 0.6, 0.375);
                scr_shakescreen(this);
            }
        }
    }
    this.image_xscale = lerp(this.image_xscale, 2, 0.4);
    this.image_yscale = lerp(this.image_yscale, 2, 0.4);
    if (this.con == 1) {
        this.timer = this.timer + 1;
        if (this.timer > 30) {
            this.image_alpha = this.image_alpha - 0.04;
            this.whitealpha = this.whitealpha - 0.01;
            if (this.image_alpha <= 0) {
                instance_destroy(this);
            }
        }
    }
    draw_self(this);
    gpu_set_fog(1, 16777215, 0, 0);
    draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.whitealpha);
    gpu_set_fog(0, 16777215, 0, 0);
  }
}
defineObject('obj_gigaheart', Gigaheart);

// obj_lovelyboy (default sprite None, depth 0)
class Lovelyboy extends Instance {
  create() {
    this.spotlight1_len = 150;
    this.spotlight1_angle = - 180;
    this.spotlight2_len = 150;
    this.spotlight2_angle = 180;
    this.timer = 0;
    this.ralseix = O('obj_heroralsei').x + 40;
    this.ralseiy = O('obj_heroralsei').y - 90;
    this.faster = false;
    this.spotlightmarker1 = instance_create(this.x, this.y, 'obj_marker');
    this.spotlightmarker1.sprite_index = 'spr_tenna_popularboy_spotlight';
    this.spotlightmarker1.image_speed = 0;
    this.spotlightmarker1.image_alpha = 0;
    this.spotlightmarker1.image_xscale = 2;
    this.spotlightmarker1.image_yscale = 2;
    this.spotlightmarker1.depth = O('obj_heroralsei').depth + 1;
    this.spotlightmarker2 = instance_create(this.x, this.y, 'obj_marker');
    this.spotlightmarker2.sprite_index = 'spr_tenna_popularboy_spotlight';
    this.spotlightmarker2.image_speed = 0;
    this.spotlightmarker2.image_alpha = 0;
    this.spotlightmarker2.image_xscale = 2;
    this.spotlightmarker2.image_yscale = 2;
    this.spotlightmarker2.depth = O('obj_heroralsei').depth + 1;
  }
  draw() {
    let alphaset;
    alphaset = 0;
    if (this.timer < 10) {
        alphaset = lerp(0, 1, this.timer / 10);
    } else {
        alphaset = 1;
    }
  }
  step() {
    let alphaset;
    this.timer = this.timer + 2;
    if (this.faster == 1 && this.timer < 30) {
        this.timer = 30;
    }
    if (this.faster == 0 && this.timer == 2) {
        snd_play('snd_drumroll', 1, 1.3);
    }
    if (this.timer <= 30) {
        this.spotlight1_len = lerp(100, 0, this.timer / 30);
        this.spotlight2_len = lerp(100, 0, this.timer / 30);
        this.spotlight1_angle = lerp(0, 180, this.timer / 30);
        this.spotlight2_angle = lerp(- 180, 0, this.timer / 30);
        if (this.faster == 1) {
            this.timer = 50;
        }
    }
    alphaset = 0;
    if (this.timer < 10) {
        alphaset = lerp(0, 1, this.timer / 10);
    } else {
        alphaset = 1;
    }
    this.spotlightmarker1.x = this.ralseix + lengthdir_x(this.spotlight1_len, this.spotlight1_angle);
    this.spotlightmarker1.y = this.ralseiy + lengthdir_y(this.spotlight1_len, this.spotlight1_angle);
    this.spotlightmarker1.image_alpha = 0.6 * alphaset;
    this.spotlightmarker2.x = this.ralseix + lengthdir_x(this.spotlight2_len, this.spotlight2_angle);
    this.spotlightmarker2.y = this.ralseiy + lengthdir_y(this.spotlight2_len, this.spotlight2_angle);
    this.spotlightmarker2.image_alpha = 0.6 * alphaset;
    if (this.timer == 50) {
        snd_play('snd_audience_aww');
        for (let _r234 = 0, _n234 = (26); _r234 < _n234; _r234++) {
            this.puff = instance_create(this.ralseix - 60 + irandom(80), this.ralseiy + 90 + irandom(100), 'obj_animation');
            this.puff.depth = this.depth - 1;
            this.puff.sprite_index = 'spr_susiezilla_houseexplosion';
            this.puff.image_speed = 0.5;
            this.puff.image_xscale = 1;
            this.puff.image_yscale = 1;
        }
        S.scr_battle_sprite_reset("ralsei");
        if (W('obj_heroralsei', function (other) {
            this.normalsprite = 'spr_gameshow_drowningRalsei_ralsei_origin_edit';
            this.idlesprite = 'spr_gameshow_drowningRalsei_ralsei_origin_edit';
            this.defendsprite = 'spr_gameshow_drowningRalsei_ralsei_origin_edit';
            this.hurtsprite = 'spr_gameshow_drowningRalsei_ralsei_origin_edit';
            this.attackreadysprite = 'spr_gameshow_drowningRalsei_ralsei_origin_edit';
            this.attacksprite = 'spr_gameshow_drowningRalsei_ralsei_origin_edit';
            this.itemsprite = 'spr_gameshow_drowningRalsei_ralsei_origin_edit';
            this.itemreadysprite = 'spr_gameshow_drowningRalsei_ralsei_origin_edit';
            this.spellreadysprite = 'spr_gameshow_drowningRalsei_ralsei_origin_edit';
            this.spellsprite = 'spr_gameshow_drowningRalsei_ralsei_origin_edit';
            this.defeatsprite = 'spr_gameshow_drowningRalsei_ralsei_origin_edit';
            this.victorysprite = 'spr_gameshow_drowningRalsei_ralsei_origin_edit';
            this.actreadysprite = 'spr_gameshow_drowningRalsei_ralsei_origin_edit';
            this.actsprite = 'spr_gameshow_drowningRalsei_ralsei_origin_edit';
        }, this) === EXIT) return;
        O('obj_pink_enemy').resetralsei = true;
        if (W('obj_tensionbar', function (other) {
            this.maxtensionlimitpercent = this.maxtensionlimitpercent + 14;
            this.maxtensionlimit = this.maxtensionlimit + 35;
            if (this.maxtensionlimitpercent > 100) {
                this.maxtensionlimitpercent = 100;
            }
            if (this.maxtensionlimit > 250) {
                this.maxtensionlimit = 250;
            }
        }, this) === EXIT) return;
    }
    if (this.timer >= 120 && !T(i_ex('obj_writer'))) {
        if (W(O('obj_pink_enemy').ralseiplushmarker, function (other) {
            scr_shakeobj(this);
        }, this) === EXIT) return;
        if (W(this.spotlightmarker1, function (other) {
            instance_destroy(this);
        }, this) === EXIT) return;
        if (W(this.spotlightmarker2, function (other) {
            instance_destroy(this);
        }, this) === EXIT) return;
        instance_destroy(this);
    }
  }
}
defineObject('obj_lovelyboy', Lovelyboy);

// obj_sharefood_act (default sprite spr_sparestar_anim, depth 0)
class SharefoodAct extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_sparestar_anim';
  }
  create() {
    this.timer = 0;
    this.itemnumber = 1;
    this.spd = 26;
    this.heartcount = 1;
    this.direction = 30;
    this.image_speed = 0.25;
    this.image_index = 0;
    this.image_xscale = 2.5;
    this.image_yscale = 2.5;
  }
  step() {
    if (this.image_index == 5) {
        if (this.image_angle == 0) {
            this.image_angle = 45;
        } else {
            this.image_angle = 0;
        }
        this.image_index = 0;
    }
    for (let _r35 = 0, _n35 = (this.spd); _r35 < _n35; _r35++) {
        this.x = this.x + lengthdir_x(1, this.direction);
        this.y = this.y + lengthdir_y(1, this.direction);
        this.inst = instance_create_depth(this.x + 1, this.y + 1, this.depth + 1, 'obj_sharefood_act_particle');
    }
    this.direction = this.direction - 4;
    this.timer = this.timer + 1;
    if (this.timer == 14) {
        if (W('obj_pink_enemy', function (other) {
            S.scr_dokiadd(this.myself, S.scr_item_to_doki(this.sharefood_item_number));
            this.ha = instance_create(this.x, this.y, 'obj_dokiheal_anim');
            this.ha.target = this;
            if (S.scr_item_to_doki(this.sharefood_item_number) == 0) {
                if (W('obj_pink_enemy', function (other) {
                    this.idlesprite = 'spr_pink_front_angry';
                    snd_play('snd_pink_throw2');
                    this.ha.heartcount = 0;
                }, this) === EXIT) return EXIT;
            }
            if (S.scr_item_to_doki(this.sharefood_item_number) == 1) {
                if (W('obj_pink_enemy', function (other) {
                    this.idlesprite = 'spr_pink_front_sweat';
                    snd_play('snd_pink_gasp');
                    this.ha.heartcount = 1;
                }, this) === EXIT) return EXIT;
            }
            if (S.scr_item_to_doki(this.sharefood_item_number) == 2) {
                if (W('obj_pink_enemy', function (other) {
                    this.idlesprite = 'spr_pink_front_sweat';
                    snd_play('snd_pink_gasp');
                    this.ha.heartcount = 2;
                }, this) === EXIT) return EXIT;
            }
            if (S.scr_item_to_doki(this.sharefood_item_number) == 3) {
                if (W('obj_pink_enemy', function (other) {
                    this.idlesprite = 'spr_pink_front_sweat';
                    snd_play('snd_pink_gasp');
                    this.ha.heartcount = 3;
                }, this) === EXIT) return EXIT;
            }
            if (S.scr_item_to_doki(this.sharefood_item_number) == 4) {
                this.ha.heartcount = 4;
            }
            if (S.scr_item_to_doki(this.sharefood_item_number) == 15) {
                this.ha.heartcount = 5;
            }
        }, this) === EXIT) return;
        instance_destroy(this);
    }
  }
}
defineObject('obj_sharefood_act', SharefoodAct);

// obj_shutupballoon (default sprite spr_battleblcon_long, depth 0)
class Shutupballoon extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_battleblcon_long';
  }
  create() {
    this.timer = 0;
    this.con = 0;
    this.depth = - 9999999;
  }
  draw() {
    let _x, _y, __x, __y;
    draw_set_color(0xffffff);
    draw_set_halign(1);
    draw_set_valign(1);
    S.scr_84_set_draw_font("mainbig");
    _x = - 2 + irandom(4);
    _y = - 2 + irandom(4);
    if (global.lang == "ja") {
        _x = irandom(2);
        __x = this.x - 86 + _x;
        __y = this.y + 0 + _y;
        draw_sprite_ext('spr_battleblcon_parts', 4, __x + 324, __y + 34, 1, 2, 0, 0xffffff, 1);
        draw_set_color(0xffffff);
        draw_rectangle(__x - 10, __y - 5, __x + 315, __y + 72 - 5, false);
        draw_rectangle(__x - 5, __y - 10, __x + 315 - 5, __y + 72, false);
        _x = _x + 6;
        _y = _y - 8;
    } else {
        draw_sprite_ext(this.sprite_index, 0, this.x - 90 + _x, this.y + _y, 2.3, 1, 0, 0xffffff, 1);
    }
    draw_set_color(0x000000);
    draw_text_transformed(this.x + 65 + _x, this.y + 43 + _y, S.stringsetloc("SHUT UP!!!", "obj_shutupballoon_slash_Draw_0_gml_10_0"), 2, 2, 0);
    draw_set_color(0xffffff);
    this.timer = this.timer + 1;
    if (this.timer == 30) {
        instance_destroy(this);
    }
    draw_set_halign(0);
    draw_set_valign(0);
  }
}
defineObject('obj_shutupballoon', Shutupballoon);

// obj_mewers_live (default sprite spr_pink_mewers_live, depth 0)
class MewersLive extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_pink_mewers_live';
  }
  create() {
    this.timer = 0;
    this.con = - 1;
    this.timer2 = 0;
    this.con2 = 0;
    this.image_xscale = 2;
    this.image_yscale = 2;
  }
  draw() {
    this.timer = this.timer + 1;
    if (global.flag[1914] == 0) {
        draw_sprite_ext(S.scr_84_get_sprite("spr_pink_mewers_live_dim"), 0, this.x, this.y + Math.sin(this.timer * 0.1), this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
        draw_sprite_ext(S.scr_84_get_sprite("spr_pink_mewers_live"), 0, this.x, this.y + Math.sin(this.timer * 0.1), this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, 0.6 + Math.sin(this.timer * 0.12) * 0.5);
    }
    if (global.flag[1914] == 1) {
        draw_sprite_ext(S.scr_84_get_sprite("spr_pink_mewers_live_dim_easy"), 0, this.x, this.y + Math.sin(this.timer * 0.1), this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
        draw_sprite_ext(S.scr_84_get_sprite("spr_pink_mewers_live"), 0, this.x, this.y + Math.sin(this.timer * 0.1), this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, 0.6 + Math.sin(this.timer * 0.12) * 0.5);
    }
    if (global.flag[1914] == 2) {
        draw_sprite_ext(S.scr_84_get_sprite("spr_pink_mewers_live_dim_hard"), 0, this.x, this.y + Math.sin(this.timer * 0.1), this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
        draw_sprite_ext(S.scr_84_get_sprite("spr_pink_mewers_live"), 0, this.x, this.y + Math.sin(this.timer * 0.1), this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, 0.6 + Math.sin(this.timer * 0.12) * 0.5);
    }
  }
}
defineObject('obj_mewers_live', MewersLive);

// obj_pink_dummy (default sprite None, depth 0)
class PinkDummy extends Instance {
  create() {
    this.timer = 0;
    this.con = 0;
    this.type = "bg";
    this.yoffset = 0;
    this.shakecon = 0;
    this.shaketimer = 0;
    this.wavecon = 0;
    this.wavetimer = 0;
    this.jumptimermax = 120;
    this.shocktimer = 0;
    this.glowstick_con = 0;
    this.glowstick_spd = 0;
    this.glowstick_timer = 0;
    this.glowstick_x = this.x;
    this.glowstick_y = this.y;
    this.glowstick_ystart = this.y;
    this.glowstick_angle = - 15 + irandom(30);
    this.init = false;
    this.image_speed = 0;
    this.camx = camerax();
    this.camwidth = camerawidth();
  }
  draw() {
    let _glowstick_index, _ang, _ang2;
    if (!T(i_ex('obj_pink_enemy'))) {
        return;
    }
    if (i_ex('obj_date_controller')) {
        return;
    }
    this.x = this.x - 2;
    if (this.shocktimer > 0) {
        this.shocktimer = this.shocktimer - 1;
        O('obj_pink_enemy').dummy_pattern = "shocked";
        O('obj_pink_enemy').dummy_pattern_timer = 118;
    }
    if (this.type == "bg") {
        if (this.x < this.camx - 110) {
            this.x = this.camx + this.camwidth + 60;
        }
        if (this.shocktimer > 0) {
            this.sprite_index = 'spr_pink_bg_dummy_shocked';
        } else {
            this.sprite_index = 'spr_pink_bg_dummy';
        }
        draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y + this.yoffset, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
        draw_sprite_ext('spr_pink_bg_dummy_glowstick', 0, this.glowstick_x, this.glowstick_y + this.yoffset, 2, 2, this.glowstick_angle + 20, 0xffffff, 1);
        this.glowstick_x = this.x + 8;
        if (O('obj_pink_enemy').dummy_pattern != "glowstick up and down") {
            this.glowstick_y = lerp(this.glowstick_y, this.glowstick_ystart, 0.3);
        }
        if (O('obj_pink_enemy').dummy_pattern == "every other jump") {
            this.glowstick_y = lerp(this.glowstick_y, this.y - 20, 0.3);
        }
        if (O('obj_pink_enemy').dummy_pattern == "wave") {
            this.glowstick_y = lerp(this.glowstick_y, this.y - 20, 0.3);
        }
    }
    if (this.type == "fg") {
        if (this.x < this.camx - 100 - 121) {
            this.x = this.camx + this.camwidth + 100;
        }
        if (this.shocktimer > 0) {
            this.sprite_index = 'spr_pink_fg_dummy_shocked';
        } else {
            this.sprite_index = 'spr_pink_fg_dummy';
        }
        if (this.x < this.camx + this.camwidth / 5) {
            this.image_index = 4;
        }
        if (this.x > this.camx + this.camwidth / 5 * 1 && this.x < this.camx + this.camwidth / 5 * 2) {
            this.image_index = 3;
        }
        if (this.x > this.camx + this.camwidth / 5 * 2 && this.x < this.camx + this.camwidth / 5 * 3) {
            this.image_index = 2;
        }
        if (this.x > this.camx + this.camwidth / 5 * 3 && this.x < this.camx + this.camwidth / 5 * 4) {
            this.image_index = 1;
        }
        if (this.x > this.camx + this.camwidth / 5 * 4) {
            this.image_index = 0;
        }
        _glowstick_index = 1;
        if (this.image_index == 4) {
            _glowstick_index = 0;
        }
        if (this.image_index == 3) {
            _glowstick_index = 0;
        }
        if (this.image_index == 1) {
            _glowstick_index = 2;
        }
        if (this.image_index == 0) {
            _glowstick_index = 2;
        }
        draw_sprite_ext('spr_pink_fg_dummy_hlowstick', _glowstick_index, this.glowstick_x, this.glowstick_y + this.yoffset, 2, 2, this.glowstick_angle, 0xffffff, 1);
        draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y + this.yoffset, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
        this.glowstick_x = this.x + 23;
        if (O('obj_pink_enemy').dummy_pattern != "glowstick up and down") {
            this.glowstick_y = lerp(this.glowstick_y, this.glowstick_ystart, 0.3);
        }
        if (O('obj_pink_enemy').dummy_pattern == "every other jump") {
            this.glowstick_y = lerp(this.glowstick_y, this.y + 20, 0.3);
        }
        if (O('obj_pink_enemy').dummy_pattern == "wave") {
            this.glowstick_y = lerp(this.glowstick_y, this.y + 20, 0.3);
        }
    }
    if (this.init == 0) {
        this.init = true;
        if (this.type == "bg") {
            this.glowstick_ystart = this.y - 20;
        }
        if (this.type == "fg") {
            this.glowstick_ystart = this.y + 20;
        }
    }
    if (O('obj_pink_enemy').dummy_pattern == "wave") {
        if (this.wavetimer < 0) {
            this.glowstick_angle = lerp(this.glowstick_angle, 0, 0.3);
        }
        this.wavetimer = this.wavetimer + 1;
        if (this.wavetimer > 60) {
            this.wavetimer = 0;
            this.vspeed = - 8;
            this.gravity = 1;
        }
        if (this.con == 0) {
            this.glowstick_angle = this.glowstick_angle + 9;
            if (this.glowstick_angle > 30) {
                this.con = 1;
            }
        } else if (this.con == 1) {
            this.glowstick_angle = this.glowstick_angle - 9;
            if (this.glowstick_angle < - 30) {
                this.con = 0;
            }
        }
    }
    if (O('obj_pink_enemy').dummy_pattern == "every other jump") {
        this.wavetimer = this.wavetimer + 1;
        if (this.wavetimer >= 30 && this.wavecon % 2 != 0) {
            this.wavetimer = 0;
            this.vspeed = - 8;
            this.gravity = 0.8;
        }
        if (this.wavetimer >= 45 && this.wavecon % 2 == 0) {
            this.wavetimer = 15;
            this.vspeed = - 8;
            this.gravity = 0.8;
        }
    }
    if (O('obj_pink_enemy').dummy_pattern == "glowstick wave") {
        this.wavetimer = this.wavetimer + 1;
        _ang = 0;
        _ang2 = 0;
        if (this.type == "bg") {
            _ang = 30;
        }
        if (this.wavetimer >= 20 && this.wavetimer < 40 && this.glowstick_angle > - 60 + _ang) {
            this.glowstick_angle = this.glowstick_angle - 10;
        }
        if (this.wavetimer >= 60 && this.wavetimer < 80 && this.glowstick_angle < 50 + _ang) {
            this.glowstick_angle = this.glowstick_angle + 10;
        }
        if (this.wavetimer >= 80) {
            this.wavetimer = 0;
        }
    }
    if (O('obj_pink_enemy').dummy_pattern == "glowstick up and down") {
        this.wavetimer = this.wavetimer + 1;
        if (this.type == "bg" && this.wavetimer < 10) {
            this.glowstick_y = lerp(this.glowstick_y, this.glowstick_ystart, 0.3);
        }
        if (this.type == "fg" && this.wavetimer < 10) {
            this.glowstick_y = lerp(this.glowstick_y, this.glowstick_ystart + 24, 0.3);
        }
        if (this.type == "bg") {
            this.glowstick_angle = lerp(this.glowstick_angle, 10, 0.3);
        }
        if (this.type == "fg") {
            this.glowstick_angle = lerp(this.glowstick_angle, 0, 0.3);
        }
        if (this.type == "bg") {
            if (this.wavetimer >= 10 && this.wavetimer < 15) {
                this.glowstick_y = this.glowstick_y - 3;
            }
            if (this.wavetimer >= 15 && this.wavetimer < 20) {
                this.glowstick_y = this.glowstick_y + 3;
            }
            if (this.wavetimer >= 20 && this.wavetimer < 25) {
                this.glowstick_y = this.glowstick_y - 3;
            }
            if (this.wavetimer >= 25 && this.wavetimer < 30) {
                this.glowstick_y = this.glowstick_y + 3;
            }
            if (this.wavetimer >= 30) {
                this.wavetimer = - 14;
            }
        }
        if (this.type == "fg") {
            if (this.wavetimer >= 10 && this.wavetimer < 15) {
                this.glowstick_y = this.glowstick_y - 8;
            }
            if (this.wavetimer >= 15 && this.wavetimer < 20) {
                this.glowstick_y = this.glowstick_y + 8;
            }
            if (this.wavetimer >= 20 && this.wavetimer < 25) {
                this.glowstick_y = this.glowstick_y - 8;
            }
            if (this.wavetimer >= 25 && this.wavetimer < 30) {
                this.glowstick_y = this.glowstick_y + 8;
            }
            if (this.wavetimer >= 30) {
                this.wavetimer = - 14;
            }
        }
    }
    if (this.y + this.vspeed > this.ystart) {
        this.vspeed = 0;
        this.gravity = 0;
        this.y = this.ystart;
    }
  }
}
defineObject('obj_pink_dummy', PinkDummy);

// obj_purple_tea (default sprite spr_muffet_purple, depth 0)
class PurpleTea extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_muffet_purple';
  }
  create() {
    this.timer = 0;
    this.con = 0;
    this.image_xscale = 0.1;
    this.image_yscale = 0.1;
    this.image_alpha = 1;
    this.direction = 230;
    this.speed = 8;
    this.visible = true;
  }
  step() {
    for (let _r4 = 0, _n4 = (2); _r4 < _n4; _r4++) {
        if (this.image_xscale < 1) {
            this.image_xscale = this.image_xscale + 0.05;
        }
        if (this.image_yscale < 1) {
            this.image_yscale = this.image_yscale + 0.05;
        }
        if (this.direction < 305) {
            this.direction = this.direction + 1.5;
        }
        this.image_angle = this.direction - 270;
        if (i_ex('obj_heart')) {
            this.depth = O('obj_heart').depth - 1;
        }
        if (i_ex('obj_growtangle') && this.y > O('obj_growtangle').y + 60) {
            instance_destroy(this);
        }
    }
  }
}
defineObject('obj_purple_tea', PurpleTea);

// obj_ghostburst (default sprite spr_ghostburst_outline, depth 0)
class Ghostburst extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_ghostburst_outline';
  }
  create() {
    this.burst = 0;
  }
  draw() {
    this.burst = this.burst + 1;
    draw_sprite_ext('spr_ghostburst_outline', 0, this.xstart + 9, this.ystart + 9, 0.6 + this.burst, 1 + this.burst / 2, 0, 0xffffff, 0.8 - this.burst / 12);
    draw_sprite_ext('spr_ghostburst_outline', 0, this.xstart + 9, this.ystart + 9, 0.6 + this.burst / 1.5, 1 + this.burst / 3, 0, 0xffffff, 1 - this.burst / 12);
    draw_sprite_ext('spr_ghostburst_outline', 0, this.xstart + 9, this.ystart + 9, 0.6 + this.burst / 2.5, 1 + this.burst / 5, 0, 0xffffff, 1.2 - this.burst / 12);
    if (this.burst > 20) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_ghostburst', Ghostburst);

// obj_marker_doomed (default sprite None, depth 0)
class MarkerDoomed extends Instance {
  alarm0() {
    instance_destroy(this);
  }
}
defineObject('obj_marker_doomed', MarkerDoomed);

// obj_heartmarker (default sprite spr_diamondbullet_form, depth 0)
class Heartmarker extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_diamondbullet_form';
    this.visible = false;
  }
}
defineObject('obj_heartmarker', Heartmarker);

// obj_pink_spotlight (default sprite None, depth 0)
class PinkSpotlight extends Instance {
}
defineObject('obj_pink_spotlight', PinkSpotlight);

// obj_animation (default sprite None, depth 0)
class Animation extends Instance {
  animationEnd() {
    instance_destroy(this);
  }
}
defineObject('obj_animation', Animation);

// obj_afterimage_fog (default sprite None, depth 0)
class AfterimageFog extends Instance {
  create() {
    this.fadeSpeed = 0.04;
    this.parentid = - 1;
    this.type = 0;
    this.alpha = 0;
    this.con = 0;
  }
  draw() {
    if (this.type == 0) {
        draw_self(this);
        d3d_set_fog(true, 0xffffff, 0, 1);
        draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha / 3);
        d3d_set_fog(false, 0x000000, 0, 0);
    } else {
        d3d_set_fog(true, 0xffffff, 0, 1);
        draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
        d3d_set_fog(false, 0x000000, 0, 0);
    }
  }
  step() {
    this.image_alpha = this.image_alpha - this.fadeSpeed;
    if (this.image_alpha < 0) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_afterimage_fog', AfterimageFog);

// obj_afterimage_line (default sprite None, depth 0)
class AfterimageLine extends Instance {
  create() {
    this.fadeSpeed = 0.1;
    this.parentid = - 1;
    this.x2 = this.x;
    this.y2 = this.y;
  }
  draw() {
    draw_set_alpha(this.image_alpha);
    draw_set_color(0x00ff00);
    S.d_line(this.x, this.y, this.x2, this.y2);
    draw_set_color(0xffffff);
    draw_set_alpha(1);
  }
  step() {
    this.image_alpha = this.image_alpha - this.fadeSpeed;
    if (this.image_alpha < 0) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_afterimage_line', AfterimageLine);

// obj_dokiheal_anim (default sprite spr_sparestar_anim, depth 0)
class DokihealAnim extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_sparestar_anim';
    this.visible = false;
  }
  create() {
    this.target = 42894289;
    this.starcount = 0;
    this.t = 0;
    this.particlesprite = 'spr_kissheart';
    this.particlecolor = 0x00ff00;
    this.heartcount = 4;
    if (i_ex('obj_pink_enemy')) {
        this.particlecolor = O('obj_pink_enemy').c_pink;
    }
  }
  step() {
    this.t = this.t + 1;
    if (i_ex(this.target)) {
        if (this.t == 1) {
            this.x = this.target.x;
            this.y = this.target.y;
            this.image_xscale = this.target.image_xscale;
            this.image_yscale = this.target.image_yscale;
            this.sprite_index = this.target.sprite_index;
            this.sw = this.sprite_width;
            this.sh = this.sprite_height;
            if (W(this.target, function (other) {
                this.inst = S.scr_oflash(this);
                this.inst.sprite_index = 'spr_pink_front_sweat';
            }, this) === EXIT) return;
        }
        if (this.t >= 1 && this.heartcount > 0) {
            this.heartcount = this.heartcount - 1;
            this.i = 0;
            while ((this.i < 2) && LOOP('DokihealAnim#3')) {
                this.star ??= []; this.star[this.starcount] = instance_create(this.x + random(this.sw), this.y + random(this.sh), 'obj_marker');
                if (W(this.star[this.starcount], function (other) {
                    this.image_angle = random(360);
                    this.depth = - 10;
                    this.image_xscale = 2;
                    this.image_yscale = 2;
                    this.image_alpha = 2;
                    this.image_speed = 0.25;
                    this.hspeed = 2 - random(2);
                    this.vspeed = - 3 - random(2);
                    this.friction = 0.2;
                }, this) === EXIT) return;
                this.star[this.starcount].sprite_index = this.particlesprite;
                this.star[this.starcount].image_blend = this.particlecolor;
                this.starcount = this.starcount + 1;
                this.i = this.i + 1;
            }
        }
        if (this.t >= 5 && this.t <= 30) {
            this.i = 0;
            while ((this.i < this.starcount) && LOOP('DokihealAnim#4')) {
                if (W(this.star[this.i], function (other) {
                    this.image_angle = this.image_angle - 10;
                    this.image_alpha = this.image_alpha - 0.1;
                    if (this.image_alpha <= 0) {
                        instance_destroy(this);
                    }
                }, this) === EXIT) return;
                this.i = this.i + 1;
            }
            if (this.t >= 30) {
                instance_destroy(this);
            }
        }
    } else {
        this.i = 0;
        while ((this.i < this.starcount) && LOOP('DokihealAnim#5')) {
            if (W(this.star[this.i], function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            this.i = this.i + 1;
        }
        instance_destroy(this);
    }
  }
}
defineObject('obj_dokiheal_anim', DokihealAnim);

// obj_gigaheart_particle (default sprite spr_circle_7x7, depth 0)
class GigaheartParticle extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_circle_7x7';
  }
  create() {
    this.timer = 0;
    this.timer2 = 0;
    this.timer3 = 0;
    this.con = 0;
    this.con2 = 0;
    this.con3 = 0;
    this.extra = 0;
    if (i_ex('obj_gigaheart')) {
        this.extra = 1.6;
    }
    this.extra2 = 0;
    this.image_alpha = 1;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.image_index = 0;
    this.image_blend = make_color_rgb(255, 138, 144);
    this.direction = 180;
    this.speed = 1;
    this.friction = 0;
  }
  draw() {
    draw_self(this);
    if (this.extra > 0) {
        this.extra = this.extra - 0.2;
    } else {
        this.image_alpha = this.image_alpha - 0.05;
        if (this.image_alpha <= 0) {
            instance_destroy(this);
        }
    }
    gpu_set_fog(1, 16777215, 0, 0);
    draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.extra);
    gpu_set_fog(0, 16777215, 0, 0);
    this.timer3 = this.timer3 + 1;
    this.image_xscale = 2 + Math.sin(this.timer3 * 0.4) * 0.4;
    this.image_yscale = 2 + Math.sin(this.timer3 * 0.4) * 0.4;
  }
}
defineObject('obj_gigaheart_particle', GigaheartParticle);

// obj_sharefood_act_particle (default sprite spr_whitepx, depth 0)
class SharefoodActParticle extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_whitepx';
  }
  create() {
    this.timer = 0;
    this.sprite_index = 'spr_sneo_bigcircle';
    this.image_xscale = 0.15;
    this.image_yscale = 0.15;
  }
  step() {
    this.image_xscale = this.image_xscale - 0.03;
    this.image_yscale = this.image_yscale - 0.03;
    if (this.image_xscale < 0.04) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_sharefood_act_particle', SharefoodActParticle);

