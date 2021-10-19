import React from 'react';

import { RandomBoard } from '../../Board/RandomBoard';
import { Button } from '../../Common/Button';

import './styles.scss';

const StartMenu: React.FC = () => {
  return (
    <div className="start-menu">
      <RandomBoard />
      <div className="start-menu__buttons">
        <Button text="Войти как гость" />
      </div>
    </div>
  );
};

export { StartMenu };
