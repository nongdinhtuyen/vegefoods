import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../components';
import _ from 'lodash';
import Page1 from './Page1';
import Page2 from './Page2';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';

export default function Receipt() {
  const location = useLocation();
  const navigate = useNavigate();
  const [_pay, setPay] = useImmer({
    idReceiver: -1,
    note: '',
    typePayment: 1,
  });

  useEffect(() => {
    if (location.pathname !== '/receipt' && _pay.idReceiver === -1 ) {
      navigate('/receipt');
    }
  }, [location.pathname]);

  return (
    <div className='bg-[#F2F2F2]'>
      {/* <Breadcrumb name='Thanh toán' /> */}
      <Routes>
        <Route index element={<Page1 setPay={setPay} />} />
        <Route path={'pay'} element={<Page2 pay={_pay} setPay={setPay} />} />
      </Routes>
    </div>
  );
}
