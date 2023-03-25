import { useCommon } from '@/app/context/Common/CommonContext';
import { useEffect } from 'react';

function LoginPage() {
	const { setPageIsLoaded } = useCommon();
	useEffect(() => {
		setPageIsLoaded(true);
	}, []);
	return <>Login</>;
}

export default LoginPage;
