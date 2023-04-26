import styles from './index.module.scss';
import { FC } from 'react';
import classNames from 'classnames';
import { useDevice } from '@/app/context/Device/DeviceContext';
import useSessionStorage from '@/shared/hooks/useSessionStorage';
import { IOfferData, initialOfferData } from '../../initialOfferData';
import { Link } from 'react-router-dom';

interface Props {}

export const FinalInfo: FC<Props> = () => {
	const { isSmallMobile } = useDevice();
	const [, setOfferPriceScreen] = useSessionStorage<boolean>('offerPriceScreen', true);
	const [, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	return (
		<div className={styles.block}>
			<div className={styles.top}>
				<div className={styles.headTitle}>
					<p className={classNames(styles.title, 'text-24-14')}>
						Nice! We're buying your 2018 Tesla Model S for
					</p>
					<h1 className={styles.price}>$ 10,000-16,110</h1>
				</div>
				<div className={styles.headThank}>
					<h5>Thank you for taking the offer</h5>
					<p className='text-14'>
						You’ve been matched with our driver. They’ll get back to you to schedule a pick up.
					</p>
				</div>
			</div>
			<div className={styles.bottom}>
				<div className={styles.bottomContent}>
					<h3>Pick up info</h3>
					<p className={styles.bottomOfferListText}>
						Our pickup partner will contact you soon to schedule.
					</p>
					<ul className={styles.bottomOfferList}>
						<li className={styles.bottomOfferListItem}>
							<h4>Location</h4>
							<div>
								<p className='text-16-14'>99 Kneeland St., Boston, MA 02196</p>
							</div>
						</li>
					</ul>
					{/* <h3 className={styles.offsetTitle}>buyer and partner info</h3>
					<ul className={styles.bottomOfferList}>
						<li>
							<h4>Buyer</h4>
							<div>
								<p className='text-16-14'>Chuckran Auto Parts</p>
								<p className='text-16-14'>Inc. 508-697-6319</p>
								<p className={classNames(styles.bottomOfferListSchedule, 'text-16-14')}>
									M - F:7:00 - 16:00 GMT-5 Sa - Su:Closed
								</p>
							</div>
						</li>
					</ul>
					<ul className={styles.bottomOfferList}>
						<li>
							<h4>Buyer</h4>
							<div>
								<p className='text-16-14'>Same as buyer</p>
							</div>
						</li>
					</ul> */}
				</div>
				<div className={styles.bottomList}>
					<div className={styles.bottomListHead}>
						<h5>Pick up day pointers</h5>
					</div>
					<div className={styles.bottomListBody}>
						<ul>
							<li className='text-16-14'>
								Remove all your belongings, even those you don't want to keep
							</li>
							<li className='text-16-14'>
								Bring all the keys, fobs, clickers, and anything else you’ve used
							</li>
							<li className='text-16-14'>Have the necessary papers ready for the transfer</li>
							<li className='text-16-14'>Park in a spot the tow truck can easily reach</li>
							<li className='text-16-14'>
								Be prepared to remove the license plate before you wave goodbye
							</li>
						</ul>
						<Link to={'/help-center'} className={styles.bottomListLink}>
							How do I sign my California title?
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
