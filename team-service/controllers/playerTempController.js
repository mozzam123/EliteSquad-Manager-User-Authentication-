const { Kafka } = require("kafkajs");
const Player = require("./../src/models/player")
const Team = require("./../src/models/team")


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
let kafka_id

consumer.run({
    eachMessage: async ({ message }) => {
        const { id, username } = JSON.parse(message.value.toString());
        kafka_id = id;
        latestUsername = username;
        console.log(`Received message with username: ${latestUsername} and id: ${kafka_id}`);
    },
});


exports.getHomePage = async (req, res) => {
    const userPlayers = await Player.find({ user: kafka_id })
    res.render('home', { latestUsername: latestUsername, userPlayers: userPlayers })
}