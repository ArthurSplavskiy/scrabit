import { useCommon } from '@/app/context/Common/CommonContext';
import { Button } from '@/shared/ui/Button';
import { useEffect } from 'react';

function ComingSoon() {
	const { setPageIsLoaded } = useCommon();
	useEffect(() => {
		setPageIsLoaded(true);
	}, []);
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				alignItems: 'center',
				paddingTop: '20vh',
				gap: '40px'
			}}>
			<h1>Coming Soon</h1>
			<Button btnTo='/'>back home</Button>
		</div>
	);
}

export default ComingSoon;
