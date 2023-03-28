import { Icon } from '../Icon/Icon';
import React, { DetailedHTMLProps, FC, RefAttributes, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Button.scss';
import googleIco from '../Icon/google.svg';
import facebookIco from '../Icon/facebook.svg';

interface IButtonProps
	extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	customType?: 'primary' | 'stroke' | 'text' | 'text-underline' | 'black' | 'outline' | 'circle';
	size?: 'big' | 'middle' | 'small';
	adaptive?: boolean;
	className?: string;
	width?: 'fullWidth';
	loading?: boolean;
	btnLink?: string;
	btnTo?: string;
	iconPosition?: 'left' | 'right';
	iconName?: 'arrow' | 'acc' | 'google' | 'facebook' | 'upload';
}

export const Button: FC<IButtonProps & RefAttributes<HTMLButtonElement>> = ({
	customType = 'primary',
	adaptive = false,
	size = 'middle',
	className = '',
	width = '',
	loading = false,
	btnLink = '',
	btnTo = '',
	iconPosition = 'left',
	iconName = '',
	children,
	...props
}) => {
	const loadingClassName = loading ? 'loading' : '';
	const Btn = () => (
		<button
			{...props}
			className={classNames(className, 'Button', {
				[size]: size,
				[customType]: customType,
				[loadingClassName]: loadingClassName,
				[width]: width,
				[iconName]: iconName,
				[customType]: customType,
				adaptive: adaptive
			})}>
			{iconPosition === 'left' && iconName === 'acc' && <Icon icon='acc' />}
			{iconPosition === 'left' && iconName === 'arrow' && <Icon icon='slider-arrow' />}
			{iconPosition === 'left' && iconName === 'google' && <img src={googleIco} alt={'google'} />}
			{iconPosition === 'left' && iconName === 'facebook' && (
				<img src={facebookIco} alt={'facebook'} />
			)}
			{iconPosition === 'left' && iconName === 'upload' && <Icon icon='upload' />}
			{children}
			{iconPosition === 'right' && iconName === 'acc' && <Icon icon='acc' />}
			{iconPosition === 'right' && iconName === 'arrow' && <Icon icon='slider-arrow' />}
			{iconPosition === 'right' && iconName === 'google' && <img src={googleIco} alt={'google'} />}
			{iconPosition === 'right' && iconName === 'facebook' && (
				<img src={facebookIco} alt={'facebook'} />
			)}
			{iconPosition === 'right' && iconName === 'upload' && <Icon icon='upload' />}
		</button>
	);

	if (btnLink) {
		return (
			<a href={btnLink} target='_blank' className={classNames({ [width]: width })}>
				<Btn />
			</a>
		);
	}

	if (btnTo) {
		return (
			<Link to={btnTo} className={classNames({ [width]: width })}>
				<Btn />
			</Link>
		);
	}

	return <Btn />;
};
