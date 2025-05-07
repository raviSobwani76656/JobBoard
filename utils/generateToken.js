const jwt = require("jsonwebtoken");

const generateJWTToken = (payload) => {
    const secretKey = process.env.JWT_SECRET_KEY
    console.log("Generating token with secret:", secretKey);

    return jwt.sign(

        payload,
        secretKey,

        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }

    )

}

module.exports = generateJWTToken;