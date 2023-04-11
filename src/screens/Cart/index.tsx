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
import ProductComponent from 'components/ProductComponent';

export default function Cart() {
  const { cartData, cartDataTotal } = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actions.actionGetCart({}));
  }, []);

  return (
    <div className='bg-[#F2F2F2]'>
      <div className='max-w-4xl m-auto py-10'>
        <div className='bg-white rounded-lg px-5'>
          <div className='flex justify-between pt-3'>
            <div className='text-primary text-xl font-bold'>Giỏ hàng</div>
            {!_.isEmpty(cartData.items) && (
              <Button type='primary' onClick={() => navigate('/receipt')}>
                Thanh toán
              </Button>
            )}
          </div>
          {!_.isEmpty(cartData.items) ? (
            <>
              <Divider className='my-2' />
              {_.map(cartData.items, (item) => (
                <div key={item.idCart} className='rounded-md py-2 mt-3'>
                  <ProductComponent img={item.productList.img} price={item.price} unit={item.productList.unit} quantity={item.quantity} />
                  {/* <div className='flex items-center gap-x-6'>
                    <CustomImage height={110} className='object-contain' src={utils.baseUrlImage(item.productList.img)} />
                    <div className='flex flex-1 flex-wrap gap-y-1 text-base'>
                      <div className='w-1/2 font-bold'>Đơn vị</div>
                      <div className='w-1/2 text-right'>Giá bán: {utils.formatCurrency(item.price)} VNĐ</div>
                      <div className='w-1/2'>Đơn vị tính: {item.productList.unit}</div>
                      <div className='w-1/2 text-right'>x {item.quantity}</div>
                    </div>
                  </div> */}
                  <Divider className='m-0' />
                </div>
              ))}
              <div className='pb-2 text-right text-lg'>
                Tổng tiền: <span className='font-bold text-primary'>{utils.formatCurrency(cartDataTotal.totalPrice)}</span> VNĐ
              </div>
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
