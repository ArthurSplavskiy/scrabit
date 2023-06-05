import { MovingTiters } from '@/shared/ui/MovingTiters/MovingTiters';
import { AboutSection } from '@/widgets/AboutSection';
import { HeroSectionSellCar } from '@/widgets/HeroSectionSellCar';
import { ReviewSection } from '@/widgets/ReviewSection';
import { MessageSection } from '@/widgets/MessageSection';
import { HowItWorkSection } from '@/widgets/HowItWorkSection';
import { SoldCarSection } from '@/widgets/SoldCarSection';
import { useQuery } from 'react-query';
import { queryKeys } from '@/app/queryClient/queryKeys';
import api from '../SellMyCar/api';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useLayoutEffect } from 'react';
import { Preloader } from '@/widgets/Preloader';

function CashForJunkPage() {
	const { data, isLoading } = useQuery(queryKeys.cashForJunkCarPage, api.getCashForJunkCarPageData);
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
			{data?.hero_title && (
				<HeroSectionSellCar
					title={data?.hero_title}
					subtitle={data?.hero_subtitle}
					image={data?.hero_image}
				/>
			)}
			<MovingTiters size='small' text='read more' />
			<AboutSection data={data?.about_section} />
			<HowItWorkSection data={data?.how_it_work_section} />
			<SoldCarSection data={data?.sold_cars} />
			<ReviewSection data={data?.review_section} />
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

export default CashForJunkPage;
