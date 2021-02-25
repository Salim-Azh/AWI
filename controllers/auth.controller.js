const TestModel = require('../models/test.model')

module.exports.signUp = async(req,res) => {
    const {email, password} = req.body
    console.log(req.body)
    try {
        const test = await TestModel.create({email, password})
        res.status(201).json({test: test._id})
    } catch (error) {
        res.status(400).send({error})
    }
}