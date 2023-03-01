import { useCommon } from '@/app/context/Common/CommonContext';
import { useInterfaceText } from '@/app/context/User/UserContext';
import { FC } from 'react';
import { ForgotPassword } from '../../../widgets/Forms/ForgotPassword';
import { LoginForm } from '../../../widgets/Forms/LoginForm';
import { RegisterForm } from '../../../widgets/Forms/RegisterForm';
import { Icon } from '../Icon/Icon';
import { ModalPopup } from './ModalPopup/ModalPopup';
import { TemplateModal } from './TemplateModal/TemplateModal';

export const PublicPopups: FC = () => {
	const {
		isRegistrationPopupOpen,
		isErrorPopupOpen,
		isLoginPopupOpen,
		isForgotPassPopupOpen,
		closeRegistration,
		closeLogin,
		closeForgotPass,
		isPopupHide,
		popupHide,
		closeError,
		error
	} = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();

	return (
		<>
			{/* Registration popup */}
			<ModalPopup
				show={isRegistrationPopupOpen}
				hide={isPopupHide}
				withBackdrop={false}
				onClose={closeRegistration}
				onAnimationHideStart={popupHide}>
				<TemplateModal>
					<RegisterForm />
				</TemplateModal>
			</ModalPopup>

			{/* Login popup */}
			<ModalPopup
				show={isLoginPopupOpen}
				hide={isPopupHide}
				withBackdrop={false}
				onClose={closeLogin}
				onAnimationHideStart={popupHide}>
				<TemplateModal>
					<LoginForm />
				</TemplateModal>
			</ModalPopup>

			{/* Forgot pass popup */}
			<ModalPopup
				show={isForgotPassPopupOpen}
				hide={isPopupHide}
				withBackdrop={false}
				onClose={closeForgotPass}
				onAnimationHideStart={popupHide}>
				<TemplateModal>
					<ForgotPassword />
				</TemplateModal>
			</ModalPopup>

			{/* Error popup */}
			<ModalPopup show={isErrorPopupOpen} withBackdrop={false} onClose={closeError}>
				<TemplateModal
					color='yellow'
					className='TemplateModal-message'
					title={pageInterfaceText?.error_title}
					//subTitle={error?.text}
					icon={<Icon icon='info' />}
				/>
			</ModalPopup>
		</>
	);
};
