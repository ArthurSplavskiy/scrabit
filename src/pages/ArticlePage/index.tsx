import { queryKeys } from '@/app/queryClient/queryKeys';
import { IBlogRecord } from '@/entities/BlogRecord/interface';
import { BlogPostSlider } from '@/widgets/BlogPostSlider';
import { MessageSection } from '@/widgets/MessageSection';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ArticleContent } from './ArticleContent';
import { useRecord } from './hooks/useRecord';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useLayoutEffect } from 'react';
import { Preloader } from '@/widgets/Preloader';
import api from './api';

function ArticlePage() {
	const params = useParams();
	const { data: record, isLoading } = useRecord(params.slug || '');
	const { data: pageData } = useQuery<{ related_records: IBlogRecord[] }>(
		queryKeys.pageArticle,
		api.getRelatedRecords
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
			<ArticleContent category={params.category || ''} record={record} />
			<BlogPostSlider
				data={{ title: 'related articles', blogposts: pageData?.related_records }}
				withoutBtn={true}
			/>
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

export default ArticlePage; // withBlogContext(BlogPage);
