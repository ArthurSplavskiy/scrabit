import { FC, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface Props {
	homepageIsFirst?: boolean;
}

export const Breadcrumbs: FC<Props> = ({ homepageIsFirst }) => {
	let location = useLocation();

	const slugNormalize = (slug: string) => {
		const arr = slug.split('-');
		const normalizeArr = [];
		for (let i = 0; i < arr.length; i++) {
			let el = arr[i];
			if (i === 0) {
				el = el.slice(1)[0].toUpperCase() + el.slice(2);
				normalizeArr.push(el);
			} else {
				el = el[0].toUpperCase() + el.slice(1);
				normalizeArr.push(el);
			}
		}
		return normalizeArr.join(' ');
	};

	const getURLParam = (idx: number) => location.pathname.split('/').filter((str) => str)[idx];
	const getParams = () => location.pathname.split('/').filter((str) => str);

	return (
		<nav className={styles.breadcrumbs}>
			<ul>
				{getParams().length === 1 || homepageIsFirst ? (
					<li>
						<Link to='/'>Homepage</Link>
					</li>
				) : (
					getParams()
						.slice(0, -1)
						.map((_, idx) => (
							<Fragment key={idx}>
								{idx === 0 ? (
									<li>
										<Link to={`/${getURLParam(idx)}`}>{slugNormalize('/' + getURLParam(idx))}</Link>
									</li>
								) : (
									<li>
										<Link to={`/${getURLParam(idx - 1)}/${getURLParam(idx)}`}>
											{slugNormalize('/' + getURLParam(idx))}
										</Link>
									</li>
								)}
							</Fragment>
						))
				)}
				<li>
					<span>
						{slugNormalize(
							'/' + location.pathname.split('/')[location.pathname.split('/').length - 1]
						)}
					</span>
				</li>
			</ul>
		</nav>
	);
};
