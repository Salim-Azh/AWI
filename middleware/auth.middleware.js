const jwt = require("jsonwebtoken")
const UserModel = require("../models/user.model")

module.exports.checkUser = (req, res, next) => {
    console.log(req.headers)
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded)=>{
            if (err) {
                res.locals.user = null
                res.cookie("jwt", "", {maxAge: 1})
                next()
            } else{
                let user = await UserModel.findById(decoded.id)
                res.locals.user = user
                console.log(user)
                next()
            }
        })
    } else {
         res.locals.user = null
         next()
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) {
          console.log(err);
          res.send(200).json('No token')
        } else {
          console.log(decoded.id);
          next();
        }
      });
    } else {
      console.log('No token');
    }
  }