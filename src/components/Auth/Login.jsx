import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Memperbaiki typo pada preventDefault
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password }); // Memperbaiki body data
            localStorage.setItem('token', response.data.access_token); // Menyimpan token setelah respons sukses
            alert('Login Successful');
            navigate('/admin/dashboard'); // Pastikan rute ini ada
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message); // Menampilkan pesan error
            alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
        </div>
    );
};

export default Login;
