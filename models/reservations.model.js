const mongoose = require('mongoose')

const talk = new mongoose.Schema(
    {
        contact: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            required: false
        }
    }
)

const gamesBooked = new mongoose.Schema(
    {
        game: {
            type: String,
            required: true
        },
        qte: {
            type: Number,
            required: true
        },
        recieved: {
            type: Boolean,
            required: true
        },
        state: {
            type: Number,
            required: false
        },
        proto: {
            type: Boolean,
            required: false
        }
    }
)

const bookingSchema = new mongoose.Schema(
    {
        festival:{
            type: mongoose.Types.ObjectId,
            required: true,
            trim: true
        },
        exhibitor: {
            type: mongoose.Types.ObjectId,
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
        first_contact: {
            type: talk
        },
        second_contact: {
            type: talk
        },
        third_contact: {
            type: talk
        },
        state: {
            type: Number
        },
        negociated_price: {
            type: Number
        },
        games: {
            type: [gamesBooked]
        },
        need_volunteer: {
            type: Boolean
        },
        isEditorHere: {
            type: Boolean
        },
        reportSent: {
            type: Boolean
        },
        bill: {
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true,
    }
)

const ReservationsModel = mongoose.model('bookings', bookingSchema)
module.exports = ReservationsModel
