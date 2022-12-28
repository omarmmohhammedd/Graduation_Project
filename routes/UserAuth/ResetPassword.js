const route = require( "express" ).Router()
const { resetPassword } = require( "../../controllers/UserControllers" )
route.post( "/", resetPassword )
module.exports = route