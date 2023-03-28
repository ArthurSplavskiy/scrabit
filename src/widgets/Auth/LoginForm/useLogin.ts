import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TLoginPostData } from '../interface';
import Cookies from 'js-cookie';
import { getApiError, notValidForm } from '@/shared/helpers';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { useProfile } from '@/app/context/User/UserContext';
import api from '../api';
import { errorsMessages } from '@/shared/hooks/useTextInput/validators';
import { Validation } from '@/shared/helpers/validation';
import Mask from '@/shared/helpers/mask';

export const useLogin = () => {
	const navigate = useNavigate();
	const { setToken, getProfileData } = useProfile();
	const [isLoading, setIsLoading] = useState(false);

	const { phoneMask } = new Mask();
	const { isValidPhoneNumber } = new Validation();

	const formData = {
		phone_number: useTextInput({
			filters: [phoneMask],
			validators: [
				{ checkFn: (value) => isValidPhoneNumber({ value }), error: errorsMessages.PHONE }
			]
		}),
		password: useTextInput({ validators: ['password'] })
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			const data: TLoginPostData = {
				phone_number: formData.phone_number.value || '',
				password: formData.password.value || ''
			};
			const res = await api.login(data);
			const resData = JSON.parse(res.config.data);
			// Cookies.set('user_password_email', resData.email);
			Cookies.set('user_password_test', resData.password);
			setToken(res?.data?.accessToken);
			getProfileData();
			setTimeout(() => {
				setIsLoading(false);
				//navigate(AppRoutes.ACCOUNT_DASHBOARD);
				//openThank();
			}, 300);
		} catch (error) {
			const { msg } = getApiError(error, formData);
			//setError({ type: 'error', text: msg || 'Error !' });
			//openError();
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
