import { useEffect, FC, ReactElement, useState } from 'react';
import { Portal } from '../Portal/Portal';
import { useModal } from './useModal';
import { iModalPopUpProps } from './ModalPopup.interface';
import { Icon } from '@/shared/ui/Icon/Icon';
import './ModalPopup.scss';

/**
 * Modal pop up component for most of content
 * @controller @controller @controller**useModal** provides all necessary data and functionality to operate data for current component
 * @returns @returns @returns{React.ReactElement} React.ReactElement
 */
export const ModalPopup: FC<iModalPopUpProps> = ({
	children,
	onClose,
	show,
	hide,
	className = '',
	containerClass = '',
	persistOnScreen,
	showCloseButton = true,
	size,
	withoutPaddings,
	type = 'popup-content',
	onAnimationHideStart,
	withBackdrop
}): ReactElement | null => {
	const { modalContent, handleClose, handleKeyPress, closeFocusInModal, setPersist } = useModal({
		show,
		onClose,
		onAnimationHideStart,
		persistOnScreen
	});

	useEffect(() => {
		if (show) {
			document.addEventListener('keydown', handleKeyPress);
		} else {
			document.removeEventListener('keydown', handleKeyPress);
		}
	}, [show]);

	useEffect(() => setPersist(!!persistOnScreen), [persistOnScreen]);

	if (!show) return null;

	return (
		<Portal>
			<div
				className={`Portal ModalPopUp-portal portal ${className} ${
					show ? 'ModalPopUp-portal-active' : ''
				} ${hide ? 'ModalPopUp-portal-hide' : ''}`}>
				<div tabIndex={0} onKeyDown={handleKeyPress} />
				{/* onFocus={closeFocusInModal} */}
				<div
					className='ModalPopUp-backdrop backdrop'
					role='dialog'
					aria-modal='true'
					onClick={handleClose}
					data-testid='ModalPopUp-wrapper'
				/>
				{withBackdrop && (
					<div
						className='ModalPopUp-backdrop backdrop'
						role='dialog'
						aria-modal='true'
						onClick={handleClose}
						data-testid='ModalPopUp-wrapper'
					/>
				)}

				<div className={`ModalPopUp-container ${size} ${type} ${containerClass}`}>
					{showCloseButton && (
						<button
							aria-label='Close modal pop up'
							className='ModalPopUp-close'
							onClick={handleClose}
							data-testid='modal-close-btn'>
							<Icon icon='close' size='10' />
						</button>
					)}
					<div
						tabIndex={0}
						ref={modalContent}
						className={`ModalPopUp-content ${withoutPaddings ? 'withoutPaddings' : ''}`}>
						{children}
					</div>
				</div>
				{/* <div tabIndex={0} onFocus={closeFocusInModal} /> */}
			</div>
		</Portal>
	);
};
