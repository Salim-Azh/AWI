const mongoose = require('mongoose')

const game = new mongoose.Schema(
    {
        reservation:{ 
            type: String
        },
        game:{
            type: String
        }
    }
)

const schema = new mongoose.Schema(
    {
        festival: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        label:{
            type: String,
            required: true,
            trim: true
        },
        sm_capacity: {
            type: Number,
            minimum: 0
        },
        games:{
            type: [game]
        }
    }
)

const ZoneModel = mongoose.model('zone', schema)
module.exports = ZoneModel
