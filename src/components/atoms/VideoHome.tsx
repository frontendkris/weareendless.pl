import React, {useEffect, useRef, useState} from "react";

interface VideoProps {
  src: string;
  isActive: boolean;
}

const VideoHome: React.FC<VideoProps> = ({src, isActive}) => {
  const videoHomeHRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      videoHomeHRef.current?.play();
    } else {
      setIsVisible(false);
      videoHomeHRef.current?.pause();
    }
  }, [isActive]);

  return (
    <div
      className={`relative flex flex-col items-end w-full h-full mx-auto bg-brand-black border-none overflow-hidden aspect-video ${isVisible ? "opacity-0 fade-in !animate-duration-300 !animate-delay-300" : "opacity-100 fade-out !animate-duration-200"}`}
    >
      <video
        ref={videoHomeHRef}
        className="w-full h-full object-cover border-none"
        loop
        autoPlay
        muted
      >
        <source src={src} type="video/mp4" />
        Przepraszamy, twoja przeglądarka nie obsługuje wbudowanych filmów.
      </video>
      <h1 className="absolute inline h-max w-max left-0 lg:left-16 top-0 bottom-0 my-auto text-[7dvw] font-extrabold text-black font-gothic-718 leading-none">
        Nieskończoność
        <br /> – tego jeszcze nie było!
      </h1>
    </div>
  );
};

export default VideoHome;
