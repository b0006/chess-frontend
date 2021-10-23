import { observer } from 'mobx-react-lite';
import React from 'react';

import { useFetchDataApi } from '../../../../hook/useFetchDataApi.hook';
import { userStore } from '../../../../mobx';
import { Button } from '../../../Common/Button';
import { useNotification } from '../../../Common/Notification';

import styles from './RightContent.module.scss';

const RightContent: React.FC = observer(() => {
  const { user, resetProfileData } = userStore;
  const { addNotification } = useNotification();
  const [isLogoutProcess, logoutRequest] = useFetchDataApi<any, { success: boolean }>('/auth/logout/', 'GET');

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
        <Button
          className={styles.button}
          text="Выход"
          icon="logout"
          iconSide="right"
          isLoading={isLogoutProcess}
          onClick={onLogoutClick}
        />
      )}
    </div>
  );
});

export { RightContent };
