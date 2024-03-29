import classNames from 'classnames';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import styles from './Preloader.module.scss';
import preloaderLottie from './preloader.json';
import Lottie from 'react-lottie-player';
import { useCommon } from '@/app/context/Common/CommonContext';
import Cookies from 'js-cookie';

export const Preloader: FC = () => {
	const { pageIsLoaded, setPreloaderIsHide } = useCommon();
	const [isFirstRender, setIsFirstRender] = useState(true);
	const [isHide, setIsHide] = useState(false);

	const [showLottie, setShowLottie] = useState(false);

	useEffect(() => {
		if (Cookies.get('isFirstRender') === 'no') {
			setPreloaderIsHide(true);
			setIsFirstRender(false);
		}
		if (Cookies.get('isFirstRender') === 'yes') {
			Cookies.set('isFirstRender', 'no');
		}
		setTimeout(() => {
			if (!Cookies.get('isFirstRender')) {
				Cookies.set('isFirstRender', 'yes');
			}
			setShowLottie(true);
		}, 500);
	}, []);

	useEffect(() => {
		if (pageIsLoaded) {
			setTimeout(() => {
				setIsHide(true);
				setPreloaderIsHide(true);
			}, 5500);
		}
	}, [pageIsLoaded]);

	return (
		<>
			{isFirstRender ? (
				<div
					className={classNames(styles.preloader, {
						[styles.hide]: pageIsLoaded && isHide
					})}>
					<div className={styles.lottie}>
						{showLottie && <Lottie animationData={preloaderLottie} play loop={false} />}
					</div>
				</div>
			) : (
				<div
					className={classNames(styles.preloader, {
						[styles.hide]: pageIsLoaded
					})}>
					<div className={styles.spinner}>
						<div className={styles.spinnerCircle}>
							<span className={styles.ball1}></span>
							<span className={styles.ball2}></span>
							<span className={styles.ball3}></span>
							<span className={styles.ball4}></span>
							<span className={styles.ball5}></span>
							<span className={styles.ball6}></span>
							<span className={styles.ball7}></span>
							<span className={styles.ball8}></span>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
