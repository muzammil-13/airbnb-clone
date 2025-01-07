import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForm.css';
import { Card, CardContent, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { IoMdLogIn } from "react-icons/io";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { API_URL } from '../config';

function AuthForm() {
    const navigate = useNavigate();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        if (!email || !password || (!isLoginMode && !username)) {
            setErrorMessage('Please fill in all fields');
            return false;
        }
        if (!email.includes('@')) {
            setErrorMessage('Please enter a valid email');
            return false;
        }
        if (!isLoginMode && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            setErrorMessage('Password must contain at least 8 characters, including letters and numbers');
            return false;
        }
        return true;
    };

    const showSuccessMessage = () => {
        setErrorMessage('');
        setTimeout(() => navigate('/'), 1000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        setErrorMessage('');

        const endpoint = isLoginMode ? '/login' : '/signup';
        const payload = isLoginMode ? { email, password } : { email, password, username };

        try {
            const response = await fetch(`${API_URL}/api/auth${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.status === 401) {
                setErrorMessage(isLoginMode ? 'Invalid email or password' : 'Email already exists');
                return;
            }

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            showSuccessMessage();
        } catch (error) {
            console.error('Auth error:', error);
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleHostSwitch = () => {
        navigate('/');
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
                        {isLoginMode ? 'Login' : 'Sign Up'}
                    </Typography>
                    <form onSubmit={handleSubmit} noValidate style={{ marginTop: '8px'}}>
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
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errorMessage && (
                            <Typography color="error" variant="body2">
                                {errorMessage}
                            </Typography>
                        )}
                        <Box mt={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="#6E7E54"
                                fullWidth
                                startIcon={isLoginMode ? <IoMdLogIn /> : <SiGnuprivacyguard />}
                                disabled={isLoading}
                            >
                                {isLoginMode ? 'Login' : 'Sign Up'}
                            </Button>
                        </Box>
                        <Box mt={2}>
                            <Button
                                variant="outlined"
                                color="#6E7E54"
                                fullWidth
                                startIcon={<MdOutlineSwitchAccount />}
                                onClick={handleHostSwitch}
                            >
                            Switch to Host
                            </Button>
                        </Box>
                        {isLoading && (
                            <Box mt={2} display="flex" justifyContent="center">
                                <CircularProgress />
                            </Box>
                        )}
                    </form>
                    <Box mt={2} textAlign="center">
                        <Button 
                        color="#6E7E54"
                        onClick={() => setIsLoginMode(!isLoginMode)} 
                        >
                            {isLoginMode ? 'Switch to Sign Up' : 'Switch to Login'}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}

export default AuthForm;
