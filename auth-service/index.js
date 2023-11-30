const app = require("./app")
const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const userPort = process.env.USER_PORT;
const DB = process.env.DATABASE

mongoose.connect(DB)
  .then(() => {
    console.log("Database connected for auth service");
  }).catch((err) => {
    console.log(`Database error: ${err}`);
  })


app.listen(userPort, () => {
  console.log(`server running on http://127.0.0.1:${userPort}`);
});
