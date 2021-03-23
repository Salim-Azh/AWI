const EditorsModel = require("../models/editors.model")

module.exports.getListOfExhibitors = async(req,res) => {

    try {
        const exhibitors = await EditorsModel.find({isExhibitor: true})
        res.status(201).json({exhibitors: exhibitors})
    } catch (error) {
        res.status(400).send({error})
    }
}
