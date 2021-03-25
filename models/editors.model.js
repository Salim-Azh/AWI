const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        contacts: {
            type: [String],
            required: true,
            trim: true
        },
        games: {
            type: [String],
            required: false
        },
        isEditor: {
            type: Boolean,
            required: true
        },
        isExhibitor: {
            type: Boolean,
            required: true
        },
        isPotential: {
            type: Boolean,
            required: true
        }
    }
)

const EditorModel = mongoose.model('editors', schema)
module.exports = EditorModel
