import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// Fonts are bundled in /public/fonts (SIL OFL) so renders never depend on the network.
const faces: [string, string, string, string?][] = [
  ['Inter', 'inter-latin-400-normal', '400'],
  ['Inter', 'inter-latin-500-normal', '500'],
  ['Inter', 'inter-latin-600-normal', '600'],
  ['Inter', 'inter-latin-700-normal', '700'],
  ['Inter', 'inter-latin-800-normal', '800'],
  ['JetBrains Mono', 'jetbrains-mono-latin-400-normal', '400'],
  ['JetBrains Mono', 'jetbrains-mono-latin-500-normal', '500'],
  ['JetBrains Mono', 'jetbrains-mono-latin-700-normal', '700'],
  ['Newsreader', 'newsreader-latin-400-normal', '400'],
  ['Newsreader', 'newsreader-latin-500-normal', '500'],
  ['Newsreader', 'newsreader-latin-400-italic', '400', 'italic'],
  ['Newsreader', 'newsreader-latin-500-italic', '500', 'italic'],
];
for (const [family, file, weight, style = 'normal'] of faces) {
  loadFont({family, url: staticFile(`fonts/${file}.woff2`), weight, style});
}

// Canvas: vertical short-form, 9:16.
export const VIDEO = {width: 1080, height: 1920, fps: 30};

// Colors sampled from the reference video and refined for a premium feel.
export const color = {
  canvas: '#F0EFED', // warm off-white page behind every graphic
  card: '#F8F7F5', // card surface
  cardBorder: 'rgba(20,20,20,0.06)',
  ink: '#161616', // primary text
  inkSoft: '#5E5C59', // secondary text
  inkFaint: '#9A9893', // tertiary / meta text
  terminal: '#141414', // dark window body
  terminalBar: '#1E1E1E',
  pill: 'rgba(38,36,37,0.94)', // caption pill
  pillText: '#FFFFFF',
  accent: '#D97757', // warm coral (arrows, highlights, brand)
  marker: '#C8283C', // red pen strike / circle
  success: '#2FA86B',
  info: '#2F6FED',
  // Agent palette: muted, saturated-but-not-neon. Never use pure RGB primaries.
  agents: ['#E2574C', '#3F6FE0', '#2FA86B', '#8E5BE0', '#E2A23B', '#1FA6B8', '#D45AA0', '#6B7A8F'],
};

export const font = {
  sans: '"Inter", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
  serif: '"Newsreader", Georgia, serif',
};

export const radius = {card: 28, window: 26, pill: 14, chip: 12};

export const shadow = {
  card: '0 2px 4px rgba(0,0,0,0.04), 0 18px 40px -12px rgba(0,0,0,0.14)',
  window: '0 4px 10px rgba(0,0,0,0.08), 0 30px 60px -18px rgba(0,0,0,0.35)',
};

// Layout: graphic panel on top, speaker below; caption sits on the seam.
export const layout = {
  splitY: 770, // px from top where speaker footage begins
  gutter: 90, // side padding for cards
};

// Motion presets for spring(): calm, no bounce = premium; snappy for stamps.
export const springs = {
  soft: {damping: 200, mass: 0.8},
  smooth: {damping: 26, stiffness: 120, mass: 0.9},
  snappy: {damping: 14, stiffness: 180, mass: 0.7},
};
