import useSessionStorage from '@/shared/hooks/useSessionStorage';
import { useNavigate } from 'react-router-dom';
import { useCommon } from '@/app/context/Common/CommonContext';
import Cookies from 'js-cookie';
import {
	IOfferData,
	IOfferDataResponseInfo,
	initialOfferData,
	initialOfferDataResponseInfo
} from '../../initialOfferData';
import Lottie from 'react-lottie-player';
import lottieData from './decline-offer.json';
import { Button } from '@/shared/ui/Button';
import styles from './index.module.scss';

export const DeclineOfferPopup = () => {
	const { setFocusFirstOfferFormField, closeDeclineOfferPopup } = useCommon();
	const [, setOfferData] = useSessionStorage<IOfferData>('offerData', initialOfferData);
	const [offerDataResponseInfo] = useSessionStorage<IOfferDataResponseInfo>(
		'offerDataResponseInfo',
		initialOfferDataResponseInfo
	);
	const [, setCalculateOfferCostStatus] = useSessionStorage<boolean>(
		'calculateOfferCostStatus',
		false
	);
	const [, setOfferPriceScreen] = useSessionStorage<boolean>('offerPriceScreen', false);
	const navigate = useNavigate();

	const declineOffer = () => {
		// RESET
		navigate('/');
		Cookies.set('first-offer-form-is-filled', 'false');
		setFocusFirstOfferFormField(true);
		setOfferData(initialOfferData);
		closeDeclineOfferPopup();
		setOfferPriceScreen(false);
		setCalculateOfferCostStatus(false);
	};

	return (
		<div className={styles.popup}>
			<Lottie animationData={lottieData} loop={false} play />
			<p>
				Wanna think on a little? We can save your {offerDataResponseInfo.price} offer. If you think
				you might come back
			</p>
			<div className={styles.btns}>
				<Button customType='outline' onClick={declineOffer}>
					Decline this offer
				</Button>
				<Button onClick={closeDeclineOfferPopup}>SAVE this offer</Button>
			</div>
		</div>
	);
};
