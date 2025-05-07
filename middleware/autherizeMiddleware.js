const jwt = require("jsonwebtoken");
require('dotenv').config();

const autherizeRoles = (...allowedRoles) => {

    return (req, res, next) => {

        const user = req.user;

        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(401).json({ status: false, message: "Access Denied, Role Not provided" });
        }

        next();

    };

};

module.exports = { autherizeRoles };