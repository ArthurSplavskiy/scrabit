import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { Button } from '@/shared/ui/Button';
import { notValidForm } from '@/shared/helpers/index';
import styles from './index.module.scss';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
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
import Mask from '@/shared/helpers/mask';
import { errorsMessages } from '@/shared/hooks/useTextInput/validators';
import { Checkbox } from '@/shared/ui/FormComponents/Checkbox/Checkbox';
import classNames from 'classnames';

interface Props {
	setStep: (...args: any[]) => void;
}

type FormType = 'residential' | 'commercial';

export const LocationForm: FC<Props> = ({ setStep }) => {
	const [offerData, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const [offerDataResponseInfo] = useSessionStorage<IOfferDataResponseInfo>(
		'offerDataResponseInfo',
		initialOfferDataResponseInfo
	);

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

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (notValidForm(formData)) return;

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
		if (offerData.locationForm.streetAddress)
			formData.streetAddress.setValue(offerData.locationForm.streetAddress);
		if (offerData.locationForm.zipcode) formData.zipcode.setValue(offerData.locationForm.zipcode);
		if (offerData.locationForm.phone) formData.phone.setValue(offerData.locationForm.phone);
		if (offerData.locationForm.business_name)
			formData.business_name.setValue(offerData.locationForm.business_name);
		if (offerData.locationForm.business_phone)
			formData.business_phone.setValue(offerData.locationForm.business_phone);
		if (offerData.locationForm.text_me_check) setTextMe(offerData.locationForm.text_me_check);
		if (offerData.titleForm.issue) formData.state.setValue(offerData.titleForm.issue);
	}, []);

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<RadioButtonsGroup
				handleRadioChange={handleRadioChange}
				radioState={radioState}
				label='What type of address is this?'
				radioList={[
					{ label: 'Residential', value: 'residential' },
					{ label: 'Commercial', value: 'commercial' }
				]}
			/>
			{radioState === 'commercial' && (
				<fieldset className={styles.businessFieldset}>
					<InputField
						{...formData.business_name.inputProps}
						errors={formData.business_name.errors}
						label='Business name'
						placeholder='Enter your business name'
					/>
					<InputField
						{...formData.business_phone.inputProps}
						errors={formData.business_phone.errors}
						className={styles.OfferFormItem}
						label='Business phone number'
						placeholder='(____) ____-______'
					/>
				</fieldset>
			)}
			<InputField
				{...formData.streetAddress.inputProps}
				className={classNames(styles.streetAddress, {
					[styles.inputOffset]: radioState === 'commercial'
				})}
				errors={formData.streetAddress.errors}
				label='Street address'
				placeholder='Enter street address'
			/>
			<fieldset className={styles.fieldsetTriple}>
				<InputField
					{...formData.city.inputProps}
					errors={formData.city.errors}
					label='City'
					placeholder='Enter city name'
				/>
				<InputField
					{...formData.state.inputProps}
					errors={formData.state.errors}
					label='State'
					disabled
				/>
				<InputField
					{...formData.zipcode.inputProps}
					errors={formData.zipcode.errors}
					maxLength={5}
					label='Zipcode'
					placeholder='02196'
				/>
			</fieldset>
			<fieldset className={styles.fieldsetDouble}>
				<InputField
					{...formData.phone.inputProps}
					errors={formData.phone.errors}
					className={styles.OfferFormItem}
					label='Contact phone number'
					placeholder='(____) ____-______'
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
				<Button customType='black' iconName='arrow' iconPosition='right'>
					next
				</Button>
			</div>
		</form>
	);
};
