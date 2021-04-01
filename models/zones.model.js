const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
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
