import React from 'react';
import Layout from './hoc/layout';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home';
import SignIn from './components/signin';

import Dashboard from './components/admin/dashboard';

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <Route exact component={Dashboard} path="/dashboard" />
        <Route exact component={SignIn} path="/sign_in" />
        <Route exact component={Home} path="/" />
      </Switch>
    </Layout>
  );
};

export default Routes;
