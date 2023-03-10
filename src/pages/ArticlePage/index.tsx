import { queryKeys } from '@/app/queryClient/queryKeys';
import { IBlogRecord } from '@/entities/BlogRecord/interface';
import { BlogPostSlider } from '@/widgets/BlogPostSlider';
import { MessageSection } from '@/widgets/MessageSection';
import { Preloader } from '@/widgets/Preloader';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ArticleContent } from './ArticleContent';
import { useRecord } from './hooks/useRecord';
import api from './api';

function ArticlePage() {
	const params = useParams();
	const { data: record, isLoading } = useRecord(params.slug || '');
	const { data: pageData } = useQuery<{ related_records: IBlogRecord[] }>(
		queryKeys.pageArticle,
		api.getRelatedRecords
	);
	return (
		<>
			<Preloader hide={!isLoading} />
			<ArticleContent category={params.category || ''} record={record} />
			<BlogPostSlider
				data={{ title: 'related articles', blogposts: pageData?.related_records }}
				withoutBtn={true}
			/>
			<MessageSection
				title={'Let those grumpy old wheels go'}
				subtitle={'you’ll get your offer  faster than it takes to buckle up'}
				message={'how to sell a car quickly'}
				btnText={'get an instant offer'}
				btnSlug={'/help-center'}
				bg='green'
			/>
		</>
	);
}

export default ArticlePage; // withBlogContext(BlogPage);
