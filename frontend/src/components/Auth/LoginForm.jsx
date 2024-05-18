import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        <div style={{ padding: '1.5rem', maxWidth: '32rem', margin: 'auto', marginTop: '10%' }}>
            <h1 style={{ fontSize: '1.875rem', textAlign: 'center', fontWeight: '600', marginTop: '1.75rem' }}>Login</h1>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="email" placeholder="Email" style={{ border: '1px solid #000', padding: '0.75rem', borderRadius: '0.5rem' }} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" style={{ border: '1px solid #000', padding: '0.75rem', borderRadius: '0.5rem' }} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" style={{ backgroundColor: '#374151', color: '#fff', padding: '0.75rem', borderRadius: '0.5rem', textTransform: 'uppercase', cursor: 'pointer', transition: 'opacity 0.3s' }} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    Sign In
                </button>
            </form>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                <p>Don't have an account?</p>
                <Link to={'/register'}>
                    <span style={{ color: '#3182ce', cursor: 'pointer' }}>Register</span>
                </Link>
            </div>
            {errorMessage && <p style={{ color: 'red', marginTop: '0.5rem' }}>{errorMessage}</p>}
        </div>
    );
}


export default LoginForm