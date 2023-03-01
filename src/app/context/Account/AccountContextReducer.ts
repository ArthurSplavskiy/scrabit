import { Action, ActionType, State } from './AccountContext.types';

export function AccountReducer(state: State, action: Action) {
	switch (action.type) {
		case ActionType.BALANCE_ADD: {
			return {
				...state,
				balance: state.balance + action.payload
			};
		}

		case ActionType.SET_PROXY_LIST: {
			return {
				...state,
				proxyList: action.payload
			};
		}

		case ActionType.SELECT_PROXY: {
			return {
				...state,
				selectedProxy: [...state.selectedProxy, action.payload]
			};
		}

		case ActionType.UN_SELECT_PROXY: {
			return {
				...state,
				selectedProxy: state.selectedProxy.filter((item) => item !== action.payload)
			};
		}

		case ActionType.OPEN_ADD_BALANCE_POPUP: {
			return {
				...state,
				isAddToBalancePopup: true
			};
		}

		case ActionType.CLOSE_ADD_BALANCE_POPUP: {
			return {
				...state,
				isAddToBalancePopup: false
			};
		}

		case ActionType.OPEN_REPLACE_IP_POPUP: {
			return {
				...state,
				isReplaceIpPopup: true
			};
		}

		case ActionType.CLOSE_REPLACE_IP_POPUP: {
			return {
				...state,
				isReplaceIpPopup: false
			};
		}

		case ActionType.OPEN_EXPORT_POPUP: {
			return {
				...state,
				isExportPopup: true
			};
		}

		case ActionType.CLOSE_EXPORT_POPUP: {
			return {
				...state,
				isExportPopup: false
			};
		}

		case ActionType.OPEN_CONTINUE_POPUP: {
			return {
				...state,
				isContinuePopup: true
			};
		}

		case ActionType.CLOSE_CONTINUE_POPUP: {
			return {
				...state,
				isContinuePopup: false
			};
		}

		default: {
			throw new Error(`Unhandled action type:`); //${action.type}
		}
	}
}
