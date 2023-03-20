import { MovingTiters } from '@/shared/ui/MovingTiters/MovingTiters';
import { AboutSection } from '@/widgets/AboutSection';
import { HeroSectionSellCar } from '../../widgets/HeroSectionSellCar';
import {
	usePageData,
	usePageAbout,
	withContext,
	usePageReview,
	usePageHowItWork
} from './SellMyCarPageContext';
import { ReviewSection } from '@/widgets/ReviewSection';
import { MessageSection } from '@/widgets/MessageSection';
import { Preloader } from '@/widgets/Preloader';
import { HowItWorkSection } from '@/widgets/HowItWorkSection';
import { SoldCarSection } from '@/widgets/SoldCarSection';

function SellMyCarPage() {
	const { data, isLoading } = usePageData();
	const { data: aboutData } = usePageAbout();
	const { data: reviewData } = usePageReview();
	const { data: howItWorkData } = usePageHowItWork();

	return (
		<>
			<Preloader hide={!isLoading} />
			{data && (
				<HeroSectionSellCar
					title={data?.hero_title}
					subtitle={data?.hero_subtitle}
					image={data?.hero_image}
				/>
			)}
			<MovingTiters size='small' text='read more' />
			<AboutSection data={aboutData} />
			<SoldCarSection />
			<HowItWorkSection data={howItWorkData} />
			<ReviewSection data={reviewData} />
			<MessageSection
				title={'Have questions?'}
				subtitle={'visit the help center'}
				message={'if you have any questions you can always contacts us'}
				btnText={'Visit help center'}
				btnSlug={'/help-center'}
			/>
		</>
	);
}

export default withContext(SellMyCarPage);
