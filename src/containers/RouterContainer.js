import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import  DashboardContainer from './auth/DashboardContainer'
import AdminContainer from './auth/AdminContainer';

const RouterContainer = props => (
  <Router>
      <Switch>
        <AdminContainer>
          <Route exact path={"/"} component={ DashboardContainer } />
        </AdminContainer>
      </Switch>
  </Router>
)
  
export default RouterContainer;