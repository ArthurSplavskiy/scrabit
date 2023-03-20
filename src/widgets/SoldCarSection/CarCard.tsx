import { Icon } from '@/shared/ui/Icon/Icon';
import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { ICar } from './interface';
import car_img from './post.png';

const toBeautifyPrice = (price: number) => Number(price.toFixed(1)).toLocaleString();

export const CarCard: FC<ICar> = ({ img, param_brand, param_model, car_year, location, price }) => {
	return (
		<Link
			className={styles.cardLink}
			to={
				'/sell-my-car' +
				'/' +
				param_brand.toLowerCase().replace(' ', '-') +
				'/' +
				param_model.toLowerCase().replace(' ', '-')
			}>
			<div className={styles.card}>
				<div className={styles.cardContent}>
					<p className={classNames(styles.cardYear, 'text-18-14')}>{car_year}</p>
					<h3 className={styles.cardName}>
						{param_brand} {param_model}
					</h3>
					<div className={classNames(styles.cardLocation, 'text-16-14')}>
						<Icon icon='location' color='black' /> {location}
					</div>
					<div className={styles.cardPrice}>
						<div className={classNames('text-32-24')}>$ {toBeautifyPrice(price)}</div>
					</div>
				</div>
				<div className={styles.cardImage}>
					<img src={car_img} alt={param_brand} />
				</div>
			</div>
		</Link>
	);
};
