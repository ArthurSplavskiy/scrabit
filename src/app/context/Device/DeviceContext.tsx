/**
 * For more information about this structure
 * see: https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */
import React, { createContext, useContext, useEffect, useState } from 'react';

type State = { isMobile: boolean; isTablet: boolean; isDesktop: boolean; is810: boolean };
type DeviceProviderProps = { children: React.ReactNode };

const DeviceStateContext = createContext<State>({
	isMobile: false,
	isTablet: false,
	isDesktop: false,
	is810: false
});

function DeviceProvider({ children }: DeviceProviderProps) {
	const [state, setState] = useState({
		isMobile: !window.matchMedia('(min-width: 768px)').matches,
		isTablet: !window.matchMedia('(min-width: 1024px)').matches,
		isDesktop: !window.matchMedia('(min-width: 1200px)').matches,
		is810: !window.matchMedia('(min-width: 811px)').matches
	});

	useEffect(() => {
		window.matchMedia('(min-width: 768px)').onchange = ({ matches }) => {
			return setState((prevState) => ({ ...prevState, isMobile: !matches }));
		};

		window.matchMedia('(min-width: 810px)').onchange = ({ matches }) => {
			return setState((prevState) => ({ ...prevState, is810: !matches }));
		};

		window.matchMedia('(min-width: 1024px)').onchange = ({ matches }) => {
			return setState((prevState) => ({ ...prevState, isTablet: !matches }));
		};

		window.matchMedia('(min-width: 1200px)').onchange = ({ matches }) => {
			return setState((prevState) => ({ ...prevState, isDesktop: !matches }));
		};
	}, []);

	return <DeviceStateContext.Provider value={state}>{children}</DeviceStateContext.Provider>;
}

function useDevice() {
	const context = useContext(DeviceStateContext);

	if (context === undefined) {
		throw new Error('useDevice must be used within a DeviceProvider');
	}

	return context;
}

export { DeviceProvider, useDevice };
