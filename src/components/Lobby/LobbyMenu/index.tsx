import React from 'react';

import { Button } from '../../Common/Button';
import { PartyList } from '../PartyList';

import styles from './LobbyMenu.module.scss';

const LobbyMenu: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <Button text="Новая партия" />
      </div>
      <div className={styles.table}>
        <PartyList />
      </div>
    </div>
  );
};

export { LobbyMenu };
