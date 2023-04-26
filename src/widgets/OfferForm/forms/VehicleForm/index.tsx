import { ReactSelect } from '@/shared/ui/FormComponents/ReactSelect/ReactSelect';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { useSelect } from '@/shared/hooks/inputHooks/useSelect';
import { ISelectOption } from '@/shared/interfaces/shared';
import { Button } from '@/shared/ui/Button';
import { notValidForm } from '@/shared/helpers/index';
import styles from './index.module.scss';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import { IOfferData, initialOfferData } from '../../initialOfferData';
import { FC, useEffect } from 'react';
import { setSelectedOrNull } from '../../utils';
import { IStep } from '../../initialStep';

interface Props {
	setStep: (...args: any[]) => void;
}

export const VehicleForm: FC<Props> = ({ setStep }) => {
	const [offerData, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);

	const formData = {
		mileage: useTextInput({
			isRequired: true,
			filters: ['only_number']
			//validators: ['numberRange']
		}),
		drive: useSelect<ISelectOption>({
			isRequired: true,
			options: [
				{ label: 'Yes', value: 'Yes' },
				{ label: 'No', value: 'No' }
			]
		}),
		wheels: useSelect<ISelectOption>({
			isRequired: true,
			options: [
				{
					label: 'Yes, all of the wheels are attached and the tires are inflated.',
					value: 'Yes, all of the wheels are attached and the tires are inflated.'
				},
				{ label: 'No, one or more tires are flat.', value: 'No, one or more tires are flat.' },
				{
					label: 'No, at least one wheel is missing or unattached',
					value: 'No, at least one wheel is missing or unattached'
				}
			]
		}),
		title: useSelect<ISelectOption>({
			isRequired: true,
			options: [
				{ label: 'Yes, i have title', value: 'Yes, i have title' },
				{
					label: 'No, i have a salvage or rebuilt title',
					value: 'No, i have a salvage or rebuilt title'
				},
				{ label: 'No sure, i can’t find my title', value: 'No sure, i can’t find my title' }
			]
		})
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (notValidForm(formData)) return;

		setOfferData((prev) => ({
			...prev,
			stepIndex: 1,
			vehicleForm: {
				mileage: formData.mileage.value,
				drive: formData.drive.value,
				wheels: formData.wheels.value,
				title: formData.title.value,
				isFilled: true
			}
		}));

		setStep((prev: IStep) => ({
			...prev,
			count: 1
		}));
	};

	useEffect(() => {
		if (offerData.vehicleForm.mileage) formData.mileage.setValue(offerData.vehicleForm.mileage);
		if (offerData.vehicleForm.title) formData.title.setValue(offerData.vehicleForm.title);
		if (offerData.vehicleForm.drive) formData.drive.setValue(offerData.vehicleForm.drive);
		if (offerData.vehicleForm.wheels) formData.wheels.setValue(offerData.vehicleForm.wheels);
	}, []);

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<fieldset>
				<InputField
					{...formData.mileage.inputProps}
					errors={formData.mileage.errors}
					maxLength={7}
					label='Car mileage (only number)'
					placeholder='Car mileage'
				/>
				<ReactSelect
					errors={formData.drive.errors}
					defaultValue={setSelectedOrNull(offerData.vehicleForm.drive)}
					onChange={formData.drive.inputProps.onChange}
					options={formData.drive.options}
					label={'Does it drive?'}
					placeholder='Choose option'
				/>
				<ReactSelect
					errors={formData.wheels.errors}
					defaultValue={setSelectedOrNull(offerData.vehicleForm.wheels)}
					onChange={formData.wheels.inputProps.onChange}
					options={formData.wheels.options}
					label={'Are the wheels mounted and tires inflated?'}
					placeholder='Choose option'
				/>
				<ReactSelect
					errors={formData.title.errors}
					defaultValue={setSelectedOrNull(offerData.vehicleForm.title)}
					onChange={formData.title.inputProps.onChange}
					options={formData.title.options}
					label='Do you have a title?'
					placeholder='Enter title'
				/>
			</fieldset>
			<Button customType='black' iconName='arrow' iconPosition='right'>
				next
			</Button>
		</form>
	);
};
