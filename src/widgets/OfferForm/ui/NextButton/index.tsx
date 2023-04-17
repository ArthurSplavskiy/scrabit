import { Button } from '@/shared/ui/Button';
import { IStep } from '../../initialStep';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import { IOfferData, initialOfferData } from '../../initialOfferData';

interface Props {
	setStep?: (...args: any[]) => void;
	onClickFn?: (...args: any[]) => void;
}

export const NextButton: React.FC<Props> = ({ setStep, onClickFn }) => {
	const [, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	return (
		<Button
			customType='black'
			iconName='arrow'
			iconPosition='right'
			onClick={() => {
				setStep?.((prev: IStep) => ({
					...prev,
					count: prev.count + 1
				}));
				setOfferData((prev) => ({
					...prev,
					stepIndex: setStep ? prev.stepIndex + 1 : prev.stepIndex
				}));
				onClickFn?.();
			}}>
			next
		</Button>
	);
};
