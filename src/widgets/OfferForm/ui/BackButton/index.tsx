import { Button } from '@/shared/ui/Button';
import { IStep } from '../../initialStep';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import { IOfferData, initialOfferData } from '../../initialOfferData';

interface Props {
	setStep: (...args: any[]) => void;
}

export const BackButton: React.FC<Props> = ({ setStep }) => {
	const [, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	return (
		<Button
			customType='outline'
			iconName='arrow'
			iconPosition='left'
			onClick={() => {
				setStep((prev: IStep) => ({
					...prev,
					count: prev.count - 1
				}));
				setOfferData((prev) => ({
					...prev,
					stepIndex: prev.stepIndex - 1
				}));
			}}>
			back
		</Button>
	);
};
