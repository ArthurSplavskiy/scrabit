import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './queryClient';
import { CommonProvider } from './context/Common/CommonContext';
import { UserProvider } from './context/User/UserContext';
import { DeviceProvider } from './context/Device/DeviceContext';
import './assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<CommonProvider>
				<UserProvider>
					<DeviceProvider>
						<RouterProvider router={AppRouter} />
					</DeviceProvider>
				</UserProvider>
			</CommonProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
