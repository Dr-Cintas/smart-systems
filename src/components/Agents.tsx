import React from 'react';
import {interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {color, font, springs} from '../theme';

/**
 * Premium stand-in for the reference's pixel-art creatures: a soft rounded
 * tile with a gentle top highlight. Reads as "one unit / one agent" without
 * looking like a cartoon.
 */
export const AgentToken: React.FC<{
  c: string;
  size?: number;
  dead?: number; // 0..1, fades to a neutral grey and shrinks
  label?: string;
  style?: React.CSSProperties;
}> = ({c, size = 56, dead = 0, label, style}) => {
  const grey = '#C9C7C2';
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: `linear-gradient(160deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 45%), ${dead > 0.5 ? grey : c}`,
        boxShadow: dead > 0.5 ? 'none' : `0 ${size * 0.12}px ${size * 0.3}px -${size * 0.12}px ${c}AA, inset 0 -2px 0 rgba(0,0,0,0.12)`,
        transform: `scale(${1 - dead * 0.35})`,
        opacity: 1 - dead * 0.55,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: font.mono,
        fontWeight: 700,
        fontSize: size * 0.3,
        color: 'rgba(255,255,255,0.92)',
        ...style,
      }}
    >
      {label}
    </div>
  );
};

/** Grid of N agent tokens, staggered in from the center outward. */
export const AgentGrid: React.FC<{
  count: number;
  cols: number;
  at: number;
  size?: number;
  gap?: number;
  stagger?: number; // frames across the whole grid
  survivors?: {at: number; keep: number}[]; // elimination rounds
}> = ({count, cols, at, size = 56, gap = 18, stagger = 18, survivors = []}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rows = Math.ceil(count / cols);
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;
  const maxD = Math.hypot(cx, cy) || 1;

  // Deterministic elimination order.
  const order = Array.from({length: count}, (_, i) => i).sort((a, b) => random(`o${a}`) - random(`o${b}`));
  const rank = new Map(order.map((idx, r) => [idx, r]));

  return (
    <div style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, ${size}px)`, gap}}>
      {Array.from({length: count}, (_, i) => {
        const x = i % cols;
        const y = Math.floor(i / cols);
        const d = Math.hypot(x - cx, y - cy) / maxD;
        const p = spring({frame: frame - at - d * stagger, fps, config: springs.smooth});
        const r = rank.get(i)!;
        let dead = 0;
        for (const s of survivors) {
          if (r >= s.keep) {
            dead = Math.max(dead, interpolate(frame, [s.at + (r % 10), s.at + (r % 10) + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
          }
        }
        return (
          <div key={i} style={{opacity: p, transform: `scale(${0.6 + 0.4 * p})`}}>
            <AgentToken c={color.agents[i % color.agents.length]} size={size} dead={dead} />
          </div>
        );
      })}
    </div>
  );
};
