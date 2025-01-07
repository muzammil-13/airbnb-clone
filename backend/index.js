import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './Routes/auth.routes.js';
import bodyParser from 'body-parser';
import http from 'http';
import setupWebSocketServer from './services/chatbot.js';

const app = express();
const server = http.createServer(app);

// Initialize WebSocket server
setupWebSocketServer(server);

// Middleware setup in correct order
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
}));

// Routes
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 5000;

// Database connection
mongoose.connect(process.env.MONGO_URI);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});