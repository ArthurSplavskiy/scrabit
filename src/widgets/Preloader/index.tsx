import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import styles from './Preloader.module.scss';

interface Props {
	hide?: boolean;
}

export const Preloader: FC<Props> = ({ hide }) => {
	const [isHide, setIsHide] = useState(false);

	useEffect(() => {
		if (hide) {
			setTimeout(() => {
				setIsHide(true);
			}, 300);
		}
	}, [hide]);

	return (
		<div
			className={classNames(styles.preloader, {
				[styles.hide]: isHide
			})}></div>
	);
};
