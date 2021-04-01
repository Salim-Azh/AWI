const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },
        min_yearold: {
            type: Number,
            required: true,
            trim: true
        },
        category:{
            type: String,
            required: true,
            trim: true
        },
        duration: {
            type: Number,
            required: true,
            min: 0
        },
        zone: {
            type: mongoose.Types.ObjectId
        }
    }
)

const GameModel = mongoose.model('game', schema)
module.exports = GameModel
