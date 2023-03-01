import { useInterfaceText } from '@/app/context/User/UserContext';
import { FC } from 'react';

export const AccountSettings: FC = () => {
	const { text: pageInterfaceText } = useInterfaceText();
	return (
		<div className='AccountContent'>
			<h2 className='AccountContent-title'>{pageInterfaceText?.account_link_3}</h2>
		</div>
	);
};
