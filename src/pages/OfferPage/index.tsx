import { useCommon } from '@/app/context/Common/CommonContext';
import { ModalPopup } from '@/shared/ui/PopupSystem/ModalPopup/ModalPopup';
import { TemplateModal } from '@/shared/ui/PopupSystem/TemplateModal/TemplateModal';
import { OfferStepForm } from '@/widgets/OfferForm';
import { DeclineOfferPopup } from '@/widgets/OfferForm/popups/DeclineOfferPopup';
import api from './api';
import { queryKeys } from '@/app/queryClient/queryKeys';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import { IOfferData, initialOfferData } from '@/widgets/OfferForm/initialOfferData';

function OfferPage() {
	const { isDeclineOfferPopupOpen, closeDeclineOfferPopup, isPopupHide, popupHide } = useCommon();
	const [, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const { data, isLoading } = useQuery(queryKeys.calculateOfferCost, api.getCalculateOfferCost);

	useEffect(() => {
		if (data?.value) {
			setOfferData((prev) => ({ ...prev, calculateOfferCost: true }));
		}
	}, [isLoading]);

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
