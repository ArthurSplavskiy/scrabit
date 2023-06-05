import { useDevice } from '@/app/context/Device/DeviceContext';
import { HeroAnimationCar } from '@/entities/HeroAnimationCar';
import { withZero } from '@/shared/helpers';
import { SectionHead } from '@/shared/ui/SectionHead';
import classNames from 'classnames';
import styles from './HowItWorkSection.module.scss';
import { IHowItWorkSection } from './interface';
import { FC, useRef } from 'react';
import AnimateInView from '@/shared/ui/AnimateInView';
import { useIsView } from '@/shared/hooks/useIsView';

interface Props {
	data?: IHowItWorkSection;
	page?: 'home';
}

export const HowItWorkSection: FC<Props> = ({ data, page }) => {
	const { isDesktop } = useDevice();

	const ref = useRef<HTMLDivElement | null>(null);
	const isView = useIsView(ref, {
		threshold: 0.5,
		once: true
	});

	if (!data?.steps.length) return <div ref={ref}></div>;

	return (
		<section id='how-it-works' className={styles.section}>
			<div className='container'>
				{isDesktop && <SectionHead title={data?.title} subtitle={data?.subtitle} />}
				<div ref={ref} className={styles.sectionContent}>
					<div className={styles.sectionImg} data-scroll-left={isView ? 'show' : 'hide'}>
						<HeroAnimationCar
							text={
								page === 'home'
									? 'Don’t think your car deserves a second chance? We’ll prove you wrong'
									: 'The best years of your car longpassed? we will help send it to a better place.'
							}
							direct='left'
						/>
					</div>
					<div className={styles.sectionSteps}>
						{!isDesktop && <SectionHead title={data?.title} subtitle={data?.subtitle} />}
						{data?.steps.map((step, index) => (
							<AnimateInView key={index}>
								<div
									className={classNames(styles.sectionStep, {
										[styles.blueBg]: index === 0
									})}>
									<div className={classNames('text-18', styles.sectionStepNumber)}>
										{withZero(index + 1)}. step
									</div>
									<h4 className='text-40-24'>{step.title}</h4>
									<p className='text-16'>{step.text}</p>
								</div>
							</AnimateInView>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
