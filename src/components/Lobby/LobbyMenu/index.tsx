import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Button } from '../../Common/Button';
import { NewPartyModal } from '../NewPartyModal';
import { PartyList } from '../PartyList';
import { userStore } from '../../../mobx';

import styles from './LobbyMenu.module.scss';

interface Props {
  isLoading: boolean;
}

const LobbyMenu: React.FC<Props> = observer(({ isLoading }) => {
  const { partyList } = userStore;

  const [isVisibleCreateModal, setIsVisibleCreateModal] = useState(false);

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <Button text="Новая партия" onClick={() => setIsVisibleCreateModal(true)} />
        </div>
        {isLoading && '...загрузка списка партий'}
        {!isLoading && (
          <div className={styles.table}>
            <PartyList list={partyList} />
          </div>
        )}
      </div>
      <NewPartyModal isVisible={isVisibleCreateModal} onClose={() => setIsVisibleCreateModal(false)} />
    </React.Fragment>
  );
});

export { LobbyMenu };
