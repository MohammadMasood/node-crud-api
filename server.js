const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});