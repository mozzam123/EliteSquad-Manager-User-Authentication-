const Team = require("./../src/models/team")
const { StatusCodes } = require("http-status-codes");

// Get All Teams
exports.getAllTeams = async (req, res) => {
    try {
        const allTeams = await Team.find()
        res.status(StatusCodes.ACCEPTED).json({
            status: "success",
            results: allTeams
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "error",
            reason: error
        })

    }
}

// Create New Team
exports.createTeam = async (req, res) => {
    try {
        // Use object destructuring directly with property names
        const { name, owner, players } = req.body;

        // Assuming you have a Team model (imported or defined elsewhere)
        const team = new Team({
            name: name,
            owner: owner,
            players: players
        });

        // Save the team to the database
        const savedTeam = await team.save();

        // Respond to the client after successfully saving to the database
        res.status(StatusCodes.CREATED).json({
            status: "success",
            result: savedTeam
        });
    } catch (error) {
        // Handle errors and respond with an error status and reason
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "error",
            reason: error.message // Use error.message to get a more informative error message
        });
    }
};


exports.getTeam = async (req, res) => {
    try {
        const owner = req.body.owner
        const userTeam = await Team.find({ owner: owner }).populate('players')

        res.status(StatusCodes.ACCEPTED).json({
            status: "success",
            result: userTeam
        })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "error",
            reason: error.message // Use error.message to get a more informative error message
        });
    }




}