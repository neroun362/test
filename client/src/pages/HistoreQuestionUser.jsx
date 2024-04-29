import React, { useState, useEffect } from "react";
import Axios from "axios";
import { TableCell, TableRow } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";

const QuestionHistoryUser = () => {
  const authContext = useAuthContext();
  const [questions, setQuestions] = useState([]);
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
    const fetchUserQuestion = async () => {
      try {
        const response = await Axios.get("http://localhost:3307/question", {
          headers: {
            Authorization: `Bearer ${authContext.user.user_id}`, // Передаем user_id в заголовке запроса
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchUserQuestion();
  }, [authContext.user.user_id]);

  return (
    <div>
      <h2>История моих вопросов</h2>
      {questions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <TableCell>Номер вопроса</TableCell>
              <TableCell>Вопрос</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Статус</TableCell>
            </tr>
          </thead>
          <tbody>
            {questions.map((questions, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{questions.question}</TableCell>
                <TableCell>{formatDate(questions.messageData)}</TableCell>
                <TableCell>{questions.status}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </table>
      ) : (
        <p>У вас пока нет вопросов</p>
      )}
    </div>
  );
};

export default QuestionHistoryUser;
