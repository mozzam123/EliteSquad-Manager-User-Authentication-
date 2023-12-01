// models/player.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  // Add other player-related fields as needed
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
