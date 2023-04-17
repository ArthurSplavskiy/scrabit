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

	const formData = {
		name: useTextInput({ isRequired: true }),
		time: useSelect<ISelectOption>({
			isRequired: true,
			options: [
				{ label: '8:00', value: '8:00' },
				{ label: '10:00', value: '10:00' }
			]
		}),
		date: useSelect<ISelectOption>({
			isRequired: true,
			options: [
				{ label: '01', value: '01' },
				{ label: '02', value: '02' }
			]
		})
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (notValidForm(formData)) return;

		setOfferData((prev) => ({
			...prev,
			paymentForm: {
				name: formData.name.value,
				time: formData.time.value,
				date: formData.date.value
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
								label={'Choose a Time'}
							/>
							<ReactSelect
								errors={formData.date.errors}
								defaultValue={setSelectedOrNull(offerData.paymentForm.date)}
								onChange={formData.date.inputProps.onChange}
								options={formData.date.options}
								label={'Choose a Time'}
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
