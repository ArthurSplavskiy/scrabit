import styles from './index.module.scss';
import phoneCall from './phone-call.svg';

export const CallCard = () => {
	return (
		<div className={styles.block}>
			<img src={phoneCall} alt='phone' />
			<h5 className='text-14'>Need to change something?</h5>
			<p className='text-16'>
				Call <a href='tel:8775865692'>877-586-5692</a>
			</p>
		</div>
	);
};
