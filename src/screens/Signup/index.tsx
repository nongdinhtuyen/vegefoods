import { Form, Input, Button, notification, Select } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Background from '../../static/background_login.jpg';
import actions from '../../redux/actions/user';

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
  const navigate = useNavigate();
  const [_form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (value) => {
    dispatch(
      actions.actionRegister({
        params: value,
        callbacks: {
          onSuccess(data) {
            redirect();
          },
        },
      }),
    );
  };

  const redirect = () => {
    notification['success']({
      message: 'Sign up succeeded',
    });
    navigate('/login');
  };

  return (
    <div className='bg' style={{ backgroundImage: `url(${Background})` }}>
      <div className='container'>
        <div className='login-container'>
          <h1>ĐĂNG KÝ</h1>
          <Form {...layout} name='basic' onFinish={onFinish} className='m-auto' form={_form}>
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Tên đăng nhập không được để trống',
                },
              ]}
            >
              <Input placeholder='Tên đăng nhập' onChange={(e) => _form.setFieldValue('username', e.target?.value.trim())} />
            </Form.Item>

            <Form.Item
              name='pass'
              rules={[
                {
                  required: true,
                  message: 'Mật khẩu không được để trống',
                },
              ]}
            >
              <Input.Password placeholder='Mật khẩu' />
            </Form.Item>

            <Form.Item
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Email không được để trống',
                },
              ]}
            >
              <Input placeholder='Email' />
            </Form.Item>
            <Form.Item
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Tên không được để trống',
                },
              ]}
            >
              <Input placeholder='Họ và tên' />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Giới tính không được để trống',
                },
              ]}
              name='sex'
            >
              <Select
                placeholder='Giới tính'
                className='text-left'
                options={[
                  { value: 0, label: 'Nam' },
                  { value: 1, label: 'Nữ' },
                  { value: 2, label: 'Khác' },
                ]}
              />
            </Form.Item>
            <Form.Item
              name='phone'
              rules={[
                {
                  required: true,
                  message: 'Số điện thoại không được để trống',
                },
              ]}
            >
              <Input placeholder='Số điện thoại' />
            </Form.Item>
            <Form.Item
              name='address'
              rules={[
                {
                  required: true,
                  message: 'Địa chỉ không được để trống',
                },
              ]}
            >
              <Input placeholder='Địa chỉ' />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type='primary' htmlType='submit'>
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
