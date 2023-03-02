import { SectionHead } from '@/shared/ui/SectionHead';
import { FC, useRef } from 'react';
import { IBlogPostSlider } from './interface';
import styles from './BlogPostSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { Navigation, Pagination } from 'swiper';
import classNames from 'classnames';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Button } from '@/shared/ui/Button';
import { SliderCard } from '@/entities/Blogpost/ui/SliderCard';

interface Props {
	data?: IBlogPostSlider;
}

export const BlogPostSlider: FC<Props> = ({ data }) => {
	const prevBtn = useRef<HTMLButtonElement>(null);
	const nextBtn = useRef<HTMLButtonElement>(null);
	const paginationRef = useRef<HTMLDivElement>(null);
	const { isMobile, isDesktop } = useDevice();
	return (
		<section className={styles.section}>
			<div className='container'>
				<SectionHead title={data?.title} subtitle={data?.subtitle} />
				<div className={styles.sectionContent}>
					{data?.blogposts?.length ? (
						<Swiper
							className={styles.sectionSlider}
							modules={[Navigation, Pagination]}
							autoHeight={true}
							slidesPerView={isMobile ? 1 : isDesktop ? 2 : 3}
							spaceBetween={isMobile ? 12 : 35}
							pagination={{
								el: paginationRef.current,
								clickable: true
							}}
							navigation={{
								prevEl: prevBtn.current,
								nextEl: nextBtn.current
							}}
							onBeforeInit={(swiper: any): void => {
								swiper.params.navigation.prevEl = prevBtn.current;
								swiper.params.navigation.nextEl = nextBtn.current;
								swiper.params.pagination.el = paginationRef.current;
							}}
							style={{ overflow: 'visible' }}>
							{data?.blogposts?.map((slide, index) => (
								<SwiperSlide key={index} className={styles.sectionSlide}>
									<SliderCard
										image={slide?.image}
										title={slide?.title}
										createdAt={slide?.createdAt}
										slug={slide?.slug}
										tag={slide?.tag}
									/>
								</SwiperSlide>
							))}
							<div className='swiper-controls'>
								<button
									className={classNames('swiper-btn swiper-btn-prev', styles.sliderPrev)}
									ref={prevBtn}>
									<span>
										<Icon icon='slider-arrow' color='black' />
									</span>
								</button>
								<div className={styles.sliderPagination} ref={paginationRef}></div>
								<button
									className={classNames('swiper-btn swiper-btn-next', styles.sliderNext)}
									ref={nextBtn}>
									<span>
										<Icon icon='slider-arrow' color='black' />
									</span>
								</button>
							</div>
						</Swiper>
					) : null}
				</div>
				<div className={styles.read}>
					<Button btnTo='/blog'>more news</Button>
				</div>
			</div>
		</section>
	);
};
