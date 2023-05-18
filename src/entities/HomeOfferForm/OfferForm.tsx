import { useHomeOfferForm } from '@/pages/HomePage/HomePageContext';
import { Button } from '@/shared/ui/Button';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { ReactSelect } from '@/shared/ui/FormComponents/ReactSelect/ReactSelect';
import styles from './OfferForm.module.scss';
import { useOfferForm } from './useOfferForm';
import { useEffect, useRef } from 'react';
import { useCommon } from '@/app/context/Common/CommonContext';
import Cookies from 'js-cookie';
import { IOfferData, initialOfferData } from '@/widgets/OfferForm/initialOfferData';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import { setSelectedOrNull } from '@/widgets/OfferForm/utils';

export const OfferForm = () => {
	const [offerData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const { formData, onSubmit, isLoading } = useOfferForm();
	const { data: offerFormData } = useHomeOfferForm();
	const { focusFirstOfferFormField } = useCommon();
	const firstFieldRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (focusFirstOfferFormField && firstFieldRef?.current) {
			firstFieldRef.current.focus();
		}
	}, [focusFirstOfferFormField]);

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
					options={formData.car_year.options}
					label={'Car year'}
					placeholder='Choose year'
					className={styles.OfferFormItem}
				/>
				<ReactSelect
					defaultValue={setSelectedOrNull(offerData.carForm.make)}
					errors={formData.car_make.errors}
					onChange={formData.car_make.inputProps.onChange}
					options={offerFormData?.car_make}
					label={'Car make'}
					placeholder='Car make'
					className={styles.OfferFormItem}
				/>
				<ReactSelect
					defaultValue={setSelectedOrNull(offerData.carForm.model)}
					errors={formData.car_model.errors}
					onChange={formData.car_model.inputProps.onChange}
					options={offerFormData?.car_model}
					label={'Car model'}
					placeholder='Choose model'
					className={styles.OfferFormItem}
				/>
				<ReactSelect
					defaultValue={setSelectedOrNull(offerData.carForm.submodel)}
					errors={formData.car_submodel.errors}
					onChange={formData.car_submodel.inputProps.onChange}
					options={offerFormData?.car_submodel}
					label={'Submodel'}
					placeholder='Choose submodel'
					className={styles.OfferFormItem}
				/>
				<InputField
					{...formData.car_zipcode.inputProps}
					errors={formData.car_zipcode.errors}
					className={styles.OfferFormItem}
					maxLength={5}
					label='Car zipcode'
					placeholder='Enter car zipcode'
				/>
				<InputField
					{...formData.phone_number.inputProps}
					errors={formData.phone_number.errors}
					className={styles.OfferFormItem}
					label='Phone number'
					placeholder='(____) ____-______'
				/>
				<InputField
					{...formData.customer_name.inputProps}
					errors={formData.customer_name.errors}
					className={styles.OfferFormItem}
					label='Customer name'
					placeholder='Enter full customer name'
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
