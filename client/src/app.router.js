import React from "react";
import { Switch, Route, BrowserRouter, useLocation } from "react-router-dom";
import LoginForm from './login/login';
import FsmSidebar from './fsm.sidebar/fsm.sidebar';
import FsmFooter from './fsm.footer/fsm.footer';
import FsmHeader from './fsm.header/fsm.header';
import FsmDashboard from './dashboard/fsm.dashboard';

export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }
 
  routes = [
    {
      path: "/",
      exact: true,
      // sidebar: () => <div>home!</div>,
      main: LoginForm
    },
    {
      path: "/dashboard",
      exact: true,
      // sidebar: () => <div>home!</div>,
      main: FsmDashboard
    },
  ];
  currentPath = window.location.pathname;
  render() {
    return (
      <BrowserRouter>
        {this.currentPath != "/" ? <FsmSidebar /> : null}
        {this.currentPath != "/" ? <FsmHeader /> : null }
        <Switch>
          {this.routes.map((route, index) => (
            <Route key={index}
              path={route.path}
              exact={route.exact}
              children={<route.main />} />
          ))}
        </Switch>
        {this.currentPath != "/" ? <FsmFooter /> :null }
      </BrowserRouter>
    )
  }
}
