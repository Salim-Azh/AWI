const mongoose = require('mongoose')

const contact = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: false
        }
    }
)

const schema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        contacts: {
            type: [contact],
            required: true,
            trim: true
        }
    }
)

const EditorModel = mongoose.model('editor', schema)
module.exports = EditorModel
