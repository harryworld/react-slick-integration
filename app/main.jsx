import './assets/stylesheets/app';
import './assets/stylesheets/main';

import { Parse } from 'parse';
import React from 'react';
import Router from 'react-router';

import secrets from '../config/secrets';
import Routes from './Routes';

Parse.initialize(secrets.parse.applicationId, secrets.parse.javascriptKey);

Router.run(Routes, Router.HistoryLocation, (Handler) => {
  return React.render(<Handler/>, document.body);
});