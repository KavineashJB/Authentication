import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login'
import Register from './Components/Register';
import ForgetPassword from './Components/ForgetPassword';
import VerifyOtp from './Components/VerifyOtp';
import ResetPassword from './Components/ResetPassword';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/:email' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgetpass/:email' element={<ForgetPassword />} />
        <Route path='/verifyotp/:email' element={<VerifyOtp />} />
        <Route path='/resetpassword/:email' element={<ResetPassword />} />
      </Routes>
    </>
  )
}

export default App;