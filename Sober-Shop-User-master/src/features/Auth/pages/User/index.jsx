import { getAllWishList } from 'components/Cart/CartSlice';
import Wishlist from 'components/Cart/Wishlist/Wishlist';
import Header from 'components/Header/Header';
import ProtectedRoute from 'components/routing/ProtectedRoute';
import MyAccount from 'features/Auth/components/MyAccount';
import UserCarts from 'features/Auth/components/UserCarts';
import UserMenu from 'features/Auth/components/UserMenu';
import Footer from 'layout/Footer/Footer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Container } from 'reactstrap';
import './User.scss';

function User(props) {
    const match = useRouteMatch();
    const wishList = useSelector(state => state.carts.wishList);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchWishList = async () => {
          try {
            await dispatch(getAllWishList());
          } catch (error) {
            console.log(error.message);
          }
        };
    
        fetchWishList();
      }, [dispatch]);
    
    return (
        <div className="user">
            <Header />
            <div className="user__menu">
                <UserMenu />
            </div>
            <Switch>
                <Route path={`${match.url}/carts`} component={UserCarts} />
                <Route path={`${match.url}/wishlist`}>
                    <Container >
                        <Wishlist data={wishList} />
                    </Container>
                </Route>
                <Route path={`${match.url}`} component={MyAccount} />
            </Switch>
            <Footer />
        </div>
    );
}

const UserWithPR = ProtectedRoute(User); 

export default UserWithPR;