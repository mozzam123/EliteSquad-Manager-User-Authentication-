const User = require("./src/models/userModel")
const { kafkaProducer } = require("./config/kafkaConfig")

// Authenticate User
exports.authenticateUser = async (username, password) => {
    try {
        // check if User is present in DB
        const existingUser = await User.findOne({ username });

        if (existingUser && existingUser.password === password) {
            return existingUser;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}


// Send kafka Message
exports.sendKafkaMessage = async (topic, message) => {
    try {
        await kafkaProducer.connect();
        await kafkaProducer.send({ topic: topic, messages: [{ value: JSON.stringify(message) }] });
        console.log(`Sent message to Kafka topic 'user-credentials': ${JSON.stringify(message)}`);

    } catch (error) {
        throw error
    }
    finally {
        await kafkaProducer.disconnect()
    }
}

// Update user Balance
exports.updateUserBalance = async (message) => {
    try {
        const userEvent = JSON.parse(message.value);
        const userId = userEvent.id;
        const playerAmount = userEvent.amount;
        console.log('***from updateuserbalane: ',userEvent );

        // Fetch the user from the database
        const user = await User.findById(userId);

        if (!user) {
            console.error(`User with id ${userId} not found.`);
            return;
        }

        // Update the user's balance by deducting the player amount
        user.balance = user.balance - playerAmount;
        await user.save();
        console.log(" User balance Updated!!!!");
    } catch (error) {
        throw error;
    }
};
