import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Navigation, Thumbs } from "swiper/modules";

export default function DetailPageImg({ imgs }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="mySwiper2"
      >
        {imgs.map((img) => (
          <SwiperSlide key={img.id}>
            <img
              src={img.file}
              alt={`Slide ${img.id}`}
              className="h-full w-full object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper onSwiper={setThumbsSwiper} className="mySwiper mySwiper1">
        {imgs.map((img) => (
          <SwiperSlide key={img.id}>
            <img
              src={img.file}
              alt={`Thumbnail ${img.id}`}
              className="h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
