import { IProxy } from '@/shared/interfaces/shared';
import { useEffect, useMemo, useReducer, useState } from 'react';
import { useProfile } from '../User/UserContext';
import { AccountProviderProps, ActionType } from './AccountContext.types';
import { AccountReducer } from './AccountContextReducer';
import { AccountStateContext } from './AccountContextStore';

export function AccountProvider({ children }: AccountProviderProps) {
	const [state, dispatch] = useReducer(AccountReducer, {
		balance: 0,
		proxyList: [],
		selectedProxy: [],

		selectProxy: (proxyId: number) => dispatch({ type: ActionType.SELECT_PROXY, payload: proxyId }),
		unselectProxy: (proxyId: number) =>
			dispatch({ type: ActionType.UN_SELECT_PROXY, payload: proxyId }),
		setProxyList: (proxyList: IProxy[]) =>
			dispatch({ type: ActionType.SET_PROXY_LIST, payload: proxyList }),
		addToBalance: (balance: number) => dispatch({ type: ActionType.BALANCE_ADD, payload: balance }),

		isAddToBalancePopup: false,
		openAddToBalancePopup: () => dispatch({ type: ActionType.OPEN_ADD_BALANCE_POPUP }),
		closeAddToBalancePopup: () => dispatch({ type: ActionType.CLOSE_ADD_BALANCE_POPUP }),

		isReplaceIpPopup: false,
		openReplaceIpPopup: () => dispatch({ type: ActionType.OPEN_REPLACE_IP_POPUP }),
		closeReplaceIpPopup: () => dispatch({ type: ActionType.CLOSE_REPLACE_IP_POPUP }),

		isExportPopup: false,
		openExportPopup: () => dispatch({ type: ActionType.OPEN_EXPORT_POPUP }),
		closeExportPopup: () => dispatch({ type: ActionType.CLOSE_EXPORT_POPUP }),

		isContinuePopup: false,
		openContinuePopup: () => dispatch({ type: ActionType.OPEN_CONTINUE_POPUP }),
		closeContinuePopup: () => dispatch({ type: ActionType.CLOSE_CONTINUE_POPUP })
	});

	const [isPopupHide, setIsPopupHide] = useState(false);
	const popupHide = (status: boolean) => {
		setIsPopupHide(status);
	};

	const { user } = useProfile();

	useEffect(() => {
		if (user?.proxy.length) {
			state.setProxyList(user.proxy);
		}
	}, [user?.proxy]);

	const value = useMemo(
		() => ({
			state,
			dispatch,
			isPopupHide,
			popupHide
		}),
		[state, dispatch, popupHide, isPopupHide]
	);
	return <AccountStateContext.Provider value={value}>{children}</AccountStateContext.Provider>;
}
