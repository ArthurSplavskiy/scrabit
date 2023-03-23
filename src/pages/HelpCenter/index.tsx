import { MovingTiters } from '@/shared/ui/MovingTiters/MovingTiters';
import { MessageSection } from '@/widgets/MessageSection';
import { useQuery } from 'react-query';
import { queryKeys } from '@/app/queryClient/queryKeys';
import { HeroSection } from './ui/HeroSeciton';
import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import { Search } from './ui/Search';
import { CategoriesSection } from './ui/CategoriesSection';
import api from './api';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useEffect } from 'react';

function HelpCenterPage() {
	const { data: helpCenterData, isLoading } = useQuery(
		queryKeys.pageHelpCenter,
		api.getFaqArticlesCategory
	);
	const { setPageIsLoaded } = useCommon();
	useEffect(() => {
		if (!isLoading) {
			setPageIsLoaded(true);
		}
	}, [isLoading]);
	return (
		<>
			<div className='container mt-40-16'>
				<Breadcrumbs />
			</div>
			<Search />
			<HeroSection title='Help center' message='how to sell a car quickly' />
			<MovingTiters size='small' text='read more' />
			<CategoriesSection data={helpCenterData} />
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

export default HelpCenterPage;