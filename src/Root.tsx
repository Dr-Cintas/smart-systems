import React from 'react';
import {Composition} from 'remotion';
import {VIDEO} from './theme';
import {EXPLAINER_DURATION, ExplainerDemo, explainerSchema} from './ExplainerDemo';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ExplainerDemo"
    component={ExplainerDemo}
    durationInFrames={EXPLAINER_DURATION}
    fps={VIDEO.fps}
    width={VIDEO.width}
    height={VIDEO.height}
    schema={explainerSchema}
    defaultProps={{handle: '@smartsystems', keyword: 'ARENA'}}
  />
);
