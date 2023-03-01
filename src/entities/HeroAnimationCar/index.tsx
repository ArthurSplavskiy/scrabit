import { TypedText } from '@/shared/ui/TypedText/TypedText';
import { FC } from 'react';
import styles from './HeroAnimationCar.module.scss';
import car from './car.png';
import carLeft from './car-left.png';
import classNames from 'classnames';

interface Props {
	text?: string;
	direct?: 'left';
}

export const HeroAnimationCar: FC<Props> = ({ text, direct }) => {
	return (
		<div
			className={classNames(styles.HeroAnimationCar, {
				[styles.HeroAnimationCarLeft]: direct === 'left'
			})}>
			{direct === 'left' && <img src={carLeft} alt='car' />}
			<div
				className={classNames(styles.Typical, {
					'text-32-14': direct !== 'left',
					'text-18-10': direct === 'left'
				})}>
				{text}
				{/* <TypedText>{text || ''}</TypedText> */}
				<div className={styles.TriangleOuter}></div>
				<div className={styles.TriangleInner}></div>
			</div>
			{direct !== 'left' && <img src={car} alt='car' />}
		</div>
	);
};
