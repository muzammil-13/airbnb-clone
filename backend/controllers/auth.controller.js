const User = require('../models/User.models'); // Assuming you have this User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Login Controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Debug log
        console.log('Login attempt for email:', email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log('No user found with email:', email);
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Debug log
        console.log('User found, comparing password');

        const isMatch = await user.comparePassword(password);
        
        // Debug log
        console.log('Password match result:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "An error occurred during login" });
    }
};

// register controller
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Add validation
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ 
                message: "All fields are required" 
            });
        }

        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: "Invalid email format" 
            });
        }

        // Check if user exists - use case-insensitive search
        const existingUser = await User.findOne({ 
            email: { $regex: new RegExp(`^${email}$`, 'i') } 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                message: "Email already in use" 
            });
        }

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email: email.toLowerCase(), // Store email in lowercase
            password // Password will be hashed by the pre-save middleware
        });

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ 
            message: "An error occurred during registration" 
        });
    }
};