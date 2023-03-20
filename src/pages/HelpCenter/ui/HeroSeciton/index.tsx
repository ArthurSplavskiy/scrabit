import { HeroAnimationCar } from '@/entities/HeroAnimationCar';
import { FC } from 'react';
import styles from './index.module.scss';

interface Props {
	title: string;
	message: string;
}

export const HeroSection: FC<Props> = ({ title, message }) => {
	return (
		<div className={styles.hero}>
			<div className='container'>
				<div className={styles.inner}>
					<h2 className='text-64-40'>{title}</h2>
					<HeroAnimationCar text={message} />
				</div>
			</div>
		</div>
	);
};
