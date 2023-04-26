import { FC, useEffect, useState } from 'react';
import Select, { GroupBase, Props } from 'react-select';
import './ReactSelect.scss';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { useCommon } from '@/app/context/Common/CommonContext';

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
	labelLink?: React.ReactNode;
	refOnInput?: any;
}

export const ReactSelect: FC<iReactSelectProps> = ({
	hideIcon = true,
	type,
	icon,
	label,
	className = '',
	errors,
	labelLink,
	refOnInput,
	...props
}) => {
	const isHiddenIcon = hideIcon ? 'hidden-icon' : '';
	const [isFocus, setIsFocus] = useState(false);
	const { isMobile } = useDevice();
	const { setFocusFirstOfferFormField } = useCommon();

	return (
		<fieldset className={`ReactSelect-group ${errors?.length ? 'has-error' : ''}`}>
			<label className={`ReactSelect-label ${isFocus ? 'focus' : ''}`}>
				<span>{label}</span>
				{!isMobile && <span className='ReactSelect-label-link'>{labelLink}</span>}
			</label>
			<Select
				ref={refOnInput}
				className={`ReactSelect ${isHiddenIcon} ${type} ${icon} ${className}  ${
					isFocus ? 'focus' : ''
				}`}
				classNamePrefix='ReactSelect-select'
				isSearchable={false}
				onFocus={() => {
					setIsFocus(true);
					setFocusFirstOfferFormField(false);
				}}
				onBlur={() => {
					setIsFocus(false);
					setFocusFirstOfferFormField(false);
				}}
				{...props}
			/>
			{errors?.map((error, i) => (
				<span key={i} className='InputField-error-message error'>
					{error}
				</span>
			))}
			{isMobile && <span className='ReactSelect-label-link'>{labelLink}</span>}
		</fieldset>
	);
};
