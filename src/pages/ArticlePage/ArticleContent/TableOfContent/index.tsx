import { FC, useEffect } from 'react';
import { createStickyNav } from './utils';
import { scrollToBlock } from '@/shared/helpers/scrollToBlock';
import styles from './TableOfContent.module.scss';
import classNames from 'classnames';

interface Props {
	content: string[];
}

export const TableOfContent: FC<Props> = ({ content }) => {
	useEffect(() => {
		setTimeout(() => {
			createStickyNav();
		}, 500);
	}, []);

	return (
		<div className={styles.content}>
			<div className={styles.head}>
				<h3>Content</h3>
			</div>
			{content.map((c, idx) => (
				<div
					key={idx}
					className={classNames(styles.item, 'anchor')}
					onClick={() => {
						scrollToBlock(`article-title-${idx}`);
					}}>
					{c}
				</div>
			))}
		</div>
	);
};
