import React from 'react';

import { HORIZONTAL_SYMBOLS, HORIZONTAL_SYMBOLS_REVERSE } from '../../constants';
import { ChessColor } from '../types';

import styles from './HorizontalSymbols.module.scss';

interface Props {
  isRotate?: boolean;
  actualTurn?: ChessColor;
}

const HorizontalSymbols: React.FC<Props> = ({ isRotate, actualTurn }) => {
  const list = isRotate ? HORIZONTAL_SYMBOLS_REVERSE : HORIZONTAL_SYMBOLS;

  return (
    <div className={styles['horizontal-panel']}>
      {list.map((sym) => (
        <div className={styles['alphabet-symbol']} key={sym}>
          {sym.toUpperCase()}
        </div>
      ))}
      <div className={styles['turn-wrapper']}>
        <div className={styles[`turn-${actualTurn}`]} />
      </div>
    </div>
  );
};

export { HorizontalSymbols };
