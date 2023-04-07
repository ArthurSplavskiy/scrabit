import { useLogin } from './useLogin';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { PasswordField } from '@/shared/ui/FormComponents/PasswordField/PasswordField';
import { Button } from '@/shared/ui/Button';
import styles from '../Auth.module.scss';
import classNames from 'classnames';
import Cookies from 'js-cookie';

export const LoginForm = () => {
	const { isMobile } = useDevice();
	const { onSubmit, formData, isLoading } = useLogin();
	return (
		<div className={styles.AuthBlock}>
			<div className={styles.AuthContent}>
				<h3 className={classNames(styles.AuthTitle, 'text-40-24')}>SIGN IN</h3>
				{Cookies.get('register_step') === 'finish' && (
					<p className={classNames(styles.AuthStatus, 'text-16-14')}>
						Looks like you already have an account. Enter your password, and you’re good to go!
					</p>
				)}
				<form className={styles.AuthForm} onSubmit={onSubmit}>
					<InputField
						{...formData.phone_number.inputProps}
						value={formData.phone_number.value}
						errors={formData.phone_number.errors}
						label='Phone number'
						placeholder='(____) ____-______'
					/>
					<PasswordField
						{...formData.password.inputProps}
						errors={formData.password.errors}
						label={'Password'}
						placeholder={'Enter password'}
						autoComplete='new-password'
						className='above-forgot-pass'
					/>
					<Button className={styles.AuthFormBtn} type='submit' loading={isLoading}>
						Sign in
					</Button>
				</form>

				<div className={styles.AuthFormFooter}>
					<div className={styles.AuthFormReset}>
						<Button customType='text-underline'>Reset password?</Button>
					</div>

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
						<span>Don’t have an sccount?</span>
						<Button customType='text-underline' btnTo='/auth/registration'>
							Get started
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
