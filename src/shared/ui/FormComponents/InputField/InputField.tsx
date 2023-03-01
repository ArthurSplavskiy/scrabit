import React, { ReactNode, useState } from 'react';
import './InputField.scss';

export interface InterfaceInputField extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	errors?: string[];
	note?: string;
	className?: string;
	refProp?: React.Ref<HTMLInputElement>;
	typeField?: 'horizontalLabel';
	suffix?: string;
	prefix?: string;
	rightPrefix?: string;
	buttonsVariantGroup?: ReactNode;
}

export const InputField: React.FC<InterfaceInputField> = ({
	label,
	errors = [],
	className = '',
	note,
	refProp,
	typeField = '',
	suffix = '',
	prefix = '',
	rightPrefix = '',
	buttonsVariantGroup,
	...props
}) => {
	const [isFocus, setIsFocus] = useState(false);

	return (
		<div className={`InputField ${className} ${!!errors.length ? 'error' : ''} ${typeField}`}>
			{label && (
				<label
					className={`InputField-label label ${isFocus ? 'focus' : ''} ${
						props.disabled ? 'disabled' : ''
					}`}
					htmlFor={props?.id}>
					{label}
				</label>
			)}

			{buttonsVariantGroup ? buttonsVariantGroup : null}

			{!suffix && !prefix && (
				<input
					ref={refProp}
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
					{...props}
					className='InputField-input input'
				/>
			)}

			{!!suffix && (
				<div className={`inputWrap`}>
					<span className='inputShadow'>
						{props?.value}
						{props?.value && suffix}
					</span>
					<input
						ref={refProp}
						onFocus={() => setIsFocus(true)}
						onBlur={() => setIsFocus(false)}
						{...props}
						className='InputField-input input'
					/>
				</div>
			)}

			{!!prefix && (
				<div className={`inputWrap`}>
					<span className='inputShadow'>
						{props?.value && prefix + ' '} {props?.value}
					</span>
					<input
						ref={refProp}
						onFocus={() => setIsFocus(true)}
						onBlur={() => setIsFocus(false)}
						{...props}
						className={`InputField-input input ${props?.value ? 'filled' : ''}`}
					/>
				</div>
			)}

			{!!rightPrefix && <span className={`InputField-RightPrefix`}>{rightPrefix}</span>}

			{errors.map((error, i) => (
				<span key={i} className='InputField-error-message error'>
					{error}
				</span>
			))}
			{note && <p className='InputField-note note'>{note}</p>}
		</div>
	);
};
