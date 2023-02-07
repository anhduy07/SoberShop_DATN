import orderApi from 'api/orderApi';
import Loading from 'components/Loading/Loading';
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import timeString from 'utils/timeString';
import './OrderList.scss';

function OrderList(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [listOrder, setListOrder] = useState([]);
    const match = useRouteMatch();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setIsLoading(true);
                const getUserOrderData = await orderApi.getOrderUser();
                
                if(getUserOrderData.success) {
                    setListOrder(getUserOrderData.orders);
                } else {
                    console.log(getUserOrderData.message);
                }

                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }        
        };

        fetchOrder();
    }, [])

    const body = isLoading ? <Loading backgroundColor="black" /> : 
        !listOrder.length ? (
            <div className="order-list">
                <p>You don't have any orders yet. <Link to='/'><i>Go to the Shop</i></Link> </p>
            </div>
        ) : (
            <div className="order-list">
                <Container fluid="true">
                    <Row className="order-list__head">
                        <Col md="2">
                            <p>ORDER</p>
                        </Col>
                        <Col md="2">
                            <p>DATE</p>
                        </Col>
                        <Col md="6">
                            <p>TOTAL</p>
                        </Col>
                        <Col md="2">
                            <p>ACTIONS</p>
                        </Col>
                    </Row>
    
                    {
                        listOrder.map(function(order, index) {
                            const quantity = order.orderDetails.reduce(function(acc, cur) {
                                return acc + cur.quantity;
                            }, 0);
    
                            return (
                                <Row key={order._id} >
                                    <Col md="2" className="order-list__index">
                                        <p>#{index + 1}</p>
                                    </Col>
                                    <Col md="2">
                                        <p>{timeString(order.createdAt)}</p>
                                    </Col>
                                    <Col md="6">
                                        <p>${order.totalAmount} for {quantity} { quantity > 1 ? 'items' : 'item'}</p>
                                    </Col>
                                    <Col md="2">
                                        <p><Link to={`${match.url}/${order._id}`} style={{ textDecoration: "underline", color: "#2222ef"}}>View</Link></p>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </Container>
            </div>
        );
    
    return body;
}

export default OrderList;