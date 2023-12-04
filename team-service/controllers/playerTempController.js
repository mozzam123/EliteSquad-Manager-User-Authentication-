const { Kafka } = require("kafkajs");

// Create Kafka consumer instance
const kafka = new Kafka({
    clientId: "team-service",
    brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
    groupId: "team-group",
    maxWaitTimeInMs: 400
})

consumer.connect()

consumer.subscribe({ topic: "user-credentials" })
console.log(`Subscribed to topic`);

let latestUsername;
consumer.run({
    eachMessage: async ({ message }) => {
        const { username } = JSON.parse(message.value.toString());
        latestUsername = username;
        console.log(`Received message with username: ${username}`);
    },
});


exports.getHomePage = async (req, res) => {
    res.render('home', {latestUsername: latestUsername})
}