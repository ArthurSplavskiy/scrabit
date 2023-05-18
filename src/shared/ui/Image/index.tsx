import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';
import styles from './index.module.scss';

type Props = {
	src: string;
	lazy?: boolean;
	alt?: string;
	className?: string;
	scaleInScroll?: boolean;
};

const Image = ({ lazy = false, src, alt = '', className, scaleInScroll }: Props) => {
	const { ref, inView } = useInView({
		threshold: 0,
		triggerOnce: true
	});
	const { ref: imgRef, inView: imgInView } = useInView({
		threshold: 0.2,
		triggerOnce: true
	});

	return (
		<div
			ref={ref}
			data-image-scale-in={scaleInScroll ? true : false}
			className={classNames(className, styles.Image, {
				[styles.skeleton]: lazy && !inView,
				[styles.scaleIn]: imgInView
			})}>
			{lazy && inView ? <img src={src} alt={alt} /> : <img data-src={src} alt={alt} />}
			{!lazy && <img src={src} alt={alt} />}
			<div className={styles.bottomLine} ref={imgRef}></div>
		</div>
	);
};

export default Image;
