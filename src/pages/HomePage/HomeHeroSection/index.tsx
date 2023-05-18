import { useCommon } from '@/app/context/Common/CommonContext';
import { OfferForm } from '@/entities/HomeOfferForm';
import Lottie from 'react-lottie-player';
import { useHomePageData } from '../HomePageContext';
import styles from './HomeHeroSection.module.scss';
import speechbubble from './speechbubble.json';

export const HomeHeroSection = () => {
	const { data } = useHomePageData();
	const { pageIsLoaded, preloaderIsHide } = useCommon();
	return (
		<section className={styles.section}>
			<div className='container'>
				<div className={styles.sectionWrapper}>
					<OfferForm />
					<div className={styles.sectionHead} data-fade-in-right>
						<h1>{data?.hero_title}</h1>
						<p className='text-18-14'>{data?.hero_subtitle}</p>
						{/* <HeroAnimationCar text={data?.hero_message} /> */}
						<Lottie
							animationData={speechbubble}
							play={pageIsLoaded && preloaderIsHide}
							loop={false}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};
