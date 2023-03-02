import { MovingTiters } from '@/shared/ui/MovingTiters/MovingTiters';
import { AboutSection } from '@/widgets/AboutSection';
import { HomeHeroSection } from './components/HomeHeroSection';
import { HowItWorkSection } from '@/widgets/HowItWorkSection';
import {
	useHomeAbout,
	useHomeBlogposts,
	useHomeFaq,
	useHomeReview,
	useHowItWork,
	withHomeContext
} from './HomePageContext';
import { ReviewSection } from '@/widgets/ReviewSection';
import { ParallaxSection } from '@/widgets/ParallaxSection';
import { FaqSection } from '@/widgets/FaqSection';
import { MessageSection } from '@/widgets/MessageSection';
import { BlogPostSlider } from '@/widgets/BlogPostSlider';

function HomePage() {
	const { data: homeAboutData } = useHomeAbout();
	const { data: homeHowItWorkData } = useHowItWork();
	const { data: homeReviewData } = useHomeReview();
	const { data: homeFaqData } = useHomeFaq();
	const { data: homeBlogPostData } = useHomeBlogposts();
	return (
		<>
			<HomeHeroSection />
			<MovingTiters size='small' text='read more' />
			<AboutSection data={homeAboutData} />
			<HowItWorkSection data={homeHowItWorkData} />
			<ReviewSection data={homeReviewData} />
			<ParallaxSection />
			<MessageSection
				title={'Let those grumpy old wheels go'}
				subtitle={'you’ll get your offer  faster than it takes to buckle up'}
				message={'how to sell a car quickly'}
				btnText={'get an instant offer'}
				btnSlug={'/help-center'}
			/>
			<FaqSection data={homeFaqData} />
			<BlogPostSlider data={homeBlogPostData} />
			<MessageSection
				title={'want to learn more'}
				subtitle={'visit the help center'}
				message={'if you have any questions you can always contacts us'}
				btnText={'more info'}
				btnSlug={'/help-center'}
			/>
		</>
	);
}

export default withHomeContext(HomePage);
