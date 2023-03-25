// import { useTextInput } from '../../../hooks/useTextInput/useTextInput';
// import { getApiError, notValidForm } from '@/helpers/index';
// import { TRegistrationPostData } from '@/interfaces/shared';
// import { useComparePasswordFields } from '../../../hooks/useTextInput/useComparePasswordFields';
// import api from '@/api';
// import { FormEvent, useState } from 'react';
// import { useCommon } from '@/context/CommonContext';
// import { errorsMessages } from '@/hooks/useTextInput/validators';

// export const useRegistration = () => {
// 	const { openLogin, openError, setError } = useCommon();
// 	const [isLoading, setIsLoading] = useState(false);

// 	const formData = {
// 		email: useTextInput({ validators: ['email'], isRequired: true }),
// 		password: useTextInput({
// 			validators: ['password'],
// 			isRequired: true
// 		}),
// 		confirm_password: useTextInput({
// 			validators: ['password'],
// 			isRequired: true,
// 			notEqualErrText: errorsMessages.PASSWORD_NOT_MATCH
// 		})
// 	};

// 	useComparePasswordFields({ pass: formData.password, confirmPass: formData.confirm_password });

// 	const onSubmit = async (event: FormEvent) => {
// 		event.preventDefault();
// 		if (notValidForm(formData)) return;

// 		try {
// 			setIsLoading(true);
// 			const data: Partial<TRegistrationPostData> = {
// 				email: formData.email.value || '',
// 				password: formData.password.value || ''
// 			};
// 			await api.auth.registration(data);
// 			setTimeout(() => {
// 				setIsLoading(false);
// 				openLogin();
// 			}, 2000);
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
