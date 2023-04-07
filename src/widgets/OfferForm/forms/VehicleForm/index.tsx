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
import { useEffect } from 'react';
import { setSelectedOrNull } from '../../utils';

export const VehicleForm = () => {
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
				{ label: 'yes', value: 'yes' },
				{ label: 'no', value: 'no' }
			]
		}),
		wheels: useSelect<ISelectOption>({
			isRequired: true,
			options: [
				{ label: 'yes', value: 'yes' },
				{ label: 'no', value: 'no' }
			]
		}),
		title: useTextInput({ isRequired: true })
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (notValidForm(formData)) return;

		setOfferData((prev) => ({
			...prev,
			vehicleForm: {
				mileage: formData.mileage.value,
				drive: formData.drive.value,
				wheels: formData.wheels.value,
				title: formData.title.value
			}
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
					label='Car mileage'
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
				<InputField
					{...formData.title.inputProps}
					errors={formData.title.errors}
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
