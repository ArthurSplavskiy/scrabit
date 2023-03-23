import { FC } from 'react';
import styles from './CategoryCard.module.scss';
import defaultImage from './post.png';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ITag } from '../../interface';
import { Button } from '@/shared/ui/Button';
import { useDevice } from '@/app/context/Device/DeviceContext';

interface Props {
	image: string;
	title: string;
	createdAt: string;
	slug: string;
	tag: ITag;
}

export const CategoryRecordCard: FC<Props> = ({ image, title, createdAt, slug, tag }) => {
	const { isMobile } = useDevice();
	return (
		<div className={styles.card}>
			<div className={styles.image}>
				<Link to={`${tag.slug}/${slug}`} className={classNames(styles.imageLink, '-img-ibg')}>
					<img src={defaultImage} alt={title} />
				</Link>
			</div>
			<div className={styles.body}>
				<div className={styles.head}>
					<Link
						key={tag.slug}
						to={`/blog#${tag.slug}`}
						className={classNames(styles.tag, 'text-18-12')}>
						{tag.name}
					</Link>
				</div>
				<Link to={`${tag.slug}/${slug}`} className={styles.title}>
					<h4 className='text-24-14'>{title}</h4>
				</Link>
				<div className={styles.controls}>
					<span className={classNames(styles.date, 'text-18-10')}>{createdAt}</span>
					<Button
						btnTo={`${tag.slug}/${slug}`}
						customType={!isMobile ? 'outline' : 'text-underline'}>
						read more
					</Button>
				</div>
			</div>
		</div>
	);
};
