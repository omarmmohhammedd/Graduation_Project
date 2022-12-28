const route = require( "express" ).Router()
const { Report } = require( "../../controllers/UserControllers" )
route.post( "/", Report )
module.exports = route