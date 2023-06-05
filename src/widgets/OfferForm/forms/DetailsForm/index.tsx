import { ReactSelect } from '@/shared/ui/FormComponents/ReactSelect/ReactSelect';
import { useSelect } from '@/shared/hooks/inputHooks/useSelect';
import { FormField, ISelectOption } from '@/shared/interfaces/shared';
import { Button } from '@/shared/ui/Button';
import { normalizeSelectData, notValidForm, setFieldId } from '@/shared/helpers/index';
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
import { RadioButtonsGroup } from '@/shared/ui/RadioButtonsGroup';
import { useCommon } from '@/app/context/Common/CommonContext';
import { ModalPopup } from '@/shared/ui/PopupSystem/ModalPopup/ModalPopup';
import { TemplateModal } from '@/shared/ui/PopupSystem/TemplateModal/TemplateModal';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { HeroAnimationCar } from '@/entities/HeroAnimationCar';
import { CalcInfo } from '../../ui/CalcInfo/CalcInfo';
import { CannotCalc } from '../../ui/CannotCalc';
import { IOfferCurrentStep, initialOfferCurrentStep } from '../../initialOfferCurrentStep';
import { getApiError } from '@/shared/helpers/index';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import mainStyles from '../../index.module.scss';
import styles from './index.module.scss';
import classNames from 'classnames';
import api from '../api';

interface Props {
	setStep: (...args: any[]) => void;
}

export interface IDetailsFormData {
	car_condition: FormField<string>;
	wheels: FormField<string>;
	damage: FormField<string>;
	flood: FormField<string>;
	converters: FormField<string>;
	damageZone: FormField<number[]>;
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
	const [currentOfferData, setCurrentOffer] = useSessionStorage<IOfferCurrentStep[]>(
		'offerCurrentStep',
		initialOfferCurrentStep
	);
	const [uniqId] = useSessionStorage<string>('userUniqId', '');

	const [damageZone, setDamageZone] = useState<number[]>([]);
	const { isMobile } = useDevice();
	const [isLoading, setIsLoading] = useState(false);
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
	const { setError } = useCommon();
	const [indexesList, setIndexesList] = useState<number[]>([]);

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

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			if (!offerData.calculateOfferCost) {
				openCalcPopup();
			}
			const data: IDetailsFormData = {
				car_condition: {
					id: setFieldId(indexesList, 0),
					value: radioState
				},
				wheels: {
					id: setFieldId(indexesList, 1),
					value: formData.wheels.value
				},
				damage: {
					id: setFieldId(indexesList, 2),
					value: formData.damage.value
				},
				flood: {
					id: setFieldId(indexesList, 3),
					value: formData.flood.value
				},
				converters: {
					id: setFieldId(indexesList, 4),
					value: formData.converters.value
				},
				damageZone: {
					id: setFieldId(indexesList, 5),
					value: damageZone
				}
			};

			const res = await api.postDetailsForm(data, uniqId);
			setCurrentOffer((prev) => [...prev, res]);
			if (!offerData.calculateOfferCost) {
				closeCalcPopup();
				setOfferPriceScreen(true);
				setOfferDataResponseInfo({ price: res.price });
			}

			setIsLoading(false);
		} catch (error) {
			const { msg } = getApiError(error, formData);
			setError({ type: 'error', text: msg || 'Error !' });
		} finally {
			setIsLoading(false);
		}

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

		if (offerData.calculateOfferCost) {
			setCalculateOfferCostStatus(true);
		}
	};

	const setDamageZoneCallback = (zone: number) => {
		if (damageZone.includes(zone)) {
			setDamageZone((prev) => [...prev.filter((el) => el !== zone)]);
			return;
		}
		setDamageZone((prev) => [...prev, zone]);
	};

	useEffect(() => {
		if (offerPriceScreen || calculateOfferCostStatus) return;
		if (formData.damage.value.toLocaleLowerCase() === 'yes') {
			setDamageZone([]);
			openOfferDamagePopup();
		}
		if (formData.damage.value === 'No') {
			setDamageZone([]);
		}
	}, [formData.damage.value]);

	useEffect(() => {
		setIndexesList(currentOfferData[3].form_fields.map((field) => field.id));
	}, [currentOfferData]);

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
						label={currentOfferData[3].form_fields[0].name || 'Choose your car condition'}
						radioList={[
							{
								label: currentOfferData?.[3]?.form_fields?.[0]?.items?.[0].label || '',
								value: currentOfferData?.[3]?.form_fields?.[0]?.items?.[0]?.value || ''
							},
							{
								label: currentOfferData?.[3]?.form_fields?.[0]?.items?.[1].label || '',
								value: currentOfferData?.[3]?.form_fields?.[0]?.items?.[1]?.value || ''
							}
						]}
					/>
					<fieldset>
						<ReactSelect
							errors={formData.wheels.errors}
							defaultValue={setSelectedOrNull(offerData.detailsForm.wheels)}
							onChange={formData.wheels.inputProps.onChange}
							options={
								normalizeSelectData(currentOfferData?.[3]?.form_fields?.[1]?.items?.[0]) ||
								formData.wheels.options
							}
							label={
								currentOfferData?.[3]?.form_fields?.[1]?.name || 'The number of wheels in the car'
							}
							placeholder={
								currentOfferData?.[3]?.form_fields?.[1]?.placeholder || 'Choose the number'
							}
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
							options={
								normalizeSelectData(currentOfferData?.[3]?.form_fields?.[2]?.items?.[0]) ||
								formData.damage.options
							}
							label={
								currentOfferData?.[3]?.form_fields?.[2]?.name || 'Does your car have any damage'
							}
							placeholder={currentOfferData?.[3]?.form_fields?.[2]?.placeholder || 'Choose option'}
						/>
						<ReactSelect
							errors={formData.flood.errors}
							defaultValue={setSelectedOrNull(offerData.detailsForm.flood)}
							onChange={formData.flood.inputProps.onChange}
							options={
								normalizeSelectData(currentOfferData?.[3]?.form_fields?.[3]?.items?.[0]) ||
								formData.flood.options
							}
							label={currentOfferData?.[3]?.form_fields?.[3]?.name || 'Any flood or fire damage?'}
							placeholder={
								currentOfferData?.[3]?.form_fields?.[3]?.placeholder ||
								'Enter any information about damage'
							}
						/>
						<ReactSelect
							errors={formData.converters.errors}
							defaultValue={setSelectedOrNull(offerData.detailsForm.converters)}
							onChange={formData.converters.inputProps.onChange}
							options={
								normalizeSelectData(currentOfferData?.[3]?.form_fields?.[4]?.items?.[0]) ||
								formData.converters.options
							}
							label={
								currentOfferData?.[3]?.form_fields?.[4]?.name ||
								'Does it have catalytic converters?'
							}
							placeholder={currentOfferData?.[3]?.form_fields?.[4]?.placeholder || 'Choose option'}
						/>
					</fieldset>
					<div className={mainStyles.offerFormContentNav}>
						<BackButton setStep={setStep} />
						<Button customType='black' iconName='arrow' iconPosition='right' loading={isLoading}>
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
