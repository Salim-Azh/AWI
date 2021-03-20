const mongoose = require("mongoose")

const EditorsModel = require("../models/editors.model")

module.exports.getListOfEditors = async(req,res) => {

    try {
        const editors = await EditorsModel.find()
        res.status(201).json({editors: editors})
    } catch (error) {
        res.status(400).send({error})
    }
}


module.exports.addEditor = async(req, res) => {

    const {name, contacts, isEditor, isExhibitor, isPotential} = req.body
    console.log(req.body)

    /*
    additionalProperties: false,

    {"_id":{"$oid":"603fc7c15552f9c6ae78e660"},
    "name":"Nicolas",
    "contacts":["la@gmail.com"],
    "isEditor":true,
    "isExhibitor":false,
    "isPotential":true
    }
    */

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
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}
