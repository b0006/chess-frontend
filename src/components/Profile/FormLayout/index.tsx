import React from 'react';
import cn from 'classnames';

import { Button } from '../../Common/Button';
import { useNotification } from '../../Common/Notification';

import styles from './FormLayout.module.scss';

interface Props {
  isLoading?: boolean;
}

const FormLayout: React.FC<Props> = ({ isLoading, children }) => {
  const { addNotification } = useNotification();

  const onProviderClick = () => {
    addNotification({ title: 'Сервис в разработке', description: '' }, { id: 'provider', appearance: 'info' });
  };

  return (
    <div
      className={cn(styles.wrapper, {
        [styles['wrapper_loading']]: isLoading,
      })}
    >
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
