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
        res.status(201).json({response: response})
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
    ReservationsModel.findById(req.params.id, (err,data)=>{
        if(!err) res.send(data)
        else res.status(500).json({ message: error })
    })
}

