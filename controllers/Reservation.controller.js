const ReservationsModel = require("../models/reservations.model")
const FestivalModel = require('../models/festivals.model')
const EditorModel = require("../models/editors.model")

const mongoose = require("mongoose")

// TODO ajouter requ sur la bill
module.exports.getListOfReservations = async(req,res) => {
    const response = [{
        exhibitor: "",
        reservation: ""
    }]
    try {
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
        }
        res.status(201).json({reservations: response})
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}

// TODO faire correspondre avec le model
module.exports.addReservation = async(req, res) => {

    const {name, year,
        nb_tables_premium, nb_tables_standard, nb_tables_low,
        premium_t_price, standard_t_price, low_t_price,
        premium_sm_price, standard_sm_price, low_sm_price} = req.body

    try {

        const reservation = await ReservationsModel.create({
            _id: mongoose.Types.ObjectId(),
            name: name,
            year: year,
            nb_tables_premium: nb_tables_premium,
            nb_tables_standard: nb_tables_standard,
            nb_tables_low: nb_tables_low,
            premium_t_price: premium_t_price,
            standard_t_price: standard_t_price,
            low_t_price: low_t_price,
            premium_sm_price: premium_sm_price,
            standard_sm_price: standard_sm_price,
            low_sm_price: low_sm_price,
            is_current: true
        })
        res.status(201).json({resverationId: reservation._id})

    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports.deleteReservation = async(req, res) => {
    const idReservation = req.url.split("/")[1]
    const mongooseId = mongoose.Types.ObjectId(idReservation)

    try {
        ReservationsModel.deleteOne({_id: mongooseId})
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

// TODO faire correspondre avec le model
// sansles champs checkbox
module.exports.updateReservation = async(req, res) => {
    const idReservation = req.url.split("/")[1]
    const mongooseId = mongoose.Types.ObjectId(idReservation)

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

module.exports.updateReservationCheckBox = async(req, res) => {
    const idReservation = req.url.split("/")[1]
    const mongooseId = mongoose.Types.ObjectId(idReservation)

    try {
        ReservationsModel.updateOne({_id: mongooseId}, req.body)
            .then(() => res.status(201).send("success"))

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}
