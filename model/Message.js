const mongoose = require( "mongoose" )
const { connectUserDB } = require( "../config/DBconfig" )
const messageSchema = connectUserDB.model(
  "Messages",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  })
);
module.exports = messageSchema 