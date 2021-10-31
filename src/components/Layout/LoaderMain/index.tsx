import React from 'react';

import styles from './LoaderMain.module.scss';

const LoaderMain: React.FC = () => {
  return (
    <div className={styles.loader}>
      <span>Загрузка...</span>
    </div>
  );
};

export { LoaderMain };
