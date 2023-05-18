import { useQuery } from 'react-query';
import { queryKeys } from '@/app/queryClient/queryKeys';
import { useNavigate, useParams } from 'react-router-dom';
import { useCommon } from '@/app/context/Common/CommonContext';
import { useLayoutEffect } from 'react';
import api from './api';
import styles from './index.module.scss';
import { MessageSection } from '@/widgets/MessageSection';
import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import { Preloader } from '@/widgets/Preloader';

interface IStaticData {
	page_title: string;
	last_updated: string;
	text: string;
}

export default function StaticPage() {
	const { slug } = useParams();
	const navigate = useNavigate();
	const { setPageIsLoaded } = useCommon();

	const { data, isLoading, isError } = useQuery<IStaticData>([queryKeys.static, slug], () =>
		api.getStaticPageData(slug || '')
	);

	if (isError) {
		navigate('/404');
	}

	useLayoutEffect(() => {
		if (!isLoading) {
			setPageIsLoaded(true);
		}
		return () => {
			setPageIsLoaded(false);
		};
	}, [isLoading]);

	return (
		<>
			<Preloader />
			<div className={'container'}>
				<div className={styles.page}>
					<Breadcrumbs />
					<main className={styles.pageContent}>
						<div className={styles.lastUpdated}>
							Last updated: <span>{data?.last_updated}</span>
						</div>
						<h1>{data?.page_title}</h1>
						{/* <div className={styles.text} >{data?.text && ReactHtmlParser(data.text)}</div> */}
						{data?.text && (
							<div className={styles.text} dangerouslySetInnerHTML={{ __html: data.text }} />
						)}
					</main>
				</div>
			</div>
			<MessageSection
				title={'Scrabit’s buying'}
				subtitle={'we’ll give your used car another chance'}
				message={'if you have any questions you can always contact us'}
				btnText={'Check what your car worth'}
				btnSlug={'/help-center'}
				bg={'green'}
			/>
		</>
	);
}
