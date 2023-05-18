import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';
import styles from './index.module.scss';

type Props = {
	threshold?: number;
	children: string | JSX.Element | JSX.Element[];
};

export const setStaggerIndex = (idx: number): number => {
	// console.log(setStaggerIndex(0)); // поверне 0.5
	// console.log(setStaggerIndex(5)); // поверне 0.875
	// console.log(setStaggerIndex(9)); // поверне 1
	// console.log(setStaggerIndex(10)); // поверне null

	if (idx >= 0 && idx <= 9) {
		return 0.5 + idx / 20;
	}
	return 0.5; // якщо число не від 0 до 9, то повернути null
};

const AnimateInView = ({ children, threshold = 0.9 }: Props) => {
	const { ref, inView } = useInView({
		threshold,
		triggerOnce: true
	});

	return (
		<div
			ref={ref}
			className={classNames(styles.initial, {
				[styles.show]: inView
			})}>
			{children}
		</div>
	);
};

export default AnimateInView;
