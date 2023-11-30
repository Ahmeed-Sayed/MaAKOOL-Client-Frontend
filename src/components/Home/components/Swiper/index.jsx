import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AppSwiper() {
  const [offers, setOffers] = useState([]);

  const fetchOffers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/resturant/offer/"
      );
      console.log(response.data);
      setOffers(response.data);
    } catch (error) {
      console.error("Error during fetching offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

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
          {offers.length > 0 &&
            offers.map((offer, index) => (
              <SwiperSlide key={index}>
                <div className="d-flex justify-content-center">
                  <Link to={"browse/"}>
                    <img
                      src={`http://127.0.0.1:8000${offer.image}`}
                      alt={`slide-${index + 1}`}
                      className="rounded"
                      style={{ width: "500px", height: "500px" }}
                    />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}
