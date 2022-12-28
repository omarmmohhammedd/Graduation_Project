const mongoose = require( "mongoose" )
const { connectProducts } = require( "../config/DBconfig" )
const productSchema = connectProducts.model( "products", new mongoose.Schema( {
    name: {
        type: String,
        
    },
    flavor: {
        type: String,
        
    },
    price: {
        type: Number,
        
    },
    quantity: {
        type: Number,
        
    },
    weight: {
        type: Number,
        
    },
    validDate: {
        type: String,
        
    },
    expDate: {
        type: String,
        
    },
    img: {
        type: String,
        default: null
    }
} ) );
module.exports = productSchema 