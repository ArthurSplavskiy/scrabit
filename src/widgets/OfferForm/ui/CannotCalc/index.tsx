import { Icon } from '@/shared/ui/Icon/Icon';
import { NextButton } from '../NextButton';
import { FC } from 'react';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { Button } from '@/shared/ui/Button';
import { IOfferData, initialOfferData } from '../../initialOfferData';
import { useCommon } from '@/app/context/Common/CommonContext';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import styles from './index.module.scss';

interface Props {
	text: string | string[];
	setStep?: (...args: any[]) => void;
	nextStep?: number;
}

export const CannotCalc: FC<Props> = ({ setStep, nextStep, text }) => {
	const { isMobile } = useDevice();
	const [, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const { openDeclineOfferPopup } = useCommon();
	const [, setCalculateOfferCostStatus] = useSessionStorage<boolean>(
		'calculateOfferCostStatus',
		false
	);
	return (
		<div className={styles.block}>
			<div className={styles.text}>
				{Array.isArray(text) ? (
					text.map((p, idx) => (
						<p className='text-24-18' key={idx}>
							{p}
						</p>
					))
				) : (
					<p className='text-24-18'>{text}</p>
				)}
			</div>
			<div className={styles.actions}>
				{!isMobile && (
					<>
						<button className={styles.decline} onClick={openDeclineOfferPopup}>
							<span>DECLINE OFFER</span>
							<div>
								<Icon icon='close' size='8' />
							</div>
						</button>
						{nextStep ? (
							<NextButton
								setStep={setStep}
								onClickFn={() => {
									setCalculateOfferCostStatus(false);
									nextStep &&
										setOfferData((prev) => ({
											...prev,
											stepIndex: nextStep,
											detailsStepCheck: false
										}));
								}}
							/>
						) : (
							<Button btnTo='/' customType='black'>
								homepage
							</Button>
						)}
					</>
				)}
				{isMobile && (
					<div className={styles.mobileBtns}>
						<Button
							customType='outline'
							iconName='cross'
							iconPosition='right'
							onClick={openDeclineOfferPopup}>
							DECLINE OFFER
						</Button>
						{nextStep ? (
							<NextButton
								setStep={setStep}
								onClickFn={() => {
									setCalculateOfferCostStatus(false);
									nextStep &&
										setOfferData((prev) => ({
											...prev,
											stepIndex: nextStep,
											detailsStepCheck: false
										}));
								}}
							/>
						) : (
							<Button btnTo='/' customType='black'>
								homepage
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
