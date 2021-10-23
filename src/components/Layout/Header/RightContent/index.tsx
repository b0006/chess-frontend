import { observer } from 'mobx-react-lite';
import React from 'react';

import { UnknownObject } from '../../../../agent';
import { useFetchDataApi } from '../../../../hook/useFetchDataApi.hook';
import { userStore } from '../../../../mobx';
import { Button } from '../../../Common/Button';
import { useNotification } from '../../../Common/Notification';

import styles from './RightContent.module.scss';

const RightContent: React.FC = observer(() => {
  const { user, resetProfileData } = userStore;
  const { addNotification } = useNotification();
  const [isLogoutProcess, logoutRequest] = useFetchDataApi<UnknownObject, { success: boolean }>('/auth/logout/', 'GET');

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
      {user.isAuth && (
        <React.Fragment>
          <Button href="/profile" text="Профиль" icon="profile" iconSide="right" />
          <Button
            className={styles.button}
            text="Выход"
            icon="logout"
            iconSide="right"
            isLoading={isLogoutProcess}
            onClick={onLogoutClick}
          />
        </React.Fragment>
      )}
    </div>
  );
});

export { RightContent };
