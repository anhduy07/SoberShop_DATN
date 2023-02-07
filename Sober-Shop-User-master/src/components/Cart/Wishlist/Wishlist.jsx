import React, {useState} from 'react'
import './wishlist.scss'
import {FaTimes} from 'react-icons/fa';
import {numberFormat} from "../../../utils/common";
import cartApi from "../../../api/cartApi";
import Loading from "../../Loading/Loading";
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteWishList, getAllCarts} from "../CartSlice";
import { toast } from 'react-toastify';

export default function Wishlist(props) {
  const dispatch = useDispatch();

  const [isCartLoading, setIsCartLoading] = useState(null);
  const history = useHistory();

  const handleAddToCart = async ({_id, product}) => {
    try {
      setIsCartLoading(_id);
      await cartApi.add({ productId: product._id, quantity: 1 });
      await dispatch(getAllCarts());
      toast.success("Add to cart successfully");
      setIsCartLoading(null);
    } catch (error) {
      toast.error("Error");
      history.push('/user')
    }
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteWishList({ id }));
    } catch (error) {
      console.log(error.message);
      history.push('/user')
    }
  }

  return (
    <div>
      <div className="wishlist_content">
        {
          props.data.length ? 
            (
              props.data.map((item, key) => {
                return (
                  <div className="wishlist_item" key={key}>
                    <div className="wishlist_info">
                      <Link to="#" onClick={() => handleDelete(item._id)}>
                        <FaTimes color="#212529" fontSize={18} />
                      </Link>
                      <img src={ item.product.thumb[0] } alt={ item.product.name } />
                      <span className="wishlist_info_name">{ item.product.name }</span>
                    </div>
                    <div className="wishlist_price">${ numberFormat(item.product.price) }</div>
                    <div className="wishlist_action">
                      <p className="button_checkout" onClick={() => handleAddToCart(item)}>
                        <span className="button_checkout-subtotal">
                          {
                            isCartLoading === item._id ? <Loading backgroundColor="#fff" /> : <span>Add to cart</span>
                          }
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>You don't have any favorite products yet. <Link to='/'>Go to the shop.</Link></p>
            )
         }
      </div>
    </div>
  )
}