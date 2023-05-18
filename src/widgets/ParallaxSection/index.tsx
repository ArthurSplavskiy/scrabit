import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { MovingTiters } from '@/shared/ui/MovingTiters/MovingTiters';
import { FC } from 'react';
import styles from './ParallaxSection.module.scss';
import bg from './bg.png';
import Image from '@/shared/ui/Image';
gsap.registerPlugin(ScrollTrigger);

export const ParallaxSection: FC = () => {
	return (
		<div className={styles.section}>
			<MovingTiters text='scrabit' />
			<Image lazy scaleInScroll src={bg} className={styles.img} />
		</div>
	);
};
