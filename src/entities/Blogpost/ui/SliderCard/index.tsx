import { FC } from 'react';
import styles from './SliderCard.module.scss';
import defaultImage from './post.png';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '@/shared/ui/Button';
import { useDevice } from '@/app/context/Device/DeviceContext';

interface Props {
	image: string;
	title: string;
	createdAt: string;
	slug: string;
	tag: string;
}

export const SliderCard: FC<Props> = ({ image, title, createdAt, slug, tag }) => {
	const { isMobile } = useDevice();
	return (
		<div className={styles.card}>
			<div className={styles.image}>
				<Link to={`/blog/${tag}/${slug}`} className={classNames(styles.imageLink, '-img-ibg')}>
					<img src={defaultImage} alt={title} />
				</Link>
			</div>
			<div className={styles.body}>
				<div className={styles.head}>
					<Link key={tag} to={`blog/${tag}`} className={styles.tag}>
						{tag}
					</Link>
					{isMobile && <span className={classNames('text-14', styles.date)}>{createdAt}</span>}
				</div>
				<Link to={`/blog/${tag}/${slug}`} className={styles.title}>
					<h4 className='text-24-18'>{title}</h4>
				</Link>
				<div className={styles.controls}>
					{!isMobile && <span className={classNames(styles.date, 'text-14')}>{createdAt}</span>}
					<Button btnTo={`/blog/${tag}/${slug}`} customType='outline'>
						read more
					</Button>
				</div>
			</div>
		</div>
	);
};
