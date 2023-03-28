import { TypedText } from '@/shared/ui/TypedText/TypedText';
import { FC } from 'react';
import styles from './HeroAnimationCar.module.scss';
import car from './car.png';
import carLottie from './car.json';
import classNames from 'classnames';
import Lottie from 'react-lottie';

interface Props {
	text?: string;
	direct?: 'left';
}

export const HeroAnimationCar: FC<Props> = ({ text, direct }) => {
	const options = {
		loop: true,
		autoplay: true,
		animationData: carLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};
	return (
		<div
			className={classNames(styles.HeroAnimationCar, {
				[styles.HeroAnimationCarLeft]: direct === 'left'
			})}>
			{direct === 'left' && (
				<div className={styles.BlinkCar}>
					<Lottie options={options} isClickToPauseDisabled={true} />
				</div>
			)}
			<div
				className={classNames(styles.Typical, {
					'text-32-14': direct !== 'left',
					'text-18-10': direct === 'left',
					[styles.TypicalLeft]: direct === 'left'
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
