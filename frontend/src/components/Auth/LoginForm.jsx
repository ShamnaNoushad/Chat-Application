import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo1 from '../assets/chat.png'
import './auth.css'

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
            console.log(response.data); // Handle successful login
            localStorage.setItem('token', response.data.token); // Store token in local storage
            navigate('/chat'); // Redirect to chat room after successful login
        } catch (error) {
            console.error(error.response.data); // Log error response
            setErrorMessage('Invalid email or password. Please try again.'); // Set error message
        }
    };

    return (

        <div>
            <div className='frm'>
                <form onSubmit={handleLogin}>
                    <div className='brand'>
                        <img src={logo1} alt="logo" />
                        <h1>Chatify</h1>
                    </div>
                    <input type="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit'>Login</button>
                </form>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                    <p>Don't have an account?</p>
                    <Link to={'/register'}>
                        <span style={{ color: '#3182ce', cursor: 'pointer' }}>Register</span>
                    </Link>
                </div>
                {errorMessage && <p style={{ color: 'red', marginTop: '0.5rem' }}>{errorMessage}</p>}
            </div>
        </div>

    );
}


export default LoginForm