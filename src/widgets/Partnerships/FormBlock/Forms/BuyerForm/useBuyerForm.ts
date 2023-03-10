import { getApiError, notValidForm } from '@/shared/helpers/index';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useSelect } from '@/shared/hooks/inputHooks/useSelect';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { IBuyerFormData } from './interface';
import { errorsMessages } from '@/shared/hooks/useTextInput/validators';
import Mask from '@/shared/helpers/mask';
import { Validation } from '@/shared/helpers/validation';

export const useBuyerForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [success, setIsSuccess] = useState(false);
	const { setError } = useCommon();

	const { phoneMask } = new Mask();
	const { isValidPhoneNumber } = new Validation();

	const [fileList, setFileList] = useState<FileList | null>(null);
	const [formDataState, setFormDataState] = useState<FormData | undefined>();
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const fileFormData = new FormData();
		setFileList(e.target.files);
		const files = e.target.files ? [...e.target.files] : [];
		files.forEach((file, i) => {
			// проверим размер файла (<5 Мб)
			if (file.size > 1 * 1024 * 1024) {
				return;
			}
			console.log('append', file);
			fileFormData.append(`file-${i}`, file);
			setFormDataState(fileFormData);
		});
	};

	const formData = {
		first_name: useTextInput({ isRequired: true }),
		last_name: useTextInput({ isRequired: true }),
		email: useTextInput({ validators: ['email'], isRequired: true }),
		phone_number: useTextInput({
			filters: [phoneMask],
			validators: [
				{ checkFn: (value) => isValidPhoneNumber({ value }), error: errorsMessages.PHONE }
			]
		}),
		company_name: useTextInput({ isRequired: true }),
		city_name: useTextInput({ isRequired: true }),
		state: useSelect({ isRequired: true }),
		industry: useSelect({ isRequired: true }),
		goal: useSelect({ isRequired: true }),
		license: useSelect({ isRequired: true }),
		feedback: useSelect({ isRequired: true })
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			const data: IBuyerFormData = {
				first_name: formData.first_name.value,
				last_name: formData.last_name.value,
				email: formData.email.value,
				phone_number: formData.phone_number.value,
				company_name: formData.company_name.value,
				city_name: formData.city_name.value,
				state: formData.state.value,
				industry: formData.industry.value,
				goal: formData.goal.value,
				license: formData.license.value,
				feedback: formData.feedback.value,
				file: formDataState
			};
			console.log('onSubmit data', data);
			//await api.auth.registration(data);

			setTimeout(() => {
				setIsLoading(false);
				setIsSuccess(true);
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
		isLoading,
		success,
		fileList,
		handleFileChange
	};
};
