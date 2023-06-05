import { MovingTiters } from '@/shared/ui/MovingTiters/MovingTiters';
import { AboutSection } from '@/widgets/AboutSection';
import { HeroSectionSellCar } from '@/widgets/HeroSectionSellCar';
import { ReviewSection } from '@/widgets/ReviewSection';
import { MessageSection } from '@/widgets/MessageSection';
import { SoldCarSection } from '@/widgets/SoldCarSection';
import { useQuery } from 'react-query';
import { queryKeys } from '@/app/queryClient/queryKeys';
import { FaqSection } from '@/widgets/FaqSection';
import { ParallaxSection } from '@/widgets/ParallaxSection';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useLayoutEffect } from 'react';
import api from '../api';
import { Preloader } from '@/widgets/Preloader';

function CarBrandPage() {
	const { data, isLoading } = useQuery(queryKeys.carPage, api.getCarPageData);
	const { setPageIsLoaded } = useCommon();

	useLayoutEffect(() => {
		if (!isLoading) {
			setPageIsLoaded(true);
		}
		return () => {
			setPageIsLoaded(false);
		};
	}, [isLoading]);

	return (
		<>
			<Preloader />
			{data && (
				<HeroSectionSellCar
					title={data?.hero_title}
					subtitle={data?.hero_subtitle}
					image={data?.hero_image}
				/>
			)}
			<MovingTiters size='small' text='read more' />
			<AboutSection data={data?.about_section} />
			<SoldCarSection data={data?.sold_cars} />
			<ReviewSection data={data?.review_section} />
			<ParallaxSection />
			<FaqSection data={data?.faq_section} />
			<MessageSection
				title={'Scrabit’s buying'}
				subtitle={'we’ll give your used car another chance'}
				message={'if you have any questions you can always contacts us'}
				btnText={'Visit help center'}
				btnSlug={'/help-center'}
				bg='green'
			/>
		</>
	);
}

export default CarBrandPage;
