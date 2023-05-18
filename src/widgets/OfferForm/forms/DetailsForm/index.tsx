import { ReactSelect } from '@/shared/ui/FormComponents/ReactSelect/ReactSelect';
import { useSelect } from '@/shared/hooks/inputHooks/useSelect';
import { ISelectOption } from '@/shared/interfaces/shared';
import { Button } from '@/shared/ui/Button';
import { notValidForm } from '@/shared/helpers/index';
import {
	IOfferData,
	IOfferDataResponseInfo,
	initialOfferData,
	initialOfferDataResponseInfo
} from '../../initialOfferData';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { setSelectedOrNull } from '../../utils';
import { IStep } from '../../initialStep';
import { BackButton } from '../../ui/BackButton';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import mainStyles from '../../index.module.scss';
import styles from './index.module.scss';
import { RadioButtonsGroup } from '@/shared/ui/RadioButtonsGroup';
import { useCommon } from '@/app/context/Common/CommonContext';
import { ModalPopup } from '@/shared/ui/PopupSystem/ModalPopup/ModalPopup';
import { TemplateModal } from '@/shared/ui/PopupSystem/TemplateModal/TemplateModal';
import classNames from 'classnames';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { HeroAnimationCar } from '@/entities/HeroAnimationCar';
import { CalcInfo } from '../../ui/CalcInfo/CalcInfo';
import { CannotCalc } from '../../ui/CannotCalc';

interface Props {
	setStep: (...args: any[]) => void;
}

export const DetailsForm: FC<Props> = ({ setStep }) => {
	const [offerData, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const [offerPriceScreen, setOfferPriceScreen] = useSessionStorage<boolean>(
		'offerPriceScreen',
		false
	);
	const [calculateOfferCostStatus, setCalculateOfferCostStatus] = useSessionStorage<boolean>(
		'calculateOfferCostStatus',
		false
	);
	const [offerDataResponseInfo, setOfferDataResponseInfo] =
		useSessionStorage<IOfferDataResponseInfo>(
			'offerDataResponseInfo',
			initialOfferDataResponseInfo
		);
	const [damageZone, setDamageZone] = useState<number[]>([]);
	const { isMobile } = useDevice();

	const {
		// popup damage
		openOfferDamagePopup,
		closeOfferDamagePopup,
		isOfferDamagePopupOpen,
		// ===
		// popup damage
		openCalcPopup,
		closeCalcPopup,
		isCalcPopupOpen,
		// ===
		isPopupHide,
		popupHide
	} = useCommon();

	const formData = {
		wheels: useSelect<ISelectOption>({
			isRequired: true,
			options: [
				{ label: '1', value: '1' },
				{ label: '2', value: '2' },
				{ label: '3', value: '3' },
				{ label: '4', value: '4' }
			]
		}),
		damage: useSelect<ISelectOption>({
			isRequired: true,
			options: [
				{ label: 'Yes', value: 'Yes' },
				{ label: 'No', value: 'No' }
			]
		}),
		flood: useSelect<ISelectOption>({
			isRequired: true,
			options: [
				{ label: 'Yes', value: 'Yes' },
				{ label: 'No', value: 'No' }
			]
		}),
		converters: useSelect<ISelectOption>({
			isRequired: true,
			options: [
				{ label: 'Yes', value: 'Yes' },
				{ label: 'No', value: 'No' }
			]
		})
	};

	const [radioState, setRadioState] = useState<string>('car-is-driving');
	const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
		setRadioState(e.target.value);
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (notValidForm(formData)) return;

		setOfferData((prev) => ({
			...prev,
			stepIndex: 2,
			detailsStepCheck: true,
			detailsForm: {
				car_condition: radioState,
				wheels: formData.wheels.value,
				damage: formData.damage.value,
				flood: formData.flood.value,
				converters: formData.converters.value,
				damageZone: damageZone,
				isFilled: true
			}
		}));

		setStep((prev: IStep) => ({
			...prev,
			count: 2
		}));

		if (!offerData.calculateOfferCost) {
			openCalcPopup();
		}

		const sendObj = {
			vehicleForm: offerData.photos,
			photos: offerData.photos,
			detailsForm: {
				car_condition: radioState,
				wheels: formData.wheels.value,
				damage: formData.damage.value,
				flood: formData.flood.value,
				converters: formData.converters.value,
				damageZone: damageZone
			}
		};
		// send sendObj

		if (offerData.calculateOfferCost) {
			setCalculateOfferCostStatus(true);
		}

		setTimeout(() => {
			// remove
			if (!offerData.calculateOfferCost) {
				closeCalcPopup();
				setOfferPriceScreen(true);
				setOfferDataResponseInfo({ price: '$ 10,000-16,110' });
			}
		}, 1000);
	};

	const setDamageZoneCallback = (zone: number) => {
		if (damageZone.includes(zone)) {
			setDamageZone((prev) => [...prev.filter((el) => el !== zone)]);
			return;
		}
		setDamageZone((prev) => [...prev, zone]);
	};

	useEffect(() => {
		if (formData.damage.value === 'Yes') {
			setDamageZone([]);
			openOfferDamagePopup();
		}
	}, [formData.damage.value]);

	useEffect(() => {
		if (offerData.detailsForm.wheels) formData.wheels.setValue(offerData.detailsForm.wheels);
		if (offerData.detailsForm.damage) formData.damage.setValue(offerData.detailsForm.damage);
		if (offerData.detailsForm.flood) formData.flood.setValue(offerData.detailsForm.flood);
		if (offerData.detailsForm.converters)
			formData.converters.setValue(offerData.detailsForm.converters);
		if (offerData.detailsForm.car_condition) setRadioState(offerData.detailsForm.car_condition);
		if (offerData.detailsForm.damageZone) setDamageZone(offerData.detailsForm.damageZone);
	}, []);

	return (
		<>
			{!offerPriceScreen && !calculateOfferCostStatus && (
				<form className={styles.form} onSubmit={onSubmit}>
					<RadioButtonsGroup
						handleRadioChange={handleRadioChange}
						radioState={radioState}
						label='Choose your car condition'
						radioList={[
							{ label: 'Car is driving', value: 'car-is-driving' },
							{ label: 'The car only starting', value: 'the-car-only-starting' }
						]}
					/>
					<fieldset>
						<ReactSelect
							errors={formData.wheels.errors}
							defaultValue={setSelectedOrNull(offerData.detailsForm.wheels)}
							onChange={formData.wheels.inputProps.onChange}
							options={formData.wheels.options}
							label={'The number of wheels in the car'}
							placeholder='Choose the number'
						/>
						<ReactSelect
							errors={formData.damage.errors}
							defaultValue={setSelectedOrNull(offerData.detailsForm.damage)}
							labelLink={
								<button
									type='button'
									onClick={() => {
										openOfferDamagePopup();
									}}>
									Change damage
								</button>
							}
							onChange={formData.damage.inputProps.onChange}
							options={formData.damage.options}
							label={'Does your car have any damage'}
							placeholder='Choose option'
						/>
						<ReactSelect
							errors={formData.flood.errors}
							defaultValue={setSelectedOrNull(offerData.detailsForm.flood)}
							onChange={formData.flood.inputProps.onChange}
							options={formData.flood.options}
							label='Any flood or fire damage?'
							placeholder='Enter any information about damage'
						/>
						<ReactSelect
							errors={formData.converters.errors}
							defaultValue={setSelectedOrNull(offerData.detailsForm.converters)}
							onChange={formData.converters.inputProps.onChange}
							options={formData.converters.options}
							label={'Does it have catalytic converters?'}
							placeholder='Choose option'
						/>
					</fieldset>
					<div className={mainStyles.offerFormContentNav}>
						<BackButton setStep={setStep} />
						<Button customType='black' iconName='arrow' iconPosition='right'>
							next
						</Button>
					</div>
				</form>
			)}
			<ModalPopup
				show={isOfferDamagePopupOpen}
				hide={isPopupHide}
				withBackdrop={false}
				onClose={closeOfferDamagePopup}
				onAnimationHideStart={popupHide}>
				<TemplateModal
					title='Where is the exterior damage'
					subTitle='Show us where the damage is by selecting the corresponding quadrant. Select all that apply.'>
					<div className={styles.carDamageForm}>
						<div className={styles.carDamageCar}>
							<button
								className={classNames(styles.carDamageCarBtn, {
									[styles.active]: damageZone.includes(1)
								})}
								onClick={() => {
									setDamageZoneCallback(1);
								}}></button>
							<button
								className={classNames(styles.carDamageCarBtn, {
									[styles.active]: damageZone.includes(2)
								})}
								onClick={() => {
									setDamageZoneCallback(2);
								}}></button>
							<button
								className={classNames(styles.carDamageCarBtn, {
									[styles.active]: damageZone.includes(3)
								})}
								onClick={() => {
									setDamageZoneCallback(3);
								}}></button>
							<button
								className={classNames(styles.carDamageCarBtn, {
									[styles.active]: damageZone.includes(4)
								})}
								onClick={() => {
									setDamageZoneCallback(4);
								}}></button>
							<button
								className={classNames(styles.carDamageCarBtn, {
									[styles.active]: damageZone.includes(5)
								})}
								onClick={() => {
									setDamageZoneCallback(5);
								}}></button>
							<button
								className={classNames(styles.carDamageCarBtn, {
									[styles.active]: damageZone.includes(6)
								})}
								onClick={() => {
									setDamageZoneCallback(6);
								}}></button>
						</div>
						<Button
							type='button'
							width={isMobile ? 'fullWidth' : undefined}
							onClick={closeOfferDamagePopup}>
							save
						</Button>
					</div>
				</TemplateModal>
			</ModalPopup>
			<ModalPopup
				show={isCalcPopupOpen}
				hide={isPopupHide}
				withBackdrop={false}
				onClose={closeCalcPopup}
				showCloseButton={false}
				onAnimationHideStart={popupHide}>
				<TemplateModal title='Calculation in progress' subTitle='Hang tight, we’re almost there!'>
					<div className={styles.calcPopup}>
						<HeroAnimationCar text='our system calculates the approximate cost of your car' />
					</div>
				</TemplateModal>
			</ModalPopup>
			{offerPriceScreen && (
				<CalcInfo
					setStep={setStep}
					title='Voila!  we’re  ready to buy your 2018 tesla model s base for'
					price={offerDataResponseInfo.price}
					message='We can pick your car up as soon as today'
					nextStep={3}
					footerText={[
						{
							title: 'How come it’s $16,110?',
							text: 'Market value, vehicle condition, and documentation (like title status) are the main points that affect the offer calculation.'
						},
						{
							title: 'what’s next?',
							text: 'Create an account if you haven’t and accept our offer if that’s what you want to do. Then, tell us who to pay and when to pick your car up. No sweat.'
						}
					]}
				/>
			)}
			{calculateOfferCostStatus && (
				<CannotCalc
					setStep={setStep}
					nextStep={3}
					text={[
						'Sorry, We cannot calculate  the cost at this time.',
						'Continue all the steps with answers and our operator will call you back.'
					]}
				/>
			)}
		</>
	);
};
