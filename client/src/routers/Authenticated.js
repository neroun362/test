import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import LoginPage from "../pages/LoginPage";
import RegistrePage from "../pages/RegistrePage";
import ProfilePage from "../pages/ProfilePageUser";
import HistoryOrderUser from "../pages/HistoreOrderUser";
import Layout from "../components/Layout/Layout";
import AllHistoryOrder from "../pages/AllHistoryOrder";
import AllUsersQuestion from "../pages/AllUsersQuestion"
import HistoryQuestionUser from "../pages/HistoreQuestionUser";
import AllUsers from "../pages/AllUsers";
import { useAuthContext } from "../context/AuthContext";


const Authenticated = () => {
  const authContext = useAuthContext();
  const isAdmin = authContext.role === "admin";

  return (
    <Layout>
      <Routes>
        {/* Маршруты доступные всем пользователям */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cars" element={<CarListing />} />
        <Route path="/cars/:slug" element={<CarDetails />} />
        {/* <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/registration" element={<RegistrePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/myorder" element={<HistoryOrderUser />} />
        <Route path="/myquestion" element={<HistoryQuestionUser />} />

        {/* Маршруты доступные только администраторам */}
        {isAdmin && (
          <>
            <Route path="/allorder" element={<AllHistoryOrder />} />
            <Route path="/allquestion" element={<AllUsersQuestion />} />
            <Route path="/allusers" element={<AllUsers />} />
           
            
          </>
        )}

        {/* Страница 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default Authenticated;
