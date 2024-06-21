import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navigation.css'
export default function Navigation() {
  const navigate = useNavigate()
  const userRole = localStorage.getItem("userRole")
  const userId = localStorage.getItem("userId")
  console.log(userRole)
  function handleLogout() {
    localStorage.removeItem('userRole')
    localStorage.removeItem('userId')
    navigate('/login')
  }
  return (
    <nav>
      <Link to="/">Home</Link>
      {
        userId ? (
          <>
            {
              userRole == "admin" && <Link to="/add-product">AddProduct</Link>
            }
            <Link to='/cart'>cart</Link>
            <Link onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )
      }
    </nav>
  )
}
