import { getCountCart } from 'components/Cart/CartSlice'
import React, { useEffect, useState } from 'react'
import { FaCartPlus, FaSearch, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import './header.scss'
import NavBar from './navbar'

function Header() {
    const dispatch = useDispatch();

    const [height, setHeight] = useState(() => window.scrollY);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const countCart = useSelector(state => state.carts.countCart);

    useEffect(() => {
        const fetchCountCarts = async () => {
            if (isAuthenticated) {
                await dispatch(getCountCart());
            }
        };

        fetchCountCarts();
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        const header = document.getElementsByClassName('Header')[0];

        function handleScroll() {
    
            if(window.scrollY - height > 0) {
                if(!header.className.includes('header-notpinned')) 
                    header.className += ' header-notpinned';
            } else {
                if(header.className.includes('header-notpinned')) 
                    header.className = header.className.replace(' header-notpinned', '');
            }
    
            setHeight(window.scrollY);
        }
        
        window.addEventListener('scroll', handleScroll);
        
        if(window.scrollY) {
            if(header.className.includes('header-top')) 
                header.className =  header.className.replace(' header-top', '');
        } else {
            if(!header.className.includes('header-top')) 
                header.className += ' header-top';
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })

    return (
        <div className="Header">
            <div className="header-container">
                <div className="header-container-left">
                    {NavBar.map((item,index) => {
                        
                        return (
                            <ul key={index} className="menu-item">
                                <li>
                                    <a href={item.url}>{item.title}</a>
                                </li>
                            </ul>
                        )
                    })} 
                </div>
                <div className="header-container-logo">
                    <a href="/">
                        <img src="https://demo.uix.store/sober/wp-content/themes/sober/images/logo.svg" alt="logo" />
                    </a>
                </div>
                <div className="header-container-right">
                    <div className="cart">
                        <Link to="/search"><FaSearch /></Link>
                    </div>
                    <div className="cart"><Link to='/user'><FaUser/></Link></div>
                    <div className="cart">
                        {/* <Link to="/sober/cart"><FaCartPlus/></Link> */}
                        <Link to="/user/carts"><FaCartPlus/></Link>
                        <span className="cart-counter">{countCart}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
