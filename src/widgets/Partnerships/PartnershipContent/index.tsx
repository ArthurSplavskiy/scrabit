import styles from './index.module.scss';
import { FC, ReactNode } from 'react';

interface Props {
	personBlock: ReactNode;
	faqsBlock: ReactNode;
	formBlock: ReactNode;
}

export const PartnershipContent: FC<Props> = ({ personBlock, faqsBlock, formBlock }) => {
	return (
		<div className={styles.section}>
			<div className='container'>
				<div className={styles.block}>
					<div className={styles.personBlock}>{personBlock}</div>
					<div className={styles.formBlock}>{formBlock}</div>
					<div className={styles.faqsBlock}>{faqsBlock}</div>
				</div>
			</div>
		</div>
	);
};
