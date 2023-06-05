import { useHomeOfferForm } from '@/pages/HomePage/HomePageContext';
import { Button } from '@/shared/ui/Button';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { ReactSelect } from '@/shared/ui/FormComponents/ReactSelect/ReactSelect';
import { useOfferForm } from './useOfferForm';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useCommon } from '@/app/context/Common/CommonContext';
import { setSelectedOrNull } from '@/widgets/OfferForm/utils';
import { normalizeSelectData } from '@/shared/helpers';
import { IOfferData, initialOfferData } from '@/widgets/OfferForm/initialOfferData';
import { getApiError } from '@/shared/helpers/index';
import Cookies from 'js-cookie';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import styles from './OfferForm.module.scss';
import api from './api';
import { ISelectOption } from '@/shared/interfaces/shared';

export const OfferForm = () => {
	const [offerData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const { data: offerFormData } = useHomeOfferForm();
	const { formData, onSubmit, isLoading } = useOfferForm(
		offerFormData?.form_fields.map((field) => field.id)
	);
	const { focusFirstOfferFormField } = useCommon();
	const [, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const { setError } = useCommon();
	const [carModel, setCarModel] = useState<ISelectOption[]>([]);
	const [carSubmodel, setCarSubmodel] = useState<ISelectOption[]>([]);
	const firstFieldRef = useRef<HTMLDivElement>(null);

	const carMakeOnChange = async (e: any) => {
		formData.car_make.setValue(e.value);
		formData.car_model.setValue('');
		formData.car_submodel.setValue('');

		try {
			const res = await api.getCarModel(e.value);
			setCarModel(res.map((model: string) => ({ label: model, value: model })));
		} catch (error) {
			const { msg } = getApiError(error, formData);
			setError({ type: 'error', text: msg || 'Error !' });
		}
	};

	const carModelOnChange = async (e: any) => {
		formData.car_model.setValue(e.value);
		if (e.value === 'other') {
			formData.car_submodel.setValue('');
			formData.car_submodel.setOptions([]);
		}

		try {
			const res = await api.getCarSubmodel(formData.car_make.value, e.value);
			setCarSubmodel(res.map((model: string) => ({ label: model, value: model })));
		} catch (error) {
			const { msg } = getApiError(error, formData);
			setError({ type: 'error', text: msg || 'Error !' });
		}
	};

	const carSubmodelOnChange = async (e: any) => {
		formData.car_submodel.setValue(e.value);
		//formData.car_submodel.inputProps.onChange(e);
	};

	const other = useMemo(
		() => ({
			label: 'other',
			value: 'other'
		}),
		[]
	);

	useEffect(() => {
		if (focusFirstOfferFormField && firstFieldRef?.current) {
			firstFieldRef.current.focus();
		}
	}, [focusFirstOfferFormField]);

	useEffect(() => {
		if (offerFormData?.form_identifier === 'offer-without-calculation') {
			setOfferData((prev) => ({ ...prev, calculateOfferCost: true }));
		}
	}, [offerFormData]);

	useEffect(() => {
		Cookies.set('first-offer-form-is-filled', 'false');
		if (offerData.carForm.zipcode) formData.car_zipcode.setValue(offerData.carForm.zipcode);
		if (offerData.carForm.phoneNumber)
			formData.phone_number.setValue(offerData.carForm.phoneNumber);
		if (offerData.carForm.customerName)
			formData.customer_name.setValue(offerData.carForm.customerName);
		if (offerData.carForm.year) formData.car_year.setValue(offerData.carForm.year);
		if (offerData.carForm.make) formData.car_make.setValue(offerData.carForm.make);
		if (offerData.carForm.model) formData.car_model.setValue(offerData.carForm.model);
		if (offerData.carForm.submodel) formData.car_submodel.setValue(offerData.carForm.submodel);
	}, []);

	return (
		<form className={styles.OfferForm} onSubmit={onSubmit} data-fade-in-up>
			<fieldset className={styles.OfferFormInputs}>
				<ReactSelect
					refOnInput={firstFieldRef}
					defaultValue={setSelectedOrNull(offerData.carForm.year)}
					errors={formData.car_year.errors}
					onChange={formData.car_year.inputProps.onChange}
					options={normalizeSelectData(offerFormData?.form_fields?.[0]?.items?.[0]).reverse()}
					label={offerFormData?.form_fields?.[0].name}
					placeholder={offerFormData?.form_fields?.[0].placeholder}
					className={styles.OfferFormItem}
				/>
				<ReactSelect
					defaultValue={setSelectedOrNull(offerData.carForm.make)}
					errors={formData.car_make.errors}
					onChange={carMakeOnChange}
					options={normalizeSelectData(offerFormData?.form_fields?.[1]?.items?.[0])}
					label={offerFormData?.form_fields?.[1].name}
					placeholder={offerFormData?.form_fields?.[1].placeholder}
					className={styles.OfferFormItem}
				/>
				<ReactSelect
					//value={formData.car_model.value}
					defaultValue={setSelectedOrNull(offerData.carForm.model)}
					errors={formData.car_model.errors}
					onChange={carModelOnChange}
					options={
						carModel.length ? [...carModel, other] : []
						// normalizeSelectData(offerFormData?.form_fields?.[2]?.items?.[0])
					}
					label={offerFormData?.form_fields?.[2].name}
					placeholder={offerFormData?.form_fields?.[2].placeholder}
					className={styles.OfferFormItem}
				/>
				<ReactSelect
					//value={formData.car_submodel.value}
					defaultValue={setSelectedOrNull(offerData.carForm.submodel)}
					errors={formData.car_submodel.errors}
					onChange={carSubmodelOnChange}
					options={
						carSubmodel.length ? [...carSubmodel, other] : []
						// : normalizeSelectData(offerFormData?.form_fields?.[3]?.items?.[0])
					}
					label={offerFormData?.form_fields?.[3].name}
					placeholder={offerFormData?.form_fields?.[3].placeholder}
					className={styles.OfferFormItem}
				/>
				<InputField
					{...formData.car_zipcode.inputProps}
					errors={formData.car_zipcode.errors}
					className={styles.OfferFormItem}
					maxLength={5}
					label={offerFormData?.form_fields?.[4].name}
					placeholder={offerFormData?.form_fields?.[4].placeholder}
				/>
				<InputField
					{...formData.phone_number.inputProps}
					errors={formData.phone_number.errors}
					className={styles.OfferFormItem}
					label={offerFormData?.form_fields?.[5].name}
					placeholder={offerFormData?.form_fields?.[5].placeholder}
				/>
				<InputField
					{...formData.customer_name.inputProps}
					errors={formData.customer_name.errors}
					className={styles.OfferFormItem}
					label={offerFormData?.form_fields?.[6].name}
					placeholder={offerFormData?.form_fields?.[6].placeholder}
				/>
			</fieldset>
			<fieldset className={styles.OfferFormControls}>
				<Button size='middle' loading={isLoading}>
					get offer
				</Button>
				<span className='text-14'>
					Your car is the only subject of conversation. By submitting, you agree to receive messages
					from Scrabit.
				</span>
			</fieldset>
		</form>
	);
};
