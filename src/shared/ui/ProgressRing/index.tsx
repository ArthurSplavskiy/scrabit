import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

interface CircleProps {
	progress: number;
}

export const ProgressRing: React.FC<CircleProps> = ({ progress }) => {
	const circleRef = useRef<SVGCircleElement>(null);
	const [offset, setOffset] = useState(0);
	const [circumference, setСircumference] = useState(0);

	useEffect(() => {
		if (circleRef.current) {
			const circumference = 2 * Math.PI * circleRef.current.r.baseVal.value;
			const newOffset = circumference - (progress / 100) * circumference;
			setOffset(newOffset);
			setСircumference(circumference);
		}
	}, [progress]);

	return (
		<div className={styles.ring}>
			<svg className={styles.progressRing} width='32' height='32'>
				<circle
					ref={circleRef}
					className={styles.progressRingCircle}
					stroke='#fff'
					strokeWidth='2'
					fill='transparent'
					r='12'
					cx='16'
					cy='16'
					style={{ strokeDashoffset: offset, strokeDasharray: circumference }}></circle>
			</svg>
			{/* <div className={styles.percentText}>
				<span className={styles.percentValue}>{progress}</span>%
			</div> */}
		</div>
	);
};
