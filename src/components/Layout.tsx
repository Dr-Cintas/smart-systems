import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile} from 'remotion';
import {color, font, layout} from '../theme';

/** Warm off-white page. Every graphic lives on this. */
export const Canvas: React.FC<{children?: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <AbsoluteFill style={{background: color.canvas, fontFamily: font.sans, color: color.ink, ...style}}>
    {children}
  </AbsoluteFill>
);

/**
 * Talking-head footage. Pass a file in /public via `src` (e.g. "speaker.mp4")
 * and `startFrom` to sync the cut. Without a src a neutral placeholder renders,
 * so templates can be previewed before footage exists.
 */
export const Speaker: React.FC<{src?: string; startFrom?: number}> = ({src, startFrom = 0}) => {
  if (src) {
    return (
      <OffthreadVideo
        src={src.startsWith('http') ? src : staticFile(src)}
        startFrom={startFrom}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    );
  }
  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(120% 90% at 50% 35%, #8C7B6B 0%, #5A4C41 45%, #2B241F 100%)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.22), rgba(255,255,255,0.04))',
          marginTop: -80,
        }}
      />
      <div
        style={{
          marginTop: 40,
          fontFamily: font.mono,
          fontSize: 26,
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.5)',
        }}
      >
        SPEAKER FOOTAGE
      </div>
    </AbsoluteFill>
  );
};

/**
 * The signature layout: graphic panel on top (on the canvas color), speaker
 * footage filling the bottom. Hard edge, no border, no rounded corners —
 * the seam is where the caption pill sits.
 */
export const Split: React.FC<{
  top: React.ReactNode;
  speakerSrc?: string;
  speakerStartFrom?: number;
  splitY?: number;
}> = ({top, speakerSrc, speakerStartFrom, splitY = layout.splitY}) => (
  <Canvas>
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: splitY, overflow: 'hidden'}}>{top}</div>
    <div style={{position: 'absolute', left: 0, right: 0, top: splitY, bottom: 0, overflow: 'hidden'}}>
      <Speaker src={speakerSrc} startFrom={speakerStartFrom} />
    </div>
  </Canvas>
);

/** Centers content inside the top panel with the standard side gutters. */
export const Panel: React.FC<{children: React.ReactNode; padTop?: number; style?: React.CSSProperties}> = ({
  children,
  padTop = 0,
  style,
}) => (
  <AbsoluteFill
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${padTop}px ${layout.gutter}px 70px`,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);
