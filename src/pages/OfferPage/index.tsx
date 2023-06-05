import { useCommon } from '@/app/context/Common/CommonContext';
import { ModalPopup } from '@/shared/ui/PopupSystem/ModalPopup/ModalPopup';
import { TemplateModal } from '@/shared/ui/PopupSystem/TemplateModal/TemplateModal';
import { OfferStepForm } from '@/widgets/OfferForm';
import { DeclineOfferPopup } from '@/widgets/OfferForm/popups/DeclineOfferPopup';
import { useEffect } from 'react';

function OfferPage() {
	const { isDeclineOfferPopupOpen, closeDeclineOfferPopup, isPopupHide, popupHide } = useCommon();
	const { setPageIsLoaded } = useCommon();

	useEffect(() => {
		setPageIsLoaded(true);
	}, []);

	return (
		<>
			<OfferStepForm />
			<ModalPopup
				show={isDeclineOfferPopupOpen}
				hide={isPopupHide}
				withBackdrop={false}
				onClose={closeDeclineOfferPopup}
				showCloseButton={false}
				onAnimationHideStart={popupHide}>
				<TemplateModal>
					<DeclineOfferPopup />
				</TemplateModal>
			</ModalPopup>
		</>
	);
}

export default OfferPage;
