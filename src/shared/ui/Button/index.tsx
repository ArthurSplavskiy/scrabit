import { Icon } from '../Icon/Icon';
import React, { DetailedHTMLProps, FC, RefAttributes } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Button.scss';

interface IButtonProps
	extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	customType?: 'primary' | 'stroke' | 'text' | 'black' | 'outline' | 'circle';
	size?: 'big' | 'middle' | 'small';
	adaptive?: boolean;
	className?: string;
	width?: 'fullWidth';
	loading?: boolean;
	btnLink?: string;
	btnTo?: string;
	iconPosition?: 'left' | 'right';
	iconName?: 'arrow' | 'acc' | 'google' | 'facebook' | '';
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
			{iconPosition === 'left' && iconName === 'google' && <Icon icon='google' />}
			{iconPosition === 'left' && iconName === 'facebook' && <Icon icon='facebook' />}
			{children}
			{iconPosition === 'right' && iconName === 'acc' && <Icon icon='acc' />}
			{iconPosition === 'right' && iconName === 'arrow' && <Icon icon='slider-arrow' />}
			{iconPosition === 'right' && iconName === 'google' && <Icon icon='google' />}
			{iconPosition === 'right' && iconName === 'facebook' && <Icon icon='facebook' />}
		</button>
	);

	if (btnLink) {
		return (
			<a href={btnLink} target='_blank'>
				<Btn />
			</a>
		);
	}

	if (btnTo) {
		return (
			<Link to={btnTo}>
				<Btn />
			</Link>
		);
	}

	return <Btn />;
};
