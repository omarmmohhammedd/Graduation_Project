const mongoose = require( "mongoose" )
const { connectUserDB } = require( "../config/DBconfig" )
const userSchema = connectUserDB.model( "Users", new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    token: {
        type: String
    },
    roles: {
        type: Number,
        default:2001
    },
} ) );
module.exports = userSchema 