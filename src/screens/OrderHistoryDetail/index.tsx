import actions from '../../redux/actions/receipt';
import CustomSteps from './Steps';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal } from 'antd';
import BigNumber from 'bignumber.js';
import utils from 'common/utils';
import CustomImage from 'components/CustomImage';
import ProductComponent from 'components/ProductComponent';
import consts from 'consts';
import useToggle from 'hooks/useToggle';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/all';
import { BsShieldCheck } from 'react-icons/bs';
import { CgNotes } from 'react-icons/cg';
import { FaShippingFast } from 'react-icons/fa';
import { IoChevronBackSharp } from 'react-icons/io5';
import { MdOutlineCancel } from 'react-icons/md';
import { TbClipboardList } from 'react-icons/tb';
import { TiCancel } from 'react-icons/ti';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/store';
import styled from 'styled-components';
import { useImmer } from 'use-immer';

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
  const [_form] = Form.useForm();
  const { isOpen, close, open } = useToggle();
  const [_id, setId] = useState(0);

  const getData = () => {
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
  };

  useEffect(() => {
    getData();
  }, []);

  const cancelReceipt = (id) => {
    open();
    setId(id);
  };

  const handleCancel = () => {
    _form.resetFields();
    close();
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
            {_.includes(
              [consts.PRODUCT_STATUS.WAITING_FOR_APPROVAL, consts.PRODUCT_STATUS.APPROVED, consts.PRODUCT_STATUS.WAITING_FOR_DELIVERY],
              _receipt.data.receipt.status,
            ) && (
              <Button danger onClick={() => cancelReceipt(_receipt.data.receipt.id)}>
                Hủy đơn hàng
              </Button>
            )}
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
              listStatus={_receipt.data.receipt.listStatus}
            />
            <Divider className='my-4' />
            {_receipt.data.receipt.adminNote ? (
              <>
                <div className='flex items-center'>
                  <TiCancel className='text-primary' size={28} />
                  Đơn hàng bị hủy bởi admin
                </div>
                <div>Lý do: {_receipt.data.receipt.adminNote}</div>
                <Divider className='my-4' />
              </>
            ) : (
              ''
            )}
            {_receipt.data.receipt.note ? (
              <>
                <div className='flex items-center'>
                  <TiCancel className='text-primary' size={28} /> Hủy đơn đặt hàng
                </div>
                <div>Lý do: {_receipt.data.receipt.note}</div>
                <Divider className='my-4' />
              </>
            ) : (
              ''
            )}
            <div className='flex items-center gap-x-2 mb-3 text-base justify-between'>
              <div className='flex flex-col gap-y-1'>
                <div className='flex items-center gap-x-2 mb-1'>
                  <FiMapPin className='text-primary' size={20} /> THÔNG TIN NGƯỜI NHẬN
                </div>
                <div className='font-bold'>{_receipt.data.receipt?.nameReceiver}</div>
                <div>{_receipt.data.receipt?.phoneReceiver}</div>
                <div>{_receipt.data.receipt?.addressReceiver}</div>
              </div>
              {_receipt.data.receipt.typePayment === consts.TYPE_PAYMENT_ONLINE && _receipt.data.receipt.status === 0 && (
                <div className='text-center'>
                  <CustomImage
                    width={110}
                    src={`https://img.vietqr.io/image/BIDV-21510002320204-compact2.png?amount=${_receipt.data.receipt.totalAfterSale}&addInfo=${params.id}%5C&accountName=Nông%20Đình%20Tuyên`}
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
      <Modal
        title={<div className='text-2xl text-center'>{'Lí do hủy đơn hàng'}</div>}
        onCancel={() => {
          handleCancel();
        }}
        onOk={() => {
          _form.validateFields().then((value) => {
            dispatch(
              actions.actionCancelReceipt({
                params: {
                  id: _id,
                  note: new URLSearchParams(_form.getFieldsValue()).toString(),
                },
                callbacks: {
                  onSuccess(data) {
                    handleCancel();
                    getData();
                  },
                },
              }),
            );
          });
        }}
        open={isOpen}
        okText='Xác nhận'
        cancelText='Hủy'
      >
        <Form form={_form}>
          <Form.Item name='note' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
