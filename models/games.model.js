const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim : true
        },
        category:{
            type: String,
            required: true,
            trim: true
        }
    }
)

const GameModel = mongoose.model('game', schema)
module.exports = GameModel