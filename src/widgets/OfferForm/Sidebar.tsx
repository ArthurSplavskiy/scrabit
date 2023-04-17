import classNames from 'classnames';
import styles from './index.module.scss';
import { FC, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { Icon } from '@/shared/ui/Icon/Icon';
import { ISidebarStep } from './interfaces';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import { IOfferData, initialOfferData } from './initialOfferData';
import { initialStep } from './initialStep';

interface Props {
	sidebarSteps: ISidebarStep[];
	stepCount: number;
	setStep: (...args: any[]) => void;
}

export const OfferStepSidebar: FC<Props> = ({ sidebarSteps, stepCount, setStep }) => {
	const { isSmallMobile } = useDevice();
	const [showSteps, setShowSteps] = useState(false);
	const [, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);

	if (isSmallMobile) {
		return (
			<>
				<ul
					className={classNames(styles.offerFormSidebarStepsMobile, {
						[styles.offerFormSidebarStepsMobileShow]: showSteps,
						[styles.stayBottom]: sidebarSteps.length > 3
					})}>
					{sidebarSteps.map((step: ISidebarStep, idx: number) => (
						<li key={step.id} className={styles.sidebarStep}>
							{step.btn}
							{isSmallMobile && idx === 0 ? (
								<button onClick={() => setShowSteps(false)}>
									<Icon icon='setting-list' />
								</button>
							) : null}
						</li>
					))}
				</ul>
				<ul
					className={classNames(styles.offerFormSidebarMobileActiveStep, {
						[styles.offerFormSidebarMobileActiveStepShow]: !showSteps,
						[styles.stayBottom]: sidebarSteps.length > 3
					})}>
					<li className={styles.sidebarStep}>
						{sidebarSteps[stepCount]?.btn}
						<button onClick={() => setShowSteps(true)}>
							<Icon icon='setting-list' />
						</button>
					</li>
				</ul>
				{sidebarSteps.length < 3 && (
					<div className={styles.offerFormSidebarMobileStartOver}>
						<Button
							className={styles.sidebarStartOver}
							customType={'text-underline'}
							onClick={() => {
								setOfferData(initialOfferData);
								setStep(initialStep);
							}}>
							start over
						</Button>
					</div>
				)}
			</>
		);
	}

	return (
		<div className={styles.offerFormSidebar}>
			<div className={styles.offerFormHead}>
				<h2 className={styles.offerFormHeadTitle}>Get your offer</h2>
				<p className={classNames(styles.offerFormHeadText, 'text-16-14')}>
					We’ll keep track on your answers over hear. You can jump back to a previous questions
					anytime
				</p>
			</div>
			<div className={styles.offerFormSidebarBody}>
				<div className={styles.offerFormSidebarSteps}>
					<ul>
						{sidebarSteps.map((step: ISidebarStep) => (
							<li key={step.id} className={styles.sidebarStep}>
								{step.btn}
							</li>
						))}
					</ul>
					{stepCount < 3 && (
						<Button
							className={styles.sidebarStartOver}
							width={'fullWidth'}
							color={'green-20'}
							onClick={() => {
								setOfferData(initialOfferData);
								setStep(initialStep);
							}}>
							start over
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};
