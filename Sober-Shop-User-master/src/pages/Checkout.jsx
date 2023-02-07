import React from 'react'
import ProtectedRoute from "../components/routing/ProtectedRoute";
import Header from "../components/Header/Header";
import CheckoutBody from "../components/Checkout/CheckoutBody";

function Checkout() {
  return (
    <div className="checkout">
      <Header />
      <CheckoutBody />
    </div>
  )
}

export default ProtectedRoute(Checkout);
