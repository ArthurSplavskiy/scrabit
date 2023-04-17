import classNames from 'classnames';
import styles from './index.module.scss';
import { FC } from 'react';
import { Icon } from '@/shared/ui/Icon/Icon';
import { IStep } from '../../initialStep';
import { IOfferData, initialOfferData } from '../../initialOfferData';
import useSessionStorage from '@/shared/hooks/useSessionStorage';

interface Props {
	name: string;
	itemIndex: number;
	activeIndex: number;
	setStep: (...args: any[]) => void;
}

export const StepButton: FC<Props> = ({ name, itemIndex, activeIndex, setStep }) => {
	const [offerData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	return (
		<button
			type='button'
			className={classNames(styles.btn, {
				[styles.active]: itemIndex <= activeIndex && itemIndex <= offerData.stepIndex,
				[styles.disable]: itemIndex > activeIndex && itemIndex > offerData.stepIndex
			})}
			onClick={() => {
				setStep((prev: IStep) => ({
					...prev,
					count: itemIndex
				}));
			}}>
			<div className={styles.checker}>
				{itemIndex <= activeIndex && itemIndex <= offerData.stepIndex && (
					<Icon icon='check' size={'12'} />
				)}
			</div>
			<span>{name}</span>
		</button>
	);
};
