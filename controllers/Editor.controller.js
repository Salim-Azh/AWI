const mongoose = require("mongoose")

const EditorModel = require("../models/editor.model")
const ContactModel = require("../models/editor.model");

module.exports.getListOfEditors = async(req,res) => {

    try {
        const editors = await EditorModel.find()
        res.status(201).json({editors: editors})
    } catch (error) {
        res.status(400).send({error})
    }
}


module.exports.addEditor = async(req, res) => {

    const {name} = req.body

    /*
    {
    "_id": {
        "$oid": "6050edfb550bfd86aa4d3d14"
    },
    "name": "Rogerio",
    "address": "ici",
    "contacts": [{
        "email": "din"
    }]
}
    */

    try {
        const editor = await EditorModel.create({
            _id: mongoose.Types.ObjectId(),
            name: name,
            address: "sa",
            contacts: [{email: "sa"}]
        })
        res.status(201).json({gameId: editor._id})

    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}

module.exports.deleteEditor = async(req, res) => {
    const idEditor = req.url.split("/")[1]
    const mongooseId = mongoose.Types.ObjectId(idEditor)

    try {
        EditorModel.deleteOne({_id: mongooseId})
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}
