const express = require("express");
const app = express();
const path = require('path')
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const userPort = process.env.USER_PORT;


const webRouter = require("././routes/loginRoute")
const apiRouter = require("././routes/apiRoute")

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")))

// Parse request bodies
app.use(express.urlencoded({ extended: false }));

// Set view engine and template path
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))


app.use("/", webRouter)
app.use("/api", apiRouter)


app.listen(userPort, () => {
  console.log(`server running on http://127.0.0.1:${userPort}`);
});
