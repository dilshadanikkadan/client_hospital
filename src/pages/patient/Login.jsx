import React from 'react'
import Navbar from '../../components/user/HomePage/Navbar'
import LoginBox from '../../components/user/Login/LoginBox'
import { useLocation } from 'react-router-dom'

const Login = () => {
  const {state}=useLocation()
  return (
    <div>
      <Navbar/>
      <LoginBox state={state}/>
    </div>
  )
}

export default Login
