import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';

import { StartPage } from '../pages/StartPage';
import { NotFoundPage } from '../pages/NotFoundPage';

import { PublicRoute } from './types';

const Router: React.FC = () => (
  <HashRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <PublicRoute exact path="/" component={StartPage} />

      <PublicRoute path="*" component={NotFoundPage} />
    </Switch>
  </HashRouter>
);

export default Router;
