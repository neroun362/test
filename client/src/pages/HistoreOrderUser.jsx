import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { TableCell, TableRow } from "@mui/material";

const HistoreOrderUser = () => {
  const authContext = useAuthContext();
  const [orders, setOrders] = useState([]);
  // Функция для форматирования даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("ru-RU", options);
  };

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
      <h2>История моих заказов</h2>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <TableCell>Номер заказа</TableCell>
              <TableCell>Авто</TableCell>
              <TableCell>Дата заказа</TableCell>
              <TableCell>Способ оплаты</TableCell>
              <TableCell>Статус</TableCell>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.carName}</TableCell>
                <TableCell>{formatDate(order.rentData)}</TableCell>
                <TableCell>{order.selectedPayment}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </table>
      ) : (
        <p>У вас пока нет заказов</p>
      )}
    </div>
  );
};

export default HistoreOrderUser;
