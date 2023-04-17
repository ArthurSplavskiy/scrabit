import { Button } from '@/shared/ui/Button';
import { IStep } from '../../initialStep';

interface Props {
	setStep: (...args: any[]) => void;
}

export const BackButton: React.FC<Props> = ({ setStep }) => {
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
			}}>
			back
		</Button>
	);
};
