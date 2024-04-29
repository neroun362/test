import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  TableCell,
  TableRow,
  Button,
  Checkbox,
  TextField,
} from "@mui/material";
import { toastMessage } from "../utils/toastMessage";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [openOrders, setOpenOrders] = useState({});
  const [openQuestions, setOpenQuestions] = useState({});
  const [searchPhone, setSearchPhone] = useState("");
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("ru-RU", options);
  };

  const fetchAllUsers = async () => {
    try {
      const response = await Axios.get("http://localhost:3307/allusers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await Axios.put(`http://localhost:3307/deleteUser?id=${userId}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.user_id !== userId)
      );
      await fetchAllUsers();
      toastMessage("Пользователь удален!");
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
    }
  };

  const handleRestoreUser = async (userId) => {
    try {
      await Axios.put(`http://localhost:3307/restoreUser?id=${userId}`);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === userId ? { ...user, deleteStatus: null } : user
        )
      );
      await fetchAllUsers();
      toastMessage("Пользователь восстановлен!");
    } catch (error) {
      console.error("Ошибка при восстановлении пользователя:", error);
    }
  };

  const handleShowDeleted = () => {
    setShowDeleted(!showDeleted);
  };

  const handleViewOrders = async (userId) => {
    try {
      if (openOrders[userId]) {
        setOpenOrders((prevOpenOrders) => ({
          ...prevOpenOrders,
          [userId]: false,
        }));
      } else {
        const response = await Axios.get(
          `http://localhost:3307/ordersUser?userId=${userId}`
        );
        const userOrders = response.data;
        setOpenOrders((prevOpenOrders) => ({
          ...prevOpenOrders,
          [userId]: userOrders,
        }));
      }
    } catch (error) {
      console.error("Ошибка при получении заказов пользователя:", error);
      toastMessage("Ошибка при получении заказов пользователя");
    }
  };

  const handleViewQuestions = async (userId) => {
    try {
      if (openQuestions[userId]) {
        setOpenQuestions((prevOpenQuestions) => ({
          ...prevOpenQuestions,
          [userId]: false,
        }));
      } else {
        const response = await Axios.get(
          `http://localhost:3307/questionUser?userId=${userId}`
        );
        const userQuestions = response.data;
        setOpenQuestions((prevOpenQuestions) => ({
          ...prevOpenQuestions,
          [userId]: userQuestions,
        }));
      }
    } catch (error) {
      console.error("Ошибка при получении вопросов пользователя:", error);
      toastMessage("Ошибка при получении вопросов пользователя");
    }
  };
  const filteredUsers = users.filter((user) =>
    user.phone.includes(searchPhone)
  );

  // Обработчик изменения ввода в поле поиска
  const handleSearchChange = (e) => {
    setSearchPhone(e.target.value);
  };

  return (
    <div>
      <h2>Все зарегистрированные пользователи</h2>
      <TextField
        label="Поиск по номеру телефона"
        value={searchPhone}
        onChange={handleSearchChange}
      />
      <div>
        <Checkbox
          checked={showDeleted}
          onChange={handleShowDeleted}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <label>Показать удаленных пользователей</label>
      </div>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <TableCell>Имя</TableCell>
              <TableCell>Фамилия</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Пароль</TableCell>
              <TableCell>Действия</TableCell>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(
              (user) =>
                user.role === "user" &&
                (showDeleted
                  ? user.deleteStatus === "Удален"
                  : user.deleteStatus !== "Удален") && (
                  <TableRow key={user.id}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleViewOrders(user.user_id)}>
                        {openOrders[user.user_id]
                          ? "Закрыть заказы"
                          : "Просмотр заказов"}
                      </Button>
                      {openOrders[user.user_id] &&
                        Array.isArray(openOrders[user.user_id]) && (
                          <ul>
                            {openOrders[user.user_id].map((order, index) => (
                              <li key={index}>
                                Машина: {order.carName}; Дата аренды:
                                {formatDate(order.rentData)}; Статус:{" "}
                                {order.status}; <hr />
                              </li>
                            ))}
                          </ul>
                        )}
                      <Button onClick={() => handleViewQuestions(user.user_id)}>
                        {openQuestions[user.user_id]
                          ? "Закрыть вопросы"
                          : "Просмотр вопросов"}
                      </Button>
                      {openQuestions[user.user_id] &&
                        Array.isArray(openQuestions[user.user_id]) && (
                          <ul>
                            {openQuestions[user.user_id].map(
                              (question, index) => (
                                <li key={index}>
                                  Вопрос: {question.question}; Дата :
                                  {formatDate(question.messageData)}
                                  Статус: {question.status}; <hr />
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      {!showDeleted && (
                        <Button onClick={() => handleDeleteUser(user.user_id)}>
                          Удалить
                        </Button>
                      )}
                      {showDeleted && (
                        <Button onClick={() => handleRestoreUser(user.user_id)}>
                          Восстановить
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
            )}
          </tbody>
        </table>
      ) : (
        <p>Нет зарегистрированных пользователей</p>
      )}
    </div>
  );
};

export default AllUsers;
