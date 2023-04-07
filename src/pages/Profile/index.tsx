import { useCommon } from '@/app/context/Common/CommonContext';
import { UserProfile } from '@/widgets/UserProfile';
import { useEffect } from 'react';

function ProfilePage() {
	const { setPageIsLoaded } = useCommon();
	useEffect(() => {
		setPageIsLoaded(true);
	}, []);
	return <UserProfile />;
}

export default ProfilePage;
