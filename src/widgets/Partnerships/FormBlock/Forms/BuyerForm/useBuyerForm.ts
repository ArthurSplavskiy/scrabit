import { getApiError, notValidForm } from '@/shared/helpers/index';
import { FormEvent, useEffect, useState } from 'react';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useSelect } from '@/shared/hooks/inputHooks/useSelect';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { IBuyerFormData } from './interface';
import { errorsMessages } from '@/shared/hooks/useTextInput/validators';
import { Validation } from '@/shared/helpers/validation';
import { ImageListType } from 'react-images-uploading';
import { IFormComponent } from '@/shared/interfaces/shared';
import Mask from '@/shared/helpers/mask';
import api from '../api';

export const useBuyerForm = (form: IFormComponent[], formIdentifier: string) => {
	const [isLoading, setIsLoading] = useState(false);
	const [success, setIsSuccess] = useState(false);
	const { setError, openPartnershipPopup } = useCommon();
	const [fileList, setFileList] = useState([]);

	const { phoneMask } = new Mask();
	const { isValidPhoneNumber } = new Validation();

	const [indexesList, setIndexesList] = useState<number[]>([]);
	useEffect(() => {
		setIndexesList(form.map((field) => field.id));
	}, [form]);
	// const [fileList, setFileList] = useState<FileList | null>(null);
	// const [formDataState, setFormDataState] = useState<FormData | undefined>();
	// const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	const fileFormData = new FormData();
	// 	setFileList(e.target.files);
	// 	const files = e.target.files ? [...e.target.files] : [];
	// 	files.forEach((file, i) => {
	// 		// проверим размер файла (<5 Мб)
	// 		if (file.size > 1 * 1024 * 1024) {
	// 			return;
	// 		}
	// 		console.log('append', file);
	// 		fileFormData.append(`file-${i}`, file);
	// 		setFormDataState(fileFormData);
	// 	});
	// };
	const handleFileChange = async (
		imageList: ImageListType,
		addUpdateIndex: number[] | undefined
	) => {
		setFileList(imageList as never[]);
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
				first_name: { id: indexesList[0], value: formData.first_name.value },
				last_name: { id: indexesList[1], value: formData.last_name.value },
				email: { id: indexesList[2], value: formData.email.value },
				phone_number: { id: indexesList[3], value: formData.phone_number.value },
				company_name: { id: indexesList[4], value: formData.company_name.value },
				city_name: { id: indexesList[5], value: formData.city_name.value },
				state: { id: indexesList[6], value: formData.state.value },
				industry: { id: indexesList[7], value: formData.industry.value },
				goal: { id: indexesList[8], value: formData.goal.value },
				license: { id: indexesList[9], value: formData.license.value },
				feedback: { id: indexesList[10], value: formData.feedback.value },
				file: { id: null, value: fileList }
			};

			await api.postBuyerForm(data, formIdentifier);
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
		handleFileChange
	};
};
