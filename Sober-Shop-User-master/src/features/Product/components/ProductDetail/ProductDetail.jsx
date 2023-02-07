import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import {
    FaMinus, FaPlus, FaCartPlus, FaRegHeart,
    FaAngleRight, FaChevronLeft, FaChevronRight,
    FaFacebook, FaTwitter, FaPinterest
} from 'react-icons/fa'
import './productDetail.scss'
import { Link } from 'react-router-dom'
import cartApi from 'api/cartApi'
import { toast } from 'react-toastify'
import favoriteProductApi from 'api/favoriteProductApi'
import { useSelector } from 'react-redux'

export default function ProductDetail({ product }) {
    const user = useSelector(state => state.auth.user)
    const [countCart, setCountCart] = useState(1);
    const [imgIndex, setImgIndex] = useState(0);
    const [listImage] = useState(() => {
        return product?.listImage?.length ? product.listImage : product.thumb;
    });

    const cartClick = async () => {
        try {
            if (countCart > product.quantity) {
                toast.error("The number of products must be less than the quantity in stock");
                return;
            }
            const res = await cartApi.add({ productId: product._id, quantity: countCart })
            if (res.success === true) {
                toast.success("Add to cart successfully");
            }
        } catch (error) {
            toast.error("Error");
        }
    }

    const handleChangeImageIndex = (index) => {
        if (index >= listImage.length)
            return setImgIndex(0);
        if (index < 0)
            return setImgIndex(listImage.length - 1);

        setImgIndex(index);
    }

    const addWishlist = async () => {
        try {
            await favoriteProductApi.add({ product: product._id, user: user._id });
            toast.success("Add favorite product");
        } catch (error) {
            return;
        }
    }

    return (
        <div className="ProductDetail">
            <div className="product-leave">
                <Link to="/" className="product-link">Home</Link>
                <FaAngleRight className="arrow" />
                <Link to="/" className="product-link">{product?.category?.name}</Link>
                <FaAngleRight className="arrow" />
                <span className="product-name-first">{product.name}</span>
            </div>
            <div className="product-detail-container">
                <div className="product-gallery flex">
                    <div className="product-small" >
                        {listImage.map((item, index) => {
                            return (
                                <div
                                    className={imgIndex === index ? "product-small-item product-small-item-active" : "product-small-item"}
                                    key={item}
                                    onClick={() => setImgIndex(index)}
                                >
                                    <img
                                        src={item}
                                        alt=""
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="product-slider">
                        {listImage.map((item, index) => {
                            return (
                                <div className="product-big" style={{ left: `calc(${index - imgIndex}*100%)` }} key={index}>
                                    <div className="product-big-item" >
                                        <img
                                            src={item}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            )
                        })}
                        <div
                            className="change-product left"
                            onClick={() => handleChangeImageIndex(imgIndex - 1)}
                        >
                            <FaChevronLeft />
                        </div>
                        <div
                            className="change-product right"
                            onClick={() => handleChangeImageIndex(imgIndex + 1)}
                        >
                            <FaChevronRight />
                        </div>
                    </div>
                </div>

                <div className="product-info-detail">
                    <div className="product-info-title">
                        {product.name}
                    </div>
                    <div className="product-info-des">
                        Description: {product.description}
                    </div>
                    <div className="product-info-des">
                        Quantity: {product.quantity}
                    </div>
                    <div className="product-info-vote">
                        <ReactStars
                            value={product.evaluation}
                            size={20}
                            activeColor="#ffd700"
                            className="rating"
                        />
                        <p>(0 customer reviews)</p>
                    </div>
                    <div className="product-info-price">
                        ${product.price}
                    </div>
                    <div className="product-info-cart">
                        <div className="count-cart">
                            <div
                                className="count-cart-item left"
                                onClick={() => { if (countCart > 1) setCountCart(countCart - 1) }}
                            >
                                <FaMinus />
                            </div>
                            <div className="count-cart-item">
                                <input
                                    type="text"
                                    value={countCart}
                                    onChange={(e) => setCountCart(e.target.value)}
                                />
                            </div>
                            <div
                                className="count-cart-item right"
                                onClick={() => setCountCart(countCart + 1)}
                            >
                                <FaPlus />
                            </div>
                        </div>
                        <div className="product-info-addtocart" onClick={cartClick}>
                            <FaCartPlus />
                            <span>Add to cart</span>
                        </div>
                        <div className="product-info-wishlist" onClick={addWishlist}>
                            <FaRegHeart />
                        </div>
                    </div>

                    <div className="product-info-line"></div>
                    <div className="product-info-cate">
                        <span>Category: </span>
                        <span>{product?.category?.name}</span>
                    </div>
                    <div className="product-info-line"></div>
                    <div className="product-info-social">
                        <i><FaFacebook className="icon" />facebook</i>
                        <i><FaTwitter className="icon" />twitter</i>
                        <i><FaPinterest className="icon" />pinterest</i>
                    </div>

                </div>
            </div>
            {/* <ProductReview/> */}
        </div>
    )
}
