import React, { useState, useEffect } from 'react';

type LoadingScreenProps = {
  setClicked: (clicked: boolean) => void;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ setClicked }) => {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);

  useEffect(() => {
    if (loadingProgress < 100) {
      const randomIncrement = Math.floor(Math.random() * 10) + 1;
      const timer = setTimeout(() => {
        setLoadingProgress(prevProgress => Math.min(prevProgress + randomIncrement, 100));
      }, 30);
      return () => clearTimeout(timer);
    } else {
      setLoadingComplete(true);
    }
  }, [loadingProgress]);

  return (
    <div className="-translate-y-[96px]">
      {loadingComplete ? (
        <div 
          onClick={() => setClicked(true)} 
          className="px-12 py-4 border rounded-full text-xl border-brand-gray cursor-pointer hover:bg-brand-gray hover:text-brand-black transition-colors animate-fade-up animate-once animate-ease-out"
        >
          Let's begin!
        </div>
      ) : (
        <div className="text-5xl">{loadingProgress}%</div>
      )}
    </div>
  );
};

export default LoadingScreen;
