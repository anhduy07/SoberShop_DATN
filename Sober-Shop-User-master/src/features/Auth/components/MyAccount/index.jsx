import authApi from 'api/authApi';
import { LOCAL_STORAGE } from 'constants/global';
import { logout } from 'features/Auth/authSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import setAuthToken from 'utils/setAuthToken';
import AccountDetails from '../AccountDetail';
import OrderDetails from '../OrderDetails';
import OrderList from '../OrderList';
import UserPayment from '../UserPayment';
import './MyAccount.scss';

function MyAccount(props) {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const [select, setSelect] = useState('detail');
    const { pathname } = useLocation();

    const handleLogoutClick = async () => {
        try {
            const logoutData = await authApi.logout();

            if(logoutData.success) {
                localStorage.removeItem(LOCAL_STORAGE.accessToken);
                localStorage.removeItem(LOCAL_STORAGE.refreshToken);
                setAuthToken(null);
                
                dispatch(logout());

                window.location.reload();
            } else {
                console.log(logoutData.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const newSelect = pathname.includes('orders') ? 'orders' :
            pathname.includes('payment') ? 'payment' : 'detail';
        
        setSelect(newSelect);
    }, [pathname]);

    return (
        <div className='my-account'>
            <Container>
                <Row >
                    <Col md="2">
                        <div className="my-account__menu">
                            <div className={`my-account__menu__item ${ select === 'detail' ? 'my-account__menu__active' : ''}`} >
                                <Link to={`${match.url}`} >Account Details</Link>
                            </div>
                            <div className={`my-account__menu__item ${ select === 'orders' ? 'my-account__menu__active' : ''}`} >
                                <Link to={`${match.url}/orders`} >Orders</Link>
                            </div>
                            <div className={`my-account__menu__item ${ select === 'payment' ? 'my-account__menu__active' : ''}`} >
                                <Link to={`${match.url}/payment`} >Payment</Link>
                            </div>
                            <div className="my-account__menu__item">
                                <Button onClick={handleLogoutClick}>Logout</Button>
                            </div>
                        </div>
                    </Col>
                    <Col md="10">
                        <div className="my-account__main">
                            <Switch>
                                <Route path={`${match.url}/orders/:orderId`} component={OrderDetails} />
                                <Route path={`${match.url}/orders`} exact component={OrderList}/>
                                <Route path={`${match.url}/payment`} component={UserPayment} />
                                <Route path={`${match.url}`} component={AccountDetails} />
                            </Switch>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default MyAccount;