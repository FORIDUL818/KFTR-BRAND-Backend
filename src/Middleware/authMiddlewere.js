const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = req.headers["token"];
        
        if (!token) {
            return res.status(401).json({ status: "fail", message: "No token provided" });
        }
        
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ status: "fail", message: "Unauthorized" });
            }
            
            let email = decoded.email;
            if (!email) {
                return res.status(401).json({ status: "fail", message: "Invalid token" });
            }
            
            req.headers.email = email;
            next();
        });
    } catch (error) {
        res.status(500).json({ status: "fail", message: "Internal server error" });
    }
};
