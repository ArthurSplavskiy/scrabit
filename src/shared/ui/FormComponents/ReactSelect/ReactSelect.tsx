import { FC, useEffect, useState } from 'react';
import Select, { GroupBase, Props } from 'react-select';
import './ReactSelect.scss';

export type tReactSelectProps<
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, IsMulti, Group>;

interface iReactSelectProps extends tReactSelectProps<any, any> {
	type?: 'async' | 'usual';
	icon?: 'earth' | 'calendar' | 'phone';
	label?: string;
	hideIcon?: boolean;
	className?: string;
	errors?: string[];
}

export const ReactSelect: FC<iReactSelectProps> = ({
	hideIcon = true,
	type,
	icon,
	label,
	className = '',
	errors,
	...props
}) => {
	const isHiddenIcon = hideIcon ? 'hidden-icon' : '';
	const [isFocus, setIsFocus] = useState(false);

	return (
		<fieldset className={`ReactSelect-group ${errors?.length ? 'has-error' : ''}`}>
			<label className={`ReactSelect-label ${isFocus ? 'focus' : ''}`}>{label}</label>
			<Select
				className={`ReactSelect ${isHiddenIcon} ${type} ${icon} ${className}  ${
					isFocus ? 'focus' : ''
				}`}
				classNamePrefix='ReactSelect-select'
				isSearchable={false}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				{...props}
			/>
			{errors?.map((error, i) => (
				<span key={i} className='InputField-error-message error'>
					{error}
				</span>
			))}
		</fieldset>
	);
};
