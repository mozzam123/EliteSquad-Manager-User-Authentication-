// models/player.js
const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  position: { type: String, required: [true, "Position field is required"] },
  height: { type: String, required: [true, "height field is required"] },
  nationality: { type: String, required: [true, "nationality field is required"] },
  weight: { type: String, required: [true, "weight field is required"] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: [true, "amount field is required"] },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
