const FestivalsModel = require("../models/festivals.model")
const ObjectId = require('mongoose').Types.ObjectId

module.exports.getListOfFestivals = async(req,res) => {
    try {
        const festivals = await FestivalsModel.find()
        res.status(201).json({festivals: festivals})
    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports.addFestival = async(req, res) => {

    const {name, year,
        nb_t_premium, nb_t_standard, nb_t_low,
        nb_sm_premium, nb_sm_standard, nb_sm_low,
        premium_t_price, standard_t_price, low_t_price,
        premium_sm_price, standard_sm_price, low_sm_price} = req.body

    try {

        const festival = await FestivalsModel.create({
            _id: ObjectId(),
            name: name,
            year: year,
            nb_t_premium: nb_t_premium,
            nb_t_standard: nb_t_standard,
            nb_t_low: nb_t_low,
            nb_sm_premium: nb_sm_premium,
            nb_sm_standard: nb_sm_standard,
            nb_sm_low: nb_sm_low,
            premium_t_price: premium_t_price,
            standard_t_price: standard_t_price,
            low_t_price: low_t_price,
            premium_sm_price: premium_sm_price,
            standard_sm_price: standard_sm_price,
            low_sm_price: low_sm_price,
            is_current: true
        })
        res.status(201).json({festivalId: festival._id})

    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports.deleteFestival = async(req, res) => {
    const idFestival = req.params.id
    const mongooseId = ObjectId(idFestival)

    try {
        FestivalsModel.deleteOne({_id: mongooseId})
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.updateFestival = async(req, res) => {
    const idFestival = req.params.id
    const mongooseId = ObjectId(idFestival)

    try {
        FestivalsModel.updateOne({_id: mongooseId}, req.body)
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.setCurrent = async(req, res) => {
    const idFestival = req.params.id
    const mongooseId = ObjectId(idFestival)

    try {
        await FestivalsModel.updateOne({is_current: true}, {is_current: false})
        FestivalsModel.updateOne({_id: mongooseId}, {is_current: true})
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}
