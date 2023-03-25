// import { FormEvent, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AppRoutes } from '@/routes/AppRouter';
// import { TLoginPostData } from '@/interfaces/shared';
// import { useTextInput } from '../../../hooks/useTextInput/useTextInput';
// import { notValidForm, getApiError } from '@/helpers';
// import { useProfile } from '@/context/UserContext';
// import { useCommon } from '@/context/CommonContext';
// import api from '@/api';
// import Cookies from 'js-cookie';

// export const useLogin = () => {
// 	const navigate = useNavigate();
// 	const { setToken, getProfileData } = useProfile();
// 	const { openError, setError, openThank } = useCommon();
// 	const [isLoading, setIsLoading] = useState(false);

// 	const formData = {
// 		email: useTextInput({ validators: ['email'] }),
// 		password: useTextInput({ validators: ['password'] })
// 	};

// 	const onSubmit = async (event: FormEvent) => {
// 		event.preventDefault();
// 		if (notValidForm(formData)) return;

// 		try {
// 			setIsLoading(true);
// 			const data: TLoginPostData = {
// 				email: formData.email.value || '',
// 				password: formData.password.value || ''
// 			};
// 			const res = await api.auth.login(data);
// 			const resData = JSON.parse(res.config.data);
// 			// Cookies.set('user_password_email', resData.email);
// 			Cookies.set('user_password_test', resData.password);
// 			setToken(res?.data?.accessToken);
// 			getProfileData();
// 			setTimeout(() => {
// 				setIsLoading(false);
// 				navigate(AppRoutes.ACCOUNT_DASHBOARD);
// 				openThank();
// 			}, 300);
// 		} catch (error) {
// 			const { msg } = getApiError(error, formData);
// 			setError({ type: 'error', text: msg || 'Error !' });
// 			openError();
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	return {
// 		formData,
// 		onSubmit,
// 		isLoading
// 	};
// };

export {};
