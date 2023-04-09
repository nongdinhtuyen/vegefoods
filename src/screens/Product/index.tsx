import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const { TextArea } = Input;

export default function Product() {
  const [_total, setTotal] = useState(1);
  const [_product, setProduct] = useState<any>({});
  const [_rate, setRate] = useState(5);
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const navigate = useNavigate();
  const [_comments, setComments] = useImmer({
    data: [],
    current: 1,
    total: 0,
    loading: false,
  });

  useEffect(() => {
    dispatch(
      productActions.actionGetProductById({
        params: id,
        callbacks: {
          onSuccess({ data }) {
            setProduct(data.product);
          },
        },
      }),
    );
    getComments();
  }, [id]);

  const handleRate = (value) => {
    setRate(parseInt(value, 10));
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
            // setProduct(data.product);
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
            console.log("🚀 ~ file: index.tsx:85 ~ onSuccess ~ total:", total)
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
            <div className='rating d-flex'>
              <Rate value={_product.rateAVG} disabled />
            </div>
            <p className='price'>
              <span>${_product.price}</span>
            </p>
            <p>{_product.description}</p>
            <div className='flex items-center my-4 gap-x-4'>
              <InputNumber
                className='w-24'
                size='large'
                min={1}
                max={_product.remaining || 1}
                defaultValue={1}
                keyboard={false}
                onChange={(value) => setTotal(value)}
                precision={0}
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
          <span className='subheading text-2xl'>Comments</span>
        </div>
        <div className='text-xl font-bold flex items-center gap-x-2'>
          <span>Đánh giá sản phẩm</span>
          <Rate onChange={handleRate} value={_rate} />
        </div>
        <Form onFinish={onFinish}>
          <Form.Item name='content'>
            <TextArea rows={4} placeholder='Viết đánh giá của bạn vào đây' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary'>
              Đánh giá
            </Button>
          </Form.Item>
        </Form>
        <List
          dataSource={_comments.data}
          pagination={{
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
                  {utils.formatTimeFromUnix(item.createAt, 'DD/MM/YYYY')}
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

      <section className='ftco-section'>
        <div className='container'>
          <div className='row justify-content-center mb-3 pb-3'></div>
        </div>
      </section>
    </>
  );
}
