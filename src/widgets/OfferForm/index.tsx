import { OfferStepContent } from './Content';
import { OfferStepSidebar } from './Sidebar';
import { StepButton } from './ui/StepButton';
import { useState } from 'react';
import styles from './index.module.scss';

export interface IStepObj {
	id: number;
	name: string;
	title: string;
	subtitle: string;
	optional: boolean;
}
export interface IStep {
	count: number;
	steps: IStepObj[];
}

export const OfferStepForm = () => {
	const [step, setStep] = useState<IStep>({
		count: 0,
		steps: [
			{
				id: 0,
				name: 'Vehicle',
				title: 'Share a bit more about your car',
				subtitle: '',
				optional: false
			},
			{
				id: 1,
				name: 'Photos',
				title: 'Photos will increase the offer’s price',
				subtitle:
					'This step is optional. If you can’t take a photo at this moment, check the checkbox',
				optional: true
			},
			{
				id: 2,
				name: 'Details',
				title: 'More details about your car',
				subtitle: '',
				optional: false
			}
		]
	});

	const currentStep: IStepObj = step.steps[step.count];

	const sidebarSteps = step.steps.map((step) => {
		return {
			id: step.id,
			btn: <StepButton name={step.name} active={false} disable={true} />
		};
	});

	return (
		<div className={styles.offerForm}>
			<div className='container'>
				<div className={styles.offerFormWrapper}>
					<OfferStepSidebar sidebarSteps={sidebarSteps} stepCount={step.count} />
					<OfferStepContent currentStep={currentStep} />
				</div>
			</div>
		</div>
	);
};
