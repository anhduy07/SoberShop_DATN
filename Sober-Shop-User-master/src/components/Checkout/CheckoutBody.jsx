import React from "react";
import "./checkout.scss";
import CheckoutHeader from "./CheckoutHeader";
import CheckoutForm from "./CheckoutForm";
import CheckoutOrder from "./CheckoutOrder";
import { Col, Row } from "reactstrap";

export default function CheckoutBody() {
  return (
    <div className="checkout__body">
      <CheckoutHeader />
      <Row className="checkout__body-main">
        <Col md={7}>
          <CheckoutOrder />
        </Col>
        <Col md={5}>
          <CheckoutForm />
        </Col>
      </Row>
    </div>
  );
}
