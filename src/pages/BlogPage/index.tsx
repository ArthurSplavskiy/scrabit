import { ParallaxSection } from '@/widgets/ParallaxSection';
import { MessageSection } from '@/widgets/MessageSection';
import { useBlogCategories, useBlogTopRecords, withBlogContext } from './BlogPageContext';
import { BlogHeroSection } from './ui/BlogHeroSection';
import { BlogPostSlider } from '@/widgets/BlogPostSlider';
import { BlogCategorySection } from './ui/BlogCategorySection';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useEffect } from 'react';

function BlogPage() {
	const { data: topRecords, isLoading } = useBlogTopRecords();
	const { data: categories } = useBlogCategories();
	const { setPageIsLoaded } = useCommon();
	useEffect(() => {
		if (!isLoading) {
			setPageIsLoaded(true);
		}
	}, [isLoading]);
	return (
		<>
			<BlogHeroSection />
			<BlogPostSlider data={{ title: 'Top picks', blogposts: topRecords }} withoutBtn={true} />
			{categories?.map((c, idx) => (
				<BlogCategorySection
					key={idx}
					categoryTitle={c.tag.name}
					subtitle={c.subtitle}
					lastSection={idx === categories.length - 1}
					slug={c.tag.slug}
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
