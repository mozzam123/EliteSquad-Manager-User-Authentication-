const Team = require("./../src/models/team")
const Player = require("./../src/models/player")



exports.createPlayer = async (req, res) => {
    try {
        response = {status: '', result: '', message: ''}
        const playerName = req.body.name
        const playerPosition = req.body.position

        const existingPlayer = await Player.findOne({ name: playerName })
        if (existingPlayer) {
            response['status'] = "error"
            response['message'] = "Player already exists."
            return res.status(400).json(response)
        }
        const playerData = new Player({
            name: playerName,
            position: playerPosition
        })

        const savedData = await playerData.save()
        response['status'] = "success"
        response['result'] = savedData
        res.status(200).json(response)

    } catch (error) {
        console.error(error);
        res.json({ error: error })
    }

}


