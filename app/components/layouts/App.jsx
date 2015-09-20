import React from 'react';
import { RouteHandler } from 'react-router';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <RouteHandler />
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.func
};
