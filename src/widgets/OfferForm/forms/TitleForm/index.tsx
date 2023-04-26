import { ReactSelect } from '@/shared/ui/FormComponents/ReactSelect/ReactSelect';
import { InputField } from '@/shared/ui/FormComponents/InputField/InputField';
import { useTextInput } from '@/shared/hooks/useTextInput/useTextInput';
import { useSelect } from '@/shared/hooks/inputHooks/useSelect';
import { ISelectOption } from '@/shared/interfaces/shared';
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
import { setSelectedOrNull } from '../../utils';
import { IStep } from '../../initialStep';
import InfoIcon from './info.svg';
import { ModalPopup } from '@/shared/ui/PopupSystem/ModalPopup/ModalPopup';
import { TemplateModal } from '@/shared/ui/PopupSystem/TemplateModal/TemplateModal';
import { useCommon } from '@/app/context/Common/CommonContext';

interface Props {
	setStep: (...args: any[]) => void;
}

export const TitleForm: FC<Props> = ({ setStep }) => {
	const [offerData, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const [offerDataResponseInfo] = useSessionStorage<IOfferDataResponseInfo>(
		'offerDataResponseInfo',
		initialOfferDataResponseInfo
	);

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
		issue: useSelect<ISelectOption>({
			isRequired: true,
			options: [
				{ label: 'Alabama', value: 'Alabama' },
				{ label: 'Alaska', value: 'Alaska' },
				{ label: 'Arizona', value: 'Arizona' },
				{ label: 'Arkansas', value: 'Arkansas' },
				{ label: 'California', value: 'California' },
				{ label: 'Colorado', value: 'Colorado' },
				{ label: 'Connecticut', value: 'Connecticut' },
				{ label: 'Delaware', value: 'Delaware' },
				{ label: 'Florida', value: 'Florida' },
				{ label: 'Georgia', value: 'Georgia' },
				{ label: 'Hawaii', value: 'Hawaii' },
				{ label: 'Idaho', value: 'Idaho' },
				{ label: 'Illinois', value: 'Illinois' },
				{ label: 'Indiana', value: 'Indiana' },
				{ label: 'Iowa', value: 'Iowa' },
				{ label: 'Kansas', value: 'Kansas' },
				{ label: 'Kentucky', value: 'Kentucky' },
				{ label: 'Louisiana', value: 'Louisiana' },
				{ label: 'Maine', value: 'Connecticut' },
				{ label: 'Maryland', value: 'Maryland' },
				{ label: 'Massachusetts', value: 'Massachusetts' },
				{ label: 'Michigan', value: 'Michigan' },
				{ label: 'Minnesota', value: 'Minnesota' },
				{ label: 'Mississippi', value: 'Mississippi' },
				{ label: 'Missouri', value: 'Missouri' },
				{ label: 'Montana', value: 'Montana' },
				{ label: 'Nebraska', value: 'Nebraska' },
				{ label: 'Nevada', value: 'Nevada' },
				{ label: 'New Hampshire', value: 'New Hampshire' },
				{ label: 'New Jersey', value: 'New Jersey' },
				{ label: 'New Mexico', value: 'New Mexico' },
				{ label: 'New York', value: 'New York' },
				{ label: 'North Carolina', value: 'North Carolina' },
				{ label: 'North Dakota', value: 'North Dakota' },
				{ label: 'Ohio', value: 'Ohio' },
				{ label: 'Oklahoma', value: 'Oklahoma' },
				{ label: 'Oregon', value: 'Oregon' },
				{ label: 'Pennsylvania', value: 'Pennsylvania' },
				{ label: 'Rhode Island', value: 'Rhode Island' },
				{ label: 'South Carolina', value: 'South Carolina' },
				{ label: 'South Dakota', value: 'South Dakota' },
				{ label: 'Tennessee', value: 'Tennessee' },
				{ label: 'Texas', value: 'Texas' },
				{ label: 'Utah', value: 'Utah' },
				{ label: 'Vermont', value: 'Vermont' },
				{ label: 'Virginia', value: 'Virginia' },
				{ label: 'Washington', value: 'Washington' },
				{ label: 'West Virginia', value: 'West Virginia' },
				{ label: 'Wisconsin', value: 'Wisconsin' },
				{ label: 'Wyoming', value: 'Wyoming' }
			]
		}),
		color: useSelect<ISelectOption>({
			isRequired: true,
			options: [
				{ label: 'Green', value: 'Green' },
				{ label: 'Red', value: 'Red' }
			]
		})
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (notValidForm(formData)) return;

		setOfferData((prev) => ({
			...prev,
			stepIndex: 4,
			titleForm: {
				title: formData.title.value,
				vim: formData.vim.value,
				issue: formData.issue.value,
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
		if (offerData.titleForm.title) formData.title.setValue(offerData.titleForm.title);
		if (offerData.titleForm.vim) formData.vim.setValue(offerData.titleForm.vim);
		if (offerData.titleForm.issue) formData.issue.setValue(offerData.titleForm.issue);
		if (offerData.titleForm.color) formData.color.setValue(offerData.titleForm.color);
	}, []);

	return (
		<>
			<form className={styles.form} onSubmit={onSubmit}>
				<fieldset>
					<InputField
						{...formData.title.inputProps}
						errors={formData.title.errors}
						label='Name on title'
						placeholder='Name Last name'
					/>
					<InputField
						{...formData.vim.inputProps}
						errors={formData.vim.errors}
						label='VIN'
						placeholder='Enter VIN'
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
						errors={formData.issue.errors}
						defaultValue={setSelectedOrNull(offerData.titleForm.issue)}
						onChange={formData.issue.inputProps.onChange}
						options={formData.issue.options}
						label={'Title issue state'}
						placeholder='Choose issue state'
					/>
					<ReactSelect
						errors={formData.color.errors}
						defaultValue={setSelectedOrNull(offerData.titleForm.color)}
						onChange={formData.color.inputProps.onChange}
						options={formData.color.options}
						label={'Vehicle color'}
						placeholder='Choose color'
					/>
				</fieldset>
				<div className={styles.expirePriceNav}>
					<div className={styles.expirePrice}>
						<h2 className='text-40-24'>{offerDataResponseInfo.price}</h2>
						<span className='text-16-14'>Offer expires in 7 days</span>
					</div>
					<Button customType='black' iconName='arrow' iconPosition='right'>
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
