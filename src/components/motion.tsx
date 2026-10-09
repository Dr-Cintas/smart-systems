import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {springs} from '../theme';

type SpringCfg = (typeof springs)[keyof typeof springs];

export const useSpring = (delay = 0, config: SpringCfg = springs.smooth, durationInFrames?: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config, durationInFrames});
};

/** Linear 0→1 progress between two frames, clamped. */
export const useProgress = (from: number, to: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, to], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
};

/**
 * The house entrance: rise a little, un-blur, settle. No bounce, no overshoot.
 * Used for every card, window and chip.
 */
export const Appear: React.FC<{
  delay?: number;
  rise?: number;
  scaleFrom?: number;
  blur?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({delay = 0, rise = 28, scaleFrom = 0.965, blur = 8, style, children}) => {
  const p = useSpring(delay, springs.smooth);
  return (
    <div
      style={{
        opacity: interpolate(p, [0, 0.6], [0, 1], {extrapolateRight: 'clamp'}),
        transform: `translateY(${(1 - p) * rise}px) scale(${scaleFrom + (1 - scaleFrom) * p})`,
        filter: `blur(${(1 - p) * blur}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Pop for stamps/badges: slight overshoot is allowed only here. */
export const Pop: React.FC<{delay?: number; rotate?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({
  delay = 0,
  rotate = 0,
  style,
  children,
}) => {
  const p = useSpring(delay, springs.snappy);
  return (
    <div
      style={{
        opacity: interpolate(p, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}),
        transform: `scale(${interpolate(p, [0, 1], [1.6, 1])}) rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Characters revealed over time, for typing effects. */
export const typed = (text: string, frame: number, start: number, cps = 32, fps = 30) => {
  const n = Math.floor(Math.max(0, frame - start) * (cps / fps));
  return text.slice(0, n);
};

export const Cursor: React.FC<{color?: string; height?: number}> = ({color = 'currentColor', height = 1}) => {
  const frame = useCurrentFrame();
  const on = Math.floor(frame / 15) % 2 === 0;
  return (
    <span
      style={{
        display: 'inline-block',
        width: '0.55em',
        height: `${height}em`,
        background: color,
        opacity: on ? 0.9 : 0,
        verticalAlign: 'text-bottom',
        marginLeft: 2,
      }}
    />
  );
};
