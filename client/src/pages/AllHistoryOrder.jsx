import React, { useState, useEffect } from "react";
import Axios from "axios";
import { TableCell, TableRow, Select, MenuItem, Button } from "@mui/material";
import { toastMessage } from "../utils/toastMessage";

const AllHistoryOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // Состояние для выбранной даты

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
    fetchAllOrders(); // Загрузка всех заказов при загрузке компонента
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await Axios.get("http://localhost:3307/allorders");
      setOrders(response.data);
    } catch (error) {
      console.error("Ошибка при получении всех заказов:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await Axios.put(`http://localhost:3307/orders/${orderId}/status`, {
        status: newStatus,
      });

      // Обновляем статус заказа на клиенте без запроса на сервер
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.rent_id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toastMessage("Статус изменен!");
    } catch (error) {
      console.error("Ошибка при обновлении статуса заказа:", error);
    }
  };

  // Функция для загрузки заказов по выбранной дате
  const fetchOrdersByDate = async () => {
    try {
      const response = await Axios.get("http://localhost:3307/ordersByDate", {
        params: {
          selectedDate: selectedDate,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Ошибка при получении заказов по дате:", error);
    }
  };

  // Функция для очистки выбранной даты и показа всех заказов
  const showAllOrders = () => {
    setSelectedDate(""); // Очищаем выбранную дату
    fetchAllOrders(); // Загружаем все заказы
  };

  return (
    <div>
      <h2>История всех заказов</h2>
      {/* Элемент управления для выбора даты */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      {/* Кнопка для загрузки заказов по выбранной дате */}
      <Button onClick={fetchOrdersByDate}>Показать заказы по дате</Button>
      {/* Кнопка для показа всех заказов */}
      <br />
      <Button onClick={showAllOrders}>Показать все заказы</Button>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <TableCell>Имя пользователя</TableCell>
              <TableCell>Номер пользователя</TableCell>
              <TableCell>Название машины</TableCell>
              <TableCell>Дата аренды</TableCell>
              <TableCell>Время аренды</TableCell>
              <TableCell>Комментарии пользователя</TableCell>
              <TableCell>Способ оплаты</TableCell>
              <TableCell>Статус</TableCell>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <TableRow key={order.rent_id}>
                <TableCell>{order.firstName}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.carName}</TableCell>
                <TableCell>{formatDate(order.rentData)}</TableCell>
                <TableCell>{order.rentTime}</TableCell>
                <TableCell>{order.comments}</TableCell>
                <TableCell>{order.selectedPayment}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.rent_id, e.target.value)
                    }
                  >
                    <MenuItem value="В процессе">В процессе</MenuItem>
                    <MenuItem value="Завершено">Завершено</MenuItem>
                    <MenuItem value="Отменено">Отменено</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Нет доступных заказов</p>
      )}
    </div>
  );
};

export default AllHistoryOrder;
