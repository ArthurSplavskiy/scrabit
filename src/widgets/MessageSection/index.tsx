import { useDevice } from '@/app/context/Device/DeviceContext';
import { HeroAnimationCar } from '@/entities/HeroAnimationCar';
import { Button } from '@/shared/ui/Button';
import { FC, useEffect, useRef } from 'react';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useIsView } from '@/shared/hooks/useIsView';
import classNames from 'classnames';
import styles from './MessageSection.module.scss';

interface Props {
	title: string;
	subtitle: string;
	message: string;
	btnText: string;
	btnSlug: string;
	bg?: 'green';
	goToOfferForm?: boolean;
}

export const MessageSection: FC<Props> = ({
	title,
	subtitle,
	message,
	btnText,
	btnSlug,
	bg,
	goToOfferForm
}) => {
	const { isMobile } = useDevice();
	const { setFocusFirstOfferFormField } = useCommon();

	const ref = useRef<HTMLDivElement | null>(null);
	const isView = useIsView(ref, {
		threshold: 1,
		once: true
	});

	useEffect(() => {
		if (goToOfferForm) setFocusFirstOfferFormField(true);
	}, [goToOfferForm]);

	return (
		<section ref={ref}>
			<div className='container'>
				<div
					className={classNames(styles.block, {
						[styles.greenBg]: bg
					})}>
					<div className={styles.content}>
						<h2 className='text-96'>{title}</h2>
						<h5 className='text-18-14'>{subtitle}</h5>
						{isMobile && (
							<HeroAnimationCar text={message} data-scroll-right={isView ? 'show' : 'hide'} />
						)}
						<Button btnTo={btnSlug}>{btnText}</Button>
					</div>
					{!isMobile && (
						<HeroAnimationCar text={message} data-scroll-right={isView ? 'show' : 'hide'} />
					)}
				</div>
			</div>
		</section>
	);
};
