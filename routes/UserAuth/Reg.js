const route = require( "express" ).Router()
const { Reg } = require( "../../controllers/UserControllers" )
route.post( "/", Reg )
module.exports = route