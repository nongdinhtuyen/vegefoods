import actions from '../../redux/actions/cart';
import { Button, Col, Divider, Empty, Image, Row, Table } from 'antd';
import BigNumber from 'bignumber.js';
import { openNotification } from 'common/Notify';
import utils from 'common/utils';
import CustomImage from 'components/CustomImage';
import ProductComponent from 'components/ProductComponent';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/store';

export default function Cart() {
  const { cartData, cartDataTotal } = useAppSelector((state) => state.cartReducer);
  const { listAddress } = useAppSelector((state) => state.addressReducer);
  const { profile } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actions.actionGetCart({}));
  }, []);

  const handleRemove = (e, id, quantity) => {
    e.stopPropagation();
    dispatch(
      actions.actionRemoveCart({
        params: {
          pid: id,
          quantity,
        },
        callbacks: {
          onSuccess() {
            dispatch(actions.actionGetCartTotal({}));
            dispatch(actions.actionGetCart({}));
          },
        },
      }),
    );
  };

  const renderTotal = () => {
    if (profile.rankList?.discount > 0) {
      const sale = new BigNumber(cartDataTotal.totalPrice)
        .times(100 - profile.rankList?.discount)
        .div(100)
        .toNumber();
      return (
        <>
          <del className='italic font-medium mr-2 text-gray-900'>{utils.formatCurrency(cartDataTotal.totalPrice)}</del>
          <span className='font-bold text-primary'>{utils.formatCurrency(sale)}</span>
        </>
      );
    }
    return <span className='font-bold text-primary'>{utils.formatCurrency(cartDataTotal.totalPrice)}</span>;
  };

  const handlePay = () => {
    // if (_.isEmpty(listAddress)) {
    //   openNotification({
    //     description: 'Bạn cần thêm địa chỉ trước khi thanh toán',
    //     type: 'info',
    //   });
    //   navigate('/address');
    // } else {
    // }
    navigate('/receipt');
  };

  return (
    <div className='bg-[#F2F2F2]'>
      <div className='max-w-4xl m-auto py-10'>
        <div className='bg-white rounded-lg px-5 py-3'>
          <div className='flex justify-between'>
            <div className='text-primary text-xl font-bold'>Giỏ hàng</div>
          </div>
          {!_.isEmpty(cartData.items) ? (
            <>
              <Divider className='my-2' />
              {_.map(cartData.items, (item) => (
                <div key={item.idProduct} className='rounded-md py-3 relative'>
                  <span
                    className='w-6 h-6 absolute top-1 right-2 cursor-pointer flex items-center justify-center'
                    onClick={(e) => handleRemove(e, item.idProduct, item.quantity)}
                  >
                    <GrClose />
                  </span>
                  <ProductComponent
                    img={item.productList.img}
                    price={item.price}
                    priceSale={item.priceSale}
                    unit={item.productList.unit}
                    quantity={item.quantity}
                    name={item.productList.name}
                    remain={item.productList.remain}
                    description={item.productList.description}
                    isCart={true}
                    id={item.idProduct}
                  />
                  <Divider className='m-0 mt-2' />
                </div>
              ))}
              <div className='flex items-center justify-between'>
                <div>
                  {profile.rankList?.discount > 0 && (
                    <div className='text-gray-600'>
                      Bạn đạt rank <span className='text-black font-semibold text-base'>{profile.rankList?.name}</span> được giảm giá{' '}
                      <span className='text-black font-semibold text-base'>{profile.rankList?.discount}%</span>
                    </div>
                  )}
                </div>
                <div className='text-right text-lg'>
                  Tổng tiền: {renderTotal()} VNĐ
                  <Button className='ml-3' type='primary' onClick={handlePay}>
                    Thanh toán
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className='col-md-12 text-center cart-empty'>
              <Empty description='Giỏ hàng của bạn đang trống, hãy tiếp tục mua sắm' />
              <Link to='/' className='btn-primary'>
                Quay lại danh sách hàng hóa
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
