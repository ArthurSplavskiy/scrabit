import { FC } from 'react';
import { IStepObj } from '.';
import { VehicleForm } from './forms/VehicleForm';
import classNames from 'classnames';
import styles from './index.module.scss';

interface Props {
	currentStep: IStepObj;
}

export const OfferStepContent: FC<Props> = ({ currentStep }) => {
	return (
		<div className={styles.offerFormContent}>
			<div className={styles.offerFormHead}>
				<h3 className={styles.offerFormHeadStep}>{currentStep.name}</h3>
				{currentStep.optional && <span className={styles.offerFormHeadOptional}>optional</span>}
				<h2 className={styles.offerFormHeadTitle}>Photos will increase the offer’s price</h2>
				{currentStep.subtitle && (
					<p className={classNames(styles.offerFormHeadText, 'text-16-14')}>
						This step is optional. If you can’t take a photo at this moment, check the checkbox
					</p>
				)}
			</div>
			<div className={styles.offerFormContentBody}>
				<VehicleForm />
			</div>
		</div>
	);
};
