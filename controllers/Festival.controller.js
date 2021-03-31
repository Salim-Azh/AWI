const FestivalsModel = require("../models/festivals.model")
const ReservationModel = require("../models/reservations.model")
const GameModel = require("../models/games.model")
const ObjectId = require('mongoose').Types.ObjectId
const ZoneModel = require("../models/zones.model")
const EditorModel = require("../models/editors.model")

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
            _id: ObjectId(),
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
    const idFestival = req.params.id
    const mongooseId = ObjectId(idFestival)

    try {
        FestivalsModel.deleteOne({_id: mongooseId})
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.updateFestival = async(req, res) => {
    const idFestival = req.params.id
    const mongooseId = ObjectId(idFestival)

    try {
        FestivalsModel.updateOne({_id: mongooseId}, req.body)
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.setCurrent = async(req, res) => {
    const idFestival = req.params.id
    const mongooseId = ObjectId(idFestival)

    try {
        await FestivalsModel.updateOne({is_current: true}, {is_current: false})
        FestivalsModel.updateOne({_id: mongooseId}, {is_current: true})
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

/**
 * Returns a list of games where each 
 * game is presented in the current festival
 */
 module.exports.getFestivalGames = async(req, res) => {
    const response=[]
    try {
        const currentFestival = await FestivalsModel.findOne({is_current: true})
        const reservations = await ReservationModel
            .find({festival: currentFestival._id})

        console.log(reservations)
        const games=[]
        for (let i = 0; i < reservations.length; i++) {
            const g = reservations[i].games
            for (let j = 0; j < g.length; j++) {
                const game = await GameModel.findById(g[j]._id)
                const zone = await ZoneModel.findById(game.zone)
                const exhibitor = await EditorModel.findOne({games: g[j]._id})
                games.push({game, zone, exhibitor})
                
            }
        }
        console.log(games)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

module.exports.getCurrentFestival = async(req, res) => {
    try {
        const currentFestival = await FestivalsModel
            .findOne({is_current: true})
        res.status(200).json(currentFestival)
    } catch (error) {
        console.log(e)
        res.status(500).send({e})
    }
}
