const express = require('express')
const router = express.Router()
const teamApiController = require("./../controllers/teamApiController")

router.route('/teams').get(teamApiController.getAllTeams)
router.route('/create').get(teamApiController.createTeam)
router.route('/team').post(teamApiController.getTeam)


module.exports = router;