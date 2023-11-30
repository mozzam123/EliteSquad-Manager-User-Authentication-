const express = require("express")
const router = express.Router()
const authController = require("./../controllers/authController")


router.route('/login').get(authController.loginUser).post(authController.testUser)
router.route('/register').get(authController.getRegisterUser).post(authController.registerUser)


module.exports = router