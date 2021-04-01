const ZoneModel = require("../models/zones.model")

const ObjectId = require('mongoose').Types.ObjectId

module.exports.getZones = async(req,res) => {
    try {
        const zones = await ZoneModel.find()
        res.status(200).json(zones)
    } catch (error) {
        res.status(500).send({error})
    }
}

module.exports.getZone = async(req,res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send("Unknown id : " + req.params.id)
    }
    
    ZoneModel.findById(req.params.id, (err,data) =>{
        if(!err) res.send(data)
        else console.log(err)
    })
}

module.exports.addZone = async(req,res) => {
    const {label, sm_capacity, games} = req.body
    try {
        const zone = await ZoneModel.create({label, sm_capacity, games})
        res.status(201).json(zone)
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}

module.exports.updateZone = async(req,res) => {
    try {
        ZoneModel.updateOne({_id: req.params.id}, req.body)
            .then(() => res.status(201).send("success"))

    } catch(error) {
        res.status(400).send({error})
    }
}

module.exports.deleteZone = async(req,res) => {
    try {
        ZoneModel.deleteOne({_id: req.params.id})
            .then(() => res.status(201).send("Deleted"))
    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}