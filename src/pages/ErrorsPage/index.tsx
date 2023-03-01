import { withErrorLayout } from '@/app/layouts/ErrorPageLayout';
import { useRouteError } from 'react-router-dom';
import { ErrorPage404 } from './404';

function ErrorPage() {
	// @ts-ignore
	const error: { statusText: string; message: string; status: number } = useRouteError();

	if (error.status === 404) {
		return <ErrorPage404 />;
	}

	return (
		<div id='error-page'>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}

export default withErrorLayout(ErrorPage);
