const jwt = require("jsonwebtoken"); 
 
const generateToken = (userId) => { 
    return jwt.sign( 
        { userId },  
        process.env.JWT_SECRET, 
        { expiresIn: "15h" }     
    ); 
     
    // const refreshToken = jwt.sign( 
    //     { userId }, 
    //     process.env.JWT_REFRESH_SECRET, 
    //     { algorithm: "RS256" }, 
    //     { expiresIn: "7d" } 
    // ); 
 
 
} 
 
const verifyAccessToken = (accessToken) => { 
    try { 
        const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET); 
        return userId; 
    } catch (error) { 
        return null; 
    } 
} 
 
// const verifyRefreshToken = (refreshToken) => { 
//     try { 
//         const { userId } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET); 
//         return userId; 
//     } catch (error) { 
//         return null; 
//     } 
// } 
 
 
module.exports = { generateToken, verifyAccessToken };