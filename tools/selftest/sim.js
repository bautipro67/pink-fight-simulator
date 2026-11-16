// What the self test plays in the Pink simulator (see tools/selftest/runner.js for the helpers).
// Each scenario: name, settings (G.settings while it runs), start(ctx), until(ctx) (its end; none
// for the sandbox runs, which only have to run without errors), frames (the most it may take),
// and optionally status(ctx) (shown when it does not end), input(ctx, frame) (returns true when it
// played the frame itself), menu(ctx) (the battle menu option to take instead of FIGHT) and sounds
// (fails if nothing was heard). shared() adds the scenarios every simulator has.
export const title = 'Pink Fight Simulator';

export function scenarios({ S, sandbox, has, first, shared }) {
  const ending = () => has(/^obj_sim_ending$/);
  const pink = () => first('obj_pink_enemy');
  const date = () => first('obj_date_controller');
  // Where the fight got to: each date's first and last frame (marks), and where it stands now.
  let marks = [];
  const where = ({ global: g }) => {
    const p = pink(), d = date();
    if (!p) return 'no Pink';
    return `${marks.join(' ')}; datecount ${p.datecount}, phase turn ${p.phaseturns}, DOKI ${p.doki}/${p.dokimax}, ` +
      `introcon ${p.introcon}, mnfight ${g.mnfight}` + (d ? `, date con ${d.con}, box timer ${d.draw_box_timer}` : '');
  };
  // Pink is won over, not beaten: a player fills her DOKI meter (flirting, catching DOKI hearts)
  // and answers her dates. The test fills the meter at the menu from the fourth turn of each phase
  // (so three attacks of every phase run first), answers each date (the right box; with loseFirst a
  // wrong one all through the first date, which is then lost and comes back), and wins the third
  // date's maze (obj_purplecontrols difficulty 4, the date's own check) once it has run for a
  // while. Phase 4 ends by itself.
  let lost = false;
  const play = ({ loseFirst = false } = {}) => {
    let mazeFrames = 0, inDate = false, dates = 0, lastCount = 0;
    return (ctx, frame) => {
      const { global: g, tick, press, KEY } = ctx;
      if (frame === 0) { mazeFrames = 0; inDate = false; dates = 0; lastCount = 0; marks = []; lost = false; }
      const p = pink(), d = date();
      if (!!d !== inDate) {
        inDate = !!d;
        if (inDate) dates += 1;
        marks.push(`date ${p?.datecount} ${inDate ? 'from' : 'to'} ${frame}`);
      }
      if (p && p.datecount < lastCount) { lost = true; marks.push(`date lost at ${frame}`); }
      if (p) lastCount = p.datecount;
      // The runner refills HP every frame but a hero knocked DOWN in between stays out (cannot be
      // targeted); with everyone out, a hit goes to the whole party at once and ends the fight. On
      // MEAN that happens: each hit makes the bullet that landed it 21% stronger (scr_damage), and the
      // 3D tunnel's bullets keep hitting. So the downed get up again, as a heal would do.
      for (let i = 0; i < 3; i++) if (g.char?.[i] && g.hp[g.char[i]] > 0 && g.charcantarget?.[i] == 0) S.scr_revive(i);
      if (d) {
        const pickWrong = loseFirst && dates === 1;
        const want = (d.choiceiscorrect || []).findIndex((c, k) => (c == 1) !== pickWrong && k < d.boxcount);
        // The last date: the boxes slide by themselves (LEFT / RIGHT do nothing) and UP takes the one
        // in front: the current one in the first half of a slide, the next one in the second half.
        if (d.con == 2 && p?.datecount == 4 && (d.draw_box_con == 0 || d.draw_box_con == -1)) {
          const t = d.draw_box_timer, sel = d.draw_box_selected;
          const front = d.draw_box_con == 0 || t <= 12 ? sel : t >= 17 && t <= 27 ? (sel + 1) % d.boxcount : -2;
          if (front === want || (want < 0 && front >= 0)) press(KEY.up, 1);
          else tick(1);
          return true;
        }
        if (d.con == 2 && d.draw_box_con == 0) {
          if (frame % 4) { tick(1); return true; }
          press(want >= 0 && d.draw_box_selected != want ? KEY.right : KEY.up, 1);
          return true;
        }
        const pc = first('obj_purplecontrols');
        if (pc && pc.mode == 8 && ++mazeFrames > 240 && pc.difficulty < 4) pc.difficulty = 4;
        tick(1, frame % 8 === 0 ? [KEY.z] : []);
        return true;
      }
      if (p && p.introcon >= 3 && p.datecount < 3 && p.phaseturns >= 3 && g.myfight === 0 && g.mnfight === 0 &&
        p.doki < p.dokimax) p.doki = p.dokimax;
      return false;
    };
  };
  // What the fight leaves for the scene after it when that scene is played on its own.
  const afterFight = { party: [[126, 76], [96, 103], [120, 150]], pink: [320, 108], pinkSprite: 'spr_pink_angle',
    orange: [-200, 166], orangeSprite: 'spr_orange_surprised', orangeVisible: false };
  const list = [
    { name: "story: Pink's encounter (Orange, PINK!, the 7 flowers), the whole fight, the scene after it and the end",
      settings: { scenes: true, intro: true }, start: () => S.startPinkScene(),
      input: play(), until: ending, status: where, end: 'the result screen', frames: 40000, sounds: true },
    { name: 'a retry with SCENES on: Pink drops in yelling, then the fight', settings: { scenes: true },
      start: () => S.startPinkScene({ retry: true }), until: () => has(/^obj_battlecontroller$/), end: 'the battle', frames: 3000 },
    // The scene after the win ends differently for each of her bombs' settings.
    ...[[0, 'INTENDED'], [1, 'NICE'], [2, 'MEAN']].map(([bombs, label]) => ({
      name: `the scene after the win, Pink's bombs ${label}`, settings: { scenes: true, bombs },
      start: ({ G }) => { G.pinkScene = { ...afterFight }; return S.startPinkAfterScene(); },
      until: ending, end: 'the result screen', frames: 6000,
    })),
    { name: "the whole fight: Pink's intro, every phase and date (the maze too), her BODY and ghost, the final date and the win",
      settings: { intro: true }, start: ({ setup }) => setup.startBattle({ intro: true }),
      input: play(), until: ending, status: where, end: 'the result screen', frames: 30000, sounds: true },
    // Pink's own difficulty (OPTIONS, PINK'S BOMBS): NICE and MEAN change her bombs and attacks.
    ...[[1, 'NICE'], [2, 'MEAN']].map(([bombs, label]) => ({
      name: `the whole fight with Pink's bombs ${label}`, settings: { intro: false, bombs },
      start: ({ setup }) => setup.startBattle({ intro: false }), input: play(), until: ending, status: where,
      end: 'the result screen', frames: 30000,
    })),
    { name: 'the first date lost (every answer wrong), then won on the second try', settings: { intro: false },
      start: ({ setup }) => setup.startBattle({ intro: false }), input: play({ loseFirst: true }),
      until: ({ global: g }) => lost && pink()?.datecount >= 1 && !date() && g.myfight === 0 && g.mnfight === 0,
      status: where, end: 'the menu after the second try', frames: 40000 },
    { name: "CONTINUE after a game over: the fight again, without Pink's intro", run: async ctx => {
      const { battle, tick, autoplay, global: g, KEY } = ctx;
      const sleep = () => new Promise(r => setTimeout(r, 0));
      battle();
      for (let i = 0; i < 3000 && !(pink()?.introcon >= 3); i++) autoplay(i);
      const old = pink();
      if (!old || old.introcon < 3) return "Pink's intro never ended";
      for (const c of g.char) if (c) g.hp[c] = 0;
      S.scr_gameover();
      // Z only once DEVICE_FAILURE talks (four presses while the SOUL breaks retry at once).
      for (let i = 0; i < 3000; i++) {
        const p = pink();
        if (p && p !== old) return p.introcon >= 3 ? null : `Pink's intro played again (introcon ${p.introcon})`;
        tick(1, has(/^DEVICE_FAILURE$/) && i % 9 === 0 ? [KEY.z] : []);
        if (i % 20 === 19) await sleep();
      }
      return 'the fight never started again';
    } },
    { name: 'practice mode, every attack in order', start: () => sandbox.startPractice({ start: 0, hp: 90 }),
      until: ctx => ctx.practiceDone(), status: ctx => ctx.practiceStatus(), end: 'the practice results', frames: 40000 },
    ...shared(),
  ];
  sandbox.ATTACKS.forEach((a, i) => list.push({
    name: `sandbox ${i}: ${a[2]}`, sandbox: true, frames: 1500,
    start: () => sandbox.startSandbox(new URLSearchParams('attack=' + i)),
  }));
  return list;
}
