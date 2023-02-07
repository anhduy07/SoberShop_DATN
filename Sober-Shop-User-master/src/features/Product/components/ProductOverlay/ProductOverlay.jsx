import favoriteProductApi from 'api/favoriteProductApi'
import { addCart } from "components/Cart/CartSlice"
import Loading from 'components/Loading/Loading'
import React, { useState } from 'react'
import { FaCartPlus, FaEye, FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../ProductItem/productItem.scss'
import './productOverlay.scss'

export default function ProductOverlay(props) {
    const { product } = props;
    const user = useSelector(state => state.auth.user)
    const history = useHistory();
    const dispatch = useDispatch();
    const [isWishListLoading, setIsWishListLoading] = useState(false);
    const [isCartLoading, setIsCartLoading] = useState(false);

    const cartClick = async () => {
        try {
            setIsCartLoading(true);
            if (user) {
                await dispatch(addCart({ body: { productId: product._id, quantity: 1 } }));
                toast.success("Add to cart successfully");
            } else {
                history.push('/user')
            }
            setTimeout(() => {
               setIsCartLoading(false);  
            }, 1000);
       } catch (error) {
           console.log(error.message);
       }
    }
        
    const wishlistClick = async () => {
        try {
            setIsWishListLoading(true);
            await favoriteProductApi.add({ product: product._id, user: user._id })
            setTimeout(() => {
            setIsWishListLoading(false);
            }, 1000);
            toast.success("Add favorite product");
        } catch (error) {
            console.log(error.message);
        }
    }
    
    const redirect = () => {
        history.push(`/product/${product._id}`)
    }
    
    return (
        <div className="Product-Overlay">
            <div className="product-icon-box flex icon-cart" onClick={cartClick}>
                {isCartLoading ? <Loading backgroundColor="#fff" /> : <FaCartPlus className="product-icon" />}
            </div>
            <div className="product-icon-box flex icon-wishlist" onClick={wishlistClick}>
                {isWishListLoading ? <Loading backgroundColor="#fff" /> : <FaHeart className="product-icon"/>}
            </div>
            <div className="product-icon-box flex icon-view" onClick={redirect}>
                <FaEye className="product-icon" />
            </div>
        </div>
    )
}
