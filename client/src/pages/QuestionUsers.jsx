import React, { useState, useEffect } from "react";
import Axios from "axios";

const QuestionUsers = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await Axios.get("http://localhost:3307/allquestion");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching user questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h2>Вопросы пользователей</h2>
      {questions.length > 0 ? (
        <div>
          {questions.map((question, index) => (
            <div key={index}>
              <p>Номер вопроса: {index + 1}</p>
              <p>Имя пользователя: {question.firstName}</p>
              <p>Номер телефона: {question.phone}</p>
              <p>Вопрос: {question.question}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>Пока нет вопросов от пользователей</p>
      )}
    </div>
  );
};

export default QuestionUsers;
