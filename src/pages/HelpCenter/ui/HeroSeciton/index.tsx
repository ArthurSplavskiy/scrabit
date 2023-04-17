import { FC } from 'react';
import Lottie from 'react-lottie-player';
import styles from './index.module.scss';

interface Props {
	title: string;
	lottie: any;
}

export const HeroSection: FC<Props> = ({ title, lottie }) => {
	return (
		<div className={styles.hero}>
			<div className='container'>
				<div className={styles.inner}>
					<h2 className='text-64-40'>{title}</h2>
					<div className={styles.speechBubble}>
						<Lottie animationData={lottie} loop={false} play />
					</div>
				</div>
			</div>
		</div>
	);
};
