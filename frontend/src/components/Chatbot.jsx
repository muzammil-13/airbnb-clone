import React, { useState, useEffect, useRef } from 'react';
import { Paper, TextField, IconButton, Box, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:5000');
        
        ws.onopen = () => {
            console.log('Connected to chatbot');
        };

        ws.onmessage = (event) => {
            setMessages(prev => [...prev, { text: event.data, sender: 'bot' }]);
        };

        setSocket(ws);

        return () => ws.close();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (input.trim() && socket) {
            socket.send(input);
            setMessages(prev => [...prev, { text: input, sender: 'user' }]);
            setInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <Paper elevation={3} sx={{ position: 'fixed', bottom: 20, right: 20, width: 300, height: 400 }}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
                    Travel Assistant
                </Typography>
                
                <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                    {messages.map((msg, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                mb: 1
                            }}
                        >
                            <Paper
                                sx={{
                                    p: 1,
                                    bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.100',
                                    maxWidth: '80%'
                                }}
                            >
                                <Typography>{msg.text}</Typography>
                            </Paper>
                        </Box>
                    ))}
                    <div ref={messagesEndRef} />
                </Box>

                <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        size="small"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                    />
                    <IconButton color="primary" onClick={handleSend}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
}

export default Chatbot;
