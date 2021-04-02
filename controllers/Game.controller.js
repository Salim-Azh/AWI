const GameModel = require("../models/games.model")
const mongoose = require("mongoose")
const EditorModel = require("../models/editors.model");
const ReservationModel = require("../models/reservations.model")

module.exports.getListOfGames = async(req,res) => {
    const response = []

    try {
        const games = await GameModel.find()
        for(let i = 0; i < games.length; i++) {
            const editor = await EditorModel.findOne({_id: games[i].editorId}).select("name")

            const gamesReservation = ReservationModel.findOne({"games._id": games[0]._id}).select("games")

            let j = 0
            let zones = []
            if(gamesReservation.length > 0) {
                zones = gamesReservation.games.filter(game => {
                    return game._id.toString() === games[0]._id.toString()
                })
            }

            const resp = {
                _id: games[0]._id,
                name: games[0].name,
                category: games[0].category,
                duration: games[0].duration,
                min_yearold: games[0].min_yearold,
                zone: zones.length>0? zones[0].zone: "Pas attribué",
                editor: editor
            }
            response.push(resp)
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}

module.exports.getGame = async(req,res) => {
    const idGame = req.params.id

    try {
        const game = await GameModel.findOne({_id: idGame})
        const editor = await EditorModel.findOne({games: idGame}).select("name")

        const response = {
            _id: game._id,
            name: game.name,
            category: game.category,
            duration: game.duration,
            min_yearold: game.min_yearold,
            editor: editor
        }

        res.status(201).json(response)
    } catch (error) {
        console.log(error)
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
        const update = {$addToSet: {games: game._id}}
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

    try {
        GameModel.updateOne({_id: mongooseId}, req.body)
            .then(() => res.status(201).send("success"))

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}
