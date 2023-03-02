import { FC } from 'react';
import './Icon.scss';

export type tIcon =
	| 'acc'
	| 'check'
	| 'close'
	| 'coin'
	| 'doc-check'
	| 'double-check'
	| 'edit'
	| 'exit'
	| 'eye-hide'
	| 'facebook'
	| 'google'
	| 'green-check'
	| 'location'
	| 'message-sky'
	| 'messanger'
	| 'minus'
	| 'network-search'
	| 'phone-call'
	| 'phone'
	| 'plus'
	| 'search'
	| 'setting-list'
	| 'shevron-side'
	| 'shevron'
	| 'slider-arrow'
	| 'star'
	| 'twitter'
	| 'upload';

type tIconSize = '24' | '20' | '16' | '12' | '10' | '8';
type tColor = 'blue' | 'black' | 'white';

interface iProps {
	className?: string;
	icon: tIcon;
	size?: tIconSize;
	color?: tColor;
}

/**
 * @param {tIcon} icon - icon type
 *      for sort icon pass className with sort directions 'asc' | 'desc'
 * @param {String} className - icon className
 * @param {tIconSize} size - icon size - "xxsm" - 8px | "xsm" - 12px | "sm" - 16px | "md" - 24px | "lg" - 32px
 * @param {tColor} color - icon color - "gray" | "dark-gray" | "light-gray" | "black" | "white" | "yellow" | "red" | "green" | "orange
 * @return JSX.Element
 */
export const Icon: FC<iProps> = ({ icon, size = '20', className = '', color = '' }) => {
	return <i className={`icon icon__${size} ${color} icon-${icon} ${className}`} />;
};
