const User = require("./../src/models/userModel")


// Get All User
exports.getAllUser = async (req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).json({ status: "success", result: allUsers })

    } catch (error) {
        console.error("Error is: ", error)
        // res.status(400).json({ status: "error", message: error })
    }
}

// Get User By ID
exports.getUser = async (req, res) => {
    try {
        const id = req.params.id
        const userInfo = await User.findById(id)
        res.status(200).json({ status: "success", result: userInfo })

    } catch (error) {
        console.error("Error is: ", error)
        res.status(400).json({ status: "error", message: error })

    }
}