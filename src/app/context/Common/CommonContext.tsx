import { IEventError } from '@/shared/interfaces/shared';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type State = {
	error: IEventError | null;
	setError: (error: IEventError | null) => void;
	clearError: () => void;
	isThankPopupOpen: boolean;
	isPopupHide: boolean;
	openThank: () => void;
	closeThank: () => void;
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
	isThankPopupOpen: false,
	isPopupHide: false,
	openThank: () => {},
	closeThank: () => {},
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

	const [isThankPopupOpen, setIsThankPopupOpen] = useState(false);
	const [isPopupHide, setIsPopupHide] = useState(false);

	const [pageIsLoadedState, setPageIsLoadedState] = useState(false);

	const [preloaderIsHideState, setPreloaderIsHideState] = useState(false);

	const openThank = () => {
		setIsThankPopupOpen(true);
	};
	const closeThank = () => {
		setIsThankPopupOpen(false);
	};
	const popupHide = () => {
		setIsPopupHide(true);
	};
	function closeAllPopups() {
		closeThank();
	}
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
			openThank,
			closeThank,
			popupHide,
			isThankPopupOpen,
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
			openThank,
			closeThank,
			isThankPopupOpen,
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
