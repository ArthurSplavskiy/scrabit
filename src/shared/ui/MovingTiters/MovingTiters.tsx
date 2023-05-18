import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import styles from './MovingTiters.module.scss';

interface Props {
	size?: 'small';
	text: string;
	speed?: number;
}

export const MovingTiters = ({ size, text, speed }: Props) => {
	const titerMainRef = useRef<HTMLDivElement | null>(null);
	const [speedText] = useState<number>(speed || 50);

	function titersSpeed() {
		const nodeLists = titerMainRef.current?.children as HTMLCollection;
		let lists = Array.from(nodeLists || []);
		lists.forEach((item) => {
			const itemLi = item as HTMLElement;
			let speed = speedText;
			let res = parseInt(String(itemLi.offsetWidth / speed));
			itemLi.style.animationDuration = res + 's';
		});
	}

	useEffect(() => {
		titersSpeed();

		const resizeHandler = () => {
			titersSpeed();
		};

		window.addEventListener('resize', resizeHandler);

		return () => window.removeEventListener('resize', resizeHandler);
	}, []);

	return (
		<div
			data-fade-in-up
			className={classNames(styles.titers, {
				[styles.titersSmall]: size === 'small'
			})}>
			<div ref={titerMainRef} className={styles.titersMain}>
				<ul className={styles.titersList}>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
				</ul>
				<ul className={styles.titersList}>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
					<li className={styles.titersItem}>{text}</li>
				</ul>
			</div>
		</div>
	);
};
