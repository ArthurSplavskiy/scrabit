import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { errorsMessages } from '@/shared/hooks/useTextInput/validators';
import { FormEvent, useState } from 'react';
import { getApiError, notValidForm } from '@/shared/helpers';
import { TRegistrationPostData } from '../interface';
import Cookies from 'js-cookie';

export const useCode = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [next, setNext] = useState(false);

	const formData = {
		code: useTextInput({
			validators: ['zipcode'],
			isRequired: true
		})
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			const data = {
				code: formData.code.value
			};
			Cookies.set('change_password_step', 'password');
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
		formDataCode: formData,
		onSubmitCode: onSubmit,
		isLoadingCode: isLoading,
		nextCode: next
	};
};
