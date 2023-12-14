const User = require("./../src/models/userModel")


exports.loginUser = async (req, res) => {
    res.json({ message: "Hit login endpoint" });
}

exports.createUser = async (req, res) => {
    res.json({ message: "hit register endpoint" })
}


exports.getAllUser = async (req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).json({ status: "success", result: allUsers })

    } catch (error) {
        console.error("Error is: ", error)
    }
}