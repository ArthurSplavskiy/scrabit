import { useEffect, useRef, useState } from 'react';

export const useScrollY = (): {
	scrollY: number;
	direction: number;
	setScrollY: (y: number) => void;
} => {
	const isBrowser = typeof window !== undefined;
	const timerRef = useRef<ReturnType<typeof setTimeout>>();

	const [scrollY, setScrollY] = useState<number>(0);
	const [direction, setDirection] = useState<number>(0);
	let lastScrollTop = 0;

	const handleScroll = (e: any): void => {
		clearTimeout(timerRef.current);
		const currentScroll = isBrowser ? window.scrollY : 0;
		setScrollY(currentScroll);

		let st = window.pageYOffset || document.documentElement.scrollTop;
		if (st > lastScrollTop) {
			setDirection(1);
		} else if (st < lastScrollTop) {
			setDirection(-1);
		}
		lastScrollTop = st <= 0 ? 0 : st;

		timerRef.current = setTimeout(() => {
			setDirection(-1);
		}, 500);
	};

	useEffect(() => {
		setScrollY(window.scrollY);
		window.addEventListener('scroll', handleScroll, { passive: true });

		setTimeout(() => {
			if (window.pageYOffset > 0) {
				setScrollY(window.pageYOffset);
			}
		}, 1000);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return { scrollY, direction, setScrollY };
};
