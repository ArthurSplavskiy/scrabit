import { ReactSelect } from '@/shared/ui/FormComponents/ReactSelect/ReactSelect';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { useSelect } from '@/shared/hooks/inputHooks/useSelect';
import { FormField, ISelectOption } from '@/shared/interfaces/shared';
import { Button } from '@/shared/ui/Button';
import { normalizeSelectData, notValidForm, setFieldId } from '@/shared/helpers/index';
import styles from './index.module.scss';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import {
	IOfferData,
	IOfferDataResponseInfo,
	initialOfferData,
	initialOfferDataResponseInfo
} from '../../initialOfferData';
import { FC, useEffect, useState } from 'react';
import { setSelectedOrNull } from '../../utils';
import { IStep } from '../../initialStep';
import { ModalPopup } from '@/shared/ui/PopupSystem/ModalPopup/ModalPopup';
import { TemplateModal } from '@/shared/ui/PopupSystem/TemplateModal/TemplateModal';
import { useCommon } from '@/app/context/Common/CommonContext';
import { statesDefault } from './states';
import { IOfferCurrentStep, initialOfferCurrentStep } from '../../initialOfferCurrentStep';
import { getApiError } from '@/shared/helpers/index';
import api from '../api';
import InfoIcon from './info.svg';

interface Props {
	setStep: (...args: any[]) => void;
}

export interface ITitleFormData {
	title: FormField<string>;
	vin: FormField<string>;
	state: FormField<string>;
	color: FormField<string>;
}

export const TitleForm: FC<Props> = ({ setStep }) => {
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
	const [uniqId] = useSessionStorage<string>('userUniqId', '');
	const [indexesList, setIndexesList] = useState<number[]>([]);
	const { setError } = useCommon();

	const {
		// popup vin
		openVinPopup,
		closeVinPopup,
		isVinPopupOpen,
		// ===
		isPopupHide,
		popupHide
	} = useCommon();

	const formData = {
		title: useTextInput({ isRequired: true }),
		vim: useTextInput({ isRequired: true, validators: ['vim'] }),
		state: useSelect<ISelectOption>({
			isRequired: true,
			options: statesDefault
		}),
		color: useSelect<ISelectOption>({
			isRequired: true,
			options: [
				{ label: 'Green', value: 'Green' },
				{ label: 'Red', value: 'Red' }
			]
		})
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (notValidForm(formData)) return;

		try {
			setIsLoading(true);
			const data: ITitleFormData = {
				title: {
					id: setFieldId(indexesList, 0),
					value: formData.title.value
				},
				vin: {
					id: setFieldId(indexesList, 1),
					value: formData.vim.value
				},
				state: {
					id: setFieldId(indexesList, 2),
					value: formData.state.value
				},
				color: {
					id: setFieldId(indexesList, 3),
					value: formData.color.value
				}
			};
			const res = await api.postTitleForm(data, uniqId);
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
			stepIndex: 4,
			titleForm: {
				title: formData.title.value,
				vim: formData.vim.value,
				state: formData.state.value,
				color: formData.color.value,
				isFilled: true
			}
		}));

		setStep((prev: IStep) => ({
			...prev,
			count: 4
		}));
	};

	useEffect(() => {
		setIndexesList(currentOfferData[4].form_fields.map((field) => field.id));
	}, [currentOfferData]);

	useEffect(() => {
		if (offerData.titleForm.title) formData.title.setValue(offerData.titleForm.title);
		if (offerData.titleForm.vim) formData.vim.setValue(offerData.titleForm.vim);
		if (offerData.titleForm.state) formData.state.setValue(offerData.titleForm.state);
		if (offerData.titleForm.color) formData.color.setValue(offerData.titleForm.color);
	}, []);

	return (
		<>
			<form className={styles.form} onSubmit={onSubmit}>
				<fieldset>
					<InputField
						{...formData.title.inputProps}
						errors={formData.title.errors}
						label={currentOfferData?.[4]?.form_fields?.[0]?.name || 'Name on title'}
						placeholder={currentOfferData?.[4]?.form_fields?.[0]?.placeholder || 'Name Last name'}
					/>
					<InputField
						{...formData.vim.inputProps}
						errors={formData.vim.errors}
						label={currentOfferData?.[4]?.form_fields?.[1]?.name || 'VIN'}
						placeholder={currentOfferData?.[4]?.form_fields?.[1]?.placeholder || 'Enter VIN'}
						maxLength={17}
						underElem={
							<button
								type='button'
								className={styles.infoBtn}
								onClick={() => {
									openVinPopup();
								}}>
								<span>What is a VIN and how do I find it?</span>
								<img src={InfoIcon} alt='What is a VIN and how do I find it?' />
							</button>
						}
					/>
					<ReactSelect
						errors={formData.state.errors}
						defaultValue={setSelectedOrNull(offerData.titleForm.state)}
						onChange={formData.state.inputProps.onChange}
						options={
							normalizeSelectData(currentOfferData?.[4]?.form_fields?.[2]?.items?.[0]) ||
							formData.state.options
						}
						label={currentOfferData?.[4]?.form_fields?.[2]?.name || 'Title issue state'}
						placeholder={
							currentOfferData?.[4]?.form_fields?.[2]?.placeholder || 'Choose issue state'
						}
					/>
					<ReactSelect
						errors={formData.color.errors}
						defaultValue={setSelectedOrNull(offerData.titleForm.color)}
						onChange={formData.color.inputProps.onChange}
						options={
							normalizeSelectData(currentOfferData?.[4]?.form_fields?.[3]?.items?.[0]) ||
							formData.color.options
						}
						label={currentOfferData?.[4]?.form_fields?.[3]?.name || 'Vehicle color'}
						placeholder={currentOfferData?.[4]?.form_fields?.[3]?.placeholder || 'Choose color'}
					/>
				</fieldset>
				<div className={styles.expirePriceNav}>
					<div className={styles.expirePrice}>
						<h2 className='text-40-24'>{offerDataResponseInfo.price}</h2>
						<span className='text-16-14'>Offer expires in 7 days</span>
					</div>
					<Button customType='black' iconName='arrow' iconPosition='right' loading={isLoading}>
						next
					</Button>
				</div>
			</form>
			<ModalPopup
				show={isVinPopupOpen}
				hide={isPopupHide}
				withBackdrop={false}
				onClose={closeVinPopup}
				onAnimationHideStart={popupHide}>
				<TemplateModal title='How can I find my VIN?'>
					<div className={styles.vimPopup}>
						<p className='text-16-14'>
							Let’s head back real quick so you can accept or deсline the previous offer before we
							move on
						</p>
						<img src='/images/car.png' alt='car' />
					</div>
				</TemplateModal>
			</ModalPopup>
		</>
	);
};
