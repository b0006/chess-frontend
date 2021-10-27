import React from 'react';
import cn from 'classnames';

import { Button } from '../../Common/Button';
import { Party } from '../../../mobx/userStore';

import styles from './PartyList.module.scss';

interface Props {
  list: Party[];
  currentUser?: string;
}

const PartyList: React.FC<Props> = ({ list }) => {
  const onClickStartParty = (partyId: string) => () => {
    window.console.log('START party:', partyId);
  };

  return (
    <div className={styles.list}>
      {list.map((party) => (
        <div key={party.id} className={styles.item}>
          <div className={styles.players}>
            {party.whitePlayer && <div className={cn(styles.player, styles['player-white'])}>{party.whitePlayer}</div>}
            {party.blackPlayer && <div className={cn(styles.player, styles['player-black'])}>{party.blackPlayer}</div>}
          </div>
          <Button className={styles.button} text="Играть" onClick={onClickStartParty(party.id)} />
        </div>
      ))}
    </div>
  );
};

export { PartyList };
