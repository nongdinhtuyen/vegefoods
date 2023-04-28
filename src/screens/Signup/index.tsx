import actions from '../../redux/actions/user';
import Background from '../../static/background_login.jpg';
import VerifyPhone from './VerifyPhone';
import { Form, Input, Button, notification, Select, Space } from 'antd';
import utils from 'common/utils';
import firebase from 'libs/firebase';
import _ from 'lodash';
import { useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Reaptcha from 'reaptcha';
import VerifyPhone2 from './VerifyPhone2';

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

  const getOTP = async () => {
    setIsErrorCaptcha('');
    if (_verified) {
      await _captcha.current?.reset();
      setVerified(false);
    }
    await _captcha.current?.execute();
    // if (isValidPhoneNumber(props.phoneNumber)) {
    //   setError('')
    //   setIsErrorCaptcha('')
    //   setIsError(false)
    //   setLoading(true)
    //   if(_verified){
    //     _captcha.current?.reset();
    //     setVerified(false)
    //   } else {
    //     _captcha.current?.renderExplicitly();
    //   }
    // } else {
    //   setError(t('auth/invalid-phone-number'))
    //   setIsError(false)
    // }
  };

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

  const onLoad = () => {
    _captcha.current?.renderExplicitly();
    setCaptchaReady(true);
  };

  const onVerify = async (recaptchaResponse: string) => {
    console.log('🚀 ~ file: index.tsx:85 ~ onVerify ~ recaptchaResponse:', recaptchaResponse);
    if (_isErrorCaptcha) {
      await _captcha.current?.reset();
      setIsErrorCaptcha('');
      setVerified(false);
      setLoading(false);
    } else {
      setVerified(true);
      const captchaVerifier = {
        type: 'recaptcha',
        verify: () => Promise.resolve(recaptchaResponse),
      };
      firebase
        .signInWithPhoneNumber(firebase.auth, `+840829946899`, captchaVerifier)
        .then((confirmationResult) => {
          console.log('🚀 ~ file: index.tsx:101 ~ .then ~ confirmationResult:', confirmationResult);
          // props.setResult(confirmationResult);
          setLoading(false);
          setIsErrorCaptcha('');
          // props.setStepPhone(StepScreenPhone.Step2VerifyPhoneScreen);
        })
        .catch((error) => {
          setIsErrorCaptcha(utils.errorFromFireBase(error));
          setLoading(false);
        });
    }
  };

  const signin = () => {
    const verify = new firebase.RecaptchaVerifier('recaptcha-container', {}, firebase.auth);

    firebase
      .signInWithPhoneNumber(firebase.auth, '+84829946899', verify)
      .then((result) => {
        // setResult(result);
        // setStep('VERIFY_OTP');
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className='bg' style={{ backgroundImage: `url(${Background})` }}>
      <div className='container'>
        <div className='login-container'>
          <h1>ĐĂNG KÝ</h1>
          <VerifyPhone2 />
          {/* <Reaptcha
            key={'automatic'}
            ref={_captcha}
            sitekey={'6Ldc8r8lAAAAAAnqcWjx0f2Hd5XDQUDjmNOIw16i'} //test
            // sitekey={'6LfdhrclAAAAAP1rIDtVQPsvQmJiA6HDvYtMndBH'}
            // sitekey={'6LcMZR0UAAAAALgPMcgHwga7gY5p8QMg1Hj-bmUv'}
            size={'invisible'}
            theme={'light'}
            explicit={false}
            // onLoad={onLoad}
            onVerify={onVerify}
            hl={'vi'}
          />
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
                {
                  type: 'number',
                  message: 'Số điện thoại không hợp lệ',
                  transform: (value) => _.toNumber(value),
                },
              ]}
            >
              <Space.Compact>
                <Input placeholder='Số điện thoại' />
                <Button onClick={getOTP}>Lấy mã OTP</Button>
              </Space.Compact>
            </Form.Item>
            <Form.Item
              name='id_token'
              rules={[
                {
                  required: true,
                  message: 'Mã OTP không được để trống',
                },
              ]}
            >
              <Input placeholder='Nhập mã OTP' />
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
          </Form> */}
        </div>
      </div>
    </div>
  );
}
