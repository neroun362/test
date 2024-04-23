import React, { useState, useEffect } from "react";
import Axios from "axios";

const AllHistoryOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await Axios.get("http://localhost:3307/allorders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching all orders:", error);
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <div>
      <h2>История всех заказов</h2>
      {orders.length > 0 ? (
        <div>
          {orders.map((order, index) => (
            <div key={index}>
              <p>Имя пользователя: {order.firstName}</p>
              <p>Название машины: {order.carName}</p>
              <p>Дата аренды: {order.rentData}</p>
              <p>Время аренды: {order.rentTime}</p>
              <p>Комментарии пользователя: {order.comments}</p>
              <p>Способ оплаты: {order.selectedPayment}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>Нет доступных заказов</p>
      )}
    </div>
  );
};

export default AllHistoryOrder;
