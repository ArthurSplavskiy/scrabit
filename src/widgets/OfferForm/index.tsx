import { OfferStepContent } from './Content';
import { OfferStepSidebar } from './Sidebar';
import { StepButton } from './ui/StepButton';
import { useEffect, useState } from 'react';
import { VehicleForm } from './forms/VehicleForm';
import { PhotosForm } from './forms/PhotosForm';
import { ISidebarStep } from './interfaces';
import { IStep, IStepObj, initialStep } from './initialStep';
import { IOfferData, initialOfferData } from './initialOfferData';
import { DetailsForm } from './forms/DetailsForm';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import styles from './index.module.scss';
import { TitleForm } from './forms/TitleForm';
import { LocationForm } from './forms/LocationForm';
import { PaymentForm } from './forms/PaymentForm';
import { FinalInfo } from './ui/FinalInfo';
import classNames from 'classnames';

export const OfferStepForm = () => {
	const [step, setStep] = useState<IStep>(initialStep);
	const [offerData, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);

	useEffect(() => {
		setStep({
			count: offerData.stepIndex || 0,
			steps: [
				{
					id: 0,
					name: 'Vehicle',
					title: 'Share a bit more about your car',
					subtitle: '',
					optional: false,
					form: <VehicleForm setStep={setStep} />
				},
				{
					id: 1,
					name: 'Photos',
					title: 'Photos will increase the offer’s price',
					subtitle:
						'This step is optional. If you can’t take a photo at this moment, check the checkbox',
					optional: true,
					form: <PhotosForm setStep={setStep} />
				},
				{
					id: 2,
					name: 'Details',
					title: 'More details about your car',
					subtitle: '',
					optional: false,
					form: <DetailsForm setStep={setStep} />
				},
				{
					id: 3,
					name: 'Title specifics',
					title: 'Title specifics',
					subtitle: 'Make sure everything matches the title of your car',
					optional: false,
					form: <TitleForm setStep={setStep} />
				},
				{
					id: 4,
					name: 'Pick up location',
					title: 'Pick up location',
					subtitle: 'Make sure all of this info matches your vehicle title',
					optional: false,
					form: <LocationForm setStep={setStep} />
				},
				{
					id: 5,
					name: 'Payment details',
					title: 'Payment details',
					subtitle: 'Who should receive the check? Is it you or someone else?',
					optional: false,
					form: <PaymentForm setStep={setStep} />
				}
			]
		});
	}, [offerData]);

	const currentStep: IStepObj = step.steps[step.count];

	const end = step.count > 2 ? 100 : 3;

	const sidebarSteps: ISidebarStep[] = step.steps.slice(0, end).map((item) => {
		return {
			id: item.id,
			btn: (
				<StepButton
					name={item.name}
					itemIndex={item.id}
					activeIndex={step.count}
					setStep={setStep}
				/>
			)
		};
	});

	useEffect(() => {
		setOfferData((prev) => ({
			...initialOfferData,
			...prev
		}));
	}, []);

	// transitions
	//

	return (
		<div className={styles.offerForm}>
			<div className='container'>
				<div className={styles.offerFormWrapper}>
					<OfferStepSidebar sidebarSteps={sidebarSteps} stepCount={step.count} setStep={setStep} />
					{!offerData.isDone ? <OfferStepContent currentStep={currentStep} /> : null}
					{offerData.isDone ? (
						<OfferStepContent
							currentStep={{
								id: 6,
								name: 'offer details',
								title: 'offer details',
								subtitle: 'Here are all the detailsto help you add the finishing touch',
								optional: false,
								form: <FinalInfo />
							}}
						/>
					) : null}
					{offerData.isDone ? (
						<>
							<div />
							<div>
								<p className={classNames(styles.cancelOffer, 'text-16-14')}>
									Changed your mind about this deal? You can <a href='#'>cancel this offer</a> at
									any time.
								</p>
							</div>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
};
