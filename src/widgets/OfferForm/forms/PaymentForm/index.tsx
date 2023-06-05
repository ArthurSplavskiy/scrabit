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
import { FC, useEffect, useState } from 'react';
import { ReactSelect } from '@/shared/ui/FormComponents/ReactSelect/ReactSelect';
import { useSelect } from '@/shared/hooks/inputHooks/useSelect';
import { FormField, ISelectOption } from '@/shared/interfaces/shared';
import { setSelectedOrNull } from '../../utils';
import { CalcInfo } from '../../ui/CalcInfo/CalcInfo';
import { CannotCalc } from '../../ui/CannotCalc';
import { useCommon } from '@/app/context/Common/CommonContext';
import { IOfferCurrentStep, initialOfferCurrentStep } from '../../initialOfferCurrentStep';
import { getApiError } from '@/shared/helpers/index';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import styles from './index.module.scss';
import api from '../api';

interface Props {
	//setStep: (...args: any[]) => void;
}

export interface IPaymentFormData {
	name: FormField<string>;
	time: FormField<string>;
	date: FormField<string>;
}

export const PaymentForm: FC<Props> = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [offerData, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const [offerDataResponseInfo] = useSessionStorage<IOfferDataResponseInfo>(
		'offerDataResponseInfo',
		initialOfferDataResponseInfo
	);
	const [calculateOfferCostStatus, setCalculateOfferCostStatus] = useSessionStorage<boolean>(
		'calculateOfferCostStatus',
		false
	);
	const [offerPriceScreen, setOfferPriceScreen] = useSessionStorage<boolean>(
		'offerPriceScreen',
		false
	);
	const [currentOfferData, setCurrentOffer] = useSessionStorage<IOfferCurrentStep[]>(
		'offerCurrentStep',
		initialOfferCurrentStep
	);
	const [indexesList, setIndexesList] = useState<number[]>([]);
	const { setError } = useCommon();

	let currentDate = new Date();
	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const firstSevenDays: ISelectOption[] = [];
	for (let i = 0; i < 7; i++) {
		currentDate.setDate(currentDate.getDate() + 1);
		firstSevenDays.push({
			label: `${months[currentDate.getMonth()]}, ${currentDate.getDate()}`,
			value: `${months[currentDate.getMonth()]}, ${currentDate.getDate()}`
		});
	}

	const formData = {
		name: useTextInput({ isRequired: true }),
		time: useSelect<ISelectOption>({
			isRequired: true,
			options: [
				{ label: '7:00', value: '7:00' },
				{ label: '8:00', value: '8:00' },
				{ label: '9:00', value: '9:00' },
				{ label: '10:00', value: '10:00' },
				{ label: '11:00', value: '11:00' },
				{ label: '12:00', value: '12:00' },
				{ label: '13:00', value: '13:00' },
				{ label: '14:00', value: '14:00' },
				{ label: '15:00', value: '15:00' },
				{ label: '16:00', value: '16:00' },
				{ label: '17:00', value: '17:00' },
				{ label: '18:00', value: '18:00' },
				{ label: '19:00', value: '19:00' },
				{ label: '20:00', value: '20:00' }
			]
		}),
		date: useSelect<ISelectOption>({
			isRequired: true,
			options: firstSevenDays
		})
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			const data: IPaymentFormData = {
				name: {
					id: setFieldId(indexesList, 0),
					value: formData.name.value
				},
				time: {
					id: setFieldId(indexesList, 1),
					value: formData.time.value
				},
				date: {
					id: setFieldId(indexesList, 2),
					value: formData.date.value
				}
			};
			const res = await api.postPaymentForm(data);
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
			stepIndex: 6,
			paymentForm: {
				name: formData.name.value,
				time: formData.time.value,
				date: formData.date.value,
				isFilled: true
			}
		}));

		if (offerData.calculateOfferCost) {
			setCalculateOfferCostStatus(true);
		}

		if (!offerData.calculateOfferCost) {
			setOfferPriceScreen(true);
		}
	};

	const normalizeDate = (data?: { label: string; value: string }[]) => {
		return data?.map((item) => ({
			label: item.label.replace('$', ', '),
			value: item.value.replace('$', ', ')
		}));
	};

	useEffect(() => {
		setIndexesList(currentOfferData[4].form_fields.map((field) => field.id));
	}, [currentOfferData]);

	useEffect(() => {
		if (offerData.paymentForm.name) formData.name.setValue(offerData.paymentForm.name);
		if (offerData.paymentForm.time) formData.time.setValue(offerData.paymentForm.time);
		if (offerData.paymentForm.date) formData.date.setValue(offerData.paymentForm.date);
	}, []);

	return (
		<>
			{!offerPriceScreen && !calculateOfferCostStatus && (
				<form className={styles.form} onSubmit={onSubmit}>
					<div className={styles.formInner}>
						<InputField
							{...formData.name.inputProps}
							errors={formData.name.errors}
							label={currentOfferData?.[6]?.form_fields?.[0].name || 'Payee’s full name'}
							placeholder={currentOfferData?.[6]?.form_fields?.[0].placeholder || 'Full name'}
						/>
						<div className={styles.fieldsetDouble}>
							<ReactSelect
								errors={formData.time.errors}
								defaultValue={setSelectedOrNull(offerData.paymentForm.time)}
								onChange={formData.time.inputProps.onChange}
								options={
									normalizeSelectData(currentOfferData?.[6]?.form_fields?.[1].items?.[0]) ||
									formData.time.options
								}
								label={currentOfferData?.[6]?.form_fields?.[1].name || 'Choose a time'}
								placeholder={currentOfferData?.[6]?.form_fields?.[1].placeholder || 'Time'}
							/>
							<ReactSelect
								errors={formData.date.errors}
								defaultValue={setSelectedOrNull(offerData.paymentForm.date)}
								onChange={formData.date.inputProps.onChange}
								options={
									normalizeDate(currentOfferData?.[6]?.form_fields?.[2].items) ||
									formData.date.options
								}
								label={currentOfferData?.[6]?.form_fields?.[2].name || 'Choose a date'}
								placeholder={currentOfferData?.[6]?.form_fields?.[2].placeholder || 'Date'}
							/>
						</div>
					</div>
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
			)}
			{offerPriceScreen && (
				<CalcInfo
					title="All good to go! You're ready to officially accept our offer on your 2018 Tesla Model S for"
					price={offerDataResponseInfo.price}
					isDone
					footerText={[
						{
							title: '7 days',
							text: 'You have 7 days to accept the offer and get your cash.'
						},
						{
							title: 'What now?',
							text: 'We pick your car up and pay you back'
						}
					]}
				/>
			)}
			{calculateOfferCostStatus && <CannotCalc text={'Thank you, our operator will contact you'} />}
		</>
	);
};
