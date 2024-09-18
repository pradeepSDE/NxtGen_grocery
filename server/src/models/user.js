const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password: String,
    googleId: String,
}
)

const userModel = mongoose.model('user', UserSchema)
module.exports = userModel

