const express = require("express")
const router = express.Router()
const apiController = require("./../controllers/apiController")

router.route('/allusers').get(apiController.getAllUser)

module.exports = router