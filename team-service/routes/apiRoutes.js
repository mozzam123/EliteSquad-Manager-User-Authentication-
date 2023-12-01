const express = require("express")
const router = express.Router()
const playerApiController = require("../controllers/playerApiController")


router.route('/create_player').post(playerApiController.createPlayer)
router.route('/delete').delete(playerApiController.deletePlayer)


module.exports = router;