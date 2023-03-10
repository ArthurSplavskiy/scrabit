import styles from './index.module.scss';
import { FC } from 'react';
import { BuyerForm } from './Forms/BuyerForm';
import classNames from 'classnames';
import { IBuyerApiData } from './Forms/BuyerForm/interface';
import { CharityForm } from './Forms/CharityForm';
import { ICharityApiData } from './Forms/CharityForm/interface';

interface Props {
	category: string;
	title: string;
	form: IBuyerApiData | ICharityApiData;
	formType: 'buyer' | 'charity';
}

export const FormBlock: FC<Props> = ({ category, title, form, formType }) => {
	return (
		<div className={styles.block}>
			<div className={styles.head}>
				<p className={classNames(styles.category, 'text-18')}>{category}</p>
				<h2 className={'text-40-24'}>{title}</h2>
			</div>
			{formType === 'buyer' ? <BuyerForm form={form as IBuyerApiData} /> : null}
			{formType === 'charity' ? <CharityForm form={form as ICharityApiData} /> : null}
		</div>
	);
};
