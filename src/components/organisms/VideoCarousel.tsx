import React, { useCallback, useEffect, useId, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import VideoSlide from "@/components/atoms/VideoSlide";
import { Navigation, EffectFade, Keyboard } from "swiper/modules";
import VideoHome from "../atoms/VideoHome";
import Arrow from "../Icons/Arrow";

const heroUrl: string =
  "https://res.cloudinary.com/drxgmtvxx/video/upload/v1709655262/yws4fx4lqnaldscwblxz.mp4";

const videoUrls: string[] = [
  "https://res.cloudinary.com/drxgmtvxx/video/upload/v1709609785/djq3clekeepqqwtzlqjq.mp4",
  "https://weareendless.pl/wp-content/uploads/2022/12/ENDLESS_reel_v03_1240x726.mp4",
];

const VideoSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const id = useId();
  const swiperRef = React.useRef<any>(null);

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    console.log(queryParameters);
    if (queryParameters) {
      const slideIndex = parseInt(queryParameters.get("reel") || "0");
      swiperRef.current.slideTo(slideIndex, 300);
    }
  }, [swiperRef]);

  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slideNext();
  }, []);

  return (
    <div className="scroll-section ingnore-observer video-carousel">
      <Swiper
        ref={swiperRef}
        onSwiper={(swiper: any) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Keyboard, EffectFade]}
        // effect='fade'
        onSlideChange={(swiper: any) => setActiveIndex(swiper.activeIndex)}
        spaceBetween={0}
        slidesPerView={1}
        className="swiper-container"
        keyboard={{ enabled: true }}
      >
        <SwiperSlide key={`${id}-home-slide`} className="video-slide">
          <VideoHome src={heroUrl} isActive={0 === activeIndex} />
        </SwiperSlide>
        {videoUrls.map((url, index) => (
          <SwiperSlide key={`${id}-${index}`} className="video-slide">
            <VideoSlide src={url} isActive={index + 1 === activeIndex} />
          </SwiperSlide>
        ))}
        <div className="flex items-center justify-between container h-32 min-h-max z-10">
          <Arrow
            className={`opacity-0 transition-opacity ${activeIndex === 0 ? "pointer-events-none" : "fade-in"} rotate-180 cursor-pointer !animate-duration-200`}
            onClick={handlePrev}
          />
          <Arrow
            className={`opacity-0 transition-opacity ${activeIndex === videoUrls.length ? "pointer-events-none" : "fade-in"} cursor-pointer !animate-duration-200`}
            onClick={handleNext}
          />
        </div>
      </Swiper>
    </div>
  );
};

export default VideoSlider;
