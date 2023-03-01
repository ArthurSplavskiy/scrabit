import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { PublicPopups } from '@/shared/ui/PopupSystem/publicPopups';
import { FunctionComponent } from 'react';
import { LayoutProps } from './layout.props';
import './index.scss';

const ErrorPageLayout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<div className='ErrorPageLayout'>
			<Header type='default' />
			<div className='ErrorPageLayout-main page-offset'>{children}</div>
			<PublicPopups />
			<Footer />
		</div>
	);
};

export const withErrorLayout = <T extends Record<string, unknown>>(
	Component: FunctionComponent<T>
): typeof Component => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<ErrorPageLayout>
				<Component {...props} />
			</ErrorPageLayout>
		);
	};
};

export default ErrorPageLayout;
