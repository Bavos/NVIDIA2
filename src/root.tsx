import {Composition} from 'remotion';
import {Video} from './compositions/Video';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TechInstitutionalVideo"
      component={Video}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
