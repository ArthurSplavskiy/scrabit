import { FC } from 'react';
import { useAccount } from '@/app/context/Account/AccountContextHooks';
import { useCommon } from '@/app/context/Common/CommonContext';
import { ModalPopup } from './ModalPopup/ModalPopup';
import { TemplateModal } from './TemplateModal/TemplateModal';
import { useInterfaceText } from '@/app/context/User/UserContext';

export const PrivatePopups: FC = () => {
	const { isThankPopupOpen, closeThank } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();
	const {
		state: {
			isAddToBalancePopup,
			closeAddToBalancePopup,
			isReplaceIpPopup,
			closeReplaceIpPopup,
			isExportPopup,
			closeExportPopup,
			isContinuePopup,
			closeContinuePopup
		},
		isPopupHide,
		popupHide
	} = useAccount();

	return (
		<>
			{/* Thank popup */}
			<ModalPopup show={isThankPopupOpen} withBackdrop={false} onClose={closeThank}>
				<TemplateModal
					color='primary'
					className='TemplateModal-message'
					title={pageInterfaceText?.thank_text}
					subTitle={pageInterfaceText?.thank_message}
				/>
			</ModalPopup>
		</>
	);
};
