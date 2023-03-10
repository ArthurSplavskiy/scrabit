import styles from './index.module.scss';
import avatar from './avatar.jpeg';
import { FC } from 'react';

export interface IBuyer {
	img: string;
	name: string;
	post: string;
	message: string;
}

export const PersonBlock: FC<IBuyer> = ({ img, name, post, message }) => {
	return (
		<div className={styles.block}>
			<div className={styles.head}>
				<img src={avatar} alt={name} />
				<div className={styles.descr}>
					<h3>{name}</h3>
					<p className='text-18-14'>{post}</p>
				</div>
			</div>
			<p className='text-16-14'>{message}</p>
		</div>
	);
};
