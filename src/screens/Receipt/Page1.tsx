import addressActions from '../../redux/actions/address';
import actions from '../../redux/actions/cart';
import { ReceiptProps } from './receipt';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Empty, Form, Image, Input, Row, Select, Space, Table } from 'antd';
import { openNotification } from 'common/Notify';
import useToggle from 'hooks/useToggle';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/store';
import ModalAddAddress from 'screens/Address/ModalAddAddress';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default function Page1({ setPay, pay }: ReceiptProps) {
  const { cartDataTotal } = useAppSelector((state) => state.cartReducer);
  const { provinces } = useAppSelector((state) => state.initReducer);
  const { listAddress } = useAppSelector((state) => state.addressReducer);
  const { profile } = useAppSelector((state) => state.userReducer);
  const [_form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { close, isOpen, open } = useToggle();

  const renderAddress = (address) => {
    const str = _.split(address, ', ');
    if (str.length === 3) {
      _form.setFieldsValue({
        idWard: str[0],
        idDistrict: str[1],
        province: str[2],
      });
    } else {
      _form.setFieldsValue({
        detail: str[0],
        idWard: str[1],
        idDistrict: str[2],
        province: str[3],
      });
    }
  };

  useEffect(() => {
    if (!_.isEmpty(listAddress)) {
      renderAddress(pay.addressInfo.address);
    }
  }, [pay.addressInfo]);

  const fetchData = () => {
    dispatch(
      addressActions.actionGetAddress({
        callbacks: {
          onSuccess({ data }) {
            if (!_.isEmpty(data)) {
              //   openNotification({
              //     description: 'Bạn cần thêm địa chỉ trước khi thanh toán',
              //     type: 'info'
              //   })
              //   navigate('/address')
              // }
              // setAddress(data);
              setPay((draft) => {
                draft.idReceiver = data[0].id;
              });
              renderAddress(data[0]?.address);
              _form.setFieldsValue({
                name: data[0].name,
                phone: data[0].phone,
              });
            }
          },
        },
      }),
    );
  };

  useEffect(() => {
    // dispatch(actions.actionGetCart({}));
    // fetchData();
  }, []);

  useEffect(() => {
    if (cartDataTotal.totalItem === 0) {
      navigate('/', {
        replace: true,
      });
    }
  }, [cartDataTotal.totalItem]);

  const handleChangeAddress = (value, option) => {
    setPay((draft) => {
      draft.idReceiver = option.item.id;
      draft.idD = option.item.idDistrict;
      draft.idW = option.item.idWard;
      draft.addressInfo = option.item;
    });
    _form.setFieldsValue({
      name: option.item.id,
      phone: option.item.phone,
      address: option.item.address,
    });
    // renderAddress(option.item.address);
  };

  return (
    <>
      <div className='max-w-4xl m-auto py-10'>
        <div className='bg-white px-6 py-4 rounded-lg'>
          <div className='rounded-lg'>
            <div className='text-primary text-xl font-bold'>Thông tin người nhận</div>
            <Divider className='my-4' />
          </div>
          <Form
            size='large'
            name='basic'
            labelAlign='left'
            {...layout}
            form={_form}
            className='m-auto'
            layout='horizontal'
            initialValues={{
              province: provinces.name,
              // name: listAddress[0]?.id,
              // phone: listAddress[0]?.phone,
              // address: listAddress[0]?.address,
            }}
          >
            <Form.Item name='name' label='Tên'>
              <Select
                onSelect={handleChangeAddress}
                optionLabelProp='name'
                options={_.map(listAddress, (item: any, index: number) => ({
                  key: item.id,
                  value: item.id,
                  item,
                  name: item['name'],
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
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Button type='text' icon={<PlusOutlined />} onClick={open}>
                      Thêm địa chỉ mới
                    </Button>
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label='Số điện thoại' name='phone'>
              <Input readOnly />
            </Form.Item>
            <Form.Item label='Địa chỉ' className='mb-0'>
              <Row gutter={10}>
                <Col span={8}>
                  <Form.Item name='idWard'>
                    <Input readOnly />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name='idDistrict'>
                    <Input readOnly />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name='province'>
                    <Input readOnly />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label='Chi tiết' name='detail'>
              <Input readOnly />
            </Form.Item>
          </Form>
          <div className='text-center'>
            <Button size='large' disabled={_.isEmpty(listAddress)} type='primary' onClick={() => navigate('pay')}>
              Tiếp tục thanh toán
            </Button>
          </div>
        </div>
      </div>
      <ModalAddAddress fetchData={fetchData} close={close} isOpen={isOpen} open={open} />
    </>
  );
}
