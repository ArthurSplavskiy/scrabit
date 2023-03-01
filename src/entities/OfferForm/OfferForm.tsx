import { useHomeOfferForm } from '@/pages/HomePage/HomePageContext';
import { Button } from '@/shared/ui/Button';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { ReactSelect } from '@/shared/ui/FormComponents/ReactSelect/ReactSelect';
import styles from './OfferForm.module.scss';
import { useOfferForm } from './useOfferForm';

export const OfferForm = () => {
	const { formData, onSubmit, isLoading } = useOfferForm();
	const { data: offerFormData } = useHomeOfferForm();
	return (
		<form className={styles.OfferForm} onSubmit={onSubmit}>
			<fieldset className={styles.OfferFormInputs}>
				<ReactSelect
					errors={formData.car_year.errors}
					onChange={formData.car_year.inputProps.onChange}
					options={formData.car_year.options}
					label={'Car year'}
					placeholder='Choose year'
					className={styles.OfferFormItem}
				/>
				<ReactSelect
					errors={formData.car_make.errors}
					onChange={formData.car_make.inputProps.onChange}
					options={offerFormData?.car_make}
					label={'Car make'}
					placeholder='Car make'
					className={styles.OfferFormItem}
				/>
				<ReactSelect
					errors={formData.car_model.errors}
					onChange={formData.car_model.inputProps.onChange}
					options={offerFormData?.car_model}
					label={'Car model'}
					placeholder='Choose model'
					className={styles.OfferFormItem}
				/>
				<ReactSelect
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
