import { ChangeEvent, FC, InputHTMLAttributes, useEffect, useState } from 'react';
import './Checkbox.scss';

interface iCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	label: string;
	title?: string;
	showTitle?: boolean;
	colorType?: 'green' | 'purple';
	onChangeFn?: (arg: boolean) => void;
	checkStatus: boolean;
}

export const Checkbox: FC<iCheckboxProps> = ({
	label,
	onChange,
	title = '',
	className = '',
	id = '',
	showTitle = true,
	colorType,
	onChangeFn,
	checkStatus,
	...inputProps
}) => {
	const [checked, setChecked] = useState(checkStatus);
	const identification = id || label;

	useEffect(() => {
		setChecked(!!inputProps?.checked);
	}, [inputProps.checked]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked);
		onChangeFn?.(e.target.checked);
		onChange?.(e);
	};

	useEffect(() => {
		setChecked(checkStatus);
	}, [checkStatus]);

	return (
		<div className={`Checkbox ${className} ${colorType ? colorType : ''}`}>
			<input
				type='checkbox'
				id={identification}
				onChange={handleChange}
				className='Checkbox-input'
				{...inputProps}
				checked={checked}
			/>

			{title && <p className='Checkbox-title'>{title}</p>}

			<label className='Checkbox-label' htmlFor={identification}>
				{showTitle && label}
			</label>
		</div>
	);
};
