import { HelpArticleCardAuthor } from '@/entities/HelpArticle/ui/HelpArticleCardAuthor';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { Icon } from '@/shared/ui/Icon/Icon';
import classNames from 'classnames';
import { FC, useRef, useState } from 'react';
import { useSearchArticles } from '../../hooks/useSearchArticles';
import styles from './SearchBarTool.module.scss';

export const SearchBarTool: FC = () => {
	const searchbarRef = useRef<HTMLDivElement | null>(null);
	const [value, setValue] = useState('');
	const debounceSearch = useDebounce(value, 300);
	const { data, isFetching } = useSearchArticles(debounceSearch);
	useClickOutside(searchbarRef, () => setValue(''));

	return (
		<div ref={searchbarRef} className={styles.searchBar}>
			<div
				className={classNames(styles.searchBarInput, {
					[styles.searchBarInputOpen]: value.length > 2
				})}>
				<input
					type='text'
					placeholder='Search'
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<div className={styles.searchBarInputIcon}>
					{value.length > 2 ? (
						<button onClick={() => setValue('')}>
							<Icon icon='close' color='black' size={'12'} />
						</button>
					) : (
						<Icon icon='search' />
					)}
				</div>
			</div>
			<div
				className={classNames(styles.searchBarBody, {
					[styles.searchBarBodyOpen]: value.length > 2
				})}>
				<div className={styles.searchBarBodyInner}>
					{isFetching && <div className='loader' style={{ maxHeight: '150px' }}></div>}
					{!data?.length && (
						<span className={styles.notFind}>
							We couldn't find any articles for: <span>{value}</span>
						</span>
					)}
					{data?.map((item, idx) => (
						<div key={idx} className={styles.searchBarBodyItem}>
							<HelpArticleCardAuthor
								slug={item.slug}
								createdAt={item.createdAt}
								title={item.title}
								author={item.author}
								subtitle={item.question}
								withBorder={true}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
