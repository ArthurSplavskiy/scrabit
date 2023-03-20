import { MessageSection } from '@/widgets/MessageSection';
import { Preloader } from '@/widgets/Preloader';
import { useQuery } from 'react-query';
import { queryKeys } from '@/app/queryClient/queryKeys';
import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import { Search } from '../ui/Search';
import { useParams } from 'react-router-dom';
import { HelpArticleCardSingle } from '@/entities/HelpArticle/ui/HelpArticleCardSingle';
import api from '../api';

function HelpCenterArticlePage() {
	const { category, slug } = useParams();
	const { data, isLoading } = useQuery([queryKeys.pageHelpCenterArticle, slug], () =>
		api.getArticle(slug || '')
	);
	return (
		<>
			<Preloader hide={!isLoading} />
			<div className='container mt-40-16'>
				<Breadcrumbs links={[category || '']} />
			</div>
			<Search />
			{data?.[0] ? (
				<HelpArticleCardSingle
					author={data[0].author}
					createdAt={data[0].createdAt}
					fullText={data[0].fullText}
					question={data[0].question}
					title={data[0].title}
				/>
			) : null}
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

export default HelpCenterArticlePage;
