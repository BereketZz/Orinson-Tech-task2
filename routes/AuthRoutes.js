const express = require('express');
const { registerUser, loginUser } = require('../controllers/AuthControlles');
const Joi = require('joi');

const router = express.Router();

// Joi validation schemas
const registrationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(5).required().messages({
        'string.min': 'Password must be at least 5 characters long',
        'any.required': 'Password is required',
    }),
});

// Middleware to validate request body
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Route for user registration
router.post('/register', validate(registrationSchema), registerUser);

// Route for user login
router.post('/login',  loginUser);

module.exports = router;

