import { FC, useRef } from 'react';
import { IReviewSection } from './interface';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import { Icon } from '@/shared/ui/Icon/Icon';
import { uid } from '@/shared/helpers';
import { useDevice } from '@/app/context/Device/DeviceContext';
import { Button } from '@/shared/ui/Button';
import classNames from 'classnames';
import styles from './ReviewSection.module.scss';
import logo from './logo.svg';

interface Props {
	data?: IReviewSection[];
}

export const ReviewSection: FC<Props> = ({ data }) => {
	const prevBtn = useRef<HTMLButtonElement>(null);
	const nextBtn = useRef<HTMLButtonElement>(null);
	const paginationRef = useRef<HTMLDivElement>(null);
	const { isMobile, isDesktop } = useDevice();

	return (
		<section className={styles.section}>
			<div className='container'>
				<div className={styles.sectionHead}>
					<img src={logo} alt='trustpilot' />
				</div>
				<div className={styles.sectionContent}>
					{data?.length ? (
						<Swiper
							className={styles.sectionSlider}
							modules={[Navigation, Pagination, Autoplay]}
							autoHeight={true}
							slidesPerView={isMobile ? 1 : isDesktop ? 2 : 3}
							spaceBetween={isMobile ? 12 : 35}
							autoplay={{
								delay: 2500
							}}
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
							}}>
							{data?.map((slide, index) => (
								<SwiperSlide key={index} className={styles.sectionSlide}>
									<div className={styles.slide}>
										<div className={styles.slideHead}>
											<div className={styles.slideRating}>
												{new Array(slide.rating).fill(undefined).map((_) => (
													<Icon key={uid()} icon='star' size='12'></Icon>
												))}
											</div>
											<div className={styles.slideVerify}>
												<Icon icon='double-check' size='12' />
											</div>
										</div>
										<div className={styles.slideBody}>
											<span className='text-18'>{slide.author}</span>
											<p className='text-16-14'>{slide.text}</p>
										</div>
									</div>
								</SwiperSlide>
							))}
							{!isDesktop && data?.length > 3 ? (
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
							) : null}
						</Swiper>
					) : null}
				</div>
				<div className={styles.read}>
					<Button>Read reviews</Button>
				</div>
			</div>
		</section>
	);
};
