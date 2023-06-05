import { getApiError, notValidForm } from '@/shared/helpers/index';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useSelect } from '@/shared/hooks/inputHooks/useSelect';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { ICharityFormData } from './interface';
import { errorsMessages } from '@/shared/hooks/useTextInput/validators';
import { Validation } from '@/shared/helpers/validation';
import Mask from '@/shared/helpers/mask';
import { ImageListType } from 'react-images-uploading';
import { IFormComponent } from '@/shared/interfaces/shared';
import api from '../api';

export const useCharityForm = (form: IFormComponent[], formIdentifier: string) => {
	const [isLoading, setIsLoading] = useState(false);
	const [success, setIsSuccess] = useState(false);
	const { setError, openPartnershipPopup } = useCommon();

	const { phoneMask } = new Mask();
	const { isValidPhoneNumber } = new Validation();

	const [fileList, setFileList] = useState([]);

	const handleFileChange = async (
		imageList: ImageListType,
		addUpdateIndex: number[] | undefined
	) => {
		setFileList(imageList as never[]);
	};

	const [radioState, setRadioState] = useState<string>('');
	const [radioStateError, setRadioStateError] = useState<boolean>(false);
	const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
		setRadioState(e.target.value);
		setRadioStateError(false);
	};

	const [indexesList, setIndexesList] = useState<number[]>([]);
	useEffect(() => {
		setIndexesList(form.map((field) => field.id));
	}, [form]);

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
		state: useSelect({ isRequired: true }),
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
				first_name: { id: indexesList[0], value: formData.first_name.value },
				last_name: { id: indexesList[1], value: formData.last_name.value },
				email: { id: indexesList[2], value: formData.email.value },
				phone_number: { id: indexesList[3], value: formData.phone_number.value },
				company_name: { id: indexesList[4], value: formData.company_name.value },
				city_name: { id: indexesList[5], value: formData.city_name.value },
				state: { id: indexesList[6], value: formData.state.value },
				file: { id: null, value: fileList },
				is_your_organization: { id: indexesList[8], value: radioState },
				website_url: { id: indexesList[7], value: formData.url.value },
				platform: { id: indexesList[9], value: formData.platform.value }
			};
			await api.postCharityForm(data, formIdentifier);
			setIsLoading(false);
			setIsSuccess(true);
			openPartnershipPopup();
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
