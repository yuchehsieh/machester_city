import React from 'react';
import Layout from './hoc/layout';
import { Switch, Route } from 'react-router-dom';

import PrivateRoutes from './components/authRoutes/privateRoutes';

import Home from './components/home';
import SignIn from './components/signin';

import Dashboard from './components/admin/dashboard';

const Routes = props => {
  console.log(props);
  return (
    <Layout>
      <Switch>
        <PrivateRoutes
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />

        <Route exact component={SignIn} path="/sign_in" />
        <Route exact component={Home} path="/" />
      </Switch>
    </Layout>
  );
};

export default Routes;
