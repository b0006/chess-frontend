import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import StartPage from '../pages/StartPage';
import NotFoundPage from '../pages/NotFoundPage';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StartPage} />

      <Route path="*" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
