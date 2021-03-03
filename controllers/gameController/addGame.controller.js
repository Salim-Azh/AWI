const GameModel = require("../../models/games.model")
const mongoose = require("mongoose")


module.exports.addGame = async(req, res) => {
    let {name, min_yearold, category, duration, editor} = req.body

    editor = "603fc7c15552f9c6ae78e660"
    /*
    { _id: ObjectID("603fc7c15552f9c6ae78e660"),
  name: 'Nicolas',
  address: 'galois@gmaiL.com',
  contacts: [ { email: 'vzsuik' } ] }
     */

    console.log(
        {
            name: name,
            min_yearold: min_yearold,
            category: category,
            duration: duration,
            editor: editor
        }
    )

    try {

        // TODO : objectId editor is malfunctioning
        const game = await GameModel.create({
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