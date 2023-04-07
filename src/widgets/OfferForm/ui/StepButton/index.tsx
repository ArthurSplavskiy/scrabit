import classNames from 'classnames';
import styles from './index.module.scss';
import { FC } from 'react';
import { Icon } from '@/shared/ui/Icon/Icon';

interface Props {
	name: string;
	active: boolean;
	disable: boolean;
}

export const StepButton: FC<Props> = ({ name, active, disable }) => {
	return (
		<button
			type='button'
			className={classNames(styles.btn, {
				[styles.active]: active,
				[styles.disable]: disable
			})}>
			<div className={styles.checker}>{active && <Icon icon='check' size={'12'} />}</div>
			<span>{name}</span>
		</button>
	);
};
