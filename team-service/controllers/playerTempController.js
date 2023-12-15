const { Kafka } = require("kafkajs");
const Player = require("./../src/models/player")
const axios = require('axios');
const { getRandomNumbers } = require("./../utils")



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
    try {
        const headers = { 'X-RapidAPI-Key': '6c8744c5aamsh7a00f50a6d205e5p1c8d33jsn4fbd2ac0aa26' };
        const playerIds = getRandomNumbers()
        const playerDataPromises = playerIds.map(async (id) => {
            const playerUri = `https://api-football-beta.p.rapidapi.com/players?id=${id}&season=2015`;
            const playerResponse = await axios.get(playerUri, { headers });
            return playerResponse.data.response;
        })

        const playerDataArray = await Promise.all(playerDataPromises)

        // Flatten the array of arrays
        const flattenedPlayerData = playerDataArray.flat();

        console.log(flattenedPlayerData);

        const userPlayers = await Player.find({ user: kafka_id })
        res.render('home', { latestUsername: latestUsername, userPlayers: userPlayers })

    } catch (error) {
        console.log('Error occurred: ', error);
    }

}


exports.getCLData = async (req, res) => {
    try {

        const headers = { 'X-Auth-Token': '9c3ecd7fcda942eca3b7c09068ccc01f' };
        // Fetch CL Matches
        const matchesUri = 'https://api.football-data.org/v4/competitions/CL/matches?status=SCHEDULED';
        const matchesResponse = await axios.get(matchesUri, { headers });
        const matches = matchesResponse.data.matches;

        // Fetch CL Standings
        const standingsUri = 'https://api.football-data.org/v4/competitions/CL/standings';
        const standingsResponse = await axios.get(standingsUri, { headers });
        const standings = standingsResponse.data.standings;

        // Render the 'matches' template with both matches and standings data
        res.render('matches', { matches, standings });
    } catch (error) {
        console.error('Error fetching football data:', error.message);
        res.status(500).send('Internal Server Error');
    }
};
