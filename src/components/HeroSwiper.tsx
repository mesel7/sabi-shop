"use client";

import { useMemo, useRef } from "react";
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

const DURATION = 1200; // 전환 속도(ms)
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)"; // 부드러운 ease-out

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function HeroSwiper() {
  // 3장씩 한 슬라이드
  const groups = useMemo(() => chunk(SLIDES, 3), []);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="relative w-full">
      {/* 바깥 프레임 */}
      <div className="mx-auto px-4 md:px-4">
        <div className="relative overflow-hidden">
          {/* 커스텀 네비게이션 버튼 */}
          <button
            ref={prevRef}
            aria-label="previous"
            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-30
                       text-white/90 hover:text-white transition-colors duration-300
                       select-none cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 md:w-8 md:h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19 8 12l7-7"
              />
            </svg>
          </button>

          <button
            ref={nextRef}
            aria-label="next"
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-30
                       text-white/90 hover:text-white transition-colors duration-300
                       select-none cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 md:w-8 md:h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 5 7 7-7 7"
              />
            </svg>
          </button>

          {/* Swiper 본체 */}
          <Swiper
            modules={[Navigation]}
            // 한 슬라이드 = 이미지 3장 묶음
            slidesPerView={1}
            spaceBetween={0}
            loop
            speed={DURATION}
            allowTouchMove
            // 커스텀 네비게이션 연결
            onBeforeInit={(swiper) => {
              // @ts-ignore - Swiper 타입이 좁아서 ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            // 이징 커스텀 (Swiper 9/10+에서 지원되는 CSS 변수)
            style={
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                "--swiper-wrapper-transition-timing-function": EASING,
              } as React.CSSProperties
            }
            className="overflow-hidden"
          >
            {groups.map((group, idx) => (
              <SwiperSlide key={idx}>
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {group.map((s, i) => (
                    <div
                      key={`${idx}-${i}`}
                      className="relative h-[520px] md:h-[600px] overflow-hidden"
                    >
                      <Image
                        src={s.src}
                        alt={s.alt}
                        fill
                        quality={85}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover brightness-[0.95] contrast-[1.05] saturate-[0.9]
                                   grayscale-[60%] hover:grayscale-0
                                   duration-300"
                      />
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
