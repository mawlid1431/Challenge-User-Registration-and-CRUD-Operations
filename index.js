const express = require("express");
const app = express();
const port = 5000;

app.use(express.json()); // Middleware to parse JSON request bodies

const users = []; // Array to store user data

app.get('/', (req, res) => {
  res.send("Hello, World!");
});

app.post("/users/register", (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Check if email already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).send("Email already exists");
  }

  // Validate password and confirm password
  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  // Create a new user object
  const newUser = {
    email,
    password
  };

  // Store the user in the users array
  users.push(newUser);

  res.send("User registered successfully!");
});

app.post("/users/login", (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find(user => user.email === email);

  // Check if user exists and if the password matches
  if (!user || user.password !== password) {
    return res.status(401).send("Invalid email or password");
  }

  res.send("User authenticated successfully!");
});

app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;

  // Find user by userId
  const user = users.find(user => user.id === userId);

  // Check if user exists
  if (!user) {
    return res.status(404).send("User not found");
  }

  res.json(user);
});

app.put("/users/:userId", (req, res) => {
  const userId = req.params.userId;

  // Find user by userId
  const user = users.find(user => user.id === userId);

  // Check if user exists
  if (!user) {
    return res.status(404).send("User not found");
  }

  // Update user data (e.g., user.name = req.body.name)

  res.send("User data updated successfully!");
});

app.delete("/users/:userId", (req, res) => {
  const userId = req.params.userId;

  // Find user index by userId
  const userIndex = users.findIndex(user => user.id === userId);

  // Check if user exists
  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  // Remove user from the users array
  users.splice(userIndex, 1);

  res.send("User deleted successfully!");
});

app.listen(port, () => {
  console.log('Server is running now');
});
