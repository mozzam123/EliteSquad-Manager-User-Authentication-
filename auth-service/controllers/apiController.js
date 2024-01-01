const User = require("./../src/models/userModel")

exports.loginUser = async (req, res) => {
    res.json({ message: "Hit login endpoint" });
}

exports.createUser = async (req, res) => {
    res.json({ message: "hit register endpoint" })
}


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
// exports.getUser = async (req, res) => {
//     try {
//         const userInfo = await User.findById("658bc1437b708a916818b14e")
//         res.status(200).json({ status: "success", result: userInfo })

//     } catch (error) {
//         console.error("Error is: ", error)
//         res.status(400).json({ status: "error", message: error })

//     }
// }