import React, { useState, useEffect } from 'react';
import * as ChessJS from 'chess.js';

import { TemplateBoard } from '../../Board/TemplateBoard';
import { Button } from '../../Common/Button';

import styles from './MainMenu.module.scss';

const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;

const MainMenu: React.FC = () => {
  const [stateChess, setStateChess] = useState<ChessJS.ChessInstance>();

  useEffect(() => {
    const chess = new Chess();
    setStateChess(chess);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles['menu-wrapper']}>
        <div className={styles.menu}>
          <Button classNameLink={styles.link} className={styles.button} href="/sign-in" text="Войти" theme="primary" />
          <Button
            classNameLink={styles.link}
            className={styles.button}
            href="/sign-up"
            text="Регистрация"
            theme="primary"
          />

          <Button className={styles.button} text="Войти как гость" theme="secondary" />
        </div>
      </div>
      {stateChess && <TemplateBoard stateChess={stateChess} isRandom myColor="w" />}
    </div>
  );
};

export { MainMenu };
