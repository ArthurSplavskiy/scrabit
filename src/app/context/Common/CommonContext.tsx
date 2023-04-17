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
	isPopupHide: boolean;
	popupHide: () => void;
	setNoScroll: (lock: boolean) => void;
	pageIsLoaded: boolean;
	setPageIsLoaded: (loading: boolean) => void;
	preloaderIsHide: boolean;
	setPreloaderIsHide: (h: boolean) => void;
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
	isPopupHide: false,
	popupHide: () => {},
	setNoScroll: (lock: boolean) => {},
	pageIsLoaded: false,
	setPageIsLoaded: (loading: boolean) => {},
	preloaderIsHide: false,
	setPreloaderIsHide: (h: boolean) => {}
});

function CommonProvider({ children }: CommonProviderProps) {
	const [pageError, setPageError] = useState<IEventError | null>(null);
	const [noScroll, setNoScroll] = useState(false);
	const [isPopupHide, setIsPopupHide] = useState(false);
	const [pageIsLoadedState, setPageIsLoadedState] = useState(false);
	const [preloaderIsHideState, setPreloaderIsHideState] = useState(false);

	// popup damage
	const [isOfferDamagePopupOpen, setIsOfferDamagePopupOpen] = useState(false);
	// ===
	// popup calc
	const [isCalcPopupOpen, setIsCalcPopupOpen] = useState(false);
	// ===
	// popup vin
	const [isVinPopupOpen, setIsVinPopupOpen] = useState(false);
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

	useEffect(() => {
		if (noScroll) {
			document.body.classList.add('noscroll');
		} else {
			document.body.classList.remove('noscroll');
		}
	}, [noScroll]);

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
			popupHide,
			isPopupHide,
			error: pageError,
			setError,
			clearError,
			setNoScroll,
			pageIsLoaded: pageIsLoadedState,
			setPageIsLoaded,
			preloaderIsHide: preloaderIsHideState,
			setPreloaderIsHide
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
			isPopupHide,
			popupHide,
			pageError,
			setError,
			clearError,
			setNoScroll,
			pageIsLoadedState,
			setPageIsLoaded,
			preloaderIsHideState,
			setPreloaderIsHide
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
