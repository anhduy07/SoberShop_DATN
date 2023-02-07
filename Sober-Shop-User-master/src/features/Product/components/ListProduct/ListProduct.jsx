import React, {useState } from 'react'
import ProductItem from '../ProductItem/ProductItem';
import './listProduct.scss'
import '../ProductItem/productItem.scss'
import Loading from 'components/Loading/Loading';
import { Col, Container, Row } from 'reactstrap';

export default function ListProduct({ product, onIncreasePage }) {
    const [loading, setLoading] = useState(false);

    const handleClickIncrease = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onIncreasePage();
        }, 1000)
    }

    return (
        <div>
            <div className="BestSeller">
                <div className="ProductItem">
                    <Container fluid="true" >
                        <Row>
                            {product.map((item, index) => {
                                return (
                                    <Col sm="4" lg="2" key={index}>
                                        <ProductItem product={item} />
                                    </Col>
                                )
                            })}
                        </Row>
                    </Container>
                </div>
            </div>
            <div className="loadmore">
                <div className="loadmore-btn">
                    {
                        loading === false &&
                        <div className="loadmore-btn-text btn" onClick={handleClickIncrease}>
                            Load more
                        </div>
                    }
                    {
                        loading === true &&
                        <div className="loadmore-loading btn">
                            <Loading/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
