const ReservationsModel = require("../models/reservations.model")
const FestivalModel = require('../models/festivals.model')
const EditorModel = require("../models/editors.model")
const ObjectId = require('mongoose').Types.ObjectId

const mongoose = require("mongoose")

module.exports.getFestivalReservations = async(req, res) => {
    const response = []
    try {
        const festival = await FestivalModel.findOne({is_current: true})
        const reservations = await ReservationsModel.find({festival: festival._id}).select("-games")

        for (let i = 0; i < reservations.length; i++) {
            const element = reservations[i]
            const exhibitor = await EditorModel.findById({_id: element.exhibitor}).select("-games")
            response.push({
                exhibitor: exhibitor,
                reservation: element
            })
        }
        res.status(201).json({reservations: response})
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}

// TODO faire correspondre avec le model
module.exports.addReservation = async(req, res) => {
    const {exhibitor} = req.body
    try {
        const festival = await FestivalModel.findOne({is_current: true})
        const reservation = await ReservationsModel.create({festival: festival._id, exhibitor: exhibitor})
        console.log(reservation)
        res.status(201).json({reservation: reservation._id})
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

module.exports.getReservation = async(req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send("Unknown id : " + req.params.id)
    }
    ReservationsModel.findById(req.params.id, (err,data)=>{
        if(!err) res.send(data)
        else res.status(500).json({ message: error })
    })
}

