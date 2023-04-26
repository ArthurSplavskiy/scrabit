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
import { CarInfo } from './ui/CarInfo';
import { useNavigate } from 'react-router-dom';
import { useCommon } from '@/app/context/Common/CommonContext';
import Cookies from 'js-cookie';
import { CallCard } from './ui/CallCard';

interface Props {
	sidebarSteps: ISidebarStep[];
	stepCount: number;
	setStep: (...args: any[]) => void;
}

export const OfferStepSidebar: FC<Props> = ({ sidebarSteps, stepCount, setStep }) => {
	const { isSmallMobile } = useDevice();
	const { setFocusFirstOfferFormField } = useCommon();
	const [showSteps, setShowSteps] = useState(false);
	const [offerData, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const navigate = useNavigate();

	const redirectToFirstForm = () => {
		navigate('/');
		Cookies.set('first-offer-form-is-filled', 'false');
		setFocusFirstOfferFormField(true);
	};

	if (isSmallMobile) {
		return (
			<>
				{stepCount > 2 || offerData.detailsStepCheck === true ? (
					<CarInfo
						year={offerData.carForm.year}
						car={`${offerData.carForm.make} ${offerData.carForm.model}`}
						place={'No data'}
						offer_id='10058595'
					/>
				) : null}
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
				{stepCount < 3 && (
					<div className={styles.offerFormSidebarMobileStartOver}>
						<Button
							className={classNames(styles.sidebarStartOver)}
							customType={'text-underline'}
							disabled={stepCount === 0}
							onClick={() => {
								setOfferData(initialOfferData);
								setStep(initialStep);
								redirectToFirstForm();
							}}>
							start over
						</Button>
					</div>
				)}
				{offerData.isDone && <CallCard />}
			</>
		);
	}

	return (
		<div className={styles.offerFormSidebarWrapper}>
			<div className={styles.offerFormSidebar}>
				{stepCount > 2 || offerData.detailsStepCheck === true ? (
					<CarInfo
						year={offerData.carForm.year}
						car={`${offerData.carForm.make} ${offerData.carForm.model}`}
						place={'No data'}
						offer_id='10058595'
					/>
				) : (
					<div className={styles.offerFormHead}>
						<h2 className={styles.offerFormHeadTitle}>Get your offer</h2>
						<p className={classNames(styles.offerFormHeadText, 'text-16-14')}>
							We’ll keep track on your answers over hear. You can jump back to a previous questions
							anytime
						</p>
					</div>
				)}
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
								disabled={stepCount === 0}
								onClick={() => {
									setOfferData(initialOfferData);
									setStep(initialStep);
									redirectToFirstForm();
								}}>
								start over
							</Button>
						)}
					</div>
				</div>
			</div>
			{offerData.isDone && <CallCard />}
		</div>
	);
};
