const Team = require("../src/models/team")
const Player = require("../src/models/player")
const { StatusCodes } = require('http-status-codes');


// Create Player
exports.createPlayer = async (req, res) => {
    try {
        const { name: name, position: playerPosition } = req.body;
        const existingPlayer = await Player.findOne({ name: name });

        if (existingPlayer) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'Player already exists.',
            });
        }

        const playerData = new Player({
            name: name,
            position: playerPosition,
        });

        const savedData = await playerData.save();
        return res.status(StatusCodes.OK).json({
            status: 'success',
            data: savedData,
        });

    } catch (error) {
        console.error(error);
        res.json({ error: error })
    }

}

// Delete Player
exports.deletePlayer = async (req, res) => {

    const existingPlayer = await Player.findByIdAndDelete(req.query.id)

    if (!existingPlayer) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: "error",
            message: "Player does not exist"
        })
    }
    res.status(StatusCodes.ACCEPTED).json({
        status: "success",
        message: "Player deleted",
        result: existingPlayer

    })

}

// Get All Players
exports.getAllPlayers = async (req, res) => {
    try {
        const allPlayers = await Player.find()

        res.status(StatusCodes.OK).json({
            status: "success",
            results: allPlayers
        })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "error",
            message: error
        })

    }

}

// Get Single Player
exports.getPlayer = async (req, res) => {
    try {
        const player = await Player.findById(req.query.id)
        return res.status(StatusCodes.OK).json({
            status: "success",
            result: player
        })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "error",
            error: "Player does not exist"
        })

    }
}

// Update Player
exports.updatePlayer = async (req, res) => {
    try {
        const updatePlayer = await Player.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true,
        })

        res.status(StatusCodes.ACCEPTED).json({
            status: "Updated successfully",
            result: updatePlayer

        })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "error",
            error: "Invalid Id"
        })
    }
}