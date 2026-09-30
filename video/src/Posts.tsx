import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const C = {navy: '#002FAB', gold: '#FECE04', blue: '#3580F2'};

const fontCss = ['400', '700', '800']
  .map(
    (w) => `@font-face{font-family:Cairo;font-weight:${w};src:url(${staticFile(
      `fonts/cairo-arabic-${w}-normal.woff2`,
    )}) format('woff2');unicode-range:U+0600-06FF,U+200C-200E,U+FB50-FDFF,U+FE80-FEFC;}`,
  )
  .join('\n');

export type PostProps = {
  photo: string;
  objectPosition: string;
  scale?: number;
  name: string;
  text: string;
  side: 'left' | 'right';
  bubbleTop: number;
  bubbleWidth: number;
  fontSize: number;
  animate?: boolean;
};

export const Post: React.FC<PostProps> = ({
  photo, objectPosition, scale = 1, name, text, side, bubbleTop, bubbleWidth, fontSize, animate,
}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const zoom = animate ? interpolate(f, [0, 150], [1, 1.07], {extrapolateRight: 'clamp'}) : 1;
  const pop = animate ? spring({frame: f - 12, fps, config: {damping: 12, stiffness: 130}}) : 1;
  const logoIn = animate ? interpolate(f, [0, 15], [0, 1], {extrapolateRight: 'clamp'}) : 1;
  const fadeOut = animate ? interpolate(f, [138, 150], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;
  return (
  <AbsoluteFill style={{background: C.blue, opacity: fadeOut}}>
    <style>{fontCss}</style>
    <Img
      src={staticFile(photo)}
      style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition, transform: `scale(${scale * zoom})`, transformOrigin: 'bottom center'}}
    />
    {/* logo slot */}
    <div style={{position: 'absolute', top: 44, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: logoIn}}>
      <div style={{background: '#fff', borderRadius: 44, padding: '18px 34px', boxShadow: '0 10px 30px rgba(0,47,171,0.25)'}}>
        <Img src={staticFile('img/logo.png')} style={{height: 96, display: 'block'}} />
      </div>
    </div>
    {/* speech bubble */}
    <div
      style={{
        position: 'absolute',
        top: bubbleTop,
        [side]: 40,
        width: bubbleWidth,
        background: '#fff',
        borderRadius: 44,
        padding: '26px 30px 34px',
        boxShadow: '0 16px 40px rgba(0,47,171,0.30)',
        direction: 'rtl',
        fontFamily: 'Cairo, sans-serif',
        opacity: pop,
        transform: `scale(${0.6 + 0.4 * pop})`,
        transformOrigin: side === 'left' ? 'bottom right' : 'bottom left',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          background: C.gold,
          color: C.navy,
          fontWeight: 800,
          fontSize: 34,
          padding: '2px 26px 6px',
          borderRadius: 30,
          marginBottom: 14,
        }}
      >
        {name}
      </div>
      <div style={{color: C.navy, fontWeight: 800, fontSize, lineHeight: 1.45}}>{text}</div>
      {/* tail */}
      <div
        style={{
          position: 'absolute',
          bottom: -34,
          [side === 'left' ? 'right' : 'left']: 70,
          width: 0,
          height: 0,
          borderLeft: '26px solid transparent',
          borderRight: '26px solid transparent',
          borderTop: '40px solid #fff',
        }}
      />
    </div>
  </AbsoluteFill>
  );
};

export const CarouselVideo: React.FC = () => (
  <AbsoluteFill style={{background: C.blue}}>
    {Object.values(posts).map((p, i) => (
      <Sequence key={i} from={i * 150} durationInFrames={150}>
        <Post {...p} animate />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export const posts: Record<string, PostProps> = {
  Post1: {
    photo: 'img/mahmoud.png', objectPosition: 'center bottom', name: 'محمود',
    text: 'سناء عايزة تحجز فندق لعيلتها... وقالتلي أي حاجة فيها مسبح وخلاص!',
    side: 'left', bubbleTop: 190, bubbleWidth: 430, fontSize: 42,
  },
  Post2: {
    photo: 'img/sanaa_comp.jpg', objectPosition: 'center 22%', name: 'سناء',
    text: 'آه عادي... هو المسبح مش كفاية؟ 😅',
    side: 'right', bubbleTop: 190, bubbleWidth: 350, fontSize: 42,
  },
  Post3: {
    photo: 'img/yousry.png', objectPosition: 'center bottom', name: 'يسري',
    text: 'المسبح لوحده مش كفاية يا سناء 😂 المكان، الغرف، التقييمات، والأكل كمان... سيبيها علينا!',
    side: 'left', bubbleTop: 180, bubbleWidth: 440, fontSize: 36,
  },
};
