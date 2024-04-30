import React, { useState } from "react";
import { Button, TextField, Typography, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { toastMessage } from "../utils/toastMessage";

import "../styles/contact.css";
import { useAuthContext } from "../context/AuthContext";

const socialLinks = [
  {
    url: "https://www.facebook.com/login/",
    icon: "ri-facebook-line",
  },
  {
    url: "https://www.instagram.com/",
    icon: "ri-instagram-line",
  },

  {
    url: "https://twitter.com/",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [question, setQuestion] = useState("");
  const authContext = useAuthContext();
  const [userContact, setUserContact] = useState({
    question: "",
  });

  const handleUserContactChange = (event) => {
    const { name, value } = event.target;

    setUserContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!userContact.question) {
      return;
    }

    const messageData = {
      question: userContact.question,
      user_id: authContext.user.user_id, // Передача user_id из информации об авторизованном пользователе
    };

    try {
      await Axios.post("http://localhost:3307/sendMessage", messageData);
      toastMessage("С вами свяжутся, обязательно!👍");
      setUserContact({
        question: "",
      });
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      toastMessage(
        "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
        "error"
      );
    }
  };

  return (
    <Helmet title="Contact">
      <CommonSection title="Контакты" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Свяжитесь с нами</h6>

              <form
                onSubmit={sendMessage}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <TextField
                  name="question"
                  label="Ваш вопрос"
                  size="medium"
                  type="text"
                  value={userContact.question}
                  onChange={handleUserContactChange}
                  required
                  sx={{ marginTop: "10px", marginBottom: "20px" }}
                />
                <button className=" contact__btn" type="submit">
                  Отправить сообщение
                </button>
              </form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Информация о нас</h6>
                <p className="section__description mb-0">
                  Беларусь, Витебск, ул. Терешковой, 9В
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Телефон</h6>
                  <p className="section__description mb-0">+375(29)1112233</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">
                    carrentVitebsk@gmail.com
                  </p>
                </div>

                <h6 className="fw-bold mt-4">Подписывайтесь на нас</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i className={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
