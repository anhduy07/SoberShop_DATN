import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllCarts} from "../Cart/CartSlice";
import {numberFormat} from "utils/common";

export default function CheckoutOrder() {
  const dispatch = useDispatch();
  const carts = useSelector(state => state.carts.cartList);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        await dispatch(getAllCarts());
      } catch (error) {
        return;
      }
    };

    fetchCarts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPrice = carts.reduce((acc, cur) => {
    acc += cur.product.price * cur.quantity * (100 - cur.product.discount) / 100;
    return acc;
  }, 0);

  return (
    <div className="checkout__form">
      <h3>Your order
        (<span style={{ color: 'gray', fontSize: 18 }}>
          {carts.length} {`${carts.length > 1 ? 'products' : 'product'}`}
        </span>)
      </h3>
      <div className="checkout__form__body">
        <table>
          <thead>
            <tr>
              <th>Product name</th>
              <th>Amount</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {
              carts.map((item, key) => ((
                <tr key={key}>
                  <td style={{ maxWidth: 200 }}>
                    { item.product.name }
                    <p style={{ color: 'gray', fontSize: 14 }}> Discount: {item.product.discount}%</p>
                  </td>
                  <td>
                    {item.quantity} × ${numberFormat(item.product.price)}
                  </td>
                  <td>${ numberFormat(item.product.price * item.quantity * (100 - item.product.discount)/100) }</td>
                </tr>
              )))
            }
          </tbody>
          <tfoot>
            <tr>
              <th>Subtotal</th>
              <th>${numberFormat(totalPrice)}</th>
            </tr>
            <tr>
              <th>Shipping</th>
              <th>Freeship</th>
            </tr>
            <tr style={{ color: 'red' }}>
              <th>Total</th>
              {/* <th>&nbsp;</th> */}
              <th>${numberFormat(totalPrice)}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
