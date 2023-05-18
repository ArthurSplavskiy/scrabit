import classNames from 'classnames';
import { FC, useRef } from 'react';
import { useIsView } from '@/shared/hooks/useIsView';
import './SectionHead.scss';

interface Props {
	title: string | undefined;
	subtitle?: string | undefined;
}

export const SectionHead: FC<Props> = ({ title, subtitle }) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const isView = useIsView(ref, {
		threshold: 1,
		once: true
	});
	return (
		<div ref={ref}>
			{title && (
				<div
					className={classNames('SectionHead', {
						'only-title': !subtitle
					})}>
					<h2 className='text-40-24' data-scroll-up={isView ? 'show' : 'hide'}>
						{title}
					</h2>
					{subtitle && (
						<p
							className='text-18-14'
							data-scroll-up={isView ? 'show' : 'hide'}
							data-scroll-delay='0.3'>
							{subtitle}
						</p>
					)}
				</div>
			)}
		</div>
	);
};
