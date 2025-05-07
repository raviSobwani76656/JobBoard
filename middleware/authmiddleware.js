const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret";

require('dotenv').config();


const authMiddleware = (req, res, next) => {

    const authHeader = req.headers["authorization"]

    console.log("Authorization Header:", req.headers.authorization);

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) { return res.status(401).json({ status: false, message: "Access Denied. No Token Provided" }) };
    console.log(JWT_SECRET_KEY, "JWT_SEC");

 
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {

        if (err) {
            console.log("JWT Error:", err);
            return res.status(403).json({ message: "Acess Denied. Please provide valid token" })
        };

        console.log("Decoded Token", decoded)
        req.user = decoded;
        next();

    })
}

module.exports = { authMiddleware };