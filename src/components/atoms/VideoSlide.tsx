import React, { useEffect, useRef, useState } from 'react';

interface VideoProps {
  isActive: boolean;
  src: string;
}

const VideoSlide: React.FC<VideoProps> = ({ src, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(()=>{
    if (isActive) {
      setIsVisible(true)
      videoRef.current?.play();
    } else {
      setIsVisible(false)
      videoRef.current?.pause();
    }
  }, [isActive])

  return (
    <div className={`flex w-auto h-auto max-h-full m-auto rounded-[50px] shadow-md bg-black border border-brand-gray overflow-hidden aspect-video ${isVisible ? "opacity-0 fade-in !animate-duration-200 !animate-delay-200" : "opacity-100 fade-out !animate-duration-200"}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover border-none"
        loop autoPlay
      >
        <source src={src} type="video/mp4" />
        Przepraszamy, twoja przeglądarka nie obsługuje wbudowanych filmów.
      </video>
    </div>
  );
};

export default VideoSlide;
