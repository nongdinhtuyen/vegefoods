import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Divider, Empty, Steps } from 'antd';

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

const StepsWrapper = styled(Steps)`
  .ant-steps-item-tail {
    font-size: 5px;
  }
  .ant-steps-item-title {
    line-height: 1.5rem;
    white-space: nowrap;
  }
  .ant-steps-item-description {
    white-space: nowrap;
  }
  .ant-steps-item-content {
    width: fit-content !important;
  }
  .ant-steps-item-active,
  .ant-steps-item-finish {
    .item-active {
      padding: 0.5rem;
      display: inline-flex;
      color: #fff;
      background: #82ae46;
      border-radius: 50%;
    }
  }
  .ant-steps-item-wait {
    .item-active {
      padding: 0.5rem;
      display: inline-flex;
      border-radius: 50%;
      background: #0000000f;
      color: #000000a6;
    }
  }
`;

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

  const renderIcon = (icon: React.ReactNode) => <div className='item-active'>{icon}</div>;

  const renderStatus = () => {
    // Status
    // 0 – Chờ phê duyệt - 1
    // 1 – Đã phê duyệt - 1
    // 2 – Chờ xuất kho - 1
    // 3 – Đang giao hàng - 1
    // 4 – Giao hàng thành công - 2
    // 5 – Chờ duyệt hủy - 1
    // 6 – Đã hủy - 3
    switch (_receipt.data.receipt.status) {
      case 0:
        return 0;
      case 1:
      case 2:
        return 1;
      case 3:
        return 2;
      case 4:
        return 3;
      case 5:
        return 1;
      case 6:
        return 1;
      default:
        return 0;
    }
  };

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
            <StepsWrapper
              direction='horizontal'
              className='text-[0px]'
              labelPlacement='vertical'
              current={renderStatus()}
              items={[
                {
                  title: 'Đặt hàng thành công',
                  description: '16:52:25 09/03/2023',
                  icon: renderIcon(<TbClipboardList />),
                },
                {
                  title: 'Đã phê duyệt',
                  description: '16:52:25 09/03/2023',
                  icon: renderIcon(<BsShieldCheck />),
                },
                {
                  title: 'Đang giao hàng',
                  description: '16:52:25 09/03/2023',
                  icon: renderIcon(<FaShippingFast />),
                },
                {
                  title: 'Đã nhận được hàng',
                  description: '16:52:25 09/03/2023',
                  icon: renderIcon(<img src='/icons/received.png' width={24} height={19} />),
                },
              ]}
            />
            <Divider className='my-4' />
            <div className='flex items-center gap-x-2 mb-3 text-base'>
              <FiMapPin className='text-primary' size={20} /> THÔNG TIN NGƯỜI NHẬN
            </div>
            <div className='ml-8'>
              <div className='font-bold'>{_receipt.data.receipt.addressList?.name}</div>
              <div>{_receipt.data.receipt.addressList?.phone}</div>
              <div>{_receipt.data.receipt.addressList?.address}</div>
            </div>
            <Divider className='my-4' />
            <div>{_receipt.data.saleReceiptList?.note}</div>
            {_.map(_receipt.data.inforeceipt, (item: any) => (
              <div key={item.idProduct} className='rounded-md px-5  bg-white'>
                <ProductComponent
                  img={item.productList.img}
                  price={item.price}
                  unit={item.productList.unit}
                  quantity={item.quantity}
                  name={item.productList.name}
                  description={item.productList.description}
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
                <Divider className='m-0' />
              </div>
            ))}
            <div className='py-2 text-right text-lg'>
              Tổng tiền: <span className='font-bold text-primary'>{utils.formatCurrency(_receipt.data.receipt.totalAfterSale)}</span> VNĐ
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
