
exports.loginUser = async (req, res) => {
    console.log("&&&&&&&&&&&&&",req.body.username);
    res.render("login")
}

exports.testUser = async (req, res) => {
    console.log("&&&&&&&&&&&&&",req.body.username);
    res.render("login")
}

exports.registerUser = async (req, res) => {
    res.render("register")
}
