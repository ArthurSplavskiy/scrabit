import { useCommon } from '@/app/context/Common/CommonContext';
import { OfferForm } from '@/entities/OfferForm';
import Lottie from 'react-lottie';
import { useHomePageData } from '../HomePageContext';
import styles from './HomeHeroSection.module.scss';
import speechbubble from './speechbubble.json';

export const HomeHeroSection = () => {
	const { data } = useHomePageData();
	const { pageIsLoaded, preloaderIsHide } = useCommon();
	const options = {
		loop: false,
		autoplay: false,
		animationData: speechbubble,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};
	return (
		<section className={styles.section}>
			<div className='container'>
				<div className={styles.sectionWrapper}>
					<OfferForm />
					<div className={styles.sectionHead}>
						<h1>{data?.hero_title}</h1>
						<p className='text-18-14'>{data?.hero_subtitle}</p>
						{/* <HeroAnimationCar text={data?.hero_message} /> */}
						<Lottie
							options={options}
							isClickToPauseDisabled={true}
							isPaused={!(pageIsLoaded && preloaderIsHide)}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};