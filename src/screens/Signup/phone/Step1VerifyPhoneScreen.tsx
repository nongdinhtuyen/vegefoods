import utils from '../../../common/utils';
import firebase from '../../../libs/firebase';
import { Row, Col, Modal, Form, Typography, Select, Divider, Button } from 'antd';
import _ from 'lodash';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInput, { getCountries, getCountryCallingCode, isValidPhoneNumber } from 'react-phone-number-input/input';
import Reaptcha, { Props as ReaptchaProps } from 'reaptcha';

const { Text } = Typography;
const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
  overflow: 'hidden',
  display: 'block',
  height: 0,
};

const transitionStyles = {
  entering: { opacity: 1, height: 20, overflow: 'hidden' },
  entered: { opacity: 1, height: 20 },
  exiting: { opacity: 0, height: 0, overflow: 'hidden' },
  exited: { opacity: 0, height: 0 },
};

function Step1VerifyPhoneScreen(props: any) {
  const [form] = Form.useForm();
  const [_input, setInput] = useState<string>('');
  const [_isErrorCaptcha, setIsErrorCaptcha] = useState<string>('');
  const [_loading, setLoading] = useState<boolean>(false);
  const [_visible, setVisible] = useState(false);
  const [_captchaReady, setCaptchaReady] = useState(false);
  const [_verified, setVerified] = useState(false);
  const _captcha = useRef<Reaptcha>(null);
  const nodeRef = useRef(null);

  const handleLanguageChanged = useCallback((lng: string) => {
    _captcha.current?.reset().then(() => {
      _captcha.current?.renderExplicitly();
    });
  }, []);

  const onFinish = async () => {
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

  const handlePhoneNumber = (value: any) => {
    setInput(value);
    props.handleChange(value);
  };

  const renderOption = (item: any) => {
    return (
      <div className='flex items-center'>
        {/* {flagImg(item)} */}
        <span>{`${' +'}${getCountryCallingCode(item)}`}</span>
      </div>
    );
  };

  const handleSelectCountry = (value: string) => {
    props.setCountry(value);
  };

  const showModal = () => {
    setLoading(true);
  };

  const handleOk = () => {
    setVisible(false);
    onFinish();
  };

  const handleCancel = () => {
    setVisible(false);
    setLoading(false);
  };

  const onLoad = () => {
    _captcha.current?.renderExplicitly();
    setCaptchaReady(true);
  };

  const onVerify = async (recaptchaResponse: string) => {
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
        _reset: () => {},
      };
      firebase
        .signInWithPhoneNumber(firebase.auth, props.phoneNumber, captchaVerifier)
        .then((confirmationResult) => {
          props.setResult(confirmationResult);
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

  return (
    <>
      <Form form={form} onFinish={showModal} className='custom-form'>
        <div className='flex justify-center mb-4'>
          <img src={'/icons/phone2.png'} />
        </div>
        <div className='font-semibold text-2xl'>{'ekyc.phone.step-1.text-1'}</div>
        <div className='my-2'>{'ekyc.phone.step-1.text-2'}</div>
        <Reaptcha
          key={'explicit'}
          ref={_captcha}
          // sitekey={SITE_KEY_FISEBASE}
          size={'invisible'}
          theme={'light'}
          explicit={true}
          onLoad={onLoad}
          onVerify={onVerify}
          hl={'vi'}
        />
        <Form.Item>
          <Row className='mb-2'>
            <Col span={10}>
              <Select
                showSearch
                value={props.country}
                size='large'
                onChange={handleSelectCountry}
                className='select-list-country'
                filterOption={(input: string, option: any) => {
                  return option.name.toLowerCase().includes(input.toLowerCase().trim());
                }}
                options={_.chain(getCountries())
                  .filter((item) => !_.includes(['AC', 'TA'], item))
                  .map((item, index) => {
                    return {
                      key: index,
                      label: renderOption(item),
                      value: item || '',
                      name: getCountryCallingCode(item),
                    };
                  })
                  .value()}
              />
            </Col>
            <Col span={13} offset={1}>
              <PhoneInput
                international
                country={props.country}
                value={props.phoneNumber}
                onChange={handlePhoneNumber}
                className='phone-number-input'
                onFocus={() => setIsErrorCaptcha('')}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button
            htmlType='submit'
            size='large'
            className='btn'
            loading={_loading}
            disabled={(props.phoneNumber ? !isValidPhoneNumber(props.phoneNumber) : true) || !_captchaReady}
          >
            Tiếp tục
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title={'ekyc.phone.verification'}
        open={_visible}
        onOk={handleOk}
        onCancel={handleCancel}
        className='modal-radius'
        cancelText={'ekyc.edit-info-cancel'}
        okText={'ekyc.edit-info-next'}
      >
        {'ekyc.already_exist_phone'}
      </Modal>
    </>
  );
}

export default Step1VerifyPhoneScreen;
