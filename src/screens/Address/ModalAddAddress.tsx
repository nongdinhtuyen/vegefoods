import { Breadcrumb } from '../../components';
import actions from '../../redux/actions/address';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Empty, Form, Image, Input, InputNumber, Modal, Row, Select, Table } from 'antd';
import { openNotification } from 'common/Notify';
import utils from 'common/utils';
import { DEFAULT_LARGE_PAGE_SIZE, DEFAULT_PAGE_SIZE } from 'consts';
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
  updateAddress?: any;
};

export default function ModalAddAddress({ fetchData, close, open, isOpen }: Props) {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.userReducer);
  const [_updateAddress, setUpdateAddress] = useState<any>({});
  const [_form] = Form.useForm();
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

  const handleUpdate = () => {
    _form
      .validateFields()
      .then((value) => {
        if (_.isEmpty(_updateAddress)) {
          dispatch(
            actions.actionAddAddress({
              params: { ...value, address: `${value.detail}, ${_.join(_address, ', ')}` },
              callbacks: {
                onSuccess(data) {
                  fetchData();
                  openNotification({
                    description: 'Thêm địa chỉ thành công',
                    type: 'success',
                  });
                  close();
                  _form.resetFields();
                },
              },
            }),
          );
        } else {
          dispatch(
            actions.actionUpdateAddress({
              params: { ...value, address: `${value.detail}, ${_.join(_address, ',')}`, id: _updateAddress.id },
              callbacks: {
                onSuccess(data) {
                  fetchData();
                  openNotification({
                    description: 'Cập nhật địa chỉ thành công',
                    type: 'success',
                  });
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

  const getDistrictData = ({ current = _district.current, name = _district.name } = {}) => {
    dispatch(
      actions.actionGetDistrict({
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
      actions.actionGetWard({
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

  useEffect(() => {
    getDistrictData();
    // getWardData();
  }, []);

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

  return (
    <Modal
      title={<div className='text-2xl text-center mb-8'>Thêm mới địa chỉ</div>}
      onCancel={handleClose}
      onOk={handleUpdate}
      open={isOpen}
      okText='Xác nhận'
      cancelText='Hủy'
      width={840}
      className='top-20'
    >
      <Form name='basic' form={_form} className='m-auto' layout='vertical'>
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
        <Form.Item label='Địa chỉ' required className='mb-0'>
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
        <Form.Item name='detail' label='Chi tiết'>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
