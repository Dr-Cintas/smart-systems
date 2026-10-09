import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {color, font, radius} from '../theme';

export type CaptionChunk = {text: string; start: number; end?: number};

/**
 * Burned-in captions: 1–3 words at a time, UPPERCASE mono, white on a dark
 * rounded pill. Hard cut between chunks with a 3-frame settle — no bouncing
 * word-by-word karaoke, no emoji, no colored highlight words.
 */
export const Captions: React.FC<{chunks: CaptionChunk[]; y: number}> = ({chunks, y}) => {
  const frame = useCurrentFrame();
  const idx = chunks.findIndex((c, i) => {
    const end = c.end ?? chunks[i + 1]?.start ?? Infinity;
    return frame >= c.start && frame < end;
  });
  if (idx === -1) return null;
  const c = chunks[idx];
  const t = frame - c.start;
  const scale = interpolate(t, [0, 3], [0.94, 1], {extrapolateRight: 'clamp'});
  const opacity = interpolate(t, [0, 2], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: y,
        display: 'flex',
        justifyContent: 'center',
        transform: 'translateY(-50%)',
        zIndex: 50,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          background: color.pill,
          color: color.pillText,
          fontFamily: font.mono,
          fontWeight: 700,
          fontSize: 58,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '14px 30px 16px',
          borderRadius: radius.pill,
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.45)',
          whiteSpace: 'nowrap',
        }}
      >
        {c.text}
      </div>
    </div>
  );
};

/** Helper: build chunks from "text@frame" pairs, e.g. cues(['IF YOUR AI@0','KEEPS@12']). */
export const cues = (list: string[]): CaptionChunk[] =>
  list.map((s) => {
    const at = s.lastIndexOf('@');
    return {text: s.slice(0, at), start: Number(s.slice(at + 1))};
  });
