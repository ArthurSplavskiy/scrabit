import { MovingTiters } from '@/shared/ui/MovingTiters/MovingTiters';
import { MessageSection } from '@/widgets/MessageSection';
import { Preloader } from '@/widgets/Preloader';
import { useQuery } from 'react-query';
import { queryKeys } from '@/app/queryClient/queryKeys';
import { HeroSection } from '../ui/HeroSeciton';
import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import { Search } from '../ui/Search';
import { CategoriesSection } from '../ui/CategoriesSection';
import api from '../api';
import { useParams } from 'react-router-dom';

function HelpCenterCategoryPage() {
	const { category } = useParams();
	const { data, isLoading } = useQuery([queryKeys.pageHelpCenterCategory, category], () =>
		api.findArticlesByCategory(category || '')
	);
	return (
		<>
			<Preloader hide={!isLoading} />
			<div className='container mt-40-16'>
				<Breadcrumbs />
			</div>
			<Search />
			<HeroSection title={data?.[0].title} message='how to sell a car quickly' />
			<MovingTiters size='small' text='read more' />
			<CategoriesSection data={data} type='category-page' />
			<MessageSection
				title={'Scrabit’s buying'}
				subtitle={'we’ll give your used car another chance'}
				message={'if you have any questions you can always contacts us'}
				btnText={'Check what your car worth'}
				btnSlug={'/help-center'}
				bg={'green'}
			/>
		</>
	);
}

export default HelpCenterCategoryPage;
