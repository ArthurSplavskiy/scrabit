import Lottie from 'react-lottie-player';
import carLottie from './pop-up.json';
import styles from './index.module.scss';
import { Button } from '@/shared/ui/Button';

export const PartnershipFormPopup = () => {
	return (
		<div className={styles.block}>
			<div className={styles.car}>
				<Lottie animationData={carLottie} loop={false} play />
			</div>
			<Button btnTo='/' className={styles.btn}>
				homepage
			</Button>
		</div>
	);
};
