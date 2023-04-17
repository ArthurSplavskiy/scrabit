import { Icon } from '@/shared/ui/Icon/Icon';
import styles from './CalcInfo.module.scss';
import { NextButton } from '../NextButton';
import { FC } from 'react';
import classNames from 'classnames';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { Button } from '@/shared/ui/Button';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import { IOfferData, initialOfferData } from '../../initialOfferData';

interface Props {
	title: string;
	price: string;
	message?: string;
	footerText: { title: string; text: string }[];
	setStep?: (...args: any[]) => void;
	nextStep?: number;
	isDone?: true;
}

export const CalcInfo: FC<Props> = ({
	message,
	price,
	title,
	footerText,
	setStep,
	nextStep,
	isDone
}) => {
	const { isSmallMobile } = useDevice();
	const [, setOfferPriceScreen] = useSessionStorage<boolean>('offerPriceScreen', true);
	const [, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	return (
		<>
			<div className={styles.block}>
				<div className={styles.top}>
					<div className={styles.head}>
						<p className={classNames(styles.title, 'text-24-14')}>{title}</p>
						{!isSmallMobile && (
							<button className={styles.decline}>
								<span>DECLINE OFFER</span>
								<div>
									<Icon icon='close' size='8' />
								</div>
							</button>
						)}
					</div>
					<h1 className={styles.price}>{price}</h1>
					{message && <p className={classNames(styles.message, 'text-16-14')}>{message}</p>}
					{!isSmallMobile && (
						<div className={styles.btn}>
							<NextButton
								setStep={setStep}
								onClickFn={() => {
									setOfferPriceScreen(false);
									isDone && setOfferData((prev) => ({ ...prev, isDone: true }));
									console.log('isDone', isDone);
									nextStep &&
										setOfferData((prev) => ({
											...prev,
											stepIndex: nextStep
										}));
								}}
							/>
						</div>
					)}
				</div>
				<div className={styles.bottom}>
					{footerText.map((item, idx) => (
						<div key={idx} className={styles.bottomBlock}>
							<h3>{item.title}</h3>
							<p className='text-14'>{item.text}</p>
						</div>
					))}
				</div>
			</div>
			{isSmallMobile && (
				<div className={styles.mobileBtns}>
					<Button customType='outline' iconName='cross' iconPosition='right'>
						DECLINE OFFER
					</Button>
					<NextButton
						setStep={setStep}
						onClickFn={() => {
							setOfferPriceScreen(false);
							isDone && setOfferData((prev) => ({ ...prev, isDone: true }));
							nextStep &&
								setOfferData((prev) => ({
									...prev,
									stepIndex: nextStep
								}));
						}}
					/>
				</div>
			)}
		</>
	);
};
