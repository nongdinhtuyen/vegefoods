import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb(props) {
  return (
    <div className='hero-wrap hero-bread' style={{ backgroundImage: `url(${require('images/bg_1.jpg')})` }}>
      <div className='container'>
        <div className='row no-gutters slider-text align-items-center justify-content-center'>
          <div className='col-md-9 text-center'>
            <h1 className='mb-0 bread'>{props.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb;
