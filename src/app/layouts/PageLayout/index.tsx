import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { Preloader } from '@/widgets/Preloader';
import { FC } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ModalPopup } from '@/shared/ui/PopupSystem/ModalPopup/ModalPopup';
import { TemplateModal } from '@/shared/ui/PopupSystem/TemplateModal/TemplateModal';
import './PageLayout.scss';
import { useCommon } from '@/app/context/Common/CommonContext';
import { CallbackWidget } from '@/widgets/CallbackWidget';
import { CallbackForm } from '@/widgets/CallbackWidget/CallbackForm';

const PageLayout: FC = () => {
	const { popupHide, isPopupHide, isCallbackPopupOpen, closeCallbackPopup, openCallbackPopup } =
		useCommon();
	return (
		<div className='PageLayout'>
			<Preloader />
			<ScrollRestoration />
			<Header />
			<div className='PageLayout-main page-offset'>
				<Outlet />
			</div>
			<CallbackWidget clickFn={openCallbackPopup} />
			<ModalPopup
				show={isCallbackPopupOpen}
				hide={isPopupHide}
				withBackdrop={false}
				onClose={closeCallbackPopup}
				onAnimationHideStart={popupHide}>
				<TemplateModal title='FEEDBACK' subTitle='Leave your phone number and we’ll call back'>
					<CallbackForm />
				</TemplateModal>
			</ModalPopup>
			<Footer />
		</div>
	);
};

export default PageLayout;
