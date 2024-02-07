const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const userModel = require("./src/models/userModel");
const createConsumer = require("./config/kafkaConsumer");
const { updateUserBalance } = require("./utils")

// Parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "/src/public")));

// Middleware to parse JSON bodies
app.use(express.json());

// Set view engine and template path
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Create kafka consumer instance
const consumer = createConsumer('auth-service', ['player-created'], async ({ message }) => {
    console.log("***** consumer message",{value: message.value.toString(),
    });
    await updateUserBalance(message);
});

// Start Kafka consumer when the application starts
consumer.runConsumer().catch(console.error);

// Routes
const authController = require("./routes/authRoutes");
const apiRouter = require("./routes/apiRoute");

app.use("/", authController);
app.use("/api", apiRouter);

// Gracefully disconnect Kafka consumer when the application is terminated
process.on('SIGINT', async () => {
    await consumer.disconnectConsumer();
    process.exit();
});

// Gracefully disconnect Kafka consumer when the application is terminated (for Windows)
process.on('SIGTERM', async () => {
    await consumer.disconnectConsumer();
    process.exit();
});

module.exports = app;
