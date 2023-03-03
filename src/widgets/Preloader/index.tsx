import classNames from 'classnames';
import { FC, useEffect, useRef } from 'react';
import styles from './Preloader.module.scss';

interface Props {
	hide?: boolean;
}

export const Preloader: FC<Props> = ({ hide }) => {
	const preloaderRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (hide) {
			setTimeout(() => {
				preloaderRef.current?.remove();
			}, 300);
		}
	}, [hide]);

	return (
		<div
			className={classNames(styles.preloader, {
				[styles.hide]: hide
			})}
			ref={preloaderRef}></div>
	);
};
