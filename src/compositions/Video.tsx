import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Background} from '../components/Background';
import {Bullets} from '../components/Bullets';
import {Headline} from '../components/Headline';
import {Subtext} from '../components/Subtext';
import {theme} from '../styles/theme';

export const Video: React.FC = () => {
  const frame = useCurrentFrame();

  const scene1Opacity = interpolate(frame, [0, 20, 280, 300], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background />

      <Sequence from={0} durationInFrames={300}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            paddingLeft: theme.spacing.sidePadding,
            paddingRight: theme.spacing.sidePadding,
            opacity: scene1Opacity,
          }}
        >
          <div
            style={{
              marginTop: theme.spacing.contentTop,
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.stackGap,
              alignItems: 'flex-start',
            }}
          >
            <Headline text="NVIDIA acelera a IA aberta" />
            <Subtext text="Com arquitetura escalável e eficiência computacional, a plataforma impulsiona soluções de IA de ponta para empresas em todo o mundo." />
            <Bullets items={['Ecossistema aberto', 'Foco em plataforma', 'Escala global']} />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
