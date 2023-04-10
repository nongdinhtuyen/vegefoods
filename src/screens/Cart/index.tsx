import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Divider, Empty, Image, Row, Table } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Breadcrumb } from '../../components';
import actions from '../../redux/actions/cart';
import { useAppDispatch, useAppSelector } from 'redux/store';
import _ from 'lodash';
import utils from 'common/utils';
import CustomImage from 'components/CustomImage';

export default function Cart() {
  const { cartData } = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actions.actionGetCart({}));
  }, []);

  return (
    <div className='bg-[#F2F2F2]'>
      {/* <Breadcrumb name='Giỏ hàng' /> */}
      <div className='max-w-4xl m-auto py-10'>
        <div className='bg-white py-2 rounded-lg'>
          <div className='flex justify-between px-5 py-2'>
            <div className='text-primary text-xl font-bold'>Giỏ hàng</div>
            {!_.isEmpty(cartData.items) &&<Button type='primary' onClick={() => navigate('/receipt')}>
              Thanh toán
            </Button> }
          </div>
          {!_.isEmpty(cartData.items) ? (
            <>
              <Divider className='my-2' />
              {_.map(cartData.items, (item) => (
                <div key={item.idCart} className='rounded-md py-2 px-5 mt-3'>
                  <div className='flex items-center gap-x-6'>
                    <CustomImage height={110} className='object-contain' src={utils.baseUrlImage(item.productList.img)} />
                    <div className='flex flex-1 flex-wrap gap-y-1 text-base'>
                      <div className='w-1/2 font-bold'>Đơn vị</div>
                      <div className='w-1/2 text-right'>Giá bán: {item.price} VNĐ</div>
                      <div className='w-1/2'>Đơn vị tính: {item.productList.unit}</div>
                      <div className='w-1/2 text-right'>x {item.quantity}</div>
                    </div>
                  </div>
                  <Divider className='m-0' />
                  <div className='py-2 text-right text-lg'>
                    Tổng tiền: <span className='font-bold text-primary'>{item.price * item.quantity}</span> VNĐ
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className='col-md-12 text-center cart-empty'>
              <Empty description='Giỏ hàng của bạn đang trống, hãy tiếp tục mua sắm' />
              <Link to='/shop' className='btn-primary'>
                Quay lại danh sách hàng hóa
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
