import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const HistoreOrderUser = () => {
  const authContext = useAuthContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await Axios.get("http://localhost:3307/orders", {
          headers: {
            Authorization: `Bearer ${authContext.user.user_id}`, // Передаем user_id в заголовке запроса
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchUserOrders();
  }, [authContext.user.user_id]);

  return (
    <div>
      <h2>История заказов</h2>
      {orders.length > 0 ? (
        <div>
          {orders.map((order, index) => (
            <div key={index}>
              <p>Номер заказа: {index + 1}</p>
              <p>Авто: {order.carName}</p>
              <p>Дата заказа: {order.rentData}</p>
              <p>Способ оплаты: {order.selectedPayment}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>У вас пока нет заказов</p>
      )}
    </div>
  );
};

export default HistoreOrderUser;
