import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Divider, Empty, Form, Image, Input, Row, Select, Table } from 'antd';
import actions from '../../redux/actions/cart';
import addressActions from '../../redux/actions/address';
import { useAppDispatch } from 'redux/store';
import _ from 'lodash';
import { ReceiptProps } from './receipt';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default function Page1({ setPay }: ReceiptProps) {
  const [_form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [_address, setAddress] = useState([]);

  useEffect(() => {
    dispatch(actions.actionGetCart({}));
    dispatch(
      addressActions.actionGetAddress({
        callbacks: {
          onSuccess({ data }) {
            setAddress(data);
            setPay((draft) => {
              draft.idReceiver = data[0].id;
            });
            _form.setFieldsValue({
              name: data[0].name,
              phone: data[0].phone,
              address: data[0].address,
            });
          },
        },
      }),
    );
  }, []);

  const handleChangeAddress = (value, option) => {
    setPay((draft) => {
      draft.idReceiver = option.item.id;
    });
    _form.setFieldsValue({
      name: option.item.name,
      phone: option.item.phone,
      address: option.item.address,
    });
  };

  const select = (label) => (
    <Select
      onChange={handleChangeAddress}
      optionLabelProp='name'
      options={_.map(_address, (item: any, index: number) => ({
        key: item.idCart,
        value: item.idCart,
        item,
        name: item[label],
        label: (
          <div key={item.id} className='p-1 flex flex-col gap-y-1'>
            <div>
              {item.name} {index === 0 && <span className='border border-solid border-primary ml-2 rounded-lg px-2 py-1'>Mặc định</span>}
            </div>
            <div>{item.phone}</div>
            <div>{item.address}</div>
          </div>
        ),
      }))}
    />
  );

  return (
    <>
      <div className='max-w-4xl m-auto py-10'>
        <div className='bg-white px-10 py-6 rounded-lg'>
          <div className='rounded-lg'>
            <div className='text-primary text-xl font-bold'>Thông tin người nhận</div>
            <Divider className='my-4' />
          </div>
          <Form size='large' name='basic' labelAlign='left' {...layout} form={_form} className='m-auto' layout='horizontal'>
            <Form.Item name='name' label='Tên'>
              {select('name')}
            </Form.Item>
            <Form.Item label='Số điện thoại' name='phone'>
              <Input readOnly />
              {/* {select('phone')} */}
            </Form.Item>
            <Form.Item name='address' label='Địa chỉ'>
              <Input readOnly />
              {/* {select('address')} */}
            </Form.Item>
          </Form>
          <div className='text-center'>
            <Button size='large' type='primary' onClick={() => navigate('pay')}>
              Tiếp tục thanh toán
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
