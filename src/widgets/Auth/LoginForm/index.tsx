// import { Button } from '@/components/shared/Button';
// import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
// import { PasswordField } from '@/components/shared/FormComponents/PasswordField/PasswordField';
// import { useCommon } from '@/context/CommonContext';
// import { useDevice } from '@/context/DeviceContext';
// import { useLogin } from '@/components/Forms/LoginForm/useLogin';
// import { Link } from 'react-router-dom';
// import { FormFooter } from '../FormFooter';
// import { useInterfaceText } from '@/context/UserContext';

// export const LoginForm = () => {
// 	const { openRegistration, openForgotPass } = useCommon();
// 	const { text: pageInterfaceText } = useInterfaceText();
// 	const { isMobile } = useDevice();
// 	const { onSubmit, formData, isLoading } = useLogin();
// 	return (
// 		<div className='AuthPopup'>
// 			<h3 className='AuthPopup-title'>{pageInterfaceText?.login_title}</h3>
// 			<form className='AuthPopup-form' onSubmit={onSubmit}>
// 				<InputField
// 					{...formData.email.inputProps}
// 					value={formData.email.value}
// 					label={pageInterfaceText?.form_email}
// 					errors={formData.email.errors}
// 				/>
// 				<PasswordField
// 					{...formData.password.inputProps}
// 					label={pageInterfaceText?.form_password}
// 					errors={formData.password.errors}
// 					autoComplete='new-password'
// 					className='above-forgot-pass'
// 				/>
// 				<div className='AuthPopup-forgot-pass' onClick={openForgotPass}>
// 					{pageInterfaceText?.forgot_password}
// 				</div>

// 				{isMobile && (
// 					<div className='FormFooter-policy'>
// 						Натиснавши на кнопку, ви даєте згоду на обробку персональних даних та погоджуєтеся з
// 						<Link to='/'>політикою конфіденційності</Link> та{' '}
// 						<Link to='/'>угодою публічної оферти</Link>
// 					</div>
// 				)}

// 				<Button type='submit' color='primary' loading={isLoading}>
// 					{pageInterfaceText?.login_btn}
// 				</Button>

// 				{isMobile && (
// 					<div className='FormFooter-link'>
// 						<div>{pageInterfaceText?.no_have_acc}</div>
// 						<button onClick={openRegistration}>{pageInterfaceText?.registration_link}</button>
// 					</div>
// 				)}
// 			</form>

// 			{!isMobile && (
// 				<FormFooter
// 					leftText={pageInterfaceText?.no_have_acc}
// 					rightText={pageInterfaceText?.registration_link}
// 					linkCallback={openRegistration}
// 				/>
// 			)}
// 		</div>
// 	);
// };

export {};
