import { FC } from 'react';
import { CarCard } from './CarCard';
import { ICar } from './interface';
import { usePageSoldAmount } from '@/pages/SellMyCar/SellMyCarPageContext';
import point from './point.svg';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './index.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface Props {
	data?: ICar[];
}

export const SoldCarSection: FC<Props> = ({ data: cars }) => {
	//const [pageNumber, setPageNumber] = useState(1);
	// const { data: cars } = useQuery<ICar[]>(
	// 	[queryKeys.cars, pageNumber],
	// 	() => api.getCars(1, 4 * pageNumber),
	// 	{
	// 		keepPreviousData: true
	// 	}
	// );
	const { data: amount } = usePageSoldAmount();

	if (!cars?.length) return <></>;

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
				<h2>{amount} cars sold this month</h2>
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
					{/* <Button className={styles.btn} onClick={() => setPageNumber((prev) => prev + 1)}>
						Show more
					</Button> */}
				</div>
			</div>
		</div>
	);
};
