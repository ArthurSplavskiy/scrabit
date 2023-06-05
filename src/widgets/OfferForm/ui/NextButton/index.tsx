import { Button } from '@/shared/ui/Button';

interface Props {
	onClickFn?: (...args: any[]) => void;
	loading?: boolean;
}

export const NextButton: React.FC<Props> = ({ onClickFn, loading }) => {
	return (
		<Button
			customType='black'
			iconName='arrow'
			iconPosition='right'
			loading={loading}
			onClick={() => {
				onClickFn?.();
			}}>
			next
		</Button>
	);
};
