import React, { useState } from 'react';
import '../styles/AuthForm.css';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';

function AuthForm() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                if (isLoginMode) {
                    // auth logic here
                    console.log('Login with:', email, password);
                } else {
                    // signup logic here
                    console.log('Signup with:', username, email, password);
                }
            } catch (error) {
                console.error('Authentication error:', error);
                // Handle error appropriately
            }
        };
        
        // Basic validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email');
            return;
        }
        
        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }
    
        
    };
    


    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);

        // Clear form fields when switching modes
        setEmail('');
        setPassword('');
        setUsername('');



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
                        autoFocus={isLoginMode}  // Autofocus only in login mode
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


                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        {isLoginMode ? 'Login' : 'Signup'}
                    </Button>
                    <Typography variant="body2" align="center">
                        {isLoginMode ? "Don't have an account?" : "Already have an account?"}{' '}
                        <Button onClick={toggleMode} variant='text'>
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


