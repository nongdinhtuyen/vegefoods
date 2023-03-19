import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../components';
import { Rate, Image, Button, Form, Input, InputNumber, notification, Space } from 'antd';
import dayjs from 'dayjs';
import { connect, useDispatch } from 'react-redux';
import { Comment } from '@ant-design/compatible';
import { UserOutlined, EyeOutlined, ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import productActions from '../../redux/actions/product';
import cart_actions from '../../redux/actions/cart';
import { useImmer } from 'use-immer';
import utils from 'common/utils';

const { TextArea } = Input;

export default function Product(props) {
  const [value, setValue] = useState(1);
  const [_product, setProduct] = useState<any>({});
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      productActions.actionGetProductById({
        params: id,
        callbacks: {
          onSuccess({ data }) {
            setProduct(data);
          },
        },
      }),
    );
    // _onFetchProduct(id);
    // _onFetchComment({ pid: id });
  }, [id]);

  const onValueChange = (value) => {
    setValue(value);
  };

  const addCart = () => {
    // _onAddCart({ product_id: parseInt(id, 10), quantity: value }, succeed);
  };

  const rate = (value) => {
    // _onRate({ product_id: parseInt(id, 10), rate: value }, () => {
    //   notification['success']({
    //     message: 'Rate succeeded',
    //   });
    // });
  };

  const onFinish = (values) => {
    values.product_id = parseInt(id, 10);
    // _onCreateComment(values);
  };

  const succeed = () => {
    const key = 'cart';
    const btn = (
      <Button
        type='primary'
        onClick={() => {
          notification['success']({
            message: key,
          });
          navigate('/cart');
        }}
      >
        Go to cart
      </Button>
    );
    notification.open({
      message: 'Succeed',
      description: 'Added succecfully to the cart',
      btn,
      key,
    });
  };

  return (
    <>
      <Breadcrumb navi='Product' name='Product' />
      <section className='ftco-section'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 mb-5  '>
              <Image
                width={200}
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
            <div className='col-lg-6 product-details pl-md-5  '>
              <h3>{_product.name}</h3>
              <div className='rating d-flex'>
                <Rate defaultValue={_product.rate_avg} onChange={rate} style={{ color: '#82ae46' }} />
              </div>
              <p className='price'>
                <span>${_product.price}</span>
              </p>
              <p>{_product.description}</p>
              <div className='row mt-4'>
                <div className='w-100'></div>
                <div className='input-group col-md-6 d-flex mb-3'>
                  <InputNumber min={1} max={_product.remaining || 1} defaultValue={1} keyboard={false} onChange={onValueChange} precision={0} />
                </div>
                <div className='col-md-12'>
                  <p style={{ color: '#000' }}>{_product.remaining} available</p>
                </div>
              </div>
              <p>
                <div className='btn btn-black py-3 px-5' onClick={addCart}>
                  Add to Cart
                </div>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='ftco-section'>
        <div className='container'>
          <div className='col-md-12 heading-section text-center  '>
            <span className='subheading'>Comments</span>
          </div>
          <Form onFinish={onFinish}>
            <Form.Item name='comment'>
              <TextArea rows={4} placeholder='Add your comment here' />
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' type='primary' style={{ float: 'right' }}>
                Add Comment
              </Button>
            </Form.Item>
          </Form>
          {/* <List
            className='comment-list'
            header={`Comments`}
            itemLayout='horizontal'
            dataSource={[..._comment]}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.name}
                  avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                  content={item.comment}
                  datetime={dayjs.unix(item.last_up_date).format('DD/MM/YYYY')}
                />
              </li>
            )}
          /> */}
        </div>
      </section>

      <section className='ftco-section'>
        <div className='container'>
          <div className='row justify-content-center mb-3 pb-3'></div>
        </div>
      </section>
    </>
  );
}
