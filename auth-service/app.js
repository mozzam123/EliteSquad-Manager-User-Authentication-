const express = require("express");
const app = express();
const path = require('path')
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });

// Routes
const authController = require("././routes/authRoutes")
const apiRouter = require("././routes/apiRoute")


// Serve static files from public directory
app.use(express.static(path.join(__dirname, "/src/public")))

// Parse request bodies
app.use(express.urlencoded({ extended: false }));

// Set view engine and template path
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))


app.use("/", authController)
app.use("/api", apiRouter)


module.exports = app;