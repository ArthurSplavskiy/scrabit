import { FC, useEffect } from 'react';
import { DomElement } from 'htmlparser2';
import { createStickyNav } from './utils';
import './TableOfContent.scss';
import { scrollToBlock } from '@/shared/helpers/scrollToBlock';

interface Props {
	content: DomElement[];
}

export const TableOfContent: FC<Props> = ({ content }) => {
	useEffect(() => {
		setTimeout(() => {
			createStickyNav();
		}, 500);
	}, []);

	return (
		<div className={'content'}>
			<div className={'head'}>
				<h3>Content</h3>
			</div>
			{content.map((c, idx) => (
				<div
					key={idx}
					className={'item anchor'}
					onClick={() => {
						scrollToBlock(`article-title-${idx}`);
					}}>
					{c.data}
				</div>
			))}
		</div>
	);
};
