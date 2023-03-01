import { MovingTiters } from '@/shared/ui/MovingTiters/MovingTiters';
import { AboutSection } from '@/widgets/AboutSection';
import { HomeHeroSection } from './components/HomeHeroSection';
import { HowItWorkSection } from '@/widgets/HowItWorkSection';
import { useHomeAbout, useHomeReview, useHowItWork, withHomeContext } from './HomePageContext';
import { ReviewSection } from '@/widgets/ReviewSection';
import { ParallaxSection } from '@/widgets/ParallaxSection';

function HomePage() {
	const { data: homeAboutData } = useHomeAbout();
	const { data: homeHowItWorkData } = useHowItWork();
	const { data: homeReviewData } = useHomeReview();
	return (
		<>
			<HomeHeroSection />
			<MovingTiters size='small' text='read more' />
			<AboutSection data={homeAboutData} />
			<HowItWorkSection data={homeHowItWorkData} />
			<ReviewSection data={homeReviewData} />
			<ParallaxSection />
		</>
	);
}

export default withHomeContext(HomePage);
