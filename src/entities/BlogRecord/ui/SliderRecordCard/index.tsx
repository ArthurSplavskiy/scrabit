import { FC } from 'react';
import styles from './SliderCard.module.scss';
import defaultImage from './post.png';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '@/shared/ui/Button';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { ITag } from '../../interface';
import Image from '@/shared/ui/Image';
import { dateFormatter } from '@/shared/helpers';

interface Props {
	image: string;
	title: string;
	createdAt: string;
	tag: ITag;
	route: string;
}

export const SliderRecordCard: FC<Props> = ({ image, title, createdAt, tag, route }) => {
	const { isMobile } = useDevice();
	return (
		<div className={styles.card}>
			<div className={styles.image}>
				<Link to={route} className={classNames(styles.imageLink)}>
					<Image lazy scaleInScroll src={image || defaultImage} alt={title} />
				</Link>
			</div>
			<div className={styles.body}>
				<div className={styles.head}>
					<Link key={tag.slug} to={`/blog#${tag.name.toLocaleLowerCase()}`} className={styles.tag}>
						{tag.name}
					</Link>
					{isMobile && (
						<span className={classNames('text-14', styles.date)}>
							{dateFormatter.format(new Date(createdAt))}
						</span>
					)}
				</div>
				<Link to={route} className={styles.title}>
					<h4 className='text-24-18'>{title}</h4>
				</Link>
				<div className={styles.controls}>
					{!isMobile && (
						<span className={classNames(styles.date, 'text-14')}>
							{dateFormatter.format(new Date(createdAt))}
						</span>
					)}
					<Button btnTo={route} customType='outline' width={isMobile ? 'fullWidth' : undefined}>
						read more
					</Button>
				</div>
			</div>
		</div>
	);
};
