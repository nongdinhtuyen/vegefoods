import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default function ButtonShopNow() {
  return (
    <div className='button-shop-now'>
      <button className='learn-more'>
        <span className='circle' aria-hidden='true'>
          <span className='icon arrow'></span>
        </span>
        <span className='button-text'>Xem chi tiết</span>
      </button>
    </div>
  );
}
