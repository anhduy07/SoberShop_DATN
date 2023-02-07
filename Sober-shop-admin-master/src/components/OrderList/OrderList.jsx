import React, { useState } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./orderList.scss";
import { ORDER_STATUS } from "constants/gloabalUrl";
import { useEffect } from "react";
import orderApi from "api/orderApi";
import EditForm from "components/EditForm/EditForm";

export default function OrderList({ listOrder, loading }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders([...listOrder]);
  }, [listOrder]);

  const getColorStatus = (status) => {
    let bgc = '';
    switch (status) {
      case "0":
        return bgc = 'red';
      case "4":
        return bgc = 'green';
      case "3":
        return bgc = "#d35400";
      case "1":
        return bgc = "#fbc531";
      case "2":
        return bgc = '#34ace0';
      default:
        break;
    }
  }

  const getStatus = (status) => {
    let content = '';
    switch (status) {
      case "0":
        return content = 'Cancel';
      case "3":
        return content = 'Delivering';
      case "4":
        return content = "Delivered";
      case "1":
        return content = "Wait for confirmation";
      case "2":
        return content = 'Confirmed';
      default:
        break;
    }
  }

  const handleChangeStatus = async (index, value) => {
    let orderItem;
    setOrders((prev) => {
      const prevValue = [...prev]
      const newValue = { ...prevValue[index], status: value }
      prevValue[index] = newValue;
      orderItem = newValue;
      return prevValue;
    });
    if (orderItem._id) {
      const res = await orderApi.update(orderItem._id, {
        status: orderItem.status
      });
      if (res) {
        alert("Update status successfully");
      }
    }
  }

  return (
    <div className="order-list">
      <h2>Orders</h2>
      <div className="order-list__detail">
        {loading ? (
          <CircularProgress size={20} />
        ) : listOrder.length === 0 ? (
          <div>No order</div>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#95afc0" }}>
                  <TableCell>Product name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Discount(%)</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Customer name</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {item?.orderDetails.map((c, i) => {
                          return (
                            <p style={{ margin: 2 }}>
                              {item?.orderDetails.length > 1 ? `${i+1}. ` : ""} 
                              {c?.product?.name}
                            </p>
                          );
                        })}
                      </TableCell>
                      <TableCell>
                        {item?.orderDetails.map((c, i) => {
                          return (
                            <p style={{ margin: 2 }}>
                              ${c?.price}x{c?.quantity}
                            </p>
                          );
                        })}
                      </TableCell>
                      <TableCell>
                        {item?.orderDetails.map((c, i) => {
                          return <p style={{ margin: 2 }}>{c?.discount}</p>;
                        })}
                      </TableCell>
                      <TableCell>{item?.address}</TableCell>
                      <TableCell>{item?.phoneNumber}</TableCell>
                      <TableCell style={{ color: 'red' }}>${item?.totalAmount}</TableCell>
                      <TableCell>{item?.user?.fullname}</TableCell>
                      <TableCell>
                        <EditForm
                          index={index}
                          name='status'
                          value={item.status}
                          setValue={handleChangeStatus}
                          status={getStatus(item.status)}
                          options={ORDER_STATUS}
                          styles={{
                            backgroundColor: getColorStatus(item.status),
                            color: "#fff",
                            textAlign: "center",
                            borderRadius: 5,
                            padding: "3px 8px",
                            display: "inline-block",
                            fontSize: "12px"
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}
