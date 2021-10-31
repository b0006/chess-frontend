import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';

import { Provider } from '../components/Common/Notification';
import { StartPage } from '../pages/StartPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { SignUpPage } from '../pages/SignUpPage';
import { SignInPage } from '../pages/SignInPage';
import { OfflineGamePage } from '../pages/OfflineGamePage';
import { OnlineLobbyPage } from '../pages/OnlineLobbyPage';

import { CommonRoute } from './types';

const Router: React.FC = () => {
  return (
    <Provider>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <CommonRoute isPrivate={false} exact path="/" component={StartPage} />
          <CommonRoute isPrivate={false} exact path="/sign-in" component={SignInPage} redirectAuthPath="/" />
          <CommonRoute isPrivate={false} exact path="/sign-up" component={SignUpPage} redirectAuthPath="/" />

          <CommonRoute isPrivate exact path="/lobby-online" component={OnlineLobbyPage} />
          <CommonRoute isPrivate exact path="/offline-game" component={OfflineGamePage} />

          <CommonRoute isPrivate={false} path="*" component={NotFoundPage} />
        </Switch>
      </HashRouter>
    </Provider>
  );
};

export { Router };
