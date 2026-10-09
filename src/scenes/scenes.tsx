import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {color, font, layout} from '../theme';
import {Canvas, Panel, Split} from '../components/Layout';
import {Appear, Cursor, typed, useProgress} from '../components/motion';
import {Arrow, Card, Chip, Circled, Counter, Eyebrow, Stamp, Strike, TerminalLines, Window} from '../components/ui';
import {AgentGrid, AgentToken} from '../components/Agents';

// Every scene uses local frames (0 = scene start) — they're mounted in <Series>.

export type SceneProps = {speakerSrc?: string; speakerStartFrom?: number};

/* 1 — Hook: split, three near-identical answers stacked like tombstones of effort */
export const HookScene: React.FC<SceneProps> = (p) => {
  const answers = ['"In today\'s fast-paced world…"', '"Unlock your potential…"', '"Let\'s dive in…"'];
  return (
    <Split
      {...p}
      top={
        <Panel padTop={40}>
          <div style={{display: 'flex', gap: 22, width: '100%'}}>
            {answers.map((a, i) => (
              <Appear key={i} delay={i * 7} style={{flex: 1}}>
                <Card pad={30} style={{height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                  <Eyebrow c={color.inkFaint}>try {i + 1}</Eyebrow>
                  <div style={{fontFamily: font.serif, fontSize: 40, lineHeight: 1.2, color: color.inkSoft}}>{a}</div>
                </Card>
              </Appear>
            ))}
          </div>
        </Panel>
      }
    />
  );
};

/* 2 — Multiply: full canvas, one token becomes 100 */
export const MultiplyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const one = interpolate(frame, [14, 22], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Canvas>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 120}}>
        {one > 0 && (
          <div style={{position: 'absolute', top: 380, opacity: one, transform: `scale(${1 + (1 - one) * 0.4})`}}>
            <Appear>
              <AgentToken c={color.agents[0]} size={150} />
            </Appear>
          </div>
        )}
        <div style={{position: 'absolute', top: 920}}>
          <AgentGrid count={100} cols={10} at={18} size={52} gap={22} stagger={16} />
        </div>
        <div style={{position: 'absolute', top: 1720}}>
          <Counter at={18} to={100} />
        </div>
      </AbsoluteFill>
    </Canvas>
  );
};

/* 3 — Product reveal: split, product card + stamp */
export const ProductScene: React.FC<SceneProps> = (p) => (
  <Split
    {...p}
    top={
      <Panel padTop={40}>
        <Appear style={{width: '100%', position: 'relative'}}>
          <Card pad={0} style={{overflow: 'hidden', display: 'flex', height: 380}}>
            <div
              style={{
                width: 360,
                background: `linear-gradient(160deg, ${color.accent}33, ${color.accent}0A)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 56px)', gap: 14}}>
                {Array.from({length: 9}, (_, i) => (
                  <AgentToken key={i} c={color.agents[i % 8]} size={56} />
                ))}
              </div>
            </div>
            <div style={{padding: '0 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18}}>
              <div>
                <Eyebrow>/arena</Eyebrow>
              </div>
              <div style={{fontSize: 96, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1}}>Arena</div>
              <div style={{fontSize: 30, color: color.inkSoft}}>A Claude Code skill</div>
            </div>
          </Card>
          <Stamp at={44} label="FREE" style={{right: -14, top: -26}} />
        </Appear>
      </Panel>
    }
  />
);

/* 4 — Critique: split, the red-pen moment */
export const CritiqueScene: React.FC<SceneProps> = (p) => {
  const frame = useCurrentFrame();
  const tag = useProgress(62, 72);
  return (
    <Split
      {...p}
      top={
        <Panel padTop={40}>
          <Appear style={{width: '100%'}}>
            <Card pad={52} style={{position: 'relative'}}>
              <div style={{fontFamily: font.serif, fontSize: 50, lineHeight: 1.32, color: color.ink, letterSpacing: '-0.01em'}}>
                Hi there! <Strike at={18}>In today's fast-paced digital landscape,</Strike> businesses like yours need a partner
                who <Circled at={38}>truly cares.</Circled>
              </div>
              <div style={{display: 'flex', gap: 26, marginTop: 40, fontSize: 24, color: color.inkFaint, fontFamily: font.sans}}>
                <span>‹ 4 / 4 ›</span>
                <span>Copy</span>
                <span>Retry</span>
              </div>
              {frame >= 62 && (
                <div
                  style={{
                    position: 'absolute',
                    right: 48,
                    bottom: 34,
                    fontFamily: font.serif,
                    fontStyle: 'italic',
                    fontSize: 54,
                    color: color.marker,
                    opacity: tag,
                    transform: `translateY(${(1 - tag) * 10}px) rotate(-6deg)`,
                  }}
                >
                  generic.
                </div>
              )}
            </Card>
          </Appear>
        </Panel>
      }
    />
  );
};

/* 5 — Terminal: full canvas, command typed, agents spin up */
export const TerminalScene: React.FC = () => {
  const strategies = [
    ['Probabilistic', 'Iterative deepening'],
    ['Constraint first', 'Options matrix'],
    ['Dialectical', 'Requirements checklist'],
    ['Expert panel', 'Test first'],
    ['Decomposition', 'Open questions first'],
    ['First principles', 'Three drafts, pick one'],
    ['Inversion', 'Build, then break'],
  ];
  const frame = useCurrentFrame();
  const running = Math.min(100, Math.max(0, Math.round(interpolate(frame, [40, 100], [7, 100]))));
  return (
    <Canvas>
      <AbsoluteFill style={{padding: `260px ${layout.gutter - 30}px 0`}}>
        <Appear>
          <Window dark title="claude — ~/agency" bodyStyle={{height: 1220, padding: 40, position: 'relative'}}>
            <div style={{display: 'flex', gap: 24, alignItems: 'center', marginBottom: 28}}>
              <AgentToken c={color.accent} size={64} />
              <div style={{fontFamily: font.mono, fontSize: 28, lineHeight: 1.4, color: 'rgba(255,255,255,0.5)'}}>
                <div>
                  <b style={{color: '#fff'}}>Claude Code</b> v2.1.4
                </div>
                <div>~/agency</div>
              </div>
            </div>
            <TerminalLines
              fontSize={27}
              lines={[
                {text: '> /arena Write a cold email to land my\n  first client', at: 4, type: true},
                {text: ' ', at: 26},
                {text: '● Running the arena on this task.', at: 28},
                {text: '└ 100 agents · 1 task · 100 strategy cards', at: 32, color: 'rgba(255,255,255,0.65)', indent: 1},
                {text: ' ', at: 36},
              ]}
            />
            {frame >= 40 && (
              // Leave the caption seam (y≈770) empty, as the reference does.
              <div style={{fontFamily: font.mono, fontSize: 27, lineHeight: 1.75, color: '#EDEDED', marginTop: 130}}>
                <div>
                  <span style={{color: color.success}}>●</span> Running <b>{running}</b> agents…
                </div>
                {strategies.map(([a, b], i) =>
                  frame >= 44 + i * 5 ? (
                    <div key={i} style={{whiteSpace: 'pre', opacity: interpolate(frame - 44 - i * 5, [0, 4], [0, 1], {extrapolateRight: 'clamp'})}}>
                      <span style={{color: 'rgba(255,255,255,0.35)'}}>├─ </span>
                      <span style={{color: color.agents[i % 8]}}>a{String(i + 1).padStart(3, '0')}</span> {a}
                      <span style={{color: 'rgba(255,255,255,0.35)'}}> · </span>
                      {b}
                    </div>
                  ) : null,
                )}
                {frame >= 84 && <div style={{color: 'rgba(255,255,255,0.4)'}}>   +93 more agents</div>}
              </div>
            )}
            <div style={{position: 'absolute', bottom: 40, fontFamily: font.mono, fontSize: 26, color: color.accent}}>
              ✻ Arena-ing… <span style={{color: 'rgba(255,255,255,0.4)'}}>(esc to interrupt)</span>
            </div>
          </Window>
        </Appear>
      </AbsoluteFill>
    </Canvas>
  );
};

/* 6 — Strategies: split, three tilted strategy cards + workflow rows */
export const StrategyScene: React.FC<SceneProps> = (p) => {
  const frame = useCurrentFrame();
  const cards = [
    {t: 'Simplest thing that works', c: color.success, r: -7},
    {t: 'Explicit trade-offs', c: color.agents[3], r: 0},
    {t: 'Edge cases first', c: color.agents[0], r: 7},
  ];
  const rows = [
    ['Draft', 'Critique', 'Rewrite'],
    ['Three drafts', 'Pick one'],
    ['Research', 'Synthesise'],
  ];
  const showRows = frame >= 50;
  return (
    <Split
      {...p}
      top={
        <Panel padTop={30}>
          {!showRows ? (
            <div style={{display: 'flex', gap: 30, justifyContent: 'center'}}>
              {cards.map((c, i) => (
                <Appear key={i} delay={i * 6} style={{transform: `rotate(${c.r}deg)`}}>
                  <div
                    style={{
                      width: 250,
                      height: 340,
                      borderRadius: 24,
                      background: color.card,
                      boxShadow: '0 20px 40px -14px rgba(0,0,0,0.25)',
                      overflow: 'hidden',
                      transform: `rotate(${c.r}deg)`,
                    }}
                  >
                    <div style={{height: 70, background: c.c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <span style={{fontFamily: font.mono, fontSize: 18, color: '#fff', letterSpacing: '0.2em'}}>STRATEGY</span>
                    </div>
                    <div style={{padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34}}>
                      <div style={{width: 72, height: 72, borderRadius: 36, border: `5px solid ${c.c}`, marginTop: 20}} />
                      <div style={{fontWeight: 600, fontSize: 30, textAlign: 'center', lineHeight: 1.2}}>{c.t}</div>
                    </div>
                  </div>
                </Appear>
              ))}
            </div>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: 22, width: '100%'}}>
              {rows.map((r, i) => (
                <Appear key={i} delay={i * 5}>
                  <Card pad={22} style={{display: 'flex', alignItems: 'center', gap: 18}}>
                    <AgentToken c={color.agents[[4, 3, 1][i]]} size={40} />
                    {r.map((s, j) => (
                      <React.Fragment key={j}>
                        {j > 0 && <Arrow dir="right" length={40} at={58 + i * 5 + j * 6} c={color.inkFaint} />}
                        <Chip active={frame >= 58 + i * 5 + j * 6} c={color.agents[[4, 3, 1][i]]}>
                          {s}
                        </Chip>
                      </React.Fragment>
                    ))}
                  </Card>
                </Appear>
              ))}
            </div>
          )}
        </Panel>
      }
    />
  );
};

/* 7 — Tournament: full canvas, elimination rounds, one winner */
export const TournamentScene: React.FC = () => {
  const frame = useCurrentFrame();
  const stages = [
    {at: 0, label: 'ROUND 1', meta: '50 DUELS'},
    {at: 30, label: 'AGENTS LEFT', meta: '25'},
    {at: 55, label: 'AGENTS LEFT', meta: '2'},
    {at: 80, label: 'WINNER', meta: 'BEAT 99 AGENTS'},
  ];
  const stage = [...stages].reverse().find((s) => frame >= s.at)!;
  const winner = useProgress(80, 96);
  return (
    <Canvas>
      <AbsoluteFill style={{alignItems: 'center'}}>
        <div style={{position: 'absolute', top: 300}}>
          <div
            key={stage.label + stage.meta}
            style={{
              fontFamily: font.mono,
              fontSize: 34,
              letterSpacing: '0.12em',
              background: color.ink,
              color: '#fff',
              padding: '14px 26px',
              borderRadius: 14,
              display: 'flex',
              gap: 18,
            }}
          >
            <b style={{color: stage.label === 'WINNER' ? '#F2C14E' : '#fff'}}>{stage.label}</b>
            <span style={{opacity: 0.6}}>{stage.meta}</span>
          </div>
        </div>
        <div style={{position: 'absolute', top: 920, opacity: 1 - winner}}>
          <AgentGrid
            count={100}
            cols={10}
            at={-30}
            size={52}
            gap={22}
            survivors={[
              {at: 30, keep: 25},
              {at: 55, keep: 2},
              {at: 76, keep: 1},
            ]}
          />
        </div>
        {frame >= 80 && (
          <div
            style={{
              position: 'absolute',
              top: 1040,
              opacity: winner,
              transform: `scale(${0.85 + 0.15 * winner})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 40,
            }}
          >
            <div style={{position: 'relative'}}>
              <div
                style={{
                  position: 'absolute',
                  inset: -60,
                  borderRadius: 999,
                  background: `radial-gradient(circle, ${color.agents[1]}40 0%, transparent 70%)`,
                }}
              />
              <AgentToken c={color.agents[1]} size={200} label="a051" />
            </div>
            <div style={{fontFamily: font.mono, fontSize: 30, color: color.inkSoft, letterSpacing: '0.1em'}}>
              WORKING BACKWARDS · THREE DRAFTS
            </div>
          </div>
        )}
      </AbsoluteFill>
    </Canvas>
  );
};

/* 8 — CTA: split, follow + comment keyword */
export const CtaScene: React.FC<SceneProps & {handle?: string; keyword?: string}> = ({
  handle = '@smartsystems',
  keyword = 'ARENA',
  ...p
}) => {
  const frame = useCurrentFrame();
  const following = frame >= 24;
  const word = typed(keyword, frame, 40, 14);
  return (
    <Split
      {...p}
      top={
        <Panel padTop={40}>
          <Appear style={{width: '100%'}}>
            <Card pad={44}>
              <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
                <Num n={1} />
                <div style={{width: 72, height: 72, borderRadius: 36, background: `linear-gradient(140deg, ${color.accent}, ${color.agents[3]})`}} />
                <div style={{flex: 1}}>
                  <div style={{fontSize: 44, fontWeight: 700}}>Follow</div>
                  <div style={{fontSize: 24, color: color.inkFaint}}>{handle}</div>
                </div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 600,
                    padding: '14px 28px',
                    borderRadius: 14,
                    background: following ? 'rgba(20,20,20,0.06)' : color.info,
                    color: following ? color.ink : '#fff',
                  }}
                >
                  {following ? 'Following' : 'Follow'}
                </div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 34}}>
                <Num n={2} />
                <div style={{fontSize: 44, fontWeight: 700}}>Comment</div>
                <div
                  style={{
                    flex: 1,
                    fontSize: 40,
                    fontWeight: 700,
                    padding: '14px 22px',
                    borderRadius: 14,
                    border: `2px solid ${frame >= 40 ? color.marker : color.cardBorder}`,
                    color: word ? color.ink : color.inkFaint,
                    background: '#fff',
                  }}
                >
                  {word || <span style={{fontWeight: 400, fontSize: 28}}>Add a comment…</span>}
                  {frame >= 40 && <Cursor height={0.9} />}
                </div>
              </div>
              <div style={{fontSize: 24, color: color.inkSoft, marginTop: 26, marginLeft: 70}}>↗ I'll DM you the full setup</div>
            </Card>
          </Appear>
        </Panel>
      }
    />
  );
};

const Num: React.FC<{n: number}> = ({n}) => (
  <div
    style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      background: color.accent,
      color: '#fff',
      fontWeight: 700,
      fontSize: 26,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {n}
  </div>
);
