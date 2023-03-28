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

const STATUS_TEXT = {
	enterPhone: 'Enter your phone number we will send your an activation code',
	enterCode: 'Enter an activation code',
	enterPassword: 'Create password for scrabit.com',
	haveAccount: 'Looks like you already have an account. Enter your password, and you’re good to go!'
};

type TStep = 'phone' | 'code' | 'password';

export const RegisterForm = () => {
	const { isMobile } = useDevice();
	const { onSubmitPhone, formDataPhone, isLoadingPhone, nextPhone } = usePhone();
	const { onSubmitCode, formDataCode, isLoadingCode, nextCode } = useCode();
	const { onSubmitPassword, formDataPassword, isLoadingPassword } = usePassword();
	const [status, setStatus] = useState(STATUS_TEXT.enterPhone);
	const [step, setStep] = useState<TStep>('phone');

	useEffect(() => {
		if (!Cookies.get('register_step')) Cookies.set('register_step', 'phone');
		if (Cookies.get('register_step') === 'phone') setStep('phone');
		if (Cookies.get('register_step') === 'code') setStep('code');
		if (Cookies.get('register_step') === 'password') setStep('password');
	}, [nextPhone, nextCode]);

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

	return (
		<div className={styles.AuthBlock}>
			<div className={styles.AuthContent}>
				<h3 className={classNames(styles.AuthTitle, 'text-40-24')}>Create an account</h3>
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
							placeholder={'Enter a code'}
							className='above-forgot-pass'
						/>
					)}
					{step === 'password' && (
						<PasswordField
							{...formDataPassword.password.inputProps}
							errors={formDataPassword.password.errors}
							label={'Password'}
							placeholder={'Enter password'}
							autoComplete='new-password'
							className='above-forgot-pass'
						/>
					)}
					<Button
						className={styles.AuthFormBtn}
						type='submit'
						color='primary'
						loading={setIsLoading(step)}>
						continue
					</Button>
				</form>

				<div className={styles.AuthFormFooter}>
					<div className={styles.AuthFormOr}>
						<div>
							<span>Or</span>
						</div>
						<span>Sign Up with</span>
					</div>

					<div className={styles.AuthFormGoogleFacebook}>
						<Button customType='outline' iconName='google' iconPosition='left'>
							{!isMobile && 'with google'}
						</Button>
						<Button customType='outline' iconName='facebook' iconPosition='left'>
							{!isMobile && 'with facebook'}
						</Button>
					</div>

					<div className={styles.AuthFormHaveAcc}>
						<span>Have an sccount?</span>
						<Button customType='text-underline' btnTo='/auth/login'>
							Sign in
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
