const express = require("express")
const router = express.Router()
const playerApiController = require("../controllers/playerApiController")


router.route('/create').post(playerApiController.createPlayer)
router.route('/delete').delete(playerApiController.deletePlayer)
router.route('/players').get(playerApiController.getAllPlayers)
router.route('/player').get(playerApiController.getPlayer)
router.route('/update').post(playerApiController.updatePlayer)


module.exports = router;