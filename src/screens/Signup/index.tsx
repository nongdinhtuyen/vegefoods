import actions from '../../redux/actions/user';
import Background from '../../static/background_login.jpg';
import VerifyPhone from './VerifyPhone';
import VerifyPhone2 from './VerifyPhone2';
import { Form, Input, Button, notification, Select, Space, Modal } from 'antd';
import utils from 'common/utils';
// import { signInWithPhoneNumber } from 'firebase/auth';
import useToggle from 'hooks/useToggle';
import firebase from 'libs/firebase';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import PhoneInput from 'react-phone-number-input/input';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Reaptcha from 'reaptcha';

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
  const _captcha = useRef<Reaptcha>(null);
  const [_captchaReady, setCaptchaReady] = useState(false);
  const [_isErrorCaptcha, setIsErrorCaptcha] = useState<string>('');
  const [_loading, setLoading] = useState<boolean>(false);
  const [_verified, setVerified] = useState(false);
  const [ph, setPh] = useState<any>('09730835341');
  const { isOpen, open, close } = useToggle();
  const [_otp, setOtp] = useState('');

  const onFinish = (value) => {
    open();
    getOTP();
  };

  const handleSignup = () => {
    dispatch(
      actions.actionRegister({
        params: { ..._form.getFieldsValue(), phone: ph, id_token: _otp },
        callbacks: {
          onSuccess(data) {
            closeSignup();
            redirect();
          },
        },
      }),
    );
  };

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new firebase.RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {},
          'expired-callback': () => {},
        },
        firebase.auth,
      );
    }
  }, []);

  const redirect = () => {
    notification['success']({
      message: 'Sign up succeeded',
    });
    navigate('/login');
  };

  function getOTP() {
    setLoading(true);

    const appVerifier = window.recaptchaVerifier;

    firebase
      .signInWithPhoneNumber(firebase.auth, ph, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  const closeSignup = () => {
    close();
    setOtp('');
  };

  return (
    <div className='bg py-4' style={{ backgroundImage: `url(${Background})` }}>
      <div className='login-container'>
        <h1>ĐĂNG KÝ</h1>
        <div id='recaptcha-container'></div>
        <Form
          {...layout}
          name='basic'
          onFinish={onFinish}
          className='m-auto text-left'
          form={_form}
          initialValues={{
            id: 7,
            name: 'Lưu Ngọc Lan',
            username: 'lanln',
            pass: '',
            phone: '09730835341',
            address: 'tràng an complex, 1 phùng chí kiên, nghĩa đô, cầu giấy, hà lội',
            email: '123',
            sex: 1,
            createDate: 1679107612,
            status: 0,
            idRank: 3,
            rankList: {
              id: 3,
              name: 'Vàng',
              totalSpend: 1500000,
              discount: 5,
            },
            totalBuy: 97997425,
          }}
        >
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
            hasFeedback
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
            name='confirm'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Mật khẩu xác nhận không được để trống',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('pass') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận khác với mật khẩu'));
                },
              }),
            ]}
          >
            <Input.Password placeholder='Mật khẩu xác nhận ' />
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
              // {
              //   type: 'number',
              //   message: 'Số điện thoại không hợp lệ',
              //   transform: (value) => _.toNumber(value),
              // },
            ]}
          >
            {/* <Space.Compact> */}
            <PhoneInput placeholder='Số điện thoại' className='ant-input' country={'VN'} value={ph} onChange={setPh} />
            {/* <Button onClick={getOTP}>Lấy mã OTP</Button> */}
            {/* </Space.Compact> */}
          </Form.Item>
          {/* <Form.Item
            name='id_token'
            rules={[
              {
                required: true,
                message: 'Mã OTP không được để trống',
              },
            ]}
          >
            <Input placeholder='Nhập mã OTP' />
          </Form.Item> */}
          {/* <Form.Item
            name='address'
            rules={[
              {
                required: true,
                message: 'Địa chỉ không được để trống',
              },
            ]}
          >
            <Input placeholder='Địa chỉ' />
          </Form.Item> */}
          <Form.Item {...tailLayout} className='text-center'>
            <Button type='primary' htmlType='submit'>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal width={400} title='Nhập mã OTP' open={isOpen} onOk={handleSignup} onCancel={closeSignup}>
        <Input placeholder='Nhập mã OTP' value={_otp} onChange={(e) => setOtp(e.target.value)} />
      </Modal>
    </div>
  );
}
