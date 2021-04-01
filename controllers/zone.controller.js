const GameModel = require("../models/games.model")
const FestivalModel = require("../models/festivals.model")

const ObjectId = require('mongoose').Types.ObjectId

module.exports.getZones = async(req,res) => {
    try {
        const zones = await Zone.find()
        res.status(200).json(zones)
    } catch (error) {
        res.status(500).send({error})
    }
}