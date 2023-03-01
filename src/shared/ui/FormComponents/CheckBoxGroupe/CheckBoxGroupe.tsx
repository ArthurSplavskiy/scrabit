import { uid } from '@/shared/helpers';
import { ChangeEvent, FC, InputHTMLAttributes } from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import './CheckBoxGroupe.scss';

interface iCheckBoxGroupeProps {
	label?: string;
	checkBoxList: Array<{ name: string; id: number | string }>;
	initValue?: Array<string | number>;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	errors?: string[];
	customClass?: string;
	inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export const CheckBoxGroupe: FC<iCheckBoxGroupeProps> = ({
	checkBoxList,
	label,
	onChange,
	errors,
	initValue,
	customClass = '',
	inputProps
}) => {
	return (
		<div className={`CheckBoxGroupe ${customClass}`}>
			{label && <div className='CheckBoxGroupe-label label'>{label}</div>}
			{checkBoxList?.map(({ name, id }) => {
				const isChecked = initValue?.find((item) => item.toString() === id.toString());
				return (
					<Checkbox
						id={`${name}-${String(id)}`}
						key={id}
						value={name}
						label={name}
						onChange={onChange}
						checked={!!isChecked}
						colorType={'purple'}
						{...inputProps}
					/>
				);
			})}

			{errors?.map((error, i) => (
				<span key={i} className='error'>
					{error}
				</span>
			))}
		</div>
	);
};
