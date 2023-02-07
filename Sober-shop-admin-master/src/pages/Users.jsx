import React from 'react'
import {Switch, Route, useRouteMatch } from 'react-router-dom'
import UserList from 'components/UserList/UserList';
import AddUser from 'components/AddUser/AddUser';

export default function Users() {
    const match = useRouteMatch();

    return (
        <div className="users">
            <Switch>
                <Route path={`${match.url}/users-list`} component={UserList}/>
                <Route path={`${match.url}/create-user`} component={AddUser}/>
            </Switch>
        </div>
    )
}
