import { FC } from 'react';
import styles from './PromoCard.module.scss';
import defaultImage from './post.png';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '@/shared/ui/Button';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { ITag } from '../../interface';
import { AppRoutes } from '@/app/routes';

interface Props {
	image: string;
	title: string;
	createdAt: string;
	slug: string;
	tag: ITag;
	bgColor?: 'white';
}

export const PromoRecordCard: FC<Props> = ({ image, title, createdAt, slug, tag, bgColor }) => {
	const { isMobile } = useDevice();
	return (
		<div className={styles.card}>
			<div className={styles.image}>
				<Link to={`${tag.slug}/${slug}`} className={classNames(styles.imageLink, '-img-ibg')}>
					<img src={defaultImage} alt={title} />
				</Link>
			</div>
			<div
				className={classNames(styles.body, {
					[styles.bodyWhite]: bgColor
				})}>
				<div className={styles.head}>
					<Link key={tag.slug} to={`/blog#${tag.slug}`} className={styles.tag}>
						{tag.name}
					</Link>
					{isMobile && <span className={classNames('text-14', styles.date)}>{createdAt}</span>}
				</div>
				<Link to={`${tag.slug}/${slug}`} className={styles.title}>
					<h4 className='text-32-18'>{title}</h4>
				</Link>
				<div className={styles.controls}>
					{!isMobile && <span className={classNames(styles.date, 'text-14')}>{createdAt}</span>}
					<Button
						btnTo={`${tag.slug}/${slug}`}
						customType='outline'
						width={isMobile ? 'fullWidth' : undefined}>
						read more
					</Button>
				</div>
			</div>
		</div>
	);
};
