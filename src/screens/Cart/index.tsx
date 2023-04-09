import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Divider, Empty, Image, Row, Table } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Breadcrumb } from '../../components';
import actions from '../../redux/actions/cart';
import { useAppSelector } from 'redux/store';
import _ from 'lodash';
import utils from 'common/utils';

export default function Cart() {
  const { cartData } = useAppSelector((state) => state.cartReducer);

  return (
    <div className='bg-[#F2F2F2]'>
      <Breadcrumb navi='Cart' name='My cart' />
      {!_.isEmpty(cartData.data?.items) ? (
        <div className='container py-20 !max-w-4xl'>
          {_.map(cartData.data.items, (item) => (
            <div className='bg-white rounded-md py-2 px-5 mt-3'>
              <div className='flex items-center gap-x-6'>
                <Image height={110} className='object-contain' src={utils.baseUrlImage(item.productList.img)} />
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
          {/* <div className='row justify-content-end'>
              <div className='col-lg-4 mt-5 cart-wrap  '>
                <div className='cart-total mb-3'>
                  <h3>Cart Totals</h3>
                  <p className='d-flex'>
                    <span>Subtotal</span>
                    <span>${props.cart.reduce((sum, value) => sum + value.price * value.quantity, 0).toFixed(2)}</span>
                  </p>
                  <p className='d-flex'>
                    <span>Delivery</span>
                    <span>$0.00</span>
                  </p>
                  <p className='d-flex total-price'>
                    <span>Total</span>
                    <span>${props.cart.reduce((sum, value) => sum + value.price * value.quantity, 0).toFixed(2)}</span>
                  </p>
                </div>
                <p>
                  <Link to='/checkout' className='btn btn-primary py-3 px-4'>
                    Proceed to Checkout
                  </Link>
                </p>
              </div>
            </div> */}
        </div>
      ) : (
        <div className='col-md-12 text-center cart-empty'>
          <Empty description='Giỏ hàng của bạn đang trống, hãy tiếp tục mua sắm' />
          <Link to='/shop' className='btn btn-primary'>
            Quay lại danh sách hàng hóa
          </Link>
        </div>
      )}
    </div>
  );
}
