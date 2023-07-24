import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Testimonial = () => {
  return (
    <div className="flex flex-col bg-[#191623] text-[#fff] p-8">
      <h1 className="text-4xl font-bold text-center p-2">What Clients Say</h1>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={2500}
        showStatus={false}
        showArrows={false}
        useKeyboardArrows={true}
        swipeable={true}
        stopOnHover={false}
        showIndicators={false}
      >
        <div className="flex flex-col  md:justify-center md:items-center  py-2">
          <p className="text-base md:text-xl md:max-w-3xl text-justify md:text-center text-[#C3BFD0] p-4">
            Dwelling has transformed the way I approach real estate. Their
            website&apos;s intuitive design and comprehensive property listings made
            it effortless to find my ideal home. The support team was incredibly
            helpful throughout the process. Dwelling is my go-to platform for
            all things real estate
          </p>
          <div className="flex flex-col md:flex-row md:justify-center md:items-center py-3">
            <div className="flex flex-col items-center md:px-4 sm:w-1/6 max-w-fit m-auto ">
              <img src="/images/test1.svg" alt="testimonial1" />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-[#ffff] text-2xl md:text-3xl">John Doe</h1>
              <p className="text-[#ffff] text-base md:text-xl opacity-80">
                CEO
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col  md:justify-center md:items-center  py-2">
          <p className="text-base md:text-xl md:max-w-3xl text-justify md:text-center text-[#C3BFD0] p-4">
            I&apos;ve been in the real estate industry for years, and Dwelling
            is a game-changer. Their website is top-notch, and their team is
            incredibly knowledgeable. Thanks to Dwelling, I found profitable
            investment properties with ease. I can&apos;t recommend them enough.
          </p>
          <div className="flex flex-col md:flex-row md:justify-center md:items-center py-3">
            <div className="flex flex-col items-center md:px-4 sm:w-1/6 max-w-fit m-auto ">
              <img src="/images/test1.svg" alt="testimonial1" />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-[#ffff] text-2xl md:text-3xl">
                Emily Johnson,
              </h1>
              <p className="text-[#ffff] text-base md:text-xl opacity-80">
                Entrepreneur
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col  md:justify-center md:items-center  py-2">
          <p className="text-base md:text-xl md:max-w-3xl text-justify md:text-center text-[#C3BFD0] p-4">
            Dwelling&apos;s user-friendly interface and exceptional customer
            service set them apart. They made my home buying process smooth and
            enjoyable. I&apos;m grateful for their expertise and support.
            Dwelling is the go-to platform for anyone in search of a perfect
            home.
          </p>
          <div className="flex flex-col md:flex-row md:justify-center md:items-center py-3">
            <div className="flex flex-col items-center md:px-4 sm:w-1/6 max-w-fit m-auto ">
              <img src="/images/test1.svg" alt="testimonial1" />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-[#ffff] text-2xl md:text-3xl">John Davis</h1>
              <p className="text-[#ffff] text-base md:text-xl opacity-80">
                Financial Analyst
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col  md:justify-center md:items-center  py-2">
          <p className="text-base md:text-xl md:max-w-3xl text-justify md:text-center text-[#C3BFD0] p-4">
            I&apos;ve never come across a real estate website as impressive as
            Dwelling. Their innovative features and personalized support made my
            property search a breeze. Thanks to Dwelling, I found my dream home
            quickly and effortlessly. Highly recommended
          </p>
          <div className="flex flex-col md:flex-row md:justify-center md:items-center py-3">
            <div className="flex flex-col items-center md:px-4 sm:w-1/6 max-w-fit m-auto ">
              <img src="/images/test1.svg" alt="testimonial1" />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-[#ffff] text-2xl md:text-3xl">
                Samantha Thompson
              </h1>
              <p className="text-[#ffff] text-base md:text-xl opacity-80">
                Manager
              </p>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Testimonial;
