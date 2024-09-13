import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext, { AuthProvider } from './AuthContext';
import { svrURL } from './constants';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validation
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }

        try {
            const response = await fetch(`${svrURL}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            login(data.token);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <h1 className="title">Login</h1>
            {error && (
                <div tabIndex="-1" role="alert" className="notification is-danger">
                    {error}
                </div>
            )}
            <form onSubmit={handleLogin}>
                <div className="field">
                    <label className="label" htmlFor="username">Username</label>
                    <div className="control">
                        <input
                            id="username"
                            className="input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            aria-required="true"
                            aria-describedby="usernameHelp"
                        />
                    </div>
                    <p id="usernameHelp" className="help">Enter your username</p>
                </div>
                <div className="field">
                    <label className="label" htmlFor="password">Password</label>
                    <div className="control">
                        <input
                            id="password"
                            className="input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-required="true"
                            aria-describedby="passwordHelp"
                        />
                    </div>
                    <p id="passwordHelp" className="help">Enter your password</p>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button type="submit" className="button is-link">Login</button>
                    </div>
                    <div className="control">
                        <button type="button" className="button is-light" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
