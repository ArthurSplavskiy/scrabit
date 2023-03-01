import { createContext } from 'react';
import { Dispatch, State } from './AccountContext.types';

export const AccountStateContext = createContext<
	| { state: State; dispatch: Dispatch; isPopupHide: boolean; popupHide: (s: boolean) => void }
	| undefined
>(undefined);
