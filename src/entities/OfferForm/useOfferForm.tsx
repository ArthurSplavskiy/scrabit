import { getApiError, notValidForm } from '@/shared/helpers/index';
import { ISelectOption } from '@/shared/interfaces/shared';
import { FormEvent, useState } from 'react';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useSelect } from '@/shared/hooks/inputHooks/useSelect';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { IOfferFormData } from './interface';
import { getYearsFromToNow } from './helpers';
import { errorsMessages } from '@/shared/hooks/useTextInput/validators';
import Mask from '@/shared/helpers/mask';
import { Validation } from '@/shared/helpers/validation';

export const useOfferForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { setError } = useCommon();

	const { phoneMask } = new Mask();
	const { isValidPhoneNumber } = new Validation();

	const formData = {
		car_year: useSelect<ISelectOption>({
			isRequired: true,
			options: getYearsFromToNow(1950).map((y) => ({ label: String(y), value: String(y) }))
		}),
		car_make: useSelect({ isRequired: true }),
		car_model: useSelect({ isRequired: true }),
		car_submodel: useSelect({ isRequired: true }),
		car_zipcode: useTextInput({
			isRequired: true,
			validators: ['zipcode']
		}),
		phone_number: useTextInput({
			filters: [phoneMask],
			validators: [
				{ checkFn: (value) => isValidPhoneNumber({ value }), error: errorsMessages.PHONE }
			]
		}),
		customer_name: useTextInput({ isRequired: true })
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			const data: IOfferFormData = {
				car_year: formData.car_year.value || Number(new Date().getFullYear),
				car_make: formData.car_make.value,
				car_model: formData.car_model.value,
				car_submodel: formData.car_submodel.value,
				car_zipcode: formData.car_zipcode.value,
				phone_number: formData.phone_number.value,
				customer_name: formData.customer_name.value
			};
			console.log('onSubmit data', data);
			//await api.auth.registration(data);
			setTimeout(() => {
				setIsLoading(false);
			}, 2000);
		} catch (error) {
			const { msg } = getApiError(error, formData);
			setError({ type: 'error', text: msg || 'Error !' });
		} finally {
			setIsLoading(false);
		}
	};

	return {
		formData,
		onSubmit,
		isLoading
	};
};
