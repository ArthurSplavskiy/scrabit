import { withZero } from '@/shared/helpers';
import { SectionHead } from '@/shared/ui/SectionHead';
import classNames from 'classnames';
import { useHomeAbout } from '@/pages/HomePage/HomePageContext';
import styles from './AboutSection.module.scss';
import { IAboutSection } from './interface';
import { FC } from 'react';

interface Props {
	data?: IAboutSection;
}

export const AboutSection: FC<Props> = ({ data }) => {
	return (
		<section id='about-scrabit' className={styles.section}>
			<div className='container'>
				<SectionHead title={data?.title} subtitle={data?.subtitle} />
				<div className={styles.sectionContent}>
					<div className={classNames('-image-ibg', styles.sectionImg)}>
						<img src='/images/home/about-placeholder.png' alt={data?.title} />
						{/* {data?.image} */}
					</div>
					<div className={styles.sectionSteps}>
						{data?.steps.map((step, index) => (
							<div key={index} className={styles.sectionStep}>
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
