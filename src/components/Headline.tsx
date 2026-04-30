import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../styles/theme';

type HeadlineProps = {
  text: string;
};

export const Headline: React.FC<HeadlineProps> = ({text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const entry = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 110,
      mass: 0.9,
    },
  });

  const opacity = interpolate(entry, [0, 1], [0, 1]);
  const translateY = interpolate(entry, [0, 1], [60, 0]);
  const scale = interpolate(entry, [0, 1], [0.92, 1]);
  const pulse = 1 + Math.sin(frame * 0.12) * 0.04;

  return (
    <h1
      style={{
        margin: 0,
        color: theme.colors.white,
        fontSize: 88,
        lineHeight: 1.04,
        letterSpacing: -1.2,
        fontWeight: 700,
        fontFamily: theme.typography.fontFamily,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale * pulse})`,
        transformOrigin: 'left center',
        maxWidth: 1050,
      }}
    >
      NVIDIA <span style={{color: theme.colors.neonGreen}}>acelera</span> a IA aberta
    </h1>
  );
};
