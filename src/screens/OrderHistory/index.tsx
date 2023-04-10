import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Divider, Empty } from 'antd';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from '../../redux/actions/receipt';
import { useAppDispatch, useAppSelector } from 'redux/store';
import _ from 'lodash';
import utils from 'common/utils';
import CustomImage from 'components/CustomImage';
import { useImmer } from 'use-immer';

export default function OrderHistory() {
  const { cartData } = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [_receipt, setReceipt] = useImmer({
    data: [],
    total: 0,
  });

  useEffect(() => {
    dispatch(
      actions.actionGetReceipt({
        params: {
          current: 0,
          count: 10,
        },
        callbacks: {
          onSuccess({ data, total }) {
            setReceipt((draft) => {
              draft.total = total;
              draft.data = data;
            });
          },
        },
      }),
    );
  }, []);

  return (
    <div className='bg-[#F2F2F2]'>
      <div className='max-w-4xl m-auto py-3'>
        <div className='flex justify-between px-5 py-2 mb-2 bg-white rounded-lg'>
          <div className='text-primary text-xl font-bold'>Lịch sử mua hàng</div>
        </div>
        {!_.isEmpty(_receipt.data) ? (
          _.map(_receipt.data, (item: any) => (
            <div key={item.Preview.idSaleReceipt} className='rounded-md px-5 pt-3 bg-white mb-2'>
              <div>
                Đơn hàng <span className='font-semibold'>{item.Preview.idSaleReceipt}</span> |{' '}
                {utils.formatTimeFromUnix(item.Salereceipt.createAt, 'hh:mm:ss DD/MM/YYYY')}
              </div>
              <div className='flex items-center gap-x-6'>
                <CustomImage height={110} className='object-contain' src={utils.baseUrlImage(item.Preview.productList.img)} />
                <div className='flex flex-1 flex-wrap gap-y-1 text-base'>
                  <div className='w-1/2 font-bold'>Đơn vị</div>
                  <div className='w-1/2 text-right'>Giá bán: {utils.formatCurrency(item.Preview.price)} VNĐ</div>
                  <div className='w-1/2'>Đơn vị tính: {item.Preview.productList.unit}</div>
                  <div className='w-1/2 text-right'>x {item.Preview.quantity}</div>
                </div>
              </div>
              <Divider className='m-0' />
              <div className='py-2 text-right text-lg'>
                Tổng tiền: <span className='font-bold text-primary'>{utils.formatCurrency(item.Preview.price * item.Preview.quantity)}</span> VNĐ
              </div>
              <Divider className='m-0' />
              <div className='py-3 text-right'>
                <Button type='primary' onClick={() => navigate(`/history/${item.Preview.idSaleReceipt}`)}>Chi tiết</Button>
              </div>
            </div>
          ))
        ) : (
          <div className='col-md-12 text-center cart-empty'>
            <Empty description='Bạn chưa mua đồ lần nào, hãy mua sắm để có thông tin' />
            <Link to='/shop' className='btn-primary'>
              Quay lại mua sắm
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
