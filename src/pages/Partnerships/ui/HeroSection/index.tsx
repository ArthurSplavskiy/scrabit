import { useDevice } from '@/app/context/Device/DeviceContext';
import { HeroAnimationCar } from '@/entities/HeroAnimationCar';
import { Button } from '@/shared/ui/Button';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import styles from './HeroSection.module.scss';

interface Props {
	breadcrumbs: ReactNode;
	title: string;
	subtitle: string;
	message: string;
	btnText: string;
	btnSlug: string;
	bg?: 'blue' | 'green' | 'grey' | 'white' | 'gradient';
}

export const HeroSection: FC<Props> = ({
	title,
	subtitle,
	message,
	btnText,
	btnSlug,
	breadcrumbs,
	bg = 'blue'
}) => {
	const { isMobile } = useDevice();
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
						{isMobile && <HeroAnimationCar text={message} />}
						<Button btnTo={btnSlug}>{btnText}</Button>
					</div>
					<div>{!isMobile && <HeroAnimationCar text={message} />}</div>
				</div>
			</div>
		</section>
	);
};
