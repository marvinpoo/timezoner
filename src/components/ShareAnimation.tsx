import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import shareToCheckAnimation from '../assets/share-to-check.json';

interface ShareAnimationProps {
  isShared: boolean;
  onAnimationComplete?: () => void;
}

export const ShareAnimation: React.FC<ShareAnimationProps> = ({ 
  isShared, 
  onAnimationComplete 
}) => {
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    setDirection(isShared ? 1 : -1);
  }, [isShared]);

  return (
    <div className="share-animation">
      <Lottie
        animationData={shareToCheckAnimation}
        loop={false}
        autoplay={true}
        direction={direction}
        speed={1.5}
        style={{ width: 24, height: 24 }}
        initialSegment={isShared ? [0, 30] : [30, 60]}
        onComplete={onAnimationComplete}
      />
    </div>
  );
};