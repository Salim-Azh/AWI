const UserModel = require('../models/user.model')
const ObjectId = require('mongoose').Types.ObjectId

module.exports.getAllUsers = async(req,res) =>{
    const users = await UserModel.find().select("-pwd") //never send the pwd
    res.status(200).json(users)
}

module.exports.userInfo = async(req, res) =>{
    //console.log(req.params)
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send("Unknown id : " + req.params.id)
    }

    UserModel.findById(req.params.id, (err,data) =>{
        if(!err) res.send(data)
        else console.log(err)
    }).select("-pwd")
}

module.exports.updateUserEmail = async(req,res) =>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    email: req.body.email
                }
            },
            { 
                new: true, 
                upsert: true, 
                setDefaultsOnInsert: true 
            },
            (err, data) => {
                //error on the request (body)
                if (!err) return res.send(data)
                if (err) return res.status(500).send({ message: err })
            }
        ).select("-pwd")
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

/***
 * TODO : hash the pwd
 */
module.exports.updateUserPwd = async(req,res) =>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    try {
        await UserModel.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    pwd: req.body.pwd
                }
            },
            { 
                new: true, 
                upsert: true, 
                setDefaultsOnInsert: true 
            },
            (err, data) => {
                //error on the request (body)
                if (!err) {
                    return res.send(data)
                }
                if (err) return res.status(500).send({ message: err })
            }
        ).select("-pwd")
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

module.exports.updateUserRight = async(req,res) =>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    try {
        await UserModel.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    right: req.body.right
                }
            },
            { 
                new: true, 
                upsert: true, 
                setDefaultsOnInsert: true 
            },
            (err, data) => {
                //error on the request (body)
                if (!err) {
                    return res.send(data)
                }
                if (err) return res.status(500).send({ message: err })
            }
        ).select("-pwd")
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

module.exports.deleteUser = async(req,res) =>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    try {
        await UserModel.deleteOne({_id: req.params.id}).exec()
        res.status(200).json({message: "Deleted"})
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}
