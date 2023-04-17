import { useDevice } from '@/app/context/Device/DeviceContext';
import { Button } from '@/shared/ui/Button';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import Lottie from 'react-lottie-player';
import styles from './HeroSection.module.scss';
import buyerLottie from './buyer.json';
import carrierLottie from './carrier.json';
import charityLottie from './charity.json';
import supplierLottie from './supplier.json';
import publisherLottie from './publisher.json';

interface Props {
	breadcrumbs: ReactNode;
	title: string;
	subtitle: string;
	messageType: 'buyer' | 'carrier' | 'publisher' | 'charity' | 'supplier';
	btnText: string;
	btnSlug: string;
	bg?: 'blue' | 'green' | 'grey' | 'white' | 'gradient';
}

export const HeroSection: FC<Props> = ({
	title,
	subtitle,
	messageType,
	btnText,
	btnSlug,
	breadcrumbs,
	bg = 'blue'
}) => {
	const { isMobile } = useDevice();

	const setLottieFile = (messageType: string) => {
		switch (messageType) {
			case 'buyer':
				return buyerLottie;
			case 'carrier':
				return carrierLottie;
			case 'publisher':
				return publisherLottie;
			case 'charity':
				return charityLottie;
			case 'supplier':
				return supplierLottie;
			default:
				return buyerLottie;
		}
	};
	return (
		<section
			className={classNames(styles.section, {
				[styles.blue]: bg === 'blue',
				[styles.green]: bg === 'green',
				[styles.grey]: bg === 'grey',
				[styles.white]: bg === 'white',
				[styles.gradient]: bg === 'gradient'
			})}>
			<div className='container'>
				{breadcrumbs}
				<div className={classNames(styles.block)}>
					<div className={classNames(styles.content)}>
						<h2 className='text-64-40'>{title}</h2>
						<p className='text-16-14'>{subtitle}</p>
						{isMobile && (
							<div>
								<Lottie animationData={setLottieFile(messageType)} loop={false} play />
							</div>
						)}
						<Button btnTo={btnSlug} width={isMobile ? 'fullWidth' : undefined}>
							{btnText}
						</Button>
					</div>
					<div>
						{!isMobile && <Lottie animationData={setLottieFile(messageType)} loop={false} play />}
					</div>
				</div>
			</div>
		</section>
	);
};
