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
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StepsWrapper = styled(Steps)`
  .ant-steps-item-tail {
    font-size: 0;
  }
  .ant-steps-item-title {
    line-height: 1.5rem;
  }
`;

export default function OrderHistoryDetail() {
  const { cartData } = useAppSelector((state) => state.cartReducer);
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

  const renderIcon = (icon: React.ReactNode) => <div className='p-2 inline-flex text-white bg-primary rounded-full'>{icon}</div>;

  return (
    <div className='bg-[#F2F2F2]'>
      <div className='max-w-4xl m-auto py-3'>
        <div className='py-2 bg-white rounded-lg'>
          <div className='flex justify-between px-5 py-1 mb-2'>
            <div className='text-primary flex items-center gap-x-2 text-xl font-bold'>
              <IoChevronBackSharp />
              Đơn hàng
            </div>
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
              items={[
                {
                  title: 'Đặt hàng thành công',
                  description: '16:52:25 09/03/2023',
                  status: 'finish',
                  icon: renderIcon(<TbClipboardList />),
                },
                {
                  title: 'Đã phê duyệt',
                  description: '16:52:25 09/03/2023',
                  status: 'finish',
                  icon: renderIcon(<BsShieldCheck />),
                },
                {
                  title: 'Đang giao hàng',
                  description: '16:52:25 09/03/2023',
                  status: 'process',
                  icon: renderIcon(<FaShippingFast />),
                },
                {
                  title: 'Giao hàng thất bại',
                  description: '16:52:25 09/03/2023',
                  status: 'wait',
                  icon: renderIcon(<MdOutlineCancel />),
                },
              ]}
            />
            <Divider className='my-4' />
            <div className='flex items-center gap-x-2 mb-3 text-base'>
              <FiMapPin className='text-primary' size={20} /> THÔNG TIN NGƯỜI NHẬN
            </div>
            <div>{_receipt.data.receipt.addressList?.name}</div>
            <div>{_receipt.data.receipt.addressList?.phone}</div>
            <div>{_receipt.data.receipt.addressList?.address}</div>
            <Divider className='my-4' />
            <div>{_receipt.data.saleReceiptList?.note}</div>
            {_.map(_receipt.data.inforeceipt, (item: any) => (
              <div key={item.idProduct} className='rounded-md px-5 pt-3 bg-white mb-2'>
                <div className='flex items-center gap-x-6'>
                  <CustomImage height={110} className='object-contain' src={utils.baseUrlImage(item.productList.img)} />
                  <div className='flex flex-1 flex-wrap gap-y-1 text-base'>
                    <div className='w-1/2 font-bold'>Đơn vị</div>
                    <div className='w-1/2 text-right'>Giá bán: {utils.formatCurrency(item.price)} VNĐ</div>
                    <div className='w-1/2'>Đơn vị tính: {item.productList.unit}</div>
                    <div className='w-1/2 text-right'>x {item.quantity}</div>
                  </div>
                </div>
                <Divider className='m-0' />
                <div className='py-2 text-right text-lg'>
                  Tổng tiền: <span className='font-bold text-primary'>{utils.formatCurrency(item.price * item.quantity)}</span> VNĐ
                </div>
                <Divider className='m-0' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
