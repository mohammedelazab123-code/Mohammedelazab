import {Composition} from 'remotion';
import {FlyNestPromo, DURATION} from './FlyNestPromo';

export const Root = () => (
  <Composition
    id="FlyNestPromo"
    component={FlyNestPromo}
    durationInFrames={DURATION}
    fps={30}
    width={1080}
    height={1920}
  />
);
