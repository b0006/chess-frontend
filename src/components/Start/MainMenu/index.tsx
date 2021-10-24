import React, { useState, useEffect } from 'react';
import * as ChessJS from 'chess.js';
import { observer } from 'mobx-react-lite';

import { userStore } from '../../../mobx';
import { TemplateBoard } from '../../Board/TemplateBoard';
import { Button } from '../../Common/Button';
import { GameSettingsModal } from '../../Lobby/GameSettingsModal';

import styles from './MainMenu.module.scss';

const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;

const MainMenu: React.FC = observer(() => {
  const { signInAsGuest, user } = userStore;

  const [isVisibleSettings, setIsVisibleSettings] = useState(false);
  const [stateChess, setStateChess] = useState<ChessJS.ChessInstance>();

  useEffect(() => {
    const chess = new Chess();
    setStateChess(chess);

    // const loadEngine = () => {
    //   const stock = window.STOCKFISH();

    //   stock.onmessage = function (event: any) {
    //     console.log('event', event);
    //   };
    // };

    // window.addEventListener('DOMContentLoaded', loadEngine);

    // return () => {
    //   window.removeEventListener('DOMContentLoaded', loadEngine);
    // };
  }, []);

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <div className={styles['menu-wrapper']}>
          <div className={styles.menu}>
            {user.isAuth && (
              <React.Fragment>
                <h2 className={styles.title}>Выберите режим игры</h2>
                <Button
                  classNameLink={styles.link}
                  className={styles.button}
                  href="/lobby-online"
                  icon="profile"
                  text="Против человека"
                  theme="primary"
                />
                <Button
                  classNameLink={styles.link}
                  className={styles.button}
                  onClick={() => setIsVisibleSettings(true)}
                  icon="desktop"
                  text="Против компьютера"
                  theme="primary"
                />
              </React.Fragment>
            )}
            {!user.isAuth && (
              <React.Fragment>
                <Button
                  classNameLink={styles.link}
                  className={styles.button}
                  href="/sign-in"
                  text="Войти"
                  icon="signIn"
                  theme="primary"
                />
                <Button
                  classNameLink={styles.link}
                  className={styles.button}
                  href="/sign-up"
                  icon="userPlus"
                  text="Регистрация"
                  theme="primary"
                />

                <Button
                  className={styles.button}
                  text="Войти как гость"
                  icon="userClock"
                  onClick={signInAsGuest}
                  theme="secondary"
                />
              </React.Fragment>
            )}
          </div>
        </div>
        {stateChess && <TemplateBoard game={{}} stateChess={stateChess} isRandom myColor="w" />}
      </div>
      <GameSettingsModal isVisible={isVisibleSettings} onClose={() => setIsVisibleSettings(false)} />
    </React.Fragment>
  );
});

export { MainMenu };
