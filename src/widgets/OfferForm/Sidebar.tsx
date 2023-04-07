import classNames from 'classnames';
import styles from './index.module.scss';
import { FC, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { Icon } from '@/shared/ui/Icon/Icon';

interface Props {
	sidebarSteps: any;
	stepCount: number;
}

export const OfferStepSidebar: FC<Props> = ({ sidebarSteps, stepCount }) => {
	const { isSmallMobile } = useDevice();
	const [showSteps, setShowSteps] = useState(false);

	if (isSmallMobile) {
		return (
			<>
				<ul
					className={classNames(styles.offerFormSidebarStepsMobile, {
						[styles.offerFormSidebarStepsMobileShow]: showSteps
					})}>
					{sidebarSteps.map((step: any, idx: number) => (
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
						[styles.offerFormSidebarMobileActiveStepShow]: !showSteps
					})}>
					<li className={styles.sidebarStep}>
						{sidebarSteps[stepCount].btn}
						<button onClick={() => setShowSteps(true)}>
							<Icon icon='setting-list' />
						</button>
					</li>
				</ul>
				<div className={styles.offerFormSidebarMobileStartOver}>
					<Button className={styles.sidebarStartOver} customType={'text-underline'}>
						start over
					</Button>
				</div>
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
						{sidebarSteps.map((step: any) => (
							<li key={step.id} className={styles.sidebarStep}>
								{step.btn}
							</li>
						))}
					</ul>
					<Button className={styles.sidebarStartOver} width={'fullWidth'} color={'green-20'}>
						start over
					</Button>
				</div>
			</div>
		</div>
	);
};
