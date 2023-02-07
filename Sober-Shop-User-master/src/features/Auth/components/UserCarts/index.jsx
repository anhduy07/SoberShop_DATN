import cartApi from 'api/cartApi';
import Loading from 'components/Loading/Loading';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import { numberFormat } from 'utils/common';
import './UserCarts.scss';

function UserCarts(props) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [carts, setCarts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadCart = async () => {
            try {
                setIsLoading(true);
                const getAllCartData = await cartApi.getAll();

                if(getAllCartData.success) {
                    setCarts(getAllCartData.carts);
                } else {
                    console.log(getAllCartData.message);
                }

                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };

        loadCart();
    }, []);

    const handleChangeQty = (cartId, qty)  => {
        const newCarts = carts.map((cart) => {
            if(cart._id === cartId) 
                cart.quantity = qty;
            return cart;
        });

        setCarts(newCarts);
    };

    const handleUpdateCart = async () => {
        try {
            setIsSubmitting(true);
            const updateCartData = await cartApi.updateMany({ newCarts: carts });

            if(!updateCartData.success) 
                console.log(updateCartData.message);
            setIsSubmitting(false);
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        }
    }

    const totalPrice = carts.reduce((acc, cur) => {
        acc += cur.product.price * cur.quantity * (100 - cur.product.discount) / 100;
        return acc;
      }, 0);
    

    const body = isLoading ? <Loading backgroundColor="black" /> : 
        !carts.length ? (
            <div className="user-carts">
                <p className="goto-shop">You have not added any products to your cart yet. <Link to='/'><i>Go to the shop</i></Link></p>
            </div>
        ) : (
            <div className="user-carts" >
                <Container >
                    <Row className="user-carts__head">
                        <Col md="4">
                            <p>PRODUCT</p>
                        </Col>
                        <Col md="2">
                            <p>PRICE</p>
                        </Col>
                        <Col md="3">
                        <p>QUANTITY</p>
                        </Col>
                        <Col md="3">
                            <p>SUBTOTAL</p>
                        </Col>
                    </Row>

                    {
                        carts.map(function(cart) {
                            if(cart.quantity) 
                                return (
                                    <Row className="user-carts__item" key={cart._id}>
                                        <Col md="4" className="user-carts__item__product">
                                            <div className="user-carts__item__product__frames">
                                                <img src={cart.product.thumb[0]} alt={cart.product.name} />
                                            </div>
                                            <p>{cart.product.name}</p>
                                        </Col>
                                        <Col md="2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                                            <p>${cart.product.price}</p>
                                            <p style={{ color: 'gray', fontSize: 14 }}> Discount: {cart.product.discount}%</p>
                                        </Col>
                                        <Col md="3" className="user-carts__item__quantity" >
                                            <p>
                                                <Button onClick={() => handleChangeQty(cart._id, cart.quantity - 1)}>-</Button>
                                                <span>{cart.quantity}</span>
                                                <Button onClick={() => handleChangeQty(cart._id, cart.quantity + 1)}>+</Button>
                                            </p>
                                        </Col>
                                        <Col md="3" className="user-carts__item__subtotal">
                                            <p>${cart.product.price * cart.quantity * (100 - cart.product.discount) / 100}</p>
                                            <span onClick={() => handleChangeQty(cart._id, 0)}>×</span>
                                        </Col>
                                    </Row>
                                );
                            return null;
                        })
                    }
                    <div className="wrapper-btn">
                        <Button type="submit" className="user-carts__btn-submit" onClick={handleUpdateCart}>
                            { isSubmitting ? <Loading /> : 'UPDATE CART' }
                        </Button>
                        <Button className="user-carts__btn-submit" onClick={() => history.push("/sober/checkout")}>
                        <span>${ numberFormat(totalPrice) }</span> | CHECKOUT
                        </Button>
                    </div>

                    {/* <div className="user-carts__total">
                        <h3>Checkout carts</h3>
                        <div className="user-carts__total__card">
                            <Container>
                                <Row>
                                    <Col md="5">
                                        <p>SUBTOTAL</p>
                                    </Col>
                                    <Col md="7">
                                        <p>${carts.reduce((total, cart) => total + cart.quantity * cart.product.price, 0)}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="5">
                                        <p>SHIPPING</p>
                                    </Col>
                                    <Col md="7">
                                        <p>Free shipping</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="5">
                                        <p>TOTAL</p>
                                    </Col>
                                    <Col md="7">
                                        <p>${carts.reduce((total, cart) => total + cart.quantity * cart.product.price * (100 - cart.product.discount) / 100, 0)}</p>
                                    </Col>
                                </Row>
                                <div className="wrapper-btn">
                                    <Button className="user-carts__btn-submit" onClick={() => history.push("/sober/checkout")}>
                                        PROCEED TO CHECKOUT
                                    </Button>
                                </div>
                            </Container>
                        </div>
                    </div> */}
                    
                </Container>
            </div>
        );

    return body;
}

export default UserCarts;