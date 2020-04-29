import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";
import LoginForm from './login/login';
import FsmRouter from './fsm.router/fsm.router';

const routes = [
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
    main: FsmRouter
  },
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
