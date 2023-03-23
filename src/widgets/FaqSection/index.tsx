import { SectionHead } from '@/shared/ui/SectionHead';
import { Spollers } from '@/shared/ui/Spollers';
import { FC } from 'react';
import { IFaqSection } from './interface';
import styles from './FaqSection.module.scss';
import car from './car.png';

interface Props {
	data?: IFaqSection;
}

export const FaqSection: FC<Props> = ({ data }) => {
	return (
		<div id='more-info' className={styles.section}>
			<div className='container'>
				<div className={styles.sectionHead}>
					<SectionHead title={data?.title} subtitle={data?.subtitle} />
					<img src={car} alt={data?.title} />
				</div>
				<Spollers data={data?.questions} />
			</div>
		</div>
	);
};
