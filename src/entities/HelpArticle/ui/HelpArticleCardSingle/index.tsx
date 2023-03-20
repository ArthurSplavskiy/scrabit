import { AuthorFAQ } from '@/entities/HelpArticle/HelpArticleTypes';
import { HelpArticleCardAuthor } from '@/entities/HelpArticle/ui/HelpArticleCardAuthor';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';

interface Props {
	author: AuthorFAQ;
	createdAt: string;
	fullText: string;
	question: string;
	title: string;
}

export const HelpArticleCardSingle: FC<Props> = ({
	author,
	createdAt,
	fullText,
	question,
	title
}) => {
	const { slug } = useParams();
	const [activeReaction, setActiveReaction] = useState(-1);

	useEffect(() => {
		if (activeReaction > -1) {
			Cookies.set(`active-reaction-${slug}`, activeReaction.toString() + slug);
		}
	}, [activeReaction]);

	useEffect(() => {
		const activeIndex = Cookies.get(`active-reaction-${slug}`)?.slice(0, 1) || -1;
		const cookieSlug = Cookies.get(`active-reaction-${slug}`)?.slice(1) || -1;
		if (slug === cookieSlug) setActiveReaction(+activeIndex);
	}, [slug]);

	return (
		<div className='container'>
			<div className={styles.block}>
				<HelpArticleCardAuthor
					withBorder={true}
					title={title}
					subtitle={question}
					author={author}
					createdAt={createdAt}
				/>
				<div className={styles.content}>
					<p className={classNames(styles.fullText, 'text-16-14')}>{fullText}</p>
					<div className={styles.reaction}>
						<h3>Did this answer your question?</h3>
						<div className={styles.emoji}>
							<button
								onClick={() => setActiveReaction(1)}
								className={classNames(styles.emojiBtn, {
									[styles.Active]: activeReaction === 1,
									[styles.notActive]: activeReaction === 2 || activeReaction === 3
								})}>
								😞
							</button>
							<button
								onClick={() => setActiveReaction(2)}
								className={classNames(styles.emojiBtn, {
									[styles.Active]: activeReaction === 2,
									[styles.notActive]: activeReaction === 1 || activeReaction === 3
								})}>
								😐
							</button>
							<button
								onClick={() => setActiveReaction(3)}
								className={classNames(styles.emojiBtn, {
									[styles.Active]: activeReaction === 3,
									[styles.notActive]: activeReaction === 1 || activeReaction === 2
								})}>
								😃
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
