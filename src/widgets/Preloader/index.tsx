import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import styles from './Preloader.module.scss';
import preloaderLottie from './preloader.json';
import Lottie from 'react-lottie';
import { useCommon } from '@/app/context/Common/CommonContext';
import Cookies from 'js-cookie';

export const Preloader: FC = () => {
	const { pageIsLoaded, setPreloaderIsHide } = useCommon();
	const [isHide, setIsHide] = useState(false);

	useEffect(() => {
		if (Cookies.get('isFirstRender') === 'yes') {
			Cookies.set('isFirstRender', 'no');
		}
		if (Cookies.get('isFirstRender') === 'no') {
			setPreloaderIsHide(true);
		}
		setTimeout(() => {
			if (!Cookies.get('isFirstRender')) {
				Cookies.set('isFirstRender', 'yes');
			}
		}, 500);
	}, []);

	useEffect(() => {
		if (pageIsLoaded) {
			setTimeout(() => {
				setIsHide(true);
				setPreloaderIsHide(true);
			}, 9000);
		}
	}, [pageIsLoaded]);

	const options = {
		loop: false,
		autoplay: false,
		animationData: preloaderLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	return (
		<>
			{Cookies.get('isFirstRender') === 'no' ? (
				<div
					className={classNames(styles.preloader, {
						[styles.hide]: pageIsLoaded
					})}></div>
			) : (
				<div
					className={classNames(styles.preloader, {
						[styles.hide]: pageIsLoaded && isHide
					})}>
					<Lottie options={options} isClickToPauseDisabled={true} />
				</div>
			)}
		</>
	);
};
