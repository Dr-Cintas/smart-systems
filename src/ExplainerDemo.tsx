import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {z} from 'zod';
import {layout} from './theme';
import {Captions, cues} from './components/Caption';
import {
  CritiqueScene,
  CtaScene,
  HookScene,
  MultiplyScene,
  ProductScene,
  StrategyScene,
  TerminalScene,
  TournamentScene,
} from './scenes/scenes';

export const explainerSchema = z.object({
  speakerSrc: z.string().optional(), // file in /public, e.g. "speaker.mp4"
  handle: z.string(),
  keyword: z.string(),
});

// Scene lengths in frames @30fps. Cuts land every 2–4s; captions change every ~0.5s.
const S = {hook: 66, multiply: 72, product: 84, critique: 108, terminal: 114, strategy: 108, tournament: 120, cta: 96};
export const EXPLAINER_DURATION = Object.values(S).reduce((a, b) => a + b, 0);

// Absolute frames. In production these come from the voice-over transcript.
const CAPTIONS = cues([
  'IF YOUR AI@0', 'KEEPS GIVING@14', 'YOU BAD@28', 'ANSWERS@40',
  'MAKE 100@66', 'VERSIONS@84', 'OF IT@104',
  "IT'S CALLED@138", 'THE ARENA@154', 'SKILL@170', 'COMPLETELY@188', 'FREE@204',
  "WHEN YOU'RE@222", 'NOT SATISFIED@238', 'WITH THE@256', 'OUTPUT@270', "IT'S GENERIC@296",
  'ONE COMMAND@330', 'SPINS UP@352', '100 AGENTS@370', 'EACH WITH@400', 'A STRATEGY@420',
  'DIFFERENT@444', 'REASONING@462', 'DIFFERENT@500', 'WORKFLOWS@516',
  'THEN THEY@552', 'COMPETE@566', 'UNTIL ONLY@604', 'THE BEST@626', 'SURVIVES@646',
  'FOLLOW@672', 'AND COMMENT@694', 'ARENA@716',
]);

export const ExplainerDemo: React.FC<z.infer<typeof explainerSchema>> = ({speakerSrc, handle, keyword}) => {
  // Speaker footage is one continuous take; each split scene seeks to its own offset.
  const off = (name: keyof typeof S) => {
    let f = 0;
    for (const k of Object.keys(S) as (keyof typeof S)[]) {
      if (k === name) return f;
      f += S[k];
    }
    return f;
  };
  const sp = (name: keyof typeof S) => ({speakerSrc, speakerStartFrom: off(name)});

  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={S.hook}><HookScene {...sp('hook')} /></Series.Sequence>
        <Series.Sequence durationInFrames={S.multiply}><MultiplyScene /></Series.Sequence>
        <Series.Sequence durationInFrames={S.product}><ProductScene {...sp('product')} /></Series.Sequence>
        <Series.Sequence durationInFrames={S.critique}><CritiqueScene {...sp('critique')} /></Series.Sequence>
        <Series.Sequence durationInFrames={S.terminal}><TerminalScene /></Series.Sequence>
        <Series.Sequence durationInFrames={S.strategy}><StrategyScene {...sp('strategy')} /></Series.Sequence>
        <Series.Sequence durationInFrames={S.tournament}><TournamentScene /></Series.Sequence>
        <Series.Sequence durationInFrames={S.cta}><CtaScene {...sp('cta')} handle={handle} keyword={keyword} /></Series.Sequence>
      </Series>
      <Captions chunks={CAPTIONS} y={layout.splitY} />
    </AbsoluteFill>
  );
};
