import { SearchRecordCard } from '@/entities/BlogRecord';
import { IBlogRecord } from '@/entities/BlogRecord/interface';
import { useSearchRecords } from '@/pages/BlogPage/hooks/useSearchRecords';
import { uid } from '@/shared/helpers';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { Icon } from '@/shared/ui/Icon/Icon';
import classNames from 'classnames';
import { FC, useRef, useState } from 'react';
import styles from './SearchBar.module.scss';

export const SearchBar: FC = () => {
	const searchbarRef = useRef<HTMLDivElement | null>(null);
	const [value, setValue] = useState('');
	const debounceSearch = useDebounce(value, 300);
	const { data, isFetching } = useSearchRecords(debounceSearch);
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
							<SearchRecordCard
								image={item.image}
								title={item.title}
								createdAt={item.createdAt}
								slug={item.slug}
								tag={item.tag}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
