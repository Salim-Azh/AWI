const UserModel = require('../models/user.model')

module.exports.signUp = async(req,res) => {
    const {email, pwd, right} = req.body
    console.log(req.body)
    try {
        const user = await UserModel.create({email, pwd, right})
        res.status(201).json({user: user._id})
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}