const app = require("./app")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({ path: "./../config.env" });

const team_port = process.env.Team_Service_Port;
const DB = process.env.DATABASE


mongoose.connect(DB)
    .then(() => {
        console.log("Database connected for team service");
    }).catch((err) => {
        console.log(`Database error: ${err}`);
    })


app.listen(team_port, () => {
    console.log(`server running on http://127.0.0.1:${team_port}`);
});