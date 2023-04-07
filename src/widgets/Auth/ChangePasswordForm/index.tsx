import { usePhone } from './usePhone';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { PasswordField } from '@/shared/ui/FormComponents/PasswordField/PasswordField';
import { Button } from '@/shared/ui/Button';
import styles from '../Auth.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useCode } from './useCode';
import { usePassword } from './usePassword';
import { Icon } from '@/shared/ui/Icon/Icon';

const STATUS_TEXT = {
	enterPhone: 'Enter your phone number we will send your an activation code',
	enterCode: 'Enter a code',
	enterPassword: 'Enter a new password for scrabit.com'
};

type TStep = 'phone' | 'code' | 'password';

export const ChangePasswordForm = () => {
	const { isMobile } = useDevice();
	const { onSubmitPhone, formDataPhone, isLoadingPhone, nextPhone } = usePhone();
	const { onSubmitCode, formDataCode, isLoadingCode, nextCode } = useCode();
	const { onSubmitPassword, formDataPassword, isLoadingPassword } = usePassword();
	const [status, setStatus] = useState(STATUS_TEXT.enterPhone);
	const [step, setStep] = useState<TStep>('phone');
	const [isMore6CharPassword, setIsMore6Password] = useState(false);
	const [isLess25CharPassword, setIsLess25Password] = useState(false);

	useEffect(() => {
		if (!Cookies.get('change_password_step')) Cookies.set('change_password_step', 'phone');
		if (Cookies.get('change_password_step') === 'phone') setStep('phone');
		if (Cookies.get('change_password_step') === 'code') {
			setStatus(STATUS_TEXT.enterCode);
			setStep('code');
		}
		if (Cookies.get('change_password_step') === 'password') {
			setStatus(STATUS_TEXT.enterPassword);
			setStep('password');
		}
	}, [nextPhone, nextCode]);

	useEffect(() => {
		const v = formDataPassword.password.inputProps.value;
		setIsMore6Password(v.length >= 6);
		setIsLess25Password(v.length <= 25 && v.length > 0);
	}, [formDataPassword.password.inputProps.value]);

	const setSubmitCallback = (step: TStep) => {
		if (step === 'phone') return onSubmitPhone;
		if (step === 'code') return onSubmitCode;
		if (step === 'password') return onSubmitPassword;
	};
	const setIsLoading = (step: TStep) => {
		if (step === 'phone') return isLoadingPhone;
		if (step === 'code') return isLoadingCode;
		if (step === 'password') return isLoadingPassword;
	};

	// useEffect(() => {
	// 	if (step === 'phone') Cookies.set('change_password_step', 'phone');
	// 	if (step === 'code') Cookies.set('change_password_step', 'code');
	// 	if (step === 'password') Cookies.set('change_password_step', 'password');
	// }, [step]);

	return (
		<div className={styles.AuthBlock}>
			<Button
				className={styles.AuthBlockBackBtn}
				iconName='arrow'
				type='button'
				iconPosition='left'
				customType='outline'
				btnTo={step === 'phone' ? '/profile' : ''}
				onClick={() => {
					if (step === 'code') {
						Cookies.set('change_password_step', 'phone');
						setStep('phone');
						setStatus(STATUS_TEXT.enterPhone);
					}
					if (step === 'password') {
						Cookies.set('change_password_step', 'code');
						setStep('code');
						setStatus(STATUS_TEXT.enterCode);
					}
				}}>
				{isMobile ? '' : 'Back'}
			</Button>
			<div className={styles.AuthContent}>
				<h3 className={classNames(styles.AuthTitle, 'text-40-24')}>Change password</h3>
				<p className={classNames(styles.AuthStatus, 'text-16-14')}>{status}</p>

				<form className={styles.AuthForm} onSubmit={setSubmitCallback(step)}>
					{step === 'phone' && (
						<InputField
							{...formDataPhone.phone_number.inputProps}
							value={formDataPhone.phone_number.value}
							errors={formDataPhone.phone_number.errors}
							label='Phone number'
							placeholder='(____) ____-______'
						/>
					)}
					{step === 'code' && (
						<PasswordField
							{...formDataCode.code.inputProps}
							errors={formDataCode.code.errors}
							label={'Activation code'}
							placeholder={'**********'}
							className='above-forgot-pass'
						/>
					)}
					{step === 'password' && (
						<>
							<PasswordField
								{...formDataPassword.password.inputProps}
								label={'Password'}
								placeholder={'Enter password'}
								autoComplete='new-password'
								className='above-forgot-pass'
							/>
							<div className={styles.AuthFormPassCheck}>
								<span>Make sure your new password meets the following criteria:</span>
								<div
									className={classNames(styles.AuthFormPassCheckLine, {
										[styles.AuthFormPassCheckEquals]: isMore6CharPassword
									})}>
									<Icon icon='check' size='16' color='blue' />
									More than or equal to 6 characters
								</div>
								<div
									className={classNames(styles.AuthFormPassCheckLine, {
										[styles.AuthFormPassCheckEquals]: isLess25CharPassword
									})}>
									<Icon icon='check' size='16' color='blue' />
									Less than or equal to 25 characters
								</div>
							</div>
						</>
					)}
					<Button className={styles.AuthFormBtn} type='submit' loading={setIsLoading(step)}>
						{step === 'phone' ? 'send' : 'Change password'}
					</Button>
				</form>

				{step === 'code' && (
					<form className={styles.SendCodeForm}>
						<div className={styles.AuthFormHaveAcc}>
							<span>If you did not receive a code, click here</span>
							<Button customType='text-underline' color='blue'>
								Send again
							</Button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};
