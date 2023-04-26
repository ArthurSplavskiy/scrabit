import { Icon } from '@/shared/ui/Icon/Icon';
import styles from './index.module.scss';
import { FC } from 'react';
import { useDevice } from '@/app/context/Device/DeviceContext';

interface Props {
	clickFn: (...args: any[]) => void;
}

export const CallbackWidget: FC<Props> = ({ clickFn }) => {
	const { isMobile } = useDevice();
	return (
		<button
			className={styles.phone}
			onClick={() => {
				clickFn();
			}}>
			<Icon icon='phone' size={isMobile ? '16' : '24'} />
		</button>
	);
};
