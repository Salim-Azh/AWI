const FestivalsModel = require("../models/festivals.model")
const mongoose = require("mongoose")

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
        nb_tables_premium, nb_tables_standard, nb_tables_low,
        premium_t_price, standard_t_price, low_t_price,
        premium_sm_price, standard_sm_price, low_sm_price} = req.body

    try {

        const festival = await FestivalsModel.create({
            _id: mongoose.Types.ObjectId(),
            name: name,
            year: year,
            nb_tables_premium: nb_tables_premium,
            nb_tables_standard: nb_tables_standard,
            nb_tables_low: nb_tables_low,
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
    const idFestival = req.url.split("/")[1]
    const mongooseId = mongoose.Types.ObjectId(idFestival)

    try {
        FestivalsModel.deleteOne({_id: mongooseId})
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.updateFestival = async(req, res) => {
    const idFestival = req.url.split("/")[1]
    const mongooseId = mongoose.Types.ObjectId(idFestival)

    const {
        nb_tables_premium, nb_tables_standard, nb_tables_low,
        premium_t_price, standard_t_price, low_t_price,
        premium_sm_price, standard_sm_price, low_sm_price
    } = req.body

    const update = {
        nb_tables_premium: nb_tables_premium,
        nb_tables_standard: nb_tables_standard,
        nb_tables_low: nb_tables_low,
        premium_t_price: premium_t_price,
        standard_t_price: standard_t_price,
        low_t_price: low_t_price,
        premium_sm_price: premium_sm_price,
        standard_sm_price: standard_sm_price,
        low_sm_price: low_sm_price
    }

    try {
        FestivalsModel.updateOne({_id: mongooseId}, update)
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}
