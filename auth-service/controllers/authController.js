process.env.KAFKAJS_NO_PARTITIONER_WARNING = '1';
const userModel = require("./../src/models/userModel");
const { authenticateUser, sendKafkaMessage } = require("./../utils")
const axios = require("axios")


exports.getLoginPage = async (req, res) => {
  res.render("login");
};


exports.postLoginUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;


  try {
    const existingUser = await authenticateUser(username, req.body.password)

    if (!existingUser) {
      return res.render("login", { alredyExist: "Invalid credentials" });
    }
    const apiResponse = await axios.post("http://127.0.0.1:1111/api/login", {
      username,
      password
    })

    if (apiResponse.status == 200) {

      const kafkaMessage = {
        id: existingUser.user,
        username: existingUser.username,
        balance: existingUser.balance,
      };

      console.log('*******temp log****', kafkaMessage);
      sendKafkaMessage("user-credentials", kafkaMessage)
      res.redirect("http://127.0.0.1:2222/home");
    }


  } catch (error) {
    console.log("Login Error: ", error);
    return res.render("login", { alredyExist: "Invalid credentials" });
  }
};



// exports.postLoginUser = async (req, res) => {
//   const username = req.body.username;
//   try {
//     const existingUser = await authenticateUser(username, req.body.password)

//     if (!existingUser) {
//       return res.render("login", { alredyExist: "Invalid credentials" });
//     }
//     // Create message to be sent to Kafka topic
//     const message = {
//       id: existingUser._id,
//       username: existingUser.username,
//       balance: existingUser.balance,
//     };

//     try {
//       // Send message to Kafka topic
//       await producer.connect();
//       console.log("Producer connected");
//       await producer.send({
//         topic: "user-credentials",
//         messages: [{ value: JSON.stringify(message) }],
//       });
//       console.log(
//         `Sent message to Kafka topic 'user-credentials': ${JSON.stringify(
//           message
//         )}`
//       );
//       res.redirect("http://127.0.0.1:2222/home");
//     } catch (kafkaError) {
//       // Handle Kafka error
//       console.error("Error sending message to Kafka:", kafkaError.message);
//     } finally {
//       // Disconnect the Kafka producer even if there was an error
//       await producer.disconnect();
//       console.log("Disconnected Producer");
//     }
//   } catch (error) {
//     console.log("**********", error);
//     return res.render("login");
//   }
// };

exports.getRegisterPage = async (req, res) => {
  res.render("register");
};



exports.postRegisterUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  try {
    const apiResponse = await axios.post("http://127.0.0.1:1111/api/register", {
      username,
      password,
      email
    })

    if (apiResponse.status = 200) {
      return res.render("login")
    }

  } catch (error) {
    console.log("*****error in register user*****", error);
    return res.render("register", { existError: "User already exist" });
  }
};







exports.getHomePage = (req, res) => {
  // const updateUserBalance = async (message) => {
  //     const userEvent = JSON.parse(message.value)
  //     const userId = userEvent.id
  //     const playerAmount = userEvent.amount

  //     // Fetch the user from the database
  //     const user = await userModel.findById(userId)
  //     if (!user) {
  //         console.error(`User with id ${userId} not found.`);
  //         return;
  //     }
  //     // Update the user's balance by deducting the player amount
  //     user.balance = user.balance - playerAmount
  //     await user.save()
  // }

  // const run = async () => {
  //     await consumer.connect();
  //     await consumer.subscribe({ topic: 'player-created', fromBeginning: false });

  //     await consumer.run({
  //         eachMessage: async ({ topic, partition, message }) => {
  //             console.log({
  //                 value: message.value.toString(),
  //             });
  //             await updateUserBalance(message);
  //         },
  //     });
  // };

  // run().catch(console.error);

  res.render("home");
};
