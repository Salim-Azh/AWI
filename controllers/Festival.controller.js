const FestivalsModel = require("../models/festivals.model")
const ReservationsModel = require("../models/reservations.model")
const EditorModel = require("../models/editors.model")
const ObjectId = require('mongoose').Types.ObjectId

module.exports.getListOfFestivals = async(req,res) => {

    try {
        const festivals = await FestivalsModel.find()
        res.status(201).json({festivals: festivals})
    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports.addFestival = async(req, res) => {

    const {name, year,
        nb_t_premium, nb_t_standard, nb_t_low,
        nb_sm_premium, nb_sm_standard, nb_sm_low,
        premium_t_price, standard_t_price, low_t_price,
        premium_sm_price, standard_sm_price, low_sm_price} = req.body

    try {

        const festival = await FestivalsModel.create({
            _id: mongoose.Types.ObjectId(),
            name: name,
            year: year,
            nb_t_premium: nb_t_premium,
            nb_t_standard: nb_t_standard,
            nb_t_low: nb_t_low,
            nb_sm_premium: nb_sm_premium,
            nb_sm_standard: nb_sm_standard,
            nb_sm_low: nb_sm_low,
            premium_t_price: premium_t_price,
            standard_t_price: standard_t_price,
            low_t_price: low_t_price,
            premium_sm_price: premium_sm_price,
            standard_sm_price: standard_sm_price,
            low_sm_price: low_sm_price,
            is_current: true
        })
        res.status(201).json({festivalId: festival._id})

    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports.deleteFestival = async(req, res) => {
    const idFestival = req.url.split("/")[1]
    const mongooseId = mongoose.Types.ObjectId(idFestival)

    try {
        FestivalsModel.deleteOne({_id: mongooseId})
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.updateFestival = async(req, res) => {
    const idFestival = req.url.split("/")[1]
    const mongooseId = mongoose.Types.ObjectId(idFestival)

    const {
        nb_tables_premium, nb_tables_standard, nb_tables_low,
        premium_t_price, standard_t_price, low_t_price,
        premium_sm_price, standard_sm_price, low_sm_price
    } = req.body

    const update = {
        nb_tables_premium: nb_tables_premium,
        nb_tables_standard: nb_tables_standard,
        nb_tables_low: nb_tables_low,
        premium_t_price: premium_t_price,
        standard_t_price: standard_t_price,
        low_t_price: low_t_price,
        premium_sm_price: premium_sm_price,
        standard_sm_price: standard_sm_price,
        low_sm_price: low_sm_price
    }

    try {
        FestivalsModel.updateOne({_id: mongooseId}, update)
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.getFestivalReservations = async(req, res) => {
    const response = [{
        exhibitor: "",
        reservation: ""
    }]
    try {
        const festival = await FestivalsModel.findOne({is_current: true})
        //console.log(festival)
        const reservations = await ReservationsModel.find({festival: festival._id}).select("-games")

        for (let i = 0; i < reservations.length; i++) {
            const element = reservations[i]
            const exhibitor = await EditorModel.findById({_id: element.exhibitor}).select("-games") 
            response[i].exhibitor = exhibitor
            response[i].reservation = element
        }
        
        console.log(reservations)

        //console.log(exhibitor)

        /*
        const reservations = await ReservationsModel.find()
        for(let i = 0; i < reservations.length; i++) {
            const festival = await FestivalModel.findOne({
                _id: mongoose.Types.ObjectId(reservations[i].festival)
            }).select('is_current')
            if(festival.is_current) {
                response[i].exhibitor = await EditorModel.findOne({
                    _id: mongoose.Types.ObjectId(reservations[i].exhibitor)
                }).select('name')
                response[i].reservation = reservations[i]
            }
        }*/
        res.status(201).json({reservations: response})
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}
