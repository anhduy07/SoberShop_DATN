import React from 'react'
import CartHeader from "../components/Cart/CartHeader";
import CartBody from "../components/Cart/CartBody";
import ProtectedRoute from "../components/routing/ProtectedRoute";

function Cart() {
  return (
    <div className="Cart">
      <CartHeader />
      <CartBody />
    </div>
  )
}

export default ProtectedRoute(Cart);
