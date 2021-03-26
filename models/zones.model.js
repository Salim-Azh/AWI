const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        label:{
            type: String,
            required: true,
            trim: true
        }
    }
)

const ZoneModel = mongoose.model('zone', schema)
module.exports = ZoneModel
