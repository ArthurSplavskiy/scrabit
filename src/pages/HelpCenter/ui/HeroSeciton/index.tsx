import { FC } from 'react';
import Lottie from 'react-lottie';
import styles from './index.module.scss';

interface Props {
	title: string;
	lottie: any;
}

export const HeroSection: FC<Props> = ({ title, lottie }) => {
	const options = {
		loop: false,
		autoplay: true,
		animationData: lottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};
	return (
		<div className={styles.hero}>
			<div className='container'>
				<div className={styles.inner}>
					<h2 className='text-64-40'>{title}</h2>
					<div className={styles.speechBubble}>
						<Lottie options={options} isClickToPauseDisabled={true} />
					</div>
				</div>
			</div>
		</div>
	);
};
