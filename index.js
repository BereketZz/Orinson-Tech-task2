const express = require('express');
const connectionDB = require('./config/db');
const authRoutes = require('./routes/AuthRoutes'); 
const taskRoutes= require('./routes/TaskRoutes')

const app = express();

// Connect to the database
connectionDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
    res.status(200).send({ msg: "API is working" });
});

app.use('/auth', authRoutes);
app.use('/task',taskRoutes);




// Start the server
const PORT = 3001;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
