import * as React from 'react';
// import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel';

function DemoCarousel() {
  return (
    <Carousel>
      <div>
        <img src="https://cf.shopee.vn/file/a77667c92763c339a27904adfe17ee4f" />
        {/* <p className="legend">Legend 1</p> */}
      </div>
      <div>
        <img src="https://cf.shopee.vn/file/efa1900fe561c4d01ecb44b7eb779996" />
        {/* <p className="legend">Legend 2</p> */}
      </div>
      <div>
        <img src="https://cf.shopee.vn/file/df39e3259774183b81073ae24ec85f35" />
        {/* <p className="legend">Legend 3</p> */}
      </div>
      <div>
        <img src="https://cf.shopee.vn/file/235c4cc05b1bfd7db342f47db3d84a2b" />
        {/* <p className="legend">Legend 3</p> */}
      </div>
      <div>
        <img src="https://cf.shopee.vn/file/5c22b5fac710fb54a0b78e687c5c9f07" />
        {/* <p className="legend">Legend 3</p> */}
      </div>
      <div>
        <img src="https://cf.shopee.vn/file/f4acbcad3dbd1dd04037e321bc8225da" />
        {/* <p className="legend">Legend 3</p> */}
      </div>
      <div>
        <img src="https://cf.shopee.vn/file/6bea2bab2332171f52846c38c2562060" />
        {/* <p className="legend">Legend 3</p> */}
      </div>
      <div>
        <img src="https://cf.shopee.vn/file/8aa501d87a05896ea76fadbf982cae83" />
        {/* <p className="legend">Legend 3</p> */}
      </div>
    </Carousel>
  );
}

if (process.env.NODE_ENV !== 'production') {
  DemoCarousel.displayName = 'components__DemoCarousel';
}

DemoCarousel.defaultProps = {};

export default DemoCarousel;
