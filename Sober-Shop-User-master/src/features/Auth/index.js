import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import User from './pages/User';
import Login from './pages/Login';

function Auth(props) {
    const match = useRouteMatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <Switch>
            <Route path={`${match.url}`} render={ props => isAuthenticated ? <User { ...props } /> : <Login {...props} />} />
        </Switch>
    );
}

export default Auth;