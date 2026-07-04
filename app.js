const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic health check route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Home API" });
});

// Routes
const homeRoutes = require("./routes/homeRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

app.use("/api/home", homeRoutes);
app.use("/api/properties", propertyRoutes);

module.exports = app;
