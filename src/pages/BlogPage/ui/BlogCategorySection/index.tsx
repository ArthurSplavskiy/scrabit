import { useDevice } from '@/app/context/Device/DeviceContext';
import { IBlogRecord } from '@/entities/BlogRecord/interface';
import { CategoryRecordCard } from '@/entities/BlogRecord/ui/CategoryRecordCard';
import { PromoRecordCard } from '@/entities/BlogRecord/ui/PromoRecordCard';
import classNames from 'classnames';
import { FC, useRef } from 'react';
import { useRecordsByCategory } from '../../hooks/useRecordsByCategory';
import styles from './BlogCategorySection.module.scss';
import { useIsView } from '@/shared/hooks/useIsView';

interface Props {
	withBlueBg?: boolean;
	withTopOffset?: boolean;
	data?: IBlogRecord[];
	subtitle?: string;
	lastSection?: boolean;
	slug: string;
	categoryTitle: string;
}

export const BlogCategorySection: FC<Props> = ({
	withBlueBg,
	withTopOffset,
	subtitle,
	slug,
	categoryTitle,
	lastSection
}) => {
	const { isMobile } = useDevice();
	const { data } = useRecordsByCategory(slug);

	const ref = useRef<HTMLDivElement | null>(null);
	const isView = useIsView(ref, {
		threshold: 0.2,
		once: true
	});

	return (
		<div
			ref={ref}
			id={slug}
			className={classNames(styles.block, {
				'blue-section': withBlueBg,
				'section-offset': withTopOffset,
				'mb-0': lastSection
			})}>
			<div className='container'>
				<div className={styles.section}>
					<div className={styles.head}>
						<h4 className='text-40-24' data-scroll-up={isView ? 'show' : 'hide'}>
							{categoryTitle}
						</h4>
						<h5 data-scroll-up={isView ? 'show' : 'hide'} data-scroll-delay='0.3'>
							{subtitle}
						</h5>
					</div>
					<div className={styles.content}>
						<div className={styles.promoCard}>
							{data?.[0] && (
								<PromoRecordCard
									bgColor={withBlueBg && isMobile ? 'white' : undefined}
									image={data[0].image}
									title={data[0].title}
									createdAt={data[0].createdAt}
									slug={data[0].slug}
									tag={data[0].tag}
								/>
							)}
						</div>
						<div className={styles.otherCards}>
							{data?.map((r, idx) => {
								if (idx === 0) return;
								return (
									<CategoryRecordCard
										key={idx}
										image={r.image}
										title={r.title}
										createdAt={r.createdAt}
										slug={r.slug}
										tag={r.tag}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
