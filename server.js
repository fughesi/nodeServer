const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection.js");
const { errorHandler } = require("./middleware/errorHandler.js");

const app = express();
connectDB();
console.log(errorHandler);
app.use(express.json());
app.use(errorHandler);

// routes
app.use("/api/contacts", require("./routes/contactRoutes.js"));
app.use("/api/users", require("./routes/userRoutes.js"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
