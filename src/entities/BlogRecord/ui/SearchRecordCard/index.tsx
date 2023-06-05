import { FC } from 'react';
import styles from './SearchCard.module.scss';
import defaultImage from './post.png';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ITag } from '../../interface';

interface Props {
	image: string;
	title: string;
	createdAt: string;
	slug: string;
	tag: ITag;
}

export const SearchRecordCard: FC<Props> = ({ image, title, createdAt, slug, tag }) => {
	return (
		<div className={styles.card}>
			<div className={styles.image}>
				<Link to={`${tag.slug}/${slug}`} className={classNames(styles.imageLink, '-img-ibg')}>
					<img src={image || defaultImage} alt={title} />
				</Link>
			</div>
			<div className={styles.body}>
				<div className={styles.head}>
					<Link key={tag.slug} to={`/blog#${tag.slug}`} className={styles.tag}>
						{tag.name}
					</Link>
				</div>
				<Link to={`${tag.slug}/${slug}`} className={styles.title}>
					<h4 className='text-18-14'>{title}</h4>
				</Link>
				<div className={styles.controls}>
					<span className={classNames(styles.date, 'text-18-10')}>{createdAt}</span>
				</div>
			</div>
		</div>
	);
};
