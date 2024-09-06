const Auth= require('../models/Auth')
const argon2= require('argon2')
require('dotenv').config()
const jwt= require('jsonwebtoken')


// Register a new user
const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email already exists
        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password using argon2
        const hashedPassword = await argon2.hash(password);

        // Create a new user
        const newUser = new Auth({
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Verify the password using argon2
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

         // Create a JWT token
         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
         res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};


// Export the functions
module.exports = {
    registerUser,
    loginUser,
};

