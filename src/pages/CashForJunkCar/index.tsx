import { MovingTiters } from '@/shared/ui/MovingTiters/MovingTiters';
import { AboutSection } from '@/widgets/AboutSection';
import { HeroSectionSellCar } from '../../widgets/HeroSectionSellCar';
import { ReviewSection } from '@/widgets/ReviewSection';
import { MessageSection } from '@/widgets/MessageSection';
import { Preloader } from '@/widgets/Preloader';
import { HowItWorkSection } from '@/widgets/HowItWorkSection';
import { SoldCarSection } from '@/widgets/SoldCarSection';
import { useQuery } from 'react-query';
import { queryKeys } from '@/app/queryClient/queryKeys';
import api from '../SellMyCar/api';

function CashForJunkPage() {
	const { data, isLoading } = useQuery(queryKeys.cashForJunkCarPage, api.getCashForJunkCarPageData);

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
			<AboutSection data={data?.about_section} />
			<SoldCarSection />
			<HowItWorkSection data={data?.how_it_work_section} />
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
