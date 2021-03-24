const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require("bcrypt")

const {Schema} = mongoose

const userSchema = new Schema(
    {
        email:{
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true
        },
        pwd: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
        },
        right:{
            type: Number,
            enum: [0,1]
        }
    },
    {
        timestamps: true,
    },
    {
        versionKey: false
    }
)

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt()
    this.pwd = await bcrypt.hash(this.pwd, salt)
    next()
})

/*userSchema.pre("update", async function(next){
    if(!this.isModified("pwd"))
        return next()
    const salt = await bcrypt.genSalt()
    this.pwd = await bcrypt.hash(this.pwd, salt)
    next()
})*/

const UserModel = mongoose.model('users', userSchema)
module.exports = UserModel