import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { Button } from '@/shared/ui/Button';
import { normalizeSelectData, notValidForm, setFieldId } from '@/shared/helpers/index';
import {
	IOfferData,
	IOfferDataResponseInfo,
	initialOfferData,
	initialOfferDataResponseInfo
} from '../../initialOfferData';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { IStep } from '../../initialStep';
import { RadioButtonsGroup } from '@/shared/ui/RadioButtonsGroup';
import { Validation } from '@/shared/helpers/validation';
import { errorsMessages } from '@/shared/hooks/useTextInput/validators';
import { Checkbox } from '@/shared/ui/FormComponents/Checkbox/Checkbox';
import { getApiError } from '@/shared/helpers/index';
import { useCommon } from '@/app/context/Common/CommonContext';
import { IOfferCurrentStep, initialOfferCurrentStep } from '../../initialOfferCurrentStep';
import { FormField } from '@/shared/interfaces/shared';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import classNames from 'classnames';
import styles from './index.module.scss';
import Mask from '@/shared/helpers/mask';
import api from '../api';

interface Props {
	setStep: (...args: any[]) => void;
}

type FormType = 'residential' | 'commercial';

export interface ILocationFormData {
	streetAddress: FormField<string>;
	city: FormField<string>;
	state: FormField<string>;
	zipcode: FormField<string>;
	phone: FormField<string>;
	business_name: FormField<string>;
	business_phone: FormField<string>;
	text_me_check: FormField<boolean>;
}

export const LocationForm: FC<Props> = ({ setStep }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [offerData, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const [offerDataResponseInfo] = useSessionStorage<IOfferDataResponseInfo>(
		'offerDataResponseInfo',
		initialOfferDataResponseInfo
	);
	const [currentOfferData, setCurrentOffer] = useSessionStorage<IOfferCurrentStep[]>(
		'offerCurrentStep',
		initialOfferCurrentStep
	);
	const [indexesList, setIndexesList] = useState<number[]>([]);
	const { setError } = useCommon();

	const { phoneMask } = new Mask();
	const { isValidPhoneNumber } = new Validation();

	const formData = {
		streetAddress: useTextInput({ isRequired: true }),
		city: useTextInput({ isRequired: true }),
		state: useTextInput({ isRequired: true }),
		zipcode: useTextInput({
			isRequired: true,
			validators: ['zipcode']
		}),
		phone: useTextInput({
			filters: [phoneMask],
			validators: [
				{ checkFn: (value) => isValidPhoneNumber({ value }), error: errorsMessages.PHONE }
			]
		}),
		business_name: useTextInput({ isRequired: false }),
		business_phone: useTextInput({
			filters: [phoneMask],
			isRequired: false,
			validators: [
				{ checkFn: (value) => isValidPhoneNumber({ value }), error: errorsMessages.PHONE }
			]
		})
	};

	const [textMe, setTextMe] = useState(false);

	const [radioState, setRadioState] = useState<FormType>('residential');
	const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
		setRadioState(e.target.value as FormType);
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			const data: ILocationFormData = {
				streetAddress: {
					id: setFieldId(indexesList, 3),
					value: formData.streetAddress.value
				},
				city: {
					id: setFieldId(indexesList, 4),
					value: formData.city.value
				},
				state: {
					id: 0,
					value: formData.state.value
				},
				zipcode: {
					id: setFieldId(indexesList, 5),
					value: formData.zipcode.value
				},
				phone: {
					id: setFieldId(indexesList, 6),
					value: formData.phone.value
				},
				business_name: {
					id: setFieldId(indexesList, 1),
					value: formData.business_name.value
				},
				business_phone: {
					id: setFieldId(indexesList, 2),
					value: formData.business_phone.value
				},
				text_me_check: {
					id: 0,
					value: textMe
				}
			};
			const res = await api.postLocationForm(data);
			setCurrentOffer((prev) => [...prev, res]);
			setIsLoading(false);
		} catch (error) {
			const { msg } = getApiError(error, formData);
			setError({ type: 'error', text: msg || 'Error !' });
		} finally {
			setIsLoading(false);
		}

		setOfferData((prev) => ({
			...prev,
			stepIndex: 5,
			locationForm: {
				addressType: radioState,
				streetAddress: formData.streetAddress.value,
				city: formData.city.value,
				state: formData.state.value,
				zipcode: formData.zipcode.value,
				phone: formData.phone.value,
				business_name: formData.business_name.value,
				business_phone: formData.business_phone.value,
				text_me_check: textMe,
				isFilled: true
			}
		}));

		setStep((prev: IStep) => ({
			...prev,
			count: 5
		}));
	};

	useEffect(() => {
		setIndexesList(currentOfferData[4].form_fields.map((field) => field.id));
	}, [currentOfferData]);

	useEffect(() => {
		if (offerData.locationForm.streetAddress)
			formData.streetAddress.setValue(offerData.locationForm.streetAddress);
		if (offerData.locationForm.zipcode) formData.zipcode.setValue(offerData.locationForm.zipcode);
		if (offerData.locationForm.phone) formData.phone.setValue(offerData.locationForm.phone);
		if (offerData.locationForm.business_name)
			formData.business_name.setValue(offerData.locationForm.business_name);
		if (offerData.locationForm.business_phone)
			formData.business_phone.setValue(offerData.locationForm.business_phone);
		if (offerData.locationForm.text_me_check) setTextMe(offerData.locationForm.text_me_check);
		if (offerData.titleForm.state) formData.state.setValue(offerData.titleForm.state);
	}, []);

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<RadioButtonsGroup
				handleRadioChange={handleRadioChange}
				radioState={radioState}
				label={currentOfferData?.[5]?.form_fields?.[0].name || 'What type of address is this?'}
				radioList={
					normalizeSelectData(currentOfferData?.[5]?.form_fields?.[0]?.items?.[0]) || [
						{ label: 'Residential', value: 'residential' },
						{ label: 'Commercial', value: 'commercial' }
					]
				}
			/>
			{radioState === 'commercial' && (
				<fieldset className={styles.businessFieldset}>
					<InputField
						{...formData.business_name.inputProps}
						errors={formData.business_name.errors}
						label={currentOfferData?.[5]?.form_fields?.[1].name || 'Business name'}
						placeholder={
							currentOfferData?.[5]?.form_fields?.[1].placeholder || 'Enter your business name'
						}
					/>
					<InputField
						{...formData.business_phone.inputProps}
						errors={formData.business_phone.errors}
						className={styles.OfferFormItem}
						label={currentOfferData?.[5]?.form_fields?.[2].name || 'Business phone number'}
						placeholder={
							currentOfferData?.[5]?.form_fields?.[2].placeholder || '(____) ____-______'
						}
					/>
				</fieldset>
			)}
			<InputField
				{...formData.streetAddress.inputProps}
				className={classNames(styles.streetAddress, {
					[styles.inputOffset]: radioState === 'commercial'
				})}
				errors={formData.streetAddress.errors}
				label={currentOfferData?.[5]?.form_fields?.[3].name || 'Street address'}
				placeholder={currentOfferData?.[5]?.form_fields?.[3].placeholder || 'Enter street address'}
			/>
			<fieldset className={styles.fieldsetTriple}>
				<InputField
					{...formData.city.inputProps}
					errors={formData.city.errors}
					label={currentOfferData?.[5]?.form_fields?.[4].name || 'City'}
					placeholder={currentOfferData?.[5]?.form_fields?.[4].placeholder || 'Enter city name'}
				/>
				<InputField
					{...formData.state.inputProps}
					errors={formData.state.errors}
					label={'State'}
					disabled
				/>
				<InputField
					{...formData.zipcode.inputProps}
					errors={formData.zipcode.errors}
					maxLength={5}
					label={currentOfferData?.[5]?.form_fields?.[5].name || 'Zipcode'}
					placeholder={currentOfferData?.[5]?.form_fields?.[5].placeholder || '00000'}
				/>
			</fieldset>
			<fieldset className={styles.fieldsetDouble}>
				<InputField
					{...formData.phone.inputProps}
					errors={formData.phone.errors}
					className={styles.OfferFormItem}
					label={currentOfferData?.[5]?.form_fields?.[6].name || 'Contact phone number'}
					placeholder={currentOfferData?.[5]?.form_fields?.[6].placeholder || '(____) ____-______'}
				/>
				<Checkbox
					label='Text me updates about my offer, scheduling, and the sale of my vehicle. SMS data rates may apply.'
					onChangeFn={setTextMe}
					checkStatus={textMe}
				/>
			</fieldset>
			<div className={styles.expirePriceNav}>
				<div className={styles.expirePrice}>
					<h2>{offerDataResponseInfo.price}</h2>
					<span className='text-16-14'>Offer expires in 7 days</span>
				</div>
				<Button customType='black' iconName='arrow' iconPosition='right' loading={isLoading}>
					next
				</Button>
			</div>
		</form>
	);
};
