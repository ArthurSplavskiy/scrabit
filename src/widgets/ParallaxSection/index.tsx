import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { MovingTiters } from '@/shared/ui/MovingTiters/MovingTiters';
import { FC } from 'react';
import styles from './ParallaxSection.module.scss';
import bg from './bg.png';
import classNames from 'classnames';
gsap.registerPlugin(ScrollTrigger);

export const ParallaxSection: FC = () => {
	return (
		<div className={styles.section}>
			<MovingTiters text='scrabit' />
			<div className={classNames('s-full-image-ibg', styles.img)}>
				<img src={bg} alt='bg' />
			</div>
		</div>
	);
};
