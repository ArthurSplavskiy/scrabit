import { ChangeEvent, FC, InputHTMLAttributes, useEffect, useState } from 'react';
import './index.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	className?: string;
	text?: string;
}

export const Switcher: FC<Props> = ({ className, onChange, id, label, text, ...inputProps }) => {
	const [checked, setChecked] = useState(false);
	const identification = id || label;

	useEffect(() => {
		setChecked(!!inputProps?.checked);
	}, [inputProps.checked]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked);
		onChange?.(e);
	};

	return (
		<label htmlFor={identification} className={`Switcher ${className}`}>
			<input
				id={identification}
				type='checkbox'
				onChange={handleChange}
				checked={checked}
				{...inputProps}
			/>
			<div className='Switcher-slider'></div>
			<h3 className='Switcher-text'>{text}</h3>
		</label>
	);
};
