import {Composition} from 'remotion';
import {FlyNestPromo, DURATION} from './FlyNestPromo';
import {Post, posts, CarouselVideo} from './Posts';

export const Root = () => (
  <>
    {Object.entries(posts).map(([id, p]) => (
      <Composition key={id} id={id} component={Post} defaultProps={p} durationInFrames={1} fps={30} width={1080} height={1350} />
    ))}
  <Composition id="CarouselVideo" component={CarouselVideo} durationInFrames={450} fps={30} width={1080} height={1350} />
  <Composition
    id="FlyNestPromo"
    component={FlyNestPromo}
    durationInFrames={DURATION}
    fps={30}
    width={1080}
    height={1920}
  />
  </>
);