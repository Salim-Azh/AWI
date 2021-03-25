const mongoose = require("mongoose")

const EditorsModel = require("../models/editors.model")
const GamesModel = require("../models/games.model")

module.exports.getListOfEditors = async(req,res) => {
    const {fields} = req.body
    console.log(fields)

    try {
        const editors = await EditorsModel.find().select(fields)
        res.status(201).json({editors: editors})
    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports.getEditor = async(req,res) => {
    const idEditor = req.url.split("/")[1]
    try {
        const editor = await EditorsModel.findOne({_id: idEditor})
        res.status(201).json({editor: editor})
    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports.addEditor = async(req, res) => {

    const {name, contacts, isEditor, isExhibitor, isPotential} = req.body

    try {
        const editor = await EditorsModel.create({
            _id: mongoose.Types.ObjectId(),
            name: name,
            contacts: [contacts],
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
    const idEditor = req.url.split("/")[1]
    const mongooseId = mongoose.Types.ObjectId(idEditor)

    try {
        EditorsModel.deleteOne({_id: mongooseId})
            .then(() => res.status(201).send("success"))

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.updateEditorState = async(req, res) => {
    const idEditor = req.url.split("/")[1]
    const mongooseId = mongoose.Types.ObjectId(idEditor)
    console.log(mongooseId)

    try {
        EditorsModel.updateOne({_id: mongooseId}, req.body)
            .then(() => res.status(201).send("success"))

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.updateEditor = async(req, res) => {
    const idEditor = req.url.split("/")[1]
    const mongooseId = mongoose.Types.ObjectId(idEditor)

    const {name, contacts, isEditor, isExhibitor, isPotential} = req.body
    const update = {
        name: name,
        contacts: contacts,
        isEditor: isEditor,
        isExhibitor: isExhibitor,
        isPotential: isPotential
    }

    try {
        EditorsModel.updateOne({_id: mongooseId}, update)
            .then(() => res.status(201).send("success"))

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.getGamesFromEditor = async(req, res) => {
    const idEditor = req.url.split("/")[1]
    let games = []
    try {
        const editor = await EditorsModel.findOne({_id: idEditor})
        games = await GamesModel.find({_id: editor.games})
        res.status(201).json({games: games})
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}
