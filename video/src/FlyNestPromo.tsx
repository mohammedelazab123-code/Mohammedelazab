import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const DURATION = 450;

const C = {
  navy: '#0B2545',
  blue: '#13A4E8',
  sky: '#8FD8F7',
  sun: '#FF9F1C',
  white: '#FFFFFF',
};

const fontCss = `
@font-face{font-family:Cairo;font-weight:400;src:url(${staticFile('fonts/cairo-arabic-400-normal.woff2')}) format('woff2');unicode-range:U+0600-06FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE80-FEFC;}
@font-face{font-family:Cairo;font-weight:700;src:url(${staticFile('fonts/cairo-arabic-700-normal.woff2')}) format('woff2');unicode-range:U+0600-06FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE80-FEFC;}
@font-face{font-family:Cairo;font-weight:800;src:url(${staticFile('fonts/cairo-arabic-800-normal.woff2')}) format('woff2');unicode-range:U+0600-06FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE80-FEFC;}
@font-face{font-family:Cairo;font-weight:700;src:url(${staticFile('fonts/cairo-latin-700-normal.woff2')}) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;}
@font-face{font-family:Cairo;font-weight:800;src:url(${staticFile('fonts/cairo-latin-800-normal.woff2')}) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;}
`;

const text: React.CSSProperties = {
  fontFamily: 'Cairo, sans-serif',
  direction: 'rtl',
  color: C.white,
  textAlign: 'center',
};

const Background: React.FC = () => {
  const f = useCurrentFrame();
  const shift = interpolate(f, [0, DURATION], [0, 40]);
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${180 + shift * 0.3}deg, ${C.navy} 0%, #0F4C81 45%, ${C.blue} 100%)`,
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const speed = 0.5 + i * 0.25;
        const x = ((f * speed * 2 + i * 380) % 1500) - 250;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: 180 + i * 330,
              left: x,
              width: 420 + i * 40,
              height: 120,
              borderRadius: 120,
              background: 'rgba(255,255,255,0.10)',
              filter: 'blur(14px)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Plane: React.FC<{size?: number}> = ({size = 120}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={C.white}>
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
  </svg>
);

const FadeUp: React.FC<{delay?: number; children: React.ReactNode}> = ({delay = 0, children}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: f - delay, fps, config: {damping: 14, stiffness: 110}});
  return (
    <div style={{opacity: p, transform: `translateY(${(1 - p) * 70}px)`}}>{children}</div>
  );
};

const SceneLogo: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: f, fps, config: {damping: 10, stiffness: 120}});
  const planeX = interpolate(f, [10, 80], [-300, 1400], {easing: Easing.inOut(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const planeY = interpolate(f, [10, 80], [520, 300], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', left: planeX, top: planeY, transform: 'rotate(90deg)'}}>
        <Plane size={140} />
      </div>
      <div
        style={{
          width: 340,
          height: 340,
          borderRadius: 90,
          background: `linear-gradient(135deg, ${C.sun}, #FF6B35)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${pop}) rotate(${(1 - pop) * -20}deg)`,
          boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
        }}
      >
        <span style={{fontFamily: 'Cairo', fontWeight: 800, fontSize: 190, color: C.white, direction: 'ltr'}}>FN</span>
      </div>
      <div style={{marginTop: 60, opacity: interpolate(f, [25, 45], [0, 1], {extrapolateRight: 'clamp'})}}>
        <div style={{...text, fontWeight: 800, fontSize: 120, letterSpacing: 14, direction: 'ltr'}}>FLY NEST</div>
      </div>
    </AbsoluteFill>
  );
};

const SceneSlogan: React.FC = () => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: 80}}>
    <FadeUp>
      <div style={{...text, fontWeight: 700, fontSize: 70, color: C.sky}}>فلاي نست للسياحة والسفر</div>
    </FadeUp>
    <div style={{height: 40}} />
    <FadeUp delay={12}>
      <div style={{...text, fontWeight: 800, fontSize: 150, lineHeight: 1.25}}>
        رحلتك
        <br />
        <span style={{color: C.sun}}>تبدأ من هنا</span>
      </div>
    </FadeUp>
  </AbsoluteFill>
);

const services = [
  {icon: '✈️', label: 'تذاكر طيران'},
  {icon: '🏨', label: 'حجوزات فنادق'},
  {icon: '🛂', label: 'تأشيرات سياحية'},
  {icon: '🏝️', label: 'برامج ورحلات سياحية'},
];

const SceneServices: React.FC = () => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: 70}}>
    <FadeUp>
      <div style={{...text, fontWeight: 800, fontSize: 90, marginBottom: 60}}>كل اللي تحتاجه للسفر</div>
    </FadeUp>
    {services.map((s, i) => (
      <FadeUp key={s.label} delay={12 + i * 14}>
        <div
          style={{
            direction: 'rtl',
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            width: 880,
            padding: '36px 50px',
            marginBottom: 34,
            borderRadius: 60,
            background: 'rgba(255,255,255,0.14)',
            border: '2px solid rgba(255,255,255,0.35)',
          }}
        >
          <span style={{fontSize: 90}}>{s.icon}</span>
          <span style={{fontFamily: 'Cairo', fontWeight: 700, fontSize: 68, color: C.white}}>{s.label}</span>
        </div>
      </FadeUp>
    ))}
  </AbsoluteFill>
);

const SceneExperience: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [5, 50], [0, 10], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}));
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <FadeUp>
        <div style={{...text, fontWeight: 800, fontSize: 380, color: C.sun, direction: 'ltr', lineHeight: 1}}>+{n}</div>
      </FadeUp>
      <FadeUp delay={10}>
        <div style={{...text, fontWeight: 800, fontSize: 110}}>سنوات خبرة</div>
        <div style={{...text, fontWeight: 400, fontSize: 60, color: C.sky, marginTop: 20}}>في تنظيم الرحلات وخدمات السفر</div>
      </FadeUp>
    </AbsoluteFill>
  );
};

const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = 1 + Math.sin(f / 5) * 0.03;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: 80}}>
      <FadeUp>
        <div style={{...text, fontWeight: 800, fontSize: 92, direction: 'ltr', lineHeight: 1.3}}>
          Nest Your Dreams,
          <br />
          <span style={{color: C.sun}}>Fly Beyond</span>
        </div>
      </FadeUp>
      <div style={{height: 90}} />
      <FadeUp delay={14}>
        <div
          style={{
            ...text,
            fontWeight: 800,
            fontSize: 68,
            padding: '34px 80px',
            borderRadius: 100,
            background: `linear-gradient(135deg, ${C.sun}, #FF6B35)`,
            transform: `scale(${pulse})`,
            boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
          }}
        >
          احجز رحلتك دلوقتي
        </div>
      </FadeUp>
      <div style={{height: 70}} />
      <FadeUp delay={24}>
        <div style={{...text, fontWeight: 700, fontSize: 60, direction: 'ltr', color: C.sky}}>flynest-eg.com</div>
        <div style={{...text, fontWeight: 700, fontSize: 52, direction: 'ltr', marginTop: 16}}>@flynest.eg</div>
      </FadeUp>
    </AbsoluteFill>
  );
};

export const FlyNestPromo: React.FC = () => (
  <AbsoluteFill>
    <style>{fontCss}</style>
    <Background />
    <Sequence from={0} durationInFrames={90}><SceneLogo /></Sequence>
    <Sequence from={90} durationInFrames={90}><SceneSlogan /></Sequence>
    <Sequence from={180} durationInFrames={120}><SceneServices /></Sequence>
    <Sequence from={300} durationInFrames={90}><SceneExperience /></Sequence>
    <Sequence from={390} durationInFrames={60}><SceneCTA /></Sequence>
  </AbsoluteFill>
);
