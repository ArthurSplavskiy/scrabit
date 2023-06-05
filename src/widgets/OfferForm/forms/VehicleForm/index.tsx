import { ReactSelect } from '@/shared/ui/FormComponents/ReactSelect/ReactSelect';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { useSelect } from '@/shared/hooks/inputHooks/useSelect';
import { FormField, ISelectOption } from '@/shared/interfaces/shared';
import { Button } from '@/shared/ui/Button';
import { normalizeSelectData, notValidForm, setFieldId, getApiError } from '@/shared/helpers/index';
import { IOfferData, initialOfferData } from '../../initialOfferData';
import { FC, useEffect, useState } from 'react';
import { setSelectedOrNull } from '../../utils';
import { IStep } from '../../initialStep';
import { IOfferCurrentStep, initialOfferCurrentStep } from '../../initialOfferCurrentStep';
import { useCommon } from '@/app/context/Common/CommonContext';
import styles from './index.module.scss';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import api from '../api';

interface Props {
	setStep: (...args: any[]) => void;
}

export interface IVehicleFormData {
	mileage: FormField<string>;
	title: FormField<string>;
	drive: FormField<string>;
	wheels: FormField<string>;
}

export const VehicleForm: FC<Props> = ({ setStep }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [indexesList, setIndexesList] = useState<number[]>([]);
	const { setError } = useCommon();
	const [offerData, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const [currentOfferData, setCurrentOffer] = useSessionStorage<IOfferCurrentStep[]>(
		'offerCurrentStep',
		initialOfferCurrentStep
	);
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

	useEffect(() => {
		setIndexesList(currentOfferData[1].form_fields.map((field) => field.id));
	}, [currentOfferData]);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			const data: IVehicleFormData = {
				mileage: {
					id: setFieldId(indexesList, 0),
					value: formData.mileage.value
				},
				title: {
					id: setFieldId(indexesList, 1),
					value: formData.title.value
				},
				drive: {
					id: setFieldId(indexesList, 2),
					value: formData.drive.value
				},
				wheels: {
					id: setFieldId(indexesList, 3),
					value: formData.wheels.value
				}
			};

			const res = await api.postVehicleForm(data);
			setCurrentOffer((prev) => [...prev, res]);
			setIsLoading(false);
		} catch (error) {
			const { msg } = getApiError(error, formData);
			setError({ type: 'error', text: msg || 'Error !' });
		} finally {
			setIsLoading(false);
		}

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
					label={currentOfferData[1].form_fields[0].name}
					placeholder={currentOfferData[1].form_fields[0].placeholder}
				/>
				<ReactSelect
					errors={formData.drive.errors}
					defaultValue={setSelectedOrNull(offerData.vehicleForm.drive)}
					onChange={formData.drive.inputProps.onChange}
					options={
						normalizeSelectData(currentOfferData[1]?.form_fields?.[1]?.items?.[0]) ||
						formData.drive.options
					}
					label={currentOfferData[1].form_fields[1].name}
					placeholder={currentOfferData[1].form_fields[1].placeholder}
				/>
				<ReactSelect
					errors={formData.wheels.errors}
					defaultValue={setSelectedOrNull(offerData.vehicleForm.wheels)}
					onChange={formData.wheels.inputProps.onChange}
					options={currentOfferData[1]?.form_fields?.[2]?.items || formData.wheels.options}
					label={currentOfferData[1].form_fields[2].name}
					placeholder={currentOfferData[1].form_fields[2].placeholder}
				/>
				<ReactSelect
					errors={formData.title.errors}
					defaultValue={setSelectedOrNull(offerData.vehicleForm.title)}
					onChange={formData.title.inputProps.onChange}
					options={currentOfferData[1]?.form_fields?.[3]?.items || formData.title.options}
					label={currentOfferData[1].form_fields[3].name}
					placeholder={currentOfferData[1].form_fields[3].placeholder}
				/>
			</fieldset>
			<Button customType='black' iconName='arrow' iconPosition='right' loading={isLoading}>
				next
			</Button>
		</form>
	);
};
