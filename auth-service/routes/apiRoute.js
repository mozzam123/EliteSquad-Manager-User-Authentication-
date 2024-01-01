const express = require("express")
const router = express.Router()
const apiController = require("./../controllers/apiController")

router.route('/allusers').get(apiController.getAllUser)
router.route('/getuser/:id').get(apiController.getUser)

module.exports = router