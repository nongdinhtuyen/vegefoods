import { Breadcrumb } from '../../components';
import actions from '../../redux/actions/address';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Empty, Form, Image, Input, InputNumber, Modal, Row, Table } from 'antd';
import utils from 'common/utils';
import useToggle from 'hooks/useToggle';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/store';
import styled from 'styled-components';
import { useImmer } from 'use-immer';

type Props = {
  fetchData: () => void;
  close: () => void;
  open: () => void;
  isOpen: boolean;
  updateAddress?: any
};

export default function ModalAddAddress({ fetchData, close, open, isOpen }: Props) {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.userReducer);
  const [_updateAddress, setUpdateAddress] = useState<any>({});
  const [_form] = Form.useForm();
  const [_address, setAddress] = useImmer<any>({
    data: [],
  });

  const handleUpdate = () => {
    _form
      .validateFields()
      .then((value) => {
        if (_.isEmpty(_updateAddress)) {
          dispatch(
            actions.actionAddAddress({
              params: value,
              callbacks: {
                onSuccess(data) {
                  fetchData();
                  close();
                  _form.resetFields();
                },
              },
            }),
          );
        } else {
          dispatch(
            actions.actionUpdateAddress({
              params: { ...value, id: _updateAddress.id },
              callbacks: {
                onSuccess(data) {
                  fetchData();
                  setUpdateAddress({});
                  close();
                  _form.resetFields();
                },
              },
            }),
          );
        }
      })
      .catch(console.log);
  };

  const handleClose = () => {
    _form.resetFields();
    close();
  };

  return (
    <Modal
      title={<div className='text-2xl text-center mb-8'>Thêm mới địa chỉ</div>}
      onCancel={handleClose}
      onOk={handleUpdate}
      open={isOpen}
      okText='Xác nhận'
      cancelText='Hủy'
      className='top-20'
    >
      <Form size='large' name='basic' form={_form} className='m-auto' layout='vertical'>
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
          required
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (_.isEmpty(value)) {
                  return Promise.reject('Số điện thoại không được bỏ trống');
                }
                if (!_.isNumber(+value)) {
                  return Promise.reject('Vui lòng nhập số');
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input className='w-full' placeholder='Nhập số điện thoại' />
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
  );
}
