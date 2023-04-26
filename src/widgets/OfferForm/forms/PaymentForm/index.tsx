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
import { FC, useEffect } from 'react';
import { ReactSelect } from '@/shared/ui/FormComponents/ReactSelect/ReactSelect';
import { useSelect } from '@/shared/hooks/inputHooks/useSelect';
import { ISelectOption } from '@/shared/interfaces/shared';
import { setSelectedOrNull } from '../../utils';
import { CalcInfo } from '../../ui/CalcInfo/CalcInfo';

interface Props {
	setStep: (...args: any[]) => void;
}

export const PaymentForm: FC<Props> = ({ setStep }) => {
	const [offerData, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const [offerDataResponseInfo] = useSessionStorage<IOfferDataResponseInfo>(
		'offerDataResponseInfo',
		initialOfferDataResponseInfo
	);
	const [offerPriceScreen, setOfferPriceScreen] = useSessionStorage<boolean>(
		'offerPriceScreen',
		false
	);

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

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (notValidForm(formData)) return;

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

		setOfferPriceScreen(true);

		// setStep((prev: IStep) => ({
		// 	...prev,
		// 	count: 5
		// }));
	};

	useEffect(() => {
		if (offerData.paymentForm.name) formData.name.setValue(offerData.paymentForm.name);
		if (offerData.paymentForm.time) formData.time.setValue(offerData.paymentForm.time);
		if (offerData.paymentForm.date) formData.date.setValue(offerData.paymentForm.date);
	}, []);

	return (
		<>
			{!offerPriceScreen && (
				<form className={styles.form} onSubmit={onSubmit}>
					<div className={styles.formInner}>
						<InputField
							{...formData.name.inputProps}
							errors={formData.name.errors}
							label='Payee’s full name'
							placeholder='Full name'
						/>
						<div className={styles.fieldsetDouble}>
							<ReactSelect
								errors={formData.time.errors}
								defaultValue={setSelectedOrNull(offerData.paymentForm.time)}
								onChange={formData.time.inputProps.onChange}
								options={formData.time.options}
								label={'Choose a time'}
								placeholder='Time'
							/>
							<ReactSelect
								errors={formData.date.errors}
								defaultValue={setSelectedOrNull(offerData.paymentForm.date)}
								onChange={formData.date.inputProps.onChange}
								options={formData.date.options}
								label={'Choose a date'}
								placeholder='Date'
							/>
						</div>
					</div>
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
		</>
	);
};
