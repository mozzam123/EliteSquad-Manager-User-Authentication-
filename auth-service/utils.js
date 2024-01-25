const User = require("./src/models/userModel")
const { Kafka, logLevel } = require('kafkajs');


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


// Send kafk Message
exports.sendKafkaMessage = async() =>{
    try {
        
    } catch (error) {
        
    }
}