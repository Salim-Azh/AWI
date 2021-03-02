const GameModel = require("../../models/games.model")

module.exports.addGame = async(req, res) => {
    console.log(req.body)
    const {name, category} = req.body

    try {

        // TODO: faire correspondre le schéma avec le model de mongo
        const game = await GameModel.create({name, category})
        await game.save()
        res.status(201).json({game: game._id})

    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}