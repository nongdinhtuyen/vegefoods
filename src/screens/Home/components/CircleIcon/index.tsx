import classNames from 'classnames';
import _ from 'lodash';

function CircleIcon(props) {
  const mapNavbar = [
    {
      text: 'Giao hàng miễn phí',
      description: 'Đặt hàng trên $100',
      icon: 'flaticon-shipped',
      bg: 'bg-[#e4b2d6]'
    },
    {
      text: 'Luôn tươi mới',
      description: 'Đóng gói cẩn thận',
      icon: 'flaticon-diet',
      bg: 'bg-[#dcc698]'
    },
    {
      text: 'Chất lượng vượt trội',
      description: 'Sản phẩm chất lượng',
      icon: 'flaticon-award',
      bg: 'bg-[#a2d1e1]'
    },
    {
      text: 'Hỗ trợ',
      description: 'Hỗ trợ 24/7',
      icon: 'flaticon-customer-service',
      bg: 'bg-[#dcd691]'
    },
  ];
  return (
    <section className='ftco-section'>
      <div className='container'>
        <div className='flex justify-between items-center text-center'>
          {_.map(mapNavbar, (item, index) => (
            <div className='flex items-center flex-col' key={index}>
              <div className={`w-24 h-24 rounded-full transition flex items-center justify-center ${item.bg}`}>
                <span className={classNames(item.icon, 'text-white text-5xl')} />
              </div>
              <div className='mt-2'>
                <div className='text-base uppercase font-bold'>{item.text}</div>
                <span className='opacity-50 uppercase'>{item.description}</span>
              </div>
            </div>
          ))}
          {/* <div className='col-md-3 text-center d-flex align-self-stretch'>
            <div className='media block-6 services mb-md-0 mb-4'>
              <div className='icon bg-color-1 active d-flex justify-content-center align-items-center mb-2'>
                <span className='flaticon-shipped'></span>
              </div>
              <div className='media-body'>
                <h3 className='heading'>Free Shipping</h3>
                <span>On order over $100</span>
              </div>
            </div>
          </div>
          <div className='col-md-3 text-center d-flex align-self-stretch'>
            <div className='media block-6 services mb-md-0 mb-4'>
              <div className='icon bg-color-2 d-flex justify-content-center align-items-center mb-2'>
                <span className='flaticon-diet'></span>
              </div>
              <div className='media-body'>
                <h3 className='heading'>Always Fresh</h3>
                <span>Product well package</span>
              </div>
            </div>
          </div>
          <div className='col-md-3 text-center d-flex align-self-stretch'>
            <div className='media block-6 services mb-md-0 mb-4'>
              <div className='icon bg-color-3 d-flex justify-content-center align-items-center mb-2'>
                <span className='flaticon-award'></span>
              </div>
              <div className='media-body'>
                <h3 className='heading'>Superior Quality</h3>
                <span>Quality Products</span>
              </div>
            </div>
          </div>
          <div className='col-md-3 text-center d-flex align-self-stretch'>
            <div className='media block-6 services mb-md-0 mb-4'>
              <div className='icon bg-color-4 d-flex justify-content-center align-items-center mb-2'>
                <span className='flaticon-customer-service'></span>
              </div>
              <div className='media-body'>
                <h3 className='heading'>Support</h3>
                <span>24/7 Support</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default CircleIcon;
