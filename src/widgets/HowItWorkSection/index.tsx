import { useDevice } from '@/app/context/Device/DeviceContext';
import { HeroAnimationCar } from '@/entities/HeroAnimationCar';
import { withZero } from '@/shared/helpers';
import { SectionHead } from '@/shared/ui/SectionHead';
import classNames from 'classnames';
import styles from './HowItWorkSection.module.scss';
import { IHowItWorkSection } from './interface';
import { FC } from 'react';

interface Props {
	data?: IHowItWorkSection;
}

export const HowItWorkSection: FC<Props> = ({ data }) => {
	const { isDesktop } = useDevice();
	return (
		<section id='how-it-works' className={styles.section}>
			<div className='container'>
				{isDesktop && <SectionHead title={data?.title} subtitle={data?.subtitle} />}
				<div className={styles.sectionContent}>
					<div className={styles.sectionImg}>
						<HeroAnimationCar text={'How to sell a car quickly'} direct='left' />
					</div>
					<div className={styles.sectionSteps}>
						{!isDesktop && <SectionHead title={data?.title} subtitle={data?.subtitle} />}
						{data?.steps.map((step, index) => (
							<div
								key={index}
								className={classNames(styles.sectionStep, {
									[styles.blueBg]: index === 0
								})}>
								<div className={classNames('text-18', styles.sectionStepNumber)}>
									{withZero(index + 1)}. step
								</div>
								<h4 className='text-40-24'>{step.title}</h4>
								<p className='text-16'>{step.text}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
