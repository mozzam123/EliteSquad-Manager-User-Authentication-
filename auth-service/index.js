const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const userPort = process.env.USER_PORT;
const DB = process.env.DATABASE;
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "auth-service" });

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected for auth service");
  })
  .catch((err) => {
    console.log(`Database error: ${err}`);
  });

consumer.connect();
console.log("listening to consumer");
consumer.subscribe({ topic: "player-created", fromBeginning: false });
console.log("Subscribed to topic");

app.listen(userPort, () => {
  console.log(`server running on http://127.0.0.1:${userPort}`);
});
