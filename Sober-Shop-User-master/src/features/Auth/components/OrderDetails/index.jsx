import orderApi from 'api/orderApi';
import Loading from 'components/Loading/Loading';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './OrderDetails.scss';
import { MdPermIdentity, MdRoom, MdPhone, MdMailOutline } from 'react-icons/md';
import { PAYMENT_METHOD_TYPE } from 'constants/global';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function OrderDetails(props) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState({});
    const { orderId } = useParams();

    useEffect(() => {
        const loadOrder = async () => {
            try {
                setIsLoading(true);
                const orderData = await orderApi.getOrder(orderId);

                if (orderData.success) {
                    setOrder(orderData.order);
                } else {
                    console.log(orderData.message);
                }

                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };

        loadOrder();
    }, [orderId]);

    console.log(order);
    const body = isLoading ? <Loading backgroundColor="black" /> :
        !order ? (
            <div className="order-details">
                <p>This order does not exist. <Link to='/'><i>Go to the Shop</i></Link></p>
            </div>
        ) : (
            <div className="order-details">
                <div className='back' onClick={() => history.goBack()}><AiOutlineArrowLeft style={{ marginRight: 5 }} /> Back</div>
                <div className="order-details__main">
                    <h3>Order details</h3>
                    <div className="order-details__main__table">
                        <Container fluid="true" >
                            <Row>
                                <Col md="6">
                                    <p>PRODUCT</p>
                                </Col>
                                <Col md="6">
                                    <p>TOTAL</p>
                                </Col>
                            </Row>
                            {
                                order.orderDetails.map(function (detail) {
                                    return (
                                        <Row key={detail._id}>
                                            <Col md="6">
                                                <p>{detail.product.name} <b>× {detail.quantity}</b></p>
                                            </Col>
                                            <Col md="6">
                                                <p><b>${detail.product.price * ((100 - detail.product.discount) / 100) * detail.quantity}</b></p>
                                                {/* <p>${order.totalAmount}</p> */}
                                            </Col>
                                        </Row>
                                    )
                                })
                            }
                            <Row className="order-details__main__table__bolder">
                                <Col md="6">
                                    <p>SUBTOTAL</p>
                                </Col>
                                <Col md="6">
                                    <p>${order.totalAmount}</p>
                                </Col>
                            </Row>
                            <Row className="order-details__main__table__bolder">
                                <Col md="6">
                                    <p>SHIPPING</p>
                                </Col>
                                <Col md="6">
                                    <p>Free shipping</p>
                                </Col>
                            </Row>
                            <Row className="order-details__main__table__bolder">
                                <Col md="6">
                                    <p>PAYMENT METHOD</p>
                                </Col>
                                <Col md="6">
                                    <p>{PAYMENT_METHOD_TYPE[order.payment_method]}</p>
                                </Col>
                            </Row>
                            <Row className="order-details__main__table__bolder">
                                <Col md="6">
                                    <p>TOTAL</p>
                                </Col>
                                <Col md="6">
                                    <p>${order.totalAmount}</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>

                <div className="order-details__address">
                    <h3>Billing address</h3>
                    <div className="order-details__address__card">
                        <p><MdPermIdentity /> {order.user.fullname || order.user.username}</p>
                        <p><MdRoom /> {order.address}</p>
                        <p><MdPhone /> {order.phoneNumber}</p>
                        <p><MdMailOutline /> {order.user.email}</p>
                    </div>
                </div>
            </div>
        )

    return body;
}

export default OrderDetails;