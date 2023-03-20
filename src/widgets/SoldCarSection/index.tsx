import { queryKeys } from '@/app/queryClient/queryKeys';
import api from '@/pages/SellMyCar/api';
import { Button } from '@/shared/ui/Button';
import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { CarCard } from './CarCard';
import styles from './index.module.scss';
import { ICar } from './interface';
import point from './point.svg';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { usePageSoldAmount } from '@/pages/SellMyCar/SellMyCarPageContext';

gsap.registerPlugin(ScrollTrigger);

export const SoldCarSection: FC = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const { data: cars } = useQuery<ICar[]>(
		[queryKeys.cars, pageNumber],
		() => api.getCars(1, 4 * pageNumber),
		{
			keepPreviousData: true
		}
	);
	const { data } = usePageSoldAmount();

	return (
		<div className={styles.block}>
			<div
				className='container'
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}>
				<h2>{data} cars sold this month</h2>
				<div className={styles.content}>
					<div className={styles.cards} id='scroll-block'>
						<div className={styles.indicator}>
							<div className={styles.indicatorSolid} id='scroll-line'>
								<img src={point} alt='point' />
							</div>
							<div className={styles.indicatorDashed}></div>
						</div>
						{cars?.map((c, idx) => (
							<CarCard
								key={idx}
								param_brand={c.param_brand}
								car_year={c.car_year}
								param_model={c.param_model}
								location={c.location}
								price={c.price}
								img={c.img}
							/>
						))}
					</div>
					<Button className={styles.btn} onClick={() => setPageNumber((prev) => prev + 1)}>
						Show more
					</Button>
				</div>
			</div>
		</div>
	);
};
