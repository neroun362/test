import React, { useState, useEffect } from "react";
import Axios from "axios";
import { TableCell, TableRow, Select, MenuItem, Button } from "@mui/material";
import { toastMessage } from "../utils/toastMessage";

const QuestionUsers = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // Состояние для выбранной даты
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
    fetchAllQuestions(); // Загрузка всех вопросов при загрузке компонента
  }, []);

  const fetchAllQuestions = async () => {
    try {
      const response = await Axios.get("http://localhost:3307/allquestion");
      setQuestions(response.data);
    } catch (error) {
      console.error("Ошибка при получении всех вопросов:", error);
    }
  };

  const fetchQuestionsByDate = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:3307/questionsByDate",
        {
          params: {
            selectedDate: selectedDate,
          },
        }
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Ошибка при получении вопросов по дате:", error);
    }
  };

  // Функция для сортировки вопросов по статусу "Открыто" в начале
  const sortQuestions = () => {
    const openQuestions = questions.filter(
      (question) => question.status === "Открыто"
    );
    const otherQuestions = questions.filter(
      (question) => question.status !== "Открыто"
    );
    return [...openQuestions, ...otherQuestions];
  };

  const handleStatusChange = async (questionId, newStatus) => {
    try {
      await Axios.put(`http://localhost:3307/messages/${questionId}/status`, {
        status: newStatus,
      });

      // Обновляем статус вопроса на клиенте без запроса на сервер
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.message_id === questionId
            ? { ...question, status: newStatus }
            : question
        )
      );
      toastMessage("Статус изменен!");
    } catch (error) {
      console.error("Ошибка при обновлении статуса вопроса:", error);
    }
  };

  // Обработчик изменения выбранной даты
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Обновляем состояние выбранной даты
  };

  // Обработчик нажатия кнопки "Показать вопросы по дате"
  const handleShowQuestionsByDate = () => {
    fetchQuestionsByDate(); // Загружаем вопросы для выбранной даты
  };

  // Обработчик нажатия кнопки "Показать все вопросы"
  const handleShowAllQuestions = () => {
    setSelectedDate("");
    fetchAllQuestions(); // Загружаем все вопросы
  };

  return (
    <div>
      <h2>Вопросы пользователей</h2>
      {/* Элемент управления для выбора даты */}
      <input type="date" value={selectedDate} onChange={handleDateChange} />
      {/* Кнопка для загрузки вопросов по выбранной дате */}
      <Button onClick={handleShowQuestionsByDate}>
        Показать вопросы по дате
      </Button>
      <br />
      {/* Кнопка для загрузки всех вопросов */}
      <Button onClick={handleShowAllQuestions}>Показать все вопросы</Button>
      {questions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <TableCell>Имя пользователя</TableCell>
              <TableCell>Номер телефона</TableCell>
              <TableCell>Вопрос</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Статус</TableCell>
            </tr>
          </thead>
          <tbody>
            {sortQuestions().map((question) => (
              <TableRow key={question.message_id}>
                <TableCell>{question.firstName}</TableCell>
                <TableCell>{question.phone}</TableCell>
                <TableCell>{question.question}</TableCell>
                <TableCell>{formatDate(question.messageData)}</TableCell>
                <TableCell>{question.status}</TableCell>
                <TableCell>
                  <Select
                    value={question.status}
                    onChange={(e) =>
                      handleStatusChange(question.message_id, e.target.value)
                    }
                  >
                    <MenuItem value="Закрыто">Закрыто</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Пока нет вопросов от пользователей</p>
      )}
    </div>
  );
};

export default QuestionUsers;
