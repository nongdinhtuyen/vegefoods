import { useState, useEffect } from 'react';
import { Button, Col, Divider, Empty, Form, Image, Input, Modal, Radio, Row, Select, Space, Table } from 'antd';
import { FaRegListAlt } from 'react-icons/fa';
import { BiWallet } from 'react-icons/bi';
import actions from '../../redux/actions/receipt';
import addressActions from '../../redux/actions/address';
import { useAppDispatch, useAppSelector } from 'redux/store';
import _ from 'lodash';
import CustomImage from 'components/CustomImage';
import utils from 'common/utils';
import type { RadioChangeEvent } from 'antd';
import { ReceiptProps } from './receipt';
import useToggle from 'hooks/useToggle';

export default function Page2({ setPay, pay }: ReceiptProps) {
  const { cartData } = useAppSelector((state) => state.cartReducer);
  const { isOpen, open, close } = useToggle();
  const dispatch = useAppDispatch();

  const onChange = (e: RadioChangeEvent) => {
    setPay((draft) => {
      draft.typePayment = e.target.value;
    });
  };

  const handleOk = () => {
    if (pay?.typePayment === 0) {
      dispatch(actions.actionCreateReceipt({}));
    }
  };

  return (
    <>
      <div className='container m-auto py-10'>
        <div className='bg-white px-10 py-6 rounded-lg'>
          <div className='rounded-lg'>
            <div className='text-primary text-xl font-bold'>Thông tin đơn hàng</div>
            <Divider className='my-4' />
          </div>
          <Row>
            <Col span={14}>
              <div className='flex items-center gap-x-2'>
                <FaRegListAlt className='text-primary' size={18} />
                <div className='text-lg font-bold'>THÔNG TIN SẢN PHẨM</div>
              </div>
              {_.map(cartData.items, (item) => (
                <div key={item.idCart} className='rounded-md py-2 px-5 mt-3'>
                  <div className='flex items-center gap-x-6'>
                    <CustomImage height={80} className='object-contain' src={utils.baseUrlImage(item.productList.img)} />
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
                </div>
              ))}
            </Col>
            <Col offset={1} span={1}>
              <Divider type='vertical' className='h-full'/>
            </Col>
            <Col span={8}>
              <div className='flex items-center gap-x-2 mb-3'>
                <BiWallet className='text-primary' size={18} />
                <div className='text-lg font-bold'>PHƯƠNG THỨC THANH TOÁN</div>
              </div>
              <Radio.Group onChange={onChange} value={pay?.typePayment}>
                <Space direction='vertical' size='middle'>
                  <Radio value={0}>Thanh toán khi nhận hàng (COD)</Radio>
                  <Radio value={1}>Thanh toán online</Radio>
                </Space>
              </Radio.Group>
              <div className='mt-5 text-base font-semibold'>Nội dung</div>
              <Input.TextArea
                onChange={(e) =>
                  setPay((draft) => {
                    draft.note = e.target.value;
                  })
                }
                rows={4}
                showCount
                maxLength={150}
              />
              <div className='text-center mt-5'>
                <Button type='primary' onClick={open}>
                  Xác nhận
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Modal width={600} open={isOpen} footer={null} onCancel={close}>
        <Row>
          <Col span={8} className='text-center'>
            <div className='text-lg text-primary font-semibold'>Mã QR chuyển khoản</div>
            <Image preview={false} src={require('images/qa.png')} width={200} height={200} />
          </Col>
          <Col offset={2} span={14}>
            <div className='text-lg text-primary font-semibold text-center'>Thông tin chuyển khoản</div>
            <div className='text-xs rounded p-1 text-primary bg-[#F1F6EB] mt-1 mb-2'>
              Vui lòng chuyển đúng nội dung 1239856 để chúng tôi xác nhận thanh toán{' '}
            </div>
            <Row gutter={[0, 8]}>
              <Col span={10} className='text-right font-extrabold'>
                Chủ tài khoản:
              </Col>
              <Col offset={1} span={11}>
                Lưu Ngọc Lan
              </Col>
              <Col span={10} className='text-right font-extrabold'>
                Số tài khoản:
              </Col>
              <Col offset={1} span={11}>
                0041000151013
              </Col>
              <Col span={10} className='text-right font-extrabold'>
                Ngân hàng:
              </Col>
              <Col offset={1} span={11}>
                Vietcombank
              </Col>
              <Col span={10} className='text-right font-extrabold'>
                Số tiền:
              </Col>
              <Col offset={1} span={11}>
                0041000151013
              </Col>
              <Col span={10} className='text-right font-extrabold'>
                Nội dung:
              </Col>
              <Col offset={1} span={11}>
                1239856
              </Col>
            </Row>
            <div className='text-center'>
              <Button>Xác nhận thanh toán</Button>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
