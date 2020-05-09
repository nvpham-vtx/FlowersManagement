import React from "react";
import { Switch, Route, BrowserRouter} from "react-router-dom";
import LoginForm from './login/login';
import FsmSidebar from './fsm.sidebar/fsm.sidebar';
import FsmFooter from './fsm.footer/fsm.footer';
import FsmHeader from './fsm.header/fsm.header';
import FsmDashboard from './dashboard/fsm.dashboard';
import AllCustomer from "./cusstomers/fsm.allcustomers";

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
      path: "/resigter",
      main: Resigter
    },
    {
      path: "/dashboard",
      exact: true,
      // sidebar: () => <div>home!</div>,
      main: FsmDashboard
    },
    {
      path: "/customer",
      exact: true,
      // sidebar: () => <div>home!</div>,
      main: AllCustomer
    },
  ];
  render() {
    let currentPath = window.location.pathname;
    return (
      <BrowserRouter forceRefresh={true}>
        {currentPath != ("/" || "/resigter") ? <FsmSidebar /> : null}
        {currentPath != ("/" || "/resigter") ? <FsmHeader /> : null }
        <Switch>
          {this.routes.map((route, index) => (
            <Route key={index}
              path={route.path}
              exact={route.exact}
              children={<route.main />} />
          ))}
        </Switch>
        {this.currentPath != ("/" || "/resigter") ? <FsmFooter /> :null }
      </BrowserRouter>
    )
  }
}
