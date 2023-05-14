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
import ModalAddAddress from './ModalAddAddress';

export default function Address() {
  const dispatch = useAppDispatch();
  const { listAddress } = useAppSelector((state) => state.addressReducer);
  const { close, isOpen, open } = useToggle();
  const [_updateAddress, setUpdateAddress] = useState<any>({});
  const [_form] = Form.useForm();
  const fetchData = () => {
    dispatch(
      actions.actionGetAddress({}),
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleEdit = (item) => {
    setUpdateAddress(item);
    _form.setFieldsValue({
      name: item.name,
      phone: item.phone,
      address: item.address,
    });
    open();
  };

  const handleClose = () => {
    _form.resetFields();
    close();
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
        <Divider className='my-2' />
        {_.map(listAddress, (item: any, index: number) => (
          <div key={item.id}>
            <Row>
              <Col span={12} className='flex flex-col gap-y-1'>
                <div className='font-bold text-base'>
                  {item.name} {index === 0 && <span className='border text-sm border-solid border-primary ml-2 rounded-lg px-2 py-1'>Mặc định</span>}
                </div>
                <div>{item.phone}</div>
                <div>{item.address}</div>
              </Col>
              {/* {index !== 0 && ( */}
                <Col span={12} className='text-right'>
                  <FiEdit className='text-primary mr-2 cursor-pointer' size={20} onClick={() => handleEdit(item)} />
                  <RiDeleteBin6Line className='text-red-500 cursor-pointer' onClick={() => handleDelete(item.id)} size={20} />
                </Col>
              {/* )} */}
            </Row>
            <Divider className='my-2' />
          </div>
        ))}
      </div>
      <ModalAddAddress updateAddress={_updateAddress} fetchData={fetchData} close={close} isOpen={isOpen} open={open} />
    </div>
  );
}
