const EditorModel = require("../models/editors.model")

module.exports.getListOfExhibitors = async(req,res) => {
    try {
        const exhibitors = await EditorModel.find({isExhibitor: true, isPotential: true}).select("name contacts")
        res.status(201).json({exhibitors: exhibitors})
    } catch (error) {
        res.status(400).send({error})
    }
}
