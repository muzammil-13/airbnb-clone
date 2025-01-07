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
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrorMessage('');

        const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';
        const payload = { email, password, username: isLoginMode ? undefined : username };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Save token and user data to local storage or context
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            navigate('/');
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="auth-form">
            <CardContent>
                <Typography variant="h5" component="h2">
                    {isLoginMode ? 'Login' : 'Register'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    {!isLoginMode && (
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    )}
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
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
                            color="primary"
                            fullWidth
                            disabled={isLoading}
                            startIcon={isLoginMode ? <IoMdLogIn /> : <SiGnuprivacyguard />}
                        >
                            {isLoading ? <CircularProgress size={24} /> : isLoginMode ? 'Login' : 'Register'}
                        </Button>
                    </Box>
                </form>
                <Box mt={2}>
                    <Button
                        variant="text"
                        color="secondary"
                        onClick={() => setIsLoginMode((prevMode) => !prevMode)}
                        startIcon={<MdOutlineSwitchAccount />}
                    >
                        {isLoginMode ? 'Switch to Register' : 'Switch to Login'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default AuthForm;