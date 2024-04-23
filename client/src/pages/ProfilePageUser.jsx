import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const authContext = useAuthContext();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await Axios.get("http://localhost:3307/profile", {
          headers: {
            Authorization: `Bearer ${authContext.user.user_id}`, // Передача user_id в заголовке запроса
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [authContext.user.user_id]);

  return (
    <div>
      <h1>Профиль</h1>

      {userData && ( // Проверка, что userData не равен null
        <div>
          <p>Имя: {userData.firstName}</p>
          <p>Фамилия: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          <p>Телефон: {userData.phone}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
