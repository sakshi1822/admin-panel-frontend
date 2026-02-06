import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
const Orders = () => {
  const [data, setData] = useState([]);
  const fetchOrders = async () => {
    const response = await axios.get(
      "https://foodapi-yej6.onrender.com/api/orders/all",
    );
    setData(response.data);
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.patch(
      `https://foodapi-yej6.onrender.com/api/orders/status/${orderId}?status=${event.target.value}`,
    );
    if (response.status === 200) {
      await fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="div container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <table className="table table-responsive">
            <tbody>
              {data.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={assets.parcel} alt="" height={38} width={48} />
                    </td>
                    <td>
                      <div>
                        {Array.isArray(order.items) && order.items.length > 0
                          ? order.items.map((item, index) => {
                              const isLast = index === order.items.length - 1;
                              return isLast
                                ? `${item.name} x ${item.quantity}`
                                : `${item.name} x ${item.quantity}, `;
                            })
                          : "No items"}
                      </div>
                      <div>{order.address}</div>
                    </td>
                    <td>&#8377;{order.amount.toFixed(2)}</td>
                    <td>Items: {order.items?.length || 0}</td>

                    <td>
                      <select
                        name=""
                        id=""
                        className="form-control"
                        onChange={(event) => statusHandler(event, order.id)}
                        value={order.orderStatus}
                      >
                        <option value="Food Preparing">Food Preparing</option>
                        <option value="Out for delivary">
                          Out for delivary
                        </option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
