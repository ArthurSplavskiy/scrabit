import { useDevice } from '@/app/context/Device/DeviceContext';
import { HeroAnimationCar } from '@/entities/HeroAnimationCar';
import { Button } from '@/shared/ui/Button';
import classNames from 'classnames';
import { FC } from 'react';
import styles from './MessageSection.module.scss';

interface Props {
	title: string;
	subtitle: string;
	message: string;
	btnText: string;
	btnSlug: string;
	bg?: 'green';
}

export const MessageSection: FC<Props> = ({ title, subtitle, message, btnText, btnSlug, bg }) => {
	const { isMobile } = useDevice();
	return (
		<section>
			<div className='container'>
				<div
					className={classNames(styles.block, {
						[styles.greenBg]: bg
					})}>
					<div className={styles.content}>
						<h2 className='text-96'>{title}</h2>
						<h5 className='text-18-14'>{subtitle}</h5>
						{isMobile && <HeroAnimationCar text={message} />}
						<Button btnTo={btnSlug}>{btnText}</Button>
					</div>
					{!isMobile && <HeroAnimationCar text={message} />}
				</div>
			</div>
		</section>
	);
};
