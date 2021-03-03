const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    // TODO : ajouter un image, exposants
)

const GameModel = mongoose.model('game', schema)
module.exports = GameModel