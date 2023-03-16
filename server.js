const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection.js");
const errorHandler = require("./middleware/errorHandler.js");

const app = express();
connectDB();

app.use(express.json());
app.use(errorHandler);

// routes
app.use("/api/contacts", require("./routes/contactRoutes.js"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
