import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { StartPage } from '../pages/StartPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { BoardPage } from '../pages/BoardPage';

const Router: React.FC = () => (
  <HashRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path="/" component={StartPage} />
      <Route exact path="/board" component={BoardPage} />

      <Route path="*" component={NotFoundPage} />
    </Switch>
  </HashRouter>
);

export default Router;
