const express = require("express")
const router = express.Router()
const authController = require("./../controllers/authController")


router.route('/login').get(authController.getLoginPage).post(authController.postLoginUser)
router.route('/register').get(authController.getRegisterPage).post(authController.postRegisterUser)
router.route('/home').get(authController.getHomePage)


module.exports = router