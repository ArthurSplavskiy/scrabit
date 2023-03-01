import { useEffect, useState } from 'react';

export const useResizer = (...args: any[]) => {
	const [argsState, setArgsState] = useState<any[]>(args);
	const handler = () => {
		setArgsState(argsState);
	};
	useEffect(() => {
		window.addEventListener('resize', handler);
		() => {
			window.removeEventListener('resize', handler);
		};
	}, []);

	return {
		...args
	};
};
