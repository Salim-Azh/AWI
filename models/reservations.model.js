const mongoose = require('mongoose')

const gamesBooked = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        name: {
            type: String
        },
        total_qte: {
            type: Number
        },
        exposed_qte:{
            type: Number
        },
        proto: {
            type: Boolean,
            default: false
        },
        zone: {
            type: String,
            trim: true,
            default: "Non assigné"
        },
        /*
        STATES CAN BE CALCULATED
        "place"//if zone exist in the document
        "a_place"//if zone doesn't exist in the document*/
        state: {
            type: String,
            enum: [
                "en attente de réception",//received=false;bring_by_exhibitor=false;
                "reçu",//received=true;bring_by_exhibitor=false;
                "apporté par exposant",//received=false;bring_by_exhibitor=true;
                "à renvoyer",//proto=true; received=true
                "renvoyé",//received=true;bring_by_exhibitor=false;proto=true;returned=true
            ],
            default: "en attente de réception",
            required: true
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
        state:{
            type: String,
            enum: [
                "En discussion",
                "Pas de réponse",
                "Considéré absent",
                "Annulé",
                "Confirmé",
                "Liste jeux demandé",
                "Liste jeux confirmé"
            ],
            default: "En discussion"
        },
        comment: {
            type: String,
            required: false
        },
        talks: {
            type: [String]
        },
        negociated_price: {
            type: Number
        },
        games: {
            type: [gamesBooked]
        },
        need_volunteer: {
            type: Boolean,
            default: false
        },
        isEditorHere: {
            type: Boolean,
            default: false
        },
        reportSent: {
            type: Boolean,
            default: false
        },
        bill: {
            type: mongoose.Types.ObjectId
        },
        price: {
            type: Number
        }
    },
    {
        timestamps: true,
    }
)

const ReservationsModel = mongoose.model('bookings', bookingSchema)
module.exports = ReservationsModel
