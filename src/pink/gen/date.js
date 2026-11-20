// The DATE at DOKI MAX (obj_date_controller) and its hearts and smoke (machine-translated from the Chapter 5 GML by tools/gen_pink.sh; edit tools/postfix.py, not this file)
/* eslint-disable */
import {
  Instance, S, application_surface, button1_h, button3_h, choose, defineObject, draw_clear, draw_primitive_begin, draw_primitive_end, draw_self, draw_set_alpha, draw_set_color, draw_set_font, draw_set_halign, draw_set_valign, draw_sprite_ext, draw_sprite_part_ext, draw_surface, draw_surface_ext, draw_surface_part, draw_text, draw_text_ext, draw_text_ext_transformed, draw_text_transformed_color, draw_vertex_color, global, gpu_set_blendmode, gpu_set_fog, instance_create, instance_create_depth, instance_destroy, irandom, irandom_range, left_h, lengthdir_x, lerp, make_color_hsv, make_color_rgb, merge_color, mus_loop, mus_volume, random, right_h, round, snd_free_all, snd_init, snd_loop, snd_play, snd_stop, snd_volume, sprite_set_offset, string_char_at, string_copy, string_length, string_width, surface_create, surface_exists, surface_free, surface_get_height, surface_get_width, surface_reset_target, surface_set_target, up_h,
} from '../rt.js?v=20261120125011';
import {
  cameraheight, camerawidth, camerax, cameray, i_ex, room_height, room_width, scr_approach, scr_lerpvar, scr_shakescreen, snd_play_x,
} from '../common.js?v=20261120125011';
import {
  AF, EXIT, LOOP, O, OI, T, VIEW_WPORT, W,
} from '../gml.js?v=20261120125011';

// obj_date_controller (default sprite None, depth 0)
class DateController extends Instance {
  cleanUp() {
    if (i_ex('obj_pink_enemy') && O('obj_pink_enemy').datecount == 2) {
        if (W('obj_heroralsei', function (other) {
            this.defeatsprite = 'spr_ralsei_kneel';
        }, this) === EXIT) return;
    }
    if (surface_exists(this.surface1)) {
        surface_free(this.surface1);
    }
    if (surface_exists(this.surface2)) {
        surface_free(this.surface2);
    }
    snd_stop('snd_rumble');
    if (global.turntimer > 1) {
        global.turntimer = 1;
    }
    if (W('obj_pink_enemy', function (other) {
        if (this.datecount == 3) {
            this.phase4introcon = 1;
        }
    }, this) === EXIT) return;
    if (this.minigame_won == 1) {
        if (W('obj_tensionbar', function (other) {
            if (i_ex('obj_pink_enemy') && O('obj_pink_enemy').datecount != 3) {
                this.maxtensionlimitpercent = 8;
                this.maxtensionlimit = 20;
                global.tension = 0;
                this.current = 0;
                this.apparent = 0;
            }
        }, this) === EXIT) return;
        if (W('obj_pink_enemy', function (other) {
            this.firstphaseturn = 1;
            if (this.datecount == 1) {
                global.tempflag ??= []; AF(global.tempflag, 67); global.tempflag[67] = 1;
            }
            if (this.datecount == 2) {
                global.tempflag ??= []; AF(global.tempflag, 68); global.tempflag[68] = 1;
            }
            if (this.datecount == 3) {
                global.tempflag ??= []; AF(global.tempflag, 69); global.tempflag[69] = 1;
            }
        }, this) === EXIT) return;
    }
  }
  create() {
    let ___r, i, _text_xscale, _text_yscale;
    this.timer = 0;
    this.con = 0;
    this.finalattackcon = 0;
    this.questioncount = 0;
    this.questioncorrectcount = 0;
    this.questiondowntime = 20;
    if (O('obj_pink_enemy').datecount > 1) {
        this.questiondowntime = 10;
    }
    if (O('obj_pink_enemy').datecount == 4) {
        snd_volume('snd_pink_stretch_2_fixed', 0, 90);
    }
    this.rr = 0;
    this.r = 0;
    this.camx = camerax();
    this.camy = cameray();
    this.camwidth = camerawidth();
    this.camheight = cameraheight();
    this.date1question_number = - 1;
    this.date2question_number = - 1;
    this.question_count = 0;
    this.date_text_char_number = 0;
    this.date_text2_char_number = 0;
    this.can_skip_timer = 0;
    this.heartspeed = 30;
    this.heartpathpos = 0;
    this.heartpathposmax = 100;
    this.c = 100;
    this.pathselected = - 1;
    this.sideselected = - 1;
    this.onthispath = - 1;
    this.hearthealth = 3;
    this.heartcount = 14;
    this.heartstatus ??= []; AF(this.heartstatus, this.heartcount); this.heartstatus[this.heartcount] = 0;
    this.date4darknessalpha = 0;
    this.portraittextscale = 1;
    this.drawn_box_x ??= []; AF(this.drawn_box_x, 20); this.drawn_box_x[20] = 0;
    ___r = 0;
    for (let _r185 = 0, _n185 = Math.trunc(20); _r185 < _n185; _r185++) {
        this.drawn_box_y ??= []; AF(this.drawn_box_y, ___r); this.drawn_box_y[___r] = cameray() + 285;
        ___r = ___r + 1;
    }
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 0); this.drawn_box_text[0] = "test 0";
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 1); this.drawn_box_text[1] = "test 1";
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 2); this.drawn_box_text[2] = "test 2";
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 3); this.drawn_box_text[3] = "test 3";
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 4); this.drawn_box_text[4] = "test 4";
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 5); this.drawn_box_text[5] = "test 5";
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 6); this.drawn_box_text[6] = "test 6";
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 20); this.drawn_box_text[20] = "";
    this.drawn_box_x_offset = 0;
    this.draw_box_selected = 0;
    this.draw_box_selected_real = 0;
    this.draw_box_con = 0;
    this.draw_box_timer = 0;
    this.arrow_siner = 0;
    this.portrait_change_timer = 14;
    this.portrait_change_timer_max = 15;
    this.boxcount = 4;
    if (O('obj_pink_enemy').datecount > 1) {
        this.boxcount = 3;
    }
    this.ghost_fade_con = 0;
    this.ghost_fade_siner = 0;
    this.rand_array ??= []; AF(this.rand_array, 0); this.rand_array[0] = 0;
    this.rand_array ??= []; AF(this.rand_array, 1); this.rand_array[1] = 1;
    this.rand_array ??= []; AF(this.rand_array, 2); this.rand_array[2] = 2;
    this.rand_array ??= []; AF(this.rand_array, 3); this.rand_array[3] = 3;
    this.portrait1_talkspeed = 0.16666666666666666;
    this.portrait2_talkspeed = 0.16666666666666666;
    this.r = 3;
    if (O('obj_pink_enemy').datecount > 1) {
        this.r = 2;
    }
    i = 0;
    while ((i < this.r) && LOOP('DateController#1')) {
        this.j = irandom_range(i, this.r);
        this.temp = this.rand_array[i];
        this.rand_array ??= []; AF(this.rand_array, i); this.rand_array[i] = this.rand_array[this.j];
        this.rand_array ??= []; AF(this.rand_array, this.j); this.rand_array[this.j] = this.temp;
        i = i + 1;
    }
    this.dateorder ??= []; AF(this.dateorder, 0); this.dateorder[0] = 0;
    i = 0;
    while ((i < this.r) && LOOP('DateController#2')) {
        this.j = irandom_range(i, this.r);
        this.temp = this.rand_array[i];
        this.rand_array ??= []; AF(this.rand_array, i); this.rand_array[i] = this.rand_array[this.j];
        this.rand_array ??= []; AF(this.rand_array, this.j); this.rand_array[this.j] = this.temp;
        i = i + 1;
    }
    this.questiontext = "";
    this.questiontext2 = "";
    this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("Yes", "obj_date_controller_slash_Other_11_gml_29_0");
    this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("Yes", "obj_date_controller_slash_Other_11_gml_29_0");
    this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("Yes", "obj_date_controller_slash_Other_11_gml_29_0");
    this.choicetext ??= []; this.choicetext[this.rand_array[3]] = S.stringsetloc("Yes", "obj_date_controller_slash_Other_11_gml_29_0");
    this.choicetext ??= []; AF(this.choicetext, 4); this.choicetext[4] = "";
    this.choicetext ??= []; AF(this.choicetext, 5); this.choicetext[5] = "";
    this.choicetext ??= []; AF(this.choicetext, 6); this.choicetext[6] = "";
    this.choicetext ??= []; AF(this.choicetext, 7); this.choicetext[7] = "";
    this.choicetext ??= []; AF(this.choicetext, 8); this.choicetext[8] = "";
    this.choicetext ??= []; AF(this.choicetext, 9); this.choicetext[9] = "";
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 0); this.drawn_box_text[0] = this.choicetext[0];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 1); this.drawn_box_text[1] = this.choicetext[1];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 2); this.drawn_box_text[2] = this.choicetext[2];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 3); this.drawn_box_text[3] = this.choicetext[3];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 4); this.drawn_box_text[4] = this.choicetext[4];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 5); this.drawn_box_text[5] = this.choicetext[5];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 6); this.drawn_box_text[6] = this.choicetext[6];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 7); this.drawn_box_text[7] = this.choicetext[7];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 8); this.drawn_box_text[8] = this.choicetext[8];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 9); this.drawn_box_text[9] = this.choicetext[9];
    _text_xscale = 3;
    _text_yscale = 3;
    if (global.lang == "ja") {
        _text_xscale = 1;
    }
    this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = _text_xscale;
    this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = _text_xscale;
    this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = _text_xscale;
    this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[3]] = _text_xscale;
    this.choicetextxscale ??= []; AF(this.choicetextxscale, 4); this.choicetextxscale[4] = _text_xscale;
    this.choicetextxscale ??= []; AF(this.choicetextxscale, 5); this.choicetextxscale[5] = _text_xscale;
    this.choicetextxscale ??= []; AF(this.choicetextxscale, 6); this.choicetextxscale[6] = _text_xscale;
    this.choicetextxscale ??= []; AF(this.choicetextxscale, 7); this.choicetextxscale[7] = _text_xscale;
    this.choicetextxscale ??= []; AF(this.choicetextxscale, 8); this.choicetextxscale[8] = _text_xscale;
    this.choicetextxscale ??= []; AF(this.choicetextxscale, 9); this.choicetextxscale[9] = _text_xscale;
    this.choicetextxscale ??= []; AF(this.choicetextxscale, 10); this.choicetextxscale[10] = _text_xscale;
    this.choicetextxscale ??= []; AF(this.choicetextxscale, 11); this.choicetextxscale[11] = _text_xscale;
    this.choicetextxscale ??= []; AF(this.choicetextxscale, 12); this.choicetextxscale[12] = _text_xscale;
    this.choicetextxscale ??= []; AF(this.choicetextxscale, 13); this.choicetextxscale[13] = _text_xscale;
    this.choicetextxscale ??= []; AF(this.choicetextxscale, 14); this.choicetextxscale[14] = _text_xscale;
    this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[0]] = _text_xscale;
    this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[1]] = _text_xscale;
    this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[2]] = _text_xscale;
    this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[3]] = _text_xscale;
    this.choicetextyscale ??= []; AF(this.choicetextyscale, 4); this.choicetextyscale[4] = _text_xscale;
    this.choicetextyscale ??= []; AF(this.choicetextyscale, 5); this.choicetextyscale[5] = _text_xscale;
    this.choicetextyscale ??= []; AF(this.choicetextyscale, 6); this.choicetextyscale[6] = _text_xscale;
    this.choicetextyscale ??= []; AF(this.choicetextyscale, 7); this.choicetextyscale[7] = _text_xscale;
    this.choicetextyscale ??= []; AF(this.choicetextyscale, 8); this.choicetextyscale[8] = _text_xscale;
    this.choicetextyscale ??= []; AF(this.choicetextyscale, 9); this.choicetextyscale[9] = _text_xscale;
    this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 1;
    this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 1;
    this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 1;
    this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[3]] = 1;
    this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 4); this.choiceiscorrect[4] = 1;
    this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 5); this.choiceiscorrect[5] = 1;
    this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 6); this.choiceiscorrect[6] = 1;
    this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 7); this.choiceiscorrect[7] = 1;
    this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 8); this.choiceiscorrect[8] = 1;
    this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 9); this.choiceiscorrect[9] = 1;
    this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 10); this.choiceiscorrect[10] = 1;
    this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 11); this.choiceiscorrect[11] = 1;
    this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 12); this.choiceiscorrect[12] = 1;
    this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 13); this.choiceiscorrect[13] = 1;
    this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 14); this.choiceiscorrect[14] = 1;
    this.show_intro_outro_surfaces = true;
    this.intro_outro_surfaces_whiteness_alpha = 1;
    this.choicepath0 = S.path_add();
    S.path_set_closed(this.choicepath0, false);
    S.path_add_point(this.choicepath0, camerax() + 315, cameray() + 360, 100);
    S.path_add_point(this.choicepath0, camerax() + 315, cameray() + 340, 100);
    S.path_add_point(this.choicepath0, camerax() + 270, cameray() + 325, 100);
    this.drawnchoicepath0 = S.path_add();
    S.path_set_closed(this.drawnchoicepath0, false);
    S.path_add_point(this.drawnchoicepath0, camerax() + 315, cameray() + 360, 100);
    S.path_add_point(this.drawnchoicepath0, camerax() + 315, cameray() + 340, 100);
    S.path_add_point(this.drawnchoicepath0, camerax() + 290, cameray() + 325, 100);
    this.choicepath1 = S.path_add();
    S.path_set_closed(this.choicepath1, false);
    S.path_add_point(this.choicepath1, camerax() + 315, cameray() + 360, 100);
    S.path_add_point(this.choicepath1, camerax() + 155, cameray() + 360, 100);
    this.drawnchoicepath1 = S.path_add();
    S.path_set_closed(this.drawnchoicepath1, false);
    S.path_add_point(this.drawnchoicepath1, camerax() + 315, cameray() + 360, 100);
    S.path_add_point(this.drawnchoicepath1, camerax() + 167, cameray() + 360, 100);
    this.choicepath2 = S.path_add();
    S.path_set_closed(this.choicepath2, false);
    S.path_add_point(this.choicepath2, camerax() + 315, cameray() + 360, 100);
    S.path_add_point(this.choicepath2, camerax() + 315, cameray() + 380, 100);
    S.path_add_point(this.choicepath2, camerax() + 350, cameray() + 390, 100);
    this.drawnchoicepath2 = S.path_add();
    S.path_set_closed(this.drawnchoicepath2, false);
    S.path_add_point(this.drawnchoicepath2, camerax() + 315, cameray() + 360, 100);
    S.path_add_point(this.drawnchoicepath2, camerax() + 315, cameray() + 380, 100);
    S.path_add_point(this.drawnchoicepath2, camerax() + 340, cameray() + 390, 100);
    this.choicepath3 = S.path_add();
    S.path_set_closed(this.choicepath3, false);
    S.path_add_point(this.choicepath3, camerax() + 315, cameray() + 360, 100);
    S.path_add_point(this.choicepath3, camerax() + 470, cameray() + 360, 100);
    this.drawnchoicepath3 = S.path_add();
    S.path_set_closed(this.drawnchoicepath3, false);
    S.path_add_point(this.drawnchoicepath3, camerax() + 315, cameray() + 360, 100);
    S.path_add_point(this.drawnchoicepath3, camerax() + 455, cameray() + 360, 100);
    this.choiceselected = - 1;
    this.datetimeleft = 240;
    this.datetimeleftmax = this.datetimeleft;
    this.stoptimer = true;
    this.havent_moved_left_or_right = true;
    sprite_set_offset('spr_pinkspeaker_shocked_origin_adjusted', 26, 10);
    this.pinkportrait = 'spr_pinkspeaker_shocked_origin_adjusted';
    this.pinkportrait2 = 'spr_pinkghost_angry';
    if (O('obj_pink_enemy').datecount == 2) {
        this.pinkportrait = 'spr_pinkspeaker_talk_happy';
    }
    if (O('obj_pink_enemy').datecount == 2) {
        this.pinkportrait2 = 'spr_pinkspeaker_angry';
    }
    if (O('obj_pink_enemy').datecount == 3) {
        this.pinkportrait = 'spr_pinkspeaker_clutch';
    }
    if (O('obj_pink_enemy').datecount > 3) {
        this.pinkportrait = 'spr_pinkspeaker_date4_idle';
        this.pinkportrait2 = 'spr_pinkghost_concerned';
    }
    sprite_set_offset('spr_pinkspeaker_date4_idle', 2, 0);
    sprite_set_offset('spr_pinkspeaker_date4_questionright', 2, 0);
    sprite_set_offset('spr_pinkghost_date4_1', 1, 0);
    sprite_set_offset('spr_pinkghost_date4_2', 2, 0);
    sprite_set_offset('spr_pinkghost_date4_3', - 3, 0);
    this.eyeshaft_x = 0;
    this.eyeshaft_alpha = 0;
    this.date3_success_con = 0;
    this.date3_success_timer = 0;
    this.difficulty_prev = 0;
    this.eye_shaft_blend = 0xffffff;
    this.changecolortimer = 0x000000;
    this.changecolorcon = 0x000000;
    this.changecolorcount = 0x000000;
    this.colortarget = 0xffffff;
    this.colortarget2 = 0xffffff;
    this.changecolorcon2 = 0x000000;
    this.changecolortimer2 = 0x000000;
    this.pinkportrait_x = 210;
    this.portraitflash_timer = 0;
    this.portrait2flash_timer = 0;
    this.pinkportrait_y = 40;
    this.pinkportrait2_x = 210;
    this.pinkportrait2_y = 40;
    this.portraitshakecon = 0;
    this.portraitshakecon2 = 0;
    this.portraitshaketimer = 0;
    this.portraitshaketimer2 = 0;
    this.portraitvisibility = true;
    this.portrait2visibility = true;
    this.idiottext_x = 0;
    this.idiottext_y = 0;
    this.idiottext2_x = 0;
    this.idiottext2_y = 0;
    this.idiot1 = - 1;
    this.idiot2 = - 1;
    if (i_ex('obj_pink_enemy')) {
        this.idiot1 = O('obj_pink_enemy').idiot1;
        this.idiot2 = O('obj_pink_enemy').idiot2;
    }
    this.pinkindex = 0;
    this.pinkindex2 = 0;
    this.tailindex = 0;
    this.tailindex2 = 0;
    this.sweatindex = 0;
    this.sweatindex2 = 0;
    this.sweatcon = 0;
    this.sweatcon2 = 0;
    this.sweattimer = 0;
    this.sweattimer2 = 0;
    this.portrait_xscale = 2;
    this.portrait2_xscale = 2;
    this.portraitscon = 0;
    this.portraitstimer = 0;
    this.talktimer = 0;
    this.talktimer2 = 0;
    this.heart_x = 319;
    this.heart_y = 385;
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
    this.bgrectangle1color = this.lightpurple;
    this.bgrectangle2color = this.medpurple;
    this.dialogueboxcolor = this.darkpurple;
    this.dialogueboxghostcolor = this.lightpurple;
    this.choiceselectioncolor = this.darkestpurple;
    this.bgrectangle1colorstart = this.bgrectangle1color;
    this.bgrectangle2colorstart = this.bgrectangle2color;
    this.dialogueboxcolorstart = this.dialogueboxcolor;
    this.dialogueboxghostcolorstart = this.dialogueboxghostcolor;
    this.choiceselectioncolorstart = this.choiceselectioncolor;
    this.diamondbg_alpha_current = 0;
    this.diamondbg_alpha = 0;
    this.diamondbg_red_alpha = 0;
    this.mode = 0;
    this.fevermodequestioncount = 1;
    this.fevermodequestionlength = 3;
    this.questionstofevermode = 3;
    this.date1rand = choose(1, 2, 3, 4);
    this.date1randdir = choose(- 1, 1);
    this.boxalphacon = 0;
    this.boxalpha = 1;
    this.minigame_won = false;
    this.minigame_con = 0;
    this.minigame_won_alpha = 0;
    this.date3darkner_alpha = 0;
    this.date3darkner_con = 0;
    this.date3darkner_timer = 0;
    snd_loop('snd_rumble');
    if (O('obj_pink_enemy').datecount == 3) {
        this.heart = instance_create(this.heart_x, this.heart_y - 1, 'obj_date_heart');
    } else {
        this.heart = instance_create(this.heart_x, this.heart_y, 'obj_date_heart');
    }
    this.heart.depth = this.depth - 300;
    this.bugfix_depth_con = 0;
    this.bg_speed = 1;
    this.bg_speed_y = 1;
    this.bg_speed_max = 1;
    this.bg_speed_y_max = 1;
    this.first_text = "";
    this.second_text = "";
    this.multi_color_text_con = 0x000000;
    this.multi_color_text_timer = 0x000000;
    this.show_circle1 = 0;
    this.show_circle1timer = 0;
    this.show_circle2 = 0;
    this.show_circle2timer = 0;
    this.surface1 = - 4;
    this.surface2 = - 4;
    this.surface1_x = camerax() - 320;
    this.surface2_x = camerax() + 640;
    this.pinkportraitalpha = 0;
    this.pinkportraitalpha2 = 0;
    this.shaketext_x = 0;
    this.shakeportrait_x = 0;
    this.shakeportrait_strength = 0;
    this.grav = - 8;
    if (O('obj_pink_enemy').datecount == 4) {
        this.pinkportrait = 'spr_pinkspeaker_date4_idle';
        this.pinkportrait2 = 'spr_pinkghost_sad';
        S.mus_fade(global.batmusic[1], 30);
        this.portrait2_xscale = - 2;
        this.pinkportrait_x = 200;
        this.pinkportrait2_x = 414;
        this.pinkportraitalpha2 = 0;
    }
    this.saveportrait1 = this.pinkportrait;
    this.saveportrait2 = this.pinkportrait2;
    this.surface2x ??= []; AF(this.surface2x, 0); this.surface2x[0] = 0;
    this.surface2x ??= []; AF(this.surface2x, 1); this.surface2x[1] = 0;
    this.surface2x ??= []; AF(this.surface2x, 2); this.surface2x[2] = 0;
    this.surface2x ??= []; AF(this.surface2x, 3); this.surface2x[3] = 0;
    this.surface2x ??= []; AF(this.surface2x, 4); this.surface2x[4] = 0;
    this.surface2x ??= []; AF(this.surface2x, 5); this.surface2x[5] = 0;
    this.surface2x ??= []; AF(this.surface2x, 6); this.surface2x[6] = 0;
    this.surface2xscale ??= []; AF(this.surface2xscale, 0); this.surface2xscale[0] = 0;
    this.surface2xscale ??= []; AF(this.surface2xscale, 1); this.surface2xscale[1] = 0;
    this.surface2xscale ??= []; AF(this.surface2xscale, 2); this.surface2xscale[2] = 0;
    this.surface2xscale ??= []; AF(this.surface2xscale, 3); this.surface2xscale[3] = 0;
    this.surface2xscale ??= []; AF(this.surface2xscale, 4); this.surface2xscale[4] = 0;
    this.surface2xscale ??= []; AF(this.surface2xscale, 5); this.surface2xscale[5] = 0;
    this.surface2xscale ??= []; AF(this.surface2xscale, 6); this.surface2xscale[6] = 0;
    this.hero_state = "idle";
    this.hero_state_timer = 0;
    this.ui_alpha = 0;
    if (O('obj_pink_enemy').datecount > 1) {
        this.ui_alpha = 1;
    }
    this.dialoguebox_alpha = 0;
    this.bluramt = 0;
    this.blursurf = - 4;
    this.blurshader = 0;
    this.eyeshafttimer = 0;
    this.goawaystring = S.stringsetloc("GO... AWAY...!", "obj_date_controller_slash_Create_0_gml_370_0");
    this.clutching_head_string = S.stringsetloc("I... hate... dating... mew...", "obj_date_controller_slash_Create_0_gml_372_0");
    this.clutching_head_string2 = S.stringsetloc("I.. love... dating... mew", "obj_date_controller_slash_Create_0_gml_373_0");
    this.thickness = 2;
    this.wave_siner = 0;
    this.distortsiner = 0;
    this.date3endingcon = 0;
    this.date3endingtimer = 0;
    this.invertbgalpha = 0;
    if (O('obj_pink_enemy').datecount == 3) {
        this.pinkportrait_x = 230;
        this.pinkportrait2 = 'spr_nothing';
        mus_volume(global.batmusic[0], 0, 30);
        mus_volume(global.batmusic[1], 0, 30);
    }
    this.date3con = 0;
  }
  draw() {
    let xx, yy, __offsetx, __offsety, _first_text, _second_text, portrait_offset_x, portrait_offset_y, _float_y, _handx, _handy, _scale, _body_x, _body_y, _w, __w, _sep, _ghost_x, _ghost_y, _colorpurple, _colorpink, _colormerge1, _colormerge2, _shakex, _shakey, draw_chr, __l, ltr, remaining_string_length, __writestring, __a, __b, _almost_black, _text_outline, _distance_between_boxes, _box_x, _box_y, _draw_box_selected, _newblackcolor, left_edge_x, right_edge_x, _radius, _ogradius, _offscreen_offset, _centeroffset, ___x, ___y, __o, _text_xscale, _text_yscale, _text_y_offset, _box_alpha, __rr, _scale_adjust, _text5, _xscale5, _yscale5, _text3, _xscale3, _yscale3, _text4, _xscale4, _yscale4, _text0, _xscale0, _yscale0, _text1, _xscale1, _yscale1, _text2, _xscale2, _yscale2, _text6, _xscale6, _yscale6, _angle5, _drawn_box_x5, _angle5_right, _drawn_box_x5_right, _textxscale5, _textyscale5, _angle6, _drawn_box_x6, _angle6_right, _drawn_box_x6_right, _textxscale6, _textyscale6, _angle1, _drawn_box_x1, _angle1_right, _drawn_box_x1_right, _textxscale1, _textyscale1, _angle3, _drawn_box_x3, _angle3_right, _drawn_box_x3_right, _textxscale3, _textyscale3, _angle4, _drawn_box_x4, _angle4_right, _drawn_box_x4_right, _textxscale4, _textyscale4, _angle0, _drawn_box_x0, _angle0_right, _drawn_box_x0_right, _textxscale0, _textyscale0, _angle2, _drawn_box_x2, _angle2_right, _drawn_box_x2_right, _textxscale2, _textyscale2, _targetalpha;
    draw_set_color(0xffffff);
    draw_set_alpha(1);
    if (i_ex('obj_battlecontroller')) {
        this.depth = O('obj_battlecontroller').depth + 1;
        if (i_ex('obj_tensionbar')) {
            O('obj_tensionbar').depth = this.depth + 1;
        }
    }
    if (!T(i_ex('obj_pink_enemy'))) {
        return;
    }
    draw_set_font(S.scr_84_get_font("mainbig"));
    if (W('obj_marker', function (other) {
        if (this.sprite_index == 'spr_pink_purple_arrow' && this.image_alpha > 0 && this.direction == 90) {
            this.image_alpha = this.image_alpha - 0.04;
        }
        if (this.sprite_index == 'spr_pink_purple_arrow' && this.image_alpha > 0 && this.direction != 90) {
            this.image_alpha = this.image_alpha - 0.01;
        }
        if (this.sprite_index == 'spr_pink_purple_arrow' && this.image_alpha <= 0) {
            instance_destroy(this);
        }
    }, this) === EXIT) return;
    xx = this.camx;
    yy = this.camy;
    if (i_ex('obj_shake')) {
        xx = this.camx + O('obj_shake').shakex * O('obj_shake').shakesign;
        yy = this.camy + O('obj_shake').shakey * O('obj_shake').shakesign;
    }
    if ((this.con == 0 || this.con == 7) && i_ex('obj_pink_enemy')) {
        if (!T(surface_exists(this.surface1))) {
            this.surface1 = surface_create(640, 480);
        }
        surface_set_target(this.surface1);
        draw_clear(0x000000);
    }
    this.bg_speed = this.bg_speed + this.bg_speed_max;
    this.bg_speed_y = this.bg_speed_y + this.bg_speed_y_max;
    if (this.bg_speed > 0) {
        this.bg_speed = this.bg_speed - 640;
    }
    if (this.bg_speed_y > - 480) {
        this.bg_speed_y = this.bg_speed_y - 480;
    }
    if (this.invertbgalpha >= 1 && O('obj_pink_enemy').datecount == 3 || this.diamondbg_alpha >= 1 || this.diamondbg_red_alpha >= 1) {
    } else {
        S.scr_draw_sprite_tiled_area('spr_diamond_loop', 0, this.camx + this.bg_speed, this.camy + this.bg_speed_y, this.camx + this.bg_speed, this.camy + this.bg_speed_y, this.camx + VIEW_WPORT[0], this.camy + room_height, 2, 2, 16777215, 1);
    }
    if (O('obj_pink_enemy').datecount == 3) {
        if (this.diamondbg_alpha >= 1 || this.diamondbg_red_alpha >= 1) {
        } else if (this.invertbgalpha > 0) {
            S.scr_draw_sprite_tiled_area('spr_diamond_loop_inverted', 0, this.camx + this.bg_speed, this.camy + this.bg_speed_y, this.camx + this.bg_speed, this.camy + this.bg_speed_y, this.camx + VIEW_WPORT[0], this.camy + room_height, 2, 2, 16777215, this.invertbgalpha);
        }
        if (this.diamondbg_alpha > 0) {
            S.scr_draw_sprite_tiled_area('spr_diamond_loop_inverted', 1, this.camx + this.bg_speed, this.camy + this.bg_speed_y, this.camx + this.bg_speed, this.camy + this.bg_speed_y, this.camx + VIEW_WPORT[0], this.camy + room_height, 2, 2, 16777215, this.diamondbg_alpha);
        }
        if (this.diamondbg_red_alpha > 0) {
            S.scr_draw_sprite_tiled_area('spr_diamond_loop_inverted', 2, this.camx + this.bg_speed, this.camy + this.bg_speed_y, this.camx + this.bg_speed, this.camy + this.bg_speed_y, this.camx + VIEW_WPORT[0], this.camy + room_height, 2, 2, 16777215, this.diamondbg_red_alpha);
        }
    } else {
        if (this.diamondbg_red_alpha >= 1) {
        } else if (this.diamondbg_alpha > 0) {
            S.scr_draw_sprite_tiled_area('spr_diamond_loop', 1, this.camx + this.bg_speed, this.camy + this.bg_speed_y, this.camx + this.bg_speed, this.camy + this.bg_speed_y, this.camx + VIEW_WPORT[0], this.camy + room_height, 2, 2, 16777215, this.diamondbg_alpha);
        }
        if (this.diamondbg_red_alpha > 0) {
            S.scr_draw_sprite_tiled_area('spr_diamond_loop', 2, this.camx + this.bg_speed, this.camy + this.bg_speed_y, this.camx + this.bg_speed, this.camy + this.bg_speed_y, this.camx + VIEW_WPORT[0], this.camy + room_height, 2, 2, 16777215, this.diamondbg_red_alpha);
        }
    }
    draw_sprite_ext('spr_datingsim_ui_bg', 0, xx + 106, yy + 24, 2, 2, 0, 0xffffff, 1);
    if (O('obj_pink_enemy').datecount == 3) {
        this.wave_siner = this.wave_siner + 1;
        this.distortsiner = this.distortsiner + 1;
        __offsetx = 110;
        __offsety = - 600;
        this.i = 0;
        while ((this.i < 280) && LOOP('DateController#3')) {
            draw_sprite_part_ext('spr_datingsim_ui_bg_inverted_2x', 0, 0, this.i * this.thickness, 428, this.thickness + 2, __offsetx - 10 + 1 + Math.sin((this.wave_siner + this.i * 8) / 30) * 3, this.i * this.thickness + __offsety + 620, 1, 1, 0xffffff, this.invertbgalpha);
            this.i = this.i + this.thickness;
        }
        draw_set_alpha(0.4);
        draw_set_color(0x000000);
        S.d_rectangle(xx + 100, yy + 20, xx + 530, yy + 300, false);
        draw_set_color(0xffffff);
        draw_set_alpha(1);
    }
    if (this.con == 1 || this.con == 2) {
        this.talktimer = this.talktimer + 1;
        this.talktimer2 = this.talktimer2 + 1;
        if ((this.first_text != "" || this.multi_color_text_con == 1) && this.talktimer < 30) {
            this.pinkindex = this.pinkindex + this.portrait1_talkspeed;
        } else if (this.pinkportrait != 'spr_pinkspeaker_blinkblush' && this.pinkportrait != 'spr_pinkspeaker_date4_idle' && this.pinkportrait != 'spr_pinkspeaker_date4_questionright') {
            this.pinkindex = 0;
            this.portrait1_talkspeed = 0.16666666666666666;
        }
        if ((this.second_text != "" || this.multi_color_text_con == 1) && this.talktimer2 < 30) {
            this.pinkindex2 = this.pinkindex2 + this.portrait2_talkspeed;
        } else {
            this.pinkindex2 = 0;
            this.portrait2_talkspeed = 0.16666666666666666;
        }
    }
    this.date_text_char_number = this.date_text_char_number + 2;
    this.date_text2_char_number = this.date_text2_char_number + 2;
    if (this.first_text != "" && string_length(this.first_text) < this.date_text_char_number) {
        this.date_text_char_number = string_length(this.first_text);
    }
    if (this.second_text != "" && string_length(this.second_text) < this.date_text2_char_number) {
        this.date_text2_char_number = string_length(this.second_text);
    }
    if (this.first_text != "" && this.date_text_char_number == string_length(this.first_text) || this.second_text != "" && this.date_text2_char_number == string_length(this.second_text)) {
        this.can_skip_timer = this.can_skip_timer + 1;
    } else {
        this.can_skip_timer = 0;
    }
    _first_text = string_copy(this.first_text, 1, this.date_text_char_number);
    _second_text = string_copy(this.second_text, 1, this.date_text2_char_number);
    if (i_ex('obj_pink_enemy') && O('obj_pink_enemy').datecount != 1) {
        this.tailindex2 = this.tailindex2 + 0.16666666666666666;
        portrait_offset_x = 10;
        portrait_offset_y = 0;
        if (this.pinkportrait2 == 'spr_pinkghost_yell') {
            portrait_offset_x = portrait_offset_x + 25;
        }
        if (this.portrait2visibility == 1 && (this.pinkportrait2 == 'spr_pinkghost_angry' || this.pinkportrait2 == 'spr_pinkghost_nya_1' || this.pinkportrait2 == 'spr_pinkghost_nya_2')) {
            portrait_offset_x = portrait_offset_x + 4;
        }
        if (this.pinkportrait2 == 'spr_pinkghost_shock_full') {
            portrait_offset_y = portrait_offset_y - 20;
        }
        if (this.pinkportrait2 == 'spr_pinkghost_blush' || this.pinkportrait2 == 'spr_pinkghost_concerned') {
            if (this.portrait2_xscale == 2) {
                draw_sprite_ext('spr_pinkghost_tail', this.tailindex2, xx + this.pinkportrait2_x, yy + 21 + portrait_offset_y, 2, 2, 0, 0xffffff, this.pinkportraitalpha2 * 0.7);
            } else if (this.portraitscon == 1) {
                draw_sprite_ext('spr_pinkghost_tail', this.tailindex2, xx + this.pinkportrait2_x + 40, yy + 21 + portrait_offset_y, - 2, 2, 0, 0xffffff, this.pinkportraitalpha2 * 0.7);
            }
        }
        draw_sprite_ext(this.pinkportrait2, this.pinkindex2, xx + this.pinkportrait2_x + portrait_offset_x, yy + this.pinkportrait2_y + portrait_offset_y, this.portrait2_xscale, 2, 0, 0xffffff, this.pinkportraitalpha2 * 0.7);
        if (this.sweatcon2 == 1) {
            draw_sprite_ext('spr_pinkspeaker_sweatdrop', this.sweatindex2, xx + this.pinkportrait2_x + portrait_offset_x, yy + this.pinkportrait2_y, this.portrait2_xscale, 2, 0, 0xffffff, this.pinkportraitalpha2);
        }
    }
    if (this.portrait2flash_timer > 0) {
        if (this.ghost_fade_con == 1) {
            this.ghost_fade_siner = this.ghost_fade_siner + 1;
        }
        draw_sprite_ext('spr_pinkspeaker_tail', this.tailindex, xx + this.pinkportrait_x, yy + 21, this.portrait_xscale, 2, 0, 0xffffff, this.portrait2flash_timer / 4 + Math.sin(this.ghost_fade_siner * 0.5 * 0.5));
        draw_sprite_ext(this.pinkportrait2, this.pinkindex, xx + this.pinkportrait_x + portrait_offset_x, yy + this.pinkportrait_y, this.portrait_xscale, 2, 0, 0xffffff, this.portrait2flash_timer / 4 + Math.sin(this.ghost_fade_siner * 0.5 * 0.5));
        this.portrait2flash_timer = this.portrait2flash_timer - 1;
    }
    if (i_ex('obj_pink_enemy')) {
        this.tailindex = this.tailindex + 0.16666666666666666;
        if (this.pinkportrait == 'spr_possessed_mewmew') {
            _float_y = Math.sin(this.tailindex * 1) * 2;
            portrait_offset_x = 10;
            _handx = this.camx + 300;
            _handy = this.camy + 84;
            draw_sprite_ext('spr_possessed_mewmew_greyscale_brighter', this.tailindex, xx + this.pinkportrait_x + 110 + portrait_offset_x, yy + this.pinkportrait_y + _float_y, 2, 2, 0, 0xffffff, 0.95);
            draw_sprite_ext('spr_possessed_mewmew_purple', this.tailindex, xx + this.pinkportrait_x + 110 + portrait_offset_x, yy + this.pinkportrait_y + _float_y, 2, 2, 0, 0xffffff, 0.7 + Math.sin(this.tailindex * 1) * 0.3);
            draw_sprite_ext('spr_possessed_mewmew_pink', this.tailindex, xx + this.pinkportrait_x + 110 + portrait_offset_x, yy + this.pinkportrait_y + _float_y, 2, 2, 0, 0xffffff, 0.7 - Math.sin(this.tailindex * 1) * 0.3);
        } else {
            portrait_offset_x = 0;
            portrait_offset_y = 0;
            if (this.portraitvisibility == 1 && (this.pinkportrait == 'spr_pinkspeaker_nya' || this.pinkportrait == 'spr_pinkspeaker_nya2' || this.pinkportrait == 'spr_pinkspeaker_angry' || this.pinkportrait == 'spr_pinkspeaker_tongue')) {
                portrait_offset_x = 4;
            }
            _scale = 1;
            if (this.pinkportraitalpha2 > 0) {
                _scale = - 1;
                portrait_offset_x = portrait_offset_x + 224;
            }
            if (this.pinkportrait == 'spr_pinkspeaker_date4_idle' || this.pinkportrait == 'spr_pinkspeaker_date4_questionright') {
                this.pinkindex = this.pinkindex + 0.16666666666666666;
            }
            if (this.pinkportrait == 'spr_pinkspeaker_talk' || this.pinkportrait == 'spr_pinkspeaker_wink' || this.pinkportrait == 'spr_pinkspeaker_concerned' || this.pinkportrait == 'spr_pinkspeaker_talk_happy') {
                draw_sprite_ext('spr_pinkspeaker_tail', this.tailindex, xx + this.pinkportrait_x + portrait_offset_x, yy + 21 + portrait_offset_y, this.portrait_xscale * _scale, 2, 0, 0xffffff, this.pinkportraitalpha);
            }
            draw_sprite_ext(this.pinkportrait, this.pinkindex, xx + this.pinkportrait_x + portrait_offset_x, yy + this.pinkportrait_y + portrait_offset_y, this.portrait_xscale * _scale, 2, 0, 0xffffff, this.pinkportraitalpha);
            if (this.sweatcon == 1) {
                draw_sprite_ext('spr_pinkspeaker_sweatdrop', this.sweatindex, xx + this.pinkportrait_x + portrait_offset_x, yy + this.pinkportrait_y, this.portrait_xscale * _scale, 2, 0, 0xffffff, 1);
            }
        }
    }
    if (this.portraitflash_timer > 0) {
        draw_sprite_ext('spr_pinkspeaker_tail', this.tailindex, xx + this.pinkportrait_x, yy + 21, this.portrait_xscale, 2, 0, 0xffffff, this.portraitflash_timer / 4);
        draw_sprite_ext(this.pinkportrait, this.pinkindex, xx + this.pinkportrait_x + portrait_offset_x, yy + this.pinkportrait_y, this.portrait_xscale, 2, 0, 0xffffff, this.portraitflash_timer / 4);
        this.portraitflash_timer = this.portraitflash_timer - 1;
    }
    draw_set_halign(0);
    draw_set_color(0xffffff);
    if (this.show_intro_outro_surfaces == 0) {
        if (this.dialoguebox_alpha < 1 && this.minigame_won == 0) {
            this.dialoguebox_alpha = this.dialoguebox_alpha + 0.2;
        }
        draw_primitive_begin(5);
        draw_vertex_color(xx + 106, yy + 300 - 90, this.dialogueboxcolor, this.dialoguebox_alpha * 0.2);
        draw_vertex_color(xx + 106, yy + 300 - 27, this.dialogueboxcolor, this.dialoguebox_alpha * 0.8);
        draw_vertex_color(xx + 106 + 420, yy + 300 - 90, this.dialogueboxcolor, this.dialoguebox_alpha * 0.2);
        draw_vertex_color(xx + 106 + 420, yy + 300 - 27, this.dialogueboxcolor, this.dialoguebox_alpha * 0.8);
        draw_primitive_end();
    }
    if (this.con == 4 || this.con == 5 || this.con == 6) {
    } else {
        _body_x = this.camx + 120 + this.shaketext_x;
        _body_y = this.camy + 208;
        _w = 2;
        __w = 320;
        if (this.multi_color_text_con == 0) {
            draw_set_halign(0);
            draw_set_valign(0);
            if (O('obj_pink_enemy').datecount == 1 || O('obj_pink_enemy').datecount == 3 || O('obj_pink_enemy').datecount == 2 && this.draw_box_timer < 530 && this.rr == 0) {
                _body_x = this.camx + 320 + this.shaketext_x;
                draw_set_halign(1);
            }
            if (O('obj_pink_enemy').datecount == 2 || O('obj_pink_enemy').datecount == 3) {
                if (this.first_text == "" || this.second_text == "") {
                } else {
                    __w = 180 + this.shaketext_x;
                }
            }
            draw_set_color(0xffffff);
            if (this.pinkportraitalpha2 != 0) {
                draw_set_color(merge_color(0x000000, 0x808080, 0.1));
            }
            _sep = 28;
            if (global.lang == "ja") {
                _sep = 30;
            }
            draw_text_ext_transformed(_body_x - _w, _body_y, _first_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_text_ext_transformed(_body_x - _w, _body_y - _w, _first_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_text_ext_transformed(_body_x - _w, _body_y + _w, _first_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_text_ext_transformed(_body_x + _w, _body_y, _first_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_text_ext_transformed(_body_x + _w, _body_y + _w, _first_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_text_ext_transformed(_body_x + _w, _body_y - _w, _first_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_text_ext_transformed(_body_x, _body_y + _w, _first_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_text_ext_transformed(_body_x, _body_y - _w, _first_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_set_color(merge_color(0x000000, 0x808080, 0.1));
            if (this.pinkportraitalpha2 != 0) {
                draw_set_color(make_color_rgb(255, 138, 144));
            }
            draw_text_ext_transformed(_body_x, _body_y, _first_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_set_halign(2);
            draw_set_font(S.scr_84_get_font("mainbig"));
            draw_set_color(merge_color(0x000000, 0x808080, 0.1));
            _ghost_x = xx + 510;
            _ghost_y = yy + 208;
            draw_text_ext_transformed(_ghost_x - _w, _ghost_y, _second_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_text_ext_transformed(_ghost_x - _w, _ghost_y - _w, _second_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_text_ext_transformed(_ghost_x - _w, _ghost_y + _w, _second_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_text_ext_transformed(_ghost_x + _w, _ghost_y, _second_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_text_ext_transformed(_ghost_x + _w, _ghost_y + _w, _second_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_text_ext_transformed(_ghost_x + _w, _ghost_y - _w, _second_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_text_ext_transformed(_ghost_x, _ghost_y + _w, _second_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_text_ext_transformed(_ghost_x, _ghost_y - _w, _second_text, _sep, __w, this.portraittextscale, 1, 0);
            draw_set_color(make_color_rgb(199, 185, 215));
            draw_text_ext_transformed(_ghost_x, _ghost_y, _second_text, _sep, __w, this.portraittextscale, 1, 0);
        }
        if (this.multi_color_text_con == 1) {
            _body_x = this.camx + 160 + this.shaketext_x;
            this.write_string = S.stringsetloc("Then, how about a choice that means both!?", "obj_date_controller_slash_Draw_0_gml_173_0");
            if (O('obj_pink_enemy').datecount == 3) {
                this.write_string = S.stringset(this.first_text);
                _body_x = this.camx + 241 + this.shaketext_x;
                if (this.date3con == 1 && global.lang != "ja") {
                    _body_x = this.camx + 252 + this.shaketext_x;
                }
                if (this.date3con == 1 && global.lang == "ja") {
                    _body_x = this.camx + 221 + this.shaketext_x;
                }
                if (this.date3con == 2) {
                    _body_x = this.camx + 261 + this.shaketext_x;
                }
            }
            _colorpurple = make_color_rgb(255, 138, 144);
            _colorpink = make_color_rgb(199, 185, 215);
            _colormerge1 = merge_color(_colorpurple, _colorpink, 0.5 + Math.sin(this.tailindex) * 0.5);
            _colormerge2 = merge_color(_colorpink, _colorpurple, 0.5 + Math.sin(this.tailindex) * 0.5);
            _shakex = 0;
            _shakey = 0;
            draw_chr = "";
            __l = 0;
            ltr = 1;
            while ((ltr <= string_length(this.write_string)) && LOOP('DateController#4')) {
                if (O('obj_pink_enemy').datecount == 3) {
                    _shakex = - 1 + random(2);
                    _shakey = - 1 + random(2);
                }
                draw_chr = string_char_at(this.write_string, ltr);
                if (draw_chr == "#") {
                } else if (__l == 0) {
                    draw_set_color(merge_color(0x000000, 0x808080, 0.1));
                    draw_text(_body_x - _w + _shakex, _body_y + _shakey, draw_chr);
                    draw_text(_body_x - _w + _shakex, _body_y - _w + _shakey, draw_chr);
                    draw_text(_body_x - _w + _shakex, _body_y + _w + _shakey, draw_chr);
                    draw_text(_body_x + _w + _shakex, _body_y + _shakey, draw_chr);
                    draw_text(_body_x + _w + _shakex, _body_y + _w + _shakey, draw_chr);
                    draw_text(_body_x + _w + _shakex, _body_y - _w + _shakey, draw_chr);
                    draw_text(_body_x + _shakex, _body_y + _w + _shakey, draw_chr);
                    draw_text(_body_x + _shakex, _body_y - _w + _shakey, draw_chr);
                    draw_set_color(_colorpurple);
                    if (O('obj_pink_enemy').datecount == 3) {
                        draw_set_color(_colormerge1);
                    }
                    draw_text(_body_x + _shakex, _body_y + _shakey, draw_chr);
                    __l = 1;
                } else {
                    draw_set_color(merge_color(0x000000, 0x808080, 0.1));
                    draw_text(_body_x - _w + _shakex, _body_y + _shakey, draw_chr);
                    draw_text(_body_x - _w + _shakex, _body_y - _w + _shakey, draw_chr);
                    draw_text(_body_x - _w + _shakex, _body_y + _w + _shakey, draw_chr);
                    draw_text(_body_x + _w + _shakex, _body_y + _shakey, draw_chr);
                    draw_text(_body_x + _w + _shakex, _body_y + _w + _shakey, draw_chr);
                    draw_text(_body_x + _w + _shakex, _body_y - _w + _shakey, draw_chr);
                    draw_text(_body_x - _w + _shakex, _body_y + _w + _shakey, draw_chr);
                    draw_text(_body_x - _w + _shakex, _body_y - _w + _shakey, draw_chr);
                    draw_set_color(_colorpink);
                    if (O('obj_pink_enemy').datecount == 3) {
                        draw_set_color(_colormerge2);
                    }
                    draw_text(_body_x + _shakex, _body_y + _shakey, draw_chr);
                    __l = 0;
                }
                _body_x = _body_x + (string_width(draw_chr) + 1);
                if (draw_chr == "#" && global.lang == "ja") {
                    remaining_string_length = string_length(this.write_string) - ltr;
                    __writestring = string_copy(this.write_string, ltr, remaining_string_length);
                    if (this.date3con == 1) {
                        _body_x = this.camx + this.camwidth / 2 - string_width(__writestring) / 2 - 8;
                    } else if (this.date3con == 2) {
                        _body_x = this.camx + this.camwidth / 2 - string_width(__writestring) / 2 - 0;
                    } else {
                        _body_x = this.camx + this.camwidth / 2 - string_width(__writestring) / 2 - 10;
                    }
                    _body_y = _body_y + 30;
                }
                if (ltr == 24 && this.date3con == 0 && global.lang != "ja") {
                    _body_x = this.camx + 200;
                    _body_y = _body_y + 24;
                }
                if (ltr == 12 && this.date3con == 1 && global.lang != "ja") {
                    _body_x = this.camx + 220;
                    _body_y = _body_y + 24;
                }
                if (ltr == 12 && this.date3con == 2 && global.lang != "ja") {
                    _body_x = this.camx + 230;
                    _body_y = _body_y + 24;
                }
                ltr = ltr + 1;
            }
            draw_set_color(0xffffff);
        }
    }
    draw_set_halign(0);
    draw_set_color(0xffffff);
    draw_sprite_ext('spr_datingsim_ui_nodiamonds', 0, xx, yy, 2, 2, 0, 0xffffff, 1);
    __a = 2;
    if (O('obj_pink_enemy').datecount == 3 || O('obj_pink_enemy').datecount == 4) {
        __a = 4;
    }
    draw_sprite_ext('spr_datingsim_ui_nodiamonds', __a, this.camx, yy, 2, 2, 0, 0xffffff, this.ui_alpha);
    if (O('obj_pink_enemy').datecount == 3) {
        draw_sprite_ext('spr_datingsim_ui_nodiamonds_inverted', 0, xx, yy, 2, 2, 0, 0xffffff, this.invertbgalpha);
        draw_sprite_ext('spr_datingsim_ui_nodiamonds_inverted', 2, this.camx, yy, 2, 2, 0, 0xffffff, this.invertbgalpha);
    }
    if (this.hero_state == "idle") {
        draw_sprite_ext('spr_ralsei_down', 0, xx + 40, yy + 48, 2, 2, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_susied_dark', 0, xx + 8, yy + 46, 2, 2, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_krisd_dark', 0, xx + 26, yy + 76, 2, 2, 0, 0xffffff, this.ui_alpha);
    }
    if (this.hero_state == "fail") {
        this.hero_state_timer = this.hero_state_timer + 1;
        if (this.hero_state_timer == 1) {
            xx = xx + 4;
        }
        if (this.hero_state_timer == 2) {
            xx = xx - 3;
        }
        if (this.hero_state_timer == 3) {
            xx = xx + 2;
        }
        if (this.hero_state_timer == 4) {
            xx = xx - 1;
        }
        draw_sprite_ext('spr_ralsei_hurt_pink_date', 0, xx + 40, yy + 48, 2, 2, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_susieb_hurt_dateui', 0, xx + 8, yy + 46, 2, 2, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_krisb_hurt_dateui', 0, xx + 24, yy + 76, 2, 2, 0, 0xffffff, this.ui_alpha);
        if (this.hero_state_timer == 20) {
            this.hero_state = "idle";
            this.hero_state_timer = 0;
        }
    }
    if (this.hero_state == "choose") {
        draw_sprite_ext('spr_ralsei_point_forward', 0, xx + 36, yy + 48, 2, 2, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_susie_point_forward', 0, xx + 8, yy + 46, 2, 2, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_kris_point_forward', 1, xx + 24, yy + 76, 2, 2, 0, 0xffffff, this.ui_alpha);
        if (this.hero_state_timer == 20) {
            this.hero_state = "idle";
            this.hero_state_timer = 0;
        }
    }
    if (this.hero_state == "success") {
        draw_sprite_ext('spr_ralsei_point_forward', 0, xx + 40, yy + 48, 2, 2, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_susie_point_forward', 0, xx + 8, yy + 46, 2, 2, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_kris_point_forward', 1, xx + 24, yy + 76, 2, 2, 0, 0xffffff, this.ui_alpha);
        if (this.hero_state_timer == 20) {
            this.hero_state = "idle";
            this.hero_state_timer = 0;
        }
    }
    if (this.con == 2 && this.draw_box_con != 2) {
        this.arrow_siner = this.arrow_siner + 1;
        if (i_ex('obj_pink_enemy') && O('obj_pink_enemy').datecount == 2 && this.questioncount == 3) {
        } else if (this.arrow_siner % 15 == 0) {
            this.inst = instance_create(319, 375, 'obj_marker');
            this.inst.sprite_index = 'spr_pink_purple_arrow';
            this.inst.image_angle = 90;
            this.inst.speed = 1.3;
            this.inst.direction = 90;
            this.inst.image_blend = 0x800080;
            if (this.questioncount == 0 && O('obj_pink_enemy').datecount == 1 || O('obj_pink_enemy').datecount == 4) {
            } else {
                this.inst = instance_create(309, 385, 'obj_marker');
                this.inst.sprite_index = 'spr_pink_purple_arrow';
                this.inst.image_angle = 180;
                this.inst.speed = 2;
                this.inst.direction = 180;
                this.inst.image_blend = 0x800080;
                this.inst = instance_create(329, 385, 'obj_marker');
                this.inst.sprite_index = 'spr_pink_purple_arrow';
                this.inst.image_angle = 0;
                this.inst.speed = 2;
                this.inst.direction = 0;
                this.inst.image_blend = 0x800080;
            }
        }
    }
    __b = 3;
    if (O('obj_pink_enemy').datecount == 3 || O('obj_pink_enemy').datecount == 4) {
        __b = 5;
    }
    draw_sprite_ext('spr_datingsim_ui_nodiamonds', 1, xx, yy, 2, 2, 0, 0xffffff, 1);
    draw_sprite_ext('spr_datingsim_ui_nodiamonds', __b, xx, yy, 2, 2, 0, 0xffffff, this.ui_alpha);
    if (O('obj_pink_enemy').datecount == 3) {
        draw_sprite_ext('spr_datingsim_ui_nodiamonds_inverted', 1, xx, yy, 2, 2, 0, 0xffffff, this.invertbgalpha);
        draw_sprite_ext('spr_datingsim_ui_nodiamonds_inverted', 3, xx, yy, 2, 2, 0, 0xffffff, this.invertbgalpha);
    }
    draw_set_alpha(this.date4darknessalpha);
    S.d_rectangle_color(this.camx, this.camy, this.camx + this.camwidth, this.camy + this.camheight, 0x000000, 0x000000, 0x000000, 0x000000, false);
    draw_set_alpha(1);
    if (O('obj_pink_enemy').datecount == 3 || O('obj_pink_enemy').datecount == 4) {
    } else {
        draw_sprite_ext('spr_datingsim_time_bar', 0, this.camx + 186, this.camy + 416, lerp(0, 300, this.datetimeleft / this.datetimeleftmax), 2, 0, 0xffffff, this.ui_alpha);
    }
    if (this.questioncount == 0) {
        draw_sprite_ext('spr_datingsim_ui_heart', 8, xx + 14 + 0, yy + 170 + 0, 1, 1, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_datingsim_ui_heart', 8, xx + 14 + 22, yy + 170 + 0, 1, 1, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_datingsim_ui_heart', 8, xx + 14 + 44, yy + 170 + 0, 1, 1, 0, 0xffffff, this.ui_alpha);
    }
    if (this.questioncount == 1) {
        draw_sprite_ext('spr_datingsim_ui_heart', 0, xx + 14 + 0, yy + 170 + 0, 1, 1, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_datingsim_ui_heart', 8, xx + 14 + 22, yy + 170 + 0, 1, 1, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_datingsim_ui_heart', 8, xx + 14 + 44, yy + 170 + 0, 1, 1, 0, 0xffffff, this.ui_alpha);
    }
    if (this.questioncount == 2) {
        draw_sprite_ext('spr_datingsim_ui_heart', 0, xx + 14 + 0, yy + 170 + 0, 1, 1, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_datingsim_ui_heart', 0, xx + 14 + 22, yy + 170 + 0, 1, 1, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_datingsim_ui_heart', 8, xx + 14 + 44, yy + 170 + 0, 1, 1, 0, 0xffffff, this.ui_alpha);
    }
    if (this.questioncount == 3) {
        draw_sprite_ext('spr_datingsim_ui_heart', 0, xx + 14 + 0, yy + 170 + 0, 1, 1, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_datingsim_ui_heart', 0, xx + 14 + 22, yy + 170 + 0, 1, 1, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_datingsim_ui_heart', 0, xx + 14 + 44, yy + 170 + 0, 1, 1, 0, 0xffffff, this.ui_alpha);
    }
    if (this.questioncount == 4) {
        draw_sprite_ext('spr_datingsim_ui_heart', 0, xx + 14 + 0, yy + 170 + 0, 1, 1, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_datingsim_ui_heart', 0, xx + 14 + 22, yy + 170 + 0, 1, 1, 0, 0xffffff, this.ui_alpha);
        draw_sprite_ext('spr_datingsim_ui_heart', 0, xx + 14 + 44, yy + 170 + 0, 1, 1, 0, 0xffffff, this.ui_alpha);
    }
    S.scr_84_set_draw_font("main");
    draw_set_color(0xffffff);
    draw_set_halign(1);
    draw_set_valign(1);
    if ((this.con == 4 || this.con == 5 || this.con == 6) && this.timer >= 10) {
        if (this.con == 4 || this.con == 5) {
            this.idiot1.x = xx + this.idiottext_x;
            this.idiot1.y = yy + this.idiottext_y;
            if (W(this.idiot1, function (other) {
                this.visible = true;
            }, this) === EXIT) return;
        }
        if ((this.con == 4 || this.con == 6) && O('obj_pink_enemy').datecount > 1) {
            this.idiot2.x = xx + this.idiottext2_x;
            this.idiot2.y = yy + this.idiottext2_y;
            if (W(this.idiot2, function (other) {
                this.visible = true;
            }, this) === EXIT) return;
        }
    } else {
        if (W('obj_idiot_text', function (other) {
            this.visible = false;
        }, this) === EXIT) return;
    }
    _almost_black = this.darkestpurple;
    _text_outline = true;
    draw_set_halign(0);
    draw_set_valign(0);
    if (this.con == 0 || this.con == 7) {
        surface_reset_target();
    }
    if (this.con >= 2 && this.con != 7 && this.con != 8 && this.show_intro_outro_surfaces == 0 && this.minigame_won == 0) {
        draw_set_color(0xffffff);
        draw_set_halign(1);
        draw_set_valign(1);
        S.scr_84_set_draw_font("main");
        if (global.lang == "ja") {
            S.scr_84_set_draw_font("mainbig");
        }
        _distance_between_boxes = 200;
        _box_x = xx + 233 + this.drawn_box_x_offset;
        _box_y = yy + 285 + 6;
        _draw_box_selected = 0;
        _newblackcolor = merge_color(0x000000, 0x808080, 0.75);
        left_edge_x = this.camx + 70;
        right_edge_x = this.camx + 570;
        _radius = 240;
        _ogradius = 970;
        _offscreen_offset = 165;
        _centeroffset = 312;
        ___x = 85;
        ___y = this.drawn_box_y[2] + 100 - 6;
        __o = 0;
        __a = 160;
        _text_xscale = 3;
        _text_yscale = 3;
        _text_y_offset = 28;
        this.drawn_box_y ??= []; AF(this.drawn_box_y, 0); this.drawn_box_y[0] = _box_y;
        this.drawn_box_y ??= []; AF(this.drawn_box_y, 1); this.drawn_box_y[1] = _box_y;
        this.drawn_box_y ??= []; AF(this.drawn_box_y, 2); this.drawn_box_y[2] = _box_y;
        this.drawn_box_y ??= []; AF(this.drawn_box_y, 3); this.drawn_box_y[3] = _box_y;
        this.drawn_box_y ??= []; AF(this.drawn_box_y, 4); this.drawn_box_y[4] = _box_y;
        this.drawn_box_y ??= []; AF(this.drawn_box_y, 5); this.drawn_box_y[5] = _box_y;
        this.drawn_box_y ??= []; AF(this.drawn_box_y, 6); this.drawn_box_y[6] = _box_y;
        _box_alpha = 0;
        if (i_ex('obj_date_heart')) {
            _box_alpha = O('obj_date_heart').image_alpha;
        }
        draw_set_alpha(_box_alpha);
        if (global.lang == "ja") {
        } else if (O('obj_pink_enemy').datecount == 2 || O('obj_pink_enemy').datecount == 4) {
            this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 3;
            this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 3;
            this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 3;
            if (string_width(this.choicetext[0]) > 30) {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = lerp(3, 0, Number(string_width(this.choicetext[0])) / 200);
            }
            if (string_width(this.choicetext[1]) > 30) {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = lerp(3, 0, Number(string_width(this.choicetext[1])) / 200);
            }
            if (string_width(this.choicetext[2]) > 30) {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = lerp(3, 0, Number(string_width(this.choicetext[2])) / 200);
            }
            __rr = 0;
            for (let _r5495 = 0, _n5495 = Math.trunc(10); _r5495 < _n5495; _r5495++) {
                if (this.choicetextxscale[__rr] > 3) {
                    this.choicetextxscale ??= []; AF(this.choicetextxscale, __rr); this.choicetextxscale[__rr] = 3;
                }
                __rr = __rr + 1;
            }
        }
        _w = 2;
        _scale_adjust = 1;
        for (let _r5534 = 0, _n5534 = Math.trunc(7); _r5534 < _n5534; _r5534++) {
            _draw_box_selected = this.draw_box_selected - 3;
            if (_draw_box_selected == - 1) {
                _draw_box_selected = this.boxcount - 1;
            }
            if (_draw_box_selected == - 2) {
                _draw_box_selected = this.boxcount - 2;
            }
            if (_draw_box_selected == - 3) {
                _draw_box_selected = this.boxcount - 3;
            }
            _text5 = this.drawn_box_text[_draw_box_selected];
            _xscale5 = this.choicetextxscale[_draw_box_selected];
            _yscale5 = this.choicetextyscale[_draw_box_selected];
            _draw_box_selected = this.draw_box_selected - 2;
            if (_draw_box_selected == - 1) {
                _draw_box_selected = this.boxcount - 1;
            }
            if (_draw_box_selected == - 2) {
                _draw_box_selected = this.boxcount - 2;
            }
            _text3 = this.drawn_box_text[_draw_box_selected];
            _xscale3 = this.choicetextxscale[_draw_box_selected];
            _yscale3 = this.choicetextyscale[_draw_box_selected];
            _draw_box_selected = this.draw_box_selected - 1;
            if (_draw_box_selected == - 1) {
                _draw_box_selected = this.boxcount - 1;
            }
            _text4 = this.drawn_box_text[_draw_box_selected];
            _xscale4 = this.choicetextxscale[_draw_box_selected];
            _yscale4 = this.choicetextyscale[_draw_box_selected];
            _draw_box_selected = this.draw_box_selected;
            _text0 = this.drawn_box_text[_draw_box_selected];
            _xscale0 = this.choicetextxscale[_draw_box_selected];
            _yscale0 = this.choicetextyscale[_draw_box_selected];
            _draw_box_selected = this.draw_box_selected + 1;
            if (_draw_box_selected == this.boxcount) {
                _draw_box_selected = 0;
            }
            _text1 = this.drawn_box_text[_draw_box_selected];
            _xscale1 = this.choicetextxscale[_draw_box_selected];
            _yscale1 = this.choicetextyscale[_draw_box_selected];
            _draw_box_selected = this.draw_box_selected + 2;
            if (_draw_box_selected == this.boxcount) {
                _draw_box_selected = 0;
            }
            if (_draw_box_selected == this.boxcount + 1) {
                _draw_box_selected = 1;
            }
            _text2 = this.drawn_box_text[_draw_box_selected];
            _xscale2 = this.choicetextxscale[_draw_box_selected];
            _yscale2 = this.choicetextyscale[_draw_box_selected];
            _draw_box_selected = this.draw_box_selected + 3;
            if (_draw_box_selected == this.boxcount) {
                _draw_box_selected = 0;
            }
            if (_draw_box_selected == this.boxcount + 1) {
                _draw_box_selected = 1;
            }
            if (_draw_box_selected == this.boxcount + 2) {
                _draw_box_selected = 2;
            }
            _text6 = this.drawn_box_text[_draw_box_selected];
            _xscale6 = this.choicetextxscale[_draw_box_selected];
            _yscale6 = this.choicetextyscale[_draw_box_selected];
        }
        if (this.questioncount == 0 && O('obj_pink_enemy').datecount == 1 || this.con != 2) {
        } else {
            this.drawn_box_x ??= []; AF(this.drawn_box_x, 5); this.drawn_box_x[5] = _box_x - _distance_between_boxes * 3;
            _angle5 = lerp(0, 180, (this.drawn_box_x[5] + _offscreen_offset + __o) / _ogradius);
            _drawn_box_x5 = lengthdir_x(_radius, _angle5) + _centeroffset;
            _angle5_right = lerp(0, 180, (this.drawn_box_x[5] + _offscreen_offset + __a - __o) / _ogradius);
            _drawn_box_x5_right = lengthdir_x(_radius, _angle5_right) + _centeroffset;
            _textxscale5 = lerp(0, _xscale5 * _scale_adjust, Math.abs(_drawn_box_x5 - _drawn_box_x5_right) / 170);
            _textyscale5 = _yscale5;
            if (this.drawn_box_x[5] > - 366) {
                S.d_rectangle_color(_drawn_box_x5, this.drawn_box_y[5], _drawn_box_x5_right, this.drawn_box_y[5] + 60, 0xffffff, 0xffffff, 0xffffff, 0xffffff, false);
                S.d_rectangle_color(_drawn_box_x5 - _w, this.drawn_box_y[5] + _w, _drawn_box_x5_right + _w, this.drawn_box_y[5] + 60 - _w, 0x000000, 0x000000, 0x000000, 0x000000, false);
                if (this.minigame_won == 0) {
                    if (_text_outline == 1) {
                        S.draw_text_transformed_outline((_drawn_box_x5 + _drawn_box_x5_right) / 2, this.drawn_box_y[0] + _text_y_offset, _text5, _textxscale5, _textyscale5, _almost_black);
                    } else {
                        draw_text_transformed_color((_drawn_box_x5 + _drawn_box_x5_right) / 2, this.drawn_box_y[0] + _text_y_offset, _text5, _textxscale5, _textyscale5, 0, 0xffffff, 0xffffff, 0xffffff, 0xffffff, true);
                    }
                }
            }
            this.drawn_box_x ??= []; AF(this.drawn_box_x, 6); this.drawn_box_x[6] = _box_x + _distance_between_boxes * 3;
            _angle6 = lerp(0, 180, (this.drawn_box_x[6] + _offscreen_offset + __o) / _ogradius);
            _drawn_box_x6 = lengthdir_x(_radius, _angle6) + _centeroffset;
            _angle6_right = lerp(0, 180, (this.drawn_box_x[6] + _offscreen_offset + __a + __o) / _ogradius);
            _drawn_box_x6_right = lengthdir_x(_radius, _angle6_right) + _centeroffset;
            _textxscale6 = lerp(0, _xscale6 * _scale_adjust, Math.abs(_drawn_box_x6 - _drawn_box_x6_right) / 170);
            _textyscale6 = _yscale6;
            if (this.drawn_box_x[6] < 832) {
                S.d_rectangle_color(_drawn_box_x6, this.drawn_box_y[6], _drawn_box_x6_right, this.drawn_box_y[6] + 60, 0xffffff, 0xffffff, 0xffffff, 0xffffff, false);
                S.d_rectangle_color(_drawn_box_x6 - _w, this.drawn_box_y[6] + _w, _drawn_box_x6_right + _w, this.drawn_box_y[2] + 60 - _w, 0x000000, 0x000000, 0x000000, 0x000000, false);
                if (this.minigame_won == 0) {
                    if (_text_outline == 1) {
                        S.draw_text_transformed_outline((_drawn_box_x6 + _drawn_box_x6_right) / 2, this.drawn_box_y[0] + _text_y_offset, _text6, _textxscale6, _textyscale6, _almost_black);
                    } else {
                        draw_text_transformed_color((_drawn_box_x6 + _drawn_box_x6_right) / 2, this.drawn_box_y[0] + _text_y_offset, _text6, _textxscale6, _textyscale6, 0, 0xffffff, 0xffffff, 0xffffff, 0xffffff, true);
                    }
                }
            }
            this.drawn_box_x ??= []; AF(this.drawn_box_x, 1); this.drawn_box_x[1] = _box_x + _distance_between_boxes;
            _angle1 = lerp(0, 180, (this.drawn_box_x[1] + _offscreen_offset + __o) / _ogradius);
            _drawn_box_x1 = lengthdir_x(_radius, _angle1) + _centeroffset;
            _angle1_right = lerp(0, 180, (this.drawn_box_x[1] + _offscreen_offset + __a + __o) / _ogradius);
            _drawn_box_x1_right = lengthdir_x(_radius, _angle1_right) + _centeroffset;
            _textxscale1 = lerp(0, _xscale1 * _scale_adjust, Math.abs(_drawn_box_x1 - _drawn_box_x1_right) / 170);
            _textyscale1 = _yscale1;
            S.d_rectangle_color(_drawn_box_x1, this.drawn_box_y[1], _drawn_box_x1_right, this.drawn_box_y[1] + 60, 0xffffff, 0xffffff, 0xffffff, 0xffffff, false);
            S.d_rectangle_color(_drawn_box_x1 - _w, this.drawn_box_y[1] + _w, _drawn_box_x1_right + _w, this.drawn_box_y[1] + 60 - _w, 0x000000, 0x000000, 0x000000, 0x000000, false);
            if (this.minigame_won == 0) {
                if (_text_outline == 1) {
                    S.draw_text_transformed_outline((_drawn_box_x1 + _drawn_box_x1_right) / 2, this.drawn_box_y[0] + _text_y_offset, _text1, _textxscale1, _textyscale1, _almost_black);
                } else {
                    draw_text_transformed_color((_drawn_box_x1 + _drawn_box_x1_right) / 2, this.drawn_box_y[0] + _text_y_offset, _text1, _textxscale1, _textyscale1, 0, 0xffffff, 0xffffff, 0xffffff, 0xffffff, true);
                }
            }
            this.drawn_box_x ??= []; AF(this.drawn_box_x, 3); this.drawn_box_x[3] = _box_x - _distance_between_boxes * 2;
            _angle3 = lerp(0, 180, (this.drawn_box_x[3] + _offscreen_offset + __o) / _ogradius);
            _drawn_box_x3 = lengthdir_x(_radius, _angle3) + _centeroffset;
            _angle3_right = lerp(0, 180, (this.drawn_box_x[3] + _offscreen_offset + __a - __o) / _ogradius);
            _drawn_box_x3_right = lengthdir_x(_radius, _angle3_right) + _centeroffset;
            _textxscale3 = lerp(0, _xscale3 * _scale_adjust, Math.abs(_drawn_box_x3 - _drawn_box_x3_right) / 170);
            _textyscale3 = _yscale3;
            if (this.drawn_box_x[3] > - 330) {
                S.d_rectangle_color(_drawn_box_x3, this.drawn_box_y[3], _drawn_box_x3_right, this.drawn_box_y[3] + 60, 0xffffff, 0xffffff, 0xffffff, 0xffffff, false);
                S.d_rectangle_color(_drawn_box_x3 - _w, this.drawn_box_y[3] + _w, _drawn_box_x3_right + _w, this.drawn_box_y[3] + 60 - _w, 0x000000, 0x000000, 0x000000, 0x000000, false);
                if (this.minigame_won == 0) {
                    if (_text_outline == 1) {
                        S.draw_text_transformed_outline((_drawn_box_x3 + _drawn_box_x3_right) / 2, this.drawn_box_y[0] + _text_y_offset, _text3, _textxscale3, _textyscale3, _almost_black);
                    } else {
                        draw_text_transformed_color((_drawn_box_x3 + _drawn_box_x3_right) / 2, this.drawn_box_y[0] + _text_y_offset, _text3, _textxscale3, _textyscale3, 0, 0xffffff, 0xffffff, 0xffffff, 0xffffff, true);
                    }
                }
            }
            this.drawn_box_x ??= []; AF(this.drawn_box_x, 4); this.drawn_box_x[4] = _box_x - _distance_between_boxes;
            _angle4 = lerp(0, 180, (this.drawn_box_x[4] + _offscreen_offset + __o) / _ogradius);
            _drawn_box_x4 = lengthdir_x(_radius, _angle4) + _centeroffset;
            _angle4_right = lerp(0, 180, (this.drawn_box_x[4] + _offscreen_offset + __a - __o) / _ogradius);
            _drawn_box_x4_right = lengthdir_x(_radius, _angle4_right) + _centeroffset;
            _textxscale4 = lerp(0, _xscale4 * _scale_adjust, Math.abs(_drawn_box_x4 - _drawn_box_x4_right) / 170);
            _textyscale4 = _yscale4;
            S.d_rectangle_color(_drawn_box_x4, this.drawn_box_y[4], _drawn_box_x4_right, this.drawn_box_y[4] + 60, 0xffffff, 0xffffff, 0xffffff, 0xffffff, false);
            S.d_rectangle_color(_drawn_box_x4 - _w, this.drawn_box_y[4] + _w, _drawn_box_x4_right + _w, this.drawn_box_y[4] + 60 - _w, 0x000000, 0x000000, 0x000000, 0x000000, false);
            if (this.minigame_won == 0) {
                if (_text_outline == 1) {
                    S.draw_text_transformed_outline((_drawn_box_x4 + _drawn_box_x4_right) / 2, this.drawn_box_y[0] + _text_y_offset, _text4, _textxscale4, _textyscale4, _almost_black);
                } else {
                    draw_text_transformed_color((_drawn_box_x4 + _drawn_box_x4_right) / 2, this.drawn_box_y[0] + _text_y_offset, _text4, _textxscale4, _textyscale4, 0, 0xffffff, 0xffffff, 0xffffff, 0xffffff, true);
                }
            }
        }
        this.drawn_box_x ??= []; AF(this.drawn_box_x, 0); this.drawn_box_x[0] = _box_x;
        _angle0 = lerp(0, 180, (this.drawn_box_x[0] + _offscreen_offset) / _ogradius);
        _drawn_box_x0 = lengthdir_x(_radius, _angle0) + _centeroffset;
        _angle0_right = lerp(0, 180, (this.drawn_box_x[0] + _offscreen_offset + __a) / _ogradius);
        _drawn_box_x0_right = lengthdir_x(_radius, _angle0_right) + _centeroffset;
        draw_set_color(0xff0000);
        draw_set_color(0xffffff);
        _textxscale0 = lerp(0, _xscale0 * _scale_adjust, Math.abs(_drawn_box_x0 - _drawn_box_x0_right) / 170);
        _textyscale0 = _yscale0;
        S.d_rectangle_color(_drawn_box_x0, this.drawn_box_y[0], _drawn_box_x0_right, this.drawn_box_y[0] + 60, 0xffffff, 0xffffff, 0xffffff, 0xffffff, false);
        S.d_rectangle_color(_drawn_box_x0 - _w, this.drawn_box_y[0] + _w, _drawn_box_x0_right + _w, this.drawn_box_y[0] + 60 - _w, 0x000000, 0x000000, 0x000000, 0x000000, false);
        if (this.minigame_won == 0) {
            if (_text_outline == 1) {
                S.draw_text_transformed_outline((_drawn_box_x0 + _drawn_box_x0_right) / 2, this.drawn_box_y[0] + _text_y_offset + 0, _text0, _textxscale0, _textyscale0, _almost_black);
            } else {
                draw_text_transformed_color((_drawn_box_x0 + _drawn_box_x0_right) / 2, this.drawn_box_y[0] + _text_y_offset + 0, _text0, _textxscale0, _textyscale0, 0, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 1);
            }
        }
        if (this.questioncount == 0 && O('obj_pink_enemy').datecount == 1 || this.con != 2) {
        } else {
            this.drawn_box_x ??= []; AF(this.drawn_box_x, 2); this.drawn_box_x[2] = _box_x + _distance_between_boxes * 2;
            _angle2 = lerp(0, 180, (this.drawn_box_x[2] + _offscreen_offset + __o) / _ogradius);
            _drawn_box_x2 = lengthdir_x(_radius, _angle2) + _centeroffset;
            _angle2_right = lerp(0, 180, (this.drawn_box_x[2] + _offscreen_offset + __a + __o) / _ogradius);
            _drawn_box_x2_right = lengthdir_x(_radius, _angle2_right) + _centeroffset;
            _textxscale2 = lerp(0, _xscale2 * _scale_adjust, Math.abs(_drawn_box_x2 - _drawn_box_x2_right) / 170);
            _textyscale2 = _yscale2;
            S.d_rectangle_color(_drawn_box_x2, this.drawn_box_y[2], _drawn_box_x2_right, this.drawn_box_y[2] + 60, 0xffffff, 0xffffff, 0xffffff, 0xffffff, false);
            S.d_rectangle_color(_drawn_box_x2 - _w, this.drawn_box_y[2] + _w, _drawn_box_x2_right + _w, this.drawn_box_y[2] + 60 - _w, 0x000000, 0x000000, 0x000000, 0x000000, false);
            if (this.minigame_won == 0) {
                if (_text_outline == 1) {
                    S.draw_text_transformed_outline((_drawn_box_x2 + _drawn_box_x2_right) / 2, this.drawn_box_y[0] + _text_y_offset, _text2, _textxscale2, _textyscale2, _almost_black);
                } else {
                    draw_text_transformed_color((_drawn_box_x2 + _drawn_box_x2_right) / 2, this.drawn_box_y[0] + _text_y_offset, _text2, _textxscale2, _textyscale2, 0, 0xffffff, 0xffffff, 0xffffff, 0xffffff, true);
                }
            }
            this.drawn_box_x ??= []; AF(this.drawn_box_x, 1); this.drawn_box_x[1] = _box_x + _distance_between_boxes;
            _angle1 = lerp(0, 180, (this.drawn_box_x[1] + _offscreen_offset + __o) / _ogradius);
            _drawn_box_x1 = lengthdir_x(_radius, _angle1) + _centeroffset;
            _angle1_right = lerp(0, 180, (this.drawn_box_x[1] + _offscreen_offset + __a + __o) / _ogradius);
            _drawn_box_x1_right = lengthdir_x(_radius, _angle1_right) + _centeroffset;
            _textxscale1 = lerp(0, _xscale1 * _scale_adjust, Math.abs(_drawn_box_x1 - _drawn_box_x1_right) / 170);
            _textyscale1 = _yscale1;
            S.d_rectangle_color(_drawn_box_x1, this.drawn_box_y[1], _drawn_box_x1_right, this.drawn_box_y[1] + 60, 0xffffff, 0xffffff, 0xffffff, 0xffffff, false);
            S.d_rectangle_color(_drawn_box_x1 - _w, this.drawn_box_y[1] + _w, _drawn_box_x1_right + _w, this.drawn_box_y[1] + 60 - _w, 0x000000, 0x000000, 0x000000, 0x000000, false);
            if (this.minigame_won == 0) {
                if (_text_outline == 1) {
                    S.draw_text_transformed_outline((_drawn_box_x1 + _drawn_box_x1_right) / 2, this.drawn_box_y[0] + _text_y_offset, _text1, _textxscale1, _textyscale1, _almost_black);
                } else {
                    draw_text_transformed_color((_drawn_box_x1 + _drawn_box_x1_right) / 2, this.drawn_box_y[0] + _text_y_offset, _text1, _textxscale1, _textyscale1, 0, 0xffffff, 0xffffff, 0xffffff, 0xffffff, true);
                }
            }
        }
        if (this.con == 2) {
            S.d_line_width_color((_drawn_box_x0 + 2 + _drawn_box_x0_right) / 2, ___y, (_drawn_box_x0 + 2 + _drawn_box_x0_right) / 2, this.drawn_box_y[3] + 61, 2, 0x800080, 0x800080);
        }
        if (this.questioncount == 0 && O('obj_pink_enemy').datecount == 1 || this.con != 2) {
        } else {
            S.d_line_width_color((_drawn_box_x5 + _drawn_box_x5_right) / 2, ___y, (_drawn_box_x6 + _drawn_box_x6_right) / 2, ___y, 2, 0x800080, 0x800080);
            S.d_line_width_color((_drawn_box_x6 + _drawn_box_x6_right) / 2, ___y, (_drawn_box_x6 + _drawn_box_x6_right) / 2, this.drawn_box_y[3] + 61, 2, 0x800080, 0x800080);
            S.d_circle_color((_drawn_box_x6 + _drawn_box_x6_right) / 2 - 1, ___y, 4, 0x800080, 0x800080, false);
            if (this.drawn_box_x[3] > - 330) {
                S.d_line_width_color((_drawn_box_x3 + _drawn_box_x3_right) / 2, ___y, (_drawn_box_x3 + _drawn_box_x3_right) / 2, this.drawn_box_y[3] + 61, 2, 0x800080, 0x800080);
            }
            S.d_line_width_color((_drawn_box_x4 + _drawn_box_x4_right) / 2, ___y, (_drawn_box_x4 + _drawn_box_x4_right) / 2, this.drawn_box_y[3] + 61, 2, 0x800080, 0x800080);
            S.d_line_width_color((_drawn_box_x1 + _drawn_box_x1_right) / 2, ___y, (_drawn_box_x1 + _drawn_box_x1_right) / 2, this.drawn_box_y[3] + 61, 2, 0x800080, 0x800080);
            S.d_line_width_color((_drawn_box_x2 + _drawn_box_x2_right) / 2, ___y, (_drawn_box_x2 + _drawn_box_x2_right) / 2, this.drawn_box_y[3] + 61, 2, 0x800080, 0x800080);
            S.d_line_width_color((_drawn_box_x3 + _drawn_box_x3_right) / 2, ___y, (_drawn_box_x4 + _drawn_box_x4_right) / 2, ___y, 2, 0x800080, 0x800080);
            S.d_line_width_color((_drawn_box_x4 + _drawn_box_x4_right) / 2, ___y, (_drawn_box_x0 + _drawn_box_x0_right) / 2, ___y, 2, 0x800080, 0x800080);
            S.d_line_width_color((_drawn_box_x0 + _drawn_box_x0_right) / 2, ___y, (_drawn_box_x1 + _drawn_box_x1_right) / 2, ___y, 2, 0x800080, 0x800080);
            S.d_line_width_color((_drawn_box_x1 + _drawn_box_x1_right) / 2, ___y, (_drawn_box_x2 + _drawn_box_x2_right) / 2, ___y, 2, 0x800080, 0x800080);
            if (this.drawn_box_x[3] > - 330) {
                S.d_circle_color((_drawn_box_x3 + _drawn_box_x3_right) / 2 - 1, ___y, 4, 0x800080, 0x800080, false);
            }
            S.d_circle_color((_drawn_box_x4 + _drawn_box_x4_right) / 2 - 1, ___y, 4, 0x800080, 0x800080, false);
            S.d_circle_color((_drawn_box_x0 + _drawn_box_x0_right) / 2 - 1, ___y, 4, 0x800080, 0x800080, false);
            S.d_circle_color((_drawn_box_x1 + _drawn_box_x1_right) / 2 - 1, ___y, 4, 0x800080, 0x800080, false);
            S.d_circle_color((_drawn_box_x2 + _drawn_box_x2_right) / 2 - 1, ___y, 4, 0x800080, 0x800080, false);
        }
        draw_set_alpha(1);
    }
    draw_set_valign(0);
    if (i_ex('obj_purplecontrols')) {
        _targetalpha = 0.5;
        if (O('obj_purplecontrols').difficulty == 0) {
            _targetalpha = 0;
        }
        if (O('obj_purplecontrols').difficulty == 1) {
            _targetalpha = 0.2;
        }
        if (O('obj_purplecontrols').difficulty == 1) {
            _targetalpha = 0.4;
        }
        if (O('obj_purplecontrols').difficulty == 2) {
            _targetalpha = 0.6;
        }
        if (O('obj_purplecontrols').difficulty == 3) {
            _targetalpha = 0.8;
        }
        if (O('obj_purplecontrols').difficulty == 4) {
            _targetalpha = 0;
        }
        this.difficulty_prev = O('obj_purplecontrols').difficulty;
        this.date3darkner_alpha = lerp(this.date3darkner_alpha, _targetalpha, 0.4);
        draw_set_color(0x000000);
        draw_set_alpha(this.date3darkner_alpha);
        S.d_rectangle(this.camx, this.camy, this.camx + this.camwidth, this.camy + this.camheight, false);
        draw_set_alpha(1);
        draw_set_color(0xffffff);
    }
    if (this.show_intro_outro_surfaces == 1 && this.con == 0) {
        gpu_set_fog(1, 0xffffff, 0, 0);
        draw_set_alpha(this.intro_outro_surfaces_whiteness_alpha);
        if (this.bugfix_depth_con == 0) {
            this.bugfix_depth_con = this.bugfix_depth_con + 1;
        } else {
            S.d_rectangle(this.camx + this.surface1_x, this.camy, this.camx + this.camwidth / 2 + this.surface1_x, this.camy + this.camheight, false);
            S.d_rectangle(this.camx + this.surface2_x + 1, this.camy, this.camx + this.camwidth / 2 + this.surface2_x + 1, this.camy + this.camheight, false);
        }
        draw_set_alpha(1);
        gpu_set_fog(0, 0xffffff, 0, 0);
        this.tailindex = this.tailindex + 0.16666666666666666;
        portrait_offset_x = 0;
        if (this.pinkportrait == 'spr_pinkspeaker_angry') {
            portrait_offset_x = 5;
        }
        if (this.pinkportrait == 'spr_pinkspeaker_nya' || this.pinkportrait == 'spr_pinkspeaker_nya2') {
            this.pinkportrait = 'spr_pinkspeaker_tongue';
        }
        portrait_offset_x = 4;
        if (this.pinkportrait == 'spr_pinkspeaker_talk') {
            draw_sprite_ext('spr_pinkspeaker_tail', this.tailindex, xx + this.pinkportrait_x, yy + 21, this.portrait_xscale, 2, 0, 0xffffff, this.pinkportraitalpha);
        }
        draw_sprite_ext(this.pinkportrait, this.pinkindex, xx + this.pinkportrait_x + portrait_offset_x, yy + this.pinkportrait_y, this.portrait_xscale, 2, 0, 0xffffff, this.pinkportraitalpha);
        if (this.sweatcon == 1) {
            draw_sprite_ext('spr_pinkspeaker_sweatdrop', this.sweatindex, xx + this.pinkportrait_x + portrait_offset_x, yy + this.pinkportrait_y, this.portrait_xscale, 2, 0, 0xffffff, 1);
        }
        _body_y = this.camy + 208;
        _w = 2;
        __w = 320;
        _body_x = this.camx + 320;
        draw_set_halign(1);
        draw_set_color(0xffffff);
        draw_set_font(S.scr_84_get_font("mainbig"));
        draw_set_alpha(this.pinkportraitalpha);
        draw_text_ext(_body_x - _w, _body_y, _first_text, 28, __w);
        draw_text_ext(_body_x - _w, _body_y - _w, _first_text, 28, __w);
        draw_text_ext(_body_x - _w, _body_y + _w, _first_text, 28, __w);
        draw_text_ext(_body_x + _w, _body_y, _first_text, 28, __w);
        draw_text_ext(_body_x + _w, _body_y + _w, _first_text, 28, __w);
        draw_text_ext(_body_x + _w, _body_y - _w, _first_text, 28, __w);
        draw_text_ext(_body_x, _body_y + _w, _first_text, 28, __w);
        draw_text_ext(_body_x, _body_y - _w, _first_text, 28, __w);
        draw_set_color(merge_color(0x000000, 0x808080, 0.1));
        draw_text_ext(_body_x, _body_y, _first_text, 28, __w);
        draw_set_halign(0);
        draw_set_alpha(1);
    }
    if (this.con == 7 && this.minigame_con != 2) {
        draw_surface_part(this.surface1, this.camx, this.camy, this.camwidth / 2, this.camheight, this.surface1_x, this.camy);
        draw_surface_part(this.surface1, this.camx + 320, this.camy, this.camwidth / 2, this.camheight, this.surface2_x, this.camy);
    }
    if (this.minigame_won == 1) {
        if (this.minigame_con == 1) {
            this.minigame_won_alpha = this.minigame_won_alpha + 0.05;
            if (this.minigame_won_alpha > 1.2) {
                this.minigame_con = 2;
                if (this.date3endingcon >= 1) {
                    if (W('obj_fadeout', function (other) {
                        instance_destroy(this);
                    }, this) === EXIT) return;
                    this.inst = S.scr_fadein(30);
                    this.inst.image_blend = 0xffffff;
                    this.inst.depth = - 999999999;
                }
            }
        }
        if (this.minigame_con == 2) {
            this.minigame_won_alpha = this.minigame_won_alpha - 0.05;
            if (this.minigame_won_alpha <= 0) {
                instance_destroy(this);
                if (W('obj_pink_enemy', function (other) {
                    this.phaseturns = 0;
                    this.looping = false;
                    this.doki = 0;
                    this.explosioncon = 1;
                    this.idlesprite = 'spr_pink_shocked';
                    this.explode_after_date = true;
                }, this) === EXIT) return;
            }
        }
        draw_set_alpha(this.minigame_won_alpha);
        S.d_rectangle(this.camx, this.camy, this.camx + this.camwidth, this.camy + this.camheight, false);
        draw_set_alpha(1);
    }
    if (this.pinkportrait == 'spr_possessed_mewmew' && this.draw_box_timer > 20) {
        if (this.con != 7) {
            if (this.minigame_won == 0 && this.eyeshaft_alpha < 1) {
                this.eyeshaft_alpha = this.eyeshaft_alpha + 0.1;
            }
            if (this.minigame_won == 1 && this.eyeshaft_alpha > 0) {
                this.eyeshaft_alpha = this.eyeshaft_alpha - 0.1;
            }
        } else {
            this.eyeshaft_alpha = this.eyeshaft_alpha - 0.1;
        }
        draw_set_alpha(this.eyeshaft_alpha);
        _handx = this.camx + 210;
        _handy = this.camy + 395;
        S.d_line_color(_handx - 105, _handy - 250, _handx - 15 + 9, _handy - 193 + _float_y, 0x00ff00, 0x00ff00);
        S.d_line_color(_handx - 105, _handy - 150, _handx - 27 + 9, _handy - 176 + _float_y, 0x00ff00, 0x00ff00);
        S.d_line_color(_handx - 105, _handy - 130, _handx - 22 + 9, _handy - 168 + _float_y, 0x00ff00, 0x00ff00);
        S.d_line_color(_handx - 60, _handy - 124, _handx - 16 + 9, _handy - 160 + _float_y, 0x00ff00, 0x00ff00);
        S.d_line_color(_handx - 14, _handy - 124, _handx - 3 + 9, _handy - 156 + _float_y, 0x00ff00, 0x00ff00);
        S.d_line_color(_handx + 240, _handy - 124, _handx + 218 + 9, _handy - 156 + _float_y, 0x00ff00, 0x00ff00);
        S.d_line_color(_handx + 280, _handy - 124, _handx + 230 + 9, _handy - 160 + _float_y, 0x00ff00, 0x00ff00);
        S.d_line_color(_handx + 315, _handy - 132, _handx + 239 + 9, _handy - 168 + _float_y, 0x00ff00, 0x00ff00);
        S.d_line_color(_handx + 315, _handy - 152, _handx + 239 + 9, _handy - 176 + _float_y, 0x00ff00, 0x00ff00);
        S.d_line_color(_handx + 315, _handy - 250, _handx + 229 + 9, _handy - 193 + _float_y, 0x00ff00, 0x00ff00);
        this.eyeshafttimer = this.eyeshafttimer + 1;
        if (this.eyeshafttimer == 10) {
            this.eyeshafttimer = 0;
            this.idiot2 = - 1 + random(2);
        }
        xx = this.eyeshaft_x;
        if (this.changecolorcon == 1) {
            this.colortarget2 = make_color_hsv(irandom(255), 250, 255);
            if (this.changecolorcount == 5) {
                this.colortarget2 = 0xffffff;
            }
            this.changecolorcon = 0x020000;
        }
        if (this.changecolorcon == 2) {
            this.changecolortimer = this.changecolortimer + 1;
            this.eye_shaft_blend = merge_color(this.colortarget, this.colortarget2, this.changecolortimer / 3);
            if (this.changecolortimer == 3) {
                this.colortarget = this.colortarget2;
                this.changecolorcount = this.changecolorcount + 1;
                this.changecolorcon = 0x010000;
                this.changecolortimer = 0x000000;
                if (this.changecolorcount == 6) {
                    this.eye_shaft_blend = 0xffffff;
                    this.changecolorcount = 0x000000;
                    this.changecolorcon = 0x000000;
                }
            }
        }
        if (this.changecolorcon == 1 || this.changecolorcon == 2) {
            draw_sprite_ext('spr_possessed_mewmew_greyscale_brighter', this.tailindex, xx + this.pinkportrait_x + 110 + portrait_offset_x - 8 + irandom(16), yy + this.pinkportrait_y + _float_y, 2, 2, 0, 0xffffff, this.changecolortimer / 10);
        }
        draw_sprite_ext('spr_possessed_mewmew_eyes2', this.tailindex * 1, xx + this.pinkportrait_x + 110 + portrait_offset_x, yy + this.pinkportrait_y + _float_y, 2, 2, 0, this.eye_shaft_blend, this.eyeshaft_alpha * 0.7 - Math.sin(this.tailindex * 1) * 0.3);
    }
    draw_set_halign(0);
    draw_set_valign(0);
  }
  user0() {
    this.hero_state = "fail";
    this.ti = 0;
    while ((this.ti < 3) && LOOP('DateController#5')) {
        if (O('obj_pink_enemy').datecount == 1 || O('obj_pink_enemy').datecount == 2) {
            this.damage = global.hp[this.ti + 1] * 0.25;
            if (this.damage < 31) {
                this.damage = 30;
            }
            if (this.ti == 0 && global.hp[1] > 1 && global.hp[1] < 30) {
                this.damage = global.hp[1] - 1;
            }
            if (this.ti == 1 && global.hp[2] > 1 && global.hp[2] < 30) {
                this.damage = global.hp[2] - 1;
            }
            if (this.ti == 2 && global.hp[3] > 1 && global.hp[3] < 30) {
                this.damage = global.hp[3] - 1;
            }
        }
        if (O('obj_pink_enemy').datecount == 3) {
            if (global.hp[this.ti + 1] > global.maxhp[this.ti + 1] * 0.65) {
                this.damage = 80;
            }
            if (global.hp[this.ti + 1] <= global.maxhp[this.ti + 1] * 0.65 && global.hp[this.ti + 1] >= global.maxhp[this.ti + 1] * 0.3) {
                this.damage = 40;
            }
            if (global.hp[this.ti + 1] < global.maxhp[this.ti + 1] * 0.3) {
                this.damage = 10;
            }
        }
        if (O('obj_pink_enemy').datecount == 4) {
            this.damage = 1;
        }
        this.target = this.ti;
        if (global.hp[global.char[this.ti]] > 0 && global.char[this.ti] != 0) {
            global.inv = - 1;
            global.ignoredefense = true;
            S.scr_damage(this);
            global.ignoredefense = false;
            if (W('obj_dmgwriter', function (other) {
                this.depth = other.depth - 100;
            }, this) === EXIT) return;
            if (this.ti == 0) {
                this.dmgwriter.x = camerax() + 70;
            }
            if (this.ti == 0) {
                this.dmgwriter.y = cameray() + 430;
            }
            if (this.ti == 0) {
                this.dmgwriter.ystart = cameray() + 430;
            }
            if (this.ti == 1) {
                this.dmgwriter.x = camerax() + 270;
            }
            if (this.ti == 1) {
                this.dmgwriter.y = cameray() + 430;
            }
            if (this.ti == 1) {
                this.dmgwriter.ystart = cameray() + 430;
            }
            if (this.ti == 2) {
                this.dmgwriter.x = camerax() + 480;
            }
            if (this.ti == 2) {
                this.dmgwriter.y = cameray() + 430;
            }
            if (this.ti == 2) {
                this.dmgwriter.ystart = cameray() + 430;
            }
        }
        this.ti = this.ti + 1;
    }
    snd_stop('snd_hurt1');
    snd_play('snd_hurt1');
  }
  user1() {
    let i, _questioncount, _rr;
    if (!T(i_ex('obj_pink_enemy'))) {
        return;
    }
    this.r = 3;
    if (O('obj_pink_enemy').datecount > 1) {
        this.r = 2;
    }
    i = 0;
    while ((i < this.r) && LOOP('DateController#6')) {
        this.j = irandom_range(i, this.r);
        this.temp = this.rand_array[i];
        this.rand_array ??= []; AF(this.rand_array, i); this.rand_array[i] = this.rand_array[this.j];
        this.rand_array ??= []; AF(this.rand_array, this.j); this.rand_array[this.j] = this.temp;
        i = i + 1;
    }
    if (global.lang != "ja") {
        this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 3;
        this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 3;
        this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 3;
        this.choicetextxscale ??= []; AF(this.choicetextxscale, 3); this.choicetextxscale[3] = 3;
    }
    this.draw_box_selected = 0;
    if (O('obj_pink_enemy').datecount == 1) {
        if (this.questioncount == 1) {
            if (global.flag[1706] == 1) {
                this.choicetext ??= []; AF(this.choicetext, 0); this.choicetext[0] = S.stringsetloc("No", "obj_date_controller_slash_Other_11_gml_28_0");
                this.choicetext ??= []; AF(this.choicetext, 1); this.choicetext[1] = S.stringsetloc("Yes", "obj_date_controller_slash_Other_11_gml_29_0");
                this.choicetext ??= []; AF(this.choicetext, 2); this.choicetext[2] = S.stringsetloc("Yes", "obj_date_controller_slash_Other_11_gml_29_0");
            } else {
                this.choicetext ??= []; AF(this.choicetext, 0); this.choicetext[0] = S.stringsetloc("No", "obj_date_controller_slash_Other_11_gml_28_0");
                this.choicetext ??= []; AF(this.choicetext, 1); this.choicetext[1] = S.stringsetloc("Yes", "obj_date_controller_slash_Other_11_gml_29_0");
                this.choicetext ??= []; AF(this.choicetext, 2); this.choicetext[2] = S.stringsetloc("Yes", "obj_date_controller_slash_Other_11_gml_29_0");
            }
            this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 3;
            this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 3;
            this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 3;
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 1;
            }
            this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 0); this.choiceiscorrect[0] = 0;
            if (global.flag[1706] == 1) {
                this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 0); this.choiceiscorrect[0] = 1;
            }
            this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 1); this.choiceiscorrect[1] = 1;
            this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 2); this.choiceiscorrect[2] = 1;
            this.boxcount = 3;
        }
        if (this.questioncount == 2) {
            this.choicetext ??= []; AF(this.choicetext, 0); this.choicetext[0] = S.stringsetloc("Right", "obj_date_controller_slash_Other_11_gml_68_0");
            this.choicetext ??= []; AF(this.choicetext, 1); this.choicetext[1] = S.stringsetloc("Exactly", "obj_date_controller_slash_Other_11_gml_69_0");
            this.choicetext ??= []; AF(this.choicetext, 2); this.choicetext[2] = S.stringsetloc("Of course", "obj_date_controller_slash_Other_11_gml_71_0");
            this.choicetext ??= []; AF(this.choicetext, 3); this.choicetext[3] = S.stringsetloc("No", "obj_date_controller_slash_Other_11_gml_70_0");
            this.choicetext ??= []; AF(this.choicetext, 4); this.choicetext[4] = S.stringsetloc("Of course", "obj_date_controller_slash_Other_11_gml_71_0");
            this.choicetext ??= []; AF(this.choicetext, 5); this.choicetext[5] = S.stringsetloc("Exactly", "obj_date_controller_slash_Other_11_gml_69_0");
            this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 3;
            this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 3;
            this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 3;
            this.choicetextxscale ??= []; AF(this.choicetextxscale, 3); this.choicetextxscale[3] = 3;
            this.choicetextxscale ??= []; AF(this.choicetextxscale, 4); this.choicetextxscale[4] = 3;
            this.choicetextxscale ??= []; AF(this.choicetextxscale, 5); this.choicetextxscale[5] = 3;
            if (string_width(this.choicetext[0]) > 30) {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = round(70 / string_width(this.choicetext[0]));
            }
            if (string_width(this.choicetext[1]) > 30) {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = round(70 / string_width(this.choicetext[1]));
            }
            if (string_width(this.choicetext[2]) > 30) {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = round(70 / string_width(this.choicetext[2]));
            }
            if (string_width(this.choicetext[3]) > 30) {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 3); this.choicetextxscale[3] = round(70 / string_width(this.choicetext[3]));
            }
            if (string_width(this.choicetext[4]) > 30) {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 4); this.choicetextxscale[4] = round(70 / string_width(this.choicetext[4]));
            }
            if (string_width(this.choicetext[5]) > 30) {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 5); this.choicetextxscale[5] = round(70 / string_width(this.choicetext[5]));
            }
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 3;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 2.5;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 2;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 3); this.choicetextxscale[3] = 3;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 4); this.choicetextxscale[4] = 2;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 5); this.choicetextxscale[5] = 2.5;
            }
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 3); this.choicetextxscale[3] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 4); this.choicetextxscale[4] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 5); this.choicetextxscale[5] = 1;
            }
            this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 0); this.choiceiscorrect[0] = 0;
            this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 1); this.choiceiscorrect[1] = 0;
            this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 2); this.choiceiscorrect[2] = 0;
            this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 3); this.choiceiscorrect[3] = 1;
            this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 4); this.choiceiscorrect[4] = 0;
            this.choiceiscorrect ??= []; AF(this.choiceiscorrect, 5); this.choiceiscorrect[5] = 0;
            this.boxcount = 6;
        }
    }
    if (O('obj_pink_enemy').datecount == 2 || O('obj_pink_enemy').datecount == 3) {
        _questioncount = 0;
        O('obj_pink_enemy').global_question_count = O('obj_pink_enemy').global_question_count + 1;
        if (O('obj_pink_enemy').global_question_count > 11) {
            O('obj_pink_enemy').global_question_count = 1;
        }
        _questioncount = O('obj_pink_enemy').questionsave[O('obj_pink_enemy').global_question_count];
        if (this.questioncount == 3) {
            this.minigame_won = true;
            return;
        }
        if (this.question_count == 0) {
            this.date1question_number = _questioncount;
        }
        if (this.question_count == 1) {
            if (this.date1question_number == _questioncount) {
                _questioncount = _questioncount + 1;
            }
            if (_questioncount == 12) {
                _questioncount = 0;
            }
        }
        if (this.question_count == 1) {
            this.date2question_number = _questioncount;
        }
        if (this.question_count == 2) {
            if (this.date1question_number == _questioncount) {
                _questioncount = _questioncount + 1;
            }
            if (_questioncount == 12) {
                _questioncount = 0;
            }
            if (this.date2question_number == _questioncount) {
                _questioncount = _questioncount + 1;
            }
            if (_questioncount == 12) {
                _questioncount = 0;
            }
        }
        this.question_count = this.question_count + 1;
        if (_questioncount <= 0) {
            this.portraitshakecon = 1;
            this.portraitshaketimer = 0;
            this.portraitshakecon2 = 1;
            this.portraitshaketimer2 = 0;
            this.pinkportrait2 = 'spr_pinkghost_angry';
            this.pinkportrait = 'spr_pinkspeaker_wink';
            this.talktimer = 0;
            this.talktimer2 = 0;
            this.portrait1_talkspeed = 0.2;
            this.portrait2_talkspeed = 0.3333333333333333;
            snd_play('snd_pink_mew', 1, 1.1);
            S.snd_play_delayed(this, 'snd_pink_mew', 12, 1, 1.4);
            snd_play('snd_pink_trip');
            this.second_text = S.stringsetloc("Take a HIKE!!!", "obj_date_controller_slash_Other_11_gml_149_0");
            this.first_text = S.stringsetloc("Date location?", "obj_date_controller_slash_Other_11_gml_150_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("Go to mountain", "obj_date_controller_slash_Other_11_gml_152_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("Get lost!", "obj_date_controller_slash_Other_11_gml_153_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("Planetarium", "obj_date_controller_slash_Other_11_gml_154_0");
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 50 / string_width(this.choicetext[this.rand_array[0]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 50 / string_width(this.choicetext[this.rand_array[1]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 50 / string_width(this.choicetext[this.rand_array[2]]);
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 0.8;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 0.8;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 0.8;
                this.choicetextyscale ??= []; AF(this.choicetextyscale, 0); this.choicetextyscale[0] = 0.8;
                this.choicetextyscale ??= []; AF(this.choicetextyscale, 1); this.choicetextyscale[1] = 0.8;
                this.choicetextyscale ??= []; AF(this.choicetextyscale, 2); this.choicetextyscale[2] = 0.8;
            }
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 1;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 3;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 2;
            this.boxcount = 3;
        } else if (_questioncount == 1) {
            this.portraitshakecon = 1;
            this.portraitshaketimer = 0;
            this.portraitshakecon2 = 1;
            this.portraitshaketimer2 = 0;
            this.pinkportrait2 = 'spr_pinkghost_angry';
            this.pinkportrait = 'spr_pinkspeaker_wink';
            this.second_text = S.stringsetloc("Destroy her letter!", "obj_date_controller_slash_Other_11_gml_176_0");
            this.first_text = S.stringsetloc("Were you... moved?", "obj_date_controller_slash_Other_11_gml_177_0");
            this.talktimer = 0;
            this.talktimer2 = 0;
            this.portrait1_talkspeed = 0.2;
            this.portrait2_talkspeed = 0.2;
            snd_play('snd_pink_mew', 1, 1.1);
            S.snd_play_delayed(this, 'snd_pink_mew', 12, 1, 1.4);
            snd_play('snd_pink_throw');
            S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
            this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("Tear up", "obj_date_controller_slash_Other_11_gml_190_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("Rip up", "obj_date_controller_slash_Other_11_gml_191_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("Cry", "obj_date_controller_slash_Other_11_gml_192_0");
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 50 / string_width(this.choicetext[this.rand_array[0]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 50 / string_width(this.choicetext[this.rand_array[1]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 50 / string_width(this.choicetext[this.rand_array[2]]);
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 1;
                this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 0.8;
                this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 1;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[0]] = 1;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[1]] = 0.8;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[2]] = 1;
            }
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 1;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 3;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 2;
            this.boxcount = 3;
        } else if (_questioncount == 2) {
            this.pinkportrait2 = 'spr_pinkghost_angry';
            this.pinkportrait = 'spr_pinkspeaker_wink';
            this.talktimer = 0;
            this.talktimer2 = 0;
            this.portrait1_talkspeed = 0.2;
            this.portrait2_talkspeed = 0.2;
            snd_play('snd_pink_mew', 1, 1.1);
            S.snd_play_delayed(this, 'snd_pink_mew', 12, 1, 1.4);
            snd_play('snd_pink_throw');
            S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
            this.second_text = S.stringsetloc("Call me ROTTEN!", "obj_date_controller_slash_Other_11_gml_220_0");
            this.first_text = S.stringsetloc("A gift for me?", "obj_date_controller_slash_Other_11_gml_221_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("Stinky fish", "obj_date_controller_slash_Other_11_gml_222_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("Rotten", "obj_date_controller_slash_Other_11_gml_223_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("Diamond", "obj_date_controller_slash_Other_11_gml_224_0");
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 50 / string_width(this.choicetext[this.rand_array[0]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 50 / string_width(this.choicetext[this.rand_array[1]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 50 / string_width(this.choicetext[this.rand_array[2]]);
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 0.8;
                this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 0.8;
                this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 0.7;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[0]] = 0.8;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[1]] = 0.8;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[2]] = 0.7;
            }
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 1;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 3;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 2;
            this.boxcount = 3;
        } else if (_questioncount == 3) {
            this.portraitshakecon = 1;
            this.portraitshaketimer = 0;
            this.portraitshakecon2 = 1;
            this.portraitshaketimer2 = 0;
            this.pinkportrait2 = 'spr_pinkghost_angry';
            this.pinkportrait = 'spr_pinkspeaker_wink';
            this.talktimer = 0;
            this.talktimer2 = 0;
            this.portrait1_talkspeed = 0.2;
            this.portrait2_talkspeed = 0.2;
            snd_play('snd_pink_mew', 1, 1.1);
            S.snd_play_delayed(this, 'snd_pink_mew', 12, 1, 1.4);
            snd_play('snd_pink_throw');
            S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
            this.second_text = S.stringsetloc("Wrinkled fruit!", "obj_date_controller_slash_Other_11_gml_257_0");
            this.first_text = S.stringsetloc("Did you want to...", "obj_date_controller_slash_Other_11_gml_258_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("Date", "obj_date_controller_slash_Other_11_gml_259_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("Raisin Face", "obj_date_controller_slash_Other_11_gml_260_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("Sports Day", "obj_date_controller_slash_Other_11_gml_261_0");
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 50 / string_width(this.choicetext[this.rand_array[0]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 50 / string_width(this.choicetext[this.rand_array[1]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 50 / string_width(this.choicetext[this.rand_array[2]]);
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 0.8;
                this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 0.8;
                this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 0.8;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[0]] = 0.8;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[1]] = 0.8;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[2]] = 0.8;
            }
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 1;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 3;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 2;
            this.boxcount = 3;
        } else if (_questioncount == 4) {
            this.portraitshakecon = 1;
            this.portraitshaketimer = 0;
            this.portraitshakecon2 = 1;
            this.portraitshaketimer2 = 0;
            this.pinkportrait2 = 'spr_pinkghost_angry';
            this.pinkportrait = 'spr_pinkspeaker_wink';
            this.talktimer = 0;
            this.talktimer2 = 0;
            this.portrait1_talkspeed = 0.2;
            this.portrait2_talkspeed = 0.2;
            snd_play('snd_pink_mew', 1, 1.1);
            S.snd_play_delayed(this, 'snd_pink_mew', 12, 1, 1.4);
            snd_play('snd_pink_throw');
            S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
            this.second_text = S.stringsetloc("Disappoint us!", "obj_date_controller_slash_Other_11_gml_294_0");
            this.first_text = S.stringsetloc("Where? I just wrote it.", "obj_date_controller_slash_Other_11_gml_295_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("Letter down", "obj_date_controller_slash_Other_11_gml_297_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("Schlock up", "obj_date_controller_slash_Other_11_gml_298_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("Love poem", "obj_date_controller_slash_Other_11_gml_299_0");
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 50 / string_width(this.choicetext[this.rand_array[0]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 50 / string_width(this.choicetext[this.rand_array[1]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 50 / string_width(this.choicetext[this.rand_array[2]]);
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 0.8;
                this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 0.7;
                this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 1;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[0]] = 0.8;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[1]] = 0.7;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[2]] = 1;
            }
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 1;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 3;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 2;
            this.boxcount = 3;
        } else if (_questioncount == 5) {
            this.portraitshakecon = 1;
            this.portraitshaketimer = 0;
            this.portraitshakecon2 = 1;
            this.portraitshaketimer2 = 0;
            this.pinkportrait2 = 'spr_pinkghost_angry';
            this.pinkportrait = 'spr_pinkspeaker_wink';
            this.talktimer = 0;
            this.talktimer2 = 0;
            this.portrait1_talkspeed = 0.2;
            this.portrait2_talkspeed = 0.2;
            snd_play('snd_pink_mew', 1, 1.1);
            S.snd_play_delayed(this, 'snd_pink_mew', 12, 1, 1.4);
            snd_play('snd_pink_throw');
            S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
            this.second_text = S.stringsetloc("Act bored!", "obj_date_controller_slash_Other_11_gml_332_0");
            this.first_text = S.stringsetloc("My bike part?", "obj_date_controller_slash_Other_11_gml_333_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("I tire", "obj_date_controller_slash_Other_11_gml_335_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("I yawn", "obj_date_controller_slash_Other_11_gml_336_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("I steering", "obj_date_controller_slash_Other_11_gml_337_0");
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 50 / string_width(this.choicetext[this.rand_array[0]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 50 / string_width(this.choicetext[this.rand_array[1]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 50 / string_width(this.choicetext[this.rand_array[2]]);
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 1;
                this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 1;
                this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 0.7;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[0]] = 1;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[1]] = 1;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[2]] = 0.7;
            }
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 1;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 3;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 2;
            this.boxcount = 3;
        } else if (_questioncount == 6) {
            this.portraitshakecon = 1;
            this.portraitshaketimer = 0;
            this.portraitshakecon2 = 1;
            this.portraitshaketimer2 = 0;
            this.pinkportrait2 = 'spr_pinkghost_angry';
            this.pinkportrait = 'spr_pinkspeaker_wink';
            this.talktimer = 0;
            this.talktimer2 = 0;
            this.portrait1_talkspeed = 0.2;
            this.portrait2_talkspeed = 0.2;
            snd_play('snd_pink_mew', 1, 1.1);
            S.snd_play_delayed(this, 'snd_pink_mew', 12, 1, 1.4);
            snd_play('snd_pink_throw');
            S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
            this.second_text = S.stringsetloc("Call us scrap!", "obj_date_controller_slash_Other_11_gml_370_0");
            this.first_text = S.stringsetloc("Which metal could?", "obj_date_controller_slash_Other_11_gml_371_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("Tin can", "obj_date_controller_slash_Other_11_gml_373_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("Broken tire", "obj_date_controller_slash_Other_11_gml_374_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("Steel should", "obj_date_controller_slash_Other_11_gml_375_0");
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 50 / string_width(this.choicetext[this.rand_array[0]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 50 / string_width(this.choicetext[this.rand_array[1]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 50 / string_width(this.choicetext[this.rand_array[2]]);
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 1;
            }
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 1;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 3;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 2;
            this.boxcount = 3;
        } else if (_questioncount == 7) {
            this.portraitshakecon = 1;
            this.portraitshaketimer = 0;
            this.portraitshakecon2 = 1;
            this.portraitshaketimer2 = 0;
            this.pinkportrait2 = 'spr_pinkghost_angry';
            this.pinkportrait = 'spr_pinkspeaker_wink';
            this.talktimer = 0;
            this.talktimer2 = 0;
            this.portrait1_talkspeed = 0.2;
            this.portrait2_talkspeed = 0.2;
            snd_play('snd_pink_mew', 1, 1.1);
            S.snd_play_delayed(this, 'snd_pink_mew', 12, 1, 1.4);
            snd_play('snd_pink_throw');
            S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
            this.second_text = S.stringsetloc("Chicken meat!!", "obj_date_controller_slash_Other_11_gml_408_0");
            this.first_text = S.stringsetloc("How'll you hold me?", "obj_date_controller_slash_Other_11_gml_409_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("Tender", "obj_date_controller_slash_Other_11_gml_411_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("Nugget", "obj_date_controller_slash_Other_11_gml_412_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("Sweetly", "obj_date_controller_slash_Other_11_gml_413_0");
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 50 / string_width(this.choicetext[this.rand_array[0]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 50 / string_width(this.choicetext[this.rand_array[1]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 50 / string_width(this.choicetext[this.rand_array[2]]);
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 1;
            }
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 1;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 3;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 2;
            this.boxcount = 3;
        } else if (_questioncount == 8) {
            this.portraitshakecon = 1;
            this.portraitshaketimer = 0;
            this.portraitshakecon2 = 1;
            this.portraitshaketimer2 = 0;
            this.pinkportrait2 = 'spr_pinkghost_angry';
            this.pinkportrait = 'spr_pinkspeaker_wink';
            this.talktimer = 0;
            this.talktimer2 = 0;
            this.portrait1_talkspeed = 0.2;
            this.portrait2_talkspeed = 0.2;
            snd_play('snd_pink_mew', 1, 1.1);
            S.snd_play_delayed(this, 'snd_pink_mew', 12, 1, 1.4);
            snd_play('snd_pink_throw');
            S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
            this.second_text = S.stringsetloc("Female dog!!!", "obj_date_controller_slash_Other_11_gml_446_0");
            this.first_text = S.stringsetloc("Susie's jeans?", "obj_date_controller_slash_Other_11_gml_447_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("Husky", "obj_date_controller_slash_Other_11_gml_449_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("Rottweiler", "obj_date_controller_slash_Other_11_gml_450_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("Ripped", "obj_date_controller_slash_Other_11_gml_451_0");
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 50 / string_width(this.choicetext[this.rand_array[0]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 50 / string_width(this.choicetext[this.rand_array[1]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 50 / string_width(this.choicetext[this.rand_array[2]]);
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 1;
            }
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 1;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 3;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 2;
            this.boxcount = 3;
        } else if (_questioncount == 9) {
            this.portraitshakecon = 1;
            this.portraitshaketimer = 0;
            this.portraitshakecon2 = 1;
            this.portraitshaketimer2 = 0;
            this.pinkportrait2 = 'spr_pinkghost_angry';
            this.pinkportrait = 'spr_pinkspeaker_wink';
            this.talktimer = 0;
            this.talktimer2 = 0;
            this.portrait1_talkspeed = 0.2;
            this.portrait2_talkspeed = 0.2;
            snd_play('snd_pink_mew', 1, 1.1);
            S.snd_play_delayed(this, 'snd_pink_mew', 12, 1, 1.4);
            snd_play('snd_pink_throw');
            S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
            this.second_text = S.stringsetloc("Prefer Noelle!", "obj_date_controller_slash_Other_11_gml_484_0");
            this.first_text = S.stringsetloc("Pay attention to me?", "obj_date_controller_slash_Other_11_gml_485_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("Fawn over her", "obj_date_controller_slash_Other_11_gml_487_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("Worse than Deer", "obj_date_controller_slash_Other_11_gml_488_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("Dote on her", "obj_date_controller_slash_Other_11_gml_489_0");
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 50 / string_width(this.choicetext[this.rand_array[0]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 50 / string_width(this.choicetext[this.rand_array[1]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 50 / string_width(this.choicetext[this.rand_array[2]]);
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 1;
            }
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 1;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 3;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 2;
            this.boxcount = 3;
        } else if (_questioncount == 10) {
            this.portraitshakecon = 1;
            this.portraitshaketimer = 0;
            this.portraitshakecon2 = 1;
            this.portraitshaketimer2 = 0;
            this.pinkportrait2 = 'spr_pinkghost_angry';
            this.pinkportrait = 'spr_pinkspeaker_wink';
            this.talktimer = 0;
            this.talktimer2 = 0;
            this.portrait1_talkspeed = 0.2;
            this.portrait2_talkspeed = 0.2;
            snd_play('snd_pink_mew', 1, 1.1);
            S.snd_play_delayed(this, 'snd_pink_mew', 12, 1, 1.4);
            snd_play('snd_pink_throw');
            S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
            this.second_text = S.stringsetloc("Be a weenie!", "obj_date_controller_slash_Other_11_gml_522_0");
            this.first_text = S.stringsetloc("Be honest?", "obj_date_controller_slash_Other_11_gml_523_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("Frank", "obj_date_controller_slash_Other_11_gml_525_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("Hot dog", "obj_date_controller_slash_Other_11_gml_526_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("Serious", "obj_date_controller_slash_Other_11_gml_527_0");
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 50 / string_width(this.choicetext[this.rand_array[0]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 50 / string_width(this.choicetext[this.rand_array[1]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 50 / string_width(this.choicetext[this.rand_array[2]]);
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 1;
            }
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 1;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 3;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 2;
            this.boxcount = 3;
        } else {
            this.portraitshakecon = 1;
            this.portraitshaketimer = 0;
            this.portraitshakecon2 = 1;
            this.portraitshaketimer2 = 0;
            this.pinkportrait2 = 'spr_pinkghost_angry';
            this.pinkportrait = 'spr_pinkspeaker_wink';
            this.talktimer = 0;
            this.talktimer2 = 0;
            this.portrait1_talkspeed = 0.2;
            this.portrait2_talkspeed = 0.2;
            snd_play('snd_pink_mew', 1, 1.1);
            S.snd_play_delayed(this, 'snd_pink_mew', 12, 1, 1.4);
            snd_play('snd_pink_throw');
            S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
            this.second_text = S.stringsetloc("Set wardrobe aflame!", "obj_date_controller_slash_Other_11_gml_560_0");
            this.first_text = S.stringsetloc("Coordinate outfits?", "obj_date_controller_slash_Other_11_gml_561_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("Match her style", "obj_date_controller_slash_Other_11_gml_563_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("Burn her clothes", "obj_date_controller_slash_Other_11_gml_564_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("Join her colors", "obj_date_controller_slash_Other_11_gml_565_0");
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 50 / string_width(this.choicetext[this.rand_array[0]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 50 / string_width(this.choicetext[this.rand_array[1]]);
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 50 / string_width(this.choicetext[this.rand_array[2]]);
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 1;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 1;
            }
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 1;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 3;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 2;
            this.boxcount = 3;
        }
    }
    if (O('obj_pink_enemy').datecount == 4) {
        this.rr = this.rr + 1;
        if (this.questioncount == 0) {
            this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("I liked it", "obj_date_controller_slash_Other_11_gml_585_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("I loved it", "obj_date_controller_slash_Other_11_gml_586_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("I got scared", "obj_date_controller_slash_Other_11_gml_587_0");
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 2;
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 2;
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 1;
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 0.7;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 0.7;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 0.7;
            }
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 4;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 4;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 1;
            this.boxcount = 3;
        }
        if (this.questioncount == 1) {
            this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("Anyone else's", "obj_date_controller_slash_Other_11_gml_604_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("Mine", "obj_date_controller_slash_Other_11_gml_605_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("Jealous too", "obj_date_controller_slash_Other_11_gml_606_0");
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 1;
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 2;
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 2;
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 0.7;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 0.7;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 0.7;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[0]] = 0.7;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[1]] = 0.7;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[2]] = 0.7;
            }
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 1;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 4;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 4;
            this.boxcount = 3;
        }
        if (this.questioncount == 2) {
            this.choicetext ??= []; this.choicetext[this.rand_array[0]] = S.stringsetloc("Love us both", "obj_date_controller_slash_Other_11_gml_623_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[1]] = S.stringsetloc("Ignore your needs", "obj_date_controller_slash_Other_11_gml_624_0");
            this.choicetext ??= []; this.choicetext[this.rand_array[2]] = S.stringsetloc("Destroy them", "obj_date_controller_slash_Other_11_gml_625_0");
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[0]] = 2;
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[1]] = 1;
            this.choicetextxscale ??= []; this.choicetextxscale[this.rand_array[2]] = 2;
            if (global.lang == "ja") {
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 0); this.choicetextxscale[0] = 0.7;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 1); this.choicetextxscale[1] = 0.7;
                this.choicetextxscale ??= []; AF(this.choicetextxscale, 2); this.choicetextxscale[2] = 0.7;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[0]] = 0.7;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[1]] = 0.7;
                this.choicetextyscale ??= []; this.choicetextyscale[this.rand_array[2]] = 0.7;
            }
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[0]] = 1;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[1]] = 4;
            this.choiceiscorrect ??= []; this.choiceiscorrect[this.rand_array[2]] = 4;
            this.boxcount = 3;
        }
    }
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 0); this.drawn_box_text[0] = this.choicetext[0];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 1); this.drawn_box_text[1] = this.choicetext[1];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 2); this.drawn_box_text[2] = this.choicetext[2];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 3); this.drawn_box_text[3] = this.choicetext[3];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 4); this.drawn_box_text[4] = this.choicetext[4];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 5); this.drawn_box_text[5] = this.choicetext[5];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 6); this.drawn_box_text[6] = this.choicetext[6];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 7); this.drawn_box_text[7] = this.choicetext[7];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 8); this.drawn_box_text[8] = this.choicetext[8];
    this.drawn_box_text ??= []; AF(this.drawn_box_text, 9); this.drawn_box_text[9] = this.choicetext[9];
    _rr = 0;
    for (let _r5132 = 0, _n5132 = Math.trunc(10); _r5132 < _n5132; _r5132++) {
        if (this.choicetextxscale[_rr] > 3) {
            this.choicetextxscale ??= []; AF(this.choicetextxscale, _rr); this.choicetextxscale[_rr] = 3;
        }
        _rr = _rr + 1;
    }
  }
  step() {
    let _questioncorrectcount, i, ai, disable_left_right, c_lime2;
    global.turntimer = 999;
    _questioncorrectcount = this.questioncorrectcount;
    if (_questioncorrectcount > this.heartcount) {
        _questioncorrectcount = this.heartcount;
    }
    this.bgrectangle1colorcurrent = merge_color(this.bgrectangle1colorstart, this.lightpink, _questioncorrectcount / this.heartcount);
    this.bgrectangle2colorcurrent = merge_color(this.bgrectangle2colorstart, this.medpink, _questioncorrectcount / this.heartcount);
    this.dialogueboxcolorcurrent = merge_color(this.dialogueboxcolorstart, this.darkpink, _questioncorrectcount / this.heartcount);
    this.dialogueboxghostcolorcurrent = merge_color(this.dialogueboxghostcolorstart, this.darkpink, _questioncorrectcount / this.heartcount);
    this.choiceselectioncolorcurrent = merge_color(this.choiceselectioncolorstart, this.darkpink, _questioncorrectcount / this.heartcount);
    this.diamondbg_alpha_current = merge_color(0x000000, 0x010000, _questioncorrectcount / this.heartcount);
    if (this.con == 0) {
        this.surface1_x = this.surface1_x - this.grav;
        this.surface2_x = this.surface2_x + this.grav;
        if (this.con == 0) {
            this.grav = this.grav - 1;
        }
        if (this.surface1_x >= this.camx && this.con == 0) {
            this.con = 1;
            this.grav = 0;
            this.surface1_x = this.camx;
            this.surface2_x = this.camx + 320;
            if (W('obj_pink_enemy', function (other) {
                this.dateflashcon = 0;
            }, this) === EXIT) return;
            if (W('obj_writer', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            scr_shakescreen(this);
            snd_play('snd_impact');
            snd_stop('snd_rumble');
            if (O('obj_pink_enemy').datecount > 1) {
                i = 0;
                while ((i < 15) && LOOP('DateController#7')) {
                    if (W(instance_create_depth(this.camx + 320, this.camy + 20 + 28 * i, this.depth - 2, 'obj_shinobeetle_smokecloud'), function (other) {
                        this.image_xscale = 0.75;
                        this.image_yscale = 0.75;
                        this.image_index = choose(0, 1, 2, 3);
                        this.image_speed = 0;
                        this.direction = choose(0, 180);
                        this.speed = 1 + random(1);
                        this.image_alpha = this.image_alpha - random(0.07);
                        this.sprite_index = 'spr_shinobeetle_ow_dustcloud';
                        this.fadespeed = 0.1;
                    }, this) === EXIT) return;
                    if (i % 2 == 0) {
                        if (W(instance_create_depth(this.camx + 320, this.camy + 20 + 28 * i, this.depth - 1, 'obj_shinobeetle_smokecloud'), function (other) {
                            this.image_xscale = 0.5;
                            this.image_yscale = 0.5;
                            this.image_index = choose(0, 1);
                            this.image_speed = 0;
                            this.direction = choose(0, 180);
                            this.speed = 2 + random(3);
                            this.image_alpha = 1;
                            this.image_angle = - 30 + random(60);
                            this.sprite_index = 'spr_shinobeetle_ow_dustcloud_mew';
                            this.image_blend = make_color_rgb(255, 138, 144);
                            this.friction = 0.2;
                            this.fadespeed = 0.06;
                        }, this) === EXIT) return;
                    }
                    i = i + 1;
                }
                this.show_intro_outro_surfaces = false;
            }
        }
    }
    if (this.con == 1 && i_ex('obj_pink_enemy')) {
        this.draw_box_selected = 0;
        this.show_circle1timer = 0;
        this.show_circle2timer = 0;
        if (O('obj_pink_enemy').datecount == 1) {
            this.draw_box_timer = this.draw_box_timer + 1;
            if (this.questioncount == 0) {
                if (this.draw_box_timer > 0 && this.draw_box_timer <= 20) {
                    this.pinkportraitalpha = this.pinkportraitalpha + 0.05;
                }
                if (this.draw_box_timer > 0 && this.intro_outro_surfaces_whiteness_alpha < 1) {
                    this.intro_outro_surfaces_whiteness_alpha = this.intro_outro_surfaces_whiteness_alpha - 0.1;
                }
                if (this.draw_box_timer > 0 && this.ui_alpha < 1) {
                    this.ui_alpha = this.ui_alpha + 0.1;
                }
                if (this.draw_box_timer == 60) {
                    this.pinkportrait = 'spr_pinkspeaker_talk_happy';
                    this.sweatcon = 1;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    snd_play_x('snd_pink_gasp', 1, 1);
                    this.talktimer = - 5;
                    this.show_intro_outro_surfaces = false;
                    if (global.flag[1706] == 1) {
                        this.draw_box_timer = 222;
                        this.first_text = S.stringsetloc("What is this... a date!?", "obj_date_controller_slash_Step_0_gml_74_0_b");
                    } else {
                        this.first_text = S.stringsetloc("Wh-what's going on!?\nSchool!?", "obj_date_controller_slash_Step_0_gml_78_0");
                    }
                }
                if (this.draw_box_timer >= 66 && this.draw_box_timer < 151 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 151;
                    this.can_skip_timer = 0;
                }
                if (this.draw_box_timer == 151) {
                    this.portraitshakecon = 1;
                    this.pinkportrait = 'spr_pinkspeaker_angry';
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.first_text = S.stringsetloc("I don't... I don't even go to school anymore...", "obj_date_controller_slash_Step_0_gml_74_0");
                    snd_play('snd_pink_throw');
                    this.talktimer = 5;
                }
                if (this.draw_box_timer >= 151 && this.draw_box_timer < 221 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 221;
                    this.can_skip_timer = 0;
                }
                if (this.draw_box_timer >= 221 && this.draw_box_timer < 232) {
                    if (W('obj_date_heart', function (other) {
                        this.image_alpha = this.image_alpha + 0.1;
                    }, this) === EXIT) return;
                }
                if (this.draw_box_timer == 221) {
                    this.pinkportrait = 'spr_pinkspeaker_sad';
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.first_text = S.stringsetloc("And you wanna WALK\nME HOME!?", "obj_date_controller_slash_Step_0_gml_83_0");
                    snd_play_x('snd_pink_mew', 1, 1);
                    this.talktimer = 0;
                }
                if (this.draw_box_timer >= 232) {
                    this.con = 2;
                    this.datetimeleftmax = 240;
                    this.datetimeleft = this.datetimeleftmax;
                }
            }
            if (this.questioncount == 1 && global.flag[1706] == 1) {
                if (this.draw_box_timer == 1) {
                    this.portraitshakecon = 1;
                    this.pinkportrait = 'spr_pinkspeaker_sad_blush';
                    snd_play_x('snd_pink_gasp', 1, 1);
                    this.first_text = "";
                }
                if (this.draw_box_timer > 1 && this.draw_box_timer < 61 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 61;
                    this.can_skip_timer = 0;
                }
                if (this.draw_box_timer == 61) {
                    this.portraitshakecon = 1;
                    this.pinkportrait = 'spr_pinkspeaker_angryblush';
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.first_text = S.stringsetloc("Shut up!!!", "obj_date_controller_slash_Step_0_gml_124_0");
                    snd_play_x('snd_pink_gasp', 1, 1);
                    this.talktimer = 0;
                }
                if (this.draw_box_timer > 61 && this.draw_box_timer < 121 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 121;
                    this.can_skip_timer = 0;
                }
                if (this.draw_box_timer == 121) {
                    snd_play('snd_boost');
                    this.minigame_won = true;
                    this.minigame_con = 1;
                    if (W('obj_pink_enemy', function (other) {
                        this.explode_after_date = true;
                    }, this) === EXIT) return;
                }
            }
            if (this.questioncount == 1 && global.flag[1706] == 0) {
                if (this.draw_box_timer >= 1 && this.draw_box_timer < 18 && this.pinkindex < 6) {
                    this.pinkindex = this.pinkindex + 0.3333333333333333;
                }
                if (this.draw_box_timer >= 1) {
                    this.con = 2;
                    this.datetimeleftmax = 240;
                    this.datetimeleft = this.datetimeleftmax;
                    this.sweatcon = 1;
                    this.havent_moved_left_or_right = true;
                    this.pinkportrait = 'spr_pinkspeaker_talk_happy';
                    this.first_text = S.stringsetloc("It's... because you think this body's CUTE, right!?", "obj_date_controller_slash_Step_0_gml_107_0");
                    snd_play('snd_pink_throw');
                    S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
                    this.talktimer = 0;
                    this.pinkindex = 0;
                }
            }
            if (this.questioncount == 2) {
                this.con = 2;
                this.datetimeleftmax = 240;
                this.datetimeleft = this.datetimeleftmax;
                this.portraitshakecon = 1;
                this.pinkportrait = 'spr_pinkspeaker_sad';
                this.first_text = S.stringsetloc("You... wish you never met me, right...?", "obj_date_controller_slash_Step_0_gml_121_0");
                snd_play('snd_pink_throw');
                this.talktimer = 0;
            }
            if (this.questioncount == 3) {
                if (this.draw_box_timer == 1) {
                    this.portraitshakecon = 1;
                    this.pinkportrait = 'spr_pinkspeaker_angryblush';
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.first_text = S.stringsetloc("ARRRGH, enough already! This is OVER!\t", "obj_date_controller_slash_Step_0_gml_141_0");
                    snd_play_x('snd_pink_gasp', 1, 1);
                    this.talktimer = 0;
                }
                if (this.draw_box_timer > 1 && this.draw_box_timer < 41 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 41;
                    this.can_skip_timer = 0;
                }
                if (this.draw_box_timer == 41) {
                    snd_play('snd_boost');
                    this.minigame_won = true;
                    this.minigame_con = 1;
                    if (W('obj_pink_enemy', function (other) {
                        this.explode_after_date = true;
                    }, this) === EXIT) return;
                }
            }
        }
        if (O('obj_pink_enemy').datecount == 2) {
            if (W('obj_date_heart', function (other) {
                this.image_alpha = this.image_alpha + 0.1;
            }, this) === EXIT) return;
            if (this.rr == 0) {
                this.draw_box_timer = this.draw_box_timer + 1;
                if (this.draw_box_timer < 11) {
                    this.pinkportraitalpha = this.pinkportraitalpha + 0.1;
                }
                if (this.draw_box_timer == 12) {
                    this.draw_box_timer = 81;
                }
                if (this.draw_box_timer == 100 && global.flag[1707] == 1) {
                    this.draw_box_timer = 500;
                }
                if (this.draw_box_timer == 101) {
                    this.pinkportrait = 'spr_pinkspeaker_talk_happy';
                    this.date_text_char_number = 0;
                    this.date_text_char_number = 0;
                    this.first_text = S.stringsetloc("Let's date, mew!", "obj_date_controller_slash_Step_0_gml_164_0");
                    this.talktimer = 0;
                    snd_stop('snd_pink_mew');
                    snd_stop('snd_pink_throw');
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.3);
                    this.draw_box_timer = 111;
                }
                if (this.draw_box_timer > 126 && this.draw_box_timer < 171 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 171;
                    this.can_skip_timer = 0;
                }
                if (this.draw_box_timer == 171) {
                    this.portraitshakecon = 1;
                    this.pinkportrait = 'spr_pinkspeaker_angryblush';
                    this.date_text_char_number = 0;
                    this.date_text_char_number = 0;
                    this.first_text = S.stringsetloc("I'M NOT DOING THIS!!", "obj_date_controller_slash_Step_0_gml_177_0");
                    this.talktimer = 6;
                    this.portrait1_talkspeed = 0.2;
                    this.shaketext_x = - 4 + random(8);
                    snd_stop('snd_pink_mew');
                    snd_stop('snd_pink_throw');
                    snd_play('snd_pink_throw');
                    S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
                    this.draw_box_timer = 181;
                }
                if (this.draw_box_timer > 189 && this.draw_box_timer < 231 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 231;
                    this.can_skip_timer = 0;
                }
                if (this.draw_box_timer == 231) {
                    this.portraitshakecon = 1;
                    this.pinkportrait = 'spr_pinkspeaker_nya';
                    this.date_text_char_number = 0;
                    this.date_text_char_number = 0;
                    this.first_text = S.stringsetloc("Let's date, mew!!!", "obj_date_controller_slash_Step_0_gml_192_0");
                    this.talktimer = 5;
                    this.portrait1_talkspeed = 0.2;
                    snd_stop('snd_pink_mew');
                    snd_stop('snd_pink_throw');
                    snd_play('snd_pink_mew', 1, 1.1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 12, 1, 1.4);
                    this.draw_box_timer = 251;
                }
                if (this.draw_box_timer > 263 && this.draw_box_timer < 291 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 291;
                    this.can_skip_timer = 0;
                }
                if (this.draw_box_timer == 291) {
                    this.portraitshakecon = 1;
                    this.pinkportrait = 'spr_pinkspeaker_angryblush';
                    this.date_text_char_number = 0;
                    this.date_text_char_number = 0;
                    this.first_text = S.stringsetloc("I'M! NOT! DOING! THIS!!!", "obj_date_controller_slash_Step_0_gml_206_0");
                    this.talktimer = 10;
                    this.portrait1_talkspeed = 0.25;
                    snd_stop('snd_pink_mew');
                    snd_stop('snd_pink_throw');
                    snd_play('snd_pink_throw');
                    S.snd_play_delayed(this, 'snd_pink_throw', 6, 1, 0.6);
                }
                if (this.draw_box_timer > 297 && this.draw_box_timer < 321 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 321;
                    this.can_skip_timer = 0;
                }
                if (this.draw_box_timer >= 321 && this.draw_box_timer < 500) {
                    this.portrait_change_timer = this.portrait_change_timer + 1;
                    if (this.portrait_change_timer >= this.portrait_change_timer_max) {
                        this.talktimer = 10;
                        this.portrait1_talkspeed = 0.3333333333333333;
                        if (this.pinkportrait != 'spr_pinkspeaker_angryblush') {
                            this.pinkportrait = 'spr_pinkspeaker_angryblush';
                            snd_stop('snd_pink_mew');
                            snd_stop('snd_pink_throw');
                            snd_play('snd_pink_throw');
                            this.date_text_char_number = 0;
                            this.date_text_char_number = 0;
                            this.first_text = S.stringsetloc("I'M! NOT! DOING! THIS!!!", "obj_date_controller_slash_Step_0_gml_227_0");
                        } else {
                            this.pinkportrait = 'spr_pinkspeaker_talk';
                            snd_stop('snd_pink_mew');
                            snd_stop('snd_pink_throw');
                            snd_play('snd_pink_mew');
                            this.date_text_char_number = 0;
                            this.date_text_char_number = 0;
                            this.first_text = S.stringsetloc("Let's date, mew!!!", "obj_date_controller_slash_Step_0_gml_235_0");
                        }
                        if (this.portrait_change_timer_max <= 3) {
                            this.shaketext_x = - 4 + random(8);
                        }
                        this.portrait_change_timer = 0;
                        if (this.portrait_change_timer_max > 3) {
                            this.portrait_change_timer_max = this.portrait_change_timer_max - 1;
                        }
                    }
                }
                if (this.draw_box_timer == 500) {
                    this.shaketext_x = 0;
                    this.first_text = "";
                    this.pinkportrait = 'spr_pinkspeaker_concerned';
                    this.pinkportrait2 = 'spr_pinkghost_concerned';
                    this.portraitscon = 1;
                    this.pinkportraitalpha = 0.5;
                    this.pinkportraitalpha2 = 0.5;
                    if (T(global.is_console)) {
                        if (W('obj_border_controller', function (other) {
                            S.set_border(4839);
                        }, this) === EXIT) return;
                    }
                }
                if (this.draw_box_timer >= 500 && this.draw_box_timer < 511) {
                    this.pinkportraitalpha = this.pinkportraitalpha + 0.05;
                }
                if (this.draw_box_timer >= 500 && this.draw_box_timer < 511) {
                    this.pinkportraitalpha2 = this.pinkportraitalpha2 + 0.05;
                }
                if (this.draw_box_timer == 530 && global.flag[1707] == 1) {
                    this.draw_box_timer = 911;
                }
                if (this.draw_box_timer == 530) {
                    this.portraitshakecon = 1;
                    this.portraitshakecon2 = 1;
                    sprite_set_offset('spr_pinkghost_shock_full', 31, 0);
                    sprite_set_offset('spr_pinkspeaker_shocked_origin_adjusted', 33, 10);
                    this.pinkportrait = 'spr_pinkspeaker_shocked_origin_adjusted';
                    this.pinkportrait2 = 'spr_pinkghost_shock_full';
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.first_text = S.stringsetloc("H-Hey, we\nsplit!!", "obj_date_controller_slash_Step_0_gml_271_0");
                    this.second_text = S.stringsetloc("H-Hey, we\nsplit!!", "obj_date_controller_slash_Step_0_gml_272_0");
                    this.talktimer = - 20;
                    snd_play('snd_pink_trip', 1, 1.1);
                    snd_play('snd_pink_trip', 1, 1.2);
                }
                if (this.draw_box_timer > 535 && this.draw_box_timer < 610 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 610;
                }
                if (this.draw_box_timer == 610) {
                    sprite_set_offset('spr_pinkspeaker_shocked_origin_adjusted', 26, 10);
                    this.portraitshakecon = 1;
                    this.pinkportrait = 'spr_pinkspeaker_overjoyed';
                    this.pinkportrait2 = 'spr_pinkghost_concerned';
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.first_text = S.stringsetloc("Now we can BOTH\ndate, mew!", "obj_date_controller_slash_Step_0_gml_283_0");
                    this.second_text = "";
                    this.talktimer = - 10;
                    this.portrait1_talkspeed = 0.2;
                    snd_play('snd_pink_gasp', 1, 1.2);
                    S.snd_play_delayed(this, 'snd_pink_throw', 6, 1, 0.6);
                }
                if (this.draw_box_timer > 617 && this.draw_box_timer < 670 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 670;
                }
                if (this.draw_box_timer == 670) {
                    this.portraitshakecon = 1;
                    this.pinkportrait = 'spr_pinkspeaker_nya';
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.first_text = S.stringsetloc("Will you say something\nnice to us?", "obj_date_controller_slash_Step_0_gml_295_0");
                    this.talktimer = 0;
                    snd_stop('snd_pink_mew');
                    snd_stop('snd_pink_throw');
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.3);
                }
                if (this.draw_box_timer > 685 && this.draw_box_timer < 730 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 730;
                }
                if (this.draw_box_timer == 730) {
                    this.portraitshakecon2 = 1;
                    this.pinkportrait2 = 'spr_pinkghost_angry';
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.first_text = "";
                    this.second_text = S.stringsetloc("NO, say something\nNASTY to us!!", "obj_date_controller_slash_Step_0_gml_308_0");
                    this.talktimer2 = 10;
                    this.portrait2_talkspeed = 0.3333333333333333;
                    this.shaketext_x = - 4 + random(8);
                    snd_stop('snd_pink_mew');
                    snd_stop('snd_pink_throw');
                    snd_play('snd_pink_throw');
                    S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
                    this.draw_box_timer = 768;
                }
                if (this.draw_box_timer > 776 && this.draw_box_timer < 821 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 821;
                }
                if (this.draw_box_timer == 821) {
                    this.portraitshakecon = 1;
                    this.portraitshakecon2 = 1;
                    this.pinkportrait = 'spr_pinkspeaker_talk_happy';
                    this.pinkportrait2 = 'spr_pinkghost_concerned';
                    this.first_text = "";
                    this.second_text = "";
                    this.multi_color_text_con = 0x010000;
                    this.talktimer = - 20;
                    this.talktimer2 = - 20;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.3);
                    snd_play('snd_pink_throw');
                    S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
                }
                if (this.draw_box_timer > 821 && this.draw_box_timer < 911 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 911;
                }
                if (this.draw_box_timer >= 911) {
                    this.multi_color_text_con = 0x000000;
                    this.user1?.();
                    this.con = 2;
                    this.datetimeleftmax = 240;
                    this.datetimeleft = this.datetimeleftmax;
                    this.rr = 1;
                }
            } else if (this.rr >= 1) {
                this.con = 2;
                this.datetimeleftmax = 240;
                this.datetimeleft = this.datetimeleftmax;
                this.talktimer = 0;
            }
        }
        if (O('obj_pink_enemy').datecount == 3) {
            if (W('obj_date_heart', function (other) {
                this.image_alpha = this.image_alpha + 0.1;
            }, this) === EXIT) return;
            if (this.rr == 0) {
                this.draw_box_timer = this.draw_box_timer + 1;
                if (this.draw_box_timer < 11) {
                    this.pinkportraitalpha = this.pinkportraitalpha + 0.1;
                }
                if (this.draw_box_timer < 11) {
                    this.portrait_xscale = 2;
                }
                if (this.draw_box_timer >= 12 && this.pinkportraitalpha < 1) {
                    this.pinkportraitalpha = this.pinkportraitalpha + 0.05;
                }
                if (this.draw_box_timer == 12) {
                    this.date3con = 1;
                    this.first_text = this.clutching_head_string;
                    this.multi_color_text_con = 0x010000;
                    this.draw_box_timer = 42;
                    snd_stop('snd_pink_mew');
                    snd_play('snd_pink_mew');
                }
                if (this.draw_box_timer == 82) {
                    this.first_text = "";
                }
                if (this.draw_box_timer == 102) {
                    this.draw_box_timer = 132;
                    this.date3con = 2;
                    this.first_text = this.clutching_head_string2;
                    this.multi_color_text_con = 0x010000;
                    snd_stop('snd_pink_mew');
                    snd_play_x('snd_pink_mew', 1, 1.2);
                }
                if (this.draw_box_timer == 172) {
                    this.first_text = "";
                }
                if (this.draw_box_timer >= 12 && this.draw_box_timer <= 222) {
                    if (this.invertbgalpha < 1) {
                        this.invertbgalpha = this.invertbgalpha + 0.007;
                    }
                }
                if (this.draw_box_timer >= 12 && this.draw_box_timer <= 102) {
                    this.pinkportrait_x = 230 + irandom(4) - 2;
                }
                if (this.draw_box_timer >= 102 && this.draw_box_timer <= 222) {
                    this.pinkportrait_x = 230 + irandom(8) - 4;
                }
                if (this.draw_box_timer >= 222 && this.draw_box_timer <= 312) {
                    this.pinkportrait_x = 230 + irandom(12) - 6;
                }
                if (this.draw_box_timer == 222) {
                    i = 1;
                    while ((i < 5) && LOOP('DateController#8')) {
                        ai = instance_create_depth(this.camx + camerawidth() / 2, this.camy + this.camheight / 2, - 100000, 'obj_afterimage_screen');
                        if (W(ai, function (other) {
                            this.xscale = 1;
                            this.yscale = 1;
                            this.alpha = 0.3;
                            this.xrate = 0.03 * i;
                            this.yrate = 0.03 * i;
                            this.faderate = 0.025;
                        }, this) === EXIT) return;
                        i = i + 1;
                    }
                    this.first_text = "";
                    snd_stop('snd_pink_mew');
                    snd_play_x('snd_pink_mew', 1, 1.4);
                    snd_stop('snd_rumble');
                    snd_play('snd_explosion');
                    this.inst = S.scr_fadeout(60);
                    this.inst.image_blend = 0xffffff;
                    this.inst.depth = - 999999999;
                    if (W('obj_pink_enemy', function (other) {
                        this.playheartbeatsfx = false;
                    }, this) === EXIT) return;
                }
                if (this.draw_box_timer == 342) {
                    this.pinkportrait = 'spr_possessed_mewmew';
                    this.pinkportrait2 = 'spr_nothing';
                    snd_play_x('snd_ghostappear', 1, 0.6);
                    this.portrait2_xscale = - 2;
                    this.pinkportrait_x = 100;
                    this.pinkportrait2_x = - 1;
                    if (W('obj_fadeout', function (other) {
                        instance_destroy(this);
                    }, this) === EXIT) return;
                    this.inst = S.scr_fadein(60);
                    this.inst.image_blend = 0xffffff;
                    this.inst.depth = - 999999999;
                    this.date3con = 0;
                    this.first_text = this.goawaystring;
                    this.multi_color_text_con = 0x010000;
                    snd_loop('snd_pink_stretch_2_troubled');
                    snd_volume('snd_pink_stretch_2_troubled', 0, 0);
                    snd_volume('snd_pink_stretch_2_troubled', 1, 90);
                }
                if (this.draw_box_timer >= 340 && this.finalattackcon == 0 && i_ex('obj_pink_enemy')) {
                    instance_create(this.camx - 40, this.camy - 40, 'obj_heart');
                    if (W('obj_heart', function (other) {
                        this.sprite_index = 'spr_purpleheart';
                        this.canmove = 0;
                    }, this) === EXIT) return;
                    this.first_text = "";
                    global.monsterattackname ??= []; global.monsterattackname[O('obj_pink_enemy').myself] = "pink final attack";
                    this.__dc = instance_create_depth(this.x, this.y, this.depth - 20, 'obj_dbulletcontroller');
                    this.__dc.creator = O('obj_pink_enemy').myself;
                    this.__dc.creatorid = OI('obj_pink_enemy');
                    this.__dc.target = O('obj_pink_enemy').mytarget;
                    this.__dc.damage = global.monsterat[O('obj_pink_enemy').myself] * 5;
                    this.__dc.type = 210;
                    this.__dc.difficulty = 0;
                    this.finalattackcon = 1;
                    this.date4darknessalpha = 0.2;
                }
                if (this.draw_box_timer >= 12 && this.portraitscon == 0 && this.minigame_won == 0 && i_ex('obj_purplecontrols') && O('obj_purplecontrols').difficulty == 4) {
                    this.date3endingcon = 1;
                    this.date3endingtimer = 0;
                    this.inst = S.scr_fadeout(30);
                    this.inst.image_blend = 0xffffff;
                    this.inst.depth = - 999999999;
                    if (W('obj_heart', function (other) {
                        instance_destroy(this);
                    }, this) === EXIT) return;
                    if (W('obj_purplecontrols', function (other) {
                        instance_destroy(this);
                    }, this) === EXIT) return;
                    if (W('obj_date_heart', function (other) {
                        instance_destroy(this);
                    }, this) === EXIT) return;
                    snd_play('snd_boost');
                    if (W('obj_pink_enemy', function (other) {
                        this.explode_after_date = true;
                    }, this) === EXIT) return;
                    snd_volume('snd_pink_stretch_2_troubled', 0, 90);
                    snd_loop('snd_pink_stretch_2_fixed');
                    snd_volume('snd_pink_stretch_2_fixed', 0, 0);
                    snd_volume('snd_pink_stretch_2_fixed', 1, 90);
                }
            }
        }
        if (this.date3endingcon == 1) {
            this.date3endingtimer = this.date3endingtimer + 1;
            if (this.date3endingtimer == 30) {
                this.minigame_won = true;
                this.minigame_con = 1;
                this.date3endingcon = 2;
                if (W('obj_date_ui', function (other) {
                    this.con = 3;
                    this.timer = 0;
                }, this) === EXIT) return;
                if (W('obj_pink_enemy', function (other) {
                    this.idlesprite = 'spr_pink_very_hurt';
                }, this) === EXIT) return;
            }
        }
        if (O('obj_pink_enemy').datecount == 4) {
            if (W('obj_date_heart', function (other) {
                this.image_alpha = this.image_alpha + 0.1;
            }, this) === EXIT) return;
            this.draw_box_timer = this.draw_box_timer + 1;
            if (this.questioncount == 0) {
                if (this.rr == 0) {
                    if (this.draw_box_timer < 11) {
                        this.pinkportraitalpha = this.pinkportraitalpha + 0.1;
                    }
                    if (this.draw_box_timer == 12) {
                        this.portraitscon = 1;
                    }
                } else if (this.draw_box_timer < 43) {
                    this.draw_box_timer = 43;
                }
                if (this.draw_box_timer == 43) {
                    this.pinkportrait = 'spr_pinkspeaker_date4_idle';
                    this.pinkportrait2 = 'spr_pinkghost_sad';
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("Body! I...\nI admit it.", "obj_date_controller_slash_Step_0_gml_422_0");
                    this.talktimer = 0;
                    this.talktimer = - 20;
                    this.portraitshakecon2 = 1;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.3);
                }
                if (this.draw_box_timer > 47 && this.draw_box_timer < 133 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 133;
                }
                if (this.draw_box_timer == 133) {
                    this.pinkportrait2 = 'spr_pinkghost_sad';
                    if (W('obj_writer', function (other) {
                        instance_destroy(this);
                    }, this) === EXIT) return;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("My heart really\nWAS beating...!", "obj_date_controller_slash_Step_0_gml_432_0");
                    this.talktimer = 0;
                    this.talktimer = - 20;
                    this.portraitshakecon2 = 1;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.3);
                }
                if (this.draw_box_timer > 137 && this.draw_box_timer < 223 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 223;
                }
                if (this.draw_box_timer == 223) {
                    if (W('obj_writer', function (other) {
                        instance_destroy(this);
                    }, this) === EXIT) return;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("But, it was\nonly because...", "obj_date_controller_slash_Step_0_gml_441_0");
                    this.talktimer = 0;
                    this.talktimer = - 20;
                    this.portraitshakecon2 = 1;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.3);
                }
                if (this.draw_box_timer > 227 && this.draw_box_timer < 313 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 313;
                }
                if (this.draw_box_timer == 313) {
                    if (W('obj_writer', function (other) {
                        instance_destroy(this);
                    }, this) === EXIT) return;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("When they flirted\nwith you...", "obj_date_controller_slash_Other_11_gml_583_0");
                    this.talktimer = 0;
                    this.talktimer = - 20;
                    this.portraitshakecon2 = 1;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.3);
                }
                if (this.draw_box_timer > 318 && this.draw_box_timer < 403 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 403;
                }
                if (this.draw_box_timer >= 403) {
                    this.datetimeleftmax = 240;
                    this.datetimeleft = this.datetimeleftmax;
                    this.user1?.();
                    this.con = 2;
                }
            } else if (this.questioncount == 1) {
                if (this.draw_box_timer == 1) {
                    this.pinkportrait = 'spr_pinkspeaker_date4_idle';
                    this.portraitshakecon = 1;
                    this.pinkportrait2 = 'spr_pinkghost_sad';
                    this.portraitshakecon2 = 1;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("I was scared!", "obj_date_controller_slash_Step_0_gml_460_0");
                    this.talktimer = 0;
                    this.talktimer2 = - 20;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                }
                if (this.draw_box_timer > 5 && this.draw_box_timer < 90 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 90;
                }
                if (this.draw_box_timer == 90) {
                    this.pinkportrait2 = 'spr_pinkghost_sad';
                    this.portraitshakecon2 = 1;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("After finally\n\"finding myself\"...", "obj_date_controller_slash_Step_0_gml_470_0");
                    this.talktimer2 = - 20;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.3);
                }
                if (this.draw_box_timer > 90 && this.draw_box_timer < 180 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 180;
                }
                if (this.draw_box_timer == 180) {
                    this.pinkportrait2 = 'spr_pinkghost_sad';
                    this.portraitshakecon2 = 1;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("I felt like I was...\nLOSING myself.", "obj_date_controller_slash_Step_0_gml_479_0");
                    this.talktimer2 = - 20;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 0.8);
                }
                if (this.draw_box_timer > 180 && this.draw_box_timer < 270 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 270;
                }
                if (this.draw_box_timer == 270) {
                    this.pinkportrait2 = 'spr_pinkghost_sad';
                    this.portraitshakecon2 = 1;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("I... I didn't want\nyou to be...", "obj_date_controller_slash_Other_11_gml_601_0");
                    this.talktimer2 = - 20;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 0.9);
                }
                if (this.draw_box_timer > 270 && this.draw_box_timer < 360 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 360;
                }
                if (this.draw_box_timer == 360) {
                    this.datetimeleftmax = 240;
                    this.datetimeleft = this.datetimeleftmax;
                    this.user1?.();
                    this.con = 2;
                }
            } else if (this.questioncount == 2) {
                if (this.draw_box_timer == 1) {
                    this.pinkportrait = 'spr_pinkspeaker_date4_idle';
                    this.portraitshakecon = 1;
                    this.pinkportrait2 = 'spr_pinkghost_date4_2';
                    this.portraitshakecon2 = 1;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("I only wanted you\nto be mine! To be ME!", "obj_date_controller_slash_Step_0_gml_497_0");
                    this.talktimer = - 20;
                    snd_play('snd_pink_throw');
                    S.snd_play_delayed(this, 'snd_pink_throw', 8, 1, 0.8);
                }
                if (this.draw_box_timer > 5 && this.draw_box_timer < 91 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 90;
                }
                if (this.draw_box_timer == 90) {
                    this.pinkportrait2 = 'spr_pinkghost_date4_2';
                    this.portraitshakecon2 = 1;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("Because...\nI HATE me!", "obj_date_controller_slash_Step_0_gml_507_0");
                    this.talktimer2 = - 20;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.5);
                }
                if (this.draw_box_timer > 90 && this.draw_box_timer < 180 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 180;
                }
                if (this.draw_box_timer == 180) {
                    this.pinkportrait2 = 'spr_pinkghost_date4_2';
                    this.portraitshakecon2 = 1;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("And If I became\nsomething I loved...", "obj_date_controller_slash_Step_0_gml_516_0");
                    this.talktimer2 = - 20;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.3);
                }
                if (this.draw_box_timer > 180 && this.draw_box_timer < 270 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 270;
                }
                if (this.draw_box_timer == 270) {
                    this.pinkportrait2 = 'spr_pinkghost_date4_2';
                    this.portraitshakecon2 = 1;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("Wouldn't that\nFIX it!?", "obj_date_controller_slash_Step_0_gml_525_0");
                    this.talktimer2 = - 20;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 22, 1, 1.1);
                }
                if (this.draw_box_timer > 270 && this.draw_box_timer < 360 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 360;
                }
                if (this.draw_box_timer == 360) {
                    this.pinkportrait2 = 'spr_pinkghost_sad';
                    this.portraitshakecon2 = 1;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("But... just puppeting\nyou around...", "obj_date_controller_slash_Step_0_gml_534_0");
                    this.talktimer2 = - 20;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.3);
                }
                if (this.draw_box_timer > 360 && this.draw_box_timer < 450 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 450;
                }
                if (this.draw_box_timer == 450) {
                    this.pinkportrait2 = 'spr_pinkghost_sad';
                    this.portraitshakecon2 = 1;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("That's... only hurting\nyou, isn't it?", "obj_date_controller_slash_Step_0_gml_543_0");
                    this.talktimer2 = - 20;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 0.8);
                }
                if (this.draw_box_timer > 450 && this.draw_box_timer < 540 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 540;
                }
                if (this.draw_box_timer == 540) {
                    this.pinkportrait2 = 'spr_pinkghost_date4_1';
                    this.portraitshakecon2 = 1;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("If... I want us\nto be together...", "obj_date_controller_slash_Step_0_gml_552_0");
                    this.talktimer2 = - 20;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 0.9);
                }
                if (this.draw_box_timer > 540 && this.draw_box_timer < 630 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 630;
                }
                if (this.draw_box_timer == 630) {
                    this.pinkportrait2 = 'spr_pinkghost_date4_1';
                    this.portraitshakecon2 = 1;
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.second_text = S.stringsetloc("Then...\nI have to...", "obj_date_controller_slash_Other_11_gml_620_0");
                    this.talktimer2 = - 20;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.3);
                }
                if (this.draw_box_timer > 630 && this.draw_box_timer < 720 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 720;
                }
                if (this.draw_box_timer == 720) {
                    this.datetimeleftmax = 240;
                    this.datetimeleft = this.datetimeleftmax;
                    this.pinkportrait2 = 'spr_pinkghost_date4_1';
                    this.user1?.();
                    this.con = 2;
                }
            } else if (this.questioncount == 3) {
                if (this.draw_box_timer == 1) {
                    this.ghost_fade_con = 1;
                    this.pinkportrait = 'spr_pinkspeaker_happycry';
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.first_text = S.stringsetloc("I want to be with\nyou too, mew!", "obj_date_controller_slash_Step_0_gml_575_0");
                    this.talktimer = 0;
                    S.snd_play_delayed(this, 'snd_pink_mew', 5, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.2);
                    S.snd_play_delayed(this, 'snd_pink_mew', 25, 1);
                }
                if (this.draw_box_timer > 5 && this.draw_box_timer < 90 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 90;
                }
                if (this.draw_box_timer == 90) {
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.first_text = S.stringsetloc("If we just listen\nto each other...", "obj_date_controller_slash_Step_0_gml_581_0");
                    this.talktimer = 0;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.3);
                }
                if (this.draw_box_timer > 90 && this.draw_box_timer < 180 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 180;
                }
                if (this.draw_box_timer == 180) {
                    this.date_text_char_number = 0;
                    this.date_text2_char_number = 0;
                    this.pinkportrait2 = 'spr_pinkghost_date4_3';
                    this.first_text = S.stringsetloc("I know we can balance\nbeing together!", "obj_date_controller_slash_Step_0_gml_587_0");
                    this.second_text = "";
                    this.talktimer = 10;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.4);
                }
                if (this.draw_box_timer > 180 && this.draw_box_timer < 270 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 270;
                }
                if (this.draw_box_timer == 270) {
                    this.date_text2_char_number = 0;
                    this.first_text = "";
                    this.second_text = S.stringsetloc("Oh, me! Let's never\nbe apart again!", "obj_date_controller_slash_Step_0_gml_593_0");
                    this.talktimer = 10;
                    this.portraitshakecon2 = 1;
                    S.snd_play_delayed(this, 'snd_pink_mew', 1, 1, 1);
                    S.snd_play_delayed(this, 'snd_pink_mew', 15, 1, 1.4);
                }
                if (this.draw_box_timer > 270 && this.draw_box_timer < 360 && (button1_h() || button3_h()) && this.can_skip_timer > 10) {
                    this.draw_box_timer = 360;
                }
                if (this.draw_box_timer == 360) {
                    snd_free_all();
                    this.datetimeleftmax = 240;
                    this.datetimeleft = this.datetimeleftmax;
                    this.user1?.();
                    this.con = 8;
                }
            } else {
                this.datetimeleftmax = 240;
                this.datetimeleft = this.datetimeleftmax;
                this.user1?.();
                this.second_text = this.questiontext;
                this.con = 2;
                this.stoptimer = false;
            }
        }
    }
    if (this.con == 2) {
        if (this.draw_box_con == 0 && this.boxalpha == 1 || O('obj_pink_enemy').datecount == 4 && this.draw_box_con == - 1) {
            disable_left_right = false;
            if (this.questioncount == 0 && O('obj_pink_enemy').datecount == 1 || O('obj_pink_enemy').datecount == 4) {
                disable_left_right = true;
            }
            if (O('obj_pink_enemy').datecount == 4 && this.draw_box_con == 0) {
                this.draw_box_timer = this.draw_box_timer + 1;
            }
            if (i_ex('obj_pink_enemy') && O('obj_pink_enemy').datecount == 2 && this.questioncount == 3) {
            } else {
                if (left_h() && disable_left_right == 0 || O('obj_pink_enemy').datecount == 4 && this.draw_box_timer >= 30) {
                    this.draw_box_con = - 1;
                    snd_play_x('snd_menumove', 1, 0.8);
                    this.draw_box_timer = 0;
                    this.havent_moved_left_or_right = false;
                }
                if (right_h() && disable_left_right == 0) {
                    this.draw_box_con = 1;
                    snd_play_x('snd_menumove', 1, 0.8);
                    this.draw_box_timer = 0;
                    this.havent_moved_left_or_right = false;
                }
                if (up_h()) {
                    this.draw_box_con = 2;
                    if (O('obj_pink_enemy').datecount == 4) {
                        this.draw_box_con = 3;
                    } else {
                        this.draw_box_timer = 0;
                    }
                    if (W('obj_marker', function (other) {
                        if (this.sprite_index == 'spr_pink_purple_arrow') {
                            instance_destroy(this);
                        }
                    }, this) === EXIT) return;
                }
            }
        }
        if (this.draw_box_con == - 1) {
            this.draw_box_timer = this.draw_box_timer + 1;
            if (O('obj_pink_enemy').datecount == 4) {
                this.drawn_box_x_offset = lerp(0, - 200, this.draw_box_timer / 30);
                if (this.draw_box_timer >= 30) {
                    this.draw_box_con = 0;
                    this.draw_box_timer = 29;
                    this.drawn_box_x_offset = 0;
                    this.draw_box_selected = this.draw_box_selected + 1;
                    if (this.draw_box_selected == this.boxcount) {
                        this.draw_box_selected = 0;
                    }
                }
            } else {
                this.drawn_box_x_offset = lerp(0, - 200, this.draw_box_timer / 5);
                if (this.draw_box_timer == 5) {
                    this.draw_box_con = 0;
                    this.draw_box_timer = 0;
                    this.drawn_box_x_offset = 0;
                    this.draw_box_selected = this.draw_box_selected + 1;
                    if (this.draw_box_selected == this.boxcount) {
                        this.draw_box_selected = 0;
                    }
                }
            }
        }
        if (this.draw_box_con == 1) {
            this.draw_box_timer = this.draw_box_timer + 1;
            this.drawn_box_x_offset = lerp(0, 200, this.draw_box_timer / 5);
            if (this.draw_box_timer == 5) {
                this.draw_box_con = 0;
                this.draw_box_timer = 0;
                this.drawn_box_x_offset = 0;
                this.draw_box_selected = this.draw_box_selected - 1;
                if (this.draw_box_selected == - 1) {
                    this.draw_box_selected = this.boxcount - 1;
                }
            }
        }
        if (this.draw_box_con == 2) {
            this.draw_box_timer = this.draw_box_timer + 1;
            this.heart.y = lerp(390, 319, this.draw_box_timer / 3);
            if (this.draw_box_timer >= 3) {
                this.draw_box_con = 0;
                this.draw_box_timer = 0;
                this.drawn_box_x_offset = 0;
                this.choiceselected = this.draw_box_selected;
            }
        }
        if (this.draw_box_con == 3) {
            if (this.draw_box_timer >= 15) {
                this.draw_box_con = 4;
            } else {
                this.draw_box_con = 5;
            }
        }
        for (let _r6190 = 0, _n6190 = Math.trunc(3); _r6190 < _n6190; _r6190++) {
            if (this.draw_box_con == 4) {
                this.draw_box_timer = this.draw_box_timer + 1;
                this.drawn_box_x_offset = lerp(0, - 200, this.draw_box_timer / 30);
                if (this.draw_box_timer >= 30) {
                    this.drawn_box_x_offset = 0;
                    this.draw_box_timer = 0;
                    this.draw_box_selected = this.draw_box_selected + 1;
                    if (this.draw_box_selected == this.boxcount) {
                        this.draw_box_selected = 0;
                    }
                    this.draw_box_con = 2;
                }
            }
            if (this.draw_box_con == 5) {
                this.draw_box_timer = this.draw_box_timer - 1;
                this.drawn_box_x_offset = lerp(0, - 200, this.draw_box_timer / 30);
                if (this.draw_box_timer <= 0) {
                    this.drawn_box_x_offset = 0;
                    this.draw_box_con = 2;
                }
            }
        }
        if (this.choiceselected > - 1) {
            if (W('obj_marker', function (other) {
                if (this.sprite_index == 'spr_pink_purple_arrow') {
                    instance_destroy(this);
                }
            }, this) === EXIT) return;
            if (this.choiceiscorrect[this.choiceselected] == 1) {
                this.con = 3;
                this.timer = 0;
                this.pinkportrait = choose('spr_pinkspeaker_nya', 'spr_pinkspeaker_nya2', 'spr_pinkspeaker_tongue');
                this.pinkportrait2 = choose('spr_pinkghost_nya_1', 'spr_pinkghost_nya_2');
                if (O('obj_pink_enemy').datecount == 4) {
                    sprite_set_offset('spr_pinkspeaker_shocked_origin_adjusted', 33, 10);
                    this.pinkportrait = 'spr_pinkspeaker_date4_questionright';
                    this.pinkportrait2 = 'spr_pinkghost_date4_1';
                }
                this.heartpathpos = 0;
                this.sideselected = - 1;
                snd_stop('snd_coin');
                snd_stop('snd_error');
                snd_play('snd_coin');
            } else if (this.choiceiscorrect[this.choiceselected] == 2) {
                this.con = 5;
                this.timer = 0;
                this.pinkportrait = choose('spr_pinkspeaker_nya', 'spr_pinkspeaker_nya2', 'spr_pinkspeaker_tongue');
                this.portraitshakecon = 1;
                this.heartpathpos = 0;
                this.sideselected = - 1;
                snd_stop('snd_coin');
                snd_stop('snd_error');
                snd_play('snd_error');
            } else if (this.choiceiscorrect[this.choiceselected] == 3) {
                this.con = 6;
                this.timer = 0;
                this.pinkportrait2 = choose('spr_pinkghost_nya_1', 'spr_pinkghost_nya_2');
                this.portraitshakecon2 = 1;
                this.heartpathpos = 0;
                this.sideselected = - 1;
                snd_stop('snd_coin');
                snd_stop('snd_error');
                snd_play('snd_error');
            } else {
                this.con = 4;
                this.timer = 0;
                this.heartpathpos = 0;
                this.sideselected = - 1;
                snd_stop('snd_coin');
                snd_stop('snd_error');
                snd_stop('snd_mercyadd');
                snd_play('snd_error');
            }
        }
        if (this.questioncount == 0 && O('obj_pink_enemy').datecount == 1 && this.datetimeleft == 100 && this.rr == 0) {
            this.rr = 1;
            if (W('obj_writer', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            this.portraitshakecon = 1;
            this.pinkportrait = 'spr_pinkspeaker_angry';
            this.date_text_char_number = 0;
            this.date_text2_char_number = 0;
            snd_play_x('snd_pink_throw', 1, 1);
            this.first_text = S.stringsetloc("Hey, you aren't even gonna press UP!?", "obj_date_controller_slash_Step_0_gml_800_0");
        }
        if ((this.questioncount == 1 || this.questioncount == 2) && O('obj_pink_enemy').datecount == 1 && this.havent_moved_left_or_right == 1 && this.datetimeleft == 90) {
            if (W('obj_writer', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            this.portraitshakecon = 1;
            this.pinkportrait = 'spr_pinkspeaker_angry';
            this.date_text_char_number = 0;
            this.date_text2_char_number = 0;
            snd_play_x('snd_pink_throw', 1, 1);
            this.first_text = S.stringsetloc("PRESS RIGHT AND CHOOSE SOMETHING ELSE!", "obj_date_controller_slash_Step_0_gml_808_0");
        }
    }
    if (this.con == 3) {
        this.timer = this.timer + 1;
        if (this.timer == 1) {
            if (W('obj_dmgwriter', function (other) {
                if (this.type == 5) {
                    this.x = this.camx + 320;
                    this.y = this.camy + 100;
                    this.ystart = this.camy + 100;
                    this.depth = other.depth - 120;
                }
            }, this) === EXIT) return;
            if (O('obj_pink_enemy').datecount > 1) {
                this.show_circle2 = 1;
            }
            this.show_circle1 = 1;
            this.hero_state = "choose";
        }
        c_lime2 = merge_color(this.darkpink, 0xffffff, 0.5);
        if (this.timer < 4) {
            this.bgrectangle1color = merge_color(this.bgrectangle1colorcurrent, this.lightpink, this.timer / 4);
            this.bgrectangle2color = merge_color(this.bgrectangle2colorcurrent, this.medpink, this.timer / 4);
            this.dialogueboxcolor = merge_color(this.dialogueboxcolorcurrent, c_lime2, this.timer / 4);
            this.dialogueboxghostcolor = merge_color(this.dialogueboxcolorcurrent, this.darkpink, this.timer / 4);
            this.choiceselectioncolor = merge_color(this.choiceselectioncolorcurrent, this.darkpink, this.timer / 4);
            this.diamondbg_alpha = merge_color(this.diamondbg_alpha_current, 0x010000, this.timer / 4);
        }
        if (this.timer >= 4 && this.timer < 8) {
            this.bgrectangle1color = merge_color(this.lightpink, this.bgrectangle1colorcurrent, (this.timer - 3) / 4);
            this.bgrectangle2color = merge_color(this.medpink, this.bgrectangle2colorcurrent, (this.timer - 3) / 4);
            this.dialogueboxcolor = merge_color(c_lime2, this.dialogueboxcolorcurrent, (this.timer - 3) / 4);
            this.dialogueboxghostcolor = merge_color(this.darkpink, this.dialogueboxghostcolorcurrent, (this.timer - 3) / 4);
            this.choiceselectioncolor = merge_color(this.darkpink, this.choiceselectioncolorcurrent, (this.timer - 3) / 4);
            this.diamondbg_alpha = merge_color(0x010000, this.diamondbg_alpha_current, (this.timer - 3) / 4);
        }
        if (this.timer == 10 + this.questiondowntime) {
            this.pinkportrait = 'spr_pinkspeaker_talk';
            this.pinkportrait2 = 'spr_pinkghost_concerned';
            this.timer = 0;
            this.con = 1;
            this.questioncount = this.questioncount + 1;
            this.questioncorrectcount = this.questioncorrectcount + 1;
            this.choiceselected = - 1;
            if (this.questiondowntime > 0) {
                this.questiondowntime = this.questiondowntime - 1;
            }
            this.datetimeleft = this.datetimeleftmax;
            if (this.questioncount == 1 && O('obj_pink_enemy').datecount == 1 && global.flag[1706] == 0 || this.questioncount == 2 && O('obj_pink_enemy').datecount == 1 && global.flag[1706] == 0) {
                this.date_text_char_number = 0;
                this.date_text2_char_number = 0;
            }
            if (O('obj_pink_enemy').datecount == 1 && this.questioncount == 1 && global.flag[1706] == 1) {
                this.pinkportrait = 'spr_pinkspeaker_sad_blush';
            }
            if (O('obj_pink_enemy').datecount == 4) {
                this.pinkportrait = 'spr_pinkspeaker_date4_idle';
                this.pinkportrait2 = 'spr_pinkghost_sad';
                if (this.questioncount == 3) {
                    this.pinkportrait2 = 'spr_pinkghost_date4_2';
                }
            }
            this.heart.x = 319;
            this.heart.y = 385;
            this.first_text = "";
            this.second_text = "";
            this.user1?.();
            this.show_circle1 = 0;
            this.show_circle2 = 0;
        }
    } else if (this.con == 4) {
        this.timer = this.timer + 1;
        if (this.timer == 1) {
            this.show_circle1 = 2;
            if (O('obj_pink_enemy').datecount > 1) {
                this.show_circle2 = 2;
            }
            this.hero_state = "choose";
        }
        if (this.timer < 4) {
            this.bgrectangle1color = merge_color(this.bgrectangle1colorcurrent, 0xffa040, this.timer / 4);
            this.bgrectangle2color = merge_color(this.bgrectangle2colorcurrent, 0xffa040, this.timer / 4);
            this.dialogueboxcolor = merge_color(this.dialogueboxcolorcurrent, 0xff0000, this.timer / 4);
            this.dialogueboxghostcolor = merge_color(this.dialogueboxghostcolorcurrent, 0xff0000, this.timer / 4);
            this.choiceselectioncolor = merge_color(this.choiceselectioncolorcurrent, 0xff0000, this.timer / 4);
            this.diamondbg_red_alpha = merge_color(0x000000, 0x010000, this.timer / 4);
        }
        if (this.timer >= 4 && this.timer < 7) {
            this.bgrectangle1color = merge_color(0xffa040, this.bgrectangle1colorcurrent, (this.timer - 3) / 4);
            this.bgrectangle2color = merge_color(0xffa040, this.bgrectangle2colorcurrent, (this.timer - 3) / 4);
            this.dialogueboxcolor = merge_color(0xff0000, this.dialogueboxcolorcurrent, (this.timer - 3) / 4);
            this.dialogueboxghostcolor = merge_color(0xff0000, this.dialogueboxghostcolorcurrent, (this.timer - 3) / 4);
            this.choiceselectioncolor = merge_color(0xff0000, this.choiceselectioncolorcurrent, (this.timer - 3) / 4);
            this.diamondbg_red_alpha = merge_color(0x010000, 0x000000, (this.timer - 3) / 4);
        }
        if (this.timer == 10) {
            snd_play('snd_pink_throw2');
        }
        if (this.timer == 10) {
            this.pinkportrait = 'spr_pinkspeaker_angry';
        }
        if (this.timer == 10) {
            this.pinkportrait2 = 'spr_pinkghost_angry';
        }
        if (this.timer == 10 && O('obj_pink_enemy').datecount >= 2) {
            this.pinkportrait = 'spr_pinkspeaker_angry';
        }
        if (this.timer == 10 && O('obj_pink_enemy').datecount >= 2) {
            this.pinkportrait2 = 'spr_pinkghost_angry';
        }
        if (this.timer == 10) {
            this.portraitshakecon = 1;
            this.portraitshaketimer = 0;
            snd_stop('snd_awkward');
            snd_play('snd_awkward');
        }
        if (this.timer >= 10 && this.timer < 16) {
            if (O('obj_pink_enemy').datecount == 1) {
                this.idiottext_x = lerp(this.camx + 320, this.camx + 320, (this.timer - 10) / 5);
                this.idiottext_y = lerp(this.camy + 160, this.camy + 190, (this.timer - 10) / 5);
            } else {
                this.idiottext_x = lerp(this.camx + 220, this.camx + 220, (this.timer - 10) / 5);
                this.idiottext_y = lerp(this.camy + 160, this.camy + 190, (this.timer - 10) / 5);
            }
            if (O('obj_pink_enemy').datecount != 1) {
                this.idiottext2_x = lerp(this.camx + 420, this.camx + 420, (this.timer - 10) / 5);
                this.idiottext2_y = lerp(this.camy + 160, this.camy + 190, (this.timer - 10) / 5);
            }
        }
        if (this.timer >= 36 && this.timer < 41) {
            if (O('obj_pink_enemy').datecount == 1) {
                this.idiottext_x = lerp(this.camx + 320, this.heart.x + 10, (this.timer - 36) / 5);
                this.idiottext_y = lerp(this.camy + 190, this.heart.y + 10, (this.timer - 36) / 5);
            } else {
                this.idiottext_x = lerp(this.camx + 220, this.heart.x + 10, (this.timer - 36) / 5);
                this.idiottext_y = lerp(this.camy + 190, this.heart.y + 10, (this.timer - 36) / 5);
            }
            if (O('obj_pink_enemy').datecount != 1) {
                this.idiottext2_x = lerp(this.camx + 420, this.heart.x + 10, (this.timer - 36) / 5);
                this.idiottext2_y = lerp(this.camy + 190, this.heart.y + 10, (this.timer - 36) / 5);
            }
        }
        if (this.timer == 41) {
            this.heartstatus ??= []; AF(this.heartstatus, this.questioncount); this.heartstatus[this.questioncount] = 1;
            this.timer = 0;
            this.con = 1;
            this.choiceselected = - 1;
            this.pinkportrait = 'spr_pinkspeaker_talk';
            this.pinkportrait2 = 'spr_pinkghost_concerned';
            this.datetimeleft = this.datetimeleftmax;
            if (O('obj_pink_enemy').datecount == 4) {
                this.pinkportrait = this.saveportrait1;
                this.pinkportrait2 = this.saveportrait2;
            }
            this.idiottext_x = this.camx + 320;
            this.idiottext_y = this.camy + 140;
            this.heart.x = 319;
            this.heart.y = 385;
            this.user0?.();
            this.show_circle1 = 0;
            this.show_circle2 = 0;
        }
    } else if (this.con == 5) {
        this.timer = this.timer + 1;
        if (this.timer == 1) {
            if (W('obj_dmgwriter', function (other) {
                if (this.type == 5) {
                    this.x = this.camx + 320;
                    this.y = this.camy + 100;
                    this.ystart = this.camy + 100;
                    this.depth = other.depth - 120;
                }
            }, this) === EXIT) return;
            this.show_circle1 = 1;
            this.show_circle2 = 2;
            this.hero_state = "choose";
        }
        if (this.timer < 4) {
            this.bgrectangle1color = merge_color(this.bgrectangle1colorcurrent, 0xffa040, this.timer / 4);
            this.bgrectangle2color = merge_color(this.bgrectangle2colorcurrent, 0xffa040, this.timer / 4);
            this.dialogueboxcolor = merge_color(this.choiceselectioncolorcurrent, this.darkpink, this.timer / 4);
            this.dialogueboxghostcolor = merge_color(this.choiceselectioncolorcurrent, 0xff0000, this.timer / 4);
            this.choiceselectioncolor = merge_color(this.choiceselectioncolorcurrent, 0xff0000, this.timer / 4);
            this.diamondbg_alpha = merge_color(this.diamondbg_alpha_current, 0x010000, this.timer / 4);
        }
        if (this.timer >= 4 && this.timer < 7) {
            this.bgrectangle1color = merge_color(0xffa040, this.bgrectangle1colorcurrent, (this.timer - 3) / 4);
            this.bgrectangle2color = merge_color(0xffa040, this.bgrectangle2colorcurrent, (this.timer - 3) / 4);
            this.dialogueboxcolor = merge_color(this.darkpink, this.dialogueboxcolorcurrent, (this.timer - 3) / 4);
            this.dialogueboxghostcolor = merge_color(0xff0000, this.dialogueboxcolorcurrent, (this.timer - 3) / 4);
            this.choiceselectioncolor = merge_color(0xff0000, this.choiceselectioncolorcurrent, (this.timer - 3) / 4);
            this.diamondbg_alpha = merge_color(0x010000, this.diamondbg_alpha_current, (this.timer - 3) / 4);
        }
        if (this.timer == 10) {
            snd_play('snd_pink_throw2');
        }
        if (this.timer == 10) {
            this.pinkportrait2 = 'spr_pinkghost_angry';
        }
        if (this.timer == 10) {
            this.portraitshakecon2 = 1;
            this.portraitshaketimer2 = 0;
            snd_stop('snd_awkward');
            snd_play('snd_awkward');
        }
        if (this.timer >= 10 && this.timer < 16) {
            this.idiottext_x = lerp(this.camx + 420, this.camx + 420, (this.timer - 10) / 5);
            this.idiottext_y = lerp(this.camy + 160, this.camy + 190, (this.timer - 10) / 5);
        }
        if (this.timer >= 36 && this.timer < 41) {
            this.idiottext_x = lerp(this.camx + 420, this.heart.x + 10, (this.timer - 36) / 5);
            this.idiottext_y = lerp(this.camy + 190, this.heart.y + 10, (this.timer - 36) / 5);
        }
        if (this.timer == 41) {
            this.heartstatus ??= []; AF(this.heartstatus, this.questioncount); this.heartstatus[this.questioncount] = 6;
            this.timer = 0;
            this.con = 1;
            this.choiceselected = - 1;
            this.pinkportrait = 'spr_pinkspeaker_talk';
            this.pinkportrait2 = 'spr_pinkghost_angry';
            this.idiottext_x = this.camx + 320;
            this.idiottext_y = this.camy + 140;
            if (O('obj_pink_enemy').datecount == 4) {
                this.pinkportrait = this.saveportrait1;
                this.pinkportrait2 = this.saveportrait2;
            }
            this.heart.x = 319;
            this.heart.y = 385;
            this.user0?.();
            if (this.questiondowntime > 0) {
                this.questiondowntime = this.questiondowntime - 1;
            }
            this.datetimeleft = this.datetimeleftmax;
            this.show_circle1 = 0;
            this.show_circle2 = 0;
            if (W('obj_writer', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
        }
    } else if (this.con == 6) {
        this.timer = this.timer + 1;
        if (this.timer == 1) {
            this.show_circle1 = 2;
            this.show_circle2 = 1;
            if (W('obj_dmgwriter', function (other) {
                if (this.type == 5) {
                    this.x = this.camx + 320;
                    this.y = this.camy + 100;
                    this.ystart = this.camy + 100;
                    this.depth = other.depth - 120;
                }
            }, this) === EXIT) return;
            this.hero_state = "choose";
        }
        if (this.timer < 4) {
            this.bgrectangle1color = merge_color(this.bgrectangle1colorcurrent, 0xffa040, this.timer / 4);
            this.bgrectangle2color = merge_color(this.bgrectangle2colorcurrent, 0xffa040, this.timer / 4);
            this.dialogueboxcolor = merge_color(this.choiceselectioncolorcurrent, 0xff0000, this.timer / 4);
            this.dialogueboxghostcolor = merge_color(this.choiceselectioncolorcurrent, this.darkpink, this.timer / 4);
            this.choiceselectioncolor = merge_color(this.choiceselectioncolorcurrent, 0xff0000, this.timer / 4);
            this.diamondbg_alpha = merge_color(this.diamondbg_alpha_current, 0x010000, this.timer / 4);
        }
        if (this.timer >= 4 && this.timer < 7) {
            this.bgrectangle1color = merge_color(0xffa040, this.bgrectangle1colorcurrent, (this.timer - 3) / 4);
            this.bgrectangle2color = merge_color(0xffa040, this.bgrectangle2colorcurrent, (this.timer - 3) / 4);
            this.dialogueboxcolor = merge_color(0xff0000, this.dialogueboxcolorcurrent, (this.timer - 3) / 4);
            this.dialogueboxghostcolor = merge_color(this.darkpink, this.dialogueboxcolorcurrent, (this.timer - 3) / 4);
            this.choiceselectioncolor = merge_color(0xff0000, this.choiceselectioncolorcurrent, (this.timer - 3) / 4);
            this.diamondbg_alpha = merge_color(0x010000, this.diamondbg_alpha_current, (this.timer - 3) / 4);
        }
        if (this.timer == 10) {
            snd_play('snd_pink_throw2');
        }
        if (this.timer == 10) {
            this.pinkportrait = 'spr_pinkspeaker_angry';
        }
        if (this.timer == 10) {
            this.portraitshakecon = 1;
            this.portraitshaketimer = 0;
            snd_stop('snd_awkward');
            snd_play('snd_awkward');
        }
        if (this.timer >= 10 && this.timer < 16) {
            this.idiottext2_x = lerp(this.camx + 220, this.camx + 220, (this.timer - 10) / 5);
            this.idiottext2_y = lerp(this.camy + 160, this.camy + 190, (this.timer - 10) / 5);
        }
        if (this.timer >= 36 && this.timer < 41) {
            this.idiottext2_x = lerp(this.camx + 220, this.heart.x + 10, (this.timer - 36) / 5);
            this.idiottext2_y = lerp(this.camy + 190, this.heart.y + 10, (this.timer - 36) / 5);
        }
        if (this.timer == 41) {
            this.heartstatus ??= []; AF(this.heartstatus, this.questioncount); this.heartstatus[this.questioncount] = 7;
            this.timer = 0;
            this.con = 1;
            this.choiceselected = - 1;
            this.pinkportrait = 'spr_pinkspeaker_talk';
            this.pinkportrait2 = 'spr_pinkghost_concerned';
            this.idiottext2_x = this.camx + 320;
            this.idiottext2_y = this.camy + 140;
            if (O('obj_pink_enemy').datecount == 4) {
                this.pinkportrait = this.saveportrait1;
                this.pinkportrait2 = this.saveportrait2;
            }
            this.heart.x = 319;
            this.heart.y = 385;
            this.user0?.();
            if (this.questiondowntime > 0) {
                this.questiondowntime = this.questiondowntime - 1;
            }
            this.datetimeleft = this.datetimeleftmax;
            this.show_circle1 = 0;
            this.show_circle2 = 0;
            if (W('obj_writer', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
        }
    } else if (this.con == 7) {
        if (this.minigame_con == 0) {
            this.surface1_x = this.surface1_x - this.grav;
            this.surface2_x = this.surface2_x + this.grav;
            this.grav = this.grav + 4;
        }
        if (W('obj_marker', function (other) {
            if (this.sprite_index == 'spr_pink_purple_arrow') {
                this.image_alpha = this.image_alpha - 0.2;
            }
            if (this.sprite_index == 'spr_pink_purple_arrow' && this.image_alpha < 0) {
                instance_destroy(this);
            }
        }, this) === EXIT) return;
        if (W('obj_pink_enemy', function (other) {
            this.x = this.xstart;
            this.y = this.ystart;
        }, this) === EXIT) return;
        if (this.surface1_x + this.grav <= this.camx - 320) {
            this.timer = this.timer + 1;
            if (this.timer == 1 && this.minigame_won == 1) {
                if (W('obj_pink_enemy', function (other) {
                    this.doki = 0;
                }, this) === EXIT) return;
                if (W('obj_pink_enemy', function (other) {
                    this.explosioncon = 1;
                }, this) === EXIT) return;
                if (W('obj_pink_enemy', function (other) {
                    this.idlesprite = 'spr_pink_shocked';
                }, this) === EXIT) return;
                if (W('obj_tensionbar', function (other) {
                    if (i_ex('obj_pink_enemy') && O('obj_pink_enemy').datecount != 3) {
                        this.maxtensionlimitpercent = 8;
                        this.maxtensionlimit = 20;
                        global.tension = 0;
                        this.current = 0;
                        this.apparent = 0;
                    }
                }, this) === EXIT) return;
            }
            if (this.timer >= 20) {
                if (this.minigame_won == 1) {
                    if (W('obj_pink_enemy', function (other) {
                        this.phaseturns = 0;
                    }, this) === EXIT) return;
                    if (W('obj_pink_enemy', function (other) {
                        this.looping = false;
                    }, this) === EXIT) return;
                } else {
                    if (i_ex('obj_pink_enemy')) {
                        if (O('obj_pink_enemy').datecount == 0) {
                            S.scr_tensionheal(round(lerp(0, 125, this.questioncorrectcount / 15)));
                        }
                        if (O('obj_pink_enemy').datecount == 1) {
                            S.scr_tensionheal(round(lerp(0, 125, this.questioncorrectcount / 13)));
                        }
                        if (O('obj_pink_enemy').datecount == 2) {
                            S.scr_tensionheal(round(lerp(0, 125, this.questioncorrectcount / 15)));
                        }
                        if (O('obj_pink_enemy').datecount == 3) {
                            S.scr_tensionheal(round(lerp(0, 125, this.questioncorrectcount / 10)));
                        }
                    }
                    if (W('obj_pink_enemy', function (other) {
                        this.datecount = this.datecount - 1;
                    }, this) === EXIT) return;
                }
            }
            if (this.timer >= 40) {
                instance_destroy(this);
            }
        }
    } else if (this.con == 8) {
        this.timer = this.timer + 1;
        if (this.timer == 1) {
            snd_play('snd_cymbal_reverse');
        }
        if (this.timer == 10) {
            this.first_text = "";
            this.second_text = "";
        }
        if (this.timer == 30) {
            if (W('obj_writer', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            scr_lerpvar(this, "pinkportrait2_x", this.pinkportrait2_x, 210, 150, 1, "in");
            scr_lerpvar(this, "pinkportrait_x", this.pinkportrait_x, 434, 374, 1, "in");
            this.__fadeouter = instance_create(this.camx - 200, this.camy - 200, 'obj_fadeout');
            this.__fadeouter.fadespeed = 0.006666666666666667;
            if (i_ex('obj_date_heart')) {
                this.__fadeouter.depth = O('obj_date_heart').depth - 9999;
            }
            this.__fadeouter.image_blend = 0xffffff;
        }
        if (this.timer == 132) {
            snd_play_x('snd_boost', 1, 0.9);
        }
        if (this.timer == 144) {
            snd_play_x('snd_boost', 0.6, 0.9);
        }
        if (this.timer == 156) {
            snd_play_x('snd_boost', 0.3, 0.9);
        }
        if (this.timer == 168) {
            snd_play_x('snd_boost', 0.1, 0.9);
        }
        if (this.timer == 180) {
            snd_play_x('snd_boost', 0.05, 0.9);
        }
        if (this.timer == 211) {
            if (W('obj_darkener', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            if (W('obj_battlecontroller', function (other) {
                this.skipvictory = 1;
            }, this) === EXIT) return;
            S.scr_wincombat();
            instance_destroy(this);
            this.__fadeouter = instance_create(this.camx - 200, this.camy - 200, 'obj_fadein');
            if (i_ex('obj_date_heart')) {
                this.__fadeouter.depth = O('obj_date_heart').depth - 9999;
            }
            this.__fadeouter.image_blend = 0xffffff;
            this.__fadeouter.image_alpha = 3.1;
            this.__fadeouter.fadespeed = - 0.04;
            if (W('obj_fadeout', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            if (W('obj_date_heart', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            if (W('obj_writer', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
        }
    } else {
        this.bgrectangle1color = this.bgrectangle1colorcurrent;
        this.bgrectangle2color = this.bgrectangle2colorcurrent;
        this.dialogueboxcolor = this.dialogueboxcolorcurrent;
        this.choiceselectioncolor = this.choiceselectioncolorcurrent;
    }
    if (this.portraitshakecon == 1 && this.portraitscon == 0) {
        if (this.portraitscon > 0 || this.con == 0 || this.con == 7) {
            this.portraitshakecon = 0;
            this.portraitshaketimer = 0;
        } else {
            if (this.portraitshaketimer == 0) {
                this.pinkportrait_x = this.pinkportrait_x + 4;
            }
            if (this.portraitshaketimer == 1) {
                this.pinkportrait_x = this.pinkportrait_x - 7;
            }
            if (this.portraitshaketimer == 2) {
                this.pinkportrait_x = this.pinkportrait_x + 5;
            }
            if (this.portraitshaketimer == 3) {
                this.pinkportrait_x = this.pinkportrait_x - 3;
            }
            if (this.portraitshaketimer == 4) {
                this.pinkportrait_x = this.pinkportrait_x + 1;
            }
            this.portraitshaketimer = this.portraitshaketimer + 1;
            if (this.portraitshaketimer == 4) {
                if (O('obj_pink_enemy').datecount == 1) {
                    this.pinkportrait_x = 210;
                }
                if (O('obj_pink_enemy').datecount == 2) {
                    if (this.pinkportraitalpha2 == 0) {
                        this.pinkportrait_x = 210;
                    } else {
                        this.pinkportrait_x = 99;
                    }
                }
                if (O('obj_pink_enemy').datecount == 3) {
                    this.pinkportrait_x = 99;
                }
                if (O('obj_pink_enemy').datecount == 4) {
                    this.pinkportrait_x = 99;
                }
                this.portraitshaketimer = 0;
                this.portraitshakecon = 0;
            }
        }
    }
    if (this.portraitshakecon2 == 1 && this.portraitscon == 0) {
        if (this.portraitscon > 0 || this.con == 0 || this.con == 7) {
            this.portraitshakecon2 = 0;
            this.portraitshaketimer2 = 0;
        } else {
            if (this.portraitshaketimer2 == 0) {
                this.pinkportrait2_x = this.pinkportrait2_x + 4;
            }
            if (this.portraitshaketimer2 == 1) {
                this.pinkportrait2_x = this.pinkportrait2_x - 7;
            }
            if (this.portraitshaketimer2 == 2) {
                this.pinkportrait2_x = this.pinkportrait2_x + 5;
            }
            if (this.portraitshaketimer2 == 3) {
                this.pinkportrait2_x = this.pinkportrait2_x - 3;
            }
            if (this.portraitshaketimer2 == 4) {
                this.pinkportrait2_x = this.pinkportrait2_x + 1;
            }
            this.portraitshaketimer2 = this.portraitshaketimer2 + 1;
            if (this.portraitshaketimer2 == 4) {
                if (O('obj_pink_enemy').datecount == 4) {
                    this.pinkportrait2_x = this.camx + 300;
                }
                this.portraitshaketimer2 = 0;
                this.portraitshakecon2 = 0;
            }
        }
    }
    if (this.portraitscon == 1) {
        this.portraitstimer = this.portraitstimer + 1;
        if (this.portraitstimer == 1) {
            snd_play('snd_ghostappear');
        }
        if (this.portraitstimer == 1) {
            snd_play('snd_ghostappear');
        }
        if (this.portraitstimer == 1) {
            snd_play('snd_ghostappear');
        }
        if (O('obj_pink_enemy').datecount == 3 || O('obj_pink_enemy').datecount == 4) {
            if (this.portraitstimer == 1) {
                scr_lerpvar(this, "pinkportrait_x", 200, 100, 20, - 1, "out");
            }
            if (this.portraitstimer == 1) {
                scr_lerpvar(this, "pinkportrait2_x", 414, 524, 20, - 1, "out");
            }
            if (O('obj_pink_enemy').datecount == 4) {
                this.pinkportraitalpha2 = this.pinkportraitalpha2 + 0.2;
            }
        } else {
            if (this.portraitstimer == 1) {
                scr_lerpvar(this, "pinkportrait_x", 210, 100, 20, - 1, "out");
            }
            if (this.portraitstimer == 1) {
                scr_lerpvar(this, "pinkportrait2_x", 210, 300, 20, - 1, "out");
            }
        }
        if (this.portraitstimer % 2 == 0) {
            this.portraitvisibility = true;
            this.portrait2visibility = false;
        } else {
            this.portrait2visibility = true;
            this.portraitvisibility = false;
        }
        if (O('obj_pink_enemy').datecount == 3 && this.portraitstimer == 22) {
            this.portrait2_xscale = 2;
            this.pinkportrait2_x = this.pinkportrait2_x - 224;
        }
        if (O('obj_pink_enemy').datecount == 4 && this.portraitstimer == 22) {
            this.portrait2_xscale = 2;
            this.pinkportrait2_x = this.pinkportrait2_x - 224;
            global.currentsong ??= []; AF(global.currentsong, 0); global.currentsong[0] = snd_init("mus_confession.ogg");
            global.currentsong ??= []; AF(global.currentsong, 1); global.currentsong[1] = mus_loop(global.currentsong[0]);
        }
        if (this.portraitstimer == 31) {
            this.portraitvisibility = true;
            this.portrait2visibility = true;
            this.portraitstimer = 0;
            this.portraitscon = 0;
        }
    }
    if (this.sweatcon == 1) {
        this.sweattimer = this.sweattimer + 1;
        if (this.sweattimer == 3) {
            this.sweatindex = 1;
        }
        if (this.sweattimer == 6) {
            this.sweatindex = 2;
        }
        if (this.sweattimer == 80) {
            this.sweattimer = 0;
            this.sweatcon = 0;
        }
    }
    if (this.sweatcon2 == 1) {
        this.sweattimer2 = this.sweattimer2 + 1;
        if (this.sweattimer2 == 3) {
            this.sweatindex2 = 1;
        }
        if (this.sweattimer2 == 6) {
            this.sweatindex2 = 2;
        }
        if (this.sweattimer2 == 80) {
            this.sweattimer2 = 0;
            this.sweatcon2 = 0;
        }
    }
    if (this.datetimeleft > 0) {
        if (this.con == 2 && this.draw_box_con == 0 && O('obj_pink_enemy').datecount != 3 && O('obj_pink_enemy').datecount != 4) {
            this.datetimeleft = this.datetimeleft - 1;
        }
        if (T(S.scr_debug()) && T(S.sunkus_kb_check_pressed(86))) {
            this.minigame_won = true;
        }
        if (this.datetimeleft < 0) {
            this.datetimeleft = 0;
        }
    }
    if (this.minigame_won == 1) {
        if (this.dialoguebox_alpha > 0) {
            this.dialoguebox_alpha = this.dialoguebox_alpha - 0.2;
            if (W('obj_tensionbar', function (other) {
                if (i_ex('obj_pink_enemy') && O('obj_pink_enemy').datecount != 3) {
                    this.maxtensionlimitpercent = 8;
                    this.maxtensionlimit = 20;
                    global.tension = 0;
                    this.current = 0;
                    this.apparent = 0;
                }
            }, this) === EXIT) return;
        } else if (this.con != 7) {
            this.con = 7;
            this.timer = 0;
            if (W('obj_date_heart', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            if (W('obj_writer', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            this.first_text = "";
            this.second_text = "";
        }
    }
    if (this.datetimeleft <= 0 && this.con == 2) {
        if (this.questioncount == 1 && O('obj_pink_enemy').datecount == 1 && global.flag[1706] == 0) {
            this.first_text = "";
        }
        this.con = 4;
        this.timer = 0;
        this.heartpathpos = 0;
        this.sideselected = - 1;
        snd_stop('snd_coin');
        snd_stop('snd_error');
        snd_stop('snd_mercyadd');
        snd_play('snd_error');
        if (W('obj_marker', function (other) {
            if (this.sprite_index == 'spr_pink_purple_arrow') {
                instance_destroy(this);
            }
        }, this) === EXIT) return;
    }
  }
}
defineObject('obj_date_controller', DateController);

// obj_date_heart (default sprite spr_purpleheart, depth 0)
class DateHeart extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_purpleheart';
  }
  create() {
    this.timer = 0;
    this.con = 0;
    this.image_speed = 0;
    this.image_alpha = 0;
  }
  draw() {
    let _x, _y;
    _x = 0;
    _y = 0;
    if (i_ex('obj_pink_enemy') && O('obj_pink_enemy').datecount == 3) {
        _x = 2;
    }
    if (i_ex('obj_pink_enemy') && O('obj_pink_enemy').datecount == 3) {
        _y = - 23;
    }
    if (i_ex('obj_purplecontrols') && O('obj_purplecontrols').life_time > 0) {
    } else {
        draw_sprite_ext(this.sprite_index, this.image_index, this.x - 10 + _x, this.y - 10 + _y, this.image_xscale, this.image_yscale, 0, 0xffffff, this.image_alpha);
    }
  }
  step() {
    return;
  }
}
defineObject('obj_date_heart', DateHeart);

// obj_shinobeetle_smokecloud (default sprite spr_shinobeetle_ow_dustcloud, depth 0)
class ShinobeetleSmokecloud extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_shinobeetle_ow_dustcloud';
  }
  create() {
    this.fadespeed = 0.04;
  }
  draw() {
    gpu_set_blendmode(1);
    draw_self(this);
    gpu_set_blendmode(0);
  }
  step() {
    this.image_alpha = this.image_alpha - this.fadespeed;
    if (this.image_alpha <= 0) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_shinobeetle_smokecloud', ShinobeetleSmokecloud);

// obj_fadein (default sprite spr_pixel_white, depth 0)
class Fadein extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_pixel_white';
    this.depth = -99999;
  }
  create() {
    this.image_blend = 0x000000;
    this.fadespeed = - 0.08;
    this.image_alpha = 1;
    this.length = 10 + room_width / 4;
    this.height = 10 + room_height / 4;
    this.x = - 20;
    this.y = - 20;
  }
  draw() {
    this.image_alpha = this.image_alpha + this.fadespeed;
    draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.length, this.height, 0, this.image_blend, this.image_alpha);
    if (this.image_alpha <= 0) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_fadein', Fadein);

// obj_afterimage_screen (default sprite None, depth 0)
class AfterimageScreen extends Instance {
  cleanUp() {
    if (surface_exists(this.my_surface)) {
        surface_free(this.my_surface);
    }
  }
  create() {
    this.my_surface = - 4;
    this.xscale = 1;
    this.yscale = 1;
    this.alpha = 0.5;
    this.anchor_x = this.x - S.camera_get_view_x(0);
    this.anchor_y = this.y - S.camera_get_view_y(0);
    this.xrate = 0.01;
    this.yrate = 0.01;
    this.faderate = 0.00625;
    this.draw_end = false;
  }
  draw() {
    if (T(this.draw_end)) {
        return;
    }
    if (!T(surface_exists(this.my_surface))) {
        this.my_surface = surface_create(surface_get_width(application_surface), surface_get_height(application_surface));
    }
    surface_set_target(this.my_surface);
    draw_surface(application_surface, 0, 0);
    surface_reset_target();
    draw_surface_ext(this.my_surface, this.x - this.anchor_x * this.xscale, this.y - this.anchor_y * this.yscale, this.xscale, this.yscale, 0, 0xffffff, this.alpha);
  }
  drawEnd() {
    if (!T(this.draw_end)) {
        return;
    }
    if (!T(surface_exists(this.my_surface))) {
        this.my_surface = surface_create(surface_get_width(application_surface), surface_get_height(application_surface));
    }
    surface_set_target(this.my_surface);
    draw_surface(application_surface, 0, 0);
    surface_reset_target();
    draw_surface_ext(this.my_surface, this.x - this.anchor_x * this.xscale, this.y - this.anchor_y * this.yscale, this.xscale, this.yscale, 0, 0xffffff, this.alpha);
    if (W('obj_heart', function (other) {
        draw_self(this);
    }, this) === EXIT) return;
  }
  step() {
    this.xscale = this.xscale + this.xrate;
    this.yscale = this.yscale + this.yrate;
    this.alpha = scr_approach(this.alpha, 0, this.faderate);
    if (this.alpha == 0) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_afterimage_screen', AfterimageScreen);

