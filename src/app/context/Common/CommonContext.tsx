import { IEventError } from '@/shared/interfaces/shared';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type State = {
	error: IEventError | null;
	setError: (error: IEventError | null) => void;
	clearError: () => void;
	// popup damage
	isOfferDamagePopupOpen: boolean;
	openOfferDamagePopup: () => void;
	closeOfferDamagePopup: () => void;
	// ===
	// popup calc
	isCalcPopupOpen: boolean;
	openCalcPopup: () => void;
	closeCalcPopup: () => void;
	// ===
	// popup vin
	isVinPopupOpen: boolean;
	openVinPopup: () => void;
	closeVinPopup: () => void;
	// ===
	// popup callback
	isCallbackPopupOpen: boolean;
	openCallbackPopup: () => void;
	closeCallbackPopup: () => void;
	// ===
	// popup decline offer
	isDeclineOfferPopupOpen: boolean;
	openDeclineOfferPopup: () => void;
	closeDeclineOfferPopup: () => void;
	// ===
	// popup partnership
	isPartnershipPopupOpen: boolean;
	openPartnershipPopup: () => void;
	closePartnershipPopup: () => void;
	// ===
	isPopupHide: boolean;
	popupHide: () => void;
	setNoScroll: (lock: boolean) => void;
	pageIsLoaded: boolean;
	setPageIsLoaded: (loading: boolean) => void;
	preloaderIsHide: boolean;
	setPreloaderIsHide: (h: boolean) => void;
	focusFirstOfferFormField: boolean;
	setFocusFirstOfferFormField: (a: boolean) => void;
};
type CommonProviderProps = { children: React.ReactNode };

const CommonContext = createContext<State>({
	error: null,
	setError: () => {},
	clearError: () => {},
	// popup damage
	isOfferDamagePopupOpen: false,
	openOfferDamagePopup: () => {},
	closeOfferDamagePopup: () => {},
	// ===
	// popup damage
	isCalcPopupOpen: false,
	openCalcPopup: () => {},
	closeCalcPopup: () => {},
	// ===
	// popup vin
	isVinPopupOpen: false,
	openVinPopup: () => {},
	closeVinPopup: () => {},
	// ===
	// popup callback
	isCallbackPopupOpen: false,
	openCallbackPopup: () => {},
	closeCallbackPopup: () => {},
	// ===
	// popup decline offer
	isDeclineOfferPopupOpen: false,
	openDeclineOfferPopup: () => {},
	closeDeclineOfferPopup: () => {},
	// ===
	// popup partnership
	isPartnershipPopupOpen: false,
	openPartnershipPopup: () => {},
	closePartnershipPopup: () => {},
	// ===
	isPopupHide: false,
	popupHide: () => {},
	setNoScroll: (lock: boolean) => {},
	pageIsLoaded: false,
	setPageIsLoaded: (loading: boolean) => {},
	preloaderIsHide: false,
	setPreloaderIsHide: (h: boolean) => {},
	focusFirstOfferFormField: false,
	setFocusFirstOfferFormField: (a: boolean) => {}
});

function CommonProvider({ children }: CommonProviderProps) {
	const [pageError, setPageError] = useState<IEventError | null>(null);
	const [noScroll, setNoScroll] = useState(false);
	const [isPopupHide, setIsPopupHide] = useState(false);
	const [pageIsLoadedState, setPageIsLoadedState] = useState(false);
	const [preloaderIsHideState, setPreloaderIsHideState] = useState(false);
	const [focusFirstOfferFormFieldState, setFocusFirstOfferFormFieldState] = useState(false);

	// popup damage
	const [isOfferDamagePopupOpen, setIsOfferDamagePopupOpen] = useState(false);
	// ===
	// popup calc
	const [isCalcPopupOpen, setIsCalcPopupOpen] = useState(false);
	// ===
	// popup vin
	const [isVinPopupOpen, setIsVinPopupOpen] = useState(false);
	// ===
	// popup callback
	const [isCallbackPopupOpen, setIsCallbackPopupOpen] = useState(false);
	// ===
	// popup decline offer
	const [isDeclineOfferPopupOpen, setIsDeclineOfferPopupOpen] = useState(false);
	// ===
	// popup partnership
	const [isPartnershipPopupOpen, setIsPartnershipPopupOpen] = useState(false);
	// ===

	// popup damage
	const openOfferDamagePopup = () => {
		closeAllPopups();
		setIsOfferDamagePopupOpen(true);
	};
	const closeOfferDamagePopup = () => {
		setIsOfferDamagePopupOpen(false);
	};
	// ===

	// popup calc
	const openCalcPopup = () => {
		setIsCalcPopupOpen(true);
	};
	const closeCalcPopup = () => {
		setIsCalcPopupOpen(false);
	};
	// ===

	// popup vin
	const openVinPopup = () => {
		setIsVinPopupOpen(true);
	};
	const closeVinPopup = () => {
		setIsVinPopupOpen(false);
	};
	// ===

	// popup callback
	const openCallbackPopup = () => {
		setIsCallbackPopupOpen(true);
	};
	const closeCallbackPopup = () => {
		setIsCallbackPopupOpen(false);
	};
	// ===

	// popup decline offer
	const openDeclineOfferPopup = () => {
		setIsDeclineOfferPopupOpen(true);
	};
	const closeDeclineOfferPopup = () => {
		setIsDeclineOfferPopupOpen(false);
	};
	// ===

	// popup partnership
	const openPartnershipPopup = () => {
		setIsPartnershipPopupOpen(true);
	};
	const closePartnershipPopup = () => {
		setIsPartnershipPopupOpen(false);
	};
	// ===

	// tech popup actions
	const popupHide = () => {
		setIsPopupHide(true);
		setTimeout(() => {
			setIsPopupHide(false);
		}, 300);
	};
	function closeAllPopups() {
		closeOfferDamagePopup();
		closeCalcPopup();
		closeVinPopup();
	}
	// ===
	const setError = (error: IEventError | null) => {
		setPageError(error);
	};
	const clearError = () => {
		setPageError(null);
	};
	const setPageIsLoaded = (loading: boolean) => {
		setPageIsLoadedState(loading);
	};
	const setPreloaderIsHide = (h: boolean) => {
		setPreloaderIsHideState(h);
	};
	const setFocusFirstOfferFormField = (a: boolean) => {
		setFocusFirstOfferFormFieldState(a);
	};

	useEffect(() => {
		if (noScroll) {
			document.body.classList.add('noscroll');
		} else {
			document.body.classList.remove('noscroll');
		}
	}, [noScroll]);

	useEffect(() => {
		if (pageIsLoadedState) {
			document.body.classList.add('is-loaded');
		}
	}, [pageIsLoadedState]);

	const contextValue = useMemo(
		() => ({
			// popup damage
			openOfferDamagePopup, // CommonProvider function
			closeOfferDamagePopup, // CommonProvider function
			isOfferDamagePopupOpen, // useState getter
			// ===
			// popup calc
			openCalcPopup,
			closeCalcPopup,
			isCalcPopupOpen,
			// ===
			// popup vin
			openVinPopup,
			closeVinPopup,
			isVinPopupOpen,
			// ===
			// popup callback
			openCallbackPopup,
			closeCallbackPopup,
			isCallbackPopupOpen,
			// ===
			// popup decline offer
			openDeclineOfferPopup,
			closeDeclineOfferPopup,
			isDeclineOfferPopupOpen,
			// ===
			// popup partnership
			openPartnershipPopup,
			closePartnershipPopup,
			isPartnershipPopupOpen,
			// ===
			popupHide,
			isPopupHide,
			error: pageError,
			setError,
			clearError,
			setNoScroll,
			pageIsLoaded: pageIsLoadedState,
			setPageIsLoaded,
			preloaderIsHide: preloaderIsHideState,
			setPreloaderIsHide,
			focusFirstOfferFormField: focusFirstOfferFormFieldState,
			setFocusFirstOfferFormField
		}),
		[
			// popup damage
			openOfferDamagePopup,
			closeOfferDamagePopup,
			isOfferDamagePopupOpen,
			// ===
			// popup damage
			openCalcPopup,
			closeCalcPopup,
			isCalcPopupOpen,
			// ===
			// popup vin
			openVinPopup,
			closeVinPopup,
			isVinPopupOpen,
			// ===
			// popup callback
			openCallbackPopup,
			closeCallbackPopup,
			isCallbackPopupOpen,
			// ===
			// popup decline offer
			openDeclineOfferPopup,
			closeDeclineOfferPopup,
			isDeclineOfferPopupOpen,
			// ===
			// popup partnership
			openPartnershipPopup,
			closePartnershipPopup,
			isPartnershipPopupOpen,
			// ===
			isPopupHide,
			popupHide,
			pageError,
			setError,
			clearError,
			setNoScroll,
			pageIsLoadedState,
			setPageIsLoaded,
			preloaderIsHideState,
			setPreloaderIsHide,
			focusFirstOfferFormFieldState,
			setFocusFirstOfferFormField
		]
	);

	return <CommonContext.Provider value={contextValue}>{children}</CommonContext.Provider>;
}

function useCommon() {
	const context = useContext(CommonContext);

	if (context === undefined) {
		throw new Error('useCommon must be used within a CommonProvider');
	}

	return context;
}

export { CommonProvider, useCommon };
