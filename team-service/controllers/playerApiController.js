const Team = require("../src/models/team");
const Player = require("../src/models/player");
const { StatusCodes } = require("http-status-codes");


const teamId = "658bc2b753313be33640c011"

// Create Player
exports.createPlayer = async (req, res) => {
  try {
    const { name, user, } = req.body;

    // const existingPlayer = await Player.findOne({ name: name });
    const playerCount = await Player.countDocuments({ user: user });

    if (existingPlayer) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: "Player already exists.",
      });
    }

    else if (playerCount > 7) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: "Cannot add more than 7 Players"
      })
    }


    const playerData = new Player(req.body);

    const savedPlayer = await playerData.save();

    // Associate the player with the team
    await Team.findByIdAndUpdate(
      teamId,
      { $push: { players: savedPlayer._id } },
      { new: true }
    );

    res.status(StatusCodes.OK).json({
      status: "success",
      data: savedPlayer,
    });
  } catch (error) {
    console.error(error);
    res.json({ error: error });
  }
};

// Delete Player
exports.deletePlayer = async (req, res) => {
  const existingPlayer = await Player.findByIdAndDelete(req.query.id);

  if (!existingPlayer) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Player does not exist",
    });
  }
  res.status(StatusCodes.ACCEPTED).json({
    status: "success",
    message: "Player deleted",
    result: existingPlayer,
  });
};

// Get All Players
exports.getAllPlayers = async (req, res) => {
  try {
    const allPlayers = await Player.find();

    res.status(StatusCodes.OK).json({
      status: "success",
      results: allPlayers,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: error,
    });
  }
};

// Get Single Player
exports.getPlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.query.id);
    return res.status(StatusCodes.OK).json({
      status: "success",
      result: player,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      error: "Player does not exist",
    });
  }
};

// Update Player
exports.updatePlayer = async (req, res) => {
  try {
    const updatePlayer = await Player.findByIdAndUpdate(
      req.query.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(StatusCodes.ACCEPTED).json({
      status: "Updated successfully",
      result: updatePlayer,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      error: "Invalid Id",
    });
  }
};
