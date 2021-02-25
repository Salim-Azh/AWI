const mongoose = require('mongoose')
const {isEmail} = require('validator')

const schema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            validate: [isEmail],
            lowercase:true,
            trim : true,
            unique: true
        },
        password:{
            type: String,
            required: true,
            maxlength: 1024,
            minlength: 8
        }
    },
    {
        timestamps: true
    }
)



const TestModel = mongoose.model('test', schema)
module.exports = TestModel