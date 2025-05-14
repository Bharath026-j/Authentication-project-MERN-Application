import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import EmailVerify from './pages/EmailVerify';
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/email-verify' element={<EmailVerify />} />
      </Routes>
    </>
  );
};

export default App;
