const GameModel = require("../../models/games.model")

module.exports.getListOfGames = async(req,res) => {

    try {
        const games = await GameModel.find()
        res.status(201).json({games: games})
    } catch (error) {
        res.status(400).send({error})
    }
}