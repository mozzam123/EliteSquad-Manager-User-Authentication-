const User = require("./src/models/userModel")
const { kafkaProducer, kafkaConsumer } = require("./config/kafkaConfig")

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