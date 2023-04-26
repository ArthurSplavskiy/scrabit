import { useCommon } from '@/app/context/Common/CommonContext';
import { ModalPopup } from '@/shared/ui/PopupSystem/ModalPopup/ModalPopup';
import { TemplateModal } from '@/shared/ui/PopupSystem/TemplateModal/TemplateModal';
import { OfferStepForm } from '@/widgets/OfferForm';
import { DeclineOfferPopup } from '@/widgets/OfferForm/popups/DeclineOfferPopup';

function OfferPage() {
	const { isDeclineOfferPopupOpen, closeDeclineOfferPopup, isPopupHide, popupHide } = useCommon();
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
