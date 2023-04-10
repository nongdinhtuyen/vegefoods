import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Divider, Empty, Form, Image, Input, InputNumber, Modal, Row, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Breadcrumb } from '../../components';
import actions from '../../redux/actions/address';
import { useAppDispatch, useAppSelector } from 'redux/store';
import _ from 'lodash';
import utils from 'common/utils';
import useToggle from 'hooks/useToggle';
import { useImmer } from 'use-immer';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function Address() {
  const dispatch = useAppDispatch();
  const { close, isOpen, open } = useToggle();
  const [_form] = Form.useForm();
  const [_address, setAddress] = useImmer({
    data: [],
  });

  const fetchData = () => {
    dispatch(
      actions.actionGetAddress({
        callbacks: {
          onSuccess: ({ data }) => {
            setAddress((draft) => {
              draft.data = data;
            });
          },
        },
      }),
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = () => {
    _form
      .validateFields()
      .then((value) => {
        dispatch(
          actions.actionAddAddress({
            params: value,
            callbacks: {
              onSuccess(data) {
                fetchData();
                close();
              },
            },
          }),
        );
      })
      .catch(console.log);
  };

  const handleDelete = (id) => {
    dispatch(
      actions.actionDeleteAddress({
        params: {
          id,
        },
        callbacks: {
          onSuccess(data) {
            fetchData();
          },
        },
      }),
    );
  };

  return (
    <div className='bg-[#F2F2F2] py-10'>
      <div className='max-w-4xl bg-white py-3 px-5 rounded-md m-auto'>
        <div className='flex justify-between '>
          <div className='text-primary text-xl font-bold'>Địa chỉ người nhận</div>
          <Button type='primary' icon={<PlusCircleOutlined />} onClick={open}>
            Thêm mới địa chỉ
          </Button>
        </div>
        <Divider className='my-2'/>
        {_.map(_address.data, (item: any) => (
          <div key={item.id}>
            <Row>
              <Col span={12} className='flex flex-col gap-y-1'>
                <div className='font-bold text-base'>{item.name}</div>
                <div>{item.phone}</div>
                <div>{item.address}</div>
              </Col>
              <Col span={12} className='text-right'>
                {/* <FiEdit className='text-primary mr-2 cursor-pointer' size={20} onClick={() => handleEdit(item.id)}  /> */}
                <RiDeleteBin6Line className='text-red-500 cursor-pointer' onClick={() => handleDelete(item.id)} size={20} />
              </Col>
            </Row>
            <Divider className='my-2' />
          </div>
        ))}
      </div>
      <Modal
        title={<div className='text-2xl text-center mb-8'>Thêm mới địa chỉ</div>}
        onCancel={close}
        onOk={handleUpdate}
        open={isOpen}
        okText='Xác nhận'
        cancelText='Hủy'
        className='top-20'
      >
        <Form
          size='large'
          name='basic'
          form={_form}
          className='m-auto'
          layout='vertical'
          initialValues={{
            address: 'Số 9, ngõ 4, Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
            phone: '0973083638',
            name: 'Lưu Ngọc Lan',
          }}
        >
          <Form.Item
            name='name'
            label='Tên'
            rules={[
              {
                required: true,
                message: 'Tên không được bỏ trống',
              },
            ]}
          >
            <Input placeholder='Nhập tên' />
          </Form.Item>
          <Form.Item
            label='Số điện thoại'
            name='phone'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber placeholder='Nhập số điện thoại' />
          </Form.Item>
          <Form.Item
            name='address'
            label='Địa chỉ'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder='Nhập địa chỉ' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
