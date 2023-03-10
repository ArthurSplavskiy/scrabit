import { FC } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface Props {
	links?: string[];
}

export const Breadcrumbs: FC<Props> = ({ links }) => {
	let location = useLocation();
	const params = useParams();

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

	return (
		<nav className={styles.breadcrumbs}>
			<ul>
				<li>
					<Link to='/'>Homepage</Link>
				</li>
				{links?.map((slug, idx) => (
					<li key={idx}>
						<Link to={slug}>
							{slugNormalize('/' + slug.split('/')[slug.split('/').length - 1])}
						</Link>
					</li>
				))}
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
