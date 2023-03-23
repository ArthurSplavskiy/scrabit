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
import { HowItWorkSection } from '@/widgets/HowItWorkSection';
import { SoldCarSection } from '@/widgets/SoldCarSection';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useEffect } from 'react';

function SellMyCarPage() {
	const { data, isLoading } = usePageData();
	const { data: aboutData } = usePageAbout();
	const { data: reviewData } = usePageReview();
	const { data: howItWorkData } = usePageHowItWork();
	const { setPageIsLoaded } = useCommon();
	useEffect(() => {
		if (!isLoading) {
			setPageIsLoaded(true);
		}
	}, [isLoading]);
	return (
		<>
			{data && (
				<HeroSectionSellCar
					title={data?.hero_title}
					subtitle={data?.hero_subtitle}
					image={data?.hero_image}
				/>
			)}
			<MovingTiters size='small' text='read more' />
			<AboutSection data={aboutData} />
			<HowItWorkSection data={howItWorkData} />
			<SoldCarSection />
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