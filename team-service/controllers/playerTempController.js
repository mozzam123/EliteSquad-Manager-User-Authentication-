const { Kafka } = require("kafkajs");
const Player = require("./../src/models/player")
const Team = require("./../src/models/team")
const axios = require('axios');

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

exports.getMatchPage = async (req, res) => {
    const uri = 'https://api.football-data.org/v4/competitions/CL/matches?status=SCHEDULED';
    const headers = { 'X-Auth-Token': '9c3ecd7fcda942eca3b7c09068ccc01f' };
    try {
        const response = await axios.get(uri, { headers });
        const matches = response.data.matches;
        console.log(matches.utcDate);

        // Render the football matches in a table using a Handlebars template
        res.render('matches', { matches });
    } catch (error) {
        console.error('Error fetching football matches:', error.message);
        res.status(500).send('Internal Server Error');
    }
}
