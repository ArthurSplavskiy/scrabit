import { ArticlesCategoryFAQ } from '@/entities/HelpArticle/HelpArticleTypes';
import { HelpArticleCard } from '@/entities/HelpArticle/ui/HelpArticleCard';
import { HelpArticleCardAuthor } from '@/entities/HelpArticle/ui/HelpArticleCardAuthor';
import classNames from 'classnames';
import { FC } from 'react';
import styles from './index.module.scss';

interface Props {
	type?: 'category-page';
	data: ArticlesCategoryFAQ[];
}

export const CategoriesSection: FC<Props> = ({ data, type }) => (
	<div className='container'>
		<div
			className={classNames(styles.block, {
				[styles.categoryBlock]: type === 'category-page'
			})}>
			{data?.map((c, idx) => (
				<HelpArticleCard
					color={type === 'category-page' ? 'green' : undefined}
					key={idx}
					index={idx}
					slug={c.slug}
					title={c.title}
					subtitle={c.subtitle}
					authors={c.authors}
					articlesCount={c.articles.length}
				/>
			))}
			{type === 'category-page'
				? data?.map((c) =>
						c.articles.map((a) => (
							<HelpArticleCardAuthor
								key={a.slug}
								slug={a.slug}
								title={a.title}
								subtitle={a.question}
								author={a.author}
								createdAt={a.created_at}
							/>
						))
				  )
				: null}
		</div>
	</div>
);
