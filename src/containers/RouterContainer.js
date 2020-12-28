import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
//import  LoginContainer from './auth/LoginContainer'
import  DashboardContainer from './auth/DashboardContainer'
import AdminContainer from './auth/AdminContainer';
import TypeContainer from './auth/TypeContainer';

const RouterContainer = props => (
  <Router>
      <Switch>
        <AdminContainer>
          <Route exact path={"/"} component={ DashboardContainer } />
          <Route exact path={"/types"} component={ TypeContainer } />
        </AdminContainer>
      </Switch>
  </Router>
)
  
export default RouterContainer;