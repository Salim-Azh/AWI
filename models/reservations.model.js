const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.ObjectId,
            required: true
        },
        festival:{
            type: mongoose.ObjectId,
            required: true,
            trim: true
        },
        exhibitor: {
            type: mongoose.ObjectId,
            required: true,
            trim: true
        },
        nb_t_premium: {
            type: Number,
            required: false,
            min: 0
        },
        nb_t_standard: {
            type: Number,
            required: false,
            min: 0
        },
        nb_t_low: {
            type: Number,
            required: false,
            min: 0
        },
        nb_sm_premium: {
            type: Number,
            required: false,
            min: 0
        },
        nb_sm_standard: {
            type: Number,
            required: false,
            min: 0
        },
        nb_sm_low: {
            type: Number,
            required: false,
            min: 0
        },
        date: {
            type: Date,
            required: false
        },
        comment: {
            type: String,
            required: false
        },
        first_talk: {

        }
    }
)

const ReservationsModel = mongoose.model('bookings', schema)
module.exports = ReservationsModel
