const ReservationsModel = require("../models/reservations.model")
const FestivalModel = require('../models/festivals.model')
const EditorModel = require("../models/editors.model")
const ObjectId = require('mongoose').Types.ObjectId

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
        res.status(201).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}

module.exports.addReservation = async(req, res) => {
    const {exhibitor} = req.body
    try {
        const festival = await FestivalModel.findOne({is_current: true})
        const reservation = await ReservationsModel.create({festival: festival._id, exhibitor: exhibitor})
        res.status(201).json({response: {reservation: reservation, exhibitor: exhibitor}})
    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports.deleteReservation = async(req, res) => {
    try {
        ReservationsModel.deleteOne({_id: req.params.id})
            .then(() => res.status(201).send("Deleted"))
    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.updateReservation = async(req, res) => {
    try {
        ReservationsModel.updateOne({_id: req.params.id}, req.body)
            .then(() => res.status(201).send("success"))

    } catch(error) {
        res.status(400).send({error})
    }
}

module.exports.getReservation = async(req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send("Unknown id : " + req.params.id)
    }
    try {
        const reservation = await ReservationsModel.findById(req.params.id)
        const exhibitor = await EditorModel.findById(reservation.exhibitor)
        const festival = await FestivalModel.findOne({is_current: true}).select("-name -year -is_current")
        let editor = null
        if (reservation.games[0]) {
            const gameId = reservation.games[0].game
            editor = await EditorModel.findOne({games: gameId}).select("_id name contacts")
        }
        res.status(201).json({reservation: reservation, exhibitor: exhibitor, festival: festival, editor: editor})
    } catch (error) {
        return res.status(500).send("message : " + error)
    }
}

