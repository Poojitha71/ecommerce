import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Signup() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
        const newUser = { name, email, password, mobile }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, newUser)

            .then((res) => {
                console.log(res)
                if (res.status === 201)
                    navigate('/login')
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className='signup-container'>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label> Enter your name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label> Enter your email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label> Enter your password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label> Enter phone number</label>
                    <input
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)} required />
                </div>
                <button>Submit</button>

            </form>
        </div>
    )
}
