import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);  // Reset error

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                emailOrUsername,
                password
            });

            // Simpan token JWT ke localStorage
            localStorage.setItem('token', response.data.token);
            console.log('Login successful:', response.data);

            // Redirect ke dashboard setelah login berhasil
            navigate('/dashboard');
        } catch (err) {
            console.error('Error logging in:', err);
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email or Username:</label>
                    <input
                        type="text"
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Sign Up</a></p>
        </div>
    );
};

export default Login;
