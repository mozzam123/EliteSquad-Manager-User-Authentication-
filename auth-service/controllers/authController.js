const userModel = require("./../src/models/userModel")



exports.getLoginPage = async (req, res) => {
    res.render("login")
}

exports.postLoginUser = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        if (!existingUser) {
            return res.render("login", { alredyExist: "Invalid credentials" });
        }
        console.log("******************",req.user);
        res.render("home")

    } catch (error) {
        console.log("**********", error);
        return res.render("login");
    }

}


exports.getRegisterPage = async (req, res) => {
    res.render("register")
}


exports.postRegisterUser = async (req, res) => {
    try {
        console.log(req.body.username);
        console.log(req.body.email);
        console.log(req.body.password);

        const existingUser = await userModel.findOne({ username: req.body.username })
        if (existingUser) {
            return res.render("register", { existError: "Username or email already exists", });
        } else {
            const userData = new userModel({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });
            const savedData = await userData.save();
            console.log(
                `New user saved with usename: ${savedData.username} and password: ${savedData.password}`
            );
            
            res.render("login")
        }

    } catch (error) {
        console.log("*****errors*****", error);
        return res.render("register", { error: error.message });
    }

}


exports.getHomePage = (req, res)  =>{
    res.render('home')
}