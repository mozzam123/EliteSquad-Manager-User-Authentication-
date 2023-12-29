const { Kafka } = require("kafkajs");
const Player = require("./../src/models/player")
const axios = require('axios');
const { getRandomNumbers } = require("./../utils")
let allData = [
    {
        player: {
            id: 48,
            name: 'Saúl',
            firstname: 'Saúl',
            lastname: 'Ñíguez Esclapez',
            age: 29,
            birth: [Object],
            nationality: 'Spain',
            height: '184 cm',
            weight: '76 kg',
            injured: false,
            photo: 'https://media-4.api-sports.io/football/players/48.png'
        },
        statistics: [[Object], [Object], [Object], [Object]]
    },
    {
        player: {
            id: 153,
            name: 'O. Dembélé',
            firstname: 'Masour Ousmane',
            lastname: 'Dembélé',
            age: 26,
            birth: [Object],
            nationality: 'France',
            height: '178 cm',
            weight: '67 kg',
            injured: false,
            photo: 'https://media-4.api-sports.io/football/players/153.png'
        },
        statistics: [[Object], [Object], [Object], [Object]]
    },
    {
        player: {
            id: 2,
            name: 'M. Hitz',
            firstname: 'Marwin',
            lastname: 'Hitz',
            age: 36,
            birth: [Object],
            nationality: 'Switzerland',
            height: '194 cm',
            weight: '91 kg',
            injured: false,
            photo: 'https://media-4.api-sports.io/football/players/2.png'
        },
        statistics: [[Object], [Object], [Object], [Object], [Object]]
    },
    {
        player: {
            id: 225,
            name: 'A. Behich',
            firstname: 'Aziz',
            lastname: 'Eraltay Behich',
            age: 33,
            birth: [Object],
            nationality: 'Australia',
            height: '170 cm',
            weight: '63 kg',
            injured: false,
            photo: 'https://media-4.api-sports.io/football/players/225.png'
        },
        statistics: [[Object], [Object], [Object], [Object]]
    },
    {
        player: {
            id: 139,
            name: 'S. Umtiti',
            firstname: 'Samuel Yves',
            lastname: 'Umtiti',
            age: 30,
            birth: [Object],
            nationality: 'France',
            height: '182 cm',
            weight: '75 kg',
            injured: false,
            photo: 'https://media-4.api-sports.io/football/players/139.png'
        },
        statistics: [
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object]
        ]
    },
    {
        player: {
            id: 167,
            name: 'D. Rose',
            firstname: 'Daniel Lee',
            lastname: 'Rose',
            age: 32,
            birth: [Object],
            nationality: 'England',
            height: '173 cm',
            weight: '72 kg',
            injured: false,
            photo: 'https://media-4.api-sports.io/football/players/167.png'
        },
        statistics: [[Object], [Object], [Object], [Object], [Object]]
    },
    {
        player: {
            id: 192,
            name: 'Dalbert Henrique',
            firstname: 'Dalbert Henrique',
            lastname: 'Chagas Estevão',
            age: 30,
            birth: [Object],
            nationality: 'Brazil',
            height: '181 cm',
            weight: '70 kg',
            injured: false,
            photo: 'https://media-4.api-sports.io/football/players/192.png'
        },
        statistics: [[Object], [Object], [Object], [Object]]
    },
    {
        player: {
            id: 241,
            name: 'M. Sadílek',
            firstname: 'Michal',
            lastname: 'Sadílek',
            age: 24,
            birth: [Object],
            nationality: 'Czechia',
            height: '169 cm',
            weight: '65 kg',
            injured: false,
            photo: 'https://media-4.api-sports.io/football/players/241.png'
        },
        statistics: [[Object], [Object]]
    },
    {
        player: {
            id: 108,
            name: 'Cesc Fàbregas',
            firstname: 'Francesc',
            lastname: 'Fàbregas i Soler',
            age: 36,
            birth: [Object],
            nationality: 'Spain',
            height: '180 cm',
            weight: '77 kg',
            injured: false,
            photo: 'https://media-4.api-sports.io/football/players/108.png'
        },
        statistics: [[Object], [Object]]
    }
]

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
let kafka_balance

consumer.run({
    eachMessage: async ({ message }) => {
        const { id, username, balance } = JSON.parse(message.value.toString());
        kafka_id = id;
        latestUsername = username;
        kafka_balance = balance
        console.log(`Received message with username: ${latestUsername} and id: ${kafka_id} and balance: ${kafka_balance}`);
    },
});


exports.getHomePage = async (req, res) => {
    try {
        // const headers = { 'X-RapidAPI-Key': '6c8744c5aamsh7a00f50a6d205e5p1c8d33jsn4fbd2ac0aa26' };
        // const playerIds = getRandomNumbers()
        // const playerDataPromises = playerIds.map(async (id) => {
        //     const playerUri = `https://api-football-beta.p.rapidapi.com/players?id=${id}&season=2015`;
        //     const playerResponse = await axios.get(playerUri, { headers });
        //     return playerResponse.data.response;
        // })

        // const playerDataArray = await Promise.all(playerDataPromises)

        // Flatten the array of arrays
        // const flattenedPlayerData = playerDataArray.flat();

        // console.log(flattenedPlayerData);

        flattenedPlayerData = allData
        // console.log(flattenedPlayerData);

        const temp_id = "658bc1437b708a916818b14e"
        const userPlayers = await Player.find({ user: temp_id })
        res.render('home', { latestUsername: latestUsername, userPlayers: userPlayers, flattenedPlayerData: flattenedPlayerData, kafka_balance: kafka_balance })

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
