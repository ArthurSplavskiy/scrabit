import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { FormEvent, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const usePassword = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const formData = {
		password: useTextInput({
			validators: ['password'],
			isRequired: true
		})
	};

	const notValidPassword = (pass: string) => (pass.length >= 6 || pass.length <= 25 ? false : true);

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidPassword(formData.password.inputProps.value)) return;

		try {
			setIsLoading(true);
			const data = {
				password: formData.password.value || ''
			};
			Cookies.set('change_password_step', 'finish');
			navigate('/auth/login');
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
