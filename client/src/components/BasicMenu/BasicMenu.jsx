import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const authContext = useAuthContext();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let menuItems = [];

  // Загрузка данных из localStorage при монтировании компонента

  if (authContext.role === "user") {
    menuItems.push(
      <MenuItem key="profile" onClick={handleClose}>
        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Профиль
        </Link>
      </MenuItem>,
      <MenuItem key="myOrders" onClick={handleClose}>
        <Link
          to="/myorder"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          История моих заказов
        </Link>
      </MenuItem>,
      <MenuItem key="myquestion" onClick={handleClose}>
        <Link
          to="/myquestion"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          История моих вопросов
        </Link>
      </MenuItem>
    );
  } else if (authContext.role === "admin") {
    menuItems.push(
      <MenuItem key="viewOrders" onClick={handleClose}>
        <Link
          to="/allorder"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Заказы
        </Link>
      </MenuItem>,
      <MenuItem key="viewquestion" onClick={handleClose}>
        <Link
          to="/allquestion"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Вопросы
        </Link>
      </MenuItem>,
      <MenuItem key="viewusers" onClick={handleClose}>
        <Link
          to="/allusers"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Пользователи
        </Link>
      </MenuItem>
    );
  }

  return (
    <div>
      <div>
        <Button id="basic-button" sx={{ color: "white" }} onClick={handleClick}>
          {authContext.firstName}
        </Button>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems}
      </Menu>
    </div>
  );
}
