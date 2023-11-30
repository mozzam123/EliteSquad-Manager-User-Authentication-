const userModel = require("./../src/models/userModel")



exports.loginUser = async (req, res) => {
    console.log("&&&&&&&&&&&&&", req.body.username);
    res.render("login")
}

exports.testUser = async (req, res) => {
    console.log("&&&&&&&&&&&&&", req.body.username);
    res.render("login")
}




exports.getRegisterUser = async (req, res) => {
    // username = req.body.username
    // password = req.body.password
    // console.log(username);
    res.render("register")
}


exports.registerUser = async(req,res) =>{
    username = req.body.username
    password = req.body.password
    console.log(username);
    res.render("register")
}