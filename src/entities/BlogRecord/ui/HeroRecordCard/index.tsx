import { FC } from 'react';
import styles from './HeroCard.module.scss';
import defaultImage from './post.png';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '@/shared/ui/Button';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { ITag } from '../../interface';

interface Props {
	image: string;
	title: string;
	slug: string;
	tag: ITag;
	descr: string;
}

export const HeroRecordCard: FC<Props> = ({ image, title, slug, tag, descr }) => {
	const { isMobile } = useDevice();
	return (
		<div className={styles.card} data-fade-in-up>
			<div className={styles.body}>
				<div className={styles.head}>
					<Link key={tag.slug} to={`/blog#${tag.slug}`} className={styles.tag}>
						{tag.name}
					</Link>
				</div>
				<Link to={`/blog/${tag.slug}/${slug}`} className={styles.title}>
					<h4 className='text-64-24'>{title}</h4>
				</Link>
				<p className={classNames(styles.descr, 'text-16-14')}>{descr}</p>
				{isMobile && (
					<div className={styles.image}>
						<Link
							to={`/blog/${tag.slug}/${slug}`}
							className={classNames(styles.imageLink, '-img-ibg')}>
							<img src={image || defaultImage} alt={title} />
						</Link>
					</div>
				)}
				<div className={styles.controls}>
					<Button btnTo={`/blog/${tag.slug}/${slug}`} width={isMobile ? 'fullWidth' : undefined}>
						Read AN ARTICLE
					</Button>
				</div>
			</div>
			{!isMobile && (
				<div className={styles.image}>
					<Link
						to={`/blog/${tag.slug}/${slug}`}
						className={classNames(styles.imageLink, '-img-ibg')}>
						<img src={image || defaultImage} alt={title} />
					</Link>
				</div>
			)}
		</div>
	);
};
