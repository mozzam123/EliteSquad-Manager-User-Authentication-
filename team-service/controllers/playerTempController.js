process.env.KAFKAJS_NO_PARTITIONER_WARNING = "1";
const { Kafka, logLevel } = require("kafkajs");
const Player = require("./../src/models/player");
const { mongoose } = require("mongoose");
const axios = require("axios");
const { getRandomNumbers, getRandomAmounts } = require("./../utils");

let allData = [
  {
    player: {
      id: 48,
      name: "Saúl",
      firstname: "Saúl",
      lastname: "Ñíguez Esclapez",
      age: 29,
      birth: [Object],
      nationality: "Spain",
      height: "184 cm",
      weight: "76 kg",
      injured: false,
      photo: "https://media-4.api-sports.io/football/players/48.png",
    },
    statistics: [[Object], [Object], [Object], [Object]],
  },
  {
    player: {
      id: 153,
      name: "O. Dembélé",
      firstname: "Masour Ousmane",
      lastname: "Dembélé",
      age: 26,
      birth: [Object],
      nationality: "France",
      height: "178 cm",
      weight: "67 kg",
      injured: false,
      photo: "https://media-4.api-sports.io/football/players/153.png",
    },
    statistics: [[Object], [Object], [Object], [Object]],
  },
  {
    player: {
      id: 2,
      name: "M. Hitz",
      firstname: "Marwin",
      lastname: "Hitz",
      age: 36,
      birth: [Object],
      nationality: "Switzerland",
      height: "194 cm",
      weight: "91 kg",
      injured: false,
      photo: "https://media-4.api-sports.io/football/players/2.png",
    },
    statistics: [[Object], [Object], [Object], [Object], [Object]],
  },
  {
    player: {
      id: 225,
      name: "A. Behich",
      firstname: "Aziz",
      lastname: "Eraltay Behich",
      age: 33,
      birth: [Object],
      nationality: "Australia",
      height: "170 cm",
      weight: "63 kg",
      injured: false,
      photo: "https://media-4.api-sports.io/football/players/225.png",
    },
    statistics: [[Object], [Object], [Object], [Object]],
  },
  {
    player: {
      id: 139,
      name: "S. Umtiti",
      firstname: "Samuel Yves",
      lastname: "Umtiti",
      age: 30,
      birth: [Object],
      nationality: "France",
      height: "182 cm",
      weight: "75 kg",
      injured: false,
      photo: "https://media-4.api-sports.io/football/players/139.png",
    },
    statistics: [
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
    ],
  },
  {
    player: {
      id: 167,
      name: "D. Rose",
      firstname: "Daniel Lee",
      lastname: "Rose",
      age: 32,
      birth: [Object],
      nationality: "England",
      height: "173 cm",
      weight: "72 kg",
      injured: false,
      photo: "https://media-4.api-sports.io/football/players/167.png",
    },
    statistics: [[Object], [Object], [Object], [Object], [Object]],
  },
  {
    player: {
      id: 192,
      name: "Dalbert Henrique",
      firstname: "Dalbert Henrique",
      lastname: "Chagas Estevão",
      age: 30,
      birth: [Object],
      nationality: "Brazil",
      height: "181 cm",
      weight: "70 kg",
      injured: false,
      photo: "https://media-4.api-sports.io/football/players/192.png",
    },
    statistics: [[Object], [Object], [Object], [Object]],
  },
  {
    player: {
      id: 241,
      name: "M. Sadílek",
      firstname: "Michal",
      lastname: "Sadílek",
      age: 24,
      birth: [Object],
      nationality: "Czechia",
      height: "169 cm",
      weight: "65 kg",
      injured: false,
      photo: "https://media-4.api-sports.io/football/players/241.png",
    },
    statistics: [[Object], [Object]],
  },
  {
    player: {
      id: 108,
      name: "Cesc Fàbregas",
      firstname: "Francesc",
      lastname: "Fàbregas i Soler",
      age: 36,
      birth: [Object],
      nationality: "Spain",
      height: "180 cm",
      weight: "77 kg",
      injured: false,
      photo: "https://media-4.api-sports.io/football/players/108.png",
    },
    statistics: [[Object], [Object]],
  },
];

const kafka = new Kafka({
  clientId: "team-service",
  brokers: ["localhost:9092"],
  logLevel: logLevel.WARN,
});

const consumer = kafka.consumer({
  groupId: "team-group",
  maxWaitTimeInMs: 400,
});

consumer.connect();

consumer.subscribe({ topic: "user-credentials" });
console.log(`Subscribed to topic`);

let latestUsername;
let kafka_id;
let kafka_balance;

consumer.run({
  eachMessage: async ({ message }) => {
    const { id, username, balance } = JSON.parse(message.value.toString());
    kafka_id = id;
    latestUsername = username;
    kafka_balance = balance;
    console.log(
      `Received message with username: ${latestUsername} and id: ${kafka_id} and balance: ${kafka_balance}`
    );
  },
});

exports.getHomePage = async (req, res) => {
  try {
    //     const updateUserBalance = async (message) => {
    //       const userEvent = JSON.parse(message.value);
    //       const userId = userEvent.id;
    //       const playerAmount = userEvent.amount;
    //       console.log("kafka userid: ", userId);
    //       console.log("kafka playerAmount: ", playerAmount);

    //       // Fetch the user from the database
    //       const user = await userModel.findById(userId);
    //       if (!user) {
    //         console.error(`User with id ${userId} not found.`);
    //         return;
    //       }
    //       // Update the user's balance by deducting the player amount
    //       user.balance = user.balance - playerAmount;
    //       console.log("current user balance: ", user.balance);
    //       await user.save();
    //       console.log("saved User balance");
    //     };

    //     const run = async () => {
    //       await consumer.connect();
    //       await consumer.subscribe({
    //         topic: "player-created",
    //         fromBeginning: false,
    //       });
    //       console.log("Subscribed To topic");

    //       await consumer.run({
    //         eachMessage: async ({ topic, partition, message }) => {
    //           console.log({
    //             value: message.value.toString(),
    //           });
    //           await updateUserBalance(message);
    //         },
    //       });
    //     };

    //     run().catch(console.error);

    // const playerDataArray = await Promise.all(playerDataPromises)

    // Flatten the array of arrays
    // const flattenedPlayerData = playerDataArray.flat();

    const randomAmt = getRandomAmounts();

    // Add the "amount" key-value pair to each player object
    const allDataWithAmount = allData.map((player, index) => {
      return {
        ...player,
        player: {
          ...player.player,
          amount: randomAmt[index].amount,
        },
      };
    });

    flattenedPlayerData = allDataWithAmount;

    // const temp_id = "658d61a30053dd5f669c8608";
    const userPlayers = await Player.find({ user: kafka_id });

    res.render("home", {
      latestUsername: latestUsername,
      userPlayers: userPlayers,
      flattenedPlayerData: flattenedPlayerData,
      kafka_balance: kafka_balance,
      userid: kafka_id
    });
    console.log("rendered from team service************");
  } catch (error) {
    console.log("Error occurred: ", error);
  }
};

exports.getCLData = async (req, res) => {
  try {
    const headers = { "X-Auth-Token": "9c3ecd7fcda942eca3b7c09068ccc01f" };
    // Fetch CL Matches
    const matchesUri =
      "https://api.football-data.org/v4/competitions/CL/matches?status=SCHEDULED";
    const matchesResponse = await axios.get(matchesUri, { headers });
    const matches = matchesResponse.data.matches;

    // Fetch CL Standings
    const standingsUri =
      "https://api.football-data.org/v4/competitions/CL/standings";
    const standingsResponse = await axios.get(standingsUri, { headers });
    const standings = standingsResponse.data.standings;

    // Render the 'matches' template with both matches and standings data
    res.render("matches", { matches, standings });
  } catch (error) {
    console.error("Error fetching football data:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
