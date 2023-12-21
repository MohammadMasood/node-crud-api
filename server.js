const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require('./routes/users');

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

// Routes for users module
app.use('/api/users', userRoutes);

// Handling 404 for non-existing endpoints
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});


const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


module.exports = {app, server};