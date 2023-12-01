const Team = require("./../src/models/team")
const Player = require("./../src/models/player")
const { StatusCodes } = require('http-status-codes');



exports.createPlayer = async (req, res) => {
    try {
        const { name: playerName, position: playerPosition } = req.body;
        const existingPlayer = await Player.findOne({ name: playerName });

        if (existingPlayer) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'Player already exists.',
            });
        }

        const playerData = new Player({
            name: playerName,
            position: playerPosition,
        });

        const savedData = await playerData.save();
        return res.status(StatusCodes.OK).json({
            status: 'success',
            message: 'Player created successfully.',
            data: savedData,
        });

    } catch (error) {
        console.error(error);
        res.json({ error: error })
    }

}


