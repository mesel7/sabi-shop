"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const SLIDES = [
  { src: "/images/home/hero/coffee1.jpg", alt: "Coffee1" },
  { src: "/images/home/hero/coffee2.jpg", alt: "Coffee2" },
  { src: "/images/home/hero/coffee3.jpg", alt: "Coffee3" },
  { src: "/images/home/hero/coffee4.jpg", alt: "Coffee4" },
  { src: "/images/home/hero/coffee5.jpg", alt: "Coffee5" },
  { src: "/images/home/hero/coffee6.jpg", alt: "Coffee6" },
];

export default function HeroSwiper() {
  return (
    <section className="relative w-full">
      {/* 히어로 영역: 가로는 뷰포트 전체, 안에서 슬라이드 너비만 조절 */}
      <div className="relative w-full overflow-visible">
        {/* Prev */}
        <button
          aria-label="previous"
          className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-30
                     text-white/90 hover:text-white transition-colors duration-300
                     select-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 md:w-8 md:h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19 8 12l7-7"
            />
          </svg>
        </button>

        {/* Next */}
        <button
          aria-label="next"
          className="hero-next absolute right-4 top-1/2 -translate-y-1/2 z-30
                     text-white/90 hover:text-white transition-colors duration-300
                     select-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 md:w-8 md:h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 5 7 7-7 7"
            />
          </svg>
        </button>

        <Swiper
          modules={[Navigation]}
          loop
          centeredSlides
          slidesPerView="auto" // 폭은 슬라이드 CSS width가 결정
          spaceBetween={24}
          speed={1200}
          navigation={{
            prevEl: ".hero-prev",
            nextEl: ".hero-next",
          }}
          className="overflow-visible"
          style={
            {
              "--swiper-wrapper-transition-timing-function":
                "cubic-bezier(0.22,1,0.36,1)",
            } as React.CSSProperties
          }
        >
          {SLIDES.map((s, i) => (
            <SwiperSlide
              key={s.src}
              // clamp(최소, 뷰포트 비율, 최대)
              // 768 * 0.75 = 576, 1280 * 0.75 = 960
              // 뷰포트 더 넓어지면 여분 공간에 양옆 다음 이미지가 더 많이 보임
              className="
                group
                !w-[clamp(576px,75vw,960px)]
                transition-all duration-300
              "
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden shadow-lg">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  priority={i === 0}
                  sizes="(min-width:1280px) 960px, 75vw"
                  className="
                    object-cover
                    brightness-[0.95] contrast-[1.05] saturate-[0.9]
                    grayscale-[60%]
                    group-hover:grayscale-0
                    group-hover:brightness-100
                    group-hover:saturate-100
                    transition-all duration-300
                  "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
