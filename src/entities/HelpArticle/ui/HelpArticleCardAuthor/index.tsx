import { FC } from 'react';
import { AuthorFAQ } from '../../HelpArticleTypes';
import styles from './index.module.scss';
import ava from './ava.jpeg';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
	slug?: string;
	title: string;
	subtitle: string;
	author: AuthorFAQ;
	createdAt: string;
	withBorder?: boolean;
}

export const HelpArticleCardAuthor: FC<Props> = ({
	title,
	subtitle,
	slug,
	author,
	createdAt,
	withBorder
}) => {
	const { category } = useParams();
	const Card = ({ withOutHover }: { withOutHover: boolean }) => (
		<div
			className={classNames(styles.card, {
				[styles.withBorder]: withBorder,
				[styles.withoutHover]: withOutHover === false
			})}>
			<div className={styles.head}>
				<h3 className={'text-18-14'}>{title}</h3>
				<p className='text-16-14'>{subtitle}</p>
			</div>
			<div className={styles.info}>
				<div className={styles.authorAvatar}>
					<img src={ava} alt={author.name} />
				</div>
				<div className={styles.authorsText}>
					<p className={'text-16-14'}>
						Written by <span>{author.name}</span>
					</p>
					<p className={'text-16-14'}>updated {createdAt}</p>
				</div>
			</div>
		</div>
	);
	return (
		<>
			{slug ? (
				<Link to={'/help-center/' + category + '/' + slug}>
					<Card withOutHover={true} />
				</Link>
			) : (
				<Card withOutHover={false} />
			)}
		</>
	);
};
