import { Button } from '@/shared/ui/Button';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { useLogin } from '@/widgets/Forms/LoginForm/useLogin';
import { Link } from 'react-router-dom';
import { FormFooter } from '../FormFooter';
import { useInterfaceText } from '@/app/context/User/UserContext';

export const ForgotPassword = () => {
	const { openRegistration } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();
	const { isMobile } = useDevice();
	const { onSubmit, formData, isLoading } = useLogin();
	return (
		<div className='AuthPopup'>
			<h3 className='AuthPopup-title'>{pageInterfaceText?.forgot_password}</h3>
			<p className='AuthPopup-subtitle'>{pageInterfaceText?.forgot_pass_info}</p>
			<span className='AuthPopup-info'>{pageInterfaceText?.spam_check}</span>
			<form className='AuthPopup-form' onSubmit={onSubmit}>
				<InputField
					{...formData.email.inputProps}
					value={formData.email.value}
					label={pageInterfaceText?.form_email}
					errors={formData.email.errors}
				/>

				{isMobile && (
					<div className='FormFooter-policy'>
						Натиснавши на кнопку, ви даєте згоду на обробку персональних даних та погоджуєтеся з
						<Link to='/'>політикою конфіденційності</Link> та{' '}
						<Link to='/'>угодою публічної оферти</Link>
					</div>
				)}

				<Button type='submit' color='primary' loading={isLoading}>
					{pageInterfaceText?.send}
				</Button>

				{isMobile && (
					<div className='FormFooter-link'>
						<div>{pageInterfaceText?.no_have_acc}</div>
						<button onClick={openRegistration}>{pageInterfaceText?.registration_link}</button>
					</div>
				)}
			</form>

			{!isMobile && (
				<FormFooter
					leftText={pageInterfaceText?.no_have_acc}
					rightText={pageInterfaceText?.registration_link}
					linkCallback={openRegistration}
				/>
			)}
		</div>
	);
};
