import React, { useState, useEffect, useRef } from 'react';
import { Translation, useTranslation } from 'react-i18next';
import { Space, Col, Row, Button, Divider, message, Typography, Modal, Form } from 'antd';
import styled from 'styled-components';
import utils from '../../../common/utils';
import consts from '../../../consts';
import _ from 'lodash';
// import AuthCode, { AuthCodeRef } from 'react-auth-code-input';
import { useSelector } from 'react-redux';
import Reaptcha, { Props as ReaptchaProps } from 'reaptcha';
import firebase from '../../../libs/firebase';
import { PinInput } from 'react-input-pin-code';

const { Text } = Typography;
const { confirm } = Modal;
const lengthCode = 6;
const TIME_VERIRY = 60;

function Step2VerifyPhoneScreen(props: any) {
	const [_otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
	const { t, i18n } = useTranslation();
	const [form] = Form.useForm();
	const [_isErrorCaptcha, setIsErrorCaptcha] = useState<string>('');
	const [_loading, setLoading] = useState<boolean>(false);
	const isCancelled = useRef(false);
	const [_countDown, setCountDown] = useState<number>(0);
	const _captcha = useRef<Reaptcha>(null);
	const [_verified, setVerified] = useState(false);
	const nodeRef = useRef(null);

	useEffect(() => {
		return () => {
			isCancelled.current = true;
		};
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (_countDown <= 0) {
				setCountDown(0);
				setVerified(true);
				clearInterval(intervalId);
			} else {
				setCountDown(_countDown - 1);
			}
		}, 1000);
		return () => clearInterval(intervalId);
	}, [_countDown]);

	async function handleVerifyOtp() {
		if (_otp.length === 6) {
			try {
				setLoading(true);
				const resp = await props.result.confirm(_.join(_otp, ''));
				props.firebaseVerify(
					{
						app_id: props.appID,
						id_token: resp._tokenResponse.idToken,
						nation: props.country,
						phonenumber: props.phoneNumber,
						pubkey: props.detail.pubkey,
					},
					(check: boolean) => {
						if (check) {
							props.checkVerifyAction();
						} else {
							// setIsErrorCaptcha(consts.INVALID_VERIFICATION_CODE);
						}
					}
				);
			} catch (err: any) {
				setIsErrorCaptcha(utils.errorFromFireBase(err));
				setLoading(false);
			}
		}
	}

	const sendOtpAgain = async (disabledResend: boolean) => {
		if (!disabledResend) {
			if (_verified) {
				setOtp(['', '', '', '', '', '']);
				setIsErrorCaptcha('');
				await _captcha.current?.reset();
				setVerified(false);
			}
			setCountDown(TIME_VERIRY);
			await _captcha.current?.execute();
		}
	};

	const renderButton = () => {
		const len = _.join(_otp, '').length;
		let disabled = false,
			disabledResend = false;
		if (lengthCode !== len) {
			disabled = true;
		}
		if (_countDown !== 0) {
			disabledResend = true;
		}
		return (
			<>
				<Form.Item>
					<Button className='btn' loading={_loading} disabled={disabled} htmlType='submit' type='primary'>
						{t('ekyc.email.step-2.text-3')}
					</Button>
					{/* <Row gutter={8} justify='space-around' align='bottom' className='flex-1'>
						<Col span={12}>
							<ButtonWrapper onClick={() => props.backScreenPhone()}>{t('ekyc.back')}</ButtonWrapper>
						</Col>
						<Col span={12}>
							<ButtonWrapper loading={_loading} disabled={disabled} htmlType='submit' type='primary'>
								{t('ekyc.email.step-2.text-3')}
							</ButtonWrapper>
						</Col>
					</Row> */}
				</Form.Item>
				<Text
					type={!disabledResend ? undefined : 'secondary'}
					onClick={() => sendOtpAgain(disabledResend)}
					className={`mb-3 self-center ${!disabledResend ? 'cursor-pointer' : ''}`}>
					{disabledResend ? t('ekyc.email.step-2.text-5', { time: _countDown }) : t('ekyc.email.step-2.text-4')}
				</Text>
			</>
		);
	};

	const onVerify = (recaptchaResponse: string) => {
		const captchaVerifier = {
			type: 'recaptcha',
			verify: () => Promise.resolve(recaptchaResponse),
			_reset: () => {},
		};
		firebase
			.signInWithPhoneNumber(firebase.auth, props.phoneNumber, captchaVerifier)
			.then(confirmationResult => {
				props.setResult(confirmationResult);
			})
			.catch(error => {
				// utils.showNotification(t('common.notification'), t('auth/too-many-requests'), 'error');
			});
	};

	const onLoad = () => {
		_captcha.current?.renderExplicitly();
	};

	return (
		<Form form={form} onFinish={handleVerifyOtp} className='custom-form'>
			<div className='flex justify-center mb-4'>
				<img src='/icons/phone2.png' />
			</div>
			<div className=''>
				<Space direction='vertical' className='mb-6'>
					<div className='text-2xl font-semibold'>{t('ekyc.phone.step-2.text-1')}</div>
					<div dangerouslySetInnerHTML={{ __html: t('ekyc.phone.step-2.text-2', { phone: props.phoneNumber }) }} />
					{/* <div>{t('ekyc.phone.step-2.text-2', { phone: props.phoneNumber })}</div> */}
				</Space>
				<Form.Item>
					{/* <AuthCode
                ref={AuthInputRef}
                allowedCharacters='numeric'
                onChange={handleInputOtp}
                inputClassName="code-input"
                containerClassName="code-verify"
              /> */}
					<PinInput
						values={_otp}
						type='number'
						autoFocus
						autoTab
						autoComplete='one-time-code'
						onChange={(value, index, values) => setOtp(values)}
						inputClassName='code-input'
						containerClassName='code-verify'
						placeholder=''
						showState={false}
					/>
					<Reaptcha
						key={'explicit'}
						ref={_captcha}
						// sitekey={SITE_KEY_FISEBASE}
						size={'invisible'}
						theme={'light'}
						explicit={true}
						onVerify={onVerify}
						onLoad={onLoad}
						hl={i18n.language === 'cn' ? 'zh-CN' : i18n.language}
					/>
				</Form.Item>
			</div>
			{/* <Divider className='mt-0'/> */}
			{renderButton()}
		</Form>
	);
}

export default Step2VerifyPhoneScreen;
