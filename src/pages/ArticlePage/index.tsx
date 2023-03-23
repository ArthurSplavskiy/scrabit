import { queryKeys } from '@/app/queryClient/queryKeys';
import { IBlogRecord } from '@/entities/BlogRecord/interface';
import { BlogPostSlider } from '@/widgets/BlogPostSlider';
import { MessageSection } from '@/widgets/MessageSection';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ArticleContent } from './ArticleContent';
import { useRecord } from './hooks/useRecord';
import api from './api';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useEffect } from 'react';

function ArticlePage() {
	const params = useParams();
	const { data: record, isLoading } = useRecord(params.slug || '');
	const { data: pageData } = useQuery<{ related_records: IBlogRecord[] }>(
		queryKeys.pageArticle,
		api.getRelatedRecords
	);

	const { setPageIsLoaded } = useCommon();

	useEffect(() => {
		if (!isLoading) {
			setPageIsLoaded(true);
		}
	}, [isLoading]);

	return (
		<>
			<ArticleContent category={params.category || ''} record={record} />
			<BlogPostSlider
				data={{ title: 'related articles', blogposts: pageData?.related_records }}
				withoutBtn={true}
			/>
			<MessageSection
				title={'Scrabit’s buying'}
				subtitle={'we’ll give your used car another chance'}
				message={'how to sell a car quickly'}
				btnText={'Check what your car worth'}
				btnSlug={'/'}
				bg='green'
			/>
		</>
	);
}

export default ArticlePage; // withBlogContext(BlogPage);
