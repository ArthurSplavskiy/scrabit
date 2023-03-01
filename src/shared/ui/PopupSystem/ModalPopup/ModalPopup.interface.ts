import { ReactNode } from 'react';

export interface iModalPopUpProps {
	className?: string;
	containerClass?: string;
	show: boolean;
	hide?: boolean;
	persistOnScreen?: boolean;
	onClose?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onAnimationHideStart?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	showCloseButton?: boolean;
	size?: 'sm' | 'md' | 'lg' | 'xlg' | 'w-528';
	withoutPaddings?: boolean;
	children: ReactNode;
	type?: 'video' | 'content';
	withBackdrop?: boolean;
}
