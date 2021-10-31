import { observer } from 'mobx-react-lite';
import React from 'react';

import { useMediaBreakpoint } from '../../../../hook/useMedia.hook';
import { userStore } from '../../../../mobx';
import { BREAKPOINT_SM } from '../../../../utils/breakpoints';
import { Button } from '../../../Common/Button';

import styles from './RightContent.module.scss';

const RightContent: React.FC = observer(() => {
  const isDesktop = useMediaBreakpoint(BREAKPOINT_SM);

  const { user, logout } = userStore;
  return (
    <div className={styles.wrapper}>
      {user.isAuth && isDesktop && (
        <React.Fragment>
          <Button href="/profile" text="Профиль" icon="profile" iconSide="right" />
          <Button className={styles.button} text="Выход" icon="logout" iconSide="right" onClick={logout} />
        </React.Fragment>
      )}
      {!user.isAuth && isDesktop && (
        <React.Fragment>
          <Button
            className={styles.button}
            href="/sign-in"
            text="Войти"
            icon="signIn"
            iconSide="right"
            theme="secondary"
          />
          <Button
            className={styles.button}
            href="/sign-up"
            text="Регистрация"
            icon="userPlus"
            iconSide="right"
            theme="primary"
          />
        </React.Fragment>
      )}
      {!isDesktop && (
        <React.Fragment>
          <Button icon="bars" theme="flat" />
        </React.Fragment>
      )}
    </div>
  );
});

export { RightContent };
