import Category from 'pages/Category'
import Dashboard from 'pages/Dashboard'
import Orders from 'pages/Orders'
import Product from 'pages/Product'
import Profile from 'pages/Profile'
import Users from 'pages/Users'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from 'routes/ProtectedRoute'

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/products" component={Product} />
            <Route path="/orders" component={Orders} />
            <Route path="/users" component={Users} />
            <Route path="/profile" component={Profile} />
            <Route path="/categories" component={Category} />
        </Switch>
    )
}


export default ProtectedRoute(Routes);