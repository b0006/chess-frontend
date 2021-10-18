import React from 'react';
import { observer } from 'mobx-react-lite';

import * as stores from '../../mobx';

import logo from './assets/logo.svg';
import './Example.scss';

const Example: React.FC = observer(() => {
  const { userStore } = stores;
  return (
    <div className="Example">
      <header className="Example-header">
        <img src={logo} className="Example-logo" alt="logo" />
        <p>Edit Example.tsx and save to reload.</p>
        <p>
          Default name of user from mobx store: <i>{userStore.user.name}</i>
        </p>
        <a className="Example-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
});

export default Example;
