import Background from '../../static/background_login.jpg';
import { Button, Form, Input } from 'antd';
import { openNotification } from 'common/Notify';
import consts from 'consts';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import firebase from 'libs/firebase';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-number-input/input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import actions from 'redux/actions/user';

const layout = {
  wrapperCol: {
    span: 24,
  },
};
const ForgetPass = () => {
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [_isNewPass, setIsNewPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [_result, setResult] = useState<any>({});

  function getOTP() {
    setLoading(true);

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(firebase.auth, ph, appVerifier)
      .then((confirmationResult) => {
        setResult(confirmationResult);
        setLoading(false);
        setShowOTP(true);
      })
      .catch((error) => {
        openNotification({
          description: errorFromFireBase(error),
          type: 'error',
        })
        setLoading(false);
      });
  }

  const errorFromFireBase = (err: any) => {
    const stringErr = err.toString();
    const str = stringErr.substring(stringErr.indexOf('(') + 1, stringErr.lastIndexOf(')')).trim();
    const arr = [
      consts.TOO_MANY_REQUESTS_STR,
      consts.INVALID_PHONE_NUMBER,
      consts.CODE_EXPIRED,
      consts.MISSING_VERIFICATION_CODE,
      consts.INVALID_VERIFICATION_CODE,
    ];
    if (_.includes(arr, str)) {
      return str;
    } else {
      return consts.VERIFICATION_ERROR;
    }
  };

  const onFinish = async (value) => {
    const resp = await _result.confirm(value.otp);
    dispatch(
      actions.actionForgetPassword({
        params: {
          phone: ph,
          pass: value.pass,
          id_token: resp._tokenResponse.idToken,
        },
        callbacks: {
          onSuccess() {
            openNotification({
              description: 'Đổi mật khẩu thành công',
              type: 'success',
            });
            navigate('login');
            // fetchInfo(data.id);
          },
        },
      }),
    );
  };

  return (
    <div className='bg' style={{ backgroundImage: `url(${Background})` }}>
      <div className='w-modal m-auto p-12 rounded-3xl bg-[#ffffffe0] text-center'>
        <div className='text-3xl mb-4 text-zinc-800 font-bold'>QUÊN MẬT KHẨU</div>
        {/* <div id='recaptcha-container'></div> */}
        <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
          {showOTP ? (
            <>
              <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                <BsFillShieldLockFill size={30} />
              </div>
              <Form size='large' {...layout} name='basic' onFinish={onFinish} className='m-auto' layout='vertical' autoComplete=''>
                <Form.Item
                  name='otp'
                  rules={[
                    {
                      required: true,
                      message: 'OTP không được bỏ trống',
                    },
                  ]}
                >
                  <Input placeholder='Nhập mã OTP' />
                </Form.Item>

                <Form.Item
                  name='pass'
                  rules={[
                    {
                      required: true,
                      message: 'Mật khẩu không được bỏ trống',
                    },
                  ]}
                >
                  <Input.Password placeholder='Mật khẩu mới' />
                </Form.Item>

                <Form.Item>
                  <Button type='primary' className='w-full' htmlType='submit' size='large'>
                    Đổi mật khẩu
                  </Button>
                </Form.Item>
              </Form>

              {/* <label htmlFor='otp' className='font-bold text-xl  text-center'>
                Enter your OTP
              </label>
              <Button onClick={onVerify} loading={loading}>
                Xác
              </Button>
              <button onClick={onVerify} className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5  rounded'>
                {loading && <CgSpinner size={20} className='mt-1 animate-spin' />}
                <span>Verify OTP</span>
              </button> */}
            </>
          ) : (
            <>
              <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                <BsTelephoneFill size={30} />
              </div>
              <label htmlFor='' className='font-bold text-xl  text-center'>
                Nhập số điện thoại của bạn
              </label>
              <PhoneInput className='ant-input' country={'VN'} value={ph} onChange={setPh} />
              <Button onClick={getOTP} loading={loading}>
                Nhận mã OTP
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
