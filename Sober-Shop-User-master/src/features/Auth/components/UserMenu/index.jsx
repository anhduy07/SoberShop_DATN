import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import './UserMenu.scss';

function UserMenu(props) {
    const match = useRouteMatch();
    const { pathname }= useLocation();
    const [select, setSelect] = useState('account')

    useEffect(() => {
        const newSelect = pathname.includes('carts') ? 'carts' : pathname.includes('wishlist') ? 'wishlist' : 'account';

        setSelect(newSelect);
    }, [pathname])

    return (
        <div className="user-menu" >
            <div className={`user-menu__item ${ select === 'carts' ? 'user-menu__active' : ''}`} >
                <Link to={`${match.url}/carts`} >Shopping Cart</Link>
            </div>
            <div className={`user-menu__item ${ select === 'wishlist' ? 'user-menu__active' : ''}`} >
                <Link to={`${match.url}/wishlist`} >Wishlist</Link>
            </div>
            <div className={`user-menu__item ${ select === 'account' ? 'user-menu__active' : ''}`} >
                <Link to={`${match.url}`} >My Account</Link>
            </div>
        </div>
    );
}
 
export default UserMenu;