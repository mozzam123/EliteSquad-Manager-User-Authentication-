const express = require("express")
const router = express.Router()
const apiController = require("./../controllers/apiController")

router.route('/create').get(apiController.createUser)
router.route('/login').get(apiController.loginUser)

module.exports = router