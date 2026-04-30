import {interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../styles/theme';

type SubtextProps = {
  text: string;
};

export const Subtext: React.FC<SubtextProps> = ({text}) => {
  const frame = useCurrentFrame();
  const delayed = Math.max(0, frame - 10);

  const opacity = interpolate(delayed, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(delayed, [0, 30], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <p
      style={{
        margin: 0,
        color: theme.colors.white,
        opacity,
        transform: `translateY(${translateY}px)`,
        fontSize: 34,
        lineHeight: 1.4,
        maxWidth: 1000,
        fontWeight: 400,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      {text}
    </p>
  );
};
