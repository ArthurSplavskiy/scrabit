import { FC } from 'react';
import styles from './index.module.scss';
import { v4 as uuidv4 } from 'uuid';

interface Props {
	handleRadioChange: (...args: any[]) => void;
	label: string;
	radioList: { label: string; value: string }[];
	radioState: string;
}

export const RadioButtonsGroup: FC<Props> = ({
	handleRadioChange,
	label,
	radioList,
	radioState
}) => {
	return (
		<div className={styles.radioBoxesGroup}>
			<p className={styles.radioBoxesLabel}>{label}</p>
			<div className={styles.radioBoxes}>
				{radioList.map((item) => {
					const id = uuidv4();
					return (
						<div key={item.value} className={styles.radioBox}>
							<input
								type='radio'
								name='radio'
								id={id}
								onChange={handleRadioChange}
								value={item.value}
								checked={radioState === item.value}
							/>
							<label htmlFor={id}>
								<div className={styles.radioCheck}></div>
								{item.label}
							</label>
						</div>
					);
				})}
			</div>
			<span className={styles.errorOops}>Oops. Missed one.</span>
		</div>
	);
};
