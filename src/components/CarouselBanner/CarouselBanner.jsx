import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselBanner = () => {
  return (
    <div >
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={false}
        interval={4000}
        showStatus={false}
        showArrows={false}
        useKeyboardArrows={true}
        swipeable={true}
        stopOnHover={false}
        showIndicators={false}
      >
        <div>
          <img src="/images/bb4.jpg" alt="Image 1" />
        </div>
        <div>
          <img src="/images/bb5.jpg" alt="Image 2" />
        </div>
        <div>
          <img src="/images/bb6.jpg" alt="Image 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselBanner;
