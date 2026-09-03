"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export function Carousel({
  children,
  slideClass,
  autoplayMs = 4000,
  className = "",
  showControls = true,
}: {
  children: React.ReactNode;
  slideClass?: string;
  autoplayMs?: number;
  className?: string;
  showControls?: boolean;
}) {
  const items = Array.isArray(children) ? children : [children];
  const slide =
    slideClass ?? "basis-full sm:basis-1/2 lg:basis-1/3";

  return (
    <div className={`relative pb-10 ${className}`}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        loop={items.length > 1}
        speed={600}
        autoplay={{
          delay: autoplayMs,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: ".swiper-custom-prev",
          nextEl: ".swiper-custom-next",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          el: ".swiper-custom-pagination",
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="swiper-site"
      >
        {items.map((child, i) => (
          <SwiperSlide key={i} className={slide}>
            <div className="h-full">{child}</div>
          </SwiperSlide>
        ))}

        {showControls && (
          <>
            <button
              type="button"
              aria-label="Previous"
              className="swiper-custom-prev absolute left-4 top-[42%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-card transition hover:bg-primary hover:text-white md:flex"
            >
              <IoChevronBack className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="swiper-custom-next absolute right-4 top-[42%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-card transition hover:bg-primary hover:text-white md:flex"
            >
              <IoChevronForward className="h-5 w-5" />
            </button>
          </>
        )}
      </Swiper>

      <div className="swiper-custom-pagination relative z-10 mt-4 flex justify-center [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-primary [&_.swiper-pagination-bullet]:opacity-25 [&_.swiper-pagination-bullet-active]:opacity-100 [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet-active]:rounded-full" />
    </div>
  );
}
