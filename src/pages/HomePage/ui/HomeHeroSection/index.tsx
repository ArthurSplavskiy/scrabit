import { HeroAnimationCar } from '@/entities/HeroAnimationCar';
import { OfferForm } from '@/entities/OfferForm';
import { useHomePageData } from '../../HomePageContext';
import styles from './HomeHeroSection.module.scss';

export const HomeHeroSection = () => {
	const { data } = useHomePageData();
	return (
		<section className={styles.section}>
			<div className='container'>
				<div className={styles.sectionWrapper}>
					<OfferForm />
					<div className={styles.sectionHead}>
						<h1>{data?.hero_title}</h1>
						<p className='text-18-14'>{data?.hero_subtitle}</p>
						<HeroAnimationCar text={data?.hero_message} />
					</div>
				</div>
			</div>
		</section>
	);
};
