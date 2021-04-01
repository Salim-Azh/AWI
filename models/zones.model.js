const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        festival: {
            type: mongoose.Types.ObjectId
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
            type: [String]
        }
    }
)

const ZoneModel = mongoose.model('zone', schema)
module.exports = ZoneModel
