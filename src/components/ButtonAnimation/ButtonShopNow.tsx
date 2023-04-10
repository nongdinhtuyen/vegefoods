import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.scss';

export default function ButtonShopNow() {
  const navigate = useNavigate();
  return (
    <div className='button-shop-now'>
      <button className='learn-more' onClick={() => navigate('/shop')}>
        <span className='circle' aria-hidden='true'>
          <span className='icon arrow'></span>
        </span>
        <span className='button-text'>Xem chi tiết</span>
      </button>
    </div>
  );
}
