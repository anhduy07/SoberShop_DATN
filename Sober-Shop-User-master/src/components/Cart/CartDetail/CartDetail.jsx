import React from 'react'
import './cart-detail.scss'
import { FaTimes } from 'react-icons/fa';
import { numberFormat } from "utils/common";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { deleteCart } from "../CartSlice";

export default function CartDetail(props) {
  const dispatch = useDispatch();

  const totalPrice = props.data.reduce((acc, cur) => {
    acc += cur.product.price * cur.quantity;
    return acc;
  }, 0) || 0;

  const handleDeleteCart = async cartId => {
    try {
      await dispatch(deleteCart({ id: cartId }));
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <div className="cart_content">
        {
          props.data.map((item, key) => {
            return (
              <div key={key} className="cart_item">
                <div className="cart_info">
                  <img src={item.product.thumb[0]} alt="" />
                  <span className="cart_info_name">{item.product.name}</span>
                </div>
                <div className="cart_qty">
                  Qty: <span className="cart_qty_number">{item.quantity}</span>
                </div>
                <div className="cart_price">${numberFormat(item.product.price)}</div>
                <div className="cart_delete">
                  <a href="javascript: void(0);" onClick={() => handleDeleteCart(item._id)}>
                    <FaTimes color="#212529" fontSize={18} />
                  </a>
                </div>
              </div>
            );
          })
        }
      </div>

      <div className="cart_action">
        <Link to="/sober/checkout" className="button_checkout">
          <span className="button_checkout-subtotal">
            <span>${numberFormat(totalPrice)}</span>
            <span>Checkout</span>
          </span>
        </Link>

        <Link to="/user/carts" className="view_cart">
          View Cart
        </Link>
      </div>
    </div>
  )
}
