// PINK: obj_pink_enemy (machine-translated from the Chapter 5 GML by tools/gen_pink.sh; edit tools/postfix.py, not this file)
/* eslint-disable */
import {
  S, button3_p, choose, d3d_set_fog, defineObject, draw_set_alpha, draw_set_color, draw_sprite_ext, draw_sprite_part_ext, global, gpu_set_fog, instance_create, instance_create_depth, instance_destroy, instance_exists, irandom, keyboard_check_pressed, lengthdir_x, lengthdir_y, lerp, make_color_rgb, merge_color, mus_loop_ext, mus_volume, random, random_range, snd_init, snd_loop, snd_play, snd_stop,
} from '../rt.js?v=20261115223550';
import {
  cameraheight, camerawidth, camerax, cameray, i_ex, scr_afterimage, scr_lerpvar, scr_script_delayed, scr_shakeobj, scr_shakescreen, scr_var, snd_play_x,
} from '../common.js?v=20261115223550';
import {
  EXIT, LOOP, O, P, T, W,
} from '../gml.js?v=20261115223550';

// obj_pink_enemy (default sprite spr_pink_idle, depth 0, parent obj_monsterparent)
class PinkEnemy extends P('obj_monsterparent') {
  constructor() {
    super();
    this.sprite_index = 'spr_pink_idle';
  }
  alarm4() {
    this.con = this.con + 1;
  }
  alarm6() {
    if (this.balloonend == 1) {
        this.talked = 1;
    } else {
        this.talked = 0.6;
        this.talktimer = 0;
    }
    if (this.introcon == 1) {
        this.introcon = 2;
    }
    if (this.introcon == 1) {
        this.introcon = 2;
    }
  }
  cleanUp() {
    if (W('obj_date_ui', function (other) {
        instance_destroy(this);
    }, this) === EXIT) return;
    if (W('obj_marker', function (other) {
        if (this.sprite_index == 'spr_board_loveheart') {
            instance_destroy(this);
        }
    }, this) === EXIT) return;
    if (W('obj_date_controller', function (other) {
        instance_destroy(this);
    }, this) === EXIT) return;
    if (W(this.black_square_bg, function (other) {
        instance_destroy(this);
    }, this) === EXIT) return;
    if (W(this.black_square_bg2, function (other) {
        instance_destroy(this);
    }, this) === EXIT) return;
    snd_stop('snd_electroshock_loop');
    snd_stop('snd_pink_stretch_2_troubled');
    snd_stop('snd_pink_stretch_2_fixed');
  }
  create() {
    super.create?.();
    snd_stop(global.batmusic[1]);
    global.batmusic ??= []; global.batmusic[0] = snd_init("pink.ogg");
    global.batmusic ??= []; global.batmusic[1] = mus_loop_ext(global.batmusic[0], 1, 1);
    if (W('obj_battleback', function (other) {
        instance_destroy(this);
    }, this) === EXIT) return;
    this.black_square_bg = instance_create_depth(camerax() - 10, cameray() + 40, this.depth + 999, 'obj_marker');
    this.black_square_bg.sprite_index = 'spr_whitepixel';
    this.black_square_bg.image_xscale = camerawidth() + 20;
    this.black_square_bg.image_yscale = 320;
    this.black_square_bg.image_blend = 0x000000;
    this.black_square_bg2 = instance_create_depth(camerax() - 10, cameray() - 10, this.depth + 9999, 'obj_marker');
    this.black_square_bg2.sprite_index = 'spr_whitepixel';
    this.black_square_bg2.image_xscale = camerawidth() + 20;
    this.black_square_bg2.image_yscale = cameraheight() + 20;
    this.black_square_bg2.image_blend = 0x000000;
    S.scr_enemy_object_init(this);
    this.talkmax = 90;
    this.idlesprite = 'spr_pink_idle';
    this.hurtsprite = 'spr_pink_front_surprised_nohead';
    this.sparedsprite = 'spr_pink_wistful';
    this.custom_draw_example = 0;
    this.turns = 1;
    this.phaseturns = 0;
    this.difficulty = 0;
    this.ballooncon = - 1;
    this.lovelyboy = false;
    this.lovelyboycount = 0;
    this.resetralsei = false;
    this.ralseiplushmarker = instance_create(- 1000, - 1000, 'obj_marker');
    this.ralseiplushmarker.sprite_index = 'spr_gameshow_drowningRalsei_ralsei_origin_edit';
    this.plushiehearttimer = 0;
    this.c_pink = make_color_rgb(230, 36, 123);
    this.outfit_select = choose(0, 1);
    this.outfit_count = 0;
    this.datecount = 0;
    this.datecon = 0;
    this.datetimer = 0;
    this.datefevercount = 0;
    this.krishearts = false;
    this.susiehearts = false;
    this.ralseihearts = false;
    this.krisheartstimer = 0;
    this.susieheartstimer = 0;
    this.ralseiheartstimer = 0;
    this.pink_head_white_alpha = 0;
    global.flag ??= []; global.flag[1706] = global.tempflag[67];
    global.flag ??= []; global.flag[1707] = global.tempflag[68];
    global.flag ??= []; global.flag[1708] = global.tempflag[69];
    this.sharefoodtimer = 0;
    this.sharefood_item_number = 1;
    this.explode_after_date = false;
    this.after_date_battlemsg = false;
    this.playheartbeatsfx = true;
    this.ghostintrotimer = 0;
    this.ghostintrocon = 0;
    this.ghosttimer = 0;
    this.ghostcon = 0;
    this.ghostmarker = instance_create_depth(this.x + 0, this.y - 35, this.depth - 2, 'obj_pink_ghost_marker');
    this.ghostmarker.sprite_index = 'spr_pink_ghost';
    this.ghostmarker.image_index = 0;
    this.ghostmarker.image_speed = 0.16666666666666666;
    this.ghostmarker.image_xscale = 2;
    this.ghostmarker.image_yscale = 2;
    this.ghostmarker.image_alpha = 0;
    this.ghostmarker2 = instance_create_depth(this.x + 0, this.y - 35, this.depth - 2, 'obj_pink_ghost_marker');
    this.ghostmarker2.sprite_index = 'spr_pink_ghost';
    this.ghostmarker2.image_index = 0;
    this.ghostmarker2.image_speed = 0.16666666666666666;
    this.ghostmarker2.image_xscale = 2;
    this.ghostmarker2.image_yscale = 2;
    this.ghostmarker2.image_alpha = 0;
    this.ghostmarker3 = instance_create_depth(this.x + 0, this.y - 35, this.depth - 2, 'obj_pink_ghost_marker');
    this.ghostmarker3.sprite_index = 'spr_pink_ghost';
    this.ghostmarker3.image_index = 0;
    this.ghostmarker3.image_speed = 0.16666666666666666;
    this.ghostmarker3.image_xscale = 2;
    this.ghostmarker3.image_yscale = 2;
    this.ghostmarker3.image_alpha = 0;
    this.tripleghostcon = 0;
    this.tripleghosttimer = 0;
    this.ghost2x = 0;
    this.ghost2y = 0;
    this.ghost2y = 0;
    this.ghost3y = 0;
    this.introtimer = - 17;
    this.introcon = 0;
    this.intropurple_y = 0;
    this.introalpha = 1;
    this.dateactdisabled = false;
    this.purple_color = make_color_rgb(192, 0, 192);
    this.depthstart = this.depth;
    this.looping = false;
    this.damagedialogue = 0;
    this.mewerslive_y_timer = 0;
    this.mewerslive_y_con = 1;
    this.mewerslive_y_target = 240;
    this.damage = 132;
    this.nonteamdamage = this.damage;
    this.myattackchoice = - 1;
    this.turnredcon = 0;
    this.turnredtimer = 0;
    this.electricity_con = 0;
    this.electricity_timer = 0;
    this.headangle = 0;
    this.headx = 0;
    this.heady = 0;
    this.headspeed = 0;
    this.headgravity = 0;
    this.hurtcount = 0;
    this.hurtcon = 0;
    this.hurttimer = 0;
    this.dateflashcon = 0;
    this.dateflashsiner = 0;
    this.ralslookup = 0;
    this.balloon_timer = 0;
    this.balloon_con = 0;
    this.doki = 0;
    this.dokimax = 15;
    this.dokiprev = 0;
    this.rr = 0;
    this.firstphaseturn = 0;
    this.teamdamage = 100;
    this.teamdamageproportional = false;
    for (let _r755 = 0, _n755 = (12); _r755 < _n755; _r755++) {
        this.questionsave ??= []; this.questionsave[this.rr] = this.rr + 1;
        this.rr = this.rr + 1;
    }
    this.questionsave = S.scr_array_shuffle(this.questionsave);
    this.global_question_count = irandom(10);
    this.explosioncon = 0;
    this.explosiontimer = 0;
    this.phase4introcon = 0;
    this.phase4introtimer = 0;
    this.skip_without_ending_balloon = false;
    this.tripleghostcon = 0;
    this.tripleghosttimer = 0;
    this.ghost2x = 0;
    this.ghost2y = 0;
    this.ghost2y = 0;
    this.ghost3y = 0;
    instance_create(this.x, this.y, 'obj_date_ui');
    instance_create(this.x, this.y, 'obj_pink_lipsync');
    this.image_speed = 0.16666666666666666;
    global.tempflag[96] ++;
    global.flag ??= []; global.flag[1449] = global.tempflag[96];
    if (global.flag[1449] > 1) {
        this.introcon = 3;
    }
    this.idiot1 = instance_create(this.x, this.y, 'obj_idiot_text');
    this.idiot2 = instance_create(this.x, this.y, 'obj_idiot_text');
    this.idiot2.con = 1;
    this.pink_battle_dialogue1 = S.stringsetloc("Ahuhuhu..^1. alright,&dearies^1! This is gonna be&a long battle^1, so &why don't you have&an appetizer^1, first!?/%", "obj_pink_enemy_slash_Create_0_gml_118_0");
    this.pink_battle_dialogue2 = S.stringsetloc("What the&hey!?&It's&PURPLE!?/%", "obj_pink_enemy_slash_Create_0_gml_119_0");
    this.pink_battle_dialogue3 = S.stringsetloc("Arrgh^1, that&stupid bug&said it was&FUCHSIA!!/%", "obj_pink_enemy_slash_Create_0_gml_120_0");
    this.pink_battle_dialogue4 = S.stringsetloc("Well^1, no&matter!&You're&trapped now!/%", "obj_pink_enemy_slash_Create_0_gml_121_0");
    this.pink_battle_dialogue5 = S.stringsetloc("A little floral tea &will have you tickled &pink^1! Pink^1! PINK!!!/%", "obj_pink_enemy_slash_Create_0_gml_122_0");
    this.pink_battle_dialogue6 = S.stringsetloc("Stop..^1. looking!/%", "obj_pink_enemy_slash_Create_0_gml_125_0");
    this.pink_battle_dialogue7 = S.stringsetloc("Stop making my&body purr^1, you&jerks!/%", "obj_pink_enemy_slash_Create_0_gml_126_0");
    this.pink_battle_dialogue8 = S.stringsetloc("Mew.&Mew!&MEW!/%", "obj_pink_enemy_slash_Create_0_gml_127_0");
    this.pink_battle_dialogue9 = S.stringsetloc("What!^1? WHAT do&I look like,&a pincushion!?/%", "obj_pink_enemy_slash_Create_0_gml_128_0");
    this.pink_battle_dialogue6b = S.stringsetloc("S..^1. stop&LOOKING at them!/%", "obj_pink_enemy_slash_Create_0_gml_130_0");
    this.pink_battle_dialogue6c = S.stringsetloc("Stop making my&body purr^1, you&jerks!/%", "obj_pink_enemy_slash_Create_0_gml_131_0");
    this.pink_battle_dialogue6d = S.stringsetloc("Stop.&STOP!&STOP!!!!/%", "obj_pink_enemy_slash_Create_0_gml_132_0");
    this.pink_battle_dialogue6e = S.stringsetloc("Where are&my knives!?/%", "obj_pink_enemy_slash_Create_0_gml_133_0");
    this.pink_battle_dialogue6f = S.stringsetloc("I want to&DATE^1, mew!/%", "obj_pink_enemy_slash_Create_0_gml_135_0");
    this.pink_battle_dialogue6g = S.stringsetloc("I like you,&mew!/%", "obj_pink_enemy_slash_Create_0_gml_136_0");
    this.pink_battle_dialogue6h = S.stringsetloc("I want Yogurt&Mushroom^1, mew!/%", "obj_pink_enemy_slash_Create_0_gml_137_0");
    this.pink_battle_dialogue6i = S.stringsetloc("I want to eat&Long Knife,&mew!/%", "obj_pink_enemy_slash_Create_0_gml_138_0");
    this.pink_battle_dialogue10 = S.stringsetloc("Purple^1, PURPLE,&you can't move,&WHATEVER!/%", "obj_pink_enemy_slash_Create_0_gml_142_0");
    this.pink_battle_dialogue11 = S.stringsetloc("Figure out how&to move^1, see if&I care^1, MEW!/%", "obj_pink_enemy_slash_Create_0_gml_143_0");
    this.pink_battle_dialogue12 = S.stringsetloc("Now that you're&PURPLE^1, you're&restricted in my&FELINE WEB!/%", "obj_pink_enemy_slash_Create_0_gml_145_0");
    this.pink_battle_dialogue13 = S.stringsetloc("Before this body,&I was NOBODY!&A ghost^1! A NOTHING!/%", "obj_pink_enemy_slash_Create_0_gml_146_0");
    this.pink_battle_dialogue13b = S.stringsetloc("Now!^1? I'm a SENSATION!&I've got FRIENDS^1!&ENEMIES^1! NEUTRALS!/%", "obj_pink_enemy_slash_Create_0_gml_147_0");
    this.pink_battle_dialogue13c = S.stringsetloc("Even my own&DOKI-METER!/%", "obj_pink_enemy_slash_Create_0_gml_148_0");
    this.pink_battle_dialogue13d = S.stringsetloc("..^1. h-hey^1, s-stop&staring at that!/%", "obj_pink_enemy_slash_Create_0_gml_149_0");
    this.pink_battle_dialogue14 = S.stringsetloc("Jealous!?&I BET you are!/%", "obj_pink_enemy_slash_Create_0_gml_151_0");
    this.pink_battle_dialogue15 = S.stringsetloc("Bet you wanna STEAL&this body^1, like a&little grubby&puppet gremlin!!/%", "obj_pink_enemy_slash_Create_0_gml_152_0");
    this.pink_battle_dialogue16 = S.stringsetloc("Well^1, who WOULDN'T!?&It's even got its&own limited-edition&voice clips!/%", "obj_pink_enemy_slash_Create_0_gml_153_0");
    this.pink_battle_dialogue16b = S.stringsetloc("I love you,&mew!/%", "obj_pink_enemy_slash_Create_0_gml_154_0");
    this.pink_battle_dialogue17 = S.stringsetloc("Hey^1, you stupid&gel pens!!&Stop FLIRTING!!/%", "obj_pink_enemy_slash_Create_0_gml_156_0");
    this.pink_battle_dialogue18 = S.stringsetloc("You're making my&body's heart...&go funny!!/%", "obj_pink_enemy_slash_Create_0_gml_157_0");
    this.pink_battle_dialogue19 = S.stringsetloc("D..^1. die!!/%", "obj_pink_enemy_slash_Create_0_gml_158_0");
    this.pink_battle_dialogue19b = S.stringsetloc("Haha^1, you guys&really are doomed!/%", "obj_pink_enemy_slash_Create_0_gml_160_0");
    this.pink_battle_dialogue19c = S.stringsetloc("I'm INVINCIBLE^1, and I&don't even feel a&single DOKI looking&deep into your eyes!/%", "obj_pink_enemy_slash_Create_0_gml_161_0");
    this.pink_battle_dialogue19d = S.stringsetloc("S..^1. stop looking&deep into my eyes,&idiots!/%", "obj_pink_enemy_slash_Create_0_gml_162_0");
    this.pink_battle_dialogue19e = S.stringsetloc("WAIT^1, it's almost&time for my concert!/%", "obj_pink_enemy_slash_Create_0_gml_164_0");
    this.pink_battle_dialogue19f = S.stringsetloc("What^1? Nowadays just&being a tough battle&isn't enough to&scrape by^1, mew!/%", "obj_pink_enemy_slash_Create_0_gml_165_0");
    this.pink_battle_dialogue19g = S.stringsetloc("You've also gotta&be an idol on&top of it!/%", "obj_pink_enemy_slash_Create_0_gml_166_0");
    this.pink_battle_dialogue19h = S.stringsetloc("Doki-meter&MAX^1, mew!/%", "obj_pink_enemy_slash_Create_0_gml_168_0");
    this.pink_battle_dialogue19i = S.stringsetloc("D-Doki meter max!?&Hey^1, wh-what does&THAT mean^1, mew!?/%", "obj_pink_enemy_slash_Create_0_gml_169_0");
    this.pink_battle_dialogue19j = S.stringsetloc("HEY^1, wh-what is this&crap!^1? I didn't tell&you to.../%", "obj_pink_enemy_slash_Create_0_gml_170_0");
    this.pink_battle_dialogue19k = S.stringsetloc("Special&Love-Love&Sequence&Activated,&mew!/%", "obj_pink_enemy_slash_Create_0_gml_171_0");
    this.pink_battle_dialogue19l = S.stringsetloc("HEY!!!!!!!", "obj_pink_enemy_slash_Create_0_gml_172_0");
    this.pink_battle_dialogue20 = S.stringsetloc("HEY!^1! Body!!!&Why the MEW did&you have them...&DATE US!?/%", "obj_pink_enemy_slash_Create_0_gml_176_0");
    this.pink_battle_dialogue21 = S.stringsetloc("I like&them^1, mew!/%", "obj_pink_enemy_slash_Create_0_gml_177_0");
    this.pink_battle_dialogue22 = S.stringsetloc("Wh..^1. what!^1? No!&We want to KILL&them^1! LOOK!!/%", "obj_pink_enemy_slash_Create_0_gml_178_0");
    this.pink_battle_dialogue23 = S.stringsetloc("Don't hurt&them^1, mew!/%", "obj_pink_enemy_slash_Create_0_gml_180_0");
    this.pink_battle_dialogue24 = S.stringsetloc("Hey^1, you're MY&body^1, GET IT!?&My body means.../%", "obj_pink_enemy_slash_Create_0_gml_181_0");
    this.pink_battle_dialogue25 = S.stringsetloc("You do..^1. what&I WANT!!!/%", "obj_pink_enemy_slash_Create_0_gml_182_0");
    this.pink_battle_dialogue26 = S.stringsetloc("Let's date,&mew!", "obj_pink_enemy_slash_Create_0_gml_184_0");
    this.pink_battle_dialogue27 = S.stringsetloc("I like them,&mew!", "obj_pink_enemy_slash_Create_0_gml_185_0");
    this.pink_battle_dialogue27b = S.stringsetloc("I want a&new hat^1, mew!", "obj_pink_enemy_slash_Create_0_gml_186_0");
    this.pink_battle_dialogue27c = S.stringsetloc("Sh.../%", "obj_pink_enemy_slash_Create_0_gml_187_0");
    this.pink_battle_dialogue27e = S.stringsetloc("AND STOP! MAKING!&MY HEART BEAT!!/%", "obj_pink_enemy_slash_Create_0_gml_188_0");
    this.pink_battle_dialogue28 = S.stringsetloc("Let's date,&mew!", "obj_pink_enemy_slash_Create_0_gml_190_0");
    this.pink_battle_dialogue29 = S.stringsetloc("I like&them^1, mew!", "obj_pink_enemy_slash_Create_0_gml_191_0");
    this.pink_battle_dialogue30 = S.stringsetloc("I want a&new hat,&mew!", "obj_pink_enemy_slash_Create_0_gml_192_0");
    this.pink_battle_dialogue31 = S.stringsetloc("I want to&go to&Planetarium!!", "obj_pink_enemy_slash_Create_0_gml_193_0");
    this.pink_battle_dialogue32 = S.stringsetloc("I want&Stinky&Fish!", "obj_pink_enemy_slash_Create_0_gml_194_0");
    this.pink_battle_dialogue32b = S.stringsetloc("I want&Yogurt Mushroom!", "obj_pink_enemy_slash_Create_0_gml_195_0");
    this.pink_battle_dialogue32c = S.stringsetloc("I want to&be a normal girl!", "obj_pink_enemy_slash_Create_0_gml_196_0");
    this.pink_battle_dialogue32d = S.stringsetloc("Let's go&back to school,&mew!", "obj_pink_enemy_slash_Create_0_gml_197_0");
    this.pink_battle_dialogue32e = S.stringsetloc("Listen^1, BODY!!!&WE^1! Are PINK!/%", "obj_pink_enemy_slash_Create_0_gml_198_0");
    this.pink_battle_dialogue32f = S.stringsetloc("And we're NEVER&going on a DATE&AGAIN^1, got it!?/%", "obj_pink_enemy_slash_Create_0_gml_199_0");
    this.pink_battle_dialogue32g = S.stringsetloc("Doki meter&MAX, mew!/%", "obj_pink_enemy_slash_Create_0_gml_201_0");
    this.pink_battle_dialogue32h = S.stringsetloc("NO!!!!/%", "obj_pink_enemy_slash_Create_0_gml_202_0");
    this.pink_battle_dialogue32i = S.stringsetloc("Time for&special&sequence.../%", "obj_pink_enemy_slash_Create_0_gml_203_0");
    this.pink_battle_dialogue32j = S.stringsetloc("NO!^1! STOP!^1! &GET THIS STUFF&OUT OF HERE!!!/%", "obj_pink_enemy_slash_Create_0_gml_205_0");
    this.pink_battle_dialogue32k = S.stringsetloc("WHY DO YOU EVEN&NEED A DOG RADAR!?/%", "obj_pink_enemy_slash_Create_0_gml_206_0");
    this.pink_battle_dialogue33 = S.stringsetloc("Look what you&did, you stupid&BODY! Now we're&not even together!/%", "obj_pink_enemy_slash_Create_0_gml_210_0");
    this.pink_battle_dialogue34 = S.stringsetloc("Mew!!! Let's&date, mew!!!/%", "obj_pink_enemy_slash_Create_0_gml_211_0");
    this.pink_battle_dialogue35 = S.stringsetloc("It's YOU! You&guys are making&her act funny&Die. Die! DIE!!!/%", "obj_pink_enemy_slash_Create_0_gml_212_0");
    this.pink_battle_dialogue36 = S.stringsetloc("I want Yogurt&Mushroom, mew!!/%", "obj_pink_enemy_slash_Create_0_gml_214_0");
    this.pink_battle_dialogue37 = S.stringsetloc("What the heck&is happening!?&Why are we SPLIT!?/%", "obj_pink_enemy_slash_Create_0_gml_215_0");
    this.pink_battle_dialogue38 = S.stringsetloc("Umm... you're a&GHOST LIGHTNER...&and that \"body\"&you found.../%", "obj_pink_enemy_slash_Create_0_gml_216_0");
    this.pink_battle_dialogue39 = S.stringsetloc("Seems to have&become a DARKNER&of its own./%", "obj_pink_enemy_slash_Create_0_gml_217_0");
    this.pink_battle_dialogue40 = S.stringsetloc("What!?/%", "obj_pink_enemy_slash_Create_0_gml_218_0");
    this.pink_battle_dialogue41 = S.stringsetloc("Pink, your BODY...&it's...&its own person,&too./%", "obj_pink_enemy_slash_Create_0_gml_220_0");
    this.pink_battle_dialogue41b = S.stringsetloc("It has its own&likes... its&own dislikes./%", "obj_pink_enemy_slash_Create_0_gml_221_0");
    this.pink_battle_dialogue41c = S.stringsetloc("No.../%", "obj_pink_enemy_slash_Create_0_gml_222_0");
    this.pink_battle_dialogue41d = S.stringsetloc("No... NO, it&can't be! It's&ME! It needs to do&what I SAY!!!/%", "obj_pink_enemy_slash_Create_0_gml_224_0");
    this.pink_battle_dialogue41e = S.stringsetloc("Because what it&WANTS, is STUPID!/%", "obj_pink_enemy_slash_Create_0_gml_225_0");
    this.pink_battle_dialogue41f = S.stringsetloc("I want to eat&sand on the&beach with you,&mew!/%", "obj_pink_enemy_slash_Create_0_gml_226_0");
    this.pink_battle_dialogue_new_p3_1 = S.stringsetloc("No... no!&NO!!!!/%", "obj_pink_enemy_slash_Create_0_gml_257_0_b");
    this.pink_battle_dialogue_new_p3_2 = S.stringsetloc("You can't DOKI!!!&You're not allowed!!!/%", "obj_pink_enemy_slash_Create_0_gml_258_0_b");
    this.pink_battle_dialogue_new_p3_3 = S.stringsetloc("I... I'll&stop you.../%", "obj_pink_enemy_slash_Create_0_gml_259_0_b");
    this.pink_battle_dialogue_new_p3_4 = S.stringsetloc("NO MATTER WHAT!!!/%", "obj_pink_enemy_slash_Create_0_gml_260_0");
    this.pink_battle_dialogue41g = S.stringsetloc("Doki level&MAX, mew!/%", "obj_pink_enemy_slash_Create_0_gml_228_0");
    this.pink_battle_dialogue41h = S.stringsetloc("No, no, NO!!&Not this AGAIN!!/%", "obj_pink_enemy_slash_Create_0_gml_229_0");
    this.pink_battle_dialogue41i = S.stringsetloc("STOP!!!!/%", "obj_pink_enemy_slash_Create_0_gml_231_0");
    this.pink_battle_dialogue42 = S.stringsetloc("Want to...&date... mew.../%", "obj_pink_enemy_slash_Create_0_gml_237_0");
    this.pink_battle_dialogue43 = S.stringsetloc("Wh... what's &happening&to her!?&To... to me!?/%", "obj_pink_enemy_slash_Create_0_gml_238_0");
    this.pink_battle_dialogue44 = S.stringsetloc("Her heart...&it can't take&doing the dates&alone!/%", "obj_pink_enemy_slash_Create_0_gml_239_0");
    this.pink_battle_dialogue45 = S.stringsetloc("The body...&it needs you&to survive!/%", "obj_pink_enemy_slash_Create_0_gml_240_0");
    this.pink_battle_dialogue46 = S.stringsetloc("Then... if I&don't hurry&and get rid&of you guys.../%", "obj_pink_enemy_slash_Create_0_gml_241_0");
    this.pink_battle_dialogue47 = S.stringsetloc("... don't you.../%", "obj_pink_enemy_slash_Create_0_gml_242_0");
    this.pink_battle_dialogue48 = S.stringsetloc("Don't you think&your body&deserves a say,&too!?/%", "obj_pink_enemy_slash_Create_0_gml_243_0");
    this.pink_battle_dialogue49 = S.stringsetloc("Date...&mew.../%", "obj_pink_enemy_slash_Create_0_gml_245_0");
    this.pink_battle_dialogue50 = S.stringsetloc("Go... back&to school...&mew.../%", "obj_pink_enemy_slash_Create_0_gml_246_0");
    this.pink_battle_dialogue51 = S.stringsetloc("Have friends...&mew.../%", "obj_pink_enemy_slash_Create_0_gml_247_0");
    this.pink_battle_dialogue52 = S.stringsetloc("Why can't...&it just be us?/%", "obj_pink_enemy_slash_Create_0_gml_249_0");
    this.pink_battle_dialogue53 = S.stringsetloc("Why do you...&why do you&have to need&someone else?/%", "obj_pink_enemy_slash_Create_0_gml_250_0");
    this.pink_battle_dialogue54 = S.stringsetloc("Mew?/%", "obj_pink_enemy_slash_Create_0_gml_251_0");
    this.pink_battle_dialogue55 = S.stringsetloc("Mew...&YOU...&need.../%", "obj_pink_enemy_slash_Create_0_gml_253_0");
    this.pink_battle_dialogue56 = S.stringsetloc("Someone else...&doki-meter.../%", "obj_pink_enemy_slash_Create_0_gml_254_0");
    this.pink_battle_dialogue57 = S.stringsetloc("Your...&doki's,&mew!/%", "obj_pink_enemy_slash_Create_0_gml_255_0");
    this.pink_battle_dialogue62 = S.stringsetloc("Body! Listen!!&I'll... I'll&show you!!/%", "obj_pink_enemy_slash_Create_0_gml_264_0");
    this.pink_battle_dialogue63 = S.stringsetloc("I'll show you&where my Doki's&come from!/%", "obj_pink_enemy_slash_Create_0_gml_265_0");
    this.pink_battle_dialogue64 = S.stringsetloc("Blue person!&Help me...&do my final&DATE!!!/%", "obj_pink_enemy_slash_Create_0_gml_266_0");
    this.spotlightinit = false;
    this.pink_bg_con = 1;
    this.pink_bg_timer = 0;
    this.dummy_pattern = "wave";
    this.dummy_pattern_timer = 0;
    this.dummy_glowstick_pattern = "none";
    this.wave_siner = 0;
    this.distortsiner = 0;
    this.thickness = 2;
    this.saturation_effect_enabled = false;
    this.pos_uni = S.shader_get_uniform(57, "Position");
    this.pos = 0;
  }
  draw() {
    let __offsetx, __offsety, smokey, _elec_x_offset;
    if (T(this.saturation_effect_enabled)) {
        S.shader_replace_simple_set_hook(57);
        S.shader_set_uniform_f(this.pos_uni, this.pos);
    }
    if (this.idlesprite == 'spr_pink_very_hurt') {
        S.shader_replace_simple_set_hook(57);
        S.shader_set_uniform_f(this.pos_uni, this.pos);
        this.wave_siner = this.wave_siner + 1;
        this.distortsiner = this.distortsiner + 1;
        __offsetx = - 6;
        __offsety = 28;
        this.i = 0;
        while ((this.i < this.sprite_height) && LOOP('PinkEnemy#1')) {
            draw_sprite_part_ext('spr_pink_very_hurt_2xscale', this.image_index, 0, this.i * this.thickness, this.sprite_width, this.thickness + 2, this.x + this.shakex + __offsetx + Math.sin((this.wave_siner + this.i * 8) / 30) * 3, this.y + this.i * this.thickness + __offsety, 1, 1, 0xffffff, 1);
            this.i = this.i + this.thickness;
        }
        S.shader_replace_simple_reset_hook();
        this.turnredcon = 1;
        if (this.turnredcon == 1) {
            this.turnredtimer = this.turnredtimer + 1;
            gpu_set_fog(1, 255, 0, 0);
            __offsetx = - 6;
            __offsety = 28;
            this.i = 0;
            while ((this.i < this.sprite_height) && LOOP('PinkEnemy#2')) {
                draw_sprite_part_ext('spr_pink_very_hurt_2xscale', this.image_index, 0, this.i * this.thickness, this.sprite_width, this.thickness + 2, this.x + this.shakex + __offsetx + Math.sin((this.wave_siner + this.i * 8) / 30) * 3, this.y + this.i * this.thickness + __offsety, 1, 1, 0xffffff, 0.2 + Math.sin(this.turnredtimer * 0.35) * 0.2);
                this.i = this.i + this.thickness;
            }
            gpu_set_fog(0, 16777215, 0, 0);
        }
        if (this.turnredtimer % 15 == 0) {
            smokey = instance_create(this.x + 50, this.y + 35 + irandom(20), 'obj_afterimage_grow');
            if (W(smokey, function (other) {
                scr_script_delayed(this, scr_var, 1, "visible", 1);
            }, this) === EXIT) return;
            smokey.visible = 0;
            smokey.depth = this.depth + 10;
            smokey.image_alpha = 2.5;
            smokey.sprite_index = 'spr_cakesmoke';
            smokey.hspeed = random_range(2, 4);
            if (this.idlesprite == 'spr_pink_run' || this.idlesprite == 'spr_mew_kick_r' || this.idlesprite == 'spr_pink_yelling_r' || this.idlesprite == 'spr_pink_shocked_r' || this.idlesprite == 'spr_mew_pushing') {
                smokey.hspeed = random_range(- 2, - 4);
            }
            smokey.gravity = - 0.5;
            smokey.friction = 0.2;
            smokey.vspeed = random_range(- 1, - 2);
        }
        if (T(this.saturation_effect_enabled)) {
            S.shader_replace_simple_reset_hook();
        }
        return;
    }
    if (this.state == 3 && this.hurttimer >= 0 || this.hurtcon > 0) {
        if (this.datecount != 3) {
            if (W('obj_pink_dummy', function (other) {
                this.shocktimer = 30;
            }, this) === EXIT) return;
            if (this.hurttimer == 30 && this.hurtcon == 0 || this.hurttimer < 5 && this.hurtcon == 1) {
                snd_stop('snd_pink_gasp');
                snd_play_x('snd_pink_gasp', 1, 1);
                this.hurtcon = 1;
                this.headspeed = - 16;
                scr_lerpvar(this, "headangle", 0, 360, 24, 1, "out");
            }
            if (this.hurtcon == 1) {
                this.headspeed = this.headspeed + 1.4;
                this.heady = this.heady + this.headspeed;
                if (this.heady > 0) {
                    this.heady = 0;
                    this.hurtcon = 0;
                    this.talktimer = 0;
                    if (this.damagedialogue == 0 && this.datecount != 2) {
                        this.damagedialogue = 1;
                    }
                }
            }
            draw_sprite_ext(this.hurtsprite, 0, this.x + 10 + this.shakex + this.hurtspriteoffx + 36, this.y - 2 + this.hurtspriteoffy + 26, 2, 2, 0, this.image_blend, 1);
            if (this.pink_head_white_alpha > 0) {
                d3d_set_fog(true, 0xffffff, 0, 1);
                draw_sprite_ext(this.hurtsprite, 0, this.x + 10 + this.shakex + this.hurtspriteoffx + 36, this.y - 2 + this.hurtspriteoffy + 26, 2, 2, 0, this.image_blend, this.pink_head_white_alpha);
                d3d_set_fog(false, 0x000000, 0, 0);
            }
            draw_sprite_ext('spr_pink_front_surprised_nohead', 1, this.x + 10 + this.headx + 36, this.y - 2 + this.heady + 26, 2, 2, this.headangle, this.image_blend, 1);
            if (this.pink_head_white_alpha > 0) {
                d3d_set_fog(true, 0xffffff, 0, 1);
                draw_sprite_ext('spr_pink_front_surprised_nohead', 1, this.x + 10 + this.headx + 36, this.y - 2 + this.heady + 26, 2, 2, this.headangle, this.image_blend, this.pink_head_white_alpha);
                d3d_set_fog(false, 0x000000, 0, 0);
                this.pink_head_white_alpha = this.pink_head_white_alpha - 0.1;
            }
        } else {
            draw_sprite_ext('spr_pink_front_surprised', this.hurttimer / 2, this.x + this.shakex + this.hurtspriteoffx + 43, this.y + this.hurtspriteoffy + 42, 2, 2, 0, this.image_blend, 1);
            if (this.turnredcon == 1) {
                this.turnredtimer = this.turnredtimer + 1;
                gpu_set_fog(1, 255, 0, 0);
                draw_sprite_ext('spr_pink_front_surprised', this.hurttimer / 2, this.x + this.shakex + this.hurtspriteoffx + 43, this.y + this.hurtspriteoffy + 42, 2, 2, 0, this.image_blend, 0.2 + Math.sin(this.turnredtimer * 0.35) * 0.2);
                gpu_set_fog(0, 16777215, 0, 0);
            }
        }
    } else {
        if (this.idlesprite == 'spr_pink_laugh_pouring') {
            S.scr_enemy_drawidle_generic(this, 0.3333333333333333);
        } else if (this.idlesprite == 'spr_pink_sweat_drop') {
            this.siner = this.siner + 0.3333333333333333;
            if (this.siner > 2) {
                this.siner = 2;
            }
            S.draw_monster_body_part(this, 'spr_pink_sweat_drop', this.siner, this.x + 14, this.y - 2);
        } else if (this.idlesprite == 'spr_pink_front_ohoho') {
            this.siner = this.siner + 0.3333333333333333;
            S.draw_monster_body_part(this, 'spr_pink_front_ohoho', this.siner, this.x + 46, this.y + 39);
        } else if (this.idlesprite == 'spr_pink_laugh') {
            this.siner = this.siner + 0.3333333333333333;
            S.draw_monster_body_part(this, 'spr_pink_laugh', this.siner, this.x + 52, this.y + 34);
        } else if (this.idlesprite == 'spr_pink_front_angry') {
            this.siner = this.siner + 0.16666666666666666;
            S.draw_monster_body_part(this, 'spr_pink_front_angry', this.siner, this.x + 52, this.y + 38);
        } else if (this.idlesprite == 'spr_pink_front_angry_blink') {
            this.siner = this.siner + 0.16666666666666666;
            S.draw_monster_body_part(this, 'spr_pink_front_angry_blink', this.siner, this.x + 52, this.y + 38);
        } else if (this.idlesprite == 'spr_pink_front_sweat') {
            this.siner = this.siner + 0.16666666666666666;
            S.draw_monster_body_part(this, 'spr_pink_front_sweat', this.siner, this.x + 52, this.y + 38);
        } else if (this.idlesprite == 'spr_pink_peace_sign') {
            this.siner = this.siner + 0.16666666666666666;
            S.draw_monster_body_part(this, 'spr_pink_peace_sign', this.siner, this.x + 20, this.y);
        } else if (this.idlesprite == 'spr_mew_stomp') {
            S.draw_monster_body_part(this, 'spr_mew_stomp', this.siner, this.x + 52, this.y + 38);
        } else if (this.idlesprite == 'spr_mew_stomp2') {
            this.siner = this.siner + 0.16666666666666666;
            S.draw_monster_body_part(this, 'spr_mew_stomp', this.siner, this.x + 52, this.y + 38);
        } else if (this.idlesprite == 'spr_mew_stomp_angrier') {
            this.siner = this.siner + 0.5;
            S.draw_monster_body_part(this, 'spr_mew_stomp', this.siner, this.x + 52, this.y + 38);
        } else if (this.idlesprite == 'spr_pink_yelling') {
            this.siner = this.siner + 0.16666666666666666;
            S.draw_monster_body_part(this, 'spr_pink_yelling', this.siner, this.x + 6, this.y - 6);
        } else if (this.idlesprite == 'spr_mew_kick') {
            S.draw_monster_body_part(this, 'spr_mew_kick', this.siner, this.x + 18, this.y - 4);
        } else if (this.idlesprite == 'spr_mew_kick_r') {
            S.draw_monster_body_part(this, 'spr_mew_kick_r', this.siner, this.x + 18, this.y - 4);
        } else if (this.idlesprite == 'spr_mew_pushing') {
            this.siner = this.siner + 0.16666666666666666;
            S.draw_monster_body_part(this, 'spr_mew_pushing', this.siner, this.x + 18 + Math.sin(this.siner * 1) * 5, this.y - 4);
            if (this.dateflashcon == 1) {
                this.dateflashsiner = this.dateflashsiner + 1;
                d3d_set_fog(true, 0xffffff, 0, 1);
                S.draw_sprite_ext_flash('spr_mew_pushing', this.siner, this.x + 18 + Math.sin(this.siner * 1) * 5, this.y - 4, this.image_xscale, this.image_yscale, 0, 16777215, Math.sin(this.dateflashsiner / 5) * 0.5 + 0.5);
                d3d_set_fog(false, 0x000000, 0, 0);
            }
        } else if (this.idlesprite == 'spr_pink_shocked_r') {
            this.siner = this.siner + 0.5;
            S.draw_monster_body_part(this, 'spr_pink_shocked_r', this.siner, this.x, this.y);
            if (this.dateflashcon == 1) {
                this.dateflashsiner = this.dateflashsiner + 1;
                d3d_set_fog(true, 0xffffff, 0, 1);
                S.draw_sprite_ext_flash('spr_pink_shocked_r', this.siner, this.x, this.y, this.image_xscale, this.image_yscale, 0, 16777215, Math.sin(this.dateflashsiner / 5) * 0.5 + 0.5);
                d3d_set_fog(false, 0x000000, 0, 0);
            }
        } else if (this.idlesprite == 'spr_pink_shocked') {
            this.siner = this.siner + 0.5;
            S.draw_monster_body_part(this, 'spr_pink_shocked', this.siner, this.x, this.y);
            if (this.dateflashcon == 1) {
                this.dateflashsiner = this.dateflashsiner + 1;
                d3d_set_fog(true, 0xffffff, 0, 1);
                S.draw_sprite_ext_flash('spr_pink_shocked', this.siner, this.x, this.y, this.image_xscale, this.image_yscale, 0, 16777215, Math.sin(this.dateflashsiner / 5) * 0.5 + 0.5);
                d3d_set_fog(false, 0x000000, 0, 0);
            }
        } else if (this.idlesprite == 'spr_pink_run') {
            this.siner = this.siner + 0.5;
            S.draw_monster_body_part(this, 'spr_pink_run', this.siner, this.x + 18, this.y + 35);
            if (this.dateflashcon == 1) {
                this.dateflashsiner = this.dateflashsiner + 1;
                d3d_set_fog(true, 0xffffff, 0, 1);
                S.draw_sprite_ext_flash('spr_pink_run', this.siner, this.x + 18, this.y + 35, this.image_xscale, this.image_yscale, 0, 16777215, Math.sin(this.dateflashsiner / 5) * 0.5 + 0.5);
                d3d_set_fog(false, 0x000000, 0, 0);
            }
        } else if (this.idlesprite == 'spr_pink_walk_right') {
            this.siner = this.siner + 0.5;
            S.draw_monster_body_part(this, 'spr_pink_walk_right', this.siner, this.x + 6, this.y + 4);
        } else if (this.idlesprite == 'spr_pink_yelling_r' && !T(i_ex('obj_date_controller'))) {
            this.siner = this.siner + 0.16666666666666666;
            S.draw_monster_body_part(this, 'spr_pink_yelling_r', this.siner, this.x + 6, this.y + 6);
            this.dateflashsiner = this.dateflashsiner + 1;
            d3d_set_fog(true, 0xffffff, 0, 1);
            S.draw_sprite_ext_flash('spr_pink_yelling_r', this.siner, this.x + 6, this.y + 6, this.image_xscale, this.image_yscale, 0, 16777215, Math.sin(this.dateflashsiner / 5) * 0.5 + 0.5);
            d3d_set_fog(false, 0x000000, 0, 0);
        } else if (this.idlesprite == 'spr_pink_yelling_r' && i_ex('obj_date_controller')) {
            S.draw_monster_body_part(this, 'spr_pink_yelling_r', 1, this.x + 6, this.y + 6);
            this.dateflashsiner = this.dateflashsiner + 1;
            d3d_set_fog(true, 0xffffff, 0, 1);
            S.draw_sprite_ext_flash('spr_pink_yelling_r', 1, this.x + 6, this.y + 6, this.image_xscale, this.image_yscale, 0, 16777215, Math.sin(this.dateflashsiner / 5) * 0.5 + 0.5);
            d3d_set_fog(false, 0x000000, 0, 0);
        } else if (this.idlesprite == 'spr_pink_kneeling_sad') {
            S.draw_monster_body_part(this, 'spr_pink_kneeling_sad', this.siner, this.x + 18, this.y - 4);
        } else if (this.idlesprite == 'spr_pink_kneeling_sad2') {
            this.siner = this.siner + 0.16666666666666666;
            S.draw_monster_body_part(this, 'spr_pink_kneeling_sad2', this.siner, this.x + 18, this.y - 4);
        } else if (this.idlesprite == 'spr_pink_kneeling_crying_loop') {
            this.siner = this.siner + 0.16666666666666666;
            S.draw_monster_body_part(this, 'spr_pink_kneeling_crying_loop', this.siner, this.x + 18, this.y - 6);
        } else if (this.idlesprite == 'spr_pink_kneeling_crying_loop') {
            this.siner = this.siner + 0.16666666666666666;
            S.draw_monster_body_part(this, 'spr_pink_kneeling_crying_loop', this.siner, this.x + 18, this.y - 6);
        } else {
            S.scr_enemy_drawidle_generic(this, 0.16666666666666666);
            if (this.dateflashcon == 1) {
                this.dateflashsiner = this.dateflashsiner + 1;
                d3d_set_fog(true, 0xffffff, 0, 1);
                S.scr_enemy_drawidle_generic(this, 0.16666666666666666);
                d3d_set_fog(false, 0x000000, 0, 0);
            }
        }
        if (this.turnredcon == 1) {
            this.turnredtimer = this.turnredtimer + 1;
            gpu_set_fog(1, 255, 0, 0);
            if (this.idlesprite == 'spr_pink_kneeling_sad2') {
                draw_sprite_ext('spr_pink_kneeling_sad2', this.siner, this.x + 18, this.y - 4, this.image_xscale, this.image_yscale, 0, 0xff0000, 0.2 + Math.sin(this.turnredtimer * 0.35) * 0.2);
            } else if (this.idlesprite == 'spr_pink_front_sweat') {
                draw_sprite_ext('spr_pink_front_sweat', this.siner, this.x + 52, this.y + 38, this.image_xscale, this.image_yscale, 0, 0xff0000, 0.2 + Math.sin(this.turnredtimer * 0.35) * 0.2);
            } else {
                draw_sprite_ext(this.thissprite, this.siner, this.x, this.y, this.image_xscale, this.image_yscale, 0, 0xff0000, 0.2 + Math.sin(this.turnredtimer * 0.35) * 0.2);
            }
            gpu_set_fog(0, 16777215, 0, 0);
            if (this.turnredtimer % 5 == 0) {
                smokey = instance_create(this.x + 50, this.y + 35 + irandom(20), 'obj_afterimage_grow');
                if (W(smokey, function (other) {
                    scr_script_delayed(this, scr_var, 1, "visible", 1);
                }, this) === EXIT) return;
                smokey.visible = 0;
                smokey.depth = this.depth + 10;
                smokey.image_alpha = 2.5;
                smokey.sprite_index = 'spr_cakesmoke';
                smokey.hspeed = random_range(2, 4);
                if (this.idlesprite == 'spr_pink_run' || this.idlesprite == 'spr_mew_kick_r' || this.idlesprite == 'spr_pink_yelling_r' || this.idlesprite == 'spr_pink_shocked_r' || this.idlesprite == 'spr_mew_pushing') {
                    smokey.hspeed = random_range(- 2, - 4);
                }
                smokey.gravity = - 0.5;
                smokey.friction = 0.2;
                smokey.vspeed = random_range(- 1, - 2);
            }
        } else if (this.datecount >= 1 || this.dateflashcon == 1) {
            this.turnredtimer = this.turnredtimer + 1;
            if (this.turnredtimer % 15 == 0) {
                smokey = instance_create(this.x + 50, this.y + 35 + irandom(20), 'obj_afterimage_grow');
                if (W(smokey, function (other) {
                    scr_script_delayed(this, scr_var, 1, "visible", 1);
                }, this) === EXIT) return;
                smokey.visible = 0;
                smokey.depth = this.depth + 10;
                smokey.image_alpha = 2.5;
                smokey.sprite_index = 'spr_cakesmoke';
                smokey.hspeed = random_range(2, 4);
                if (this.idlesprite == 'spr_pink_run' || this.idlesprite == 'spr_mew_kick_r' || this.idlesprite == 'spr_pink_yelling_r' || this.idlesprite == 'spr_pink_shocked_r' || this.idlesprite == 'spr_mew_pushing') {
                    smokey.hspeed = random_range(- 2, - 4);
                }
                smokey.gravity = - 0.5;
                smokey.friction = 0.2;
                smokey.vspeed = random_range(- 1, - 2);
                smokey.image_xscale = 0.25;
                smokey.image_yscale = 0.25;
            }
        }
        if (i_ex('obj_date_ui') && O('obj_date_ui').electricity_con == 0) {
            if (this.electricity_con == 1) {
                _elec_x_offset = 0;
                if (this.idlesprite == 'spr_mew_stomp') {
                    _elec_x_offset = 16;
                }
                if (this.idlesprite == 'spr_mew_stomp2') {
                    _elec_x_offset = 16;
                }
                if (this.idlesprite == 'spr_mew_stomp_angrier') {
                    _elec_x_offset = 16;
                }
                draw_sprite_ext('spr_pink_electricity', this.electricity_timer, this.x + _elec_x_offset, this.y - 10, 1.5, 1.8, 0, 0xffffff, 1);
                this.electricity_timer = this.electricity_timer + 1;
                if (this.electricity_timer == 1) {
                    snd_loop('snd_electroshock_loop');
                }
                if (this.electricity_timer == 30) {
                    snd_stop('snd_electroshock_loop');
                    this.electricity_timer = 0;
                    this.electricity_con = 0;
                }
            } else {
                snd_stop('snd_electroshock_loop');
            }
        }
    }
    if (T(this.saturation_effect_enabled)) {
        S.shader_replace_simple_reset_hook();
    }
    if (this.talked > 0 && this.talked < 1) {
    } else if (this.becomeflash == 0) {
        this.flash = 0;
    } else {
        this.becomeflash = 0;
    }
    if (this.talked == 0.41 && i_ex('obj_growtangle') && i_ex('obj_heart') && this.intropurple_y != 0) {
        this.depth = O('obj_heart').depth - 5;
        draw_set_alpha(this.introalpha);
        draw_set_color(this.purple_color);
        S.d_rectangle(O('obj_growtangle').x - 71, O('obj_growtangle').y + 71 + this.intropurple_y, O('obj_growtangle').x + 71, O('obj_growtangle').y + 71, false);
        draw_set_alpha(1);
    }
  }
  user0() {
    let _rand;
    if (this.datecount == 0) {
        if (this.phaseturns >= 5) {
            this.looping = true;
        }
        if (this.phaseturns == 0) {
            this.myattackchoice = 1;
            this.difficulty = 0;
        }
        if (this.phaseturns == 1) {
            this.myattackchoice = 6;
            this.difficulty = 1;
        }
        if (this.phaseturns == 2) {
            this.myattackchoice = 1;
            this.difficulty = 1;
        }
        if (this.phaseturns == 3) {
            this.myattackchoice = 6;
            this.difficulty = 0;
        }
        if (this.phaseturns == 4) {
            this.myattackchoice = 5;
            this.difficulty = 0;
        }
        if (this.phaseturns > 4) {
            _rand = choose(0, 1);
            if (_rand == 0) {
                this.myattackchoice = 1;
                this.difficulty = 4;
            }
            if (_rand == 1) {
                this.myattackchoice = 6;
                this.difficulty = 0;
            }
        }
    }
    if (this.datecount == 1) {
        if (this.phaseturns > 4) {
            this.phaseturns = 0;
        }
        if (this.phaseturns == 0) {
            this.myattackchoice = 3;
            this.difficulty = 0;
        }
        if (this.phaseturns == 1) {
            this.myattackchoice = 4;
            this.difficulty = 0;
        }
        if (this.phaseturns == 2) {
            this.myattackchoice = 6;
            this.difficulty = 4;
        }
        if (this.phaseturns == 3) {
            this.myattackchoice = 5;
            this.difficulty = 1;
        }
        if (this.phaseturns == 4) {
            this.myattackchoice = 3;
            this.difficulty = 2;
            this.looping = true;
        }
    }
    if (this.datecount == 2 || this.datecount == 3) {
        if (this.phaseturns == 0) {
            this.myattackchoice = 3;
            this.difficulty = 1;
        }
        if (this.phaseturns == 1) {
            this.myattackchoice = 6;
            this.difficulty = 2;
        }
        if (this.phaseturns == 2) {
            this.myattackchoice = 1;
            this.difficulty = 2;
        }
        if (this.phaseturns == 3) {
            this.myattackchoice = 4;
            this.difficulty = 1;
        }
        if (this.phaseturns == 4) {
            this.myattackchoice = 1;
            this.difficulty = 3;
        }
        if (this.phaseturns == 5) {
            this.myattackchoice = 6;
            this.difficulty = 3;
        }
        if (this.phaseturns >= 6) {
            this.myattackchoice = 5;
            this.difficulty = 2;
            this.phaseturns = 2;
        }
    }
    S.scr_debug_print("turn: " + String(this.turns));
    if (this.myattackchoice == 1) {
        S.scr_debug_print("myattackchoice: cats");
    }
    if (this.myattackchoice == 2) {
        S.scr_debug_print("myattackchoice: bombs");
    }
    if (this.myattackchoice == 3) {
        S.scr_debug_print("myattackchoice: rotating box");
    }
    if (this.myattackchoice == 4) {
        S.scr_debug_print("myattackchoice: 3d tunnel");
    }
    if (this.myattackchoice == 5) {
        S.scr_debug_print("myattackchoice: sing");
    }
    S.scr_debug_print("difficulty: " + String(this.difficulty));
  }
  user1() {
    return;
  }
  user2() {
    if (global.inv > 0) {
        return;
    }
    this.hero_state = "fail";
    this.ti = 0;
    while ((this.ti < 3) && LOOP('PinkEnemy#3')) {
        this.damage = this.teamdamage;
        this.target = this.ti;
        if (global.hp[global.char[this.ti]] > 0 && global.char[this.ti] != 0) {
            global.inv = - 1;
            if (this.teamdamageproportional == 1) {
                global.ignoredefense = true;
            }
            S.scr_damage(this);
            global.ignoredefense = false;
            if (W('obj_dmgwriter', function (other) {
                this.depth = other.depth - 100;
            }, this) === EXIT) return;
            if (i_ex('obj_date_controller')) {
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
        }
        this.ti = this.ti + 1;
    }
    snd_stop('snd_hurt1');
    snd_play('snd_hurt1');
    this.damage = this.nonteamdamage;
  }
  user12() {
    global.monsterx ??= []; global.monsterx[this.myself] = this.x + this.sprite_width / 2;
    global.monstery ??= []; global.monstery[this.myself] = this.y + this.sprite_height / 2;
    S.scr_monstersetup(this);
  }
  step() {
    let __len, _who_is_talking, _rr, __x, noeffectstring, susnoeffectstring, ralnoeffectstring, _kris_flirt_string, _kris_flirthard_string, _s_actstring, _r_actstring, ytarget, __a, spread_range, _cx, _cy, _mcx, _random, _hide;
    global.monsterhp ??= []; global.monsterhp[this.myself] = global.monstermaxhp[this.myself];
    if (this.datecount == 3) {
        global.monsterhp ??= []; global.monsterhp[this.myself] = global.monstermaxhp[this.myself] * 0.33;
    }
    if (this.datecount >= 2) {
        this.dokimax = 20;
        if (W('obj_date_ui', function (other) {
            this.dokimax = 20;
        }, this) === EXIT) return;
    }
    if (T(S.scr_debug()) && keyboard_check_pressed(112)) {
        this.doki = this.dokimax;
        if (W('obj_date_ui', function (other) {
            this.current = this.dokimax;
            this.show_doki_bar = true;
        }, this) === EXIT) return;
    }
    if (T(S.scr_debug()) && keyboard_check_pressed(118)) {
        if (W('obj_tensionbar', function (other) {
            this.maxtensionlimitpercent = 100;
            this.maxtensionlimit = 250;
        }, this) === EXIT) return;
    }
    if (T(S.scr_debug()) && keyboard_check_pressed(73)) {
        this.datecount = this.datecount + 1;
        if (this.datecount > 3) {
            this.datecount = 3;
        }
        if (this.datecount == 2) {
            if (W('obj_heroralsei', function (other) {
                this.defeatsprite = 'spr_ralsei_kneel';
            }, this) === EXIT) return;
        }
        if (this.datecount >= 2 && this.ghostintrocon == 0) {
            this.ghostintrocon = 1;
        }
        this.phaseturns = 0;
        if (this.datecount == 3) {
            this.turnredcon = 1;
            mus_volume(global.batmusic[0], 0, 15);
            mus_volume(global.batmusic[1], 0, 15);
            global.actsimul ??= []; global.actsimul[this.myself] ??= []; global.actsimul[this.myself][1] = 0;
            global.actsimulsus ??= []; global.actsimulsus[this.myself] ??= []; global.actsimulsus[this.myself][0] = 0;
            global.actsimulral ??= []; global.actsimulral[this.myself] ??= []; global.actsimulral[this.myself][0] = 0;
            global.actsimul ??= []; global.actsimul[this.myself] ??= []; global.actsimul[this.myself][2] = 0;
            global.actsimulsus ??= []; global.actsimulsus[this.myself] ??= []; global.actsimulsus[this.myself][1] = 0;
            global.actsimulral ??= []; global.actsimulral[this.myself] ??= []; global.actsimulral[this.myself][1] = 0;
        }
    }
    if (this.introcon == 0) {
        global.typer = 50;
        S.msgset(0, this.pink_battle_dialogue1);
        S.scr_enemyblcon(this, this.x, global.monstery[this.myself] - 20, 10);
        this.talked = 0.4;
        this.ballooncon = 1;
        this.introcon = 1;
        global.charturn = 3;
    }
    if (this.damagedialogue == 1) {
        this.talktimer = this.talktimer + 1;
        if (this.talktimer >= 10) {
            snd_stop('snd_pink_laugh_short');
            snd_stop('snd_pink_laugh_long');
            snd_play_x('snd_pink_laugh_short', 1, 1);
            global.typer = 50;
            S.msgsetloc(0, "This body is&invincible^1, you fool!!!/%", "obj_pink_enemy_slash_Step_0_gml_29_0");
            S.scr_enemyblcon(this, this.x - 10, global.monstery[this.myself] - 10, 10);
            this.idlesprite = 'spr_pink_front_ohoho';
            this.damagedialogue = 2;
            this.talktimer = 0;
        }
    }
    if (this.damagedialogue == 2) {
        this.talktimer = this.talktimer + 1;
        if (button3_p() && this.talktimer > 15 || !T(i_ex('obj_writer'))) {
            if (W('obj_writer', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            this.idlesprite = 'spr_pink_idle';
            this.damagedialogue = 3;
        }
    }
    if (this.phase4introcon == 1) {
        this.phase4introtimer = this.phase4introtimer + 1;
        if (this.phase4introtimer == 1) {
            global.charturn = 3;
        }
        if (this.phase4introtimer == 30) {
            global.typer = 50;
            S.msgset(0, this.pink_battle_dialogue42);
            this.blcon = S.scr_enemyblcon(this, this.x - 200, global.monstery[this.myself] - 30, 18);
            this.blcon.mywriter.shake = 2;
            this.idlesprite = 'spr_pink_very_hurt';
            this.electricity_con = 1;
            this.ballooncon = 24;
            this.balloonend = 0;
            this.talked = 0.6;
            this.phase4introcon = 2;
        }
    }
    if (this.phase4introcon == 3 && !T(i_ex('obj_writer'))) {
        this.phase4introcon = 0;
    }
    if (this.datecount > 0 || this.datecount == 0 && this.phaseturns >= 3) {
        if (W('obj_date_ui', function (other) {
            this.show_doki_bar = true;
        }, this) === EXIT) return;
    }
    if (global.monster[this.myself] == 1) {
        if (T(S.scr_isphase("enemytalk")) && this.talked == 0 && this.explosioncon == 0 && this.ghostintrocon != 1 && (this.damagedialogue == 0 || this.damagedialogue == 3)) {
            if (i_ex('obj_date_ui') && O('obj_date_ui').con == 1) {
                return;
            }
            global.typer = 50;
            if (this.looping == 0 && this.datecount == 1 && this.phaseturns == 2 && this.doki < this.dokimax) {
                if (this.balloon_timer == 0) {
                    S.msgset(0, this.pink_battle_dialogue26);
                    this.blcon = S.scr_enemyblcon(this, this.x - 30, global.monstery[this.myself] - 70, 18);
                    this.blcon.notail = true;
                }
                if (this.balloon_timer == 20) {
                    S.msgset(0, this.pink_battle_dialogue27);
                    this.blcon = S.scr_enemyblcon(this, this.x + 17, global.monstery[this.myself] - 30, 18);
                    this.blcon.notail = true;
                    this.pink_bg_con = 3;
                }
                this.balloon_timer = this.balloon_timer + 1;
                if (this.balloon_timer == 40) {
                    this.balloon_timer = 0;
                } else {
                    return;
                }
            }
            __len = 70;
            if (this.looping == 0 && this.datecount == 1 && this.phaseturns == 3) {
                if (this.balloon_timer == 0) {
                    S.msgset(0, this.pink_battle_dialogue28);
                    this.blcon = S.scr_enemyblcon(this, this.x + lengthdir_x(__len, 0) - 14, global.monstery[this.myself] - 20 + lengthdir_y(__len, 0), 18);
                    this.blcon.shakecon = 1;
                    this.blcon.notail = true;
                }
                if (this.balloon_timer == 10) {
                    S.msgset(0, this.pink_battle_dialogue29);
                    this.blcon = S.scr_enemyblcon(this, this.x + lengthdir_x(__len, 40) - 14, global.monstery[this.myself] - 20 + lengthdir_y(__len, 40), 18);
                    this.blcon.shakecon = 1;
                    this.blcon.notail = true;
                }
                if (this.balloon_timer == 20) {
                    S.msgset(0, this.pink_battle_dialogue30);
                    this.blcon = S.scr_enemyblcon(this, this.x + lengthdir_x(__len, 80) - 14, global.monstery[this.myself] - 20 + lengthdir_y(__len, 80), 18);
                    this.blcon.shakecon = 1;
                    this.blcon.notail = true;
                }
                if (this.balloon_timer == 30) {
                    S.msgset(0, this.pink_battle_dialogue31);
                    this.blcon = S.scr_enemyblcon(this, this.x + lengthdir_x(__len, 120) - 14, global.monstery[this.myself] - 20 + lengthdir_y(__len, 120), 18);
                    this.blcon.shakecon = 1;
                    this.blcon.notail = true;
                }
                if (this.balloon_timer == 40) {
                    S.msgset(0, this.pink_battle_dialogue32);
                    this.blcon = S.scr_enemyblcon(this, this.x + lengthdir_x(__len, 160) - 14, global.monstery[this.myself] - 20 + lengthdir_y(__len, 160), 18);
                    this.blcon.shakecon = 1;
                    this.blcon.notail = true;
                }
                if (this.balloon_timer == 50) {
                    S.msgset(0, this.pink_battle_dialogue32b);
                    this.blcon = S.scr_enemyblcon(this, this.x + lengthdir_x(__len, 200) - 14, global.monstery[this.myself] - 20 + lengthdir_y(__len, 200), 18);
                    this.blcon.shakecon = 1;
                    this.blcon.notail = true;
                }
                if (this.balloon_timer == 60) {
                    S.msgset(0, this.pink_battle_dialogue32c);
                    this.blcon = S.scr_enemyblcon(this, this.x + lengthdir_x(__len, 240) - 14, global.monstery[this.myself] - 20 + lengthdir_y(__len, 240), 18);
                    this.blcon.shakecon = 1;
                    this.blcon.notail = true;
                }
                if (this.balloon_timer == 70) {
                    S.msgset(0, this.pink_battle_dialogue32d);
                    this.blcon = S.scr_enemyblcon(this, this.x + lengthdir_x(__len, 280) - 14, global.monstery[this.myself] - 20 + lengthdir_y(__len, 280), 18);
                    this.blcon.shakecon = 1;
                    this.blcon.notail = true;
                }
                if (this.balloon_timer == 20) {
                    this.idlesprite = 'spr_mew_stomp';
                    this.siner = 0;
                    scr_shakeobj(this);
                    snd_play('snd_pink_throw2');
                }
                if (this.balloon_timer == 90) {
                    this.idlesprite = 'spr_mew_stomp_angrier';
                    this.siner = 1;
                    scr_shakeobj(this);
                    snd_play('snd_impact');
                    scr_shakescreen(this);
                    snd_stop('snd_punchweak');
                    snd_play_x('snd_punchweak', 1, 1.3);
                    if (W('obj_battleblcon', function (other) {
                        instance_destroy(this);
                        if (W(this.mywriter, function (other) {
                            instance_destroy(this);
                        }, this) === EXIT) return EXIT;
                        if (this.sprite_index == 'spr_pink_balloon1') {
                            this.inst = instance_create_depth(this.x + 47, this.y + 30, - 99999999, 'obj_animation');
                            this.inst.sprite_index = 'spr_heart_pop';
                            this.inst.image_blend = make_color_rgb(255, 181, 153);
                            this.inst.image_speed = 0.5;
                            this.inst.image_xscale = 3;
                            this.inst.image_yscale = 3;
                        }
                    }, this) === EXIT) return;
                }
                this.balloon_timer = this.balloon_timer + 1;
                if (this.balloon_timer == 150) {
                    this.balloon_timer = 0;
                } else {
                    return;
                }
            }
            S.scr_randomtarget(this);
            this.user0?.();
            if (!T(instance_exists('obj_darkener'))) {
                instance_create(0, 0, 'obj_darkener');
            }
            _who_is_talking = "pink";
            if (this.looping == 0 || this.doki >= this.dokimax) {
                if (this.datecount == 0) {
                    if (this.doki >= this.dokimax) {
                        S.msgset(0, this.pink_battle_dialogue19h);
                        this.ballooncon = 9.6;
                        this.balloonend = 0;
                        this.dateflashsiner = 0;
                        this.electricity_con = 1;
                        this.dateflashcon = 1;
                        this.idlesprite = 'spr_pink_shocked';
                        this.siner = 0;
                        scr_shakeobj(this);
                        if (W('obj_date_ui', function (other) {
                            this.blushcon = 1;
                        }, this) === EXIT) return;
                        _who_is_talking = "body";
                    } else if (this.phaseturns == 0) {
                        S.msgset(0, this.pink_battle_dialogue10);
                        this.ballooncon = 5;
                        this.balloonend = 0;
                        this.idlesprite = 'spr_pink_laugh';
                        snd_stop('snd_pink_laugh_short');
                        snd_stop('snd_pink_laugh_long');
                        snd_play_x('snd_pink_laugh_short', 1, 1);
                    } else if (this.phaseturns == 1) {
                        S.msgset(0, this.pink_battle_dialogue12);
                        this.ballooncon = 6;
                        this.balloonend = 0;
                    } else if (this.phaseturns == 2) {
                        S.msgset(0, this.pink_battle_dialogue14);
                        this.ballooncon = 7;
                        this.balloonend = 0;
                    } else if (this.phaseturns == 3 && this.doki > 0) {
                        S.msgset(0, this.pink_battle_dialogue17);
                        this.ballooncon = 8;
                        this.balloonend = 0;
                        this.idlesprite = 'spr_pink_front_angry';
                        scr_shakeobj(this);
                        snd_play('snd_pink_throw2');
                    } else if (this.phaseturns == 3 && this.doki == 0) {
                        S.msgset(0, this.pink_battle_dialogue19b);
                        this.ballooncon = 9.2;
                        this.balloonend = 0;
                        this.idlesprite = 'spr_pink_front_ohoho';
                        snd_stop('snd_pink_throw2');
                        snd_stop('snd_pink_laugh_short');
                        snd_stop('snd_pink_laugh_long');
                        snd_play('snd_pink_laugh_short');
                    } else if (this.phaseturns == 4) {
                        S.msgset(0, this.pink_battle_dialogue19e);
                        this.ballooncon = 9.4;
                        this.balloonend = 0;
                        this.idlesprite = 'spr_pink_shocked';
                        scr_shakeobj(this);
                        snd_stop('snd_pink_laugh_short');
                        snd_stop('snd_pink_laugh_long');
                        snd_play('snd_pink_gasp');
                    }
                }
                if (this.datecount == 1) {
                    if (this.doki >= this.dokimax) {
                        S.msgset(0, this.pink_battle_dialogue32g);
                        this.ballooncon = 17;
                        this.balloonend = 0;
                        this.electricity_con = 1;
                        this.idlesprite = 'spr_pink_shocked';
                        this.siner = 1;
                        scr_shakeobj(this);
                        _who_is_talking = "body";
                    } else if (this.phaseturns == 0) {
                        S.msgset(0, this.pink_battle_dialogue20);
                        this.ballooncon = 10;
                        this.balloonend = 0;
                        this.idlesprite = 'spr_pink_yelling';
                        this.siner = 1;
                        scr_shakeobj(this);
                        snd_play_x('snd_pink_gasp', 1, 1);
                    } else if (this.phaseturns == 1) {
                        S.msgset(0, this.pink_battle_dialogue23);
                        this.ballooncon = 12;
                        this.balloonend = 0;
                        this.idlesprite = 'spr_mew_stomp';
                        this.siner = 0;
                        scr_shakeobj(this);
                        _who_is_talking = "body";
                    } else if (this.phaseturns == 2) {
                        S.msgset(0, this.pink_battle_dialogue27b);
                        this.ballooncon = 14;
                        this.balloonend = 0;
                        this.blcon = S.scr_enemyblcon(this, this.x - 36, global.monstery[this.myself] + 25, 18);
                        this.blcon.x = this.blcon.x - 10;
                        this.blcon.shakecon = 1;
                        this.blcon.notail = true;
                        _who_is_talking = "";
                    } else if (this.phaseturns == 3) {
                        S.msgset(0, this.pink_battle_dialogue32e);
                        scr_shakeobj(this);
                        this.ballooncon = 15;
                        this.balloonend = 0;
                        this.idlesprite = 'spr_mew_stomp';
                        this.siner = 0;
                    }
                }
                if (this.datecount == 2) {
                    if (this.doki >= this.dokimax) {
                        S.msgset(0, this.pink_battle_dialogue_new_p3_1);
                        this.tripleghostcon = 1;
                        this.ballooncon = 23.3;
                        this.balloonend = 0;
                        _who_is_talking = "ghost";
                        if (W('obj_date_ui', function (other) {
                            this.con = 1;
                        }, this) === EXIT) return;
                    } else if (this.phaseturns == 0) {
                        S.msgset(0, this.pink_battle_dialogue33);
                        this.ballooncon = 19;
                        this.balloonend = 0;
                        this.turnredcon = 1;
                        this.turnredtimer = 0;
                        _who_is_talking = "ghost";
                    } else if (this.phaseturns == 1) {
                        S.msgset(0, this.pink_battle_dialogue36);
                        this.ballooncon = 21;
                        this.balloonend = 0;
                        _who_is_talking = "body";
                    } else if (this.phaseturns == 2) {
                        S.msgset(0, this.pink_battle_dialogue41);
                        this.ballooncon = 22;
                        this.balloonend = 0;
                        _who_is_talking = "ralsei";
                    } else if (this.phaseturns == 3) {
                        S.msgset(0, this.pink_battle_dialogue41d);
                        this.ballooncon = 23.1;
                        this.balloonend = 0;
                        _who_is_talking = "ghost";
                        this.looping = true;
                    }
                }
                if (this.datecount == 3) {
                    if (this.phaseturns > 2) {
                        this.phaseturns = 2;
                    }
                    if (this.phaseturns == 2) {
                        this.doki = 20;
                        if (W('obj_date_ui', function (other) {
                            this.electricity_con = 1;
                        }, this) === EXIT) return;
                        S.msgset(0, this.pink_battle_dialogue62);
                        this.ballooncon = 38;
                        this.balloonend = 0;
                        _who_is_talking = "ghost";
                    } else if (this.phaseturns == 0) {
                        S.msgset(0, this.pink_battle_dialogue49);
                        this.ballooncon = 30;
                        this.balloonend = 0;
                        _who_is_talking = "body";
                        this.idlesprite = 'spr_pink_very_hurt';
                    } else if (this.phaseturns == 1) {
                        S.msgset(0, this.pink_battle_dialogue52);
                        this.ballooncon = 32;
                        this.balloonend = 0;
                        _who_is_talking = "ghost";
                    }
                }
            } else if (this.datecount == 2) {
                _rr = choose(0, 1, 2, 3, 4, 5, 6, 7);
                if (_rr == 0) {
                    S.msgset(0, this.pink_battle_dialogue6b);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "ghost";
                }
                if (_rr == 1) {
                    S.msgset(0, this.pink_battle_dialogue6c);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "ghost";
                }
                if (_rr == 2) {
                    S.msgset(0, this.pink_battle_dialogue6d);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "ghost";
                }
                if (_rr == 3) {
                    S.msgset(0, this.pink_battle_dialogue6e);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "ghost";
                }
                if (_rr == 4) {
                    S.msgset(0, this.pink_battle_dialogue6f);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "body";
                }
                if (_rr == 5) {
                    S.msgset(0, this.pink_battle_dialogue6g);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "body";
                }
                if (_rr == 6) {
                    S.msgset(0, this.pink_battle_dialogue6h);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "body";
                }
                if (_rr == 7) {
                    S.msgset(0, this.pink_battle_dialogue6i);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "body";
                }
            } else {
                _rr = choose(0, 1, 2, 3);
                if (_rr == 0) {
                    S.msgset(0, this.pink_battle_dialogue6);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                }
                if (_rr == 1) {
                    S.msgset(0, this.pink_battle_dialogue7);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                }
                if (_rr == 2) {
                    S.msgset(0, this.pink_battle_dialogue8);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                }
                if (_rr == 3) {
                    S.msgset(0, this.pink_battle_dialogue9);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                }
            }
            this.phaseturns = this.phaseturns + 1;
            __x = 0;
            if (this.idlesprite == 'spr_mew_pushing') {
                __x = 12;
            }
            if (_who_is_talking == "pink") {
                this.blcon = S.scr_enemyblcon(this, this.x - 10 + __x, this.y + 40, 10);
                if (this.datecount == 3) {
                    this.blcon.mywriter.shake = 2;
                }
            } else if (_who_is_talking == "body") {
                this.blcon = S.scr_enemyblcon(this, this.x - 180 + __x, this.y - 10, 18);
                if (this.datecount == 3) {
                    this.blcon.mywriter.shake = 2;
                }
            } else if (_who_is_talking == "ghost") {
                this.blcon = S.scr_enemyblcon(this, this.ghostmarker.x, this.ghostmarker.y - 60, 22);
                if (this.datecount == 3) {
                    this.blcon.mywriter.shake = 2;
                }
            } else if (_who_is_talking == "ralsei") {
                global.typer = 74;
                S.scr_heroblcon("ralsei");
                if (global.hp[3] > 0) {
                    S.scr_battle_sprite_set("ralsei", 'spr_ralsei_idle_mad_lookdown', 0.16666666666666666, true);
                }
            } else if (_who_is_talking == "susie") {
                global.typer = 75;
                S.scr_heroblcon("susie");
                S.scr_guardpeek(1435);
            }
            if (this.ballooncon == 1) {
                this.talked = 0.4;
            } else if (this.ballooncon == 0) {
                this.talked = 0.5;
            } else {
                this.talked = 0.6;
            }
            this.talktimer = 0;
            this.rtimer = 0;
            this.setbattlemsg = false;
        }
        if (this.talked == 0.5) {
            this.talktimer = this.talktimer + 1;
            if (button3_p() && this.talktimer > 15 || !T(i_ex('obj_writer'))) {
                if (W('obj_writer', function (other) {
                    instance_destroy(this);
                }, this) === EXIT) return;
                this.alarm ??= []; this.alarm[6] = 1;
            }
        }
        if (this.talked == 0.6 && this.ghostintrocon != 1) {
            this.talktimer = this.talktimer + 1;
            if ((button3_p() && this.talktimer > 15 || !T(i_ex('obj_writer')) && !T(i_ex('obj_shutupballoon'))) || this.ballooncon == 14 && this.talktimer >= 15 || this.ballooncon == 14.1 && this.talktimer >= 15) {
                _who_is_talking = "pink";
                if (this.ballooncon != 14 && this.ballooncon != 14.1) {
                    if (W('obj_writer', function (other) {
                        instance_destroy(this);
                    }, this) === EXIT) return;
                }
                global.typer = 50;
                if (this.ballooncon == 9.3) {
                    if (W('obj_marker_doomed', function (other) {
                        this.image_alpha = lerp(this.image_alpha, 0, 0.3);
                    }, this) === EXIT) return;
                    if (W('obj_pink_spotlight', function (other) {
                        this.image_alpha = lerp(this.image_alpha, 0, 0.3);
                    }, this) === EXIT) return;
                    if (W('obj_pink_dummy', function (other) {
                        if (this.type == "bg") {
                            this.yoffset = lerp(this.yoffset, 0, 0.1);
                        }
                        if (this.type == "fg") {
                            this.yoffset = lerp(this.yoffset, 0, 0.1);
                        }
                    }, this) === EXIT) return;
                    if (W('obj_mewers_live', function (other) {
                        this.y = lerp(this.y, this.ystart - 90, 0.1);
                    }, this) === EXIT) return;
                    this.balloon_timer = this.balloon_timer + 1;
                    if (this.balloon_timer == 1) {
                        S.scr_dokiadd(this.myself, 1);
                    }
                    if (this.balloon_timer > 1 && this.balloon_timer < 60) {
                        this.siner = 0;
                    }
                    if (this.balloon_timer == 60) {
                        this.idlesprite = 'spr_pink_sweat_drop';
                        this.siner = 0;
                        snd_play('snd_awkward');
                    }
                    if (this.balloon_timer == 60) {
                        this.balloon_timer = 0;
                    } else {
                        return;
                    }
                }
                if (this.ballooncon == 9.7) {
                    this.balloon_timer = this.balloon_timer + 1;
                    if (this.balloon_timer == 1) {
                        if (W('obj_date_ui', function (other) {
                            this.con = 1;
                        }, this) === EXIT) return;
                    }
                    if (this.balloon_timer == 14) {
                        this.idlesprite = 'spr_pink_shocked_r';
                        scr_shakeobj(this);
                        snd_stop('snd_pink_throw2');
                        snd_stop('snd_pink_laugh_short');
                        snd_stop('snd_pink_gasp');
                        snd_stop('snd_pink_laugh_long');
                        snd_play('snd_pink_gasp');
                    }
                    if (this.balloon_timer == 45) {
                        this.idlesprite = 'spr_pink_run';
                        this.speed = 10;
                        this.direction = 180;
                        this.friction = 1;
                    }
                    if (this.balloon_timer == 55) {
                        this.speed = 20;
                        this.direction = 0;
                        this.friction = 0;
                    }
                    if (this.balloon_timer == 60) {
                        this.idlesprite = 'spr_mew_pushing';
                        this.speed = 0;
                        this.x = this.x - 8;
                        this.siner = 0;
                    }
                    if (this.balloon_timer == 60) {
                        this.balloon_timer = 0;
                    } else {
                        return;
                    }
                }
                if (this.ballooncon == 14.2) {
                    this.balloon_timer = this.balloon_timer + 1;
                    if (this.balloon_timer == 1) {
                        this.siner = 0;
                        this.idlesprite = 'spr_mew_kick_r';
                        this.x = this.xstart;
                        scr_shakeobj(this);
                        snd_play('snd_wing');
                    }
                    if (this.balloon_timer == 11) {
                        this.siner = 1;
                        this.direction = 0;
                        this.x = this.xstart;
                        this.speed = 20;
                        this.friction = 3;
                        snd_stop('snd_pink_throw2');
                        snd_stop('snd_pink_laugh_short');
                        snd_stop('snd_pink_gasp');
                        snd_stop('snd_pink_laugh_long');
                        snd_play('snd_pink_throw2');
                    }
                    if (this.balloon_timer == 14) {
                        this.siner = 2;
                        this.speed = 0;
                        snd_play('snd_impact');
                        if (W('obj_date_ui', function (other) {
                            this.dokishaketimer = 8;
                        }, this) === EXIT) return;
                    }
                    if (this.balloon_timer == 45) {
                        this.balloon_timer = 0;
                        this.idlesprite = 'spr_pink_idle';
                        this.x = this.xstart;
                        this.y = this.ystart;
                    } else {
                        return;
                    }
                }
                if (this.ballooncon == 18.1) {
                    this.balloon_timer = this.balloon_timer + 1;
                    if (this.balloon_timer == 1) {
                        if (W('obj_date_ui', function (other) {
                            this.con = 1;
                        }, this) === EXIT) return;
                        this.balloon_timer = 10;
                    }
                    if (this.balloon_timer == 10) {
                        this.idlesprite = 'spr_pink_shocked_r';
                        scr_shakeobj(this);
                        snd_stop('snd_pink_throw2');
                        snd_stop('snd_pink_laugh_short');
                        snd_stop('snd_pink_gasp');
                        snd_stop('snd_pink_laugh_long');
                        snd_play('snd_pink_gasp');
                    }
                    if (this.balloon_timer == 40) {
                        this.siner = 0;
                        this.idlesprite = 'spr_mew_kick';
                        scr_shakeobj(this);
                        snd_stop('snd_pink_throw2');
                        snd_stop('snd_pink_laugh_short');
                        snd_stop('snd_pink_gasp');
                        snd_stop('snd_pink_laugh_long');
                        snd_play('snd_wing');
                    }
                    if (this.balloon_timer == 50) {
                        this.siner = 1;
                        this.direction = 225;
                        this.speed = 10;
                        this.friction = 1;
                        snd_stop('snd_pink_throw2');
                        snd_stop('snd_pink_laugh_short');
                        snd_stop('snd_pink_gasp');
                        snd_stop('snd_pink_laugh_long');
                        snd_play('snd_pink_throw2');
                    }
                    if (this.balloon_timer == 53) {
                        this.siner = 2;
                        if (W('obj_date_ui', function (other) {
                            this.weatherkick_con = 1;
                        }, this) === EXIT) return;
                    }
                    if (this.balloon_timer == 70) {
                        this.siner = 0;
                        this.idlesprite = 'spr_mew_kick';
                        scr_shakeobj(this);
                        snd_stop('snd_pink_throw2');
                        snd_stop('snd_pink_laugh_short');
                        snd_stop('snd_pink_gasp');
                        snd_stop('snd_pink_laugh_long');
                        snd_play('snd_wing');
                    }
                    if (this.balloon_timer == 80) {
                        this.siner = 1;
                        this.direction = 110;
                        this.speed = 21;
                        this.friction = 2;
                        snd_stop('snd_pink_throw2');
                        snd_stop('snd_pink_laugh_short');
                        snd_stop('snd_pink_gasp');
                        snd_stop('snd_pink_laugh_long');
                        snd_play('snd_pink_throw2');
                    }
                    if (this.balloon_timer == 85) {
                        this.siner = 2;
                        if (W('obj_date_ui', function (other) {
                            this.populationkick_con = 1;
                        }, this) === EXIT) return;
                    }
                    if (this.balloon_timer >= 100) {
                        this.balloon_timer = 0;
                    } else {
                        return;
                    }
                }
                if (this.ballooncon == 18.2) {
                    this.balloon_timer = this.balloon_timer + 1;
                    if (this.balloon_timer == 1) {
                        this.siner = 0;
                        this.idlesprite = 'spr_pink_walk_right';
                    }
                    if (this.balloon_timer < 8) {
                        this.x = lerp(camerax() + 434, camerax() + 490, this.balloon_timer / 7);
                        this.y = lerp(cameray() + 70, cameray() + 162, this.balloon_timer / 7);
                    }
                    if (this.balloon_timer == 8) {
                        this.siner = 0;
                        this.idlesprite = 'spr_pink_yelling_r';
                    }
                    if (this.balloon_timer >= 8) {
                        this.balloon_timer = 0;
                    } else {
                        return;
                    }
                }
                if (this.ballooncon == 2) {
                    S.msgset(0, this.pink_battle_dialogue2);
                    this.ballooncon = 3;
                    this.balloonend = 0;
                    S.scr_enemyblcon(this, this.x + 105, global.monstery[this.myself] - 119 + 30, 14);
                    _who_is_talking = "none";
                    scr_shakeobj(this);
                } else if (this.ballooncon == 3) {
                    S.msgset(0, this.pink_battle_dialogue3);
                    this.ballooncon = 4;
                    this.balloonend = 0;
                    S.scr_enemyblcon(this, this.x + 105, global.monstery[this.myself] - 119 + 30, 14);
                    _who_is_talking = "none";
                    this.idlesprite = 'spr_mew_stomp';
                    this.siner = 1;
                    scr_shakeobj(this);
                } else if (this.ballooncon == 4) {
                    S.msgset(0, this.pink_battle_dialogue4);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    S.scr_enemyblcon(this, this.x + 105, global.monstery[this.myself] - 119 + 30, 14);
                    _who_is_talking = "none";
                    this.introcon = 1;
                    this.idlesprite = 'spr_pink_laugh';
                    this.siner = 0;
                    snd_stop('snd_pink_laugh_short');
                    snd_stop('snd_pink_laugh_long');
                    snd_play('snd_pink_laugh_short');
                } else if (this.ballooncon == 5) {
                    S.msgset(0, this.pink_battle_dialogue11);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                } else if (this.ballooncon == 6) {
                    S.msgset(0, this.pink_battle_dialogue13);
                    this.ballooncon = 6.1;
                    this.balloonend = 0;
                    this.idlesprite = 'spr_pink_kneeling_sad';
                    this.siner = 1;
                    snd_play('snd_pink_throw2');
                } else if (this.ballooncon == 6.1) {
                    S.msgset(0, this.pink_battle_dialogue13b);
                    this.ballooncon = 6.2;
                    this.balloonend = 0;
                    this.idlesprite = 'spr_pink_laugh';
                    this.siner = 0;
                    snd_stop('snd_pink_throw2');
                    snd_play('snd_pink_laugh_long');
                } else if (this.ballooncon == 6.2) {
                    S.msgset(0, this.pink_battle_dialogue13c);
                    if (W('obj_date_ui', function (other) {
                        this.show_doki_bar = true;
                    }, this) === EXIT) return;
                    this.ballooncon = 6.3;
                    this.balloonend = 0;
                    this.idlesprite = 'spr_pink_sweat_drop';
                    this.siner = 0;
                    scr_shakeobj(this);
                } else if (this.ballooncon == 6.3) {
                    S.msgset(0, this.pink_battle_dialogue13d);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                } else if (this.ballooncon == 7) {
                    S.msgset(0, this.pink_battle_dialogue15);
                    this.ballooncon = 7.1;
                    this.balloonend = 0;
                } else if (this.ballooncon == 7.1) {
                    S.msgset(0, this.pink_battle_dialogue16);
                    this.ballooncon = 7.2;
                    this.balloonend = 0;
                } else if (this.ballooncon == 7.2) {
                    S.msgset(0, this.pink_battle_dialogue16b);
                    this.electricity_con = 1;
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "body";
                    this.idlesprite = 'spr_pink_shocked';
                    this.siner = 0;
                    scr_shakeobj(this);
                } else if (this.ballooncon == 8) {
                    S.msgset(0, this.pink_battle_dialogue18);
                    this.ballooncon = 9;
                    this.balloonend = 0;
                    this.idlesprite = 'spr_pink_front_sweat';
                    this.siner = 0;
                    scr_shakeobj(this);
                    snd_play('snd_pink_throw2');
                } else if (this.ballooncon == 9) {
                    S.msgset(0, this.pink_battle_dialogue19);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    this.idlesprite = 'spr_pink_front_angry';
                    this.siner = 0;
                    scr_shakeobj(this);
                    snd_play('snd_pink_throw2');
                } else if (this.ballooncon == 9.2) {
                    S.msgset(0, this.pink_battle_dialogue19c);
                    this.ballooncon = 9.3;
                    this.balloonend = 0;
                    this.idlesprite = 'spr_pink_laugh';
                    this.siner = 0;
                    snd_stop('snd_pink_throw2');
                    snd_stop('snd_pink_laugh_short');
                    snd_stop('snd_pink_gasp');
                    snd_stop('snd_pink_laugh_long');
                    snd_play('snd_pink_laugh_long');
                } else if (this.ballooncon == 9.3) {
                    S.msgset(0, this.pink_battle_dialogue19d);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                } else if (this.ballooncon == 9.4) {
                    S.msgset(0, this.pink_battle_dialogue19f);
                    this.ballooncon = 9.5;
                    this.balloonend = 0;
                } else if (this.ballooncon == 9.5) {
                    S.msgset(0, this.pink_battle_dialogue19g);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                } else if (this.ballooncon == 9.6) {
                    S.msgset(0, this.pink_battle_dialogue19i);
                    this.ballooncon = 9.7;
                    this.balloonend = 0;
                    this.electricity_con = 0;
                    this.electricity_timer = 0;
                } else if (this.ballooncon == 9.7) {
                    S.msgset(0, this.pink_battle_dialogue19j);
                    this.ballooncon = 9.8;
                    this.balloonend = 0;
                } else if (this.ballooncon == 9.8) {
                    S.msgset(0, this.pink_battle_dialogue19k);
                    this.ballooncon = 9.9;
                    this.balloonend = 0;
                    _who_is_talking = "body";
                } else if (this.ballooncon == 9.9) {
                    S.msgset(0, this.pink_battle_dialogue19l);
                    global.mnfight = 1.5;
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    this.x = this.x - 10;
                    this.idlesprite = 'spr_pink_shocked';
                    this.siner = 0;
                    scr_shakeobj(this);
                    snd_play('snd_pink_throw2');
                } else if (this.ballooncon == 10) {
                    S.msgset(0, this.pink_battle_dialogue21);
                    this.ballooncon = 11;
                    this.balloonend = 0;
                    this.electricity_con = 1;
                    this.idlesprite = 'spr_pink_shocked';
                    _who_is_talking = "body";
                } else if (this.ballooncon == 11) {
                    S.msgset(0, this.pink_battle_dialogue22);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    this.electricity_con = 0;
                    this.electricity_timer = 0;
                    this.idlesprite = 'spr_pink_front_sweat';
                    scr_shakeobj(this);
                    snd_stop('snd_pink_throw2');
                    snd_stop('snd_pink_laugh_short');
                    snd_stop('snd_pink_gasp');
                    snd_stop('snd_pink_laugh_long');
                    snd_play('snd_pink_throw2');
                } else if (this.ballooncon == 12) {
                    S.msgset(0, this.pink_battle_dialogue24);
                    this.ballooncon = 13;
                    this.balloonend = 0;
                    this.siner = 1;
                    scr_shakeobj(this);
                    snd_play('snd_impact');
                    scr_shakescreen(this);
                } else if (this.ballooncon == 13) {
                    S.msgset(0, this.pink_battle_dialogue25);
                    this.ballooncon = 13.1;
                    this.balloonend = 1;
                    this.siner = 1;
                    this.idlesprite = 'spr_pink_yelling';
                    scr_shakeobj(this);
                } else if (this.ballooncon == 14) {
                    S.msgset(0, this.pink_battle_dialogue27c);
                    this.ballooncon = 14.1;
                    this.balloonend = 0;
                    this.idlesprite = 'spr_pink_front_angry_blink';
                    scr_shakeobj(this);
                    snd_play_x('snd_pink_gasp', 1, 1);
                } else if (this.ballooncon == 14.1) {
                    instance_create(this.x - 230, global.monstery[this.myself] - 40, 'obj_shutupballoon');
                    this.ballooncon = 14.2;
                    this.balloonend = 0;
                    this.electricity_con = 1;
                    this.idlesprite = 'spr_mew_stomp_angrier';
                    scr_shakeobj(this);
                    scr_shakescreen(this);
                    snd_play_x('snd_punchheavythunder', 1, 1.3);
                    snd_play_x('snd_punchweak', 1, 1.3);
                    if (W('obj_battleblcon', function (other) {
                        instance_destroy(this);
                        if (W(this.mywriter, function (other) {
                            instance_destroy(this);
                        }, this) === EXIT) return EXIT;
                        if (this.sprite_index == 'spr_pink_balloon1') {
                            this.inst = instance_create_depth(this.x + 47, this.y + 30, - 99999999, 'obj_animation');
                            this.inst.sprite_index = 'spr_heart_pop';
                            this.inst.image_blend = make_color_rgb(255, 181, 153);
                            this.inst.image_speed = 0.5;
                            this.inst.image_xscale = 3;
                            this.inst.image_yscale = 3;
                        }
                    }, this) === EXIT) return;
                    _who_is_talking = "";
                } else if (this.ballooncon == 14.2) {
                    S.msgset(0, this.pink_battle_dialogue27e);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    this.siner = 1;
                    this.electricity_con = 0;
                    this.electricity_timer = 0;
                } else if (this.ballooncon == 15) {
                    S.msgset(0, this.pink_battle_dialogue32f);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    this.electricity_con = 1;
                    this.siner = 1;
                    scr_shakeobj(this);
                    snd_play('snd_pink_throw2');
                    snd_play('snd_impact');
                    scr_shakescreen(this);
                } else if (this.ballooncon == 17) {
                    S.msgset(0, this.pink_battle_dialogue32h);
                    this.ballooncon = 18;
                    this.balloonend = 0;
                    this.idlesprite = 'spr_pink_yelling';
                    this.siner = 0;
                    scr_shakeobj(this);
                    snd_play('snd_pink_throw2');
                } else if (this.ballooncon == 18) {
                    S.msgset(0, this.pink_battle_dialogue32i);
                    this.ballooncon = 18.1;
                    this.balloonend = 0;
                    _who_is_talking = "body";
                    this.idlesprite = 'spr_pink_idle';
                    this.siner = 0;
                } else if (this.ballooncon == 18.1) {
                    S.msgset(0, this.pink_battle_dialogue32j);
                    this.ballooncon = 18.2;
                    this.balloonend = 0;
                    this.talked = 0.6;
                    S.scr_enemyblcon(this, this.x - 0, this.y + 40, 10);
                    _who_is_talking = "";
                } else if (this.ballooncon == 18.2) {
                    S.msgset(0, this.pink_battle_dialogue32k);
                    this.ballooncon = 18.3;
                    this.balloonend = 1;
                    S.scr_enemyblcon(this, this.x + 10, this.y + 34, 10);
                    _who_is_talking = "";
                } else if (this.ballooncon == 19) {
                    S.msgset(0, this.pink_battle_dialogue34);
                    this.ballooncon = 20;
                    this.balloonend = 0;
                    _who_is_talking = "body";
                } else if (this.ballooncon == 20) {
                    S.msgset(0, this.pink_battle_dialogue35);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "ghost";
                } else if (this.ballooncon == 21) {
                    S.msgset(0, this.pink_battle_dialogue37);
                    this.ballooncon = 21.1;
                    this.balloonend = 0;
                    _who_is_talking = "ghost";
                } else if (this.ballooncon == 21.1) {
                    S.msgset(0, this.pink_battle_dialogue38);
                    this.ballooncon = 21.2;
                    this.balloonend = 0;
                    _who_is_talking = "ralsei";
                } else if (this.ballooncon == 21.2) {
                    S.msgset(0, this.pink_battle_dialogue39);
                    this.ballooncon = 21.3;
                    this.balloonend = 0;
                    _who_is_talking = "ralsei";
                } else if (this.ballooncon == 21.3) {
                    S.msgset(0, this.pink_battle_dialogue40);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "ghost";
                } else if (this.ballooncon == 22) {
                    S.msgset(0, this.pink_battle_dialogue41b);
                    this.ballooncon = 23;
                    this.balloonend = 0;
                    _who_is_talking = "ralsei";
                } else if (this.ballooncon == 23) {
                    S.msgset(0, this.pink_battle_dialogue41c);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "ghost";
                } else if (this.ballooncon == 23.1) {
                    S.msgset(0, this.pink_battle_dialogue41e);
                    this.ballooncon = 23.2;
                    this.balloonend = 0;
                    _who_is_talking = "ghost";
                } else if (this.ballooncon == 23.2) {
                    S.msgset(0, this.pink_battle_dialogue41f);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "body";
                } else if (this.ballooncon == 23.3) {
                    S.msgset(0, this.pink_battle_dialogue_new_p3_2);
                    this.ballooncon = 23.4;
                    this.balloonend = 0;
                    _who_is_talking = "ghost";
                } else if (this.ballooncon == 23.4) {
                    S.msgset(0, this.pink_battle_dialogue_new_p3_3);
                    this.ballooncon = 23.5;
                    this.balloonend = 0;
                    _who_is_talking = "ghost";
                } else if (this.ballooncon == 23.5) {
                    S.msgset(0, this.pink_battle_dialogue_new_p3_4);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "ghost";
                } else if (this.ballooncon == 24) {
                    S.msgset(0, this.pink_battle_dialogue43);
                    this.ballooncon = 25;
                    this.balloonend = 0;
                    _who_is_talking = "ghost";
                } else if (this.ballooncon == 25) {
                    S.msgset(0, this.pink_battle_dialogue44);
                    this.ballooncon = 26;
                    this.balloonend = 0;
                    _who_is_talking = "ralsei";
                    if (global.hp[3] < 1) {
                        this.star = 2;
                        S.scr_healitemspell(this, Math.abs(global.hp[3]) + 1);
                        global.hp ??= []; global.hp[3] = 1;
                    }
                } else if (this.ballooncon == 26) {
                    S.msgset(0, this.pink_battle_dialogue45);
                    this.ballooncon = 27;
                    this.balloonend = 0;
                    _who_is_talking = "ralsei";
                } else if (this.ballooncon == 27) {
                    S.msgset(0, this.pink_battle_dialogue46);
                    this.ballooncon = 28;
                    this.balloonend = 0;
                    _who_is_talking = "ghost";
                } else if (this.ballooncon == 28) {
                    S.msgset(0, this.pink_battle_dialogue47);
                    this.ballooncon = 29;
                    this.balloonend = 0;
                    _who_is_talking = "ralsei";
                } else if (this.ballooncon == 29) {
                    S.msgset(0, this.pink_battle_dialogue48);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "ralsei";
                    this.phase4introcon = 3;
                    this.ralslookup = 1;
                } else if (this.ballooncon == 30) {
                    S.msgset(0, this.pink_battle_dialogue50);
                    this.ballooncon = 31;
                    this.balloonend = 0;
                    _who_is_talking = "body";
                } else if (this.ballooncon == 31) {
                    S.msgset(0, this.pink_battle_dialogue51);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "body";
                    this.idlesprite = 'spr_pink_very_hurt';
                } else if (this.ballooncon == 32) {
                    S.msgset(0, this.pink_battle_dialogue53);
                    this.ballooncon = 33;
                    this.balloonend = 0;
                    _who_is_talking = "ghost";
                } else if (this.ballooncon == 33) {
                    S.msgset(0, this.pink_battle_dialogue54);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "body";
                    this.idlesprite = 'spr_pink_very_hurt';
                } else if (this.ballooncon == 34) {
                    S.msgset(0, this.pink_battle_dialogue56);
                    this.ballooncon = 35;
                    this.balloonend = 0;
                    _who_is_talking = "body";
                } else if (this.ballooncon == 35) {
                    S.msgset(0, this.pink_battle_dialogue57);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "body";
                    this.idlesprite = 'spr_pink_very_hurt';
                } else if (this.ballooncon == 36) {
                    S.msgset(0, this.pink_battle_dialogue59);
                    this.ballooncon = 37;
                    this.balloonend = 0;
                    _who_is_talking = "ghost";
                } else if (this.ballooncon == 37) {
                    S.msgset(0, this.pink_battle_dialogue60);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "ghost";
                    this.idlesprite = 'spr_pink_very_hurt';
                } else if (this.ballooncon == 38) {
                    S.msgset(0, this.pink_battle_dialogue63);
                    this.ballooncon = 39;
                    this.balloonend = 0;
                    _who_is_talking = "ghost";
                } else if (this.ballooncon == 39) {
                    S.msgset(0, this.pink_battle_dialogue64);
                    this.ballooncon = 0;
                    this.balloonend = 1;
                    _who_is_talking = "ghost";
                    if (W('obj_date_ui', function (other) {
                        this.con = 1;
                    }, this) === EXIT) return;
                }
                __x = 0;
                if (this.idlesprite == 'spr_mew_pushing') {
                    __x = 12;
                }
                if (_who_is_talking == "pink") {
                    this.blcon = S.scr_enemyblcon(this, this.x - 10 + __x, this.y + 40, 10);
                    if (this.datecount == 3) {
                        this.blcon.mywriter.shake = 2;
                    }
                } else if (_who_is_talking == "body") {
                    this.blcon = S.scr_enemyblcon(this, this.x - 180 + __x, this.y - 10, 18);
                    if (this.datecount == 3) {
                        this.blcon.mywriter.shake = 2;
                    }
                } else if (_who_is_talking == "ghost") {
                    this.blcon = S.scr_enemyblcon(this, this.ghostmarker.x, this.ghostmarker.y - 60, 22);
                    if (this.datecount == 3) {
                        this.blcon.mywriter.shake = 2;
                    }
                } else if (_who_is_talking == "ralsei") {
                    global.typer = 74;
                    S.scr_heroblcon("ralsei");
                    if (global.hp[3] > 0) {
                        S.scr_battle_sprite_set("ralsei", 'spr_ralsei_idle_mad_lookdown', 0.16666666666666666, true);
                        if (this.ralslookup == 1) {
                            S.scr_battle_sprite_set("ralsei", 'spr_ralsei_idle_mad', 0.16666666666666666, true);
                            this.ralslookup = 0;
                        }
                    }
                } else if (_who_is_talking == "susie") {
                    global.typer = 75;
                    S.scr_heroblcon("susie");
                    S.scr_guardpeek(1435);
                }
                this.talked = 0.7;
                if (this.ballooncon == 0) {
                    this.talked = 0.5;
                    this.talktimer = 0;
                } else {
                    this.talked = 0.6;
                    this.talktimer = 0;
                }
                this.alarm ??= []; this.alarm[6] = 1;
            }
        }
        if (this.talked == 1 && T(S.scr_isphase("enemytalk")) && !T(i_ex('obj_writer'))) {
            global.mnfight = 1.5;
            this.electricity_con = 0;
            this.electricity_timer = 0;
            if (this.datecount == 3 && this.doki != 20) {
                if (W('obj_darkener', function (other) {
                    instance_destroy(this);
                }, this) === EXIT) return;
            }
        }
        if (global.mnfight == 1.5) {
            if (O('obj_heroralsei').state == 8) {
                S.scr_battle_sprite_reset("ralsei");
            }
            if (this.datecount == 3) {
            } else if (this.doki < this.dokimax) {
                if (this.myattackchoice == 2 || this.myattackchoice == 3 || this.myattackchoice == 4 || this.myattackchoice == 5 || this.myattackchoice == 6) {
                } else {
                    if (!T(instance_exists('obj_growtangle'))) {
                        instance_create(S.__view_get(0, 0) + 320, S.__view_get(1, 0) + 170, 'obj_growtangle');
                    }
                    if (W('obj_growtangle', function (other) {
                        if (!T(instance_exists('obj_moveheart'))) {
                            S.scr_moveheart();
                        }
                    }, this) === EXIT) return;
                    if (this.myattackchoice != 3) {
                        if (W('obj_growtangle', function (other) {
                            instance_create_depth(this.x, this.y, 4, 'obj_purplecontrols');
                        }, this) === EXIT) return;
                    }
                }
            }
            global.mnfight = 2;
            S.scr_turntimer(90);
        }
        if (T(S.scr_isphase("bullets")) && this.attacked == 0) {
            this.rtimer = this.rtimer + 1;
            if (this.datecount == 3 && this.phaseturns < 3) {
                this.rtimer = 12;
            }
            if (this.rtimer == 5) {
                if (this.ghostintrocon == 2) {
                    this.ghostintrocon = 3;
                    if (W(this.ghostmarker, function (other) {
                        this.hspeed = 0;
                        this.vspeed = 0;
                    }, this) === EXIT) return;
                    if (W(this.ghostmarker, function (other) {
                        S.scr_rememberxy(this);
                    }, this) === EXIT) return;
                    if (W(this.ghostmarker, function (other) {
                        S.scr_move_to_point_over_time(this, other.x + 40, other.y + 40, 5);
                    }, this) === EXIT) return;
                }
            }
            if (this.rtimer == 11 && this.ghostintrocon == 3) {
                if (W(this.ghostmarker, function (other) {
                    this.image_alpha = - 1;
                }, this) === EXIT) return;
            }
            if (this.rtimer == 12 && this.doki < this.dokimax || this.doki >= this.dokimax && this.rtimer == 15) {
                if (this.doki >= this.dokimax || this.datecount == 3 && this.phaseturns >= 3) {
                    this.datecount = this.datecount + 1;
                    if (this.datecount == 1 && i_ex('obj_writer') || this.datecount > 1) {
                        instance_create_depth(this.x, this.y, O('obj_battlecontroller').depth - 9999999, 'obj_date_controller');
                    }
                    if (this.datecount == 1) {
                        if (i_ex('obj_date_controller')) {
                            if (W('obj_battleblcon', function (other) {
                                this.depth = O('obj_date_controller').depth + 2;
                            }, this) === EXIT) return;
                            if (W('obj_writer', function (other) {
                                this.depth = O('obj_date_controller').depth + 1;
                            }, this) === EXIT) return;
                        }
                    }
                } else if (this.datecount == 3) {
                } else {
                    if (this.datecount != 3 && this.myattackchoice != 5) {
                        this.idlesprite = 'spr_pink_idle';
                    }
                    if (this.myattackchoice == 1) {
                        global.monsterattackname ??= []; global.monsterattackname[this.myself] = "cat";
                        this.dc = S.scr_bulletspawner(this, this.x, this.y, 'obj_dbulletcontroller');
                        this.dc.type = 200;
                        this.dc.difficulty = this.difficulty;
                    }
                    if (this.myattackchoice == 2) {
                        if (!T(instance_exists('obj_growtangle'))) {
                            instance_create(S.__view_get(0, 0) + 320, S.__view_get(1, 0) + 170, 'obj_growtangle');
                        }
                        if (W('obj_growtangle', function (other) {
                            if (!T(instance_exists('obj_moveheart'))) {
                                S.scr_moveheart();
                            }
                        }, this) === EXIT) return;
                        if (W('obj_growtangle', function (other) {
                            instance_create_depth(this.x, this.y, 4, 'obj_purplecontrols');
                        }, this) === EXIT) return;
                        O('obj_purplecontrols').mode = 2;
                        global.monsterattackname ??= []; global.monsterattackname[this.myself] = "bomb";
                        this.dc = S.scr_bulletspawner(this, this.x, this.y, 'obj_dbulletcontroller');
                        this.dc.type = 206;
                        this.dc.difficulty = this.difficulty;
                    }
                    if (this.myattackchoice == 3) {
                        if (!T(instance_exists('obj_growtangle'))) {
                            instance_create(S.__view_get(0, 0) + 320, S.__view_get(1, 0) + 170, 'obj_growtangle');
                        }
                        if (this.datecount == 1) {
                            instance_create(camerax() + 300, cameray() + 210, 'obj_heartmarker');
                        }
                        if (W('obj_growtangle', function (other) {
                            if (!T(instance_exists('obj_moveheart'))) {
                                S.scr_moveheart();
                            }
                        }, this) === EXIT) return;
                        global.monsterattackname ??= []; global.monsterattackname[this.myself] = "rotating box";
                        this.dc = S.scr_bulletspawner(this, this.x, this.y, 'obj_dbulletcontroller');
                        this.dc.type = 202;
                        this.dc.difficulty = this.difficulty;
                    }
                    if (this.myattackchoice == 4) {
                        if (!T(instance_exists('obj_growtangle'))) {
                            instance_create(S.__view_get(0, 0) + 320, S.__view_get(1, 0) + 170, 'obj_growtangle');
                        }
                        if (W('obj_growtangle', function (other) {
                            if (!T(instance_exists('obj_moveheart'))) {
                                S.scr_moveheart();
                            }
                        }, this) === EXIT) return;
                        if (W('obj_growtangle', function (other) {
                            this.maxxscale = 3.75;
                            this.maxyscale = 3.75;
                            if (!T(i_ex('obj_purplecontrols'))) {
                                instance_create_depth(this.x, this.y, 4, 'obj_purplecontrols');
                            }
                            O('obj_purplecontrols').mode = 7;
                            O('obj_purplecontrols').difficulty = other.difficulty;
                        }, this) === EXIT) return;
                        global.monsterattackname ??= []; global.monsterattackname[this.myself] = "3d tunnel";
                        this.dc = S.scr_bulletspawner(this, this.x, this.y, 'obj_dbulletcontroller');
                        this.dc.type = 208;
                        this.dc.difficulty = this.difficulty;
                    }
                    if (this.myattackchoice == 5) {
                        if (!T(instance_exists('obj_growtangle'))) {
                            instance_create(S.__view_get(0, 0) + 320, S.__view_get(1, 0) + 170, 'obj_growtangle');
                        }
                        global.monsterattackname ??= []; global.monsterattackname[this.myself] = "singing";
                        this.dc = S.scr_bulletspawner(this, this.x, this.y, 'obj_dbulletcontroller');
                        this.dc.type = 209;
                        this.dc.difficulty = this.difficulty;
                    }
                    if (this.myattackchoice == 6) {
                        if (!T(instance_exists('obj_growtangle'))) {
                            instance_create(S.__view_get(0, 0) + 320, S.__view_get(1, 0) + 170, 'obj_growtangle');
                        }
                        instance_create(camerax() + 280, cameray() + 160, 'obj_heartmarker');
                        if (i_ex('obj_heartmarker')) {
                            O('obj_heartmarker').x = camerax() + 280;
                            O('obj_heartmarker').y = cameray() + 160;
                        }
                        if (W('obj_growtangle', function (other) {
                            if (!T(instance_exists('obj_moveheart'))) {
                                S.scr_moveheart();
                            }
                        }, this) === EXIT) return;
                        if (W('obj_growtangle', function (other) {
                            instance_create_depth(this.x, this.y, 4, 'obj_purplecontrols');
                        }, this) === EXIT) return;
                        O('obj_purplecontrols').mode = 2;
                        global.monsterattackname ??= []; global.monsterattackname[this.myself] = "bomb";
                        this.dc = S.scr_bulletspawner(this, this.x, this.y, 'obj_dbulletcontroller');
                        this.dc.type = 203;
                        this.dc.difficulty = this.difficulty;
                    }
                    if (this.myattackchoice == 7) {
                        global.monsterattackname ??= []; global.monsterattackname[this.myself] = "vertical lanes";
                        this.dc = S.scr_bulletspawner(this, this.x, this.y, 'obj_dbulletcontroller');
                        this.dc.type = 204;
                        this.dc.difficulty = this.difficulty;
                    }
                    if (this.myattackchoice == 8) {
                        global.monsterattackname ??= []; global.monsterattackname[this.myself] = "vertical lanes";
                        this.dc = S.scr_bulletspawner(this, this.x, this.y, 'obj_dbulletcontroller');
                        this.dc.type = 205;
                        this.dc.difficulty = this.difficulty;
                    }
                }
                S.scr_turntimer(300);
                if (this.datecount == 3) {
                    global.turntimer = 2;
                }
                this.turns = this.turns + 1;
                this.attacked = 1;
            }
        }
        if (global.mnfight == 2 && global.turntimer <= 1) {
            if (this.setbattlemsg == 0) {
                global.typer = 6;
                global.fc = 0;
                this.idlesprite = 'spr_pink_idle';
                if (this.datecount == 3) {
                    this.idlesprite = 'spr_pink_very_hurt';
                }
                this.rr = choose(0, 1, 2, 3);
                if (this.datecount == 0) {
                    if (this.rr == 0) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Pink mews madly!", "obj_pink_enemy_slash_Step_0_gml_605_0");
                    }
                    if (this.rr == 1) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Pink spins her head around and laughs.", "obj_pink_enemy_slash_Step_0_gml_606_0");
                    }
                    if (this.rr == 2) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Pink stares at a mirror..^1. she doesn't turn around.", "obj_pink_enemy_slash_Step_0_gml_607_0");
                    }
                }
                if (this.datecount == 1) {
                    if (this.rr == 0) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Pink mutters to herself^1, and the smoke worsens.", "obj_pink_enemy_slash_Step_0_gml_611_0");
                    }
                    if (this.rr == 1) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Pink screams heart-censored magic words.", "obj_pink_enemy_slash_Step_0_gml_612_0");
                    }
                    if (this.rr == 2) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Pink's dummy bullets try to cheer her up.", "obj_pink_enemy_slash_Step_0_gml_613_0");
                    }
                }
                if (this.datecount == 2) {
                    if (this.rr == 0) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Pink's BODY winks!&* Pink's GHOST sticks out her tongue!", "obj_pink_enemy_slash_Step_0_gml_617_0");
                    }
                    if (this.rr == 1) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Pink's BODY holds out hands!&* Pink's GHOST slaps her BODY's hands away!", "obj_pink_enemy_slash_Step_0_gml_618_0");
                    }
                    if (this.rr == 2) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Pink's dummy bullets don't know who to cheer for!", "obj_pink_enemy_slash_Step_0_gml_619_0");
                    }
                }
                if (this.datecount == 3) {
                    this.rr = choose(0, 1, 2);
                    if (this.rr == 0) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Pink's BODY shudders!&* Pink's GHOST looks worried^1, then turns away!", "obj_pink_enemy_slash_Step_0_gml_624_0");
                    }
                    if (this.rr == 1) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Pink's BODY emits smoke!&* Pink's GHOST reaches out^1, then stops!", "obj_pink_enemy_slash_Step_0_gml_625_0");
                    }
                    if (this.rr == 2) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Pink's BODY's voice falters!&* Pink's GHOST starts to say something^1, then stops!", "obj_pink_enemy_slash_Step_0_gml_626_0");
                    }
                } else {
                    if (this.rr == 3) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* The air swirls in rosy chaos.", "obj_pink_enemy_slash_Step_0_gml_630_0");
                    }
                    if (irandom(100) < 3) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Smells like perfume and plastic.", "obj_pink_enemy_slash_Step_0_gml_631_0");
                    }
                }
                if (this.doki >= 12) {
                    global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* The DOKI meter is almost full!", "obj_pink_enemy_slash_Step_0_gml_633_0");
                }
                if (this.firstphaseturn == 1) {
                    if (this.datecount == 1) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Pink is reeling from the impact of the DATE.&* TP meter reset!", "obj_pink_enemy_slash_Step_0_gml_636_0");
                    }
                    if (this.datecount == 2) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Pink has split into GHOST and BODY!&* TP meter reset!", "obj_pink_enemy_slash_Step_0_gml_637_0");
                    }
                    if (this.datecount == 3) {
                        global.battlemsg ??= []; global.battlemsg[0] = S.stringsetloc("* Pink's BODY is heavily damaged...!", "obj_pink_enemy_slash_Step_0_gml_638_0");
                    }
                    this.firstphaseturn = 0;
                }
                this.setbattlemsg = true;
                this.lovelyboy = false;
                if (this.ghostintrocon == 3) {
                    this.ghostintrocon = 4;
                    this.ghostintrotimer = 0;
                    if (W(this.ghostmarker, function (other) {
                        scr_lerpvar(this, "image_alpha", - 1, 0.5, 20, "in");
                    }, this) === EXIT) return;
                    if (W(this.ghostmarker, function (other) {
                        S.scr_move_to_rememberxy(this, 5);
                    }, this) === EXIT) return;
                }
            }
        }
    }
    if (global.myfight == 3) {
        this.xx = S.__view_get(0, 0);
        this.yy = S.__view_get(1, 0);
        noeffectstring = S.stringsetloc("* You flirted...&* But it had no effect!/%", "obj_pink_enemy_slash_Step_0_gml_685_0");
        susnoeffectstring = S.stringsetloc("* Susie flirted...&* But it had no effect!/%", "obj_pink_enemy_slash_Step_0_gml_686_0");
        ralnoeffectstring = S.stringsetloc("* Ralsei flirted...&* But it had no effect!/%", "obj_pink_enemy_slash_Step_0_gml_687_0");
        if (this.acting == 1 && this.actcon == 0) {
            this.actcon = 1;
            if (this.datecount == 0) {
                S.msgsetloc(0, "* PINK - A Lightner ghost in a magical girl's body^1. Doki her heart with flirts^1, and...!?/%", "obj_pink_enemy_slash_Step_0_gml_665_0");
            } else if (this.datecount == 1) {
                S.msgsetloc(0, "* PINK - A Lightner ghost in a Darkner girl's body^1. Fill the DOKI METER to DATE!/%", "obj_pink_enemy_slash_Step_0_gml_666_0");
            } else if (this.datecount == 2) {
                S.msgsetloc(0, "* PINK - A Lightner ghost^1, or a Darkner body!^1? Fill the DOKI METER to DATE them both!/%", "obj_pink_enemy_slash_Step_0_gml_667_0");
            } else {
                S.msgsetloc(0, "* PINK - Without a spirit to control it^1, the body will break down..^1./%", "obj_pink_enemy_slash_Step_0_gml_668_0");
            }
            S.scr_battletext_default(this);
        }
        if (this.acting == 2 && this.actcon == 0) {
            if (this.datecount == 3) {
                S.msgset(0, noeffectstring);
                S.scr_battletext_default(this);
                this.actcon = 1;
                this.acting = 0;
            } else {
                _kris_flirt_string = S.stringsetloc("* You flirted!", "obj_pink_enemy_slash_Step_0_gml_674_0");
                if (this.simultotal == 1) {
                    S.msgset(0, _kris_flirt_string + "/%");
                    S.scr_battletext_default(this);
                    this.actcon = 1;
                    this.acting = 0;
                } else {
                    S.msgset(0, _kris_flirt_string);
                    S.scr_simultext(this, "kris");
                    if (this.simulorderkri == 0) {
                        this.actcon = 20;
                    } else {
                        this.actcon = - 1;
                    }
                    this.acting = 0;
                }
                if (global.hp[3] < 1 && global.hp[2] < 1) {
                    S.scr_dokiadd(this.myself, 3);
                } else if (global.hp[3] < 1 || global.hp[2] < 1) {
                    S.scr_dokiadd(this.myself, 2);
                } else {
                    S.scr_dokiadd(this.myself, 1);
                }
                this.krishearts = true;
                snd_play_x('snd_magicsprinkle', 0.6, 0.5);
                snd_play_x('snd_explosion_mmx3', 0.5, 0.5);
                if (this.outfit_select % 2 == 0) {
                    S.scr_battle_sprite_set("kris", 'spr_kris_uniform1', 0, true);
                } else {
                    S.scr_battle_sprite_set("kris", 'spr_kris_uniform2', 0, true);
                }
                this.outfit_select = this.outfit_select + 1;
                if (W('obj_herokris', function (other) {
                    this._oflash = S.scr_oflash(this);
                    this.a = scr_afterimage(this);
                    this.a.hspeed = 2.5;
                    this.a.depth = this.depth + 1;
                    this.b = scr_afterimage(this);
                    this.b.image_alpha = 0.6;
                    this.b.hspeed = 5;
                    this.b.depth = this.depth + 2;
                }, this) === EXIT) return;
            }
        }
        if (this.acting == 2.1 && this.actcon == 0 && !T(i_ex('obj_writer'))) {
            this.datecount = this.datecount + 1;
            instance_create(this.x, this.y, 'obj_date_controller');
            this.acting = 2.2;
        }
        if (this.acting == 2.2 && this.actcon == 0 && !T(i_ex('obj_date_controller'))) {
            this.actcon = 1;
        }
        if (this.acting == 3 && this.actcon == 0) {
            if (this.datecount == 3) {
                S.msgset(0, noeffectstring);
                S.scr_battletext_default(this);
                this.actcon = 1;
                this.acting = 0;
            } else {
                _kris_flirthard_string = S.stringsetloc("* You flirted hard!", "obj_pink_enemy_slash_Step_0_gml_795_0");
                if (this.simultotal == 1) {
                    S.msgset(0, _kris_flirthard_string + "/%");
                    S.scr_battletext_default(this);
                    this.actcon = 1;
                    this.acting = 0;
                } else {
                    S.msgset(0, _kris_flirthard_string);
                    S.scr_simultext(this, "kris");
                    if (this.simulorderkri == 0) {
                        this.actcon = 20;
                    } else {
                        this.actcon = - 1;
                    }
                    this.acting = 0;
                }
                S.scr_dokiadd(this.myself, 5);
                if (W('obj_herokris', function (other) {
                    this.pinkflashtimer = 5;
                    this.a = scr_afterimage(this);
                    this.a.hspeed = 2.5;
                    this.a.depth = this.depth + 1;
                    this.a.sprite_index = 0;
                    this.a.parentid = this;
                }, this) === EXIT) return;
                this.krishearts = true;
                snd_play_x('snd_magicsprinkle', 0.6, 0.5);
                snd_play_x('snd_explosion_mmx3', 0.5, 0.5);
                if (this.outfit_select % 2 == 0) {
                    S.scr_battle_sprite_set("kris", 'spr_kris_uniform1', 0, true);
                } else {
                    S.scr_battle_sprite_set("kris", 'spr_kris_uniform2', 0, true);
                }
                if (W('obj_herokris', function (other) {
                    this._oflash = S.scr_oflash(this);
                    this.a = scr_afterimage(this);
                    this.a.hspeed = 2.5;
                    this.a.depth = this.depth + 1;
                    this.b = scr_afterimage(this);
                    this.b.image_alpha = 0.6;
                    this.b.hspeed = 5;
                    this.b.depth = this.depth + 2;
                }, this) === EXIT) return;
                this.outfit_select = this.outfit_select + 1;
            }
        }
        if (this.acting == 4 && this.actcon == 0) {
            if (this.datecount == 3) {
                S.msgset(0, noeffectstring);
                S.scr_battletext_default(this);
                this.actcon = 1;
                this.acting = 0;
            } else {
                this.actcon = 1;
                S.msgsetloc(0, "* Everyone flirted hard!/%", "obj_pink_enemy_slash_Step_0_gml_718_0");
                S.scr_battletext_default(this);
                S.scr_dokiadd(this.myself, 5);
                if (W('obj_heroparent', function (other) {
                    this.pinkflashtimer = 5;
                    this.a = scr_afterimage(this);
                    this.a.hspeed = 2.5;
                    this.a.depth = this.depth + 1;
                    this.a.sprite_index = 0;
                    this.a.parentid = this;
                    this.b = scr_afterimage(this);
                    this.b.image_alpha = 0.6;
                    this.b.hspeed = 5;
                    this.b.depth = this.depth + 2;
                    this.b.parentid = this;
                }, this) === EXIT) return;
                this.krishearts = true;
                this.susiehearts = true;
                this.ralseihearts = true;
                snd_play_x('snd_magicsprinkle', 0.6, 0.5);
                snd_play_x('snd_explosion_mmx3', 0.5, 0.5);
                if (this.outfit_select % 2 == 0) {
                    S.scr_battle_sprite_set("kris", 'spr_kris_uniform1', 0, true);
                    S.scr_battle_sprite_set("susie", 'spr_susie_uniform1', 0, true);
                    S.scr_battle_sprite_set("ralsei", 'spr_ralsei_uniform1', 0, true);
                } else {
                    S.scr_battle_sprite_set("kris", 'spr_kris_uniform2', 0, true);
                    S.scr_battle_sprite_set("susie", 'spr_susie_uniform2', 0, true);
                    S.scr_battle_sprite_set("ralsei", 'spr_ralsei_uniform2', 0, true);
                }
                this.outfit_select = this.outfit_select + 1;
                if (W('obj_herokris', function (other) {
                    this._oflash = S.scr_oflash(this);
                    this.a = scr_afterimage(this);
                    this.a.hspeed = 2.5;
                    this.a.depth = this.depth + 1;
                    this.b = scr_afterimage(this);
                    this.b.image_alpha = 0.6;
                    this.b.hspeed = 5;
                    this.b.depth = this.depth + 2;
                }, this) === EXIT) return;
                if (W('obj_herosusie', function (other) {
                    this._oflash = S.scr_oflash(this);
                    this.a = scr_afterimage(this);
                    this.a.hspeed = 2.5;
                    this.a.depth = this.depth + 1;
                    this.b = scr_afterimage(this);
                    this.b.image_alpha = 0.6;
                    this.b.hspeed = 5;
                    this.b.depth = this.depth + 2;
                }, this) === EXIT) return;
                if (W('obj_heroralsei', function (other) {
                    this._oflash = S.scr_oflash(this);
                    this.a = scr_afterimage(this);
                    this.a.hspeed = 2.5;
                    this.a.depth = this.depth + 1;
                    this.b = scr_afterimage(this);
                    this.b.image_alpha = 0.6;
                    this.b.hspeed = 5;
                    this.b.depth = this.depth + 2;
                }, this) === EXIT) return;
            }
        }
        if (this.acting == 5 && this.actcon == 0) {
            if (this.datecount == 3) {
                S.msgset(0, noeffectstring);
                S.scr_battletext_default(this);
                this.actcon = 1;
                this.acting = 0;
            } else {
                this.actcon = 1;
                S.msgsetloc(0, "* Everyone used GIGA FLIRT!/%", "obj_pink_enemy_slash_Step_0_gml_746_0");
                S.scr_battletext_default(this);
                if (W('obj_writer', function (other) {
                    this.special = 0;
                }, this) === EXIT) return;
                S.scr_dokiadd(this.myself, 10);
                if (W('obj_heroparent', function (other) {
                    this.pinkflashtimer = 5;
                    this.a = scr_afterimage(this);
                    this.a.hspeed = 2.5;
                    this.a.depth = this.depth + 1;
                    this.a.sprite_index = 0;
                    this.a.parentid = this;
                    this.b = scr_afterimage(this);
                    this.b.image_alpha = 0.6;
                    this.b.hspeed = 5;
                    this.b.depth = this.depth + 2;
                    this.b.parentid = this;
                }, this) === EXIT) return;
                this.krishearts = true;
                this.susiehearts = true;
                this.ralseihearts = true;
                instance_create(O('obj_herosusie').x + 100, O('obj_herosusie').y + 30, 'obj_gigaheart');
                if (this.outfit_select % 2 == 0) {
                    S.scr_battle_sprite_set("kris", 'spr_kris_uniform1', 0, true);
                    S.scr_battle_sprite_set("susie", 'spr_susie_uniform1', 0, true);
                    S.scr_battle_sprite_set("ralsei", 'spr_ralsei_uniform1', 0, true);
                } else {
                    S.scr_battle_sprite_set("kris", 'spr_kris_uniform2', 0, true);
                    S.scr_battle_sprite_set("susie", 'spr_susie_uniform2', 0, true);
                    S.scr_battle_sprite_set("ralsei", 'spr_ralsei_uniform2', 0, true);
                }
                this.outfit_select = this.outfit_select + 1;
                if (W('obj_herokris', function (other) {
                    this._oflash = S.scr_oflash(this);
                    this.a = scr_afterimage(this);
                    this.a.hspeed = 2.5;
                    this.a.depth = this.depth + 1;
                    this.b = scr_afterimage(this);
                    this.b.image_alpha = 0.6;
                    this.b.hspeed = 5;
                    this.b.depth = this.depth + 2;
                }, this) === EXIT) return;
                if (W('obj_herosusie', function (other) {
                    this._oflash = S.scr_oflash(this);
                    this.a = scr_afterimage(this);
                    this.a.hspeed = 2.5;
                    this.a.depth = this.depth + 1;
                    this.b = scr_afterimage(this);
                    this.b.image_alpha = 0.6;
                    this.b.hspeed = 5;
                    this.b.depth = this.depth + 2;
                }, this) === EXIT) return;
                if (W('obj_heroralsei', function (other) {
                    this._oflash = S.scr_oflash(this);
                    this.a = scr_afterimage(this);
                    this.a.hspeed = 2.5;
                    this.a.depth = this.depth + 1;
                    this.b = scr_afterimage(this);
                    this.b.image_alpha = 0.6;
                    this.b.hspeed = 5;
                    this.b.depth = this.depth + 2;
                }, this) === EXIT) return;
            }
        }
        if (this.acting == 5.1 && this.actcon == 0 && !T(i_ex('obj_writer')) && !T(i_ex('obj_gigaheart'))) {
            this.acting = 5.2;
            this.actcon = 1;
        }
        if (this.actingsus == 1 && this.actconsus == 1) {
            if (this.datecount == 3) {
                S.msgset(0, susnoeffectstring);
                S.scr_battletext_default(this);
                this.actingsus = 0;
                this.actcon = 1;
                this.actconsus = 0;
            } else {
                _s_actstring = S.stringsetloc("* Susie flirted!", "obj_pink_enemy_slash_Step_0_gml_757_0");
                if (this.simultotal == 1) {
                    S.msgset(0, _s_actstring + "/%");
                    S.scr_battletext_default(this);
                    this.actconsus = 20;
                } else {
                    S.msgset(0, _s_actstring);
                    S.scr_simultext(this, "susie");
                    if (this.simulordersus == 0) {
                        this.actconsus = 20;
                    } else {
                        this.actconsus = 0;
                    }
                }
                if (global.hp[1] < 1 && global.hp[3] < 1) {
                    S.scr_dokiadd(this.myself, 3);
                } else if (global.hp[1] < 1 || global.hp[3] < 1) {
                    S.scr_dokiadd(this.myself, 2);
                } else {
                    S.scr_dokiadd(this.myself, 1);
                }
                this.susiehearts = true;
                snd_stop('snd_magicsprinkle');
                snd_stop('snd_explosion_mmx3');
                snd_play_x('snd_magicsprinkle', 0.6, 0.5);
                snd_play_x('snd_explosion_mmx3', 0.5, 0.5);
                if (this.outfit_select % 2 == 0) {
                    S.scr_battle_sprite_set("susie", 'spr_susie_uniform1', 0, true);
                } else {
                    S.scr_battle_sprite_set("susie", 'spr_susie_uniform2', 0, true);
                }
                this.outfit_select = this.outfit_select + 1;
                if (W('obj_herosusie', function (other) {
                    this._oflash = S.scr_oflash(this);
                    this.a = scr_afterimage(this);
                    this.a.hspeed = 2.5;
                    this.a.depth = this.depth + 1;
                    this.b = scr_afterimage(this);
                    this.b.image_alpha = 0.6;
                    this.b.hspeed = 5;
                    this.b.depth = this.depth + 2;
                }, this) === EXIT) return;
            }
        }
        if (this.actingsus == 2 && this.actconsus == 1) {
            if (this.datecount == 3) {
                S.msgset(0, susnoeffectstring);
                S.scr_battletext_default(this);
                this.actingsus = 0;
                this.actcon = 1;
                this.actconsus = 0;
            } else {
                _s_actstring = S.stringsetloc("* Susie flirted hard!", "obj_pink_enemy_slash_Step_0_gml_778_0");
                if (this.simultotal == 1) {
                    S.msgset(0, _s_actstring + "/%");
                    S.scr_battletext_default(this);
                    this.actconsus = 20;
                } else {
                    S.msgset(0, _s_actstring);
                    S.scr_simultext(this, "susie");
                    if (this.simulordersus == 0) {
                        this.actconsus = 20;
                    } else {
                        this.actconsus = 0;
                    }
                }
                S.scr_dokiadd(this.myself, 5);
                this.susiehearts = true;
                snd_stop('snd_magicsprinkle');
                snd_stop('snd_explosion_mmx3');
                snd_play_x('snd_magicsprinkle', 0.6, 0.5);
                snd_play_x('snd_explosion_mmx3', 0.5, 0.5);
                if (this.outfit_select % 2 == 0) {
                    S.scr_battle_sprite_set("susie", 'spr_susie_uniform1', 0, true);
                } else {
                    S.scr_battle_sprite_set("susie", 'spr_susie_uniform2', 0, true);
                }
                this.outfit_select = this.outfit_select + 1;
                if (W('obj_herosusie', function (other) {
                    this._oflash = S.scr_oflash(this);
                    this.a = scr_afterimage(this);
                    this.a.hspeed = 2.5;
                    this.a.depth = this.depth + 1;
                    this.b = scr_afterimage(this);
                    this.b.image_alpha = 0.6;
                    this.b.hspeed = 5;
                    this.b.depth = this.depth + 2;
                }, this) === EXIT) return;
            }
        }
        if (this.actingsus == 3 && this.actconsus == 1) {
            S.msgsetloc(0, "* Susie decided to share an item with Pink!/%", "obj_pink_enemy_slash_Step_0_gml_797_0");
            S.scr_battletext_default(this);
            this.actingsus = 3.1;
        }
        if (this.actingsus == 3.1 && this.actconsus == 1) {
            this.sharefoodtimer = this.sharefoodtimer + 1;
            if (this.sharefoodtimer == 1) {
                S.scr_battle_sprite_set("susie", 'spr_susieb_item', 0.3333333333333333, false);
            }
            if (this.sharefoodtimer == 9) {
                instance_create(O('obj_herosusie').x + 60, O('obj_herosusie').y + 60, 'obj_sharefood_act');
            }
            if (this.sharefoodtimer >= 60) {
                this.sharefoodtimer = 0;
                this.actingsus = 3.2;
            }
        }
        if (this.actingsus == 3.2 && this.actconsus == 1 && !T(i_ex('obj_writer')) && !T(i_ex('obj_sharefood_act'))) {
            if (W('obj_pink_enemy', function (other) {
                if (S.scr_item_to_doki(this.sharefood_item_number) == 0) {
                    S.msgsetsubloc(0, "* ~1&* Pink hated it! No DOKI increase!/%", S.scr_item_to_dokitext(this.sharefood_item_number), "obj_pink_enemy_slash_Step_0_gml_821_0");
                }
                if (S.scr_item_to_doki(this.sharefood_item_number) == 1) {
                    S.msgsetsubloc(0, "* ~1&* Pink tolerated it! +1 DOKI!/%", S.scr_item_to_dokitext(this.sharefood_item_number), "obj_pink_enemy_slash_Step_0_gml_824_0");
                }
                if (S.scr_item_to_doki(this.sharefood_item_number) == 2) {
                    S.msgsetsubloc(0, "* ~1&* Pink liked it! +2 DOKI!/%", S.scr_item_to_dokitext(this.sharefood_item_number), "obj_pink_enemy_slash_Step_0_gml_827_0");
                }
                if (S.scr_item_to_doki(this.sharefood_item_number) == 3) {
                    S.msgsetsubloc(0, "* ~1&* Pink loved it! +3 DOKI!/%", S.scr_item_to_dokitext(this.sharefood_item_number), "obj_pink_enemy_slash_Step_0_gml_830_0");
                }
                if (S.scr_item_to_doki(this.sharefood_item_number) == 4) {
                    S.msgsetsubloc(0, "* ~1&* ! +4 DOKI!/%", S.scr_item_to_dokitext(this.sharefood_item_number), "obj_pink_enemy_slash_Step_0_gml_833_0");
                }
                if (S.scr_item_to_doki(this.sharefood_item_number) == 15) {
                    S.msgsetsubloc(0, "* ~1&* Pink was in ecstasy! +15 DOKI!/%", S.scr_item_to_dokitext(this.sharefood_item_number), "obj_pink_enemy_slash_Step_0_gml_836_0");
                }
                S.scr_battletext_default(this);
            }, this) === EXIT) return;
            this.actingsus = 3.3;
        }
        if (this.actingsus == 3.3 && this.actconsus == 1 && !T(i_ex('obj_writer'))) {
            this.actingsus = 3.4;
            this.actcon = 1;
            this.actconsus = 0;
            if (this.datecount == 3) {
                this.idlesprite = 'spr_pink_very_hurt';
            }
        }
        if (this.actingral == 1 && this.actconral == 1) {
            if (this.datecount == 3) {
                S.msgset(0, ralnoeffectstring);
                S.scr_battletext_default(this);
                this.actingral = 0;
                this.actcon = 1;
                this.actconral = 0;
            } else {
                _r_actstring = S.stringsetloc("* Ralsei flirted!", "obj_pink_enemy_slash_Step_0_gml_853_0");
                if (this.simultotal == 1) {
                    S.msgset(0, _r_actstring + "/%");
                    S.scr_battletext_default(this);
                    this.actconral = 20;
                } else {
                    S.msgset(0, _r_actstring);
                    S.scr_simultext(this, "ralsei");
                    if (this.simulorderral == 0) {
                        this.actconral = 20;
                    } else {
                        this.actconral = 0;
                    }
                }
                if (global.hp[1] < 1 && global.hp[2] < 1) {
                    S.scr_dokiadd(this.myself, 3);
                } else if (global.hp[1] < 1 || global.hp[2] < 1) {
                    S.scr_dokiadd(this.myself, 2);
                } else {
                    S.scr_dokiadd(this.myself, 1);
                }
                this.ralseihearts = true;
                snd_stop('snd_magicsprinkle');
                snd_stop('snd_explosion_mmx3');
                snd_play_x('snd_magicsprinkle', 0.6, 0.5);
                snd_play_x('snd_explosion_mmx3', 0.5, 0.5);
                if (this.outfit_select % 2 == 0) {
                    S.scr_battle_sprite_set("ralsei", 'spr_ralsei_uniform1', 0, true);
                } else {
                    S.scr_battle_sprite_set("ralsei", 'spr_ralsei_uniform2', 0, true);
                }
                this.outfit_select = this.outfit_select + 1;
                if (W('obj_heroralsei', function (other) {
                    this._oflash = S.scr_oflash(this);
                    this.a = scr_afterimage(this);
                    this.a.hspeed = 2.5;
                    this.a.depth = this.depth + 1;
                    this.b = scr_afterimage(this);
                    this.b.image_alpha = 0.6;
                    this.b.hspeed = 5;
                    this.b.depth = this.depth + 2;
                }, this) === EXIT) return;
            }
        }
        if (this.actingral == 2 && this.actconral == 1) {
            if (this.datecount == 3) {
                S.msgset(0, ralnoeffectstring);
                S.scr_battletext_default(this);
                this.actingral = 0;
                this.actcon = 1;
                this.actconral = 0;
            } else {
                _r_actstring = S.stringsetloc("* Ralsei flirted hard!", "obj_pink_enemy_slash_Step_0_gml_874_0");
                if (this.simultotal == 1) {
                    S.msgset(0, _r_actstring + "/%");
                    S.scr_battletext_default(this);
                    this.actconral = 20;
                } else {
                    S.msgset(0, _r_actstring);
                    S.scr_simultext(this, "ralsei");
                    if (this.simulorderral == 0) {
                        this.actconral = 20;
                    } else {
                        this.actconral = 0;
                    }
                }
                S.scr_dokiadd(this.myself, 5);
                this.ralseihearts = true;
                snd_stop('snd_magicsprinkle');
                snd_stop('snd_explosion_mmx3');
                snd_play_x('snd_magicsprinkle', 0.6, 0.5);
                snd_play_x('snd_explosion_mmx3', 0.5, 0.5);
                if (this.outfit_select % 2 == 0) {
                    S.scr_battle_sprite_set("ralsei", 'spr_ralsei_uniform1', 0, true);
                } else {
                    S.scr_battle_sprite_set("ralsei", 'spr_ralsei_uniform2', 0, true);
                }
                this.outfit_select = this.outfit_select + 1;
                if (W('obj_heroralsei', function (other) {
                    this._oflash = S.scr_oflash(this);
                    this.a = scr_afterimage(this);
                    this.a.hspeed = 2.5;
                    this.a.depth = this.depth + 1;
                    this.b = scr_afterimage(this);
                    this.b.image_alpha = 0.6;
                    this.b.hspeed = 5;
                    this.b.depth = this.depth + 2;
                }, this) === EXIT) return;
            }
        }
        if (this.actingral == 3 && this.actconral == 1) {
            instance_create(this.x, this.y, 'obj_lovelyboy');
            this.lovelyboy = true;
            snd_play('snd_drumroll');
            if (this.lovelyboycount == 0) {
                this.actingral = 3.1;
            }
            if (this.lovelyboycount > 0) {
                S.msgsetloc(0, "* Gathered adoration^1! Max TP went up!", "obj_pink_enemy_slash_Step_0_gml_900_0");
                S.scr_simultext(this, "ralsei");
                if (W('obj_lovelyboy', function (other) {
                    this.faster = true;
                }, this) === EXIT) return;
                if (this.simulorderral == 0) {
                    this.actconral = 20;
                } else {
                    this.actconral = 0;
                }
                this.actingral = 3.5;
            }
            this.lovelyboycount = this.lovelyboycount + 1;
        }
        if (this.actingral == 3.1 && this.actconral == 1) {
            this.acttimer = this.acttimer + 1;
            if (this.acttimer == 1) {
                this.acttimer = 0;
                this.actingral = 3.2;
            }
        }
        if (this.actingral == 3.2 && this.actconral == 1 && !T(i_ex('obj_lovelyboy'))) {
            S.msgsetloc(0, "* Ralsei looked adorable!&* HEARTS came out!&* MAX TP up!/%", "obj_pink_enemy_slash_Step_0_gml_933_0");
            S.scr_battletext_default(this);
            this.actingral = 3.4;
        }
        if (this.actingral == 3.4 && this.actconral == 1 && !T(i_ex('obj_writer'))) {
            this.actingral = 3.5;
            this.actcon = 1;
            this.actconral = 0;
            global.actsimulral ??= []; global.actsimulral[this.myself] ??= []; global.actsimulral[this.myself][2] = 1;
        }
        if (this.actcon == 20 || this.actconsus == 20 || this.actconral == 20) {
            if (T(S.scr_terminate_writer())) {
                this.actconsus = - 1;
                this.actconral = - 1;
                this.actcon = 1;
            }
        }
        if (this.actcon == 1 && !T(instance_exists('obj_writer')) && !T(i_ex('obj_lovelyboy')) && !T(i_ex('obj_gigaheart'))) {
            S.scr_nextact();
            if (O('obj_herokris').state == 8) {
                S.scr_battle_sprite_reset("kris");
            }
            if (O('obj_herosusie').state == 8) {
                S.scr_battle_sprite_reset("susie");
            }
            if (O('obj_heroralsei').state == 8) {
                S.scr_battle_sprite_reset("ralsei");
            }
            this.krishearts = false;
            this.susiehearts = false;
            this.ralseihearts = false;
            if (this.idlesprite == 'spr_pink_front_sweat' || this.idlesprite == 'spr_pink_front_angry') {
                if (this.datecount != 3) {
                    this.idlesprite = 'spr_pink_idle';
                } else {
                    this.idlesprite = 'spr_pink_very_hurt';
                }
            }
            if (this.resetralsei == 1) {
                this.resetralsei = false;
                snd_play('snd_wing');
                O('obj_heroralsei').x = O('obj_heroralsei').xstart;
                O('obj_heroralsei').y = O('obj_heroralsei').ystart;
                if (W('obj_heroralsei', function (other) {
                    this.normalsprite = 'spr_ralsei_walk_right';
                    this.idlesprite = 'spr_ralsei_idle';
                    this.defendsprite = 'spr_ralsei_defend';
                    this.hurtsprite = 'spr_ralsei_hurt_fixed';
                    this.attackreadysprite = 'spr_ralsei_attackready';
                    this.attacksprite = 'spr_ralsei_attack';
                    this.itemsprite = 'spr_ralsei_item';
                    this.itemreadysprite = 'spr_ralsei_itemready';
                    this.spellreadysprite = 'spr_ralsei_spellready';
                    this.spellsprite = 'spr_ralsei_spell';
                    this.defeatsprite = 'spr_ralsei_defeat';
                    this.victorysprite = 'spr_ralsei_victory';
                    this.actreadysprite = 'spr_ralsei_actready';
                    this.actsprite = 'spr_ralsei_act';
                }, this) === EXIT) return;
                for (let _r12454 = 0, _n12454 = (26); _r12454 < _n12454; _r12454++) {
                    this.puff = instance_create(O('obj_heroralsei').x + 50 - 60 + irandom(80), O('obj_heroralsei').y - 90 + 90 + irandom(100), 'obj_animation');
                    this.puff.depth = O('obj_heroralsei').depth - 1;
                    this.puff.sprite_index = 'spr_susiezilla_houseexplosion';
                    this.puff.image_speed = 0.5;
                    this.puff.image_xscale = 1;
                    this.puff.image_yscale = 1;
                }
            }
        }
    }
    if (this.state == 3) {
        S.scr_enemy_hurt(this);
    }
    if (W('obj_afterimage', function (other) {
        if (this.hspeed > 0 && this.parentid != - 1) {
            this.sprite_index = this.parentid.sprite_index;
            this.image_index = this.parentid.index;
        }
    }, this) === EXIT) return;
    if (this.tripleghostcon == 1) {
        this.tripleghosttimer = this.tripleghosttimer + 1;
        if (this.ghostintrotimer == 1) {
        }
        if (this.tripleghosttimer == 60) {
        }
    }
    if (this.ghostintrocon == 1) {
        this.ghostintrotimer = this.ghostintrotimer + 1;
        if (W('obj_pink_dummy', function (other) {
            this.shocktimer = 30;
        }, this) === EXIT) return;
        if (this.ghostintrotimer == 1) {
            this.idlesprite = 'spr_pink_front_surprised_topleftorign';
        }
        if (this.ghostintrotimer < 16) {
            if (this.x == this.xstart) {
                this.x = this.xstart + 1 + irandom(4);
            }
            if (this.x > this.xstart) {
                this.x = this.xstart - 1 - irandom(4);
            }
            if (this.x < this.xstart) {
                this.x = this.xstart + 1 + irandom(4);
            }
        }
        if (this.ghostintrotimer == 14) {
            snd_play('snd_ghostappear');
            this.ghostmarker.x = this.x + 30;
            this.ghostmarker.y = this.y + 30;
            this.ghostmarker.image_xscale = 0;
            this.ghostmarker.image_yscale = 0;
            this.ghostmarker.image_alpha = 0.5;
            instance_create_depth(this.ghostmarker.x, this.ghostmarker.y, this.depth - 1, 'obj_ghostburst');
            if (W(this.ghostmarker, function (other) {
                scr_lerpvar(this, "image_xscale", 0, 2, 8, 1, "out");
                scr_lerpvar(this, "image_yscale", 0, 2, 8, 1, "out");
                S.scr_move_to_point_over_time(this, this.x - 55, this.y - 55, 8);
            }, this) === EXIT) return;
        }
        if (this.ghostintrotimer == 60) {
            this.idlesprite = 'spr_pink_idle';
            this.ghostintrotimer = 0;
            this.ghostintrocon = 2;
            this.ghostmarker.image_alpha = 0.5;
        }
    }
    if (this.ghostintrocon == 2) {
        this.saturation_effect_enabled = true;
        this.pos = lerp(this.pos, - 0.55, 0.05);
        this.ghosttimer = this.ghosttimer + 1;
        this.ghostmarker.hspeed = Math.sin(this.ghosttimer / 12) * 3;
        this.ghostmarker.vspeed = Math.cos(this.ghosttimer / 12) * 3;
    }
    if (this.ghostintrocon == 4) {
        this.ghostintrotimer = this.ghostintrotimer + 1;
        if (this.ghostintrotimer == 6) {
            this.ghostintrotimer = 0;
            this.ghostintrocon = 2;
        }
    }
    if (this.explosioncon == 1) {
        this.explosiontimer = this.explosiontimer + 1;
        if (this.explosiontimer % 6 == 0) {
            this.inst = instance_create(this.x + random(this.sprite_width), this.y + random(this.sprite_height), 'obj_animation');
            this.inst.sprite_index = 'spr_realisticexplosion';
            snd_stop('snd_explosion');
            snd_play_x('snd_explosion', 1, 1);
            scr_shakeobj(this);
        }
        if (this.explosiontimer >= 60 || this.explode_after_date == 1) {
            this.explode_after_date = false;
            this.after_date_battlemsg = true;
            this.idlesprite = 'spr_pink_idle';
            if (this.datecount == 3) {
                this.idlesprite = 'spr_pink_very_hurt';
            }
            this.explosiontimer = 0;
            this.explosioncon = 0;
            this.phaseturns = 0;
            S.scr_mercyadd(this.myself, 25);
            if (this.datecount != 3) {
                if (W('obj_date_ui', function (other) {
                    this.con = 3;
                    this.timer = 0;
                }, this) === EXIT) return;
            }
            if (this.datecount == 2) {
                this.ghostintrocon = 1;
            }
            if (this.datecount == 3) {
                mus_volume(global.batmusic[0], 0, 15);
                mus_volume(global.batmusic[1], 0, 15);
                global.actsimul ??= []; global.actsimul[this.myself] ??= []; global.actsimul[this.myself][1] = 0;
                global.actsimulsus ??= []; global.actsimulsus[this.myself] ??= []; global.actsimulsus[this.myself][0] = 0;
                global.actsimulral ??= []; global.actsimulral[this.myself] ??= []; global.actsimulral[this.myself][0] = 0;
                global.actsimul ??= []; global.actsimul[this.myself] ??= []; global.actsimul[this.myself][2] = 0;
                global.actsimulsus ??= []; global.actsimulsus[this.myself] ??= []; global.actsimulsus[this.myself][1] = 0;
                global.actsimulral ??= []; global.actsimulral[this.myself] ??= []; global.actsimulral[this.myself][1] = 0;
            }
        }
    }
    if (this.datecount == 3 && this.explosioncon == 0) {
        this.explosiontimer = this.explosiontimer + 1;
        if (this.explosiontimer % 40 == 0 && T(this.playheartbeatsfx)) {
            snd_play('snd_heartbeat', 0.8, 1);
        }
        if (this.explosiontimer % 90 == 0 && this.phaseturns < 3) {
            this.doki = irandom(19);
            if (W('obj_date_ui', function (other) {
                this.electricity_con = 1;
            }, this) === EXIT) return;
        }
    }
    if (this.resetralsei == 1) {
        this.plushiehearttimer = this.plushiehearttimer + 1;
        if (this.plushiehearttimer >= 7) {
            this.plushiehearttimer = 0;
            this.ralseiheart = instance_create(O('obj_heroralsei').x + 20 + random(50), O('obj_heroralsei').y + 25 + random(40), 'obj_marker');
            this.ralseiheart.sprite_index = 'spr_dokiheart';
            this.ralseiheart.vspeed = - 3;
            this.ralseiheart.friction = 0.08;
            this.ralseiheart.image_blend = 0xff88aa;
            if (W(this.ralseiheart, function (other) {
                scr_lerpvar(this, "image_alpha", 2, 0, 20, "in");
            }, this) === EXIT) return;
        }
    }
    if (this.krishearts == 1) {
        this.krisheartstimer = this.krisheartstimer + 1;
        if (this.krisheartstimer >= 10) {
            this.krisheartstimer = 0;
            this.krisheart = instance_create(O('obj_herokris').x + random(40), O('obj_herokris').y + 25 + random(50), 'obj_marker');
            this.krisheart.sprite_index = 'spr_dokiheart';
            this.krisheart.vspeed = - 3;
            this.krisheart.friction = 0.08;
            this.krisheart.image_blend = 0xff88aa;
            this.krisheart.image_xscale = 0.5;
            this.krisheart.image_yscale = 0.5;
            if (W(this.krisheart, function (other) {
                scr_lerpvar(this, "image_alpha", 2, 0, 20, "in");
            }, this) === EXIT) return;
        }
    }
    if (this.susiehearts == 1) {
        this.susieheartstimer = this.susieheartstimer + 1;
        if (this.susieheartstimer >= 10) {
            this.susieheartstimer = 0;
            this.susieheart = instance_create(O('obj_herosusie').x + random(40), O('obj_herosusie').y + 25 + random(50), 'obj_marker');
            this.susieheart.sprite_index = 'spr_dokiheart';
            this.susieheart.vspeed = - 3;
            this.susieheart.friction = 0.08;
            this.susieheart.image_blend = 0xff88aa;
            this.susieheart.image_xscale = 0.5;
            this.susieheart.image_yscale = 0.5;
            if (W(this.susieheart, function (other) {
                scr_lerpvar(this, "image_alpha", 2, 0, 20, "in");
            }, this) === EXIT) return;
        }
    }
    if (this.ralseihearts == 1) {
        this.ralseiheartstimer = this.ralseiheartstimer + 1;
        if (this.ralseiheartstimer >= 10) {
            this.ralseiheartstimer = 0;
            this.ralseiheart = instance_create(O('obj_heroralsei').x + random(40), O('obj_heroralsei').y + 25 + random(50), 'obj_marker');
            this.ralseiheart.sprite_index = 'spr_dokiheart';
            this.ralseiheart.vspeed = - 3;
            this.ralseiheart.friction = 0.08;
            this.ralseiheart.image_blend = 0xff88aa;
            this.ralseiheart.image_xscale = 0.5;
            this.ralseiheart.image_yscale = 0.5;
            if (W(this.ralseiheart, function (other) {
                scr_lerpvar(this, "image_alpha", 2, 0, 20, "in");
            }, this) === EXIT) return;
        }
    }
    if (W('obj_marker', function (other) {
        if (this.sprite_index == 'spr_board_loveheart' && this.image_alpha <= 0) {
            instance_destroy(this);
        }
    }, this) === EXIT) return;
    if (this.talked == 0.4 && this.ballooncon == 1 && !T(i_ex('obj_writer'))) {
        this.introtimer = this.introtimer + 1;
        if (this.introtimer == - 16) {
            if (!T(instance_exists('obj_growtangle'))) {
                instance_create(S.__view_get(0, 0) + 320, S.__view_get(1, 0) + 170, 'obj_growtangle');
            }
            if (!T(instance_exists('obj_moveheart'))) {
                S.scr_moveheart();
            }
        }
        if (this.introtimer == - 4) {
            snd_play_x('snd_jump', 1, 1.3);
        }
        if (this.introtimer == 1) {
            this.idlesprite = 'spr_pink_ball';
        }
        if (this.introtimer >= 1 && this.introtimer < 15) {
            ytarget = lerp(- 360, 40, this.introtimer / 15);
            this.x = lerp(this.xstart + 40, camerax() + 280, this.introtimer / 15);
            this.y = lerp(this.ystart + 40, cameray() + ytarget, this.introtimer / 15);
        }
        if (this.introtimer == 15) {
            snd_stop('snd_pink_laugh_long');
            snd_play_x('snd_pink_laugh_long', 1, 1);
            this.idlesprite = 'spr_pink_laugh_pouring';
            this.image_yscale = 2;
            this.x = camerax() + 268;
            this.y = cameray() + 10;
            scr_lerpvar(this, "y", cameray() + 10, cameray() + 40, 7, 1, "out");
            if (W('obj_growtangle', function (other) {
                scr_lerpvar(this, "y", this.ystart, this.ystart + 30, 7, 1, "out");
            }, this) === EXIT) return;
            if (W('obj_heart', function (other) {
                scr_lerpvar(this, "y", this.y, this.y + 30, 7, 1, "out");
            }, this) === EXIT) return;
        }
        if (this.introtimer == 30) {
            S.msgset(0, this.pink_battle_dialogue5);
            global.typer = 50;
            S.scr_enemyblcon(this, this.x + 80 + 30, global.monstery[this.myself] - 119 + 30, 14);
            this.introtimer = 0;
            this.talked = 0.41;
        }
    }
    if (this.talked == 0.41 && this.ballooncon == 1 && !T(i_ex('obj_writer'))) {
        this.introtimer = this.introtimer + 1;
        if (this.introtimer == 1) {
            snd_play_x('snd_slidewhistle', 1, 1.5);
        }
        if (this.introtimer == 9) {
            scr_lerpvar(this, "x", this.x, this.x + 50, 11, 2, "out");
        }
        if (this.introtimer % 4 == 0 && this.introtimer > 16 && this.introtimer < 70) {
            this.droplet = instance_create(this.x + 2, this.y + 50, 'obj_purple_tea');
        }
        if (this.introtimer == 35) {
            this.intropurple_y = - 25;
        }
        if (this.introtimer == 45) {
            this.intropurple_y = - 50;
        }
        if (this.introtimer == 55) {
            this.intropurple_y = - 75;
        }
        if (this.introtimer == 65) {
            this.intropurple_y = - 100;
        }
        if (this.introtimer == 75) {
            this.intropurple_y = - 125;
        }
        if (this.introtimer == 85) {
            this.intropurple_y = - 141;
        }
        if (this.introtimer >= 80 && this.introtimer <= 100 && this.introalpha < 1) {
            this.introalpha = this.introalpha + 0.04;
        }
        if (this.introtimer >= 100) {
            this.introalpha = this.introalpha - 0.04;
        }
        if (this.introtimer == 100) {
            global.monsterattackname ??= []; global.monsterattackname[this.myself] = "purple intro";
            this.dc = S.scr_bulletspawner(this, this.x, this.y, 'obj_dbulletcontroller');
            this.dc.type = 199;
        }
        if (this.introtimer == 120) {
            this.idlesprite = 'spr_pink_shocked';
            scr_shakeobj(this);
            snd_play('snd_pink_gasp');
            this.x = this.x + 0;
            this.y = cameray() + 42;
            scr_shakeobj(this);
            snd_play('snd_wing');
            snd_play('snd_pink_throw2');
        }
        if (this.introtimer == 120) {
            this.ballooncon = 2;
            this.balloonend = 0;
            this.talked = 0.6;
            this.introtimer = 0;
        }
    }
    if (this.introcon == 2 && !T(i_ex('obj_writer'))) {
        this.introtimer = this.introtimer + 1;
        if (this.introtimer == 1) {
            snd_play_x('snd_jump', 1, 1.3);
        }
        if (this.introtimer == 1) {
            this.idlesprite = 'spr_pink_ball';
        }
        ytarget = lerp(- 360, 0, this.introtimer / 15);
        this.x = lerp(camerax() + 320, this.xstart + 40, this.introtimer / 15);
        this.y = lerp(cameray() + 50 + 30, this.ystart + 40 + ytarget, this.introtimer / 15);
        if (this.introtimer == 15) {
            snd_play('snd_impact');
            scr_shakescreen(this);
            this.idlesprite = 'spr_pink_idle';
            this.introtimer = 0;
            this.introcon = 3;
            this.talked = 0;
            this.x = this.xstart;
            this.y = this.ystart;
            this.depth = this.depthstart;
            global.charturn = 0;
            if (W('obj_growtangle', function (other) {
                this.growcon = 3;
            }, this) === EXIT) return;
            if (W('obj_heart', function (other) {
                instance_create(this.x, this.y, 'obj_returnheart');
                instance_destroy(this);
            }, this) === EXIT) return;
        }
    }
    if (this.doki > this.dokimax) {
        this.doki = this.dokimax;
    }
    if (this.spotlightinit == 0) {
        this.spotlightinit = true;
        if (i_ex('obj_herokris')) {
            this.pink_spotlight_kris = instance_create_depth(O('obj_herokris').x + 22, O('obj_herokris').y + 106, O('obj_herokris').depth + 1, 'obj_pink_spotlight');
            this.pink_spotlight_kris.sprite_index = 'spr_pink_spotlight_kris';
            this.pink_spotlight_kris.image_xscale = 2;
            this.pink_spotlight_kris.image_yscale = 2;
            this.pink_spotlight_kris.image_alpha = 0;
        }
        if (i_ex('obj_herosusie')) {
            this.pink_spotlight_susie = instance_create_depth(O('obj_herosusie').x + 52, O('obj_herosusie').y + 126, O('obj_herosusie').depth + 1, 'obj_pink_spotlight');
            this.pink_spotlight_susie.sprite_index = 'spr_pink_spotlight_susie';
            this.pink_spotlight_susie.image_xscale = 2;
            this.pink_spotlight_susie.image_yscale = 2;
            this.pink_spotlight_susie.image_alpha = 0;
        }
        if (i_ex('obj_heroralsei')) {
            this.pink_spotlight_ralsei = instance_create_depth(O('obj_heroralsei').x + 53, O('obj_heroralsei').y + 92, O('obj_heroralsei').depth + 1, 'obj_pink_spotlight');
            this.pink_spotlight_ralsei.sprite_index = 'spr_pink_spotlight_ralsei';
            this.pink_spotlight_ralsei.image_xscale = 2;
            this.pink_spotlight_ralsei.image_yscale = 2;
            this.pink_spotlight_ralsei.image_alpha = 0;
        }
        this.pink_spotlight_pink = instance_create_depth(this.x + 28, this.y + 82, this.depth + 1, 'obj_pink_spotlight');
        this.pink_spotlight_pink.sprite_index = 'spr_pink_spotlight_pink';
        this.pink_spotlight_pink.image_xscale = 2;
        this.pink_spotlight_pink.image_yscale = 2;
        this.pink_spotlight_pink.image_alpha = 0;
        instance_create_depth(camerax() + camerawidth() / 2, cameray() - 120, this.depth - 1, 'obj_mewers_live');
        __a = 0;
        for (let _r14893 = 0, _n14893 = (16); _r14893 < _n14893; _r14893++) {
            this.dummyinst = instance_create_depth(camerax() + __a * 51, cameray() - 62, this.depth + 1000, 'obj_pink_dummy');
            this.dummyinst.sprite_index = 'spr_pink_bg_dummy';
            this.dummyinst.image_xscale = 2;
            this.dummyinst.image_yscale = 2;
            this.dummyinst.type = "bg";
            this.dummyinst.wavetimer = __a * 4;
            this.dummyinst.wavecon = __a;
            __a = __a + 1;
        }
        __a = 0;
        for (let _r14974 = 0, _n14974 = (8); _r14974 < _n14974; _r14974++) {
            this.dummyinst = instance_create_depth(camerax() + __a * 121, cameray() + 480 + 140, O('obj_battlecontroller').depth + 1, 'obj_pink_dummy');
            this.dummyinst.sprite_index = 'spr_pink_fg_dummy';
            this.dummyinst.image_xscale = 2;
            this.dummyinst.image_yscale = 2;
            this.dummyinst.type = "fg";
            this.dummyinst.wavetimer = __a * 8;
            this.dummyinst.wavecon = __a;
            __a = __a + 1;
        }
    }
    spread_range = 500;
    _cx = camerax() + 100;
    _cy = cameray() - 100;
    _mcx = camerax() + camerawidth();
    _random = random(spread_range);
    this.freezable = this.freezable + 1;
    if (this.freezable == 5 && this.datecount < 3) {
        this.dropPetal(_cx + 640 - spread_range * 0.65 + _random, _cy - spread_range * 0.5 + _random, true, - 12, 1);
        this.freezable = 0;
    }
    if (global.mnfight == 0) {
        if (this.pink_bg_con != 1) {
            this.mewerslive_y_con = 2;
        }
        this.pink_bg_con = 1;
    }
    if (global.mnfight != 0 && global.turntimer > 0 || i_ex('obj_date_ui') && O('obj_date_ui').con > 0) {
        this.pink_bg_con = 3;
    }
    _hide = false;
    if (this.introcon == 2 || this.introcon == 1 && this.idlesprite == 'spr_pink_laugh' || this.ballooncon == 2 || this.ballooncon == 3 || this.ballooncon == 4 || this.talked == 0.41 || this.talked == 0.4 && this.ballooncon == 1 && !T(i_ex('obj_writer')) && this.introtimer > 2 || T(S.scr_isphase("enemytalk"))) {
        _hide = true;
    }
    if (this.pink_bg_con == 1 && !T(_hide)) {
        if (this.datecount != 3) {
            if (W('obj_marker_doomed', function (other) {
                this.image_alpha = lerp(this.image_alpha, 1, 0.3);
            }, this) === EXIT) return;
        }
        if (W(this.pink_spotlight_kris, function (other) {
            this.image_alpha = lerp(this.image_alpha, 1, 0.3);
        }, this) === EXIT) return;
        if (W(this.pink_spotlight_susie, function (other) {
            this.image_alpha = lerp(this.image_alpha, 1, 0.3);
        }, this) === EXIT) return;
        if (W(this.pink_spotlight_ralsei, function (other) {
            this.image_alpha = lerp(this.image_alpha, 1, 0.3);
        }, this) === EXIT) return;
        if (W(this.pink_spotlight_pink, function (other) {
            this.image_alpha = lerp(this.image_alpha, 1, 0.3);
        }, this) === EXIT) return;
        if (W('obj_pink_dummy', function (other) {
            if (this.vspeed == 0) {
                if (this.type == "bg") {
                    this.yoffset = lerp(this.yoffset, 124, 0.1);
                }
                if (this.type == "fg") {
                    this.yoffset = lerp(this.yoffset, - 300, 0.1);
                }
            }
        }, this) === EXIT) return;
        if (this.introcon == 3 && this.datecount < 3) {
            if (W('obj_mewers_live', function (other) {
                this.y = lerp(this.y, this.ystart + other.mewerslive_y_target, 0.1);
            }, this) === EXIT) return;
        }
    }
    if (this.mewerslive_y_con == 1) {
        this.mewerslive_y_timer = this.mewerslive_y_timer + 1;
        this.mewerslive_y_target = lerp(400, 120, this.mewerslive_y_timer / 8);
        if (this.mewerslive_y_timer == 8) {
            this.mewerslive_y_timer = 0;
            this.mewerslive_y_con = 0;
        }
    }
    if (this.mewerslive_y_con == 2) {
        this.mewerslive_y_timer = this.mewerslive_y_timer + 1;
        this.mewerslive_y_target = lerp(460, 120, this.mewerslive_y_timer / 8);
        if (this.mewerslive_y_timer == 8) {
            this.mewerslive_y_timer = 0;
            this.mewerslive_y_con = 0;
        }
    }
    if (this.pink_bg_con == 3 || this.datecount == 3 || T(_hide)) {
        this.pink_bg_timer = this.pink_bg_timer + 1;
        if (W('obj_marker_doomed', function (other) {
            this.image_alpha = lerp(this.image_alpha, 0, 0.3);
        }, this) === EXIT) return;
        if (W('obj_pink_spotlight', function (other) {
            this.image_alpha = lerp(this.image_alpha, 0, 0.3);
        }, this) === EXIT) return;
        if (W('obj_pink_dummy', function (other) {
            if (this.type == "bg") {
                this.yoffset = lerp(this.yoffset, 0, 0.1);
            }
            if (this.type == "fg") {
                this.yoffset = lerp(this.yoffset, 0, 0.1);
            }
        }, this) === EXIT) return;
        if (W('obj_mewers_live', function (other) {
            this.y = lerp(this.y, this.ystart - 90, 0.1);
        }, this) === EXIT) return;
    }
    if (this.pink_bg_con == 0) {
        if (W('obj_marker_doomed', function (other) {
            this.image_alpha = lerp(this.image_alpha, 0, 0.3);
        }, this) === EXIT) return;
    }
    this.dummy_pattern_timer = this.dummy_pattern_timer + 1;
    if (this.dummy_pattern_timer >= 120) {
        this.dummy_pattern_timer = 0;
        if (W('obj_pink_dummy', function (other) {
            this.wavetimer = 0;
        }, this) === EXIT) return;
        this.dummy_pattern = choose("wave", "wave", "wave", "every other jump", "glowstick up and down");
        if (this.dummy_pattern == "glowstick up and down") {
            if (W('obj_pink_dummy', function (other) {
                this.wavetimer = - 10;
            }, this) === EXIT) return;
        }
        if (this.dummy_pattern == "wave") {
            if (W('obj_pink_dummy', function (other) {
                this.wavetimer = - 10;
            }, this) === EXIT) return;
        }
        if (this.dummy_pattern == "wave") {
            if (W('obj_pink_dummy', function (other) {
                this.wavetimer = this.wavecon * 4;
            }, this) === EXIT) return;
        }
        if (this.dummy_pattern == "glowstick wave") {
            if (W('obj_pink_dummy', function (other) {
                this.wavetimer = this.wavecon * 3;
            }, this) === EXIT) return;
        }
    }
  }
  // drop_petal(x, y, ...): a spin petal falling behind the battle box (obj_marker_doomed, gone after
  // 120 frames), with its constructor struct's values.
  dropPetal(x, y) {
    if (!i_ex('obj_battlecontroller')) return;
    const p = instance_create_depth(x, y, O('obj_battlecontroller').depth + 1, 'obj_marker_doomed');
    Object.assign(p, { image_xscale: 2, image_yscale: 2, sprite_index: 'spr_spin_petal', image_speed: random(0.2) + 0.1,
      gravity_direction: 175 + random(10), vspeed: 5, hspeed: -2, gravity: 0.06, image_blend: merge_color(0xffffff, 0, random(0.25)) });
    p.alarm[0] = 120;
  }
}
defineObject('obj_pink_enemy', PinkEnemy);

