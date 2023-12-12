const express = require("express")
const router = express.Router()
const playerTempController = require("./../controllers/playerTempController")

router.route('/home').get(playerTempController.getHomePage)
router.route('/matches').get(playerTempController.getCLData)


module.exports = router;