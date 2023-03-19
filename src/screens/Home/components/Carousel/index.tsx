import { Carousel } from 'antd';

import CarouselItem from './item';
const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function CustomCarousel(props) {
  return (
    <section id='home-section' className='hero'>
      <div className='home-slider owl-carousel'>
        <Carousel effect='fade' autoplay dots={false}>
          <CarouselItem
            image={require('images/bg_1.jpg')}
            text='Chúng tôi phục vụ rau tươi &amp; trái cây'
            memo='Chúng tôi cung cấp rau hữu cơ &amp; hoa quả'
          />
          <CarouselItem image={require('images/bg_2.jpg')} text='100% Tươi &amp; Thức ăn hữu cơ' memo='Chúng tôi cung cấp rau hữu cơ &amp; hoa quả' />
        </Carousel>
      </div>
    </section>
  );
}

export default CustomCarousel;
