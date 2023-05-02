import { Button } from 'antd';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import firebase from 'libs/firebase';
import { useEffect, useState } from 'react';
import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-number-input/input';

const VerifyPhone2 = () => {
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  function onSignup() {
    setLoading(true);

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(firebase.auth, ph, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className='flex items-center justify-center '>
      <div>
        <div id='recaptcha-container'></div>
        {(
          <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
            {showOTP ? (
              <>
                <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor='otp' className='font-bold text-xl text-white text-center'>
                  Enter your OTP
                </label>
                <button onClick={onOTPVerify} className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'>
                  {loading && <CgSpinner size={20} className='mt-1 animate-spin' />}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                  <BsTelephoneFill size={30} />
                </div>
                <label htmlFor='' className='font-bold text-xl text-white text-center'>
                  Nhập số điện thoại của bạn
                </label>
                <PhoneInput className="ant-input" country={'VN'} value={ph} onChange={setPh} />
                <Button onClick={onSignup} >
                  {loading && <CgSpinner size={20} className='mt-1 animate-spin' />}
                  <span>Send code via SMS</span>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default VerifyPhone2;
