import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FsmSidebar from '../fsm.sidebar/fsm.sidebar';
import FsmFooter from '../fsm.footer/fsm.footer';
import FsmHeader from '../fsm.header/fsm.header';
import FsmDashboard from '../dashboard/fsm.dashboard';
import LoginForm from '../login/login';

export default class FsmRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <FsmSidebar />
                <FsmHeader />
                <Switch>
                    <Route path="/dashboard" component={FsmDashboard} />
                    <Route path="/login" component={LoginForm} />
                </Switch>
                <FsmFooter />
            </BrowserRouter>
        )
    }
}