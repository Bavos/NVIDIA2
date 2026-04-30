import {interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../styles/theme';

type BulletsProps = {
  items: string[];
};

export const Bullets: React.FC<BulletsProps> = ({items}) => {
  const frame = useCurrentFrame();

  return (
    <ul
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      {items.map((item, index) => {
        const localFrame = Math.max(0, frame - index * 5);
        const opacity = interpolate(localFrame, [0, 24], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const translateY = interpolate(localFrame, [0, 24], [30, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <li
            key={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              opacity,
              transform: `translateY(${translateY}px)`,
              color: theme.colors.white,
              fontFamily: theme.typography.fontFamily,
              fontSize: 38,
              fontWeight: 500,
            }}
          >
            <span style={{color: theme.colors.neonGreen, fontWeight: 700}}>▸</span>
            {item}
          </li>
        );
      })}
    </ul>
  );
};
