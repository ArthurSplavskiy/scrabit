import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { errorsMessages } from '@/shared/hooks/useTextInput/validators';
import { FormEvent, useState } from 'react';
import { getApiError, notValidForm } from '@/shared/helpers';
import { TRegistrationPostData } from '../interface';
import { Validation } from '@/shared/helpers/validation';
import Mask from '@/shared/helpers/mask';
import Cookies from 'js-cookie';

export const usePhone = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [next, setNext] = useState(false);

	const { phoneMask } = new Mask();
	const { isValidPhoneNumber } = new Validation();

	const formData = {
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

		try {
			setIsLoading(true);
			const data: Partial<TRegistrationPostData> = {
				email: formData.phone_number.value || '',
				password: formData.phone_number.value || ''
			};
			Cookies.set('register_step', 'code');
			setNext(true);
			//await api.auth.registration(data);
			setTimeout(() => {
				setIsLoading(false);
				//openLogin();
			}, 2000);
		} catch (error) {
			// const { msg } = getApiError(error, formData);
			// setError({ type: 'error', text: msg || 'Error !' });
			// openError();
		} finally {
			setIsLoading(false);
		}
	};

	return {
		formDataPhone: formData,
		onSubmitPhone: onSubmit,
		isLoadingPhone: isLoading,
		nextPhone: next
	};
};
