import { FC } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import { IStepObj } from './initialStep';
import useSessionStorage from '@/shared/hooks/useSessionStorage';

interface Props {
	currentStep: IStepObj;
}

export const OfferStepContent: FC<Props> = ({ currentStep }) => {
	const [offerPriceScreen] = useSessionStorage<boolean>('offerPriceScreen', false);
	const [calculateOfferCostStatus] = useSessionStorage<boolean>('calculateOfferCostStatus', false);

	return (
		<div className={styles.offerFormContent}>
			{!offerPriceScreen && !calculateOfferCostStatus && (
				<div className={styles.offerFormHead}>
					{currentStep.name !== currentStep.title && (
						<h3 className={styles.offerFormHeadStep}>{currentStep.name}</h3>
					)}
					{currentStep.optional && <span className={styles.offerFormHeadOptional}>optional</span>}
					{currentStep.title && <h2 className={styles.offerFormHeadTitle}>{currentStep.title}</h2>}
					{currentStep.subtitle && (
						<p className={classNames(styles.offerFormHeadText, 'text-16-14')}>
							{currentStep.subtitle}
						</p>
					)}
				</div>
			)}
			<div
				className={styles.offerFormContentBody}
				style={{ background: calculateOfferCostStatus ? '#EDFEEF' : '#FFFFFF' }}>
				{currentStep.form}
			</div>
		</div>
	);
};
