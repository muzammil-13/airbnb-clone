import React, { useState } from 'react';
import '../styles/AuthForm.css';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';

function AuthForm() {
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
            const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';
            const payload = isLoginMode
                ? { email, password }
                : { firstName: username, lastName: username, email, password }; // Adjust as per your schema
    
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
    
            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
    
                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong');
                }
    
                console.log('Success:', data);
                // Handle success, e.g., store token and redirect
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setErrorMessage(error.message);
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

    return (
        <div className="auth-container">
            <Card variant="outlined" sx={{ maxWidth: 400, padding: '16px' }}>
                <CardContent>
                    <Typography variant="h5" component="h2" align="center" gutterBottom>
                        {isLoginMode ? 'Login' : 'Signup'}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                            <Typography variant="body2" color="error" align="center">
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
