import { Carousel } from 'antd';

import CarouselItem from './item';

function CustomCarousel(props) {
    return (
        <section id="home-section" className="hero">
            <div className="home-slider owl-carousel">
                <Carousel effect="fade" autoplay>
                    <CarouselItem
                        image='../../images/bg_1.jpg'
                        text='We serve Fresh Vegestables &amp; Fruits'
                        memo='We deliver organic vegetables &amp; fruits'
                    />
                    <CarouselItem
                        image='../../images/bg_2.jpg'
                        text='100% Fresh &amp; Organic Foods'
                        memo='We deliver organic vegetables &amp; fruits'
                    />
                </Carousel>
            </div>
        </section>
    );
}

export default CustomCarousel;