import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Breadcrumb } from '../../components';
import { Rate, Image, Button, Form, Input, InputNumber, notification, Space, List } from 'antd';
import dayjs from 'dayjs';
import { connect, useDispatch } from 'react-redux';
import { UserOutlined, EyeOutlined, ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import productActions from '../../redux/actions/product';
import cartActions from '../../redux/actions/cart';
import { useImmer } from 'use-immer';
import utils from 'common/utils';
import { openNotification } from 'common/Notify';
import { DEFAULT_SMALL_PAGE_SIZE } from 'consts';
import { Comment } from '@ant-design/compatible';
import { FaUser } from 'react-icons/fa';
import _ from 'lodash';

const { TextArea } = Input;

type ListProductType = {
  current?: number;
  productType?: number;
};

export default function Product() {
  const [_total, setTotal] = useState(1);
  const [_product, setProduct] = useState<any>({});
  const [_rate, setRate] = useState(5);
  const dispatch = useDispatch();
  const { id }: any = useParams();
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
  const [_form] = Form.useForm();

  useEffect(() => {
    setTotal(1);
    dispatch(
      productActions.actionGetProductById({
        params: id,
        callbacks: {
          onSuccess({ data }) {
            setProduct(data.product);
            getListProducts(data.product.idType);
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
    if (num - Math.floor(num) >= 0.6) {
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
  };

  const addCart = () => {
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

  return (
    <>
      <Breadcrumb />
      <div className='container py-16'>
        <div className='row'>
          <div className='col-lg-6 mb-5 flex justify-center'>
            <Image
              height={260}
              src={utils.baseUrlImage(_product.img)}
              preview={{
                mask: (
                  <Space>
                    <EyeOutlined />
                    Xem trước
                  </Space>
                ),
              }}
              alt=''
            />
            {/* <a href={_product.image} className='image-popup' target='_blank' rel='noreferrer'>
                <img src={_product.image} className='img-fluid' alt='Colorlib Template' />
              </a> */}
          </div>
          <div className='col-lg-6 product-details py-4 pl-10'>
            <h3>{_product.name}</h3>
            <div className='items-center gap-x-2 flex'>
              <span className='ant-rate-text'>{_product.rateAVG?.toFixed(1)}</span>
              <Rate allowHalf value={customRound(_product.rateAVG)} disabled />
            </div>
            <p className='price'>
              <span>{utils.formatCurrency(_product.price)} VNĐ</span>
            </p>
            <p>{_product.description}</p>
            <div className='flex items-center my-4 gap-x-4'>
              <InputNumber
                className='w-24'
                size='large'
                min={1}
                max={_product.remain || 1}
                defaultValue={1}
                keyboard={false}
                onChange={(value) => setTotal(value)}
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
                  {utils.formatTimeFromUnix(item.createAt, 'HH:mm:ss DD/MM/YYYY')}
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
          {_.map(_products.data?.products, (item: any) => (
            <div className='col-md-6 col-lg-3'>
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
