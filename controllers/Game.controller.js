const GameModel = require("../models/games.model")
const EditorsModel = require("../models/editors.model")
const mongoose = require("mongoose")

module.exports.getListOfGames = async(req,res) => {

    try {
        const games = await GameModel.find()
        res.status(201).json({games: games})
    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports.getGame = async(req,res) => {
    const idGame = req.url.split("/")[1]
    const mongooseId = mongoose.Types.ObjectId(idGame)

    try {
        const game = await GameModel.findOne({_id: mongooseId})
        res.status(201).json({game: game})
    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports.addGame = async(req, res) => {
    const {name, min_yearold, category, duration, editor} = req.body

    try {

        const game = await GameModel.create({
            _id: mongoose.Types.ObjectId(),
            name: name,
            min_yearold: min_yearold,
            category: category,
            duration: duration,
            editor: mongoose.Types.ObjectId(editor)
        })

        if(editor) {
            // TODO faire push new games to editors
            const update = {$push: { games: game._id }}
            EditorsModel.updateOne({_id: mongoose.Types.ObjectId(editor)}, update)
        }

        res.status(201).json({gameId: game._id})

    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports.deleteGame = async(req, res) => {
    const idGame = req.url.split("/")[1]
    const mongooseId = mongoose.Types.ObjectId(idGame)

    try {
        GameModel.deleteOne({_id: mongooseId})
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.updateGame = async(req, res) => {
    const idGame = req.url.split("/")[1]
    const mongooseId = mongoose.Types.ObjectId(idGame)

    const {name, duration, min_yearold, category} = req.body
    const update = {
        name: name,
        duration: duration,
        min_yearold: min_yearold,
        category: category
    }

    try {
        GameModel.updateOne({_id: mongooseId}, update)
            .then(() => res.status(201).send("success"))

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}
