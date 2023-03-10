import { ParallaxSection } from '@/widgets/ParallaxSection';
import { MessageSection } from '@/widgets/MessageSection';
import { useBlogCategories, useBlogTopRecords, withBlogContext } from './BlogPageContext';
import { Preloader } from '@/widgets/Preloader';
import { BlogHeroSection } from './ui/BlogHeroSection';
import { BlogPostSlider } from '@/widgets/BlogPostSlider';
import { BlogCategorySection } from './ui/BlogCategorySection';

function BlogPage() {
	const { data: topRecords, isLoading } = useBlogTopRecords();
	const { data: categories } = useBlogCategories();

	return (
		<>
			<Preloader hide={!isLoading} />
			<BlogHeroSection />
			<BlogPostSlider data={{ title: 'Top picks', blogposts: topRecords }} withoutBtn={true} />
			{categories?.map((c, idx) => (
				<BlogCategorySection
					key={idx}
					categoryTitle={c.tag.name}
					subtitle={c.subtitle}
					lastSection={idx === categories.length}
					slug={c.tag.slug}
					withBlueBg={idx % 2 ? true : false}
					withTopOffset={idx === 0}
				/>
			))}
			<ParallaxSection />
			<MessageSection
				title={'Let those grumpy old wheels go'}
				subtitle={'you’ll get your offer  faster than it takes to buckle up'}
				message={'how to sell a car quickly'}
				btnText={'get an instant offer'}
				btnSlug={'/help-center'}
			/>
		</>
	);
}

export default withBlogContext(BlogPage);
