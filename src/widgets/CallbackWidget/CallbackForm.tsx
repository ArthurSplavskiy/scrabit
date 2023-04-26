import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { Validation } from '@/shared/helpers/validation';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { notValidForm } from '@/shared/helpers/index';
import { errorsMessages } from '@/shared/hooks/useTextInput/validators';
import { FormEvent } from 'react';
import Mask from '@/shared/helpers/mask';
import styles from './index.module.scss';
import { Button } from '@/shared/ui/Button';
import classNames from 'classnames';

export const CallbackForm = () => {
	const { phoneMask } = new Mask();
	const { isValidPhoneNumber } = new Validation();

	const formData = {
		name: useTextInput({ isRequired: true }),
		phone_number: useTextInput({
			filters: [phoneMask],
			validators: [
				{ checkFn: (value) => isValidPhoneNumber({ value }), error: errorsMessages.PHONE }
			]
		})
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		// try {
		// 	setIsLoading(true);
		// 	const data: IOfferFormData = {
		// 		car_year: formData.car_year.value || Number(new Date().getFullYear),
		// 		car_make: formData.car_make.value,
		// 		car_model: formData.car_model.value,
		// 		car_submodel: formData.car_submodel.value,
		// 		car_zipcode: formData.car_zipcode.value,
		// 		phone_number: formData.phone_number.value,
		// 		customer_name: formData.customer_name.value
		// 	};
		// 	console.log('onSubmit data', data);
		// 	//await api.auth.registration(data);
		// 	setTimeout(() => {
		// 		setIsLoading(false);
		// 	}, 2000);
		// } catch (error) {
		// 	const { msg } = getApiError(error, formData);
		// 	setError({ type: 'error', text: msg || 'Error !' });
		// } finally {
		// 	setIsLoading(false);
		// }
	};

	return (
		<form
			className={classNames(styles.form, {
				[styles.thanks]: false
			})}
			onSubmit={onSubmit}>
			<InputField
				{...formData.name.inputProps}
				errors={formData.name.errors}
				className={styles.nameInput}
				maxLength={5}
				label='Name'
				placeholder='Enter full name'
			/>
			<InputField
				{...formData.phone_number.inputProps}
				errors={formData.phone_number.errors}
				className={styles.phoneInput}
				label='Phone number'
				placeholder='(____) ____-______'
			/>
			<Button>Send</Button>
		</form>
	);
};
