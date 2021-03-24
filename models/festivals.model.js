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
        nb_t_premium: {
            type: Number,
            required: true,
            min: 0
        },
        nb_t_standard: {
            type: Number,
            required: true,
            min: 0
        },
        nb_t_low: {
            type: Number,
            required: true,
            min: 0
        },
        nb_sm_premium: {
            type: Number,
            required: true,
            min: 0
        },
        nb_sm_standard: {
            type: Number,
            required: true,
            min: 0
        },
        nb_sm_low: {
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
        },
        is_current: {
            type: Boolean,
            required: true
        }
    }
)

const FestivalsModel = mongoose.model('festivals', schema)
module.exports = FestivalsModel
