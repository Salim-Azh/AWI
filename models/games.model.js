const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    // TODO : ajouter une image, catégorie dans une liste ajout possible/ plusieurs catégories
    {
        name:{
            type: String,
            required: true,
            trim : true
        },
        min_yearold: {
            type: Number,
            required: true,
            trim: true
        },
        category:{
            // TODO ajouter enum pour type
            /*
            'enum': [
          'famille',
          'ambiance',
          'enfant',
          'prototype'
        ],
             */
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