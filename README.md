# smart-systems — video graphics

This repo holds short-form vertical explainer videos built with [Remotion](https://remotion.dev). The style comes from a reference reel and is pushed toward a **clean, premium** look. See [`docs/STYLE_GUIDE.md`](docs/STYLE_GUIDE.md).

## Setup

```bash
npm install
npm run studio        # live editor at http://localhost:3000
npm run render        # → out/explainer-demo.mp4
npm run still         # → out/still.png (frame 120)
```

If Remotion can't download its headless Chrome (for example, in a sandbox), point it at a local Chromium:

```bash
export REMOTION_CHROME=/path/to/chrome-headless-shell
```

## Using your own footage

Put the talking-head take in `public/` (for example, `public/speaker.mp4`). Then set `speakerSrc: "speaker.mp4"` in the Studio props panel, or pass it on the command line:

```bash
npx remotion render src/index.ts ExplainerDemo out/video.mp4 --props='{"speakerSrc":"speaker.mp4","handle":"@you","keyword":"ARENA"}'
```

Edit the caption cues in `src/ExplainerDemo.tsx` (`'TEXT@frame'`) to match the voice-over.

## Structure

```
src/
  theme.ts              colors, fonts, radii, shadows, springs, layout
  components/
    motion.tsx          Appear, Pop, typed(), Cursor, useSpring/useProgress
    Caption.tsx         mono uppercase caption pill + cues() helper
    Layout.tsx          Canvas, Split (graphic top / speaker bottom), Panel, Speaker
    ui.tsx              Card, Window, TerminalLines, Strike, Circled, Stamp, Chip, Arrow, Counter, Eyebrow
    Agents.tsx          AgentToken, AgentGrid (staggered grid + elimination rounds)
  scenes/scenes.tsx     8 example scenes (hook → CTA)
  ExplainerDemo.tsx     timeline: scenes + captions
docs/
  STYLE_GUIDE.md        what we learned from the reference, and the rules
  reference/            contact sheets of the reference video
```
