import { DEFAULT_LARGE_PAGE_SIZE } from 'consts';
import actions from '../../redux/actions/address';
import Background from '../../static/background_login.jpg';
import { Form, Input, Button, notification, Select, Space, Modal, Row, Col } from 'antd';
import utils from 'common/utils';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';

const layout = {
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

export default function Signup() {
  const _form = Form.useFormInstance();
  const dispatch = useDispatch();
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
    <>
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
    </>
  );
}
