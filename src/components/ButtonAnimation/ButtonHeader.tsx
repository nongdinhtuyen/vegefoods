import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

export default function ButtonHeader() {
  const navigate = useNavigate();

  return (
    <Button className='button-shop-now' onClick={() => navigate('/')} size="large" type='primary'>Xem chi tiết</Button>
  );
}
