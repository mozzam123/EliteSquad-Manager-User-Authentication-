const express = require("express");
const app = express();
const path = require('path')
const Team = require("././src/models/team")
const Player = require("././src/models/player")

// Routes
const apiRoutes = require("././routes/apiRoutes")


// Serve static files from public directory
app.use(express.static(path.join(__dirname, "/src/public")))

// Parse request bodies
app.use(express.json());


app.use('/api', apiRoutes)

// Set view engine and template path
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))


module.exports = app;