const verifyAccessToken = require("./jwt").verifyAccessToken; 
const authenticateUser = (req,res,next)=>{ 
    const token = req.headers.authorization?.split(" ")[1]; 
 
    if(!token){ 
        return res.status(401).json({ message: "No token provided" }); 
    } 
 
    const decodedToken = verifyAccessToken(token); 
    if(!decodedToken){ 
        return res.status(401).json({ message: "Invalid token" }); 
    } 
 
    req.userId = decodedToken.userId; 
    next(); 
} 
 
module.exports = { authenticateUser };