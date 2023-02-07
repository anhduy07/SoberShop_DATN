import React, { useEffect, useState } from "react";
import { FormGroup } from "reactstrap";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAllCarts, orderPaymentPaypal } from "../Cart/CartSlice";
import { useHistory } from "react-router-dom";
import { getUser } from "features/Auth/authSlice";
import { FaCcPaypal } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { toast } from "react-toastify";

export default function CheckoutForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const carts = useSelector((state) => state.carts.cartList);
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [isPaymentPaypalLoading, setIsPaymentPaypalLoading] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState("");
  const [values, setValues] = useState({
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        await dispatch(getAllCarts());
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCarts();
  }, [dispatch]);

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBtnLoading(true);
    try {
      if (values.address === "" || values.phoneNumber === "") {
        setErrorSubmit("Please enter full information.");
        return;
      }
      const res = await dispatch(addOrder({ body: { ...values, carts } }));
      if (res?.payload.success) {
        await dispatch(getUser());
        setErrorSubmit("");
        toast.success("Payment successfully");
        history.push("/user/orders");
      } else {
        toast.error(res?.payload.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setBtnLoading(false);
    }
  };

  const handlePaymentWithPayment = async () => {
    try {
      setIsPaymentPaypalLoading(true);
      if (values.address === "" || values.phoneNumber === "") {
        setErrorSubmit("Please enter full information.");
        return;
      }
      const res = await dispatch(orderPaymentPaypal({ body: { ...values, carts } }));
      if (res?.payload?.id) {
        history.push("/user");
        window.open(res?.payload?.links[1].href, "_blank");
      }
    } catch (error) {
      toast.error("Error");
    } finally {
      setIsPaymentPaypalLoading(false);
    }
  };

  return (
    <div className="checkout__form">
      <h3>Billing Details</h3>
      <div className="checkout__form__body">
        <form onSubmit={handleSubmit}>
          <p className="checkout__form__row">
            <label className="required">Address</label>
            <input
              className="input-text"
              placeholder="Enter the address"
              name="address"
              value={values.address}
              onChange={handleChange}
            />
          </p>
          <p className="checkout__form__row">
            <label className="required">Phone number</label>
            <input
              className="input-text"
              placeholder="Enter the phone"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
            />
          </p>
          {errorSubmit && (
            <p style={{ color: "red", fontSize: "12px" }}>{errorSubmit}</p>
          )}
          <FormGroup>
            <div className="checkout__form__btn">
              <button type="submit" className="checkout__form__btn-order">
                {isBtnLoading ? (
                  <Loading />
                ) : (
                  <div>
                    <MdPayment style={{ fontSize: 24, marginRight: 5 }} />{" "}
                    <span>Place order</span>
                  </div>
                )}
              </button>
              <button
                type="button"
                className="checkout__form__btn-paypal"
                onClick={handlePaymentWithPayment}
              >
                {isPaymentPaypalLoading ? (
                  <Loading />
                ) : (
                  <div>
                    <FaCcPaypal style={{ fontSize: 24, marginRight: 5 }} />{" "}
                    <span>Payment with Paypal</span>
                  </div>
                )}
              </button>
            </div>
          </FormGroup>
        </form>
      </div>
    </div>
  );
}
