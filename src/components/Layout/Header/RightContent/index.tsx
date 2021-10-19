/* eslint-disable max-len */
import React from 'react';

import { Button } from '../../../Common/Button';

import styles from './RightContent.module.scss';

const RightContent: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      {/* {profile.isAuth && (
        <React.Fragment>
          <Button href={`/${profileData?.username}`} text="Профиль" icon="user" iconSide="right" theme="secondary" />
          <Button className={styles['logout-button']} text="Выйти" icon="logout" iconSide="right" theme="primary" onClick={actionLogout} />
        </React.Fragment>
      )}
      {!profile.isAuth && (
        <React.Fragment>
          <Button href="/sign-in" className={styles['login-button']} text="Войти" theme="flat" />
          <Button href="/sign-up" text="Регистрация" theme="primary" />
        </React.Fragment>
      )} */}
      <React.Fragment>
        <Button href="/sign-in" className={styles['login-button']} text="Войти" theme="flat" />
        <Button href="/sign-up" text="Регистрация" theme="primary" />
      </React.Fragment>
    </div>
  );
};

export default RightContent;
