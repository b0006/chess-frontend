import { observer } from 'mobx-react-lite';
import React from 'react';

import { useFetchDataApi } from '../../../../hook/useFetchDataApi.hook';
import { userStore } from '../../../../mobx';
import { useNotification } from '../../../Common/Notification';
import { SvgIcon } from '../../../Common/SvgIcon';

import styles from './RightContent.module.scss';

const RightContent: React.FC = observer(() => {
  const { user, resetProfileData } = userStore;
  const { addNotification } = useNotification();
  const [, logoutRequest] = useFetchDataApi<any, { success: boolean }>('/auth/logout/', 'GET');

  const onLogoutClick = async () => {
    const { error, response } = await logoutRequest();

    if (error || !response?.success) {
      addNotification({ title: 'Ошибка', description: error || 'Попробуйте еще раз' }, { appearance: 'error' });
      return;
    }

    resetProfileData();
  };

  return (
    <div className={styles.wrapper}>
      {user.profileData?.username && <span>{user.profileData.username}</span>}
      {user.isAuth && (
        <button type="button" className={styles.button} onClick={onLogoutClick}>
          <SvgIcon kind="logout" className={styles.icon} />
        </button>
      )}
    </div>
  );
});

export { RightContent };
