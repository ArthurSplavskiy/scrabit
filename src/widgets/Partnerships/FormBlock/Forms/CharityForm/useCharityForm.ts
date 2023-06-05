import { getApiError, notValidForm } from '@/shared/helpers/index';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useSelect } from '@/shared/hooks/inputHooks/useSelect';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { ICharityFormData } from './interface';
import { errorsMessages } from '@/shared/hooks/useTextInput/validators';
import { Validation } from '@/shared/helpers/validation';
import Mask from '@/shared/helpers/mask';

export const useCharityForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [success, setIsSuccess] = useState(false);
	const { setError, openPartnershipPopup } = useCommon();

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

	const [radioState, setRadioState] = useState<string>('');
	const [radioStateError, setRadioStateError] = useState<boolean>(false);
	const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
		setRadioState(e.target.value);
		setRadioStateError(false);
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
		company_name: useTextInput(),
		city_name: useTextInput(),
		state: useSelect(),
		url: useTextInput({ validators: ['website'] }),
		platform: useSelect({ isRequired: true })
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (notValidForm(formData) || !radioState) {
			if (!radioState) {
				setRadioStateError(true);
			} else {
				setRadioStateError(false);
			}
			return;
		}

		try {
			setIsLoading(true);
			const data: ICharityFormData = {
				first_name: formData.first_name.value,
				last_name: formData.last_name.value,
				email: formData.email.value,
				phone_number: formData.phone_number.value,
				company_name: formData.company_name.value,
				city_name: formData.city_name.value,
				state: formData.state.value,
				file: formDataState,
				is_your_organization: radioState,
				website_url: formData.url.value,
				platform: formData.platform.value
			};
			//await api.auth.registration(data);

			setTimeout(() => {
				setIsLoading(false);
				setIsSuccess(true);
				openPartnershipPopup();
			}, 500);
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
		handleFileChange,
		handleRadioChange,
		radioStateError
	};
};
