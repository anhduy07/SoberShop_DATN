import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Collection from './pages/Collection';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product'
import Cart from './pages/Cart'
import Contact from 'pages/Contact';
import Team from 'pages/Team';
import Auth from 'features/Auth';
import { useDispatch } from 'react-redux';
import { getUser } from 'features/Auth/authSlice';
import ScrollToTop from 'components/ScrollToTop';
import NotFound from 'components/NotFound';
import Checkout from "./pages/Checkout";
import SearchProduct from 'pages/SearchProduct';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
        window.scrollTo(0, 0);
    }, [dispatch]);
   

    return (
        <Router>
            <ScrollToTop />
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/shop" component={Shop}></Route>
                    <Route path="/collection" component={Collection}></Route>
                    <Route path="/product/:id" component={Product}></Route>
                    <Route path="/sober/cart" component={Cart}></Route>
                    <Route path="/sober/checkout" component={Checkout}></Route>
                    <Route path="/contact" component={Contact}></Route>
                    <Route path="/team" component={Team}></Route>
                    <Route path="/user" component={Auth} />
                    <Route path="/search" component={SearchProduct} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
        
    );
}

export default App;