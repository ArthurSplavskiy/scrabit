import { getApiError, notValidForm, setFieldId } from '@/shared/helpers/index';
import { ISelectOption } from '@/shared/interfaces/shared';
import { FormEvent, useState } from 'react';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useSelect } from '@/shared/hooks/inputHooks/useSelect';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { IOfferFormData } from './interface';
import { getYearsFromToNow } from './helpers';
import { errorsMessages } from '@/shared/hooks/useTextInput/validators';
import { Validation } from '@/shared/helpers/validation';
import { IOfferData, initialOfferData } from '@/widgets/OfferForm/initialOfferData';
import { useNavigate } from 'react-router-dom';
import {
	IOfferCurrentStep,
	initialOfferCurrentStep
} from '@/widgets/OfferForm/initialOfferCurrentStep';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import Mask from '@/shared/helpers/mask';
import Cookies from 'js-cookie';
import api from './api';

export const useOfferForm = (indexesList: number[] | undefined) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const { setError } = useCommon();
	const { phoneMask } = new Mask();
	const { isValidPhoneNumber } = new Validation();
	const [offerData, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const [offerCurrentStep, setOfferCurrentStep] = useSessionStorage<IOfferCurrentStep[]>(
		'offerCurrentStep',
		initialOfferCurrentStep
	);

	const formData = {
		car_year: useSelect<ISelectOption>({
			isRequired: true,
			options: getYearsFromToNow(1950).map((y) => ({ label: String(y), value: String(y) }))
		}),
		car_make: useSelect({ isRequired: true }),
		car_model: useSelect({ isRequired: true }),
		car_submodel: useSelect({ isRequired: true }),
		car_zipcode: useTextInput({
			isRequired: true,
			validators: ['zipcode']
		}),
		phone_number: useTextInput({
			filters: [phoneMask],
			validators: [
				{ checkFn: (value) => isValidPhoneNumber({ value }), error: errorsMessages.PHONE }
			]
		}),
		customer_name: useTextInput({ isRequired: true })
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (notValidForm(formData)) return;

		setOfferData((prev) => ({
			...prev,
			stepIndex: offerData.stepIndex > 0 ? offerData.stepIndex : 0,
			carForm: {
				year: formData.car_year.value,
				make: formData.car_make.value,
				model: formData.car_model.value,
				submodel: formData.car_submodel.value,
				zipcode: formData.car_zipcode.value,
				phoneNumber: formData.phone_number.value,
				customerName: formData.customer_name.value,
				isFilled: true
			}
		}));

		if (offerCurrentStep[1]) {
			Cookies.set('first-offer-form-is-filled', 'true');
			navigate('/offer');
			return;
		}

		try {
			setIsLoading(true);
			const data: IOfferFormData = {
				car_year: {
					id: setFieldId(indexesList, 0),
					value: formData.car_year.value || Number(new Date().getFullYear)
				},
				car_make: {
					id: setFieldId(indexesList, 1),
					value: formData.car_make.value
				},
				car_model: {
					id: setFieldId(indexesList, 2),
					value: formData.car_model.value
				},
				car_submodel: {
					id: setFieldId(indexesList, 3),
					value: formData.car_submodel.value
				},
				car_zipcode: {
					id: setFieldId(indexesList, 4),
					value: formData.car_zipcode.value
				},
				phone_number: {
					id: setFieldId(indexesList, 5),
					value: formData.phone_number.value
						.replace('(', '')
						.replace(')', '')
						.replace('-', '')
						.replace(' ', '')
				},
				customer_name: {
					id: setFieldId(indexesList, 6),
					value: formData.customer_name.value
				}
			};

			const res = await api.postOfferFormData(data);
			setOfferCurrentStep((prev) => [...prev, res]);
			setIsLoading(false);
			Cookies.set('first-offer-form-is-filled', 'true');
			navigate('/offer');
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
		isLoading
	};
};
