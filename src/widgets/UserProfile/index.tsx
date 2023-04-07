import { useDevice } from '@/app/context/Device/DeviceContext';
import { Button } from '@/shared/ui/Button';
import classNames from 'classnames';
import styles from './index.module.scss';
import { AccountForm } from './AccountForm';
import { PasswordForm } from './PasswordForm';
import { NotificationsForm } from './NotificationsForm';
import { useState } from 'react';

export const UserProfile = () => {
	const { isMobile } = useDevice();
	const [fieldIsEdit, setFieldIsEdit] = useState(false);
	const profile = {
		first_name: 'Alexander winebaum',
		active_since: '10 December 2022',
		car_status: 'Unsold'
	};
	return (
		<div className={styles.wrapper}>
			<div className={styles.block}>
				<div className={styles.head}>
					<div className={classNames(styles.headTop, 'text-18-14')}>
						<span>Profile</span>
						{isMobile && (
							<Button
								customType='text'
								iconName='exit'
								iconPosition='right'
								withOutPadding={true}
								color='black-color'>
								sign out
							</Button>
						)}
					</div>
					<div className={styles.headBottom}>
						<div className={styles.headBottomInfo}>
							<span className={classNames(styles.profileName, 'text-24-18')}>
								{profile.first_name}
							</span>
							<div className={styles.headBottomStatus}>
								<span className='text-16-14'>
									Active since
									<span className={styles.headBottomStatusItem}>{profile.active_since}</span>
								</span>
								<span className='text-16-14'>
									Car status:
									<span className={styles.headBottomStatusItem}>{profile.car_status}</span>
								</span>
							</div>
						</div>
						{!isMobile && (
							<Button customType='black' iconName='exit' iconPosition='right'>
								sign out
							</Button>
						)}
					</div>
				</div>
				<div className={styles.body}>
					<AccountForm setFieldIsEdit={setFieldIsEdit} isActive={fieldIsEdit} />
					<PasswordForm isActive={fieldIsEdit} />
					<NotificationsForm setFieldIsEdit={setFieldIsEdit} isActive={fieldIsEdit} />
				</div>
			</div>
		</div>
	);
};
