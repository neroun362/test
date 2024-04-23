

import 'react-toastify/dist/ReactToastify.css'
import React, { Fragment, useState, useEffect } from "react";



import { ToastContainer } from "react-toastify";
import {  Route, Routes, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Unauthenticated from './routers/Unauthenticated';
import Authenticated from './routers/Authenticated';
import { useAuthContext } from './context/AuthContext';


function App() {
  const authContext = useAuthContext();

  const isUserExist = Boolean(authContext.user);
 
  
  return (
    
      <>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            {!isUserExist ? (
              <Route
                path="*"
                
                element={<Unauthenticated />}
              />
            ) : (
              <Route
                path="*"
                
                element={<Authenticated />}
              />
            )}
          </Routes>
        </BrowserRouter>
      </>
    );
  
}

export default App;
