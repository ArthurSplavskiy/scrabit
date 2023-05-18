import { MessageSection } from '@/widgets/MessageSection';
import { Button } from '@/shared/ui/Button';
import { HeroAnimationCar } from '@/entities/HeroAnimationCar';
import { useEffect } from 'react';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useDevice } from '@/app/context/Device/DeviceContext';
import styles from './index.module.scss';

const Page404 = () => {
	const { setPageIsLoaded } = useCommon();
	const { isMobile } = useDevice();
	useEffect(() => {
		setPageIsLoaded(true);
	}, []);
	return (
		<>
			<div className={'container'}>
				<div className={styles.page}>
					<div className={styles.pageHead}>
						<div className={styles.pageTitle}>
							<h1>404</h1>
							{!isMobile && <Button btnTo='/'>back to the homepage</Button>}
						</div>
						<HeroAnimationCar text='OOPS! this page was not found( do you want return to a homepage?' />
						{isMobile && (
							<Button btnTo='/' width='fullWidth'>
								back to the homepage
							</Button>
						)}
					</div>
				</div>
			</div>
			<MessageSection
				title={'Scrabit’s buying'}
				subtitle={'we’ll give your used car another chance'}
				message={'if you have any questions you can always contact us'}
				btnText={'Check what your car worth'}
				btnSlug={'/help-center'}
				bg={'green'}
			/>
		</>
	);
};

export default Page404;
