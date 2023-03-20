import classNames from 'classnames';
import { FC, Fragment, ReactNode } from 'react';
import { AuthorFAQ } from '../../HelpArticleTypes';
import styles from './index.module.scss';
import ava from './ava.jpeg';
import ic from './ic.svg';
import { Link } from 'react-router-dom';

interface Props {
	color?: 'green';
	index: number;
	slug: string;
	title: string;
	subtitle: string;
	icon?: ReactNode;
	authors: AuthorFAQ[];
	articlesCount: number;
}

export const HelpArticleCard: FC<Props> = ({
	index,
	title,
	subtitle,
	icon,
	authors,
	articlesCount,
	slug,
	color
}) => {
	const Card = () => (
		<div
			className={classNames(styles.card, {
				[styles.blue]: index === 1 || index === 5,
				[styles.grey]: index === 2,
				[styles.white]: index === 3,
				[styles.greenCard]: color === 'green'
			})}>
			<div className={styles.head}>
				<h3 className={color === 'green' ? 'text-40-16' : 'text-24-18'}>{title}</h3>
				<div className={styles.icon}>
					<img src={ic} alt={title} />
				</div>
			</div>
			<p className='text-16-14'>{subtitle}</p>
			<div className={styles.info}>
				<div className={styles.authors}>
					{authors.map((a, idx) => (
						<Fragment key={idx}>
							{idx > 2 ? (
								<div className={styles.authorCount} style={{ zIndex: 5, marginLeft: '-10px' }}>
									+{authors.length - 3}
								</div>
							) : (
								<div className={styles.author} style={{ zIndex: idx + 1, marginLeft: `-10px` }}>
									<img src={ava} alt={a.name} />
								</div>
							)}
						</Fragment>
					))}
				</div>
				<div>
					<span className={classNames(styles.articlesCount, 'text-16-14')}>
						{articlesCount} articles in this collection
					</span>
					<p className={classNames(styles.authorsText, 'text-16-14')}>
						Written by{' '}
						<>
							{authors.length > 3 ? (
								<>
									<span className={styles.authorName}>{authors[0].name}, </span>
									<span className={styles.authorName}>{authors[1].name}, </span>
									<span className={styles.authorName}>{authors[2].name}</span> and{' '}
									{authors.length - 3} other
								</>
							) : null}
							{authors.length === 3 ? (
								<>
									<span className={styles.authorName}>{authors[0].name}, </span>
									<span className={styles.authorName}>{authors[1].name}</span> and{' '}
									<span className={styles.authorName}>{authors[2].name}</span>
								</>
							) : null}
							{authors.length === 2 ? (
								<>
									<span className={styles.authorName}>{authors[0].name}</span> and{' '}
									<span className={styles.authorName}>{authors[1].name}</span>
								</>
							) : null}
							{authors.length === 1 ? (
								<span className={styles.authorName}>{authors[0].name}</span>
							) : null}
						</>
					</p>
				</div>
			</div>
		</div>
	);
	return (
		<>
			{color === 'green' ? (
				<Card />
			) : (
				<Link to={slug}>
					<Card />
				</Link>
			)}
		</>
	);
};
