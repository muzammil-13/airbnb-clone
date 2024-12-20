import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForm.css';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { IoMdLogIn } from "react-icons/io";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdOutlineSwitchAccount } from "react-icons/md"; // Import switch account icon
import { API_URL } from '../config';


function AuthForm() {
    const navigate = useNavigate();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
    
        try {
            const url = `${API_URL}/api/auth/${isLoginMode ? 'login' : 'register'}`;
            
            const payload = isLoginMode
                ? { email, password }
                : { 
                    firstName: username.split(' ')[0] || username, 
                    lastName: username.split(' ')[1] || username,
                    email, 
                    password 
                };

            console.log('Sending request to:', url); // Debug log
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            const data = await response.json();
            console.log('Response:', data); // Debug log
    
            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed');
            }

            // Store token
            if (data.token) {
                localStorage.setItem('token', data.token);
            } else {
                console.error('No token received');
                throw new Error('No token received from server');
            }
            
            // Store user info if returned
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            }

            // Clear form
            setEmail('');
            setPassword('');
            setUsername('');

            // Redirect to home page
            navigate('/');
            
        } catch (error) {
            console.error('Authentication error:', error);
            setErrorMessage(error.message || 'Authentication failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setEmail('');
        setPassword('');
        setUsername('');
        setErrorMessage('');
    };

    const handleHostSwitch = () => {
        navigate('/host'); // Navigate to the host page
    };

    return (
        <div className="auth-container">
            <Card variant="outlined" sx={{ maxWidth: 400, padding: '16px' }}>
                <CardContent>
                    <Typography 
                        variant="h5" 
                        component="h2" 
                        align="center" 
                        gutterBottom 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}
                    >
                        {!isLoginMode && <SiGnuprivacyguard style={{ marginRight: '8px' }} />}
                        {isLoginMode && <IoMdLogIn style={{ marginRight: '8px' }} />}
                        {isLoginMode ? 'Login' : 'Signup'}
                    </Typography>
                    <Box 
                        component="form" 
                        onSubmit={handleSubmit} 
                        noValidate 
                        sx={{ mt: 1 }}
                    >
                        {!isLoginMode && (
                            <TextField
                                margin="normal"
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        )}
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {errorMessage && (
                            <Typography 
                                variant="body2" 
                                color="error" 
                                align="center" 
                                sx={{ mt: 2 }}
                            >
                                {errorMessage}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : isLoginMode ? 'Login' : 'Signup'}
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 2 }}
                            startIcon={<MdOutlineSwitchAccount />}
                            onClick={handleHostSwitch}
                        >
                            Switch to Host
                        </Button>
                        <Typography variant="body2" align="center">
                            {isLoginMode ? "Don't have an account?" : "Already have an account?"}{' '}
                            <Button onClick={toggleMode} variant="text">
                                {isLoginMode ? 'Signup' : 'Login'}
                            </Button>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}

export default AuthForm;