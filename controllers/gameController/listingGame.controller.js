const GameModel = require("../../models/games.model")

module.exports.getListOfGames = async(req,res) => {
    const {name, category} = req.body
    console.log(req.body)
    try {
        const games =
        [
            {id: 0, name: "Jeu de l'oie", category: "enfant"},
            {id: 1, name: "l'autre jeu", category: "Adulte"},
        ]
        //const game = await GameModel.create({name, category})
        res.status(201).json({games: games})
    } catch (error) {
        res.status(400).send({error})
    }
}