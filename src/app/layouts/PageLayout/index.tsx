import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { Preloader } from '@/widgets/Preloader';
import { FC, Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ModalPopup } from '@/shared/ui/PopupSystem/ModalPopup/ModalPopup';
import { TemplateModal } from '@/shared/ui/PopupSystem/TemplateModal/TemplateModal';
import { useCommon } from '@/app/context/Common/CommonContext';
import { CallbackWidget } from '@/widgets/CallbackWidget';
import { CallbackForm } from '@/widgets/CallbackWidget/CallbackForm';
import { PartnershipFormPopup } from '@/pages/Partnerships/ui/FormPopup';
import './PageLayout.scss';

const PageLayout: FC = () => {
	const {
		popupHide,
		isPopupHide,
		isCallbackPopupOpen,
		closeCallbackPopup,
		openCallbackPopup,
		closePartnershipPopup,
		isPartnershipPopupOpen
	} = useCommon();
	return (
		<div className='PageLayout'>
			{/* <Preloader /> */}
			<ScrollRestoration />
			<Header />
			<div className='PageLayout-main page-offset'>
				<Suspense fallback={<Preloader />}>
					<Outlet />
				</Suspense>
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
			<ModalPopup
				show={isPartnershipPopupOpen}
				hide={isPopupHide}
				withBackdrop={false}
				onClose={closePartnershipPopup}
				onAnimationHideStart={popupHide}>
				<TemplateModal
					title='Let’s hit the road together'
					subTitle='A representative from our team will reach out to your shorty to review your application and talk about next steps.
Looking forward to it!'>
					<PartnershipFormPopup />
				</TemplateModal>
			</ModalPopup>
			<Footer />
		</div>
	);
};

export default PageLayout;
