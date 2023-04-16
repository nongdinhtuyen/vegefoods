import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Divider, Empty, Image, Row, Table } from 'antd';
import { GrClose } from 'react-icons/gr';
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

  const handleRemove = (e, id, quantity) => {
    e.stopPropagation()
    dispatch(
      actions.actionRemoveCart({
        params: {
          pid: id,
          quantity,
        },
        callbacks: {
          onBeginning() {
          },
          onSuccess() {
            dispatch(actions.actionGetCartTotal({}));
            dispatch(actions.actionGetCart({}));
          },
        },
      }),
    );
  };

  return (
    <div className='bg-[#F2F2F2]'>
      <div className='max-w-4xl m-auto py-10'>
        <div className='bg-white rounded-lg px-5'>
          <div className='flex justify-between pt-3'>
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
                    description={item.productList.description}
                    isCart={true}
                    id={item.idProduct}
                  />
                  {/* <div className='flex items-center gap-x-6'>
                    <CustomImage height={110} className='object-contain' src={utils.baseUrlImage(item.productList.img)} />
                    <div className='flex flex-1 flex-wrap gap-y-1 text-base'>
                      <div className='w-1/2 font-bold'>Đơn vị</div>
                      <div className='w-1/2 text-right'>Giá bán: {utils.formatCurrency(item.price)} VNĐ</div>
                      <div className='w-1/2'>Đơn vị tính: {item.productList.unit}</div>
                      <div className='w-1/2 text-right'>x {item.quantity}</div>
                    </div>
                  </div> */}
                  <Divider className='m-0 mt-2' />
                </div>
              ))}
              <div className='py-2 text-right text-lg'>
                Tổng tiền: <span className='font-bold text-primary'>{utils.formatCurrency(cartDataTotal.totalPrice)}</span> VNĐ
                <Button className='ml-3' type='primary' onClick={() => navigate('/receipt')}>
                  Thanh toán
                </Button>
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
