import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import Swal from 'sweetalert2'
export default function Login() {
  const navigate=useNavigate()
const[userName,setUserName]=useState('')
const[password,setPassword]=useState('')
async function login(){
  const newUser={email:userName,password}
  const response= await axios.post(`${process.env. 
    REACT_APP_BACKEND_URL}/api/auth/login`,newUser)
  if(response.status===200){
    localStorage.setItem('userId',response.data.userId)
    localStorage.setItem('userRole',response.data.role)
    navigate('/')
  }
}
  return (
    <div className='login-container'>
      <div className='form-group'>
        <label>Email:</label>
        <input
        value={userName}
        onChange={(e)=>setUserName(e.target.value)}
        />
        </div>
        <div className='form-group'>
          <label>Password:</label>
        <input
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        </div>
        <button onClick={login}>login</button>
    </div>
  )
}
