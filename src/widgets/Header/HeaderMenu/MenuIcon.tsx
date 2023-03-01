import { DetailedHTMLProps, FC } from 'react';
import styles from './MenuIcon.module.scss';

interface IMenuIconProps
	extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	active: boolean;
}

export const MenuIcon: FC<IMenuIconProps> = ({ active, ...props }) => {
	return (
		<div className={styles.menuIconText} {...props}>
			<div className={`${styles.menuIconCircle} ${active ? styles.active : ''}`}>
				<div className={`MenuIcon ${styles.menuIcon} ${active ? styles.active : ''}`}>
					<span></span>
				</div>
			</div>
			<span className='text-12'>Menu</span>
		</div>
	);
};
