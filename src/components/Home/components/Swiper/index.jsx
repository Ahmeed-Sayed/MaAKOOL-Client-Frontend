import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "./styles.css";
export default function AppSwiper() {
  return (
    <>
      <div className="container swip mt-5 w-75">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="d-flex justify-content-center">
              <img
                src="https://swiperjs.com/demos/images/nature-1.jpg"
                width={"600px"}
                height={"500px"}
                className="rounded"
              />{" "}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="d-flex justify-content-center">
              <img
                src="https://swiperjs.com/demos/images/nature-2.jpg"
                width={"600px"}
                height={"500px"}
                className="rounded"
              />{" "}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="d-flex justify-content-center">
              <img
                src="https://swiperjs.com/demos/images/nature-3.jpg"
                width={"600px"}
                height={"500px"}
                className="rounded"
              />{" "}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
