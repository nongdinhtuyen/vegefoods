import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Breadcrumb } from '../../components';
import { Rate, Image, Button, Form, Input, InputNumber, notification, Space, List, Carousel } from 'antd';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import productActions from '../../redux/actions/product';
import cartActions from '../../redux/actions/cart';
import { useImmer } from 'use-immer';
import utils from 'common/utils';
import { openNotification } from 'common/Notify';
import { DEFAULT_SMALL_PAGE_SIZE } from 'consts';
import { Comment } from '@ant-design/compatible';
import { FaUser } from 'react-icons/fa';
import _ from 'lodash';
import CustomImage from 'components/CustomImage';
import { CarouselRef } from 'antd/es/carousel';
import styled from 'styled-components';
import { TiChevronLeft, TiChevronRight } from 'react-icons/ti';
import { useAppSelector } from 'redux/store';

const { TextArea } = Input;
const CarouselWrapper = styled.div`
  position: relative;
  height: 300px;
  .icon {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 99px;
    background-color: #b4b5b6;
    translate: 0% -50%;
    top: 50%;
    z-index: 999;
    cursor: pointer;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    &:hover {
      opacity: 0.7;
    }
  }
  .previous {
    left: 0;
  }
  .next {
    right: 0;
  }
`;

export default function Product() {
  const [_total, setTotal] = useState(1);
  const ref = useRef<CarouselRef | null>(null);
  const [_product, setProduct] = useState<any>({});
  const [_rate, setRate] = useState(5);
  const [_sale, setSale] = useState(0);
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const { cartData } = useAppSelector((state) => state.cartReducer);
  const [_comments, setComments] = useImmer({
    data: [],
    current: 1,
    total: 0,
    loading: false,
  });
  const [_products, setProducts] = useImmer({
    total: 0,
    current: 1,
    data: {
      products: [],
      salePrices: {},
    },
  });
  const [_images, setImages] = useState([]);
  const [_form] = Form.useForm();

  useEffect(() => {
    setTotal(1);
    dispatch(
      productActions.actionGetProductById({
        params: id,
        callbacks: {
          onSuccess({ data }) {
            setProduct(data.product);
            setSale(data.salePrice);
            getListProducts(data.product.idType);
          },
        },
      }),
    );
    dispatch(
      productActions.actionGetProductImageById({
        params: id,
        callbacks: {
          onSuccess({ data }) {
            setImages(data);
          },
        },
      }),
    );
    getComments();
  }, [id]);

  const getListProducts = (productType) => {
    dispatch(
      productActions.actionGetProducts({
        params: {
          current: 1,
          count: 4,
          productType,
        },
        callbacks: {
          onSuccess({ data, total }) {
            setProducts((draft) => {
              draft.total = total;
              draft.data = data;
            });
          },
        },
      }),
    );
  };

  function customRound(num) {
    const decimal = num % 1;
    if (decimal >= 0.4 && decimal < 0.5) {
      return Math.ceil(num);
    } else if (decimal >= 0.8 || decimal === 0) {
      return Math.ceil(num);
    } else {
      return Math.floor(num);
    }
  }

  const handleRate = (value) => {
    setRate(parseInt(value, 10));
  };

  const getCart = () => {
    dispatch(cartActions.actionGetCartTotal({}));
    dispatch(cartActions.actionGetCart({}));
  };

  const addCart = () => {
    const checkItem = _.find(cartData.items, (item) => item.idProduct == id);
    const checkRemainIfExist = _product.remain - checkItem?.quantity;
    const checkRemainFull = _product.remain - checkItem?.quantity - _total;
    const checkRemain = _product.remain - _total;
    if (checkRemainFull < 0 && checkRemainIfExist > 0) {
      openNotification({
        description: `Trong giỏ hàng của bạn đã có ${checkItem?.quantity} sản phẩm, bạn chỉ có thể thêm tối đa ${checkRemainIfExist} sản phẩm`,
        type: 'warning',
      });
      return;
    }
    if (checkRemainFull < 0) {
      openNotification({
        description: `Bạn không thể thêm sản phẩm vì giỏ hàng của bạn vượt quá số lượng sản phẩm khả dụng`,
        type: 'warning',
      });
      return;
    }
    if (checkRemain < 0) {
      openNotification({
        description: `Bạn chỉ có thể mua tối đa ${_product.remain} sản phâm`,
        type: 'warning',
      });
      return;
    }
    dispatch(
      cartActions.actionAddCart({
        params: {
          pid: id,
          quantity: _total,
        },
        callbacks: {
          onSuccess({ data }) {
            openNotification({
              description: 'Thêm vào giỏ hàng thành công',
              type: 'success',
            });
            getCart();
          },
        },
      }),
    );
  };

  const getComments = ({ page = 1 }: { page?: number } = {}) => {
    setComments((draft) => {
      draft.current = page;
      draft.loading = true;
    });
    dispatch(
      productActions.actionGetComments({
        params: {
          count: DEFAULT_SMALL_PAGE_SIZE,
          id,
          current: page,
        },
        callbacks: {
          onSuccess({ data, total }) {
            setComments((draft) => {
              draft.loading = false;
              draft.data = data;
              draft.total = total;
            });
          },
        },
      }),
    );
  };

  const onFinish = (values) => {
    dispatch(
      productActions.actionAddComment({
        params: {
          content: values.content,
          rate: _rate,
          id,
        },
        callbacks: {
          onSuccess() {
            getComments();
            _form.resetFields();
          },
        },
      }),
    );
  };

  const renderTotal = () => {
    if (_product.price > _sale && _sale > 0) {
      return (
        <div>
          <del className='italic font-medium mr-2 text-gray-900'>{utils.formatCurrency(_product.price)} VNĐ</del>
          <span className=''>{utils.formatCurrency(_sale)} VNĐ</span>
        </div>
      );
    }
    return <div className=''>{utils.formatCurrency(_product.price)} VNĐ</div>;
  };

  return (
    <>
      <Breadcrumb />
      <div className='container py-16'>
        <div className='row'>
          <div className='col-lg-1' />
          <CarouselWrapper className='col-lg-4'>
            <div className='previous icon' onClick={() => ref.current?.prev()}>
              <TiChevronLeft size={30} />
            </div>
            <Carousel ref={ref} dots={false} className='h-full'>
              {_.map([_product, ..._images], (item: any) => (
                <div className='text-center' key={item.id}>
                  <CustomImage key={item.id} width={300} height={300} src={utils.baseUrlImage(item.img)} />
                </div>
              ))}
            </Carousel>
            <div className='next icon' onClick={() => ref.current?.next()}>
              <TiChevronRight size={30} />
            </div>
          </CarouselWrapper>
          <div className='col-lg-1' />
          <div className='col-lg-6 product-details py-4 '>
            <h3>{_product.name}</h3>
            <div className='items-center gap-x-2 flex'>
              <div className='ant-rate-text h-3'>{_product.rateAVG?.toFixed(1)}</div>
              <Rate allowHalf value={customRound(_product.rateAVG)} disabled />
            </div>
            <div className='my-4 text-2xl'>{renderTotal()}</div>
            <div>{_product.description}</div>
            <div className='flex items-center my-4 gap-x-4'>
              <InputNumber
                className='w-24'
                size='large'
                min={1}
                // max={_product.remain || 1}
                defaultValue={1}
                keyboard={false}
                onChange={(value) => setTotal(value || 1)}
                precision={0}
                value={_total}
              />
              <div>{_product.remain} sản phẩm có sẵn</div>
            </div>
            <Button type='primary' size='large' onClick={addCart}>
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='col-md-12 heading-section text-center  '>
          <span className='subheading text-2xl'>Đánh giá</span>
        </div>
        <div className='text-xl font-bold flex items-center gap-x-2'>
          <span>Đánh giá sản phẩm</span>
          <Rate onChange={handleRate} value={_rate} />
        </div>
        <Form onFinish={onFinish} form={_form}>
          <Form.Item name='content'>
            <TextArea rows={4} placeholder='Viết đánh giá của bạn vào đây' />
          </Form.Item>
          <Form.Item className='text-right'>
            <Button htmlType='submit' type='primary'>
              Đánh giá
            </Button>
          </Form.Item>
        </Form>
        <List
          dataSource={_comments.data}
          pagination={{
            position: 'top',
            total: _comments.total,
            showSizeChanger: false,
            hideOnSinglePage: true,
            defaultPageSize: DEFAULT_SMALL_PAGE_SIZE,
            showQuickJumper: false,
            current: _comments.current,
            align: 'start',
            onChange: (page) => {
              getComments({ page });
            },
          }}
          renderItem={(item: any) => (
            <Comment
              author={item.userList.name}
              datetime={
                <div className='flex gap-x-3 items-center'>
                  {utils.formatTimeFromUnix(item.createDate, 'HH:mm:ss DD/MM/YYYY')}
                  <Rate className='leading-[0]' value={item.rate} disabled />
                </div>
              }
              avatar={
                <div className='flex-inline p-3 border border-black border-solid rounded-full'>
                  <FaUser size={20} />
                </div>
              }
              content={item.content}
            />
          )}
        />
      </div>

      <div className='container pt-10'>
        <h3>Có thể bạn sẽ thích</h3>
        <div className='flex flex-wrap'>
          {_.map(_products.data?.products, (item: any, index: number) => (
            <div className='col-md-6 col-lg-3' key={index}>
              <div className='block w-full '>
                <Link to={`/product/${item.id}`} className='block overflow-hidden'>
                  <img
                    height={260}
                    className='max-w-full hover:scale-110 transition duration-300 object-contain'
                    src={utils.baseUrlImage(item.img)}
                    alt={item.img}
                  />
                </Link>
                <div className='text py-3 pb-4 px-3 text-center'>
                  <div className='text-2xl'>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </div>
                  <div className='d-flex'>
                    <div className='pricing'>
                      <p className='price'>
                        <span>{utils.formatCurrency(item.price)} VNĐ</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
