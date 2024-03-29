import { ParallaxSection } from '@/widgets/ParallaxSection';
import { MessageSection } from '@/widgets/MessageSection';
import { useBlogTopRecords, withBlogContext } from './BlogPageContext';
import { BlogHeroSection } from './ui/BlogHeroSection';
import { BlogPostSlider } from '@/widgets/BlogPostSlider';
import { BlogCategorySection } from './ui/BlogCategorySection';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useLayoutEffect } from 'react';
import { Preloader } from '@/widgets/Preloader';
import { useQuery } from 'react-query';
import { queryKeys } from '@/app/queryClient/queryKeys';
import api from './api';
import { IBlogTags } from './interface';

function BlogPage() {
	const { data: topRecords, isLoading } = useBlogTopRecords();
	const { data: categories } = useQuery<IBlogTags[]>(queryKeys.blogTags, api.getBlogCategories);
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
			<BlogHeroSection />
			<BlogPostSlider data={{ title: 'Top picks', blogposts: topRecords }} withoutBtn={true} />
			{categories?.map((c, idx) => (
				<BlogCategorySection
					key={idx}
					categoryTitle={c.name}
					subtitle={c.subtitle}
					lastSection={idx === categories.length - 1}
					slug={c.slug}
					withBlueBg={idx % 2 ? true : false}
					withTopOffset={idx === 0}
				/>
			))}
			<ParallaxSection />
			<MessageSection
				goToOfferForm
				title={'Let those grumpy old wheels go'}
				subtitle={'you’ll get your offer  faster than it takes to buckle up'}
				message={'how to sell a car quickly'}
				btnText={'get an instant offer'}
				btnSlug={'/'}
			/>
		</>
	);
}

export default withBlogContext(BlogPage);
