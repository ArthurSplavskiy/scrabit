import { SearchBarTool } from './SearchBarTool';
import { FC } from 'react';
import styles from './index.module.scss';

interface Props {}

export const Search: FC<Props> = () => {
	return (
		<div className={styles.block}>
			<div className='container'>
				<div className={styles.inner}>
					<SearchBarTool />
				</div>
			</div>
		</div>
	);
};
