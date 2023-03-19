import { Button } from 'antd';
import ButtonHeader from 'components/ButtonAnimation/ButtonHeader';
import { Link } from 'react-router-dom';

function CaroselItem(props) {
  const { image, text, memo } = props;

  return (
    <div className='slider-item' style={{ backgroundImage: `url(${image})` }}>
      <div className='overlay' />
      <div className='container'>
        <div className='row slider-text justify-content-center align-items-center' data-scrollax-parent='true'>
          <div className='col-md-12 text-center'>
            <h1 className='mb-2'>{text}</h1>
            <h2 className='subheading mb-4'>{memo}</h2>
            <div>
              <ButtonHeader />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaroselItem;
