import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';

import { Provider } from '../components/Common/Notification';
import { StartPage } from '../pages/StartPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { SignUpPage } from '../pages/SignUpPage';
import { SignInPage } from '../pages/SignInPage';
import { OfflineGamePage } from '../pages/OfflineGamePage';

import { PublicRoute, PrivateRoute } from './types';

const Router: React.FC = () => {
  return (
    <Provider>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <PublicRoute exact path="/" component={StartPage} />
          <PublicRoute exact path="/sign-in" component={SignInPage} redirectAuthPath="/" />
          <PublicRoute exact path="/sign-up" component={SignUpPage} redirectAuthPath="/" />

          <PrivateRoute exact path="/lobby-online" component={StartPage} />
          <PrivateRoute exact path="/offline-game" component={OfflineGamePage} />

          <PublicRoute path="*" component={NotFoundPage} />
        </Switch>
      </HashRouter>
    </Provider>
  );
};

export { Router };
