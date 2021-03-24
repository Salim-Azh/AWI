const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const Cookies = require("cookies")

const exp = '1h'
const createToken = (id) => {
    return jwt.sign({
        id
    }, process.env.TOKEN_SECRET, {expiresIn: '1h'})
}

module.exports.signUp = async(req,res) => {
    const {email, pwd, right} = req.body
    //console.log(req.body)
    try {
        const user = await UserModel.create({email, pwd, right})
        res.status(201).json({user: user._id})
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}

module.exports.signIn = async(req,res) => {
    const {email, pwd} = req.body
    try {
        const user = await UserModel.login(email, pwd)
        const token = createToken(user._id)
        new Cookies(req,res).set('access_token',token, {
            httpOnly: true, //cookie not available through client js code
            secure: false // true to force https
        })
        //res.cookie("jwt", token,{httpOnly:true, maxAge: 60*60 /*= 1h */ })
        res.status(200).json({user:user._id})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.logout = async(req,res) => {
    res.cookie("jwt", "", {maxAge: 1});
    res.redirect("/")
}