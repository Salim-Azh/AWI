const mongoose = require("mongoose")

const EditorModel = require("../models/editors.model")
const GamesModel = require("../models/games.model")

module.exports.getListOfEditors = async(req,res) => {
    try {
        const editors = await EditorModel.find()
        res.status(201).json(editors)
    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports.getEditor = async(req,res) => {
    const idEditor = req.params.id
    try {
        const editor = await EditorModel.findOne({_id: idEditor})
        res.status(201).json(editor)
    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports.addEditor = async(req, res) => {

    const {name, contacts, isEditor, isExhibitor, isPotential} = req.body

    try {
        const editor = await EditorModel.create({
            _id: mongoose.Types.ObjectId(),
            name: name,
            contacts: contacts,
            isEditor: isEditor,
            isExhibitor: isExhibitor,
            isPotential: isPotential
        })

        res.status(201).json({editorId: editor._id})
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}

module.exports.deleteEditor = async(req, res) => {
    const idEditor = req.params.id
    const mongooseId = mongoose.Types.ObjectId(idEditor)

    try {
        EditorModel.deleteOne({_id: mongooseId})
            .then(() => res.status(201).send("success"))

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.updateEditor = async(req, res) => {
    const idEditor = req.params.id
    const mongooseId = mongoose.Types.ObjectId(idEditor)

    try {
        EditorModel.updateOne({_id: mongooseId}, req.body)
            .then(() => res.status(201).send("success"))

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.getGamesFromEditor = async(req, res) => {
    const idEditor = req.params.id
    let games = []
    try {
        const editor = await EditorModel.findOne({_id: idEditor})
        games = await GamesModel.find({_id: editor.games})
        res.status(201).json(games)
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}
