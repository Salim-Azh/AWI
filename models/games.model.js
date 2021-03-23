const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.ObjectId,
            required: true
        },
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
        editor: {
            type: mongoose.ObjectId,
            required: true,
            trim: true
        }
    }
)

const GameModel = mongoose.model('game', schema)
module.exports = GameModel
