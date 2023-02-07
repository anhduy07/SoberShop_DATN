import React from 'react'
import { Col, Container, Row } from 'reactstrap';
import CollectionItem from '../CollectionItem/CollectionItem'
import './collectionList.scss'

const collectionItems = [
    {
        name: "Red Hoodie",
        des: "Lorem Ipsum is simply dummy text of the printing",
        price: "$78.90",
        img: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/09/red.png"
    },
    {
        name: "Khaki Short",
        des: "Lorem Ipsum is simply dummy text of the printing",
        price: "$44.50",
        img: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/09/khaki.png"
    },
    {
        name: "Orange Flip Flop",
        des: "Lorem Ipsum is simply dummy text of the printing",
        price: "$80.00",
        img: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/09/orange.png"
    },
    {
        name: "Blue T-Shirt",
        des: "Lorem Ipsum is simply dummy text of the printing",
        price: "$24.00",
        img: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/09/blue.png"
    },
    {
        name: "Green T-Shirt",
        des: "Lorem Ipsum is simply dummy text of the printing",
        price: "$34.00",
        img: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/09/green.png"
    },
    {
        name: "Pink Sweater",
        des: "Lorem Ipsum is simply dummy text of the printing",
        price: "$62.90",
        img: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/09/pink.png"
    },
]

export default function CollectionList() {

    return (
        <div className="CollectionList">
            <Container fluid="true">
                <Row>
                    {collectionItems.map((item, index) => {
                        return (
                            <Col md="6" sm="12">                          
                                <CollectionItem
                                    key={index}
                                    collection={item}
                                />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
}
