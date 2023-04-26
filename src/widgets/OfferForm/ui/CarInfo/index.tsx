import { FC } from 'react';
import styles from './index.module.scss';
import marker from './marker.svg';
import classNames from 'classnames';

interface Props {
	year: string;
	car: string;
	place: string;
	offer_id: string;
}

export const CarInfo: FC<Props> = ({ year, car, place, offer_id }) => {
	return (
		<div className={styles.block}>
			<h3 className={styles.year}>{year}</h3>
			<div className={classNames(styles.car, 'text-24-18')}>{car}</div>
			<div className={classNames(styles.place, 'text-16-14')}>
				<img src={marker} />
				{place}
			</div>
			<div className={classNames(styles.offerId, 'text-16-14')}>
				Offer ID: <span>{offer_id}</span>
			</div>
		</div>
	);
};
