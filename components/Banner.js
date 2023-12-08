
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-5 tablet:h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
        emulateTouch={true}
        swipeable={true}
        
        
      >
        {/* <div>
            <img loading="lazy" src="/Images/1.webp" alt="" />
        </div> */}

        <div>
            <img loading="lazy" src="/Images/2.webp" alt="" />
        </div>
            
        <div>
            <img loading="lazy" src="/Images/3.webp" alt="" />
        </div>

        <div>
            <img loading="lazy" src="/Images/4.webp" alt="" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
