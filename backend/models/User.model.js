import mongoose from 'mongoose';

// Add timestamps and validation
const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: (v) => /\S+@\S+\.\S+/.test(v)
        }
    },
    password: { type: String, required: true, minlength: 6 },
    username: { type: String, required: true }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

export default User;