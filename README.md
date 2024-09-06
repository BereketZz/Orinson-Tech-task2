<h1>Orinson Technologies Backend Development Task 2 - Task Management API</h1>

  <h2>Project Overview</h2>
    <p>
        This project is a backend service for managing tasks. Users can create, view, update, and delete tasks. Each task is linked to a specific user, ensuring that users can only manage their own tasks. The backend is built using the following technologies:
    </p>
    <ul>
        <li><strong>Express</strong>: A web framework for Node.js used to create the server and manage routing.</li>
        <li><strong>Mongoose</strong>: An ODM (Object Data Modeling) library for MongoDB and Node.js, used for database interaction.</li>
        <li><strong>MongoDB</strong>: A NoSQL database used to store task data.</li>
        <li><strong>JWT (JSON Web Tokens)</strong>: Used for securing protected routes and authenticating users.</li>
        <li><strong>Nodemon</strong>: A tool that automatically restarts the server when file changes in the directory are detected, improving development workflow.</li>
    </ul>

  <h2>Setup Instructions</h2>
    <ol>
        <li>Clone the repository to your local machine:
            <pre><code>git clone https://github.com/BereketZz/Orinson-Tech-task2.git</code></pre>
        </li>
        <li>Install the required dependencies:
            <pre><code>npm install</code></pre>
        </li>
        <li>Create a <code>.env</code> file in the root directory and add your MongoDB connection string and JWT secret:
            <pre><code>
                MONGO_URI=your_mongodb_connection_string<br>
                JWT_SECRET=your_jwt_secret<br>
            </code></pre>
        </li>
        <li>Start the development server with nodemon:
            <pre><code>npm start</code></pre>
        </li>
    </ol>

   <h2>API Endpoints</h2>
    <p>The following API endpoints are available for managing tasks:</p>
    <ul>
        <li><strong>POST /auth/register</strong> - new user register</li>
        <li><strong>POST /auth/login</strong> - user login</li>
        <li><strong>POST /task/create</strong> - Create a new task. Requires the user to be authenticated.</li>
        <li><strong>GET /task/get</strong> - Get all tasks for the authenticated user.</li>
        <li><strong>GET /task/get/:id</strong> - Get a specific task by ID. Requires the user to be authenticated.</li>
        <li><strong>PUT /task/update/:id</strong> - Update a task by ID. Only the user who created the task can update it.</li>
        <li><strong>DELETE /task/delete/:id</strong> - Delete a task by ID. Only the user who created the task can delete it.</li>
        <li><strong>GET /task/stat</strong> - Get task statistics for the authenticated user, including total tasks and completed tasks.</li>
    </ul>

  <h2>Task Schema</h2>
    <p>Each task contains the following fields:</p>
    <ul>
        <li><strong>name</strong> (String): The name of the task (required).</li>
        <li><strong>description</strong> (String): A brief description of the task (required).</li>
        <li><strong>status</strong> (String): Status of the task (pending or completed).</li>
        <li><strong>user</strong> (ObjectId): A reference to the user who created the task.</li>
        <li><strong>createdAt</strong> (Date): The date the task was created (automatically generated).</li>
        <li><strong>updatedAt</strong> (Date): The date the task was last updated (automatically updated).</li>
    </ul>

