import React, { useState } from "react";
import { Button, TextField, Typography, Box, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import img from "../assets/all-images/drive.jpg";
import Axios from "axios";
import { toastMessage } from "../utils/toastMessage";
import { useAuthContext } from "../context/AuthContext";

const RegisterPage = ({ onLogin, onRegister }) => {
  const [firstNameUserReg, setFirstNameUserReg] = useState("");
  const [lastNameUserReg, setLastNameUserReg] = useState("");
  const [phoneUserReg, setPhoneUserReg] = useState("");
  const [emailUserReg, setEmailUserReg] = useState("");
  const [passwordUserReg, setPasswordUserReg] = useState("");
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const register = () => {
    if (
      !firstNameUserReg ||
      !lastNameUserReg ||
      !phoneUserReg ||
      !emailUserReg ||
      !passwordUserReg
    ) {
      toastMessage("Пожалуйста, заполните все поля формы.");
      return;
    }

    // Проверка наличия @
    if (!emailUserReg.includes("@")) {
      toastMessage(
        "Адрес электронной почты должен содержать символ «@».",
        "error"
      );
      return;
    }

    // Проверка корректности email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailUserReg)) {
      toastMessage("Некорректный email.", "error");
      return;
    }

    Axios.post("http://localhost:3307/registration", {
      firstName: firstNameUserReg,
      lastName: lastNameUserReg,
      phone: phoneUserReg,
      email: emailUserReg,
      password: passwordUserReg,
    }).then((response) => {
      const user = response.data;
      console.log(response);
      authContext.authUserChangeHandler(user);
    });

    navigate("/home");
    toastMessage("Добро пожаловать к нам! Спасибо что выбрали Нас!");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Box p={4} boxShadow={3} borderRadius={4} bgcolor="Ivory">
            <Typography variant="h5" align="center" gutterBottom>
              Регистрация
            </Typography>
            <form>
              <TextField
                name="firstName"
                label="Имя"
                type="text"
                size="medium"
                onChange={(e) => {
                  setFirstNameUserReg(e.target.value);
                }}
                required
                sx={{ marginBottom: "10px" }}
              />

              <TextField
                name="lastName"
                label="Фамилия"
                type="text"
                size="medium"
                onChange={(e) => {
                  setLastNameUserReg(e.target.value);
                }}
                required
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                name="phone"
                label="Телефон"
                size="small"
                onChange={(e) => {
                  setPhoneUserReg(e.target.value);
                }}
                fullWidth
                margin="normal"
                type="tel"
                required
              />
              <TextField
                name="email"
                label="Email"
                size="small"
                onChange={(e) => {
                  setEmailUserReg(e.target.value);
                }}
                fullWidth
                margin="normal"
                type="email"
                required
              />
              <TextField
                name="password"
                label="Пароль"
                size="small"
                onChange={(e) => {
                  setPasswordUserReg(e.target.value);
                }}
                fullWidth
                margin="normal"
                type="password"
                required
              />

              <Button
                onClick={register}
                type="button"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Зарегистрироваться
              </Button>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Уже есть аккаунт?{" "}
                <Link to="/login">
                  <span onClick={onLogin}>Войти</span>
                </Link>
              </Typography>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterPage;
