import React from 'react';
import cn from 'classnames';

import { Button } from '../../Common/Button';

import styles from './PartyList.module.scss';

const PARTY_LIST = [
  { id: '1', creater: 'b0006', myColor: 'b', playerWhite: 'b0006', playerBlack: 'Nagibator2010' },
  { id: '2', creater: 'guest21112', myColor: 'b', playerWhite: null, playerBlack: 'guest21112' },
  { id: '3', creater: 'EvgenyPitu?', myColor: 'w', playerWhite: 'EvgenyPitu?', playerBlack: null },
];

const PartyList: React.FC = () => {
  const onClickStartParty = (partyId: string) => () => {
    window.console.log('START party:', partyId);
  };

  return (
    <div className={styles.list}>
      {PARTY_LIST.map((party) => (
        <div key={party.id} className={styles.item}>
          <div className={styles.players}>
            {party.playerWhite && <div className={cn(styles.player, styles['player-white'])}>{party.playerWhite}</div>}
            {party.playerBlack && <div className={cn(styles.player, styles['player-black'])}>{party.playerBlack}</div>}
          </div>
          <div className={styles.color}>
            <div className={styles[`color-${party.myColor}`]} />
          </div>
          <Button className={styles.button} text="Играть" onClick={onClickStartParty(party.id)} />
        </div>
      ))}
    </div>
  );
};

export { PartyList };
