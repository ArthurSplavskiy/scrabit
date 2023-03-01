import { SyntheticEvent, useState } from 'react';
import { Icon } from '../../Icon/Icon';
import './PasswordField.scss';

export interface InterfacePasswordField extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	errors?: string[];
	note?: string;
	className?: string;
}

export const PasswordField: React.FC<InterfacePasswordField> = ({
	label,
	errors = [],
	className = '',
	note,
	...props
}) => {
	const [isPasswordType, setIsPasswordType] = useState(1);

	const showPasswordClickHandler = (e: SyntheticEvent): void => {
		e.preventDefault();
		e.stopPropagation();
		setIsPasswordType(Math.abs(isPasswordType - 1));
	};
	// TODO onblur - input => type=password
	// TODO mouseout to make type=password

	return (
		<div className={`PasswordField ${className} ${errors.length ? 'error' : ''}`}>
			{label && <label className='PasswordField-label label'>{label}</label>}
			<div className='PasswordField-control'>
				<input
					{...props}
					type={isPasswordType ? 'password' : 'text'}
					className='PasswordField-input input'
				/>
				<button
					onClick={showPasswordClickHandler}
					type='button'
					className='PasswordField-button'
					disabled={props.disabled}>
					<Icon icon={isPasswordType ? 'eye-hide' : 'eye-hide'} size='20' />
				</button>
			</div>
			{errors.map((error, i) => (
				<p key={i} className={'PasswordField-error-message error'}>
					{error}
				</p>
			))}
		</div>
	);
};
