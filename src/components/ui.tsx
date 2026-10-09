import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {color, font, radius, shadow, springs} from '../theme';
import {Cursor, typed, useProgress, useSpring} from './motion';

/* ---------- Surfaces ---------- */

export const Card: React.FC<{children: React.ReactNode; style?: React.CSSProperties; pad?: number}> = ({
  children,
  style,
  pad = 48,
}) => (
  <div
    style={{
      background: color.card,
      borderRadius: radius.card,
      border: `1px solid ${color.cardBorder}`,
      boxShadow: shadow.card,
      padding: pad,
      width: '100%',
      ...style,
    }}
  >
    {children}
  </div>
);

const Lights: React.FC = () => (
  <div style={{display: 'flex', gap: 12}}>
    {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
      <div key={c} style={{width: 18, height: 18, borderRadius: 9, background: c}} />
    ))}
  </div>
);

/** macOS-style window chrome. `dark` for terminals, light for chat/app UIs. */
export const Window: React.FC<{
  title?: string;
  dark?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}> = ({title, dark, children, style, bodyStyle}) => (
  <div
    style={{
      width: '100%',
      borderRadius: radius.window,
      overflow: 'hidden',
      boxShadow: shadow.window,
      background: dark ? color.terminal : color.card,
      border: dark ? '1px solid rgba(255,255,255,0.06)' : `1px solid ${color.cardBorder}`,
      ...style,
    }}
  >
    <div
      style={{
        height: 58,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        background: dark ? color.terminalBar : '#F2F1EE',
        borderBottom: dark ? '1px solid rgba(255,255,255,0.05)' : `1px solid ${color.cardBorder}`,
        position: 'relative',
      }}
    >
      <Lights />
      {title ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: font.mono,
            fontSize: 22,
            color: dark ? 'rgba(255,255,255,0.4)' : color.inkFaint,
          }}
        >
          {title}
        </div>
      ) : null}
    </div>
    <div style={{padding: 36, ...bodyStyle}}>{children}</div>
  </div>
);

/* ---------- Terminal ---------- */

export type TermLine = {text: string; at: number; color?: string; type?: boolean; bold?: boolean; indent?: number};

/** Terminal body: lines appear at `at` frames; `type` lines are typed out with a cursor. */
export const TerminalLines: React.FC<{lines: TermLine[]; fontSize?: number}> = ({lines, fontSize = 30}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const visible = lines.filter((l) => frame >= l.at);
  const last = visible[visible.length - 1];
  return (
    <div style={{fontFamily: font.mono, fontSize, lineHeight: 1.55, color: '#EDEDED'}}>
      {visible.map((l, i) => {
        const text = l.type ? typed(l.text, frame, l.at, 38, fps) : l.text;
        const typing = l.type && text.length < l.text.length;
        return (
          <div
            key={i}
            style={{
              color: l.color ?? '#EDEDED',
              fontWeight: l.bold ? 700 : 400,
              paddingLeft: (l.indent ?? 0) * 28,
              whiteSpace: 'pre',
              opacity: interpolate(frame - l.at, [0, 4], [0, 1], {extrapolateRight: 'clamp'}),
            }}
          >
            {text}
            {(typing || (l === last && l.type)) && <Cursor color="#EDEDED" />}
          </div>
        );
      })}
    </div>
  );
};

/* ---------- Annotations (the "red pen") ---------- */

/** Red marker strike drawn left→right through inline text. */
export const Strike: React.FC<{at: number; dur?: number; children: React.ReactNode}> = ({at, dur = 8, children}) => {
  const p = useProgress(at, at + dur);
  // Inline background sweeps across wrapped line fragments in reading order.
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(${color.marker}, ${color.marker})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 58%',
        backgroundSize: `${p * 100}% 4px`,
        opacity: interpolate(p, [0, 1], [1, 0.78]),
      }}
    >
      {children}
    </span>
  );
};

/** Hand-drawn-ish ellipse around inline text, drawn with stroke-dash. */
export const Circled: React.FC<{at: number; dur?: number; children: React.ReactNode}> = ({at, dur = 12, children}) => {
  const p = useProgress(at, at + dur);
  const len = 1000;
  return (
    <span style={{position: 'relative', display: 'inline-block'}}>
      {children}
      <svg
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        style={{position: 'absolute', left: '-8%', top: '-22%', width: '116%', height: '144%', overflow: 'visible'}}
      >
        <path
          d="M 18 12 C 60 -2, 170 0, 194 22 C 206 40, 160 58, 96 57 C 36 56, 2 46, 6 28 C 9 16, 30 8, 56 6"
          fill="none"
          stroke={color.marker}
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={len}
          strokeDasharray={len}
          strokeDashoffset={len * (1 - p)}
        />
      </svg>
    </span>
  );
};

/** Rotated badge that stamps onto a card ("FREE", "IDENTICAL ×100"). */
export const Stamp: React.FC<{
  at: number;
  label: string;
  tone?: 'solid' | 'outline';
  c?: string;
  rotate?: number;
  size?: number;
  style?: React.CSSProperties;
}> = ({at, label, tone = 'solid', c = color.success, rotate = -8, size = 44, style}) => {
  const p = useSpring(at, springs.snappy);
  if (useCurrentFrame() < at) return null;
  return (
    <div
      style={{
        position: 'absolute',
        transform: `scale(${interpolate(p, [0, 1], [1.7, 1])}) rotate(${rotate}deg)`,
        opacity: interpolate(p, [0, 0.25], [0, 1], {extrapolateRight: 'clamp'}),
        fontFamily: tone === 'solid' ? font.sans : font.mono,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: tone === 'solid' ? '0.02em' : '0.12em',
        color: tone === 'solid' ? '#fff' : c,
        background: tone === 'solid' ? c : 'rgba(255,255,255,0.7)',
        border: tone === 'outline' ? `3px solid ${c}` : 'none',
        borderRadius: 12,
        padding: tone === 'solid' ? '8px 22px' : '6px 16px',
        boxShadow: tone === 'solid' ? '0 10px 24px -8px rgba(0,0,0,0.3)' : 'none',
        ...style,
      }}
    >
      {label}
    </div>
  );
};

/* ---------- Small parts ---------- */

export const Eyebrow: React.FC<{children: React.ReactNode; c?: string}> = ({children, c = color.accent}) => (
  <span
    style={{
      fontFamily: font.mono,
      fontSize: 22,
      fontWeight: 500,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: c,
      background: `${c}1A`,
      padding: '6px 12px',
      borderRadius: 8,
      alignSelf: 'flex-start',
    }}
  >
    {children}
  </span>
);

export const Chip: React.FC<{children: React.ReactNode; active?: boolean; c?: string}> = ({
  children,
  active,
  c = color.accent,
}) => (
  <div
    style={{
      fontFamily: font.sans,
      fontWeight: 600,
      fontSize: 28,
      padding: '12px 22px',
      borderRadius: radius.chip,
      background: active ? `${c}22` : 'rgba(20,20,20,0.04)',
      color: active ? c : color.inkSoft,
      border: `1px solid ${active ? `${c}55` : 'transparent'}`,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

/** Arrow drawn from start to end (vertical by default). */
export const Arrow: React.FC<{at: number; length?: number; dir?: 'down' | 'right'; c?: string}> = ({
  at,
  length = 110,
  dir = 'down',
  c = color.accent,
}) => {
  const p = useProgress(at, at + 10);
  const L = length * p;
  const vertical = dir === 'down';
  return (
    <svg width={vertical ? 40 : length + 20} height={vertical ? length + 20 : 40} style={{overflow: 'visible'}}>
      {vertical ? (
        <>
          <line x1={20} y1={0} x2={20} y2={L} stroke={c} strokeWidth={4} strokeLinecap="round" />
          {p > 0.8 && <path d={`M 6 ${L - 14} L 20 ${L} L 34 ${L - 14}`} stroke={c} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
        </>
      ) : (
        <>
          <line x1={0} y1={20} x2={L} y2={20} stroke={c} strokeWidth={3} strokeLinecap="round" />
          {p > 0.8 && <path d={`M ${L - 10} 10 L ${L} 20 L ${L - 10} 30`} stroke={c} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
        </>
      )}
    </svg>
  );
};

/** Big number that counts up — "×100". */
export const Counter: React.FC<{from?: number; to: number; at: number; dur?: number; prefix?: string; size?: number}> = ({
  from = 1,
  to,
  at,
  dur = 18,
  prefix = '×',
  size = 120,
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [at, at + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const eased = 1 - Math.pow(1 - t, 3);
  const n = Math.round(from + (to - from) * eased);
  return (
    <div style={{fontFamily: font.sans, fontWeight: 700, fontSize: size, letterSpacing: '-0.03em', color: color.ink}}>
      <span style={{color: color.accent, marginRight: 6}}>{prefix}</span>
      {n}
    </div>
  );
};
