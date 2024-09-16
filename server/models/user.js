const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: String,
    password: String,
}
)

const userModel = mongoose.model('user', UserSchema)
module.exports = userModel

