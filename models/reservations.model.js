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
        total_qte: {
            type: Number,
            required: true
        },
        exposed_qte:{
            type: Number,
            required: true
        },
        received: {
            type: Boolean,
            required: true
        },
        bring_by_exhibitor: {
            type: Boolean,
            required: true
        },
        proto: {
            type: Boolean,
            required: true
        },
        returned: {
            type: Boolean,
            required: true
        },
        zone: {
            type: mongoose.Types.ObjectId
        }
        /*
        STATES CAN BE CALCULATED
        state: {
            type: String,
            enum: [
                "en_attente_de_reception",//received=false;bring_by_exhibitor=false;
                "recu",//received=true;bring_by_exhibitor=false;
                "apporte_par_exposant",//received=false;bring_by_exhibitor=true;
                "a_renvoyer",//proto=true; received=true
                "renvoye"//received=true;bring_by_exhibitor=false;proto=true;returned=true
                "place"//if zone exist in the document
                "a_place"//if zone doesn't exist in the document
            ]
        }*/
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
                "En_discussion",
                "Pas_de_reponse",
                "Considere_absent",
                "Annule",
                "Confirme",
                "Liste_jeux_demande",
                "Liste_jeux_confirme"
            ],
            default: "En_discussion"
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
        negociated_price: {
            type: Number
        },
        games: {
            type: [gamesBooked]
        },
        need_volunteer: {
            type: Boolean
        },
        isPresent: {
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
