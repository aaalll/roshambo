import React from 'react';
import history from 'utils/history';
import { Router, Route, Switch } from 'react-router-dom';


import Home from 'components/home';
import Login from 'components/login';
import Game from 'components/game';
import Call from 'components/call';

const AppRoutes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/game/:id" component={Game} />
      <Route exact path="/call/:id" component={Call} />
      <Route exact path="top100" component={Game} />
    </Switch>
  </Router>
);

export default AppRoutes;
