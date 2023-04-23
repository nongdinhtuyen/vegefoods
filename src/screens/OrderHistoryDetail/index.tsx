import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Divider, Empty, Image, Space, Steps } from 'antd';

import actions from '../../redux/actions/receipt';
import { useAppDispatch, useAppSelector } from 'redux/store';
import _ from 'lodash';
import utils from 'common/utils';
import CustomImage from 'components/CustomImage';
import { useImmer } from 'use-immer';
import { IoChevronBackSharp } from 'react-icons/io5';
import { CgNotes } from 'react-icons/cg';
import { TbClipboardList } from 'react-icons/tb';
import { BsShieldCheck } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';
import { FiMapPin } from 'react-icons/all';
import { FaShippingFast } from 'react-icons/fa';
import styled from 'styled-components';
import consts from 'consts';
import ProductComponent from 'components/ProductComponent';
import CustomSteps from './Steps';
import BigNumber from 'bignumber.js';

export default function OrderHistoryDetail() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [_receipt, setReceipt] = useImmer<{ data: any; total: number }>({
    data: {
      inforeceipt: [],
      receipt: {},
    },
    total: 0,
  });
  const params = useParams();

  useEffect(() => {
    dispatch(
      actions.actionGetReceiptId({
        params: {
          id: params.id,
        },
        callbacks: {
          onSuccess({ data }) {
            setReceipt((draft) => {
              draft.data = data;
            });
          },
        },
      }),
    );
  }, []);

  return (
    <div className='bg-[#F2F2F2]'>
      <div className='container m-auto py-3'>
        <div className='py-2 bg-white rounded-lg'>
          <div className='flex justify-between px-5 py-1 mb-2'>
            <span className='text-primary flex items-center gap-x-2 text-xl font-bold cursor-pointer' onClick={() => navigate('/history')}>
              <IoChevronBackSharp />
              Đơn hàng {_receipt.data.receipt.id}
            </span>
          </div>
          <Divider className='my-2' />
          <div className='px-5 pt-2'>
            <div className='flex items-center gap-x-2 mb-3 text-base'>
              <CgNotes className='text-primary' size={20} /> TRẠNG THÁI ĐƠN HÀNG
            </div>
            <CustomSteps
              price={_receipt.data.receipt.totalAfterSale}
              status={_receipt.data.receipt.status}
              typePayment={_receipt.data.receipt.typePayment}
            />
            <Divider className='my-4' />
            <div className='flex items-center gap-x-2 mb-3 text-base justify-between'>
              <div className='flex flex-col gap-y-1'>
                <div className='flex items-center gap-x-2 mb-1'>
                  <FiMapPin className='text-primary' size={20} /> THÔNG TIN NGƯỜI NHẬN
                </div>
                <div className='font-bold'>{_receipt.data.receipt.addressList?.name}</div>
                <div>{_receipt.data.receipt.addressList?.phone}</div>
                <div>{_receipt.data.receipt.addressList?.address}</div>
              </div>
              {_receipt.data.receipt.typePayment === consts.TYPE_PAYMENT_ONLINE && (
                <div className='text-center'>
                  <CustomImage
                    width={110}
                    src={`https://img.vietqr.io/image/BIDV-21510002320204-compact.png?amount=${_receipt.data.receipt.total}&addInfo=${_receipt.data.receipt.idt}%5C&accountName=Nông%20Đình%20Tuyên`}
                  />
                </div>
              )}
            </div>
            <Divider className='my-4' />
            <div>{_receipt.data.saleReceiptList?.note}</div>
            {_.map(_receipt.data.inforeceipt, (item: any) => (
              <div key={item.idProduct} className='rounded-md px-5  bg-white'>
                <ProductComponent
                  img={item.productList.img}
                  price={item.price}
                  id={item.idProduct}
                  priceSale={item.priceSale}
                  unit={item.productList.unit}
                  quantity={item.quantity}
                  name={item.productList.name}
                  description={item.productList.description}
                />
                <Divider className='m-0' />
              </div>
            ))}
            <div className='py-2 text-right text-lg'>
              Tổng tiền:{' '}
              {new BigNumber(_receipt.data.receipt.total).isGreaterThan(_receipt.data.receipt.totalAfterSale) && (
                <del className='italic font-medium mr-2 text-gray-900'>{utils.formatCurrency(_receipt.data.receipt.total)}</del>
              )}
              <span className='font-bold text-primary'>{utils.formatCurrency(_receipt.data.receipt.totalAfterSale)}</span> VNĐ
            </div>
            <Divider className='mb-2 mt-0' />
            <div className='text-right'>
              Hình thức thanh toán:{' '}
              {_receipt.data.receipt.typePayment === consts.TYPE_PAYMENT_ONLINE ? 'Thanh toán online' : 'Thanh toán khi nhận hàng'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
