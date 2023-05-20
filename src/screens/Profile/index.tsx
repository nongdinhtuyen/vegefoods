import { Button, Col, DatePicker, Drawer, Form, Input, InputNumber, Modal, Radio, Row, Select, Space, Steps } from 'antd';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { openNotification } from 'common/Notify';
import utils from 'common/utils';
import { DEFAULT_LARGE_PAGE_SIZE } from 'consts';
import useToggle from 'hooks/useToggle';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import addressActions from 'redux/actions/address';
import actions from 'redux/actions/user';
import { useAppSelector } from 'redux/store';
import { useImmer } from 'use-immer';

const MALE = 0,
  FEMALE = 1,
  OTHER = 2;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function Profile() {
  const { profile, rank } = useAppSelector((state) => state.userReducer);
  const [_open, setOpen] = useState(false);
  const { isOpen, open, close } = useToggle();
  const dispatch = useDispatch();
  const [_form] = Form.useForm();
  const [_formPassword] = Form.useForm();
  const [_district, setDistrict] = useImmer<any>({
    data: [],
    current: 1,
    name: '',
    total: 0,
    isEnd: false,
    id: 0,
  });
  const [_ward, setWard] = useImmer<any>({
    data: [],
    current: 1,
    name: '',
    total: 0,
    isEnd: false,
  });
  const [_address, setAddress] = useState<string[]>(['', '', 'Thành phố Hà Nội']);

  const closeUpdateProfile = () => {
    setOpen(false);
  };

  const renderAddress = (address) => {
    const str = _.split(address, ', ');
    setAddress(str);
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

  const getDistrictData = ({ current = _district.current, name = _district.name } = {}) => {
    dispatch(
      addressActions.actionGetDistrict({
        params: {
          current,
          count: DEFAULT_LARGE_PAGE_SIZE,
          name,
        },
        callbacks: {
          onSuccess({ data, total }) {
            setDistrict((draft) => {
              draft.data = !name ? [..._district.data, ...data] : data;
              draft.isEnd = total <= _district.total;
              draft.total = total;
              draft.current = current + 1;
            });
          },
        },
      }),
    );
  };

  const getWardData = ({ current = _district.current, name = _district.name, id = _district.id, update = false }: any = {}) => {
    dispatch(
      addressActions.actionGetWard({
        params: {
          current,
          count: DEFAULT_LARGE_PAGE_SIZE,
          name,
          id,
        },
        callbacks: {
          onSuccess({ data, total }) {
            setWard((draft) => {
              draft.data = !name && !update ? [..._ward.data, ...data] : data;
              draft.isEnd = total <= _ward.total;
              draft.total = total;
              draft.current = current + 1;
            });
          },
        },
      }),
    );
  };

  const onScrollDistrict = (event) => {
    const { scrollTop, offsetHeight, scrollHeight } = event.target;
    if (scrollTop > 0.6 * scrollHeight && !_district.isEnd) {
      getDistrictData();
    }
  };

  const onScrollWard = (event) => {
    const { scrollTop, offsetHeight, scrollHeight } = event.target;
    if (scrollTop > 0.6 * scrollHeight && !_ward.isEnd) {
      getWardData();
    }
  };

  const onSearchDistrict = _.debounce((value) => {
    getDistrictData({ current: 1, name: value });
  }, 300);

  const onSearchWard = _.debounce((value) => {
    getWardData({ current: 1, name: value });
  }, 300);

  useEffect(() => {
    getDistrictData();
    renderAddress(profile.address);
  }, []);

  const fetchInfo = (id) => {
    dispatch(
      actions.actionGetUserInfo({
        params: id,
        callbacks: {
          onSuccess({ data }) {
            closeUpdateProfile();
            _form.setFieldsValue(data);
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
            params: { ...values, id: profile.id, address: `${values.detail}, ${_.join(_address, ', ')}` },
            callbacks: {
              onSuccess() {
                fetchInfo(profile.id);
                openNotification({
                  description: 'Cập nhật thông tin cá nhân thành công',
                  type: 'success',
                });
              },
            },
          }),
        );
      })
      .catch(console.log);
  };

  const handleClose = () => {
    close();
    _formPassword.resetFields();
  };

  const updatePassword = () => {
    _formPassword
      .validateFields()
      .then((values) => {
        dispatch(
          actions.actionUpdatePassword({
            params: { ...values, id: profile.id },
            callbacks: {
              onSuccess(data) {
                openNotification({
                  description: 'Đổi mật khẩu thành công',
                  type: 'success',
                });
                handleClose();
              },
            },
          }),
        );
      })
      .catch(console.log);
  };

  const trimString = (str: string) => _form.getFieldValue(str)?.trim();

  const onChange = () => {
    const { idDistrict, idWard, detail, ...rest } = _form.getFieldsValue();
    return _.isEqual(profile, {
      ...profile,
      ...rest,
      phone: trimString('phone'),
      address: `${detail}, ${_address.join(', ')}`,
      name: trimString('name'),
    });
  };

  const handlePercent = (): number | undefined => {
    const next = _.find(rank.listRank, (item) => item.totalSpend > profile.totalBuy);
    const precent = new BigNumber(profile.totalBuy).times(100).div(next?.totalSpend).toFixed(0);
    return new BigNumber(precent).isGreaterThanOrEqualTo(100) ? 0 : +precent;
  };

  return (
    <div className='pb-10 pt-4 bg-gray-100 border-b-gray-300 border-solid border-0 border-b-2'>
      <div className='mt-4 max-w-4xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-6'>
        <div className='lg:col-start-1 lg:col-span-6 bg-white shadow sm:rounded-lg px-4 py-5 '>
          <h2 className='flex-1 text-lg leading-6 font-medium text-primary mb-2'>Xếp hạng</h2>
          <div className='text-base leading-8 mb-4'>
            Bạn đang ở rank <span className='font-semibold text-xl'>{rank.rankUser?.name}</span> với tổng chi tiêu là:{' '}
            <span className='font-semibold text-xl'>{utils.formatCurrency(profile.totalBuy)}đ</span>
            <br />
            Quyền lợi: được giảm giá <span className='font-semibold text-xl'>{rank.rankUser?.discount}%</span> khi thanh toán trực tiếp hoặc online
          </div>
          <Steps
            current={rank.rankUser?.id}
            percent={handlePercent()}
            items={_.map(rank.listRank, (item) => ({
              title: item.name,
              description: (
                <>
                  <div>{`Giảm giá ${item.discount}%`}</div>
                  <div>{`Tổng chi tiêu lớn hơn ${utils.formatCurrency(item.totalSpend)}đ`}</div>
                </>
              ),
            }))}
          />
        </div>
        <div className='space-y-6 lg:col-start-1 lg:col-span-6'>
          <div className='bg-white shadow sm:rounded-lg px-4 py-5 '>
            <Form {...layout} labelAlign='left' form={_form} requiredMark={false} initialValues={profile}>
              <Row>
                <Col span={11}>
                  <h2 className='flex-1 text-lg leading-6 font-medium text-primary mb-6'>Thông tin cá nhân</h2>
                  <Form.Item name='username' label='Tên đăng nhập'>
                    {profile.username}
                  </Form.Item>
                  <Form.Item name='name' label='Họ và tên' rules={[{ required: true, message: 'Tên không được bỏ trống' }]}>
                    <Input placeholder='Nhập tên' />
                  </Form.Item>
                  <Form.Item name='createDate' label='Thời gian đăng ký'>
                    {utils.formatTimeFromUnix(profile.createDate, 'HH:mm:ss DD/MM/YYYY')}
                  </Form.Item>
                  <Form.Item name='sex' label='Giới tính'>
                    <Radio.Group>
                      <Radio value={MALE}>Nam</Radio>
                      <Radio value={FEMALE}>Nữ</Radio>
                      <Radio value={OTHER}>Khác</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={2}></Col>
                <Col span={11}>
                  <h2 className='flex-1 text-lg leading-6 font-medium text-primary mb-6'>Số điện thoại và Email</h2>
                  <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Nhập email' }]}>
                    <Input placeholder='Nhập email' />
                  </Form.Item>
                  <Form.Item
                    name='phone'
                    label='Số điện thoại'
                    rules={[
                      {
                        required: true,
                        message: 'Số điện thoại không được để trống',
                      },
                      {
                        type: 'number',
                        message: 'Số điện thoại không hợp lệ',
                        transform: (value) => _.toNumber(value),
                      },
                      {
                        max: 10,
                        message: 'Số điện thoại không hợp lệ',
                      },
                    ]}
                  >
                    <Input className='w-full' placeholder='Nhập số điện thoại' type='number' />
                  </Form.Item>
                </Col>

                {/* <Col span={24}>
                  <Form.Item label='Địa chỉ' required className='mb-0' labelCol={{ span: 4 }}>
                    <Row gutter={10}>
                      <Col span={8}>
                        <Form.Item noStyle shouldUpdate>
                          {({ getFieldValue }) => (
                            <Form.Item
                              name='idWard'
                              rules={[
                                {
                                  required: true,
                                  message: 'Phường/xã không được bỏ trống',
                                },
                              ]}
                            >
                              <Select
                                onPopupScroll={onScrollWard}
                                showSearch
                                onChange={(value, option: any) => {
                                  setAddress((value) => {
                                    const newArr = [...value];
                                    newArr[0] = option.label;
                                    return newArr;
                                  });
                                }}
                                onSearch={onSearchWard}
                                filterOption={(input: any, option: any) => true}
                                disabled={!getFieldValue('idDistrict')}
                                options={_.map(_ward.data, (item: any) => ({
                                  label: item.name,
                                  value: item.id,
                                  key: item.id,
                                }))}
                                placeholder='Chọn phường/xã'
                              />
                            </Form.Item>
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name='idDistrict'
                          rules={[
                            {
                              required: true,
                              message: 'Quận/huyện không được bỏ trống',
                            },
                          ]}
                        >
                          <Select
                            onPopupScroll={onScrollDistrict}
                            showSearch
                            onSearch={onSearchDistrict}
                            onChange={(value, option: any) => {
                              setAddress((value) => {
                                const newArr = [...value];
                                newArr[1] = option.label;
                                newArr[0] = '';
                                return newArr;
                              });
                              setDistrict((draft) => {
                                draft.id = value;
                              });
                              getWardData({ id: value, current: 1, update: true });
                              _form.resetFields(['idWard']);
                            }}
                            filterOption={(input: any, option: any) => true}
                            placeholder='Chọn quận/huyện'
                            options={_.map(_district.data, (item: any) => ({
                              label: item.name,
                              value: item.id,
                              key: item.id,
                            }))}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item>
                          <Input value='Thành phố Hà Nội' readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label='Chi tiết' name='detail' labelCol={{ span: 4 }}>
                    <Input />
                  </Form.Item>
                </Col> */}
                <Col span={24}>
                  <div className='flex justify-center gap-x-4'>
                    <Button onClick={open}>Đổi mật khẩu</Button>
                    <Form.Item shouldUpdate>
                      {({ getFieldValue }) => (
                        <Button type='primary' disabled={onChange()} onClick={handleUpdate}>
                          Lưu thay đổi
                        </Button>
                      )}
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
      <Modal
        title={<div className='text-2xl text-center mb-8'>Đổi mật khẩu</div>}
        closable={false}
        onCancel={handleClose}
        onOk={updatePassword}
        open={isOpen}
        width={448}
        okText='Xác nhận'
        cancelText='Hủy'
        className='top-20'
      >
        <Form autoComplete='off' layout='vertical' form={_formPassword} requiredMark={false}>
          <Form.Item name='oldPass' label='Mật khẩu hiện tại' rules={[{ required: true, message: 'Trường này được bỏ trống' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='pass'
            hasFeedback
            label='Mật khẩu mới'
            rules={[
              {
                validator(rule, value, callback) {
                  if (!value) {
                    return Promise.reject('Mật khẩu không được bỏ trống');
                  }
                  if (value.length < 8) {
                    return Promise.reject('Mật khẩu phải có ít nhất 8 ký tự');
                  }
                  if (!/^[a-zA-Z]+$/.test(value)) {
                    return Promise.reject('Mật khẩu không được có ký tự đặc biệt');
                  }
                  return Promise.resolve();
                },
              },
            ]}
            extra={'Mật khẩu viết liền không dấu, không chứa ký tự cách trắng hoặc xuống dòng, có phân biệt chữ hoa, chữ thường, ít nhất 8 ký tự'}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='confirm'
            hasFeedback
            dependencies={['password']}
            label='Nhập lại mật khẩu mới'
            rules={[
              { required: true, message: 'Trường này được bỏ trống' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('pass') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Hai mật khẩu bạn đã nhập không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
