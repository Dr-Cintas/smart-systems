# Video Style Guide

This is a breakdown of the reference reel (`docs/reference/sheet_0*.jpg`: 34 s, 9:16, sampled every 0.5 s), turned into rules we can repeat.
**Our rule on top of it:** keep the structure and pacing, but make everything **clean and premium, never cartoonish.** The reference uses pixel-art creatures and a pixel colosseum. We replace them with soft geometric tokens and calm UI.

---

## 1. Format

| | |
|---|---|
| Aspect | 9:16 vertical, rendered at **1080×1920, 30 fps** (the reference is 720×1280) |
| Length | 25–40 s |
| Talking head | One continuous selfie take, cut into segments |
| Background | Warm off-white **`#F0EFED`** behind every graphic, never pure white |

## 2. The three frame types

The reference uses only three compositions and cuts between them:

1. **Split (about 60% of runtime).** Graphic panel on top (0 → ~40% height) and speaker footage on the bottom (40% → 100%). The seam is a hard edge with no border, radius or shadow. **The caption pill sits on the seam.**
2. **Full graphic (about 35%).** No face. The canvas fills the frame: a terminal, a token grid, or the tournament. The caption stays at the same Y position, and the layout leaves that strip empty.
3. **Full speaker (rare, under 5%).** Used for a beat of emphasis only.

Each graphic scene lasts **2–4 s**. Captions change every **~0.4–0.6 s**, so something new appears roughly twice a second.

## 3. Captions

- **1–3 words** per chunk, **UPPERCASE**, monospace bold (JetBrains Mono 700), letter-spacing +0.08em.
- White text on a dark rounded pill `rgba(38,36,37,0.94)` with 14px radius.
- Always at the **same Y** (the split seam, about 40% down the frame).
- Hard cut between chunks with a 2–3 frame settle (scale 0.94 → 1).
- **Never** use karaoke word highlights, emoji, colored keywords, or bouncing.

## 4. Graphic vocabulary

| Element | Reference | Our premium version (`src/components`) |
|---|---|---|
| Content card | Off-white rounded card with a soft shadow | `Card` with 28px radius, two-layer soft shadow and a 1px hairline border |
| App window | macOS chrome, light or dark | `Window` (`dark` for terminal) |
| Terminal | Typed command, then a streaming list with colored IDs | `TerminalLines` plus a custom list |
| Red pen | Strike through clichés, circle a phrase, handwritten note ("generic.") | `Strike`, `Circled`, plus an italic serif note in `color.marker` |
| Stamp | Rotated green "FREE" badge or an outlined "IDENTICAL ×100" | `Stamp` (solid / outline), the only element with overshoot |
| Multiplication | One unit becomes a grid of 100, with a ×N counter | `AgentToken`, `AgentGrid`, `Counter` |
| Strategy cards | Three tilted cards with colored headers | `StrategyScene` |
| Workflow rows | Chips joined by drawn arrows | `Chip`, `Arrow dir="right"` |
| Tournament | Pixel colosseum with sprites fighting | Clean grid where losers fade to grey, a dark status pill, and a winner tile with a soft glow |
| Flow / steps | Screenshot → red arrow → input box | `Arrow` (coral) |
| CTA | "① Follow ② Comment KEYWORD" card, with the keyword typed | `CtaScene` |

## 5. Color

```
canvas   #F0EFED   card     #F8F7F5   ink    #161616   inkSoft #5E5C59
terminal #141414   pill     #262425F0 accent #D97757 (warm coral)
marker   #C8283C (red pen)   success #2FA86B   info #2F6FED
agents   #E2574C #3F6FE0 #2FA86B #8E5BE0 #E2A23B #1FA6B8 #D45AA0 #6B7A8F
```
Agent colors are deliberately **muted**. The reference uses neon RGB, which is one reason it looks cartoonish.

## 6. Typography

- **Inter** for UI and headlines (headlines are 700 weight with −0.04em tracking).
- **JetBrains Mono** for captions, terminal text, eyebrows and status pills.
- **Newsreader** (serif) for "AI output" text such as emails and answers. The editorial serif is what makes the AI text read as a document.
- The fonts are bundled in `public/fonts`, so renders work offline.

## 7. Motion rules

- **Entrance (`Appear`):** rise 28px, scale 0.965 → 1, blur 8 → 0, with a critically damped spring. **No bounce.**
- **Stamps (`Pop`, `Stamp`):** scale 1.7 → 1 with a snappy spring. This is the *only* overshoot allowed.
- **Stagger:** 5–7 frames between siblings. Grids stagger from the center outward.
- **Drawing:** strikes take 8 frames and circles 12 frames (stroke-dash). Arrows take 10 frames.
- **Typing:** about 38 chars/s in terminals and about 14 chars/s for a CTA keyword, with a blinking block cursor.
- **Cuts:** hard cuts between scenes, with no transitions, wipes or zooms.
- The speaker footage stays still. Don't zoom it or add a Ken Burns effect.

## 8. Don'ts (anti-cartoon checklist)

- ❌ Pixel art, mascots with faces, stickers, emoji, comic fonts
- ❌ Neon or pure RGB colors, gradients on text, glow on everything
- ❌ Bouncy or elastic easing (outside of stamps), spinning, shaking
- ❌ Drop shadows darker than about 0.35 alpha, borders thicker than 1px on cards
- ❌ More than one accent color in a single frame (agent palettes count as data, not accents)
- ✅ Whitespace, a hairline border, a soft shadow, one red-pen moment per scene at most

## 9. Script beat structure (from the reference)

1. **Hook (0–3 s):** the pain ("If AI keeps giving you bad answers…")
2. **Big idea (3–6 s):** visual multiplication ("make 100 versions")
3. **Name and price (6–9 s):** product card plus a "FREE" stamp
4. **Problem detail (9–16 s):** red-pen critique of the generic output
5. **How it works (16–24 s):** terminal, strategies, workflows
6. **Payoff (24–28 s):** tournament, then the winner and the good output
7. **How to get it (28–31 s):** link → arrow → paste box
8. **CTA (31–34 s):** follow and comment a keyword
