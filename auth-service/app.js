const express = require("express");
const app = express();
const path = require('path')
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const bodyParser = require("body-parser")
const { Kafka } = require("kafkajs");
const userModel  = require("./src/models/userModel")

// Create kafka producer instance
const kafka = new Kafka({
    brokers: ["localhost:9092"]
})


// Parse request bodies
// app.use(bodyParser.urlencoded({ extended: true }));

const consumer = kafka.consumer({ groupId: 'auth-service' });

const run = async () => {
    const updateUserBalance = async (message) => {
        const userEvent = JSON.parse(message.value)
        const userId = userEvent.id
        const playerAmount = userEvent.amount

        // Fetch the user from the database
        const user = await userModel.findById(userId)
        if (!user) {
            console.error(`User with id ${userId} not found.`);
            return;
        }
        // Update the user's balance by deducting the player amount
        user.balance = user.balance - playerAmount
        await user.save()
        console.log("Saved user balance");
    }

    await consumer.connect();
    console.log("*************** consumer connected",);
    await consumer.subscribe({ topic: 'player-created', fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            });
            await updateUserBalance(message);
        },
    });
};

run().catch(console.error);

// Routes
const authController = require("././routes/authRoutes")
const apiRouter = require("././routes/apiRoute")


// Serve static files from public directory
app.use(express.static(path.join(__dirname, "/src/public")))

// Middleware to parse JSON bodies
app.use(express.json());

// Set view engine and template path
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))


app.use("/", authController)
app.use("/api", apiRouter)


module.exports = app;