import styles from './index.module.scss';
import { FC } from 'react';
import { Spollers } from '@/shared/ui/Spollers';
import { IDType } from '@/shared/interfaces/shared';

export interface IBuyerFaqs {
	title: string;
	subtitle: string;
	faqs: {
		id: IDType;
		title: string;
		text: string;
	}[];
}

export const FaqsBlock: FC<IBuyerFaqs> = ({ title, subtitle, faqs }) => {
	return (
		<div className={styles.block}>
			<h4 className='text-24'>{title}</h4>
			<p className='text-16-14'>{subtitle}</p>
			<Spollers data={faqs} size='small' />
		</div>
	);
};
