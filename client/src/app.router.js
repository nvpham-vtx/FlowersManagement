import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";
import LoginForm from '../login/login';
import FsmDashboard from '../dashboard/fsm.dashboard'

const routes = [
  {
    path: "/",
    exact: true,
    // sidebar: () => <div>home!</div>,
    main: LoginForm
  },
  // {
  //   path: "/dashboard",
  //   // sidebar: () => <div>bubblegum!</div>,
  //   main: FsmDashboard
  // },
];

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.main />}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
}
