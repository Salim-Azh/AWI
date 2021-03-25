const GameModel = require("../models/games.model")
const mongoose = require("mongoose")
const EditorModel = require("../models/editors.model");

module.exports.getListOfGames = async(req,res) => {
    const response = []

    try {
        const games = await GameModel.find()
        for(let i = 0; i < games.length; i++) {
            const editor = await EditorModel.findOne({games: games[i]._id})

            const res = {
                _id: games[i]._id,
                name: games[i].name,
                category: games[i].category,
                duration: games[i].duration,
                editor: editor
            }
            response.push(res)
        }
        res.status(201).json({response: response})
    } catch (error) {
        console.log(error)
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
            duration: duration
        })
        const update = {$addToSet: {games: game._id.toString()}}
        await EditorModel.updateOne({_id: mongoose.Types.ObjectId(editor._id)}, update)
        res.status(201).json({gameId: game._id})

    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}

module.exports.deleteGame = async(req, res) => {
    const idGame = req.url.split("/")[1]
    const mongooseId = mongoose.Types.ObjectId(idGame)

    try {
        GameModel.deleteOne({_id: mongooseId})
            .then(() => EditorModel.updateOne({games: idGame}, {$pull: {games: idGame}}))
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
