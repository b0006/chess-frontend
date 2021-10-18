import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { StartPage } from '../pages/StartPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { BoardPage } from '../pages/BoardPage';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StartPage} />
      <Route exact path="/board" component={BoardPage} />

      <Route path="*" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
