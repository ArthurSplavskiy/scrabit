import { FC } from 'react';
import './index.scss';

export const Loader: FC = () => {
	return (
		<div className='Loader-wrapper'>
			<div className='Loader'>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};
