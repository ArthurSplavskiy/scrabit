import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import { FC } from 'react';
import styles from './ArticleContent.module.scss';
import ReactHtmlParser from 'react-html-parser';
import { IBlogRecord } from '@/entities/BlogRecord/interface';
import { DomElement } from 'htmlparser2';
import { TableOfContent } from './TableOfContent';
import img from './post.png';
import { useLocation } from 'react-router-dom';
import { Icon } from '@/shared/ui/Icon/Icon';
import classNames from 'classnames';

interface Props {
	category?: string;
	record?: IBlogRecord;
}

export const ArticleContent: FC<Props> = ({ category, record }) => {
	const titles: DomElement[] = [];

	return (
		<div className={styles.content}>
			<div className='container'>
				<div className={styles.breadcrumbs}>
					<Breadcrumbs />
				</div>
				<div className={styles.body}>
					<div className={styles.table}>
						<TableOfContent content={titles} />
					</div>
					<div className={styles.nodes}>
						<span className={classNames(styles.category, 'text-18')}>{record?.tag.name}</span>
						<h1 className={classNames(styles.title, 'text-64-24')}>{record?.title}</h1>
						<img src={img} alt={record?.title} />
						<div className={styles.share}>
							<span className={classNames(styles.date, 'text-18-14')}>{record?.createdAt}</span>
							<div className={styles.info}>
								<span className='text-18-14'>Share an article:</span>
								<nav>
									<a
										href={`https://twitter.com/intent/tweet?text=${record?.title}${location.href}`}
										target='_blank'
										rel='noreferrer'>
										<Icon icon='twitter' size='16' />
									</a>
									<a
										href={`mailto:?subject=${record?.title}&body=I thought you might like this article, written by the super duper awesome people at Scrabit.${location.href}`}
										target='_blank'
										rel='noreferrer'>
										<Icon icon='messanger' size='16' />
									</a>
									<a
										href={`https://www.facebook.com/sharer/sharer.php?u=${location.href}&amp;quote=${record?.title}`}
										target='_blank'
										rel='noreferrer'>
										<Icon icon='facebook' size='16' />
									</a>
								</nav>
							</div>
						</div>
						<div className={classNames(styles.fullText, 'article-content')}>
							{ReactHtmlParser(record?.fullText || '', {
								transform: function transform(node: DomElement) {
									if (node.type === 'tag' && node.name === 'h2') {
										titles.push(node.children[0]);
									}
								}
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
