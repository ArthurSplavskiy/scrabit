import { FC } from 'react';
import styles from './index.module.scss';
import defaultImage from './post.png';
import classNames from 'classnames';
import { Button } from '@/shared/ui/Button';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { Breadcrumbs } from '@/widgets/Breadcrumbs';

interface Props {
	image: string;
	title: string;
	subtitle: string;
}

export const HeroSectionSellCar: FC<Props> = ({ image, title, subtitle }) => {
	const { isMobile } = useDevice();
	return (
		<div className={styles.block}>
			<div className='container'>
				<Breadcrumbs />
				<div className={styles.card}>
					<div className={styles.body}>
						<h4 className='text-64-24'>{title}</h4>
						<p className={classNames(styles.subtitle, 'text-16-14')}>{subtitle}</p>
						{isMobile && (
							<div className={classNames(styles.image, '-img-ibg')}>
								<img src={defaultImage} alt={title} />
							</div>
						)}
						<div className={styles.controls}>
							<Button btnTo={``} width={isMobile ? 'fullWidth' : undefined}>
								get an offer
							</Button>
						</div>
					</div>
					{!isMobile && (
						<div className={classNames(styles.image, '-img-ibg')}>
							<img src={defaultImage} alt={title} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
