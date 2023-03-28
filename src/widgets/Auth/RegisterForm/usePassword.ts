import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { errorsMessages } from '@/shared/hooks/useTextInput/validators';
import { FormEvent, useState } from 'react';
import { getApiError, notValidForm } from '@/shared/helpers';
import { Validation } from '@/shared/helpers/validation';
import Mask from '@/shared/helpers/mask';

export const usePassword = () => {
	const [isLoading, setIsLoading] = useState(false);

	const formData = {
		password: useTextInput({
			validators: ['password'],
			isRequired: true
		})
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			const data = {
				password: formData.password.value || ''
			};
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
		formDataPassword: formData,
		onSubmitPassword: onSubmit,
		isLoadingPassword: isLoading
	};
};
