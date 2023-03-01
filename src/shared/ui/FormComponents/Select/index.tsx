import React, { ChangeEvent, SelectHTMLAttributes, ReactElement } from 'react';
import { Icon } from '../../Icon/Icon';
import './Select.scss';
/**
 * Select component params interface
 */
export interface iSelectProps<T>
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
	value?: string | number | undefined;
	onChange?: (e: ChangeEvent<HTMLSelectElement>, v?: T) => void;
	options: T[] | undefined;
	canSelectEmpty?: boolean;
	targetKeys?: { value: string; label: string };
	label?: string;
	dataTestId?: string;
	className?: string;
	errors?: string[];
	refProp?: React.Ref<HTMLSelectElement>;
}

/**
 * Renders select input
 * @return {React.ReactElement} React.ReactElement
 */

export function Select<T>({
	label,
	value,
	onChange,
	dataTestId,
	options,
	canSelectEmpty,
	className,
	errors = [],
	targetKeys = { value: 'value', label: 'label' },
	refProp,
	...props
}: iSelectProps<T>): ReactElement {
	const isError = !!errors.length ? 'error' : '';

	return (
		<div className={`Select ${className || ''}`}>
			{label && <label className={`Select-label label ${isError}`}>{label}</label>}

			<div className='Select-icon-container'>
				<select
					ref={refProp}
					name={props?.name}
					className={`Select-input input ${!value ? 'Select-placeholder' : ''} ${isError}`}
					value={value}
					onChange={onChange}
					placeholder='Select...'
					disabled={props?.disabled}
					{...props}>
					{props.placeholder && (
						<>
							{!canSelectEmpty && (
								<option disabled hidden value=''>
									{props.placeholder}
								</option>
							)}
							{canSelectEmpty && <option value=''>{props.placeholder}</option>}
						</>
					)}

					{!props.placeholder && canSelectEmpty && <option value=''>{'Select ...'}</option>}
					{Array.isArray(options) &&
						options.map((item: any) => {
							const value = item[targetKeys?.value];
							const label = item[targetKeys?.label];

							return (
								<option className='Select-option' value={value} key={item.id || value}>
									{label}
								</option>
							);
						})}
				</select>
				<Icon icon='shevron' size='24' color='black' className='Select-icon icon' />
			</div>

			{errors.map((error, i) => (
				<span key={i} className='Select-error-message'>
					<span>{error}</span>
				</span>
			))}
		</div>
	);
}
