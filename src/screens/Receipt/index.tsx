import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../components';
import _ from 'lodash';
import Page1 from './Page1';
import Page2 from './Page2';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { useAppSelector } from 'redux/store';
import { ReceiptProps, ReceiptState } from './receipt';

export default function Receipt() {
  const location = useLocation();
  const navigate = useNavigate();
  const { listAddress } = useAppSelector((state) => state.addressReducer);
  const [_pay, setPay] = useImmer<ReceiptState>({
    idReceiver: listAddress[0]?.id,
    note: '',
    typePayment: 1,
    idD: listAddress[0]?.idDistrict,
    idW: listAddress[0]?.idWard,
    addressInfo: listAddress[0],
  });

  useEffect(() => {
    if (location.pathname !== '/receipt' && _pay!.idReceiver === -1 ) {
      navigate('/receipt');
    }
  }, [location.pathname]);

  return (
    <div className='bg-[#F2F2F2]'>
      <Routes>
        <Route index element={<Page1 setPay={setPay} pay={_pay}/>} />
        <Route path={'pay'} element={<Page2 pay={_pay} setPay={setPay!} />} />
      </Routes>
    </div>
  );
}
