const GameModel = require("../models/games.model")
const mongoose = require("mongoose")

module.exports.getListOfGames = async(req,res) => {

    try {
        const games = await GameModel.find()
        res.status(201).json({games: games})
    } catch (error) {
        res.status(400).send({error})
    }
}


module.exports.addGame = async(req, res) => {

    const {name, min_yearold, category, duration} = req.body

    // TODO ajouter dans le front l'envoie de l'editor id
    const editor = "603fc7c15552f9c6ae78e660"
    /*
    { _id: ObjectID("603fc7c15552f9c6ae78e660"),
  name: 'Nicolas',
  address: 'galois@gmaiL.com',
  contacts: [ { email: 'vzsuik' } ] }
     */

    try {

        const game = await GameModel.create({
            _id: mongoose.Types.ObjectId(),
            name: name,
            min_yearold: min_yearold,
            category: category,
            duration: duration,
            editor: mongoose.Types.ObjectId(editor)
        })
        res.status(201).json({game: game._id})

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
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}
