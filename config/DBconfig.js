const mongoose = require( "mongoose" )
const connectUserDB = mongoose.createConnection( process.env.DATABASE_USER_SECRET, { useNewUrlParser: true, useUnifiedTopology: true, } )
const connectProducts = mongoose.createConnection( process.env.DATABASE_PRODUCTS_SECRET, { useNewUrlParser: true, useUnifiedTopology: true, } )
module.exports = {
  connectUserDB,
  connectProducts,
};