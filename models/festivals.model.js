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
        year: {
            type: Number,
            required: true,
            trim: true
        },
        nb_tables_premium: {
            type: Number,
            required: true,
            min: 0
        },
        nb_tables_standard: {
            type: Number,
            required: true,
            min: 0
        },
        nb_tables_low: {
            type: Number,
            required: true,
            min: 0
        },
        premium_t_price: {
            type: Number,
            required: true,
            min: 0
        },
        standard_t_price: {
            type: Number,
            required: true,
            min: 0
        },
        low_t_price: {
            type: Number,
            required: true,
            min: 0
        },
        premium_sm_price: {
            type: Number,
            required: true,
            min: 0
        },
        standard_sm_price: {
            type: Number,
            required: true,
            min: 0
        },
        low_sm_price: {
            type: Number,
            required: true,
            min: 0
        }
    }
)

const FestivalsModel = mongoose.model('festivals', schema)
module.exports = FestivalsModel