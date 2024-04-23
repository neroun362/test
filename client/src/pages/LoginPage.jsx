import { Button, TextField, Grid } from "@mui/material";
import Axios from "axios";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import img from "../assets/all-images/login-img/2.png";
import { toastMessage } from "../utils/toastMessage";
import { useAuthContext } from "../context/AuthContext";

const LoginPage = ({ onRegister }) => {
  const [phoneUser, setPhoneUser] = useState("");
  const [passwordUser, setPasswordlUser] = useState("");

  const authContext = useAuthContext();
  const login = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3307/login", {
      phone: phoneUser,
      password: passwordUser,
    }).then((response) => {
      if (response.data.message) {
        //setLoginStatus(response.data.message);
        toastMessage("Некорректные данныe", "error");
        return;
      } else {
        const user = response.data;
        console.log(user);
        toastMessage("Вы успешно вошли в аккаунт!");
        //localStorage.setItem("isLoggedIn", "true");
        authContext.authUserChangeHandler(user);
      }
    });

    //toastMessage("Вы успешно зарегистрировались!");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "40% 35%",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "80px",
          width: "100%",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)", // Добавлен эффект тени
          fontSize: "36px",
          fontWeight: "bold", // Жирный шрифт
          letterSpacing: "2px", // Увеличение расстояния между буквами
          color: "white",
          zIndex: "1", // Задний план
        }}
      >
        <h1>Добро пожаловать!</h1>
      </div>

      <div
        style={{
          width: "max-content",
          padding: "20px",
          backgroundColor: "Ivory", // Белый цвет фона окна авторизации
          borderRadius: "8px", // Закругленные углы
          textAlign: "center", // Выравнивание по центру
        }}
      >
        <h2>Авторизация</h2>
        <Grid>
          <form onSubmit={login}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                name="phone"
                label="Телефон"
                size="medium"
                type="phone"
                onChange={(e) => {
                  setPhoneUser(e.target.value);
                }}
                required
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                name="password"
                label="Пароль"
                size="medium"
                type="password"
                onChange={(e) => {
                  setPasswordlUser(e.target.value);
                }}
                required
                sx={{ marginTop: "10px", marginBottom: "20px" }}
              />
            </div>
            <Button onClick={login} type="submit" variant="contained" fullWidth>
              Войти
            </Button>

            <Link
              to="/registration"
              className=" d-flex align-items-center gap-2"
            >
              <span onClick={onRegister}>Нет аккаунта? Зарегистрируйтесь</span>
            </Link>

            <></>
          </form>
        </Grid>
      </div>
    </div>
  );
};
export default LoginPage;
