import { Container, Content } from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export function Carousel({ children }) {
  return (
    <Container>
      <Content>
        <Swiper
          grabCursor={true}
          loop={true}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            "@1.20": {
              slidesPerView: 4,
              spaceBetween: 130,
            },
          }}
          navigation={true}
          className="mySwiper"
        >
          <SwiperSlide>{children}</SwiperSlide>
        </Swiper>
      </Content>
    </Container>
  );
}
