import { HeroRecordCard } from '@/entities/BlogRecord';
import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import { SearchBar } from '@/widgets/SearchBar';
import { FC } from 'react';
import { useBlogHeroRecord } from '../../BlogPageContext';
import styles from './BlogHeroSection.module.scss';

export const BlogHeroSection: FC = () => {
	const { data } = useBlogHeroRecord();
	return (
		<div className={styles.BlogHeroSection}>
			<div className='container'>
				<div className={styles.BlogHeroSectionTop}>
					<Breadcrumbs />
					<SearchBar />
				</div>
				{data && (
					<HeroRecordCard
						image={data.image}
						title={data.title}
						slug={data.slug}
						tag={data.tag}
						descr={data.description}
					/>
				)}
			</div>
		</div>
	);
};
