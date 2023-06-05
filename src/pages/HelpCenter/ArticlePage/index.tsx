import { MessageSection } from '@/widgets/MessageSection';
import { useQuery } from 'react-query';
import { queryKeys } from '@/app/queryClient/queryKeys';
import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import { Search } from '../ui/Search';
import { useParams } from 'react-router-dom';
import { HelpArticleCardSingle } from '@/entities/HelpArticle/ui/HelpArticleCardSingle';
import api from '../api';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useLayoutEffect } from 'react';
import { Preloader } from '@/widgets/Preloader';

function HelpCenterArticlePage() {
	const { slug } = useParams();
	const { data, isLoading } = useQuery([queryKeys.pageHelpCenterArticle, slug], () =>
		api.getArticle(slug || '')
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
			{data?.[0] ? (
				<HelpArticleCardSingle
					author={data[0].author}
					createdAt={data[0].created_at}
					fullText={data[0].fullText}
					question={data[0].question}
					title={data[0].title}
				/>
			) : null}
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

export default HelpCenterArticlePage;
