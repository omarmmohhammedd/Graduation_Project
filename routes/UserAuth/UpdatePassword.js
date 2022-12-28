const route = require( "express" ).Router()
const { UpdatePassword } = require( "../../controllers/UserControllers" )
route.post( "/", UpdatePassword )
module.exports = route