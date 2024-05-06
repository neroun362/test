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

const Unauthenticated = () => {
  return (
    <Routes>
      <Route path="/login" element = {<LoginPage/>}/>
      <Route path="/registration" element = {<RegistrePage/>}/>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default Unauthenticated;
