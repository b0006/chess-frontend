import React from 'react';

import { Button } from '../../Common/Button';
import { useNotification } from '../../Common/Notification';

import styles from './FormLayout.module.scss';

const FormLayout: React.FC = ({ children }) => {
  const { addNotification } = useNotification();

  const onProviderClick = () => {
    addNotification({ title: 'Сервис в разработке', description: '' }, { id: 'provider', appearance: 'info' });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>{children}</div>
      <div className={styles.or}>или</div>
      <Button
        onClick={onProviderClick}
        className={styles.button}
        theme="secondary"
        text="Продолжить через Google"
        icon="google"
      />
      <Button
        onClick={onProviderClick}
        className={styles.button}
        theme="secondary"
        text="Продолжить через VK"
        icon="vk"
      />
    </div>
  );
};

export { FormLayout };
