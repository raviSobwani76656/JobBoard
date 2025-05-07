const isAdmin = function (req, res, next) {

    if (req.user && req.user.role === 'admin') {
        return next();
    }
    else {
        res.status(400).json({ status: false, message: "Access Denied. Admin credentials required" })
    }


}

module.exports = { isAdmin }