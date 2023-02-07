import React, {useEffect, useState} from 'react'
import CartDetail from './CartDetail/CartDetail';
import Wishlist from "./Wishlist/Wishlist";
import './cart.scss'
import {useDispatch, useSelector} from "react-redux";
import {getAllWishList, getAllCarts} from "./CartSlice";

export default function CartBody() {
  const [currentTab, setCurrentTab] = useState(1);
  const [isActive, setIsActive] = useState(1);

  const wishList  = useSelector(state => state.carts.wishList)
  const carts  = useSelector(state => state.carts.cartList)

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        await dispatch(getAllCarts());
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCarts();
  }, [dispatch]);

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
    <div className="Carousel">
      <div className="main-tab">
        <a
          href="javascript: void(0);"
          onClick={() => {setCurrentTab(1); setIsActive(1)}}
          className={isActive === 1 ? 'main-tab-item active' : 'main-tab-item'}
        >
          Shopping Cart
          <span className="cart-counter">{carts.length}</span>
        </a>
        <a
          href="javascript: void(0);"
          onClick={() => {setCurrentTab(2); setIsActive(2)}}
          className={isActive === 2 ? 'main-tab-item active' : 'main-tab-item'}
        >
          Wishlist
          <span className="cart-counter">{ wishList.length }</span>
        </a>
      </div>
      <div className="tab-content">
        {
          currentTab === 1 && <CartDetail data={carts} />
        }
        {
          currentTab === 2 && <Wishlist data={wishList} />
        }
      </div>

    </div>
  )
}
