import React, { useState, useEffect } from "react";
import Axios from "axios";

import {
  Typography,
  Paper,
  Grid,
  Container,
  TextField,
  Button,
} from "@mui/material";
import { useAuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const authContext = useAuthContext();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await Axios.get("http://localhost:3307/profile", {
          headers: {
            Authorization: `Bearer ${authContext.user.user_id}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [authContext.user.user_id]);

  const handleEditClick = () => {
    setEditedData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      password: userData.password, // Reset password field when entering edit mode
    });
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await Axios.put("http://localhost:3307/profile", editedData, {
        headers: {
          Authorization: `Bearer ${authContext.user.user_id}`,
        },
      });
      setUserData(editedData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Профиль
        </Typography>
        {!editMode && userData && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Имя: {userData.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Фамилия: {userData.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Email: {userData.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Телефон: {userData.phone}
              </Typography>
            </Grid>
            {/* <Grid item xs={12}>
              <Typography variant="subtitle1" type="password">
                Пароль: {userData.password}
              </Typography>
            </Grid> */}
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleEditClick}>
                Редактировать профиль
              </Button>
            </Grid>
          </Grid>
        )}
        {editMode && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="firstName"
                label="Имя"
                value={editedData.firstName}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="lastName"
                label="Фамилия"
                value={editedData.lastName}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                value={editedData.email}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phone"
                label="Телефон"
                value={editedData.phone}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Пароль"
                type="password"
                value={editedData.password}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveClick}
              >
                Сохранить
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default ProfilePage;
