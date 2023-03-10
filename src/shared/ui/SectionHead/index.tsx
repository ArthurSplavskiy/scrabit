import classNames from 'classnames';
import { FC } from 'react';
import './SectionHead.scss';

interface Props {
	title: string | undefined;
	subtitle?: string | undefined;
}

export const SectionHead: FC<Props> = ({ title, subtitle }) => {
	return (
		<>
			{title && (
				<div
					className={classNames('SectionHead', {
						'only-title': !subtitle
					})}>
					<h2 className='text-40-24'>{title}</h2>
					{subtitle && <p className='text-18-14'>{subtitle}</p>}
				</div>
			)}
		</>
	);
};
