const express = require("express")
const router = express.Router()
const apiController = require("./../controllers/apiController")


router.route('/create_player').post(apiController.createPlayer)


module.exports = router;