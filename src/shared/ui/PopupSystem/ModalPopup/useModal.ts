import { useEffect, useRef, useState } from 'react';
import { iModalPopUpProps } from './ModalPopup.interface';

/**
 * Custom hook to manage logic & functionality of ModalPopUp component
 * @param @param @param{boolean} show
 * @param @param @param{() => void} onClose
 * @param@param@param? {boolean} persistOnScreen
 * @returns @returns @returns{iUseModal} iUseModal
 */
export const useModal = ({
	show,
	onClose,
	persistOnScreen,
	onAnimationHideStart
}: Partial<iModalPopUpProps>) => {
	const modalContent = useRef<HTMLDivElement>(null);
	const [persist, setPersist] = useState(!!persistOnScreen);

	useEffect(() => {
		setTimeout(() => {
			show && document.body.classList.add('noscroll');
		}, 10);

		!show && document.body.classList.remove('noscroll');

		return () => document.body.classList.remove('noscroll');
	}, [show]);

	const handleClose = (
		e?:
			| React.MouseEvent<HTMLDivElement, MouseEvent>
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
	): void => {
		e?.stopPropagation();
		if (persist) return;
		onAnimationHideStart?.();
		setTimeout(() => onClose && onClose(), 300);
	};

	const handleKeyPress = (e: any): void => {
		if (e.key === 'Escape') handleClose();
	};

	const closeFocusInModal = () => {
		//modalContent?.current?.focus();
	};

	return {
		modalContent,
		handleClose,
		handleKeyPress,
		closeFocusInModal,
		setPersist
	};
};
