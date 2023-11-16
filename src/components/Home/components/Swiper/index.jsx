import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

export default function AppSwiper() {
  return (
    <>
      <div className="container swip mt-5 d-flex align-items-center justify-content-center">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="d-flex justify-content-center">
              <img
                src="https://swiperjs.com/demos/images/nature-3.jpg"
                alt="slide-1"
                className="rounded"
                style={{ width: "500px", height: "400px" }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="d-flex justify-content-center">
              <img
                src="https://swiperjs.com/demos/images/nature-4.jpg"
                alt="slide-2"
                className="rounded"
                style={{ width: "500px", height: "400px" }}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
