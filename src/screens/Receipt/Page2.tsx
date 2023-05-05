import addressActions from '../../redux/actions/address';
import cartActions from '../../redux/actions/cart';
import actions from '../../redux/actions/receipt';
import { ReceiptProps } from './receipt';
import { Button, Col, Divider, Empty, Form, Image, Input, Modal, Radio, Row, Select, Space, Table } from 'antd';
import type { RadioChangeEvent } from 'antd';
import BigNumber from 'bignumber.js';
import { openNotification } from 'common/Notify';
import utils from 'common/utils';
import CustomImage from 'components/CustomImage';
import ProductComponent from 'components/ProductComponent';
import consts from 'consts';
import useToggle from 'hooks/useToggle';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { BiWallet } from 'react-icons/bi';
import { FaRegListAlt } from 'react-icons/fa';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/store';

export default function Page2({ setPay, pay }: ReceiptProps) {
  const { cartData, cartDataTotal } = useAppSelector((state) => state.cartReducer);
  const { profile } = useAppSelector((state) => state.userReducer);
  const { isOpen, open, close } = useToggle();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [_fee, setFee] = useState(0);

  const onChange = (e: RadioChangeEvent) => {
    const { value } = e.target;
    setPay((draft) => {
      draft.typePayment = value;
    });
  };

  const createReceipt = () => {
    dispatch(
      actions.actionCreateReceipt({
        params: {
          idReceiver: pay?.idReceiver,
          note: '',
          typePayment: pay?.typePayment,
        },
        callbacks: {
          onSuccess({ data }) {
            dispatch(cartActions.actionGetCartTotal({}));
            openNotification({
              description: 'Đặt hàng thành công',
              type: 'success',
            });
            navigate(`/history/${data}`);
          },
        },
      }),
    );
  };

  useEffect(() => {
    getFeeShip();
  }, []);

  const getFeeShip = () => {
    dispatch(
      addressActions.actionGetFeeShip({
        params: {
          idD: pay?.idD,
          idW: pay?.idW,
        },
        callbacks: {
          onSuccess({ data }) {
            setFee(data);
          },
        },
      }),
    );
  };

  const handleOk = (value) => {
    if (pay?.typePayment === consts.TYPE_PAYMENT_ONLINE) {
      open();
    } else {
      createReceipt();
    }
  };

  const onFinish = () => {
    createReceipt();
  };

  const renderSale = () => {
    const sale = new BigNumber(cartDataTotal.totalPrice)
      .times(100 - profile.rankList?.discount)
      .div(100)
      .toNumber();
    return sale;
  };

  const renderDiscount = () => {
    return new BigNumber(cartDataTotal.totalPrice).times(profile.rankList?.discount).div(100).toNumber();
  };

  const renderTotal = () => {
    // if (profile.rankList?.discount > 0) {
    //   return (
    //     <>
    //       <del className='italic mr-2 text-gray-900'>{utils.formatCurrency(cartDataTotal.totalPrice)}</del>
    //       <span className=''>{utils.formatCurrency(renderSale())}</span>
    //     </>
    //   );
    // }
    return <span className=''>{utils.formatCurrency(cartDataTotal.totalPrice)}</span>;
  };

  return (
    <>
      <div className='container m-auto py-10'>
        <div className='bg-white px-6 py-4 rounded-lg'>
          <div className='flex justify-between py-1'>
            <span className='text-primary flex items-center gap-x-2 text-xl font-bold cursor-pointer' onClick={() => navigate(-1)}>
              <IoChevronBackSharp />
              Thông tin đơn hàng
            </span>
          </div>
          <Divider className='my-3' />
          <Row>
            <Col span={15}>
              <div className='flex items-center gap-x-2'>
                <FaRegListAlt className='text-primary' size={18} />
                <div className='text-lg font-bold'>THÔNG TIN SẢN PHẨM</div>
              </div>
              {_.map(cartData.items, (item) => (
                <div key={item.idProduct} className='rounded-md py-2 px-5 mt-3'>
                  <ProductComponent
                    id={item.idProduct}
                    img={item.productList.img}
                    price={item.price}
                    priceSale={item.priceSale}
                    unit={item.productList.unit}
                    quantity={item.quantity}
                    name={item.productList.name}
                    description={item.productList.description}
                  />
                  <Divider className='m-0' />
                </div>
              ))}
              <div className=''>
                {/* <div className='flex-1'>
                  {profile.rankList?.discount > 0 && (
                    <div className='text-gray-600'>
                      Bạn đạt rank <span className='text-black font-semibold text-base'>{profile.rankList?.name}</span> được giảm giá{' '}
                      <span className='text-black font-semibold text-base'>{profile.rankList?.discount}%</span>
                    </div>
                  )}
                </div> */}
                <div className='inline-grid grid-cols-auto gap-x-4 gap-y-2 float-right text-gray-800 text-right items-center'>
                  <div className=''>Tổng tiền hàng:</div>
                  <span className='text-base'>{renderTotal()} VNĐ</span>
                  <div className=''>Phí vận chuyển:</div>
                  <span className='text-base'>{utils.formatCurrency(_fee)} VNĐ</span>
                  {profile.rankList?.discount > 0 && (
                    <>
                      {/* <div>
                        Bạn đạt rank <span className='text-black font-semibold text-base'>{profile.rankList?.name}</span> được giảm giá{' '}
                      </div> */}
                      <div>Giảm giá {`( -${profile.rankList?.discount}%)`}</div>
                      <span className='text-black text-base'>- {utils.formatCurrency(renderDiscount())} VNĐ</span>
                    </>
                  )}
                  <div className=''>Tổng thanh toán: </div>
                  <div>
                    <span className='text-2xl text-primary'>
                      {utils.formatCurrency(_fee + (profile.rankList?.discount > 0 ? renderSale() : cartDataTotal.totalPrice))}
                    </span>{' '}
                    VNĐ
                  </div>
                </div>
              </div>
            </Col>
            <Col offset={1} span={1}>
              <Divider type='vertical' className='h-full' />
            </Col>
            <Col span={7}>
              <div className='flex items-center gap-x-2 mb-3'>
                <BiWallet className='text-primary' size={18} />
                <div className='text-lg font-bold'>PHƯƠNG THỨC THANH TOÁN</div>
              </div>
              <Radio.Group onChange={onChange} value={pay?.typePayment}>
                <Space direction='vertical' size='middle'>
                  <Radio value={consts.TYPE_PAYMENT_COD}>Thanh toán khi nhận hàng (COD)</Radio>
                  <Radio value={consts.TYPE_PAYMENT_ONLINE}>Thanh toán online</Radio>
                </Space>
              </Radio.Group>
              <div className='text-center mt-5'>
                <Button type='primary' onClick={onFinish}>
                  Xác nhận
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Modal width={600} open={isOpen} footer={null} onCancel={close}>
        <Row gutter={10}>
          <Col span={10} className='text-center'>
            <div className='text-xl text-primary font-semibold mb-2'>Mã QR chuyển khoản</div>
            <CustomImage
              src={`https://img.vietqr.io/image/BIDV-21510002320204-compact.png?amount=${cartData.totalPrice}&addInfo=${cartData.items?.[0].idCart}%5C&accountName=Nông%20Đình%20Tuyên`}
            />
          </Col>
          <Col span={14}>
            <div className='text-xl text-primary font-semibold text-center'>Thông tin chuyển khoản</div>
            <div className='rounded p-1 text-primary bg-[#F1F6EB] mt-1 mb-2'>
              Vui lòng chuyển đúng nội dung {cartData.idCart} để chúng tôi xác nhận thanh toán{' '}
            </div>
            <Row gutter={[0, 5]}>
              <Col span={10} className='text-right text-lg font-extrabold'>
                Chủ tài khoản:
              </Col>
              <Col offset={1} span={11} className='text-lg'>
                Nông Đình Tuyên
              </Col>
              <Col span={10} className='text-right text-lg font-extrabold'>
                Số tài khoản:
              </Col>
              <Col offset={1} span={11} className='text-lg'>
                21510002320204
              </Col>
              <Col span={10} className='text-right text-lg font-extrabold'>
                Ngân hàng:
              </Col>
              <Col offset={1} span={11} className='text-lg'>
                BIDV
              </Col>
              <Col span={10} className='text-right text-lg font-extrabold'>
                Số tiền:
              </Col>
              <Col offset={1} span={11} className='text-lg'>
                {utils.formatCurrency(cartData.totalPrice)}
              </Col>
              {/* <Col span={10} className='text-right text-lg font-extrabold'>
                Nội dung:
              </Col>
              <Col offset={1} span={11} className='text-lg'>
                {cartData.items?.[0].idCart}
              </Col> */}
            </Row>
            <div className='text-center mt-4'>
              <Button onClick={onFinish} type='primary'>
                Xác nhận thanh toán
              </Button>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
