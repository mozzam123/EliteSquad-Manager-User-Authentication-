const express = require("express");
const app = express();
const path = require('path')
const hbs = require('hbs')


// Serve static files from public directory
app.use(express.static(path.join(__dirname, "/src/public")))

// Parse request bodies
app.use(express.json());


// Set view engine and template path
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))