const mongoose = require("mongoose"); 
const bcrypt = require("bcryptjs"); 
 
const userSchema = new mongoose.Schema({ 
  firstName: { 
    type: String, 
    required: true, 
    trim: true, 
  }, 
  lastName: { 
    type: String, 
    required: true, 
    trim: true, 
  }, 
  email : { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    lowercase: true, 
  } 
  , 
  password: { 
    type: String, 
    required: true, 
  }, 
  profilePicture: { 
    type: String, 
    default: "https://via.placeholder.com/150", 
  }, 
  role: { 
    type: String, 
    enum: ["user", "host" ,"admin"], 
default: "user", 
} 
}, { timestamps: true }); 
//hash password before saving 
userSchema.pre("save", function(next){ 
const user = this; 
if(!user.isModified("password")) return next(); 
bcrypt.genSalt(10, function(err, salt) { 
if (err) return next(err); 
bcrypt.hash(user.password, salt, function(err, hash) { 
if (err) return next(err); 
user.password = hash; 
next(); 
}); 
}); 
}); 
//method to compare password 
userSchema.methods.comparePassword = function(password){ 
return bcrypt.compare(password, this.password); 
} 
module.exports = mongoose.model("User", userSchema); 