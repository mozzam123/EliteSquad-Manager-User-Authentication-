const User = require("./src/models/userModel")


// Authenticate User
exports.authenticateUser = async (username, password) => {
    try {
        const existingUser = await User.findOne({ username, password })
        return existingUser
    } catch (error) {
        throw error
    }
}

// Send Kafka messge