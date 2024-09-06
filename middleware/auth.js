const jwt = require('jsonwebtoken');
const Auth = require('../models/Auth');  // Import the Auth model
require('dotenv').config()

// Middleware to protect routes
const auth = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.header('Authorization').replace('Bearer ', '');

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
     


        // Find the user by id using the decoded token data
        const user = await Auth.findOne({ _id: decoded.userId });
        
        if (!user) {
            throw new Error();
        }

        // Attach user to request
        req.user = user;
        
        // Call next middleware/route handler
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;
