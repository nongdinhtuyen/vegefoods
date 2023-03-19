import { Button, Col, DatePicker, Drawer, Form, Input, InputNumber, Modal, Row, Select, Space } from 'antd';
import classNames from 'classnames';
import utils from 'common/utils';
import React, { useState } from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions/user';

const MALE = 0,
  FEMALE = 1,
  OTHER = 2;

export default function Profile() {
  const { profile } = useSelector((state: IStateReducers) => state.userReducer);
  const [_open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [_form] = Form.useForm();

  const openUpdateProfile = () => {
    setOpen(true);
    _form.setFieldsValue(profile);
  };

  const closeUpdateProfile = () => {
    setOpen(false);
  };

  const fetchInfo = (id) => {
    dispatch(
      actions.actionGetUserInfo({
        params: id,
        callbacks: {
          onSuccess() {
            closeUpdateProfile();
          },
        },
      }),
    );
  };

  const handleUpdate = () => {
    _form
      .validateFields()
      .then((values) => {
        dispatch(
          actions.actionUpdateProfile({
            params: { ...values, id: profile.id },
            callbacks: {
              onSuccess() {
                fetchInfo(profile.id);
              },
            },
          }),
        );
      })
      .catch(console.log);
  };

  const handleGender = (type) => {
    switch (type) {
      case MALE:
        return 'Nam';
      case FEMALE:
        return 'Nữ';
      default:
        return 'Khác';
    }
  };

  return (
    <div className='py-10 bg-gray-100 border-b-gray-300 border-solid border-0 border-b-2'>
      {/* Page header */}
      <div className='max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8'>
        <div className='flex items-center space-x-5'>
          <div className='flex-shrink-0'>
            <div className='relative'>
              {/* <img
                className='h-16 w-16 rounded-full'
                src='https://mediacloud.mobilelab.vn/2022-12-19/17_23_46-b9c6ee36-6e8f-43b9-88dd-2a9bc1e4dfa5.gif'
                alt=''
              /> */}
              <BiUserCircle size={100} />
              <span className='absolute inset-0 shadow-inner rounded-full' aria-hidden='true' />
            </div>
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>{profile.name}</h1>
            <p className='text-sm font-medium text-gray-500'>
              Tham gia từ{' '}
              <a href='#' className='text-gray-900'>
                {utils.formatTimeFromUnix(profile.createAt, 'DD/MM/YYYY')}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className='mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3'>
        <div className='space-y-6 lg:col-start-1 lg:col-span-2'>
          {/* Description list*/}
          <section aria-labelledby='applicant-information-title'>
            <div className='bg-white shadow sm:rounded-lg'>
              <div className='flex justify-between items-center px-4 py-5 sm:px-6'>
                <h2 id='applicant-information-title' className='text-lg leading-6 font-medium text-gray-900'>
                  Thông tin cá nhân
                </h2>
                <Button type='primary' onClick={openUpdateProfile}>
                  Cập nhật
                </Button>
              </div>
              <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
                <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                  <div className='sm:col-span-1'>
                    <dt className='text-sm font-medium text-gray-500'>Email</dt>
                    <dd className='mt-1 text-sm text-gray-900'>{profile.email}</dd>
                  </div>
                  <div className='sm:col-span-1'>
                    <dt className='text-sm font-medium text-gray-500'>Địa chỉ</dt>
                    <dd className='mt-1 text-sm text-gray-900'>{profile.address}</dd>
                  </div>
                  <div className='sm:col-span-1'>
                    <dt className='text-sm font-medium text-gray-500'>Số điện thoại</dt>
                    <dd className='mt-1 text-sm text-gray-900'>{profile.phone}</dd>
                  </div>
                  <div className='sm:col-span-1'>
                    <dt className='text-sm font-medium text-gray-500'>Thứ hạng</dt>
                    <dd className='mt-1 text-sm text-gray-900'>{profile.idRank}</dd>
                  </div>
                  <div className='sm:col-span-1'>
                    <dt className='text-sm font-medium text-gray-500'>Giới tính</dt>
                    <dd className='mt-1 text-sm text-gray-900'>{handleGender(profile.sex)}</dd>
                  </div>
                  {/* <div className='sm:col-span-2'>
                    <dt className='text-sm font-medium text-gray-500'>About</dt>
                    <dd className='mt-1 text-sm text-gray-900'>
                      Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                      consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing
                      reprehenderit deserunt qui eu.
                    </dd>
                  </div> */}
                  {/* <div className='sm:col-span-2'>
                    <dt className='text-sm font-medium text-gray-500'>Attachments</dt>
                    <dd className='mt-1 text-sm text-gray-900'>
                      <ul role='list' className='border border-gray-200 rounded-md divide-y divide-gray-200'>
                        {attachments.map((attachment) => (
                          <li key={attachment.name} className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'>
                            <div className='w-0 flex-1 flex items-center'>
                              <AiOutlinePaperClip className='flex-shrink-0 h-5 w-5 text-gray-400' aria-hidden='true' />
                              <span className='ml-2 flex-1 w-0 truncate'>{attachment.name}</span>
                            </div>
                            <div className='ml-4 flex-shrink-0'>
                              <a href={attachment.href} className='font-medium text-blue-600 hover:text-blue-500'>
                                Download
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div> */}
                </dl>
              </div>
              {/* <div>
                <a href='#' className='block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg'>
                  Read full application
                </a>
              </div> */}
            </div>
          </section>
        </div>
      </div>
      <Modal
        title={<div className='text-2xl text-center mb-8'>Cập nhật thông tin cá nhân</div>}
        closable={false}
        onCancel={closeUpdateProfile}
        onOk={handleUpdate}
        open={_open}
        width={448}
        okText='Xác nhận'
        cancelText='Hủy'
        className='top-20'
      >
        <Form layout='vertical' form={_form} requiredMark={false}>
          <Form.Item name='name' label='Tên' rules={[{ required: true, message: 'Tên không được bỏ trống' }]}>
            <Input placeholder='Nhập tên' />
          </Form.Item>
          <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Email không được bỏ trống' }]}>
            <Input placeholder='Nhập email' />
          </Form.Item>
          <Form.Item name='address' label='Địa chỉ' rules={[{ required: true, message: 'Nhập địa chỉ' }]}>
            <Input placeholder='Nhập địa chỉ' />
          </Form.Item>
          <Form.Item name='phone' label='Số điện thoại' rules={[{ required: true, message: 'Số điện thoại không được bỏ trống' }]}>
            <Input className='w-full' placeholder='Nhập số điện thoại' />
          </Form.Item>
          <Form.Item hidden name='sex' label='Số điện thoại'>
            <Input className='w-full' placeholder='Nhập số điện thoại' />
          </Form.Item>
          <Form.Item name='sex' label='Số điện thoại'>
            <Select
              options={[
                { value: MALE, label: 'Nam' },
                { value: FEMALE, label: 'Nữ' },
                { value: OTHER, label: 'Khác' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
