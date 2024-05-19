import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from '../assets/chat.png'
import './auth.css'

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/register', { username, email, password });
            console.log(response.data); 
            navigate('/');
        } catch (error) {
            console.error(error.response.data); 
            setErrorMessage('Registration failed. Please try again.');
        }
    };

    return (

            <div>
                <div className='frm'>
                    <form onSubmit={handleSignUp}>
                        <div className='brand'>
                            <img src={logo1} alt="logo" />
                            <h1>Chatify</h1>
                        </div>
                        <input type="text" placeholder="Username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type='submit'>Create User</button>
                    </form>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                        <p>Already have an account?</p>
                        <Link to={'/'}>
                            <span style={{ color: '#3182ce', cursor: 'pointer' }}>Login</span>
                        </Link>
                    </div>
                    {errorMessage && <p style={{ color: 'red', marginTop: '0.5rem' }}>{errorMessage}</p>}
                </div>
            </div>
            );
}

export default RegisterForm