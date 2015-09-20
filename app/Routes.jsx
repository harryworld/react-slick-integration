import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import App from './components/layouts/App';
import Board from './components/pages/Board';

module.exports = (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute name='dashboard' handler={Board} />
  </Route>
);