import { Form, Input, Button, notification } from 'antd';
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
          <h1>Signup</h1>
          <Form
            {...layout}
            name='basic'
            onFinish={onFinish}
            className='m-auto'
            initialValues={{
              address: 'Hanoi',
              createAt: 0,
              email: 'dev@gmail.com',
              name: 'lan',
              pass: '123456',
              phone: '0978787887',
              sex: true,
              status: true,
              username: 'lanln',
            }}
          >
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input placeholder='Username' />
            </Form.Item>

            <Form.Item
              name='pass'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>

            <Form.Item
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
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
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input placeholder='Name' />
            </Form.Item>
            <Form.Item
              name='sex'
              rules={[
                {
                  required: true,
                  message: 'Please input your gender!',
                },
              ]}
            >
              <Input placeholder='Gender' />
            </Form.Item>
            <Form.Item
              name='phone'
              rules={[
                {
                  required: true,
                  message: 'Please input your phone!',
                },
              ]}
            >
              <Input placeholder='phone' />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type='primary' htmlType='submit'>
                Signup
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
