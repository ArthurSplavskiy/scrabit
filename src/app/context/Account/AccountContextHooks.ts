import { useContext } from 'react';
import { AccountStateContext } from './AccountContextStore';

export function useAccount() {
	const context = useContext(AccountStateContext);
	if (context === undefined) {
		throw new Error('useAccount must be used within a CountProvider');
	}
	return context;
}
