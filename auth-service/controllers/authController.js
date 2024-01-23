const userModel = require("./../src/models/userModel");
const { Kafka } = require("kafkajs");

// Create kafka producer instance
const kafka = new Kafka({
  brokers: ["localhost:9092"],
});
const producer = kafka.producer();

exports.getLoginPage = async (req, res) => {
  res.render("login");
};

exports.postLoginUser = async (req, res) => {
  const username = req.body.username;
  try {
    const existingUser = await userModel.findOne({
      username: username,
      password: req.body.password,
    });

    if (!existingUser) {
      return res.render("login", { alredyExist: "Invalid credentials" });
    }
    // Create message to be sent to Kafka topic
    const message = {
      id: existingUser._id,
      username: existingUser.username,
      balance: existingUser.balance,
    };

    try {
      // Send message to Kafka topic
      await producer.connect();
      console.log("Producer connected");
      await producer.send({
        topic: "user-credentials",
        messages: [{ value: JSON.stringify(message) }],
      });
      console.log(
        `Sent message to Kafka topic 'user-credentials': ${JSON.stringify(
          message
        )}`
      );
      res.redirect("http://127.0.0.1:2222/home");
    } catch (kafkaError) {
      // Handle Kafka error
      console.error("Error sending message to Kafka:", kafkaError.message);
    } finally {
      // Disconnect the Kafka producer even if there was an error
      await producer.disconnect();
      console.log("Disconnected Producer");
    }
  } catch (error) {
    console.log("**********", error);
    return res.render("login");
  }
};

exports.getRegisterPage = async (req, res) => {
  res.render("register");
};

exports.postRegisterUser = async (req, res) => {
  try {
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password);

    const existingUser = await userModel.findOne({
      username: req.body.username,
    });
    if (existingUser) {
      return res.render("register", {
        existError: "Username or email already exists",
      });
    } else {
      const userData = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      const savedData = await userData.save();
      console.log(
        `New user saved with usename: ${savedData.username} and password: ${savedData.password} and Balance:  ${userData.balance}`
      );

      res.render("login");
    }
  } catch (error) {
    console.log("*****errors*****", error);
    return res.render("register", { error: error.message });
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
