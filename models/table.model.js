const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    // TODO : place peut etre a part pour lien exposant
)

const GameModel = mongoose.model('game', schema)
module.exports = GameModel