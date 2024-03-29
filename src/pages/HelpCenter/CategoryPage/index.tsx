import { MovingTiters } from '@/shared/ui/MovingTiters/MovingTiters';
import { MessageSection } from '@/widgets/MessageSection';
import { useQuery } from 'react-query';
import { queryKeys } from '@/app/queryClient/queryKeys';
import { HeroSection } from '../ui/HeroSeciton';
import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import { Search } from '../ui/Search';
import { CategoriesSection } from '../ui/CategoriesSection';
import { useParams } from 'react-router-dom';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useLayoutEffect } from 'react';
import lottie from '../speachbubble.json';
import api from '../api';
import { Preloader } from '@/widgets/Preloader';

function HelpCenterCategoryPage() {
	const { category } = useParams();
	const { data, isLoading } = useQuery([queryKeys.pageHelpCenterCategory, category], () =>
		api.findArticlesByCategory(category || '')
	);
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
			<div className='container mt-40-16'>
				<Breadcrumbs />
			</div>
			<Search />
			<HeroSection title={data?.[0].title} lottie={lottie} />
			<MovingTiters size='small' text='read more' />
			<CategoriesSection data={data} type='category-page' />
			<MessageSection
				title={'Scrabit’s buying'}
				subtitle={'we’ll give your used car another chance'}
				message={'If you have any questions you can always contact us'}
				btnText={'Check what your car worth'}
				btnSlug={'/'}
				goToOfferForm
				bg='green'
			/>
		</>
	);
}

export default HelpCenterCategoryPage;
