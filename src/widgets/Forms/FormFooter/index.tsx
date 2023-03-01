import { FC } from 'react';
import { Link } from 'react-router-dom';
import './FormFooter.scss';

interface Props {
	leftText: string | undefined;
	rightText: string | undefined;
	linkCallback: () => void;
}

export const FormFooter: FC<Props> = ({ linkCallback, leftText, rightText }) => {
	return (
		<div className='FormFooter'>
			<div className='FormFooter-link'>
				<div>{leftText}</div>
				<button onClick={linkCallback}>{rightText}</button>
			</div>
			<div className='FormFooter-policy'>
				Натиснавши на кнопку, ви даєте згоду на обробку персональних даних та погоджуєтеся з
				<Link to='/privacy-policy'> політикою конфіденційності</Link> та
				<Link to='/'> угодою публічної оферти</Link>
			</div>
		</div>
	);
};
